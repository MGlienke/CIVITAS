import { test } from 'node:test';
import assert from 'node:assert/strict';
import { join } from 'node:path';
import { AdaptadorCe01A103, type PortaIdentidadeA103, type ResultadoConsultaA103 } from '../src/adapters/a103-ce01.js';
import { carregarRegras } from '../src/rule-loader.js';
import { avaliarComFontes } from '../src/engine.js';
import type { ConsultaEvidencia, ContextoAutenticado, ComandoVerificacao } from '../src/contracts.js';

const agora = new Date(Date.now()-60_000).toISOString();
const ctx: ContextoAutenticado = {
  principal_id:'PRINCIPAL-TESTE',autorizacao_contextual_id:'AUTH-TESTE',origem_autenticacao:'TESTE',escopos:[]
};
const comando: ComandoVerificacao = {
  solicitacao_id:'TST-CE01',correlation_id:'CORR-CE01',organizacao_id:'ORG-CE01',
  ambito_id:'MARCO_A',referencia_temporal:agora,conhecimento_ate:agora,motivo:'TESTE_CONTRATUAL'
};
const consulta = (): ConsultaEvidencia => ({
  consulta_id:'Q-CE01',correlation_id:'CORR-CE01',verificacao_id:'V-TESTE',
  organizacao_id:comando.organizacao_id,requisito_id:'CM01-R01',
  sujeito:{tipo:'OrganizacaoInstitucional',referencia:comando.organizacao_id},
  propriedade_id:'identidade_institucional',
  referencia_temporal:agora,conhecimento_ate:agora,
  pacote_regras:{id:'MARCO_A',versao:'0.1.0',hash_sha256:'h',esquema_versao:'0.1'},
  contexto_autorizacao:ctx.autorizacao_contextual_id
});
const encontrado = (): ResultadoConsultaA103 => ({
  status:'ENCONTRADO',
  registro:{
    organizacao_id:'ORG-CE01',registro_id:'REG-001',versao_registro:'v1',
    referencia_evidencia:'A103/REG-001/v1',evidencia_id:'EVD-001',
    registrado_em:new Date(Date.parse(agora)-60_000).toISOString(),
    referencia_temporal:agora,conhecimento_ate:agora,
    snapshot_fonte:'SNAP-001',fonte_autoritativa:'A103-GEP',
    consulta_completa:true
  }
});
const adaptar = (value: ResultadoConsultaA103 | ((q:ConsultaEvidencia)=>ResultadoConsultaA103)) =>
  new AdaptadorCe01A103({ consultarIdentidadeInstitucional: async q =>
    typeof value==='function' ? value(q) : value
  } satisfies PortaIdentidadeA103);

test('CE01: mapeia registro A103 íntegro a fato e evidência referencial', async () => {
  const r=await adaptar(encontrado()).consultar(consulta(),ctx);
  assert.equal(r.status_consulta,'OK');
  assert.equal(r.fonte_modulo,'A103-GEP');
  assert.equal(r.fatos.length,1);
  assert.equal(r.evidencias.length,1);
  assert.equal(r.fatos[0].predicado,'identidade_institucional');
  assert.equal(r.fatos[0].evidencia_ids[0],r.evidencias[0].evidencia_id);
  assert.equal(r.cobertura.universo_completo,'NAO_COMPROVADO');
});

test('CE01: registro de outra organização não gera fato utilizável', async () => {
  const x=encontrado();
  if (x.status!=='ENCONTRADO') throw new Error('fixture');
  x.registro.organizacao_id='ORG-OUTRA';
  const r=await adaptar(x).consultar(consulta(),ctx);
  assert.equal(r.status_consulta,'PARCIAL');
  assert.equal(r.fatos.length,0);
  assert.equal(r.consistencia.divergencias.length,1);
});

test('CE01: ausência não comprovada permanece sem fatos e sem prova negativa', async () => {
  const r=await adaptar({status:'NAO_LOCALIZADO',consulta_completa:true,snapshot_fonte:'SNAP-002'}).consultar(consulta(),ctx);
  assert.equal(r.fatos.length,0);
  assert.equal(r.cobertura.universo_completo,'NAO_COMPROVADO');
  assert.equal(r.status_consulta,'OK');
});

test('CE01: indisponibilidade e erro não geram fatos', async () => {
  for (const status of ['INDISPONIVEL','ERRO'] as const) {
    const r=await adaptar({status}).consultar(consulta(),ctx);
    assert.equal(r.status_consulta,status);
    assert.deepEqual(r.fatos,[]);
  }
});

test('CE01: A103 negou acesso; não disfarçar como fonte vazia', async () => {
  await assert.rejects(adaptar({status:'NAO_AUTORIZADA'}).consultar(consulta(),ctx),/A107E0002/);
});

test('CE01: rejeita consulta fora do requisito ou contexto', async () => {
  await assert.rejects(adaptar(encontrado()).consultar({...consulta(),requisito_id:'CM01-R02'},ctx),/A107E0001/);
  await assert.rejects(adaptar(encontrado()).consultar({...consulta(),contexto_autorizacao:'NAO-CONFIAVEL'},ctx),/A107E0001/);
});

test('CE01: registro posterior ao conhecimento_ate não é utilizável', async () => {
  const x=encontrado();
  if(x.status!=='ENCONTRADO')throw new Error('fixture');
  x.registro.registrado_em=new Date(Date.parse(agora)+1000).toISOString();
  const r=await adaptar(x).consultar(consulta(),ctx);
  assert.equal(r.status_consulta,'PARCIAL');
  assert.equal(r.fatos.length,0);
});

test('CE01: somente CM01-R01 pode ficar atendida; Marco A permanece pendente', async () => {
  const pacote=await carregarRegras(join(process.cwd(),'rules'));
  const provider=adaptar(encontrado());
  const {resultado,consultas}=await avaliarComFontes(comando,ctx,pacote,moduleCode=>moduleCode==='A103'?provider:undefined);
  const r01=resultado.condicoes.find(c=>c.condicao_id==='CM-01')?.requisitos.find(r=>r.requisito_id==='CM01-R01');
  assert.equal(r01?.estado,'ATENDIDA');
  assert.equal(resultado.estado,'INDETERMINADA');
  assert.equal(resultado.elegibilidade,'VERIFICACAO_PENDENTE');
  assert.ok(consultas.length>0);
  assert.ok(!('autorizacao' in resultado));
});
