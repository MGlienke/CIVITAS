import { createHash, randomUUID } from 'node:crypto';
import { coded, CivitasError } from './errors.js';
const LIMITS = Object.freeze({ emissor_entidade: 128, destinatario_idup: 128, servico: 128, assunto: 500, conteudo_ref: 1024, chave_idempotencia: 256, correlation_id: 256 });
function requiredString(value, field, max) {
  if (typeof value !== 'string' || !value.trim() || value.length > max) throw coded('0001');
  return value.trim();
}
export function validateCommand(input) {
  if (input === null || typeof input !== 'object' || Array.isArray(input)) throw coded('0001');
  const permitted = new Set(Object.keys(LIMITS));
  if (Object.keys(input).some(key => !permitted.has(key))) throw coded('0001');
  const command = {};
  for (const field of Object.keys(LIMITS)) {
    if (field === 'assunto') continue;
    command[field] = requiredString(input[field], field, LIMITS[field]);
  }
  if (input.assunto !== undefined && input.assunto !== null && typeof input.assunto !== 'string') throw coded('0001', command.correlation_id);
  command.assunto = input.assunto == null ? null : input.assunto;
  if (command.assunto !== null && command.assunto.length > LIMITS.assunto) throw coded('0001', command.correlation_id);
  return command;
}
export function fingerprint(c) {
  const logical = [c.emissor_entidade, c.destinatario_idup, c.servico, c.assunto, c.conteudo_ref];
  return createHash('sha256').update(JSON.stringify(logical), 'utf8').digest('hex');
}
function safeTelemetry(telemetry, event, fields) {
  try { telemetry?.record?.(event, fields); } catch { }
}
export function createRegistrarComunicacao({ repository, identity, people, services, documents, telemetry }) {
  if (!repository?.register || !identity?.verifyEmitter || !people?.exists || !services?.validForEmitter || !documents?.verifyReference) throw new TypeError('Missing required port');
  return async function registrarComunicacao(input, authenticatedContext) {
    let correlationId = typeof input?.correlation_id === 'string' ? input.correlation_id.slice(0, 256) : null;
    try {
      const c = validateCommand(input); correlationId = c.correlation_id;
      const principal = authenticatedContext?.principal;
      if (typeof principal !== 'string' || !principal.trim() || principal.length > 256 || authenticatedContext?.verified !== true) throw coded('0002', correlationId);
      const isAllowed = await identity.verifyEmitter({ principal, entityId: c.emissor_entidade, serviceId: c.servico, action: 'registrar_comunicacao' });
      if (isAllowed !== true) throw coded('0003', correlationId);
      if (await people.exists(c.destinatario_idup) !== true) throw coded('0004', correlationId);
      if (await services.validForEmitter(c.servico, c.emissor_entidade) !== true) throw coded('0005', correlationId);
      if (await documents.verifyReference(c.conteudo_ref, { principal, entityId: c.emissor_entidade, serviceId: c.servico }) !== true) throw coded('0006', correlationId);
      const data = {
        ...c,
        principal,
        idempotency_scope: JSON.stringify([principal, c.emissor_entidade]),
        request_fingerprint: fingerprint(c),
        communication_id: randomUUID(),
        event_id: randomUUID(),
        outbox_id: randomUUID()
      };
      let result;
      try { result = await repository.register(data); } catch (error) {
        if (error instanceof CivitasError) throw error;
        throw coded('0009', correlationId, error);
      }
      safeTelemetry(telemetry, 'communication_registration', { result: result.replayed ? 'replayed' : 'registered', origin_entity_id: c.emissor_entidade, service_id: c.servico, correlation_id: correlationId });
      return { communication_id: result.communication_id, estado: 'REGISTRADA', registrada_em: new Date(result.registered_at).toISOString(), destinatario_idup: c.destinatario_idup, correlation_id: correlationId };
    } catch (error) {
      let wrapped = error;
      if (!(error instanceof CivitasError)) wrapped = coded('0008', correlationId, error);
      safeTelemetry(telemetry, 'communication_registration', { result: 'failed', error_code: wrapped.codigo, correlation_id: correlationId });
      throw wrapped;
    }
  };
}
