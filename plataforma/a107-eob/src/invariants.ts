import type { ComandoVerificacao, RespostaEvidencia, ResultadoVerificacao, EstadoMarcoA, Elegibilidade } from './contracts.js';

const REQUIREMENT_COUNT: Record<string, number> = { 'CM-01': 5, 'CM-02': 6, 'CM-03': 6, 'CM-04': 6 };
export function eligibleFromState(s: EstadoMarcoA): Elegibilidade {
  return s === 'ATENDIDA' ? 'ELEGIVEL_PARA_AUTORIZACAO' :
    s === 'NAO_ATENDIDA' ? 'NAO_ELEGIVEL' : 'VERIFICACAO_PENDENTE';
}
export function validateCommandTimes(c: ComandoVerificacao, now = new Date()): void {
  const a = Date.parse(c.referencia_temporal), b = Date.parse(c.conhecimento_ate);
  if (!Number.isFinite(a) || !Number.isFinite(b)) throw new Error('A107E0001: referência temporal inválida');
  if (b > now.getTime()) throw new Error('A107E0001: conhecimento_ate futuro não permitido pelo DDL');
  // referencia_temporal pode apontar ao passado ou a outro momento; competência para verificar deve ser validada.
}
export function validateEvidenceResponse(q: { consulta_id: string; correlation_id: string; propriedade_id: string }, r: RespostaEvidencia): void {
  if (r.consulta_id !== q.consulta_id || r.correlation_id !== q.correlation_id || r.propriedade_id !== q.propriedade_id) {
    throw new Error('A107W0009: resposta da fonte não corresponde à consulta');
  }
  if (r.cobertura.universo_completo === 'COMPROVADO' && (r.cobertura.consulta_completa !== 'SIM' || r.cobertura.prova_completude.length === 0)) {
    throw new Error('A107W0007: prova de completude insuficiente');
  }
}
export function validateMarcoAResult(r: ResultadoVerificacao): void {
  if (r.ambito_id !== 'MARCO_A' || r.condicoes.length !== 4) throw new Error('A107E0001: âmbito/condições inválidas');
  const ids = new Set<string>();
  let expected = 0;
  for (const c of r.condicoes) {
    if (ids.has(c.condicao_id)) throw new Error('A107E0001: condição duplicada');
    ids.add(c.condicao_id);
    const n = REQUIREMENT_COUNT[c.condicao_id];
    if (!n || c.requisitos.length !== n) throw new Error('A107E0001: requisitos incompletos');
    expected += n;
    const rids = new Set<string>();
    for (const q of c.requisitos) {
      if (rids.has(q.requisito_id) || !new RegExp('^' + c.condicao_id.replace('-', '') + '-R0[1-' + n + ']$').test(q.requisito_id)) {
        throw new Error('A107E0001: requisito duplicado/incompatível');
      }
      rids.add(q.requisito_id);
    }
    const state = c.requisitos.some(q => q.estado === 'NAO_ATENDIDA') ? 'NAO_ATENDIDA' :
      c.requisitos.some(q => q.estado === 'INDETERMINADA') ? 'INDETERMINADA' : 'ATENDIDA';
    if (state !== c.estado) throw new Error('A107E0001: composição da condição incoerente');
  }
  if (ids.size !== 4 || expected !== 23) throw new Error('A107E0001: conjunto CM incompleto');
  const state = r.condicoes.some(c => c.estado === 'NAO_ATENDIDA') ? 'NAO_ATENDIDA' :
    r.condicoes.some(c => c.estado === 'INDETERMINADA') ? 'INDETERMINADA' : 'ATENDIDA';
  if (r.estado !== state || r.elegibilidade !== eligibleFromState(state)) throw new Error('A107E0001: elegibilidade incoerente');
}
