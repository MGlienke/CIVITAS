import { test } from 'node:test';
import assert from 'node:assert/strict';
import { join } from 'node:path';
import { AdaptadorCe01A103, type ResultadoConsultaA103 } from '../src/adapters/a103-ce01.js';
import { A107AcessoNegado } from '../src/errors.js';
import { VerificarCondicoesService } from '../src/service.js';
import { carregarRegras } from '../src/rule-loader.js';
import { avaliarComFontes } from '../src/engine.js';
import type { AuthorizationPort, ComandoVerificacao, ContextoAutenticado, EvidenceProvider, RespostaEvidencia } from '../src/contracts.js';
import type { PostgresVerificationRepository } from '../src/postgres.js';

const tempo = new Date(Date.now()-120_000).toISOString();
const comando: ComandoVerificacao = {
  solicitacao_id:'TST-CE01-AUTH',correlation_id:'CORR-CE01-AUTH',
  organizacao_id:'ORG-CE01',ambito_id:'MARCO_A',
  referencia_temporal:tempo,conhecimento_ate:tempo,motivo:'TESTE_DE_ACESSO'
};
const ctx: ContextoAutenticado = {
  principal_id:'PRINCIPAL-TESTE',autorizacao_contextual_id:'AUTH-TESTE',
  origem_autenticacao:'TESTE',escopos:[]
};
const root = join(process.cwd(),'rules');

function serviceComFonte(fonte: ResultadoConsultaA103 | 'EXCECAO' | 'NAO_AUTORIZADA_ENVELOPE', acessoPermitido = true) {
  let chamadasFonte=0;
  let persistencias=0;
  let validacoes=0;
  const autorizacao: AuthorizationPort = {
    validar: async () => {
      validacoes++;
      if (!acessoPermitido) throw new A107AcessoNegado('solicitante sem permissão para executar a verificação');
    }
  };
  const adaptador = new AdaptadorCe01A103({
    consultarIdentidadeInstitucional: async () => {
      chamadasFonte++;
      if (fonte === 'EXCECAO') throw new A107AcessoNegado('infraestrutura A103 negou acesso');
      return fonte === 'NAO_AUTORIZADA_ENVELOPE' ? { status:'NAO_AUTORIZADA'} : fonte;
    }
  });
  const provider: EvidenceProvider = fonte==='NAO_AUTORIZADA_ENVELOPE' ?
    {
      contrato: 'CE-01',
      consultar: async (consulta,contexto) => {
        const reply=await adaptador.consultar(consulta,contexto).catch((e:unknown) => {
          if (e instanceof A107AcessoNegado) {
            // Exercita o ramo de defesa para fornecedores que RESPONDEM com status,
            // em vez de lançar; deliberadamente não transforma status em fato.
            return {
              consulta_id: consulta.consulta_id,
              correlation_id: consulta.correlation_id,
              fonte_modulo:'A103-GEP',
              fonte_autoritativa:'A103-GEP',
              status_consulta:'NAO_AUTORIZADA',
              sujeito: consulta.sujeito,
              propriedade_id: consulta.propriedade_id
            } as RespostaEvidencia;
          }
          throw e;
        });
        return reply;
      }
    } : adaptador;
  const repositorio={
    persistir: async (_cmd:unknown, _ctx:unknown, _pacote:unknown, avaliacao: {resultado: unknown}) => {
      persistencias++;
      return avaliacao.resultado;
    }
  } as unknown as PostgresVerificationRepository;
  const service=new VerificarCondicoesService(root,autorizacao,
    modulo => modulo==='A103' ? provider : undefined,
    repositorio);
  return {service, estatisticas:()=>({chamadasFonte,persistencias,validacoes})};
}

test('CE01 E2E: A103 nega acesso; A107E0002 aborta antes de persistir',async()=>{
  const {service,estatisticas}=serviceComFonte({status:'NAO_AUTORIZADA'});
  await assert.rejects(service.verificar(comando,ctx),e=>e instanceof A107AcessoNegado && e.codigo==='A107E0002');
  assert.deepEqual(estatisticas(),{chamadasFonte:1,persistencias:0,validacoes:1});
});

test('CE01 E2E: exceção tipada da porta A103 interrompe o motor e não persiste',async()=>{
  const {service,estatisticas}=serviceComFonte('EXCECAO');
  await assert.rejects(service.verificar(comando,ctx),A107AcessoNegado);
  assert.equal(estatisticas().persistencias,0);
});

test('CE01 E2E: status NAO_AUTORIZADA devolvido por provider não é indeterminação',async()=>{
  const {service,estatisticas}=serviceComFonte('NAO_AUTORIZADA_ENVELOPE');
  await assert.rejects(service.verificar(comando,ctx),e=>e instanceof A107AcessoNegado && e.codigo==='A107E0002');
  assert.equal(estatisticas().persistencias,0);
});

test('CE01 E2E: validação de acesso inicial nega antes da consulta A103',async()=>{
  const {service,estatisticas}=serviceComFonte({status:'INDISPONIVEL'},false);
  await assert.rejects(service.verificar(comando,ctx),A107AcessoNegado);
  assert.deepEqual(estatisticas(),{chamadasFonte:0,persistencias:0,validacoes:1});
});

test('CE01: indisponibilidade continua indeterminada (diferente de acesso negado)',async()=>{
  const pacote=await carregarRegras(root);
  const adaptador=new AdaptadorCe01A103({consultarIdentidadeInstitucional:async()=>({status:'INDISPONIVEL'})});
  const r=await avaliarComFontes(comando,ctx,pacote,modulo=>modulo==='A103'?adaptador:undefined);
  assert.equal(r.resultado.estado,'INDETERMINADA');
  assert.equal(r.resultado.elegibilidade,'VERIFICACAO_PENDENTE');
  assert.equal(r.resultado.condicoes[0].requisitos[0].estado,'INDETERMINADA');
});
