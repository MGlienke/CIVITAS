const catalogue = Object.freeze({
  '0001': 'Solicitação de comunicação inválida.',
  '0002': 'Chamador não autenticado.',
  '0003': 'Emissor não autorizado.',
  '0004': 'IDUP destinatário não reconhecido.',
  '0005': 'Serviço de origem inválido ou incompatível.',
  '0006': 'Referência documental inválida ou não verificável.',
  '0007': 'Chave de idempotência utilizada com conteúdo diferente.',
  '0008': 'Dependência obrigatória indisponível.',
  '0009': 'Falha interna ou de persistência.'
});
const allowed = new Map(Object.keys(catalogue).map(n => [n, new Set(['E'])]));
export class CivitasError extends Error {
  constructor(number, { severity = 'E', correlationId = null, cause } = {}) {
    if (!catalogue[number] || !allowed.get(number)?.has(severity)) throw new Error('Condição/severidade não catalogada');
    const timestamp = new Date().toISOString();
    const codigo = `C105${severity}${number}`;
    const mensagem = `${codigo} - [${timestamp}]: ${catalogue[number]}`;
    super(mensagem, { cause });
    this.name = 'CivitasError';
    Object.assign(this, { codigo, timestamp, descricao: catalogue[number], mensagem, correlation_id: correlationId, retryable: ['0008', '0009'].includes(number) });
  }
  toJSON() { return { codigo: this.codigo, timestamp: this.timestamp, mensagem: this.mensagem, correlation_id: this.correlation_id, retryable: this.retryable }; }
}
export function coded(n, correlationId, cause) { return new CivitasError(n, { correlationId, cause }); }
