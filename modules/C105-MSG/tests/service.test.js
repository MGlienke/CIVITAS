import test from 'node:test';
import assert from 'node:assert/strict';
import { createRegistrarComunicacao, fingerprint } from '../src/service.js';
import { CivitasError } from '../src/errors.js';
const command = Object.freeze({ emissor_entidade: 'EP-001', destinatario_idup: 'P1', servico: 'Sa', assunto: 'Teste', conteudo_ref: 'DOC@v1', chave_idempotencia: 'key-1', correlation_id: 'trace-1' });
function fixture(overrides = {}) {
  const calls = []; const data = new Map();
  const repository = { register: async c => {
    calls.push(c);
    const key = `${c.idempotency_scope}:${c.chave_idempotencia}`;
    const existing = data.get(key);
    if (existing) {
      if (existing.fingerprint !== c.request_fingerprint) throw new CivitasError('0007');
      return { ...existing, replayed: true };
    }
    const result = { communication_id: c.communication_id, registered_at: new Date('2026-11-13T18:30:00.000Z'), fingerprint: c.request_fingerprint };
    data.set(key, result); return { ...result, replayed: false };
  }};
  const ports = { repository, identity: { verifyEmitter: async () => true }, people: { exists: async () => true }, services: { validForEmitter: async () => true }, documents: { verifyReference: async () => true }, ...overrides };
  return { run: createRegistrarComunicacao(ports), calls, data };
}
const context = Object.freeze({ principal: 'system-A', verified: true });
test('TST-C105-012 registra e devolve estado sem entrega', async () => {
  const { run, calls } = fixture(); const r = await run(command, context);
  assert.equal(r.estado, 'REGISTRADA'); assert.equal(r.destinatario_idup, 'P1'); assert.equal(calls.length, 1);
  assert.equal(calls[0].assunto, 'Teste'); assert.equal(calls[0].principal, 'system-A');
});
test('TST-C105-013 replay idempotente sem novo registro lógico', async () => {
  const { run, data } = fixture(); const a = await run(command, context); const b = await run({ ...command, correlation_id: 'trace-2' }, context);
  assert.equal(a.communication_id, b.communication_id); assert.equal(data.size, 1); assert.equal(b.correlation_id, 'trace-2');
});
test('TST-C105-014 rejeita reutilização da chave com payload divergente', async () => {
  const { run, data } = fixture(); await run(command, context);
  await assert.rejects(run({ ...command, assunto: 'Outro' }, context), e => e.codigo === 'C105E0007');
  assert.equal(data.size, 1);
});
test('TST-C105-015 emissor não autorizado', async () => {
  const { run, calls } = fixture({ identity: { verifyEmitter: async () => false } });
  await assert.rejects(run(command, context), e => e.codigo === 'C105E0003'); assert.equal(calls.length, 0);
});
test('TST-C105-016 rejeita destinatário e documento inválidos', async () => {
  const f1 = fixture({ people: { exists: async () => false } });
  await assert.rejects(f1.run(command, context), e => e.codigo === 'C105E0004');
  const f2 = fixture({ documents: { verifyReference: async () => false } });
  await assert.rejects(f2.run(command, context), e => e.codigo === 'C105E0006');
});
test('rejeita principal não verificado, mesmo com ID informado', async () => {
  const { run } = fixture(); await assert.rejects(run(command, { principal: 'system-A', verified: false }), e => e.codigo === 'C105E0002');
});
test('falha obrigatória externa não produz registro', async () => {
  const { run, calls } = fixture({ people: { exists: async () => { throw new Error('unavailable'); } } });
  await assert.rejects(run(command, context), e => e.codigo === 'C105E0008'); assert.equal(calls.length, 0);
});
test('TST-C105-022 erro usa padrão de timestamp e não vaza comando', () => {
  const e = new CivitasError('0001', { correlationId: 'trace-1' });
  assert.match(e.mensagem, /^C105E0001 - \[\d{4}-\d\d-\d\dT[^\]]+Z\]: Solicitação de comunicação inválida\.$/);
  assert.equal(e.toJSON().codigo, 'C105E0001'); assert.doesNotMatch(e.mensagem, /DOC@v1/);
});
test('fingerprint exclui chave e correlação; diferencia serviço', () => {
  const f = fingerprint(command);
  assert.equal(f, fingerprint({ ...command, correlation_id: 'different', chave_idempotencia: 'other' }));
  assert.notEqual(f, fingerprint({ ...command, servico: 'Sb' }));
});
test('comando inclui apenas campos admitidos', async () => {
  const { run } = fixture(); await assert.rejects(run({ ...command, principal: 'forged' }, context), e => e.codigo === 'C105E0001');
});
test('falha de persistência é E0009 sem vazamento', async () => {
  const f = fixture({ repository: { register: async () => { throw new Error('database password SHOULD_NOT_LEAK'); } } });
  await assert.rejects(f.run(command, context), e => e.codigo === 'C105E0009' && !e.message.includes('SHOULD_NOT_LEAK'));
});
