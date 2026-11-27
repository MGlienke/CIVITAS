import test from 'node:test';
import assert from 'node:assert/strict';
import {randomUUID} from 'node:crypto';
import {resolve} from 'node:path';
import {pathToFileURL} from 'node:url';
import {PublicadorSimuladoPostgres} from '../src/pg-simulacao.js';
import {PortaIdentidadeA103Laboratorio} from '../src/ce01-porta-laboratorio.js';

const active=process.env.A103_T2_TEST_ONLY==='1' &&
 process.env.A103_T4_LAB_ONLY==='1' && Boolean(process.env.A103_T2_DATABASE_URL);

test('T4-PG A103 real PostgreSQL → porta CE-01 → A107 (apenas simulação)',{skip:!active},async()=>{
 const {default:pg}=await import('pg');
 const a107base=resolve(process.cwd(),'../a107-eob/dist');
 const {AdaptadorCe01A103}=await import(pathToFileURL(resolve(a107base,'src/adapters/a103-ce01.js')).href);
 const {avaliarComFontes}=await import(pathToFileURL(resolve(a107base,'src/engine.js')).href);
 const {carregarRegras}=await import(pathToFileURL(resolve(a107base,'src/rule-loader.js')).href);
 const {A107AcessoNegado}=await import(pathToFileURL(resolve(a107base,'src/errors.js')).href);
 const pool=new pg.Pool({connectionString:process.env.A103_T2_DATABASE_URL,max:4});
 try{
  const writer=new PublicadorSimuladoPostgres(pool);
  const id=randomUUID();
  const cmd={
    solicitacao_id:id,correlation_id:id,ambiente:'SIMULADO',
    nome:'T4-Organizacao-Simulada-'+id,origem_referencial:'ORIGEM_SIMULADA',
    provas:[{id:'DOCUMENTO_FICTICIO_T4',custodiante:'C301-RDI'}]
  };
  const published=await writer.publicar(cmd,{principal_simulado:'T4-PUBLISHER-LAB',permitir_simulacao:true});
  assert.equal(published.ambiente,'SIMULADO');
  assert.equal(published.marco_a_autorizado,false);
  // Aguardar o relógio para que o conhecimento não anteceda registrado_em.
  await new Promise(resolve=>setTimeout(resolve,100));
  const now=new Date().toISOString();
  assert.ok(Date.parse(now)>=Date.parse(published.registrado_em));
  const c={
    solicitacao_id:'T4-CHECK-'+id,correlation_id:'T4-CORR-'+id,
    organizacao_id:published.organizacao_id,ambito_id:'MARCO_A',
    referencia_temporal:now,conhecimento_ate:now,motivo:'T4_SIMULACAO'
  };
  const ctx={principal_id:'T4-LAB-PRINCIPAL',autorizacao_contextual_id:'T4-LAB-AUTH',origem_autenticacao:'SIMULADO',escopos:[]};
  let reads=0;
  const port=new PortaIdentidadeA103Laboratorio(pool,async(query,context)=>{
    reads++;
    return context.principal_id==='T4-LAB-PRINCIPAL' &&
      query.contexto_autorizacao===context.autorizacao_contextual_id;
  });
  const adapter=new AdaptadorCe01A103(port);
  const pacote=await carregarRegras(resolve(process.cwd(),'../a107-eob/rules'));
  const evaluation=await avaliarComFontes(c,ctx,pacote,code=>code==='A103'?adapter:undefined);
  const r01=evaluation.resultado.condicoes.find(x=>x.condicao_id==='CM-01')?.requisitos.find(x=>x.requisito_id==='CM01-R01');
  assert.equal(r01?.estado,'ATENDIDA'); // APENAS avaliação SIMULADA, NUNCA persistir em produção
  assert.equal(r01.evidencias.length,1);
  assert.match(r01.evidencias[0].referencia_documental_ou_registro,/^simulacao:/);
  assert.equal(r01.evidencias[0].custodiante_modulo,'A103-GEP');
  assert.ok(reads>0);
  assert.equal(evaluation.resultado.estado,'INDETERMINADA');
  assert.equal(evaluation.resultado.elegibilidade,'VERIFICACAO_PENDENTE');
  assert.ok(!('marco_a_autorizado' in evaluation.resultado));
  // Somente leitura da fonte; resposta pode ser reconhecida sem persistência no A107.
  assert.equal(evaluation.consultas.filter(x=>x.consulta.requisito_id==='CM01-R01').length,1);
  // Negativa na porta de fonte: deve abortar a verificação, e não virar NAO_ATENDIDA.
  const deniedAdapter=new AdaptadorCe01A103(new PortaIdentidadeA103Laboratorio(pool,async()=>false));
  await assert.rejects(avaliarComFontes(c,ctx,pacote,code=>code==='A103'?deniedAdapter:undefined),
    e=>e instanceof A107AcessoNegado && e.codigo==='A107E0002');
  // A ausência e o tempo anterior ao registro não constituem prova negativa.
  const query=evaluation.consultas.find(x=>x.consulta.requisito_id==='CM01-R01').consulta;
  const noRecord=await port.consultarIdentidadeInstitucional({...query,organizacao_id:randomUUID(),sujeito:{tipo:'OrganizacaoInstitucional',referencia:randomUUID()}},ctx);
  assert.equal(noRecord.status,'ERRO'); // par sujeito/organização inconsistente é recusado.
  const unknownId=randomUUID();
  const missing=await port.consultarIdentidadeInstitucional({...query,organizacao_id:unknownId,sujeito:{tipo:'OrganizacaoInstitucional',referencia:unknownId}},ctx);
  assert.equal(missing.status,'NAO_LOCALIZADO');
  assert.equal(missing.consulta_completa,false);
  const before=new Date(Date.parse(published.registrado_em)-1000).toISOString();
  const past=await port.consultarIdentidadeInstitucional({...query,referencia_temporal:before},ctx);
  assert.notEqual(past.status,'ENCONTRADO');
  // Snapshot da mesma versão permanece recuperável para consulta pontual repetida.
  const q1=await port.consultarIdentidadeInstitucional(query,ctx);
  const q2=await port.consultarIdentidadeInstitucional(query,ctx);
  assert.equal(q1.status,'ENCONTRADO');
  assert.equal(q1.registro.snapshot_fonte,q2.registro.snapshot_fonte);
  assert.equal(q1.registro.versao_registro,published.versao_registro);
 }finally{await pool.end();}
});
