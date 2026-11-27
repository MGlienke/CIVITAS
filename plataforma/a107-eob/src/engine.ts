import { randomUUID } from 'node:crypto';
import type { ComandoVerificacao, ContextoAutenticado, ConsultaEvidencia, EvidenciaReferencial, EvidenceProvider, ResultadoCondicao, ResultadoRequisito, ResultadoVerificacao, RespostaEvidencia, EstadoMarcoA, Diagnostico } from './contracts.js';
import type { PacoteCarregado, RegraRequisito } from './rule-loader.js';
import { eligibleFromState, validateMarcoAResult, validateEvidenceResponse } from './invariants.js';

export interface ConsultaLog { consulta: ConsultaEvidencia; resposta: RespostaEvidencia }
export interface ResultadoAvaliacao { resultado: ResultadoVerificacao; consultas: ConsultaLog[] }
export type EvidenceResolver = (moduleCode:string) => EvidenceProvider | undefined;
const compose = (states: EstadoMarcoA[]):EstadoMarcoA => states.includes('NAO_ATENDIDA') ? 'NAO_ATENDIDA' : states.includes('INDETERMINADA') ? 'INDETERMINADA' : 'ATENDIDA';

/** Conservador: uma afirmação de uma fonte não basta para provar fundamento jurídico, precedência,
 * correspondência ontológica, completude normativa ou legitimação contextual. Tais verificadores
 * especializados permanecem pendentes. O motor inicial nunca produz ATENDIDA para esses operadores. */
function avaliarRequisito(rule:RegraRequisito, response: RespostaEvidencia): {estado: EstadoMarcoA; justificativa:string; diagnosticos:Diagnostico[]; evidencias:EvidenciaReferencial[]} {
  const diagnostics = [...response.diagnosticos];
  if(response.status_consulta!=='OK'||response.consistencia.divergencias.length||response.proxima_pagina){
    return {estado:'INDETERMINADA',justificativa:'Fonte incompleta, divergente ou indisponível.',diagnosticos:diagnostics,evidencias:[]};
  }
  const evidenceIds = new Set(response.evidencias.map(e=>e.evidencia_id));
  const valid = response.fatos.filter(f=> f.predicado===rule.propriedade && f.sujeito.tipo===response.sujeito.tipo &&
    f.sujeito.referencia===response.sujeito.referencia && f.evidencia_ids.length>0 && f.evidencia_ids.every(e=>evidenceIds.has(e)));
  // O operador 'existe' pode ser demonstrado apenas pela presença de registro identificado e evidência referencial.
  if(rule.operador==='existe' && valid.length>0 && response.fonte_autoritativa &&
     (response.integridade.versao_fonte || response.integridade.hash_sha256) &&
     valid.some(f=>f.evidencia_ids.some(id=>response.evidencias.some(e=>e.evidencia_id===id && (e.versao||e.hash_sha256))))){
    return {estado:'ATENDIDA',justificativa:'Existência observada com fato identificado e evidência referencial; pertinência final depende de contrato com fonte autoritativa.',diagnosticos:diagnostics,evidencias:response.evidencias.filter(e=>valid.some(f=>f.evidencia_ids.includes(e.evidencia_id)))};
  }
  return {estado:'INDETERMINADA',justificativa:'Verificador especializado e/ou provas suficientes ainda não disponíveis; ausência não é prova de descumprimento.',diagnosticos:[...diagnostics,{codigo:'A107W0007',descricao:'Avaliação conservadora: insuficiência probatória'}],evidencias:[]};
}
export async function avaliarComFontes(comando:ComandoVerificacao, contexto:ContextoAutenticado, pacote:PacoteCarregado, resolve:EvidenceResolver):Promise<ResultadoAvaliacao>{
  const correlation=comando.correlation_id;
  const consultas:ConsultaLog[]=[];
  const condicoes:ResultadoCondicao[]=[];
  const provisoryId=randomUUID();
  for(const c of pacote.condicoes){
    const requisitos:ResultadoRequisito[]=[];
    for(const r of c.requisitos){
      const modulo=r.fonte.split('-')[0];
      const query:ConsultaEvidencia={consulta_id:randomUUID(),correlation_id:correlation,verificacao_id:provisoryId,organizacao_id:comando.organizacao_id,
        requisito_id:r.id as ResultadoRequisito['requisito_id'],sujeito:{tipo:'OrganizacaoInstitucional',referencia:comando.organizacao_id},propriedade_id:r.propriedade,
        referencia_temporal:comando.referencia_temporal,conhecimento_ate:comando.conhecimento_ate,pacote_regras:pacote.pacote,contexto_autorizacao:contexto.autorizacao_contextual_id};
      const provider=resolve(modulo);
      let state:ReturnType<typeof avaliarRequisito> = {estado:'INDETERMINADA',justificativa:`Fonte ${modulo} ainda não integrada`,diagnosticos:[{codigo:'A107W0008',descricao:`Fonte ${modulo} não configurada`}],evidencias:[]};
      if(provider){
        try {
          const reply=await provider.consultar(query,contexto);
          validateEvidenceResponse(query,reply);
          consultas.push({consulta:query,resposta:reply});
          state=avaliarRequisito(r,reply);
        } catch(e){
          state={estado:'INDETERMINADA',justificativa:'Resposta não utilizável; integração com fonte pendente.',diagnosticos:[{codigo:'A107W0009',descricao:String(e)}],evidencias:[]};
        }
      }
      requisitos.push({requisito_id:query.requisito_id,operador:r.operador,propriedade_id:r.propriedade,estado:state.estado,
        justificativa:state.justificativa,parametros:r.parametros??{},diagnosticos:state.diagnosticos,evidencias:state.evidencias});
    }
    const estado=compose(requisitos.map(r=>r.estado));
    condicoes.push({condicao_id:c.id,estado,justificativa:estado==='ATENDIDA'?'Todos os requisitos demonstrados.':'Existem requisitos ainda não demonstrados.',requisitos});
  }
  const estado=compose(condicoes.map(c=>c.estado));
  const result:ResultadoVerificacao={verificacao_id:provisoryId,solicitacao_id:comando.solicitacao_id,correlation_id:correlation,organizacao_id:comando.organizacao_id,
    ambito_id:'MARCO_A',referencia_temporal:comando.referencia_temporal,conhecimento_ate:comando.conhecimento_ate,executado_em:new Date().toISOString(),
    pacote_regras:pacote.pacote,estado,elegibilidade:eligibleFromState(estado),condicoes,avisos:[{codigo:'A107W0007',descricao:'Motor inicial: operadores especializados e integrações reais pendentes'}],referencias_historicas:[]};
  validateMarcoAResult(result);
  return {resultado:result,consultas};
}
