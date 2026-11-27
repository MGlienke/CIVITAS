/** Runner demonstrativo somente para ambiente local de desenvolvimento, sem transporte HTTP.
 * npm install pg antes de executar; use role de aplicação com grants limitados.
 * Não considera um principal de teste uma autorização real: somente modo simulado.
 */
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import { dirname,join } from 'node:path';
import { carregarRegras } from './rule-loader.js';
import { avaliarComFontes } from './engine.js';
import { PostgresVerificationRepository } from './postgres.js';
import type { SqlPool } from './ports.js';
import type { ComandoVerificacao,ContextoAutenticado } from './contracts.js';

if(process.env.A107_DEMO_PG!=='SIM')throw new Error('Defina A107_DEMO_PG=SIM para execução demonstrativa.');
if(!process.env.DATABASE_URL)throw new Error('Defina DATABASE_URL para banco de desenvolvimento.');
const require=createRequire(import.meta.url);
const {Pool}=require('pg') as {Pool:new(config:{connectionString:string})=>SqlPool & {end():Promise<void>}};
const pool=new Pool({connectionString:process.env.DATABASE_URL});
try{
  const root=join(process.cwd(),'rules');
  const pacote=await carregarRegras(root);
  const repo=new PostgresVerificationRepository(pool);
  // PUBLICACAO POR DEPLOY CONTROLADO: proibida a publicação de regras diretamente por usuário operacional.
  if(process.env.A107_PUBLISH_PACKAGE==='SIM')await repo.publicarPacote(pacote);
  const moment=process.env.A107_REFERENCIA_TEMPORAL ?? new Date(Date.now()-120_000).toISOString();
  const cmd:ComandoVerificacao={solicitacao_id:process.env.A107_SOLICITACAO_ID||'TESTE-A107-PG-001',
    correlation_id:'TESTE-A107-PG',organizacao_id:'ORG-TESTE-A107',ambito_id:'MARCO_A',referencia_temporal:moment,conhecimento_ate:moment,motivo:'TESTE_CONTRATO_SEM_EVIDENCIAS_REAIS'};
  const principal:ContextoAutenticado={principal_id:'PRINCIPAL-SIMULADO',autorizacao_contextual_id:'SIMULADO-NAO-AUTORIZADO',origem_autenticacao:'TESTE',escopos:[]};
  if(process.env.A107_PUBLISH_PACKAGE!=='SIM')console.warn('Pacote precisa ter sido publicado previamente.');
  if(process.env.A107_DEMO_PERSIST!=='SIM'){
    console.log('Modo seguro: somente carregamento e avaliação em memória. Defina A107_DEMO_PERSIST=SIM para persistir dados de teste.');
    const e=await avaliarComFontes(cmd,principal,pacote,()=>undefined);
    console.log(e.resultado.estado,e.resultado.elegibilidade); 
  }else{
    console.warn('ATENCAO: teste com principal simulado. NÃO usar como verificação institucional real.');
    const e=await avaliarComFontes(cmd,principal,pacote,()=>undefined);
    const result=await repo.persistir(cmd,principal,pacote,e);
    console.log(JSON.stringify({verificacao_id:result.verificacao_id,estado:result.estado,elegibilidade:result.elegibilidade}));
  }
}finally{await pool.end()}

