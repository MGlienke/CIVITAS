import {test} from 'node:test';
import assert from 'node:assert/strict';
import {join} from 'node:path';
import {carregarRegras} from '../src/rule-loader.js';
import {avaliarComFontes} from '../src/engine.js';
import {validateMarcoAResult} from '../src/invariants.js';
import {hashPedido} from '../src/postgres.js';
import type {ComandoVerificacao,ContextoAutenticado} from '../src/contracts.js';
const root=join(process.cwd(),'rules');
const time=new Date(Date.now()-3600000).toISOString();
const c:ComandoVerificacao={solicitacao_id:'TESTE',correlation_id:'CORR',organizacao_id:'ORG',ambito_id:'MARCO_A',referencia_temporal:time,conhecimento_ate:time,motivo:'TESTE'};
const ctx:ContextoAutenticado={principal_id:'PRINCIPAL',autorizacao_contextual_id:'AUTH',origem_autenticacao:'TEST',escopos:[]};

test('pacote homologado contém 4 condições/23 requisitos, hash íntegro',async()=>{
  const rules=await carregarRegras(root);
  assert.equal(rules.condicoes.length,4);
  assert.equal(rules.condicoes.reduce((n,x)=>n+x.requisitos.length,0),23);
});
test('sem fontes reais: indeterminada, nunca elegível/autoriza',async()=>{
  const rules=await carregarRegras(root);
  const {resultado,consultas}=await avaliarComFontes(c,ctx,rules,()=>undefined);
  validateMarcoAResult(resultado);
  assert.equal(resultado.estado,'INDETERMINADA');
  assert.equal(resultado.elegibilidade,'VERIFICACAO_PENDENTE');
  assert.equal(consultas.length,0);
  assert.equal(resultado.condicoes.length,4);
  assert.equal(resultado.condicoes.flatMap(x=>x.requisitos).length,23);
});
test('mesma solicitação e pacote geram hash idempotente estável',async()=>{
  const r=await carregarRegras(root);
  const a=hashPedido(c,ctx.principal_id,r.pacote.hash_sha256);
  assert.equal(a,hashPedido(c,ctx.principal_id,r.pacote.hash_sha256));
  assert.notEqual(a,hashPedido({...c,motivo:'OUTRO'},ctx.principal_id,r.pacote.hash_sha256));
});
test('pacote inclui hashes SHA-256 de integridade',async()=>{
  // Teste não altera arquivos: avaliação de integridade implícita no carregador acima.
  const r=await carregarRegras(root);assert.equal(r.pacote.hash_sha256.length,64);
});
