/**
 * Protótipo T1 A103-GEP: estado IN-MEMORY, dados SOMENTE SIMULADOS.
 * NÃO é CS-04 de produção, não é fonte institucional real, não emite CE-01 real,
 * não implementa autenticação, competência, constituição jurídica ou Marco A.
 * Não persiste no PostgreSQL; não contém dependências externas.
 */
import { createHash, randomUUID } from 'node:crypto';

const clone = value => structuredClone(value);
const fail = (code, message) => { const error = new Error(message); error.code = code; throw error; };
const digest = value => createHash('sha256').update(JSON.stringify(value)).digest('hex');
const isText = value => typeof value === 'string' && value.trim().length > 0;

export class RegistroSimuladoA103 {
  #propostas = new Map();
  #organizacoes = new Map();
  #idempotencia = new Map();
  #eventos = [];
  #sequencia = 0;

  preparar({ solicitacao_id, nome, origem_referencial, provas = [], organizacao_id = null, versao_base = null }) {
    if (![solicitacao_id, nome, origem_referencial].every(isText)) fail('SOLICITACAO_INVALIDA', 'identificadores, nome e origem são obrigatórios');
    if (!Array.isArray(provas) || !provas.every(p => isText(p.id) && isText(p.custodiante))) fail('PROVAS_INVALIDAS', 'referências e custodiantes exigidos');
    const comando = { solicitacao_id, nome, origem_referencial, provas, organizacao_id, versao_base };
    const hash = digest(comando);
    const anterior = this.#idempotencia.get(solicitacao_id);
    if (anterior) {
      if (anterior.hash !== hash) fail('IDEMPOTENCIA_DIVERGENTE', 'solicitação diferente com a mesma chave');
      return clone(this.#propostas.get(anterior.proposta_id));
    }
    if (organizacao_id) {
      const existente = this.#organizacoes.get(organizacao_id);
      if (!existente) fail('ORGANIZACAO_INEXISTENTE', 'retificação não possui organização base');
      if (existente.versoes.at(-1).versao !== versao_base) fail('VERSAO_CONCORRENTE', 'versão-base divergente');
    }
    const proposta = {
      proposta_id: randomUUID(), solicitacao_id, nome, origem_referencial,
      provas: clone(provas), organizacao_id, versao_base, estado: 'PROPOSTA',
      ambiente: 'SIMULADO', versao_proposta: 1
    };
    this.#propostas.set(proposta.proposta_id, proposta);
    this.#idempotencia.set(solicitacao_id, { hash, proposta_id: proposta.proposta_id });
    return clone(proposta);
  }

  examinar(proposta_id) {
    const p = this.#obterProposta(proposta_id);
    if (p.estado !== 'PROPOSTA' && p.estado !== 'PENDENTE_SANEAMENTO') fail('ESTADO_INVALIDO', 'proposta não examinável');
    const conflitos = [...this.#organizacoes.values()].filter(o => !p.organizacao_id &&
      o.nome_referencia.toLocaleLowerCase('pt-BR') === p.nome.toLocaleLowerCase('pt-BR'));
    if (conflitos.length || p.provas.length === 0) {
      p.estado = 'PENDENTE_SANEAMENTO';
      return { estado: p.estado, diagnostico: conflitos.length ? 'IDENTIDADE_POTENCIALMENTE_DUPLICADA' : 'REFERENCIA_PROBATORIA_AUSENTE' };
    }
    p.estado = 'AGUARDANDO_PUBLICACAO';
    return { estado: p.estado };
  }

  /** Autorização simulada injetada SOMENTE em testes. Não serve para operação real. */
  publicar(proposta_id, { permitir_publicacao_simulada = false } = {}) {
    if (permitir_publicacao_simulada !== true) fail('NAO_AUTORIZADA', 'não há permissão simulada de publicação');
    const p = this.#obterProposta(proposta_id);
    if (p.estado === 'PUBLICADA') return clone(p.resultado);
    if (p.estado !== 'AGUARDANDO_PUBLICACAO') fail('ESTADO_INVALIDO', 'somente propostas examinadas podem publicar');
    // Pré-validação completa antes de qualquer mutação (protótipo in-memory, NÃO é transação real).
    if (p.provas.length === 0) fail('REFERENCIA_PROBATORIA_AUSENTE', 'faltam provas');
    const o = p.organizacao_id ? this.#organizacoes.get(p.organizacao_id) : null;
    if (p.organizacao_id && (!o || o.versoes.at(-1).versao !== p.versao_base)) fail('VERSAO_CONCORRENTE', 'alteração concorrente');
    if (!o && [...this.#organizacoes.values()].some(x => x.nome_referencia.toLocaleLowerCase('pt-BR') === p.nome.toLocaleLowerCase('pt-BR')))
      fail('IDENTIDADE_POTENCIALMENTE_DUPLICADA', 'precisa resolver identidade');
    const organizacao_id = o?.organizacao_id ?? randomUUID();
    const registro_id = o?.registro_id ?? randomUUID();
    const versao = (o?.versoes.length ?? 0) + 1;
    const registrado_em = new Date().toISOString();
    const manifesto = Object.freeze({
      manifesto_id: randomUUID(), versao_manifesto: 1, custodiante: 'A103-GEP',
      itens: clone(p.provas), escopo_afirmacao: 'REGISTRO_INSTITUCIONAL_SIMULADO',
      simulacao: true
    });
    const versaoRegistro = { versao, registrado_em, nome: p.nome, origem_referencial: p.origem_referencial,
      manifesto: clone(manifesto), versao_precedente: o?.versoes.at(-1).versao ?? null, simulacao: true };
    const resultado = { estado: 'PUBLICADA', ambiente: 'SIMULADO',
      organizacao_id, registro_id, versao_registro: String(versao),
      referencia_evidencia: `simulacao:${manifesto.manifesto_id}`,
      evidencia_id: manifesto.manifesto_id, registrado_em, marco_a_autorizado: false };
    // Ponto de commit simulado. Impossível confundir com transação SQL de produção.
    if (o) { o.versoes.push(versaoRegistro); o.nome_referencia = p.nome; }
    else this.#organizacoes.set(organizacao_id, { organizacao_id, registro_id, nome_referencia: p.nome, versoes: [versaoRegistro] });
    p.organizacao_id = organizacao_id;
    p.estado = 'PUBLICADA'; p.resultado = clone(resultado);
    this.#eventos.push({ sequencia: ++this.#sequencia, tipo: 'PUBLICACAO_SIMULADA', proposta_id,
      organizacao_id, versao, registrado_em });
    return clone(resultado);
  }

  consultarSimulacao(organizacao_id, conhecimento_ate) {
    if (!isText(organizacao_id) || !Number.isFinite(Date.parse(conhecimento_ate))) fail('CONSULTA_INVALIDA', 'parâmetros inválidos');
    const o = this.#organizacoes.get(organizacao_id);
    if (!o) return { estado: 'NAO_LOCALIZADO', universo_completo: false, simulacao: true };
    const versoes = o.versoes.filter(v => Date.parse(v.registrado_em) <= Date.parse(conhecimento_ate));
    if (!versoes.length) return { estado: 'NAO_LOCALIZADO', universo_completo: false, simulacao: true };
    return { estado: 'REGISTRO_SIMULADO', simulacao: true, organizacao_id,
      registro_id: o.registro_id, versao: clone(versoes.at(-1)) };
  }

  obterEventos() { return clone(this.#eventos); }
  contarOrganizacoes() { return this.#organizacoes.size; }
  #obterProposta(id) { const p = this.#propostas.get(id); if (!p) fail('PROPOSTA_INEXISTENTE', 'proposta não localizada'); return p; }
}
