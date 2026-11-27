/** T2: persistência PostgreSQL de ensaio exclusivamente SIMULADO.
 * NÃO implementa constituição institucional real, CE-01 autêntico, C103-IEA ou Marco A.
 * Requer pool injetado; não abre conexões nem migra esquemas automaticamente.
 */
import { createHash, randomUUID } from 'node:crypto';

const falhar = (codigo, detalhe) => { const e = new Error(`${codigo}: ${detalhe}`); e.code = codigo; throw e; };
const texto = x => typeof x === 'string' && x.trim().length > 0;
const canonico = x => JSON.stringify(x, (key,value) =>
  value && typeof value === 'object' && !Array.isArray(value) ? Object.fromEntries(Object.entries(value).sort(([a],[b])=>a.localeCompare(b))) : value);
export const hashComandoT2 = x => createHash('sha256').update(canonico(x)).digest('hex');

export class PublicadorSimuladoPostgres {
  constructor(pool) { if (!pool?.connect) throw new TypeError('pool PostgreSQL exigido'); this.pool = pool; }

  async publicar(comando, { principal_simulado, permitir_simulacao = false, falhar_antes = null } = {}) {
    if (process.env.A103_T2_TEST_ONLY !== '1' || permitir_simulacao !== true || !texto(principal_simulado))
      falhar('A103_T2_BLOQUEADO','somente ambiente de teste explicitamente ativado');
    if (!comando || !texto(comando.solicitacao_id) || !texto(comando.correlation_id) ||
        !texto(comando.nome) || !texto(comando.origem_referencial) || comando.ambiente !== 'SIMULADO' ||
        !Array.isArray(comando.provas) || comando.provas.length === 0 ||
        !comando.provas.every(p => texto(p.id) && texto(p.custodiante)))
      falhar('A103_T2_ENTRADA_INVALIDA','dados de simulação/provas obrigatórios');
    if (comando.organizacao_id != null && !texto(comando.organizacao_id)) falhar('A103_T2_ENTRADA_INVALIDA','id vazio');
    if (comando.organizacao_id && (!Number.isInteger(comando.versao_base) || comando.versao_base < 1))
      falhar('A103_T2_ENTRADA_INVALIDA','versão-base obrigatória');
    if (falhar_antes !== null && !['manifesto', 'outbox'].includes(falhar_antes))
      falhar('A103_T2_ENTRADA_INVALIDA','ponto de falha não permitido');

    const hash = hashComandoT2(comando);
    const client = await this.pool.connect();
    let started = false;
    try {
      await client.query('BEGIN'); started = true;
      await client.query('SELECT pg_advisory_xact_lock(hashtextextended($1,0))', [`a103_t2|${principal_simulado}|${comando.solicitacao_id}`]);
      const prev = await client.query('SELECT pedido_hash,resultado FROM a103.solicitacoes_registro WHERE principal_simulado=$1 AND solicitacao_id=$2',
        [principal_simulado,comando.solicitacao_id]);
      if (prev.rows.length) {
        if (prev.rows[0].pedido_hash.trim() !== hash) falhar('A103_T2_IDEMPOTENCIA_DIVERGENTE','mesma chave com conteúdo diferente');
        await client.query('COMMIT'); started = false;
        return prev.rows[0].resultado;
      }
      let orgId = comando.organizacao_id ?? randomUUID();
      let regId, versao, anterior = null;
      if (comando.organizacao_id) {
        const r = await client.query('SELECT registro_id FROM a103.organizacoes WHERE organizacao_id=$1 FOR UPDATE',[orgId]);
        if (!r.rows.length) falhar('A103_T2_ORGANIZACAO_INEXISTENTE','organização não registrada');
        regId = r.rows[0].registro_id;
        const v = await client.query('SELECT COALESCE(MAX(versao_registro),0) AS n FROM a103.versoes_registro WHERE registro_id=$1',[regId]);
        anterior = Number(v.rows[0].n);
        if (anterior !== comando.versao_base) falhar('A103_T2_VERSAO_CONCORRENTE','versão atual difere da base');
        versao = anterior + 1;
      } else {
        await client.query('SELECT pg_advisory_xact_lock(hashtextextended($1,0))',[`a103_t2_name|${comando.nome.normalize('NFC').toLocaleLowerCase('pt-BR')}`]);
        const dup = await client.query('SELECT 1 FROM a103.organizacoes WHERE lower(nome_referencia)=lower($1) LIMIT 1',[comando.nome]);
        if (dup.rows.length) falhar('A103_T2_IDENTIDADE_AMBIGUA','nome coincidente exige resolução contextual');
        regId = randomUUID(); versao = 1;
        await client.query("INSERT INTO a103.organizacoes(organizacao_id,registro_id,nome_referencia,ambiente) VALUES($1,$2,$3,'SIMULADO')",[orgId,regId,comando.nome]);
      }
      const data = await client.query(`INSERT INTO a103.versoes_registro
        (registro_id,organizacao_id,versao_registro,versao_anterior,nome,origem_referencial,ambiente)
        VALUES ($1,$2,$3,$4,$5,$6,'SIMULADO') RETURNING registrado_em`,
        [regId,orgId,versao,anterior,comando.nome,comando.origem_referencial]);
      const registrado = data.rows[0].registrado_em;
      const manifesto = randomUUID();
      const evidencias = comando.provas.map(p=>({evidencia_id: randomUUID(), id:p.id,custodiante:p.custodiante}));
      if (falhar_antes === 'manifesto') falhar('A103_T2_FALHA_INJETADA','antes do manifesto');
      const manifestHash = hashComandoT2({organizacao_id:orgId, registro_id:regId, versao, itens:comando.provas});
      await client.query(`INSERT INTO a103.manifestos_probatorios
        (manifesto_id,registro_id,versao_registro,hash_sha256,ambiente) VALUES($1,$2,$3,$4,'SIMULADO')`,
        [manifesto,regId,versao,manifestHash]);
      for (const [i,p] of evidencias.entries()) {
        await client.query(`INSERT INTO a103.referencias_probatorias
         (evidencia_id,registro_id,versao_registro,referencia_externa,custodiante_modulo,ambiente)
         VALUES($1,$2,$3,$4,$5,'SIMULADO')`,[p.evidencia_id,regId,versao,p.id,p.custodiante]);
        await client.query('INSERT INTO a103.itens_manifesto(manifesto_id,evidencia_id,ordem) VALUES($1,$2,$3)',[manifesto,p.evidencia_id,i+1]);
      }
      await client.query(`INSERT INTO a103.decisoes_publicacao
        (decisao_id,registro_id,versao_registro,principal_simulado,justificativa,ambiente)
        VALUES($1,$2,$3,$4,'AUTORIZACAO_EXCLUSIVAMENTE_SIMULADA','SIMULADO')`,[randomUUID(),regId,versao,principal_simulado]);
      const evento = randomUUID();
      await client.query(`INSERT INTO a103.eventos_registro(evento_id,registro_id,versao_registro,tipo,correlation_id,ambiente)
        VALUES($1,$2,$3,'PUBLICACAO_SIMULADA',$4,'SIMULADO')`,[evento,regId,versao,comando.correlation_id]);
      if (falhar_antes === 'outbox') falhar('A103_T2_FALHA_INJETADA','antes da outbox');
      const resultado = {estado:'PUBLICADA',ambiente:'SIMULADO',organizacao_id:orgId,registro_id:regId,
        versao_registro:String(versao),evidencia_id:manifesto,referencia_evidencia:`simulacao:${manifesto}`,
        registrado_em:registrado instanceof Date ? registrado.toISOString() : new Date(registrado).toISOString(),marco_a_autorizado:false};
      await client.query(`INSERT INTO a103.outbox(outbox_id,evento_id,tipo,payload)
        VALUES($1,$2,'PUBLICACAO_SIMULADA',$3)`,[randomUUID(),evento,JSON.stringify(resultado)]);
      await client.query(`INSERT INTO a103.solicitacoes_registro
        (solicitacao_id,principal_simulado,pedido_hash,organizacao_id,estado,resultado)
        VALUES ($1,$2,$3,$4,'PUBLICADA',$5)`,[comando.solicitacao_id,principal_simulado,hash,orgId,JSON.stringify(resultado)]);
      if (comando.organizacao_id) await client.query('UPDATE a103.organizacoes SET nome_referencia=$2 WHERE organizacao_id=$1',[orgId,comando.nome]);
      await client.query('COMMIT'); started = false;
      return resultado;
    } catch (e) { if (started) await client.query('ROLLBACK'); throw e; }
    finally { client.release(); }
  }
}
