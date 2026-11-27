import test from 'node:test';
import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import { PublicadorSimuladoPostgres } from '../src/pg-simulacao.js';

const habilitado=process.env.A103_T2_TEST_ONLY==='1' && !!process.env.A103_T2_DATABASE_URL;
const entrada=(id,nome)=>({solicitacao_id:id,correlation_id:id,ambiente:'SIMULADO',nome,origem_referencial:'ato-simulado',provas:[{id:'prova-simulada',custodiante:'C301-RDI'}]});
const opts={principal_simulado:'A103-T2-TEST-ONLY',permitir_simulacao:true};

test('T2-PG: transacao real, historico, rollback, outbox e concorrencia', {skip:!habilitado},async()=>{
 const {default:pg}=await import('pg');
 const pool=new pg.Pool({connectionString:process.env.A103_T2_DATABASE_URL,max:4});
 try{
  const schema=await pool.query("SELECT to_regclass('a103.organizacoes') IS NOT NULL AS ok");
  if(!schema.rows[0].ok)throw new Error('Aplicar migracao T2 no banco DEV antes do teste');
  const repo=new PublicadorSimuladoPostgres(pool), id=randomUUID(), nome=`Organizacao-T2-${id}`;
  const c=entrada(id,nome),x=await repo.publicar(c,opts);
  assert.equal(x.ambiente,'SIMULADO');assert.equal(x.marco_a_autorizado,false);
  assert.deepEqual(await repo.publicar(c,opts),x);
  await assert.rejects(repo.publicar({...c,nome:'alterado'},opts),{code:'A103_T2_IDEMPOTENCIA_DIVERGENTE'});
  const rows=await pool.query(`SELECT
   (SELECT count(*)::int FROM a103.versoes_registro WHERE registro_id=$1) AS versoes,
   (SELECT count(*)::int FROM a103.manifestos_probatorios WHERE registro_id=$1) AS manifestos,
   (SELECT count(*)::int FROM a103.eventos_registro WHERE registro_id=$1) AS eventos,
   (SELECT count(*)::int FROM a103.outbox o JOIN a103.eventos_registro e USING(evento_id) WHERE e.registro_id=$1) AS outbox`,[x.registro_id]);
  assert.deepEqual(rows.rows[0],{versoes:1,manifestos:1,eventos:1,outbox:1});
  const falha=entrada(randomUUID(),nome+'-falha');
  await assert.rejects(repo.publicar(falha,{...opts,falhar_antes:'outbox'}),{code:'A103_T2_FALHA_INJETADA'});
  const inexistente=await pool.query('SELECT count(*)::int AS n FROM a103.organizacoes WHERE nome_referencia=$1',[falha.nome]);
  assert.equal(inexistente.rows[0].n,0);
  const ret={...entrada(randomUUID(),nome+'-retificada'),organizacao_id:x.organizacao_id,versao_base:1};
  const y=await repo.publicar(ret,opts);assert.equal(y.organizacao_id,x.organizacao_id);
  assert.equal(y.versao_registro,'2');
  const historia=await pool.query('SELECT versao_registro FROM a103.versoes_registro WHERE registro_id=$1 ORDER BY versao_registro',[x.registro_id]);
  assert.deepEqual(historia.rows.map(r=>r.versao_registro),[1,2]);
  await assert.rejects(repo.publicar({...entrada(randomUUID(),nome+'-concorrente'),organizacao_id:x.organizacao_id,versao_base:1},opts),{code:'A103_T2_VERSAO_CONCORRENTE'});
  await assert.rejects(pool.query('UPDATE a103.versoes_registro SET nome=$1 WHERE registro_id=$2 AND versao_registro=1',['fraude',x.registro_id]),/A103_T2_HISTORICO_IMUTAVEL/);
  const nomeConcorrente=`Nome-T2-${randomUUID()}`;
  const resultados=await Promise.allSettled([
   repo.publicar(entrada(randomUUID(),nomeConcorrente),opts),
   repo.publicar(entrada(randomUUID(),nomeConcorrente),opts)
  ]);
  assert.equal(resultados.filter(r=>r.status==='fulfilled').length,1);
  assert.equal(resultados.filter(r=>r.status==='rejected'&&r.reason.code==='A103_T2_IDENTIDADE_AMBIGUA').length,1);
 }finally{await pool.end();}
});
