import { test } from 'node:test';
import assert from 'node:assert/strict';
import { join } from 'node:path';
import { carregarRegras } from '../src/rule-loader.js';
import { avaliarComFontes } from '../src/engine.js';
import { PostgresVerificationRepository,IdempotencyConflict } from '../src/postgres.js';
import type { SqlPool,SqlClient,QueryResult } from '../src/ports.js';
import type { ComandoVerificacao,ContextoAutenticado } from '../src/contracts.js';
const moment = new Date(Date.now()-120000).toISOString();
const c:ComandoVerificacao={solicitacao_id:'TESTE-TRANSACAO',correlation_id:'CORR',organizacao_id:'ORG',ambito_id:'MARCO_A',referencia_temporal:moment,conhecimento_ate:moment,motivo:'TESTE'};
const auth:ContextoAutenticado={principal_id:'PRINCIPAL',autorizacao_contextual_id:'TESTE',origem_autenticacao:'TESTE',escopos:[]};
const uuid='00000000-0000-4000-8000-000000000001';
function fake(failOn?:string){
  const sql:string[]=[];let ids=0;
  const client:SqlClient={
    async query<T>(statement:string):Promise<QueryResult<T>>{
      sql.push(statement);
      if(failOn&&statement.includes(failOn))throw new Error('FALHA SIMULADA');
      if(statement.includes('SELECT id,pedido_hash_sha256,status'))return {rows:[],rowCount:0};
      if(statement.includes('FROM a107.pacotes_regras'))return {rows:[{id:uuid,hash_sha256:rulesHash}] as T[],rowCount:1};
      if(statement.includes('RETURNING id')){ids++;return {rows:[{id:`00000000-0000-4000-8000-${String(ids).padStart(12,'0')}`}] as T[],rowCount:1}}
      return {rows:[],rowCount:0};
    },release(){}
  };
  const pool:SqlPool={async connect(){return client}};
  return {sql,pool};
}
let rulesHash='';
test('a persistência grava resultado + outbox antes de COMMIT',async()=>{
  const p=await carregarRegras(join(process.cwd(),'rules'));rulesHash=p.pacote.hash_sha256;
  const evaluation=await avaliarComFontes(c,auth,p,()=>undefined);
  const db=fake();
  const result=await new PostgresVerificationRepository(db.pool).persistir(c,auth,p,evaluation);
  assert.equal(result.estado,'INDETERMINADA');
  assert.equal(db.sql[0],'BEGIN');
  assert.equal(db.sql.at(-1),'COMMIT');
  assert.equal(db.sql.filter(s=>s.includes('INSERT INTO a107.resultados_requisito')).length,23);
  const event=db.sql.findIndex(s=>s.includes('INSERT INTO a107.outbox'));
  const close=db.sql.findIndex(s=>s.includes("SET status='CONCLUIDA'"));
  assert.ok(event>=0&&close>event);
});
test('falha na outbox impede COMMIT e exige ROLLBACK',async()=>{
  const p=await carregarRegras(join(process.cwd(),'rules'));rulesHash=p.pacote.hash_sha256;
  const evaluation=await avaliarComFontes(c,auth,p,()=>undefined);
  const db=fake('INSERT INTO a107.outbox');
  await assert.rejects(new PostgresVerificationRepository(db.pool).persistir(c,auth,p,evaluation),/FALHA SIMULADA/);
  assert.equal(db.sql.at(-1),'ROLLBACK');
  assert.ok(!db.sql.includes('COMMIT'));
});
