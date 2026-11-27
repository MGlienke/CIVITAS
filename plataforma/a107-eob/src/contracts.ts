/** CIVITAS A107-EOB | SRV-A107-003 | Contratos físicos propostos v0.1.
 * Sem transporte HTTP definido. Timestamps ISO8601 com offset; validação em runtime via JSON Schema.
 * Os tipos aqui não autorizam o Marco A nem substituem os contratos do C103-IEA.
 */
export type ISODateTime = string;
export type UUID = string;
export type SHA256 = string;
export type CondicaoId = 'CM-01' | 'CM-02' | 'CM-03' | 'CM-04';
export type RequisitoId = `CM0${1|2|3|4}-R0${1|2|3|4|5|6}`;
export type Operador = 'existe' | 'corresponde' | 'relacionado_a' | 'fundamentado_em' | 'vigente_em' | 'reconhecido_por' | 'satisfaz' | 'precede';
export type Compositor = 'todos' | 'algum' | 'nenhum' | 'para_cada';
export type EstadoLogico = 'ATENDIDA' | 'NAO_ATENDIDA' | 'INDETERMINADA' | 'NAO_APLICAVEL';
export type EstadoMarcoA = Exclude<EstadoLogico, 'NAO_APLICAVEL'>;
export type Elegibilidade = 'ELEGIVEL_PARA_AUTORIZACAO' | 'NAO_ELEGIVEL' | 'VERIFICACAO_PENDENTE';
export type StatusConsulta = 'OK' | 'PARCIAL' | 'INDISPONIVEL' | 'NAO_AUTORIZADA' | 'ERRO';
export type EstadoExecucao = 'RECEBIDA' | 'VALIDANDO' | 'CONSULTANDO_FONTES' | 'AVALIANDO' | 'CONCLUIDA' | 'REJEITADA' | 'FALHA_TECNICA';
export type StatusOutbox = 'PENDENTE' | 'EM_ENVIO' | 'ENTREGUE' | 'FALHA';
export type MotivoExecucao = 'VERIFICACAO_INICIAL' | 'REAVALIACAO_PERIODICA' | 'REAVALIACAO_MANUAL' | 'OPERACAO_CRITICA';

