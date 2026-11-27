import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import { resolve } from 'node:path';
import pg from 'pg';
import { carregarRegras } from '../dist/src/rule-loader.js';
import { avaliarComFontes } from '../dist/src/engine.js';
import { IdempotencyConflict, PostgresVerificationRepository } from '../dist/src/postgres.js';

/**
 * A107-INT-005: integração real, executada SOMENTE contra banco local isolado.
 * npm run test:integration
 *
 * Não publica pacotes, não apaga dados e não usa fontes institucionais.
 * Gera IDs novos a cada execução; mantém os resultados para auditoria.
 */
const connectionString = process.env.DATABASE_URL;
if (!connectionString) throw new Error('DATABASE_URL ausente.');
const url = new URL(connectionString);
if (
  !['127.0.0.1', 'localhost', '::1', '[::1]'].includes(url.hostname) ||
  decodeURIComponent(url.pathname) !== '/civitas_a107_teste' ||
  decodeURIComponent(url.username) !== 'civitas_a107_teste'
) {
  throw new Error('BLOQUEADO: permitido apenas usuario civitas_a107_teste no banco local civitas_a107_teste.');
}
if (process.env.A107_TEST_INTEGRATION !== 'SIM') {
  throw new Error('Defina A107_TEST_INTEGRATION=SIM para autorizar testes que gravam dados no banco isolado.');
}

const pool = new pg.Pool({
  connectionString,
  max: 5,
  connectionTimeoutMillis: 5000,
  query_timeout: 30000,
  statement_timeout: 30000
});
const mark = randomUUID();
const timestamp = new Date(Date.now() - 120_000).toISOString();
const principal = {
  principal_id: 'PRINCIPAL-SIMULADO',
  autorizacao_contextual_id: 'SIMULADO-NAO-AUTORIZADO',
  origem_autenticacao: 'TESTE',
  escopos: []
};
const comando = (suffix, momento = timestamp) => ({
  solicitacao_id: `TESTE-A107-INT005-${mark}-${suffix}`,
  correlation_id: `INT005-${mark}`,
  organizacao_id: 'ORG-TESTE-A107',
  ambito_id: 'MARCO_A',
  referencia_temporal: momento,
  conhecimento_ate: momento,
  motivo: 'TESTE_CONTRATO_SEM_EVIDENCIAS_REAIS'
});
const count = async (id) => {
  const r = await pool.query(`
    SELECT
      (SELECT COUNT(*)::int FROM a107.execucoes WHERE solicitacao_id=$1) AS execucoes,
      (SELECT COUNT(*)::int FROM a107.verificacoes v
       JOIN a107.execucoes e ON e.id=v.execucao_id WHERE e.solicitacao_id=$1) AS verificacoes,
      (SELECT COUNT(*)::int FROM a107.resultados_condicao c
       JOIN a107.verificacoes v ON v.id=c.verificacao_id
       JOIN a107.execucoes e ON e.id=v.execucao_id WHERE e.solicitacao_id=$1) AS condicoes,
      (SELECT COUNT(*)::int FROM a107.resultados_requisito r
       JOIN a107.resultados_condicao c ON c.id=r.resultado_condicao_id
       JOIN a107.verificacoes v ON v.id=c.verificacao_id
       JOIN a107.execucoes e ON e.id=v.execucao_id WHERE e.solicitacao_id=$1) AS requisitos,
      (SELECT COUNT(*)::int FROM a107.outbox o
       JOIN a107.verificacoes v ON v.id=o.verificacao_id
       JOIN a107.execucoes e ON e.id=v.execucao_id WHERE e.solicitacao_id=$1) AS outbox
  `, [id]);
  return r.rows[0];
};

const expectedSaved = { execucoes: 1, verificacoes: 1, condicoes: 4, requisitos: 23, outbox: 1 };
const expectedEmpty = { execucoes: 0, verificacoes: 0, condicoes: 0, requisitos: 0, outbox: 0 };

