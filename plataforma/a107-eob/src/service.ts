import type { AuthorizationPort,ComandoVerificacao,ContextoAutenticado,ResultadoVerificacao } from './contracts.js';
import type { EvidenceResolver } from './engine.js';
import { avaliarComFontes } from './engine.js';
import { validateCommandTimes } from './invariants.js';
import { carregarRegras } from './rule-loader.js';
import { PostgresVerificationRepository } from './postgres.js';

/** Aplicação sem transporte externo; contexto deve ser fornecido por autenticação confiável. */
export class VerificarCondicoesService {
  constructor(private readonly regrasDir:string,private readonly autorizacao:AuthorizationPort,
    private readonly resolve:EvidenceResolver,private readonly repository:PostgresVerificationRepository) {}
  async verificar(comando:ComandoVerificacao,contexto:ContextoAutenticado):Promise<ResultadoVerificacao>{
    if(comando.ambito_id!=='MARCO_A'||!comando.solicitacao_id||!comando.organizacao_id||!comando.motivo)throw new Error('A107E0001: pedido incompleto');
    validateCommandTimes(comando);
    if(!contexto.principal_id||!contexto.autorizacao_contextual_id)throw new Error('A107E0002: contexto não autenticado');
    await this.autorizacao.validar(contexto,comando.organizacao_id,'MARCO_A');
    const pacote=await carregarRegras(this.regrasDir);
    if(comando.versao_regras && pacote.pacote.versao!==comando.versao_regras)throw new Error('A107E0003: versão solicitada diferente do pacote disponível');
    // Ainda não existe provider real; não transforma ausência de fonte em NAO_ATENDIDA.
    const evaluation=await avaliarComFontes(comando,contexto,pacote,this.resolve);
    return this.repository.persistir(comando,contexto,pacote,evaluation);
  }
}
