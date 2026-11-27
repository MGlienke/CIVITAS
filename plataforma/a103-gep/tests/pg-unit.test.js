import test from 'node:test';
import assert from 'node:assert/strict';
import { hashComandoT2, PublicadorSimuladoPostgres } from '../src/pg-simulacao.js';

test('T2-01: hash canonico independe da ordem das propriedades', () => {
 assert.equal(hashComandoT2({b:2,a:{z:3,k:1}}),hashComandoT2({a:{k:1,z:3},b:2}));
});
test('T2-02: bloqueado sem ativacao explicita de teste',async()=>{
 const r=new PublicadorSimuladoPostgres({connect(){throw new Error('nao conectar');}});
 await assert.rejects(r.publicar({}, {principal_simulado:'tester'}),{code:'A103_T2_BLOQUEADO'});
});
test('T2-03: registro REAL rejeitado antes de conectar',async()=>{
 const anterior=process.env.A103_T2_TEST_ONLY;process.env.A103_T2_TEST_ONLY='1';
 try {
  const r=new PublicadorSimuladoPostgres({connect(){throw new Error('nao conectar');}});
  await assert.rejects(r.publicar({solicitacao_id:'a',correlation_id:'b',nome:'c',origem_referencial:'d',ambiente:'REAL',provas:[{id:'1',custodiante:'2'}]}, {principal_simulado:'tester',permitir_simulacao:true}),{code:'A103_T2_ENTRADA_INVALIDA'});
 }finally{if(anterior===undefined)delete process.env.A103_T2_TEST_ONLY;else process.env.A103_T2_TEST_ONLY=anterior;}
});