try {
  const identity = await pool.query(
    'SELECT current_database() AS banco, current_user AS usuario, inet_server_addr() AS endereco'
  );
  assert.equal(identity.rows[0].banco, 'civitas_a107_teste');
  assert.equal(identity.rows[0].usuario, 'civitas_a107_teste');

  const pacote = await carregarRegras(resolve('rules'));
  assert.equal(pacote.condicoes.length, 4);
  assert.equal(pacote.condicoes.reduce((n, c) => n + c.requisitos.length, 0), 23);
  const publicado = await pool.query(
    'SELECT hash_sha256 FROM a107.pacotes_regras WHERE codigo=$1 AND versao=$2',
    [pacote.pacote.id, pacote.pacote.versao]
  );
  assert.equal(publicado.rowCount, 1, 'Publicar pacote previamente por processo controlado no banco de teste.');
  assert.equal(publicado.rows[0].hash_sha256, pacote.pacote.hash_sha256);

  const repo = new PostgresVerificationRepository(pool);
  const executar = async (cmd, repository = repo) => {
    const avaliacao = await avaliarComFontes(cmd, principal, pacote, () => undefined);
    return repository.persistir(cmd, principal, pacote, avaliacao);
  };
  const print = (name, data) => console.log(`APROVADO: ${name}`, JSON.stringify(data));

  // INT-001: resultado e evento outbox persistidos conjuntamente.
  const first = comando('PERSISTENCIA');
  const result1 = await executar(first);
  assert.equal(result1.estado, 'INDETERMINADA');
  assert.equal(result1.elegibilidade, 'VERIFICACAO_PENDENTE');
  assert.deepEqual(await count(first.solicitacao_id), expectedSaved);
  print('INT-001 persistencia real', { verificacao_id: result1.verificacao_id });

  // INT-002: mesmo pedido retorna ID anterior; pedido divergente rejeitado.
  const replay = await executar(first);
  assert.equal(replay.verificacao_id, result1.verificacao_id);
  const divergent = { ...first, referencia_temporal: new Date(Date.parse(timestamp) - 60_000).toISOString() };
  await assert.rejects(executar(divergent), e => e instanceof IdempotencyConflict && e.message.includes('A107E0005'));
  assert.deepEqual(await count(first.solicitacao_id), expectedSaved);
  print('INT-002 idempotencia e conflito', { verificacao_id: replay.verificacao_id });

  // INT-003: injeta falha APOS SQL INSERT da outbox, ANTES do COMMIT.
  // O wrapper apenas intercepta a conexao emprestada; nao modifica src/postgres.ts.
  const failed = comando('ROLLBACK');
  const faultPool = {
    connect: async () => {
      const client = await pool.connect();
      return {
        query: async (sql, params) => {
          const result = await client.query(sql, params);
          if (typeof sql === 'string' && sql.includes('INSERT INTO a107.outbox')) {
            throw new Error('A107-INT-003: falha artificial apos outbox');
          }
          return result;
        },
        release: () => client.release()
      };
    }
  };
  const faultRepo = new PostgresVerificationRepository(faultPool);
  await assert.rejects(executar(failed, faultRepo), /falha artificial apos outbox/);
  assert.deepEqual(await count(failed.solicitacao_id), expectedEmpty);
  print('INT-003 rollback', { solicitacao_id: failed.solicitacao_id, registros: 0 });

  // INT-004: duas chamadas simultaneas, mesmo resultado e uma persistencia.
  const concurrent = comando('CONCORRENCIA');
  const [a, b] = await Promise.all([executar(concurrent), executar(concurrent)]);
  assert.equal(a.verificacao_id, b.verificacao_id);
  assert.equal(a.estado, 'INDETERMINADA');
  assert.equal(b.elegibilidade, 'VERIFICACAO_PENDENTE');
  assert.deepEqual(await count(concurrent.solicitacao_id), expectedSaved);
  print('INT-004 exclusao mutua', { verificacao_id: a.verificacao_id });

  console.log('A107-INT-005: 4 CENARIOS DE INTEGRACAO APROVADOS.');
  console.log('Identificador de rodada:', mark);
  console.log('Dados de teste preservados para auditoria; nenhuma exclusao efetuada.');
} catch (e) {
  console.error('A107-INT-005: NAO APROVADO:', e);
  process.exitCode = 1;
} finally {
  await pool.end();
}
