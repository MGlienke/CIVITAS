import { fileURLToPath } from 'node:url';
import { dirname,join } from 'node:path';
import { carregarRegras } from './rule-loader.js';
import { avaliarComFontes } from './engine.js';
import type { ComandoVerificacao,ContextoAutenticado } from './contracts.js';
const rulesDir=join(process.cwd(),'rules');
const now=new Date(Date.now()-60_000).toISOString();
const command:ComandoVerificacao={solicitacao_id:'TESTE-LOCAL-001',correlation_id:'CORR-TESTE',organizacao_id:'ORG-DEMONSTRACAO',ambito_id:'MARCO_A',
  referencia_temporal:now,conhecimento_ate:now,motivo:'DEMONSTRACAO_SEM_FONTES_REAIS'};
const context:ContextoAutenticado={principal_id:'PRINCIPAL-DE-TESTE',autorizacao_contextual_id:'AUTH-DE-TESTE',origem_autenticacao:'SIMULADA',escopos:['MARCO_A']};
const rules=await carregarRegras(rulesDir);
const evaluation=await avaliarComFontes(command,context,rules,()=>undefined);
console.log(JSON.stringify({pacote:rules.pacote,condicoes:evaluation.resultado.condicoes.map(c=>({id:c.condicao_id,estado:c.estado,requisitos:c.requisitos.length})),
  estado:evaluation.resultado.estado,elegibilidade:evaluation.resultado.elegibilidade,consultas:evaluation.consultas.length,
  aviso:'SIMULACAO SEM FONTES REAIS; NENHUM DADO PERSISTIDO'},null,2));