export interface Sujeito { tipo: string; referencia: string }
export interface PacoteRegras { id: string; versao: string; hash_sha256: SHA256; esquema_versao: string }
export interface Diagnostico { codigo: string; descricao: string; bloqueante?: boolean }
/** Principal e autorização chegam de infraestrutura confiável, FORA do corpo do pedido. */
export interface ContextoAutenticado {
  principal_id: string;
  autorizacao_contextual_id: string;
  origem_autenticacao: string;
  escopos: readonly string[];
}
export interface ComandoVerificacao {
  solicitacao_id: string;
  correlation_id: string;
  organizacao_id: string;
  ambito_id: 'MARCO_A';
  referencia_temporal: ISODateTime;
  conhecimento_ate: ISODateTime;
  motivo: string;
  versao_regras?: string;
}
export interface CriterioCobertura { universo_id: string; fonte_universo: string; completude_obrigatoria: boolean }
export interface ConsultaEvidencia {
  consulta_id: string;
  correlation_id: string;
  verificacao_id: string;
  organizacao_id: string;
  requisito_id: RequisitoId;
  sujeito: Sujeito;
  propriedade_id: string;
  referencia_temporal: ISODateTime;
  conhecimento_ate: ISODateTime;
  pacote_regras: PacoteRegras;
  contexto_autorizacao: string;
  criterio_cobertura?: CriterioCobertura;
  paginacao?: { cursor?: string; limite: number };
}
export interface Cobertura {
  universo_completo: 'COMPROVADO' | 'NAO_COMPROVADO' | 'NAO_APLICAVEL_JUSTIFICADO';
  consulta_completa: 'SIM' | 'NAO' | 'INDETERMINADA';
  prova_completude: string[];
  criterio_determinacao?: string;
}
export interface EvidenciaReferencial {
  evidencia_id: string;
  custodiante_modulo: string;
  referencia_documental_ou_registro: string;
  versao?: string;
  hash_sha256?: SHA256;
  ocorrido_em?: ISODateTime;
  registrado_em?: ISODateTime;
}
export interface FatoEvidenciado {
  fato_id: string;
  sujeito: Sujeito;
  predicado: string;
  objeto: unknown;
  evidencia_ids: string[];
  registrado_em?: ISODateTime;
}
export interface RespostaEvidencia {
  consulta_id: string;
  correlation_id: string;
  fonte_modulo: string;
  fonte_autoritativa: string;
  status_consulta: StatusConsulta;
  sujeito: Sujeito;
  propriedade_id: string;
  fatos: FatoEvidenciado[];
  evidencias: EvidenciaReferencial[];
  temporalidade: {
    referencia_temporal: ISODateTime;
    conhecimento_ate: ISODateTime;
    consultado_em: ISODateTime;
    snapshot_fonte?: string;
    versao_fonte?: string;
  };
  cobertura: Cobertura;
  consistencia: { divergencias: string[] };
  integridade: { versao_fonte?: string; hash_sha256?: SHA256 };
  diagnosticos: Diagnostico[];
  proxima_pagina?: string | null;
}
export interface ResultadoRequisito {
  requisito_id: RequisitoId;
  operador: Operador;
  propriedade_id: string;
  estado: EstadoMarcoA;
  justificativa: string;
  parametros: Record<string, unknown>;
  diagnosticos: Diagnostico[];
  evidencias: EvidenciaReferencial[];
}
export interface ResultadoCondicao {
  condicao_id: CondicaoId;
  estado: EstadoMarcoA;
  justificativa: string;
  requisitos: ResultadoRequisito[];
}
export interface ResultadoVerificacao {
  verificacao_id: UUID;
  solicitacao_id: string;
  correlation_id: string;
  organizacao_id: string;
  ambito_id: 'MARCO_A';
  referencia_temporal: ISODateTime;
  conhecimento_ate: ISODateTime;
  executado_em: ISODateTime;
  pacote_regras: PacoteRegras;
  estado: EstadoMarcoA;
  elegibilidade: Elegibilidade;
  condicoes: ResultadoCondicao[];
  avisos: Diagnostico[];
  referencias_historicas: string[];
}
/** CE-01…CE-12 são designações lógicas provisórias, não SRV homologados de outros módulos. */
export type ContratoEvidenciaId = `CE-${'01'|'02'|'03'|'04'|'05'|'06'|'07'|'08'|'09'|'10'|'11'|'12'}`;
export interface EvidenceProvider {
  readonly contrato: ContratoEvidenciaId;
  consultar(consulta: ConsultaEvidencia, contexto: ContextoAutenticado): Promise<RespostaEvidencia>;
}
export interface RuleRepository {
  resolver(ambito: 'MARCO_A', versao?: string): Promise<PacoteRegras>;
}
export interface AuthorizationPort {
  validar(contexto: ContextoAutenticado, organizacaoId: string, ambitoId: 'MARCO_A'): Promise<void>;
}
export interface VerificationRepository {
  consultarPorIdempotencia(organizacaoId: string, principalId: string, solicitacaoId: string): Promise<{ pedido_hash_sha256: SHA256; resultado?: ResultadoVerificacao; status: EstadoExecucao } | null>;
  /** Uma transação PostgreSQL local grava agregados e outbox conjuntamente. */
  concluirComOutbox(resultado: ResultadoVerificacao, dadosExecucao: { execucao_id: UUID; pedido_hash_sha256: SHA256 }): Promise<void>;
}
export interface VerificationCommandPort {
  verificar(comando: ComandoVerificacao, contexto: ContextoAutenticado): Promise<ResultadoVerificacao>;
}
export interface ImpactEventPort { registrarAlteracao(eventoId: string, moduloOrigem: string): Promise<void> }
export interface TelemetryPort { registrar(codigo: string, correlationId: string, metadados: Record<string, unknown>): void }
