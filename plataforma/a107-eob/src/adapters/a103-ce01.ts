import type {
  ConsultaEvidencia, ContextoAutenticado, EvidenceProvider,
  RespostaEvidencia, EvidenciaReferencial, Diagnostico
} from '../contracts.js';
import { A107AcessoNegado } from '../errors.js';

/** CE-01: fronteira contratual; nenhuma implementação de A103 é presumida. */
export interface RegistroIdentidadeA103 {
  organizacao_id: string;
  registro_id: string;
  versao_registro: string;
  referencia_evidencia: string;
  evidencia_id: string;
  /** Momento de registro conhecido pela fonte; não é data de vigência jurídica. */
  registrado_em: string;
  /** Estado histórico que a fonte efetivamente reconstruiu. */
  referencia_temporal: string;
  conhecimento_ate: string;
  snapshot_fonte: string;
  fonte_autoritativa: string;
  /** Sinal operacional de completude da consulta pontual, não prova de universo completo. */
  consulta_completa: boolean;
}
export type ResultadoConsultaA103 =
  | { status: 'ENCONTRADO'; registro: RegistroIdentidadeA103 }
  | { status: 'NAO_LOCALIZADO'; consulta_completa: boolean; snapshot_fonte?: string }
  | { status: 'INDISPONIVEL' }
  | { status: 'NAO_AUTORIZADA' }
  | { status: 'ERRO' };

/** Porta proprietária A103, a implementar quando seu serviço for especificado. */
export interface PortaIdentidadeA103 {
  consultarIdentidadeInstitucional(consulta: ConsultaEvidencia, contexto: ContextoAutenticado): Promise<ResultadoConsultaA103>;
}

const dataValida = (valor: string): boolean => typeof valor === 'string' && Number.isFinite(Date.parse(valor));
const preenchida = (v: unknown): v is string => typeof v === 'string' && v.trim().length > 0;
const instante = (v: string): number => Date.parse(v);

/**
 * Adaptador de contrato CE-01, recorte CM01-R01.
 *
 * NÃO realiza autorização do Marco A.
 * O vínculo ao serviço autêntico A103 e a validação do contexto autenticado
 * devem ser providos por infraestrutura confiável; uma porta mock não prova autoridade.
 */
export class AdaptadorCe01A103 implements EvidenceProvider {
  readonly contrato = 'CE-01' as const;
  constructor(private readonly a103: PortaIdentidadeA103) {}

  async consultar(consulta: ConsultaEvidencia, contexto: ContextoAutenticado): Promise<RespostaEvidencia> {
    if (consulta.requisito_id !== 'CM01-R01' ||
        consulta.propriedade_id !== 'identidade_institucional' ||
        consulta.sujeito.tipo !== 'OrganizacaoInstitucional' ||
        consulta.sujeito.referencia !== consulta.organizacao_id ||
        !preenchida(consulta.organizacao_id) ||
        !preenchida(consulta.contexto_autorizacao) ||
        consulta.contexto_autorizacao !== contexto.autorizacao_contextual_id ||
        !preenchida(contexto.principal_id) ||
        !dataValida(consulta.referencia_temporal) ||
        !dataValida(consulta.conhecimento_ate) ||
        instante(consulta.conhecimento_ate) > Date.now()) {
      throw new Error('A107E0001: consulta CE-01 fora do escopo ou contexto inconsistente');
    }

    // Não consultar SQL interno do A103. Apenas porta de domínio proprietária.
    const resposta = await this.a103.consultarIdentidadeInstitucional(consulta, contexto);
    if (resposta.status === 'NAO_AUTORIZADA') {
      throw new A107AcessoNegado('fonte A103 negou acesso à evidência');
    }

    const diag: Diagnostico[] = [];
    let status: RespostaEvidencia['status_consulta'] = 'PARCIAL';
    let fatos: RespostaEvidencia['fatos'] = [];
    let evidencias: EvidenciaReferencial[] = [];
    let snapshot_fonte: string | undefined;
    let versao_fonte: string | undefined;
    let fonte_autoritativa = 'A103-GEP'; // identifica dono lógico, NÃO prova autenticação da origem
    let consultaCompleta = false;

    if (resposta.status === 'ENCONTRADO') {
      const x = resposta.registro;
      const coerente = preenchida(x.organizacao_id) &&
        x.organizacao_id === consulta.organizacao_id &&
        preenchida(x.registro_id) &&
        preenchida(x.versao_registro) &&
        preenchida(x.referencia_evidencia) &&
        preenchida(x.evidencia_id) &&
        preenchida(x.snapshot_fonte) &&
        preenchida(x.fonte_autoritativa) &&
        x.fonte_autoritativa === 'A103-GEP' &&
        dataValida(x.registrado_em) &&
        dataValida(x.referencia_temporal) &&
        dataValida(x.conhecimento_ate) &&
        instante(x.registrado_em) <= instante(consulta.conhecimento_ate) &&
        instante(x.referencia_temporal) === instante(consulta.referencia_temporal) &&
        instante(x.conhecimento_ate) === instante(consulta.conhecimento_ate) &&
        x.consulta_completa === true;

      if (!coerente) {
        diag.push({codigo:'A107W0009',descricao:'A103: registro incompleto, origem ou temporalidade incompatível'});
      } else {
        status = 'OK';
        consultaCompleta = true;
        snapshot_fonte = x.snapshot_fonte;
        versao_fonte = x.versao_registro;
        fonte_autoritativa = x.fonte_autoritativa;
        evidencias = [{
          evidencia_id: x.evidencia_id,
          custodiante_modulo: 'A103-GEP',
          referencia_documental_ou_registro: x.referencia_evidencia,
          versao: x.versao_registro,
          registrado_em: x.registrado_em
        }];
        fatos = [{
          fato_id: x.registro_id,
          sujeito: consulta.sujeito,
          predicado: consulta.propriedade_id,
          objeto: {organizacao_id: x.organizacao_id, registro_id: x.registro_id},
          evidencia_ids: [x.evidencia_id],
          registrado_em: x.registrado_em
        }];
      }
    } else if (resposta.status === 'NAO_LOCALIZADO') {
      // Ausência sem prova do universo exigível: NÃO inferir NAO_ATENDIDA.
      status = resposta.consulta_completa ? 'OK' : 'PARCIAL';
      consultaCompleta = resposta.consulta_completa;
      snapshot_fonte = resposta.snapshot_fonte;
      diag.push({codigo:'A107W0007',descricao:'A103 não encontrou registro; ausência não é prova negativa'});
    } else {
      status = resposta.status;
      diag.push({codigo:'A107W0008',descricao:'A103 indisponível ou com falha; evidência não demonstrada'});
    }

    return {
      consulta_id: consulta.consulta_id,
      correlation_id: consulta.correlation_id,
      fonte_modulo: 'A103-GEP',
      fonte_autoritativa,
      status_consulta: status,
      sujeito: consulta.sujeito,
      propriedade_id: consulta.propriedade_id,
      fatos,
      evidencias,
      temporalidade: {
        referencia_temporal: consulta.referencia_temporal,
        conhecimento_ate: consulta.conhecimento_ate,
        consultado_em: new Date().toISOString(),
        snapshot_fonte,
        versao_fonte
      },
      cobertura: {
        universo_completo: 'NAO_COMPROVADO',
        consulta_completa: consultaCompleta ? 'SIM' : 'INDETERMINADA',
        prova_completude: []
      },
      consistencia: {divergencias: diag.some(d => d.codigo==='A107W0009') ? ['A103: resposta inconsistente'] : []},
      integridade: versao_fonte ? {versao_fonte} : {},
      diagnosticos: diag,
      proxima_pagina: null
    };
  }
}
