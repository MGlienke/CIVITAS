import test from 'node:test';
import assert from 'node:assert/strict';
import { makePostgresRepository } from '../src/postgres.js';
function command() { return { communication_id: '00000000-0000-4000-8000-000000000001', event_id: '00000000-0000-4000-8000-000000000002', outbox_id: '00000000-0000-4000-8000-000000000003', emissor_entidade: 'EP-001', destinatario_idup: 'P1', servico: 'Sa', assunto: null, conteudo_ref: 'DOC@v1', principal: 'P', idempotency_scope: '["P","EP-001"]', chave_idempotencia: 'key', request_fingerprint: 'f'.repeat(64), correlation_id: 'corr' }; }
function fakePool({ duplicate = false, failOn = '' } = {}) {
  const statements = [];
  const when = new Date('2026-11-13T18:30:00.000Z');
  const client = { async query(sql, args = []) {
    statements.push({ sql, args });
    if (failOn && sql.includes(failOn)) throw new Error('simulated postgres failure');
    if (sql.includes('INSERT INTO c105.comunicacoes')) return duplicate ? { rowCount: 0, rows: [] } : { rowCount: 1, rows: [{ registered_at: when }] };
    if (sql.includes('SELECT communication_id')) return { rowCount: 1, rows: [{ communication_id: 'previous-id', registered_at: when, request_fingerprint: 'f'.repeat(64) }] };
    return { rowCount: 1, rows: [] };
  }, release() { statements.push({ sql: 'RELEASE' }); } };
  return { pool: { async connect() { return client; } }, statements };
}
test('TST-C105-012/017 banco: commit contém 3 inserções atômicas', async () => {
  const f = fakePool(); const r = await makePostgresRepository(f.pool).register(command());
  assert.equal(r.replayed, false);
  const sequence = f.statements.map(x => x.sql.trim().split(/\s+/).slice(0,3).join(' '));
  assert.equal(sequence[0], 'BEGIN'); assert.equal(sequence[1], 'INSERT INTO c105.comunicacoes');
  assert.equal(sequence[2], 'INSERT INTO c105.eventos_comunicacao'); assert.equal(sequence[3], 'INSERT INTO c105.outbox');
  assert.equal(sequence[4], 'COMMIT');
});
test('TST-C105-017 erro de outbox força rollback sem commit', async () => {
  const f = fakePool({ failOn: 'INSERT INTO c105.outbox' });
  await assert.rejects(makePostgresRepository(f.pool).register(command()));
  assert.ok(f.statements.some(x => x.sql === 'ROLLBACK'));
  assert.ok(!f.statements.some(x => x.sql === 'COMMIT'));
});
test('TST-C105-013 idempotência banco: replay apenas SELECT', async () => {
  const f = fakePool({ duplicate: true }); const r = await makePostgresRepository(f.pool).register(command());
  assert.equal(r.replayed, true); assert.equal(r.communication_id, 'previous-id');
  assert.ok(!f.statements.some(x => x.sql.includes('INSERT INTO c105.eventos_comunicacao')));
});
test('TST-C105-014 idempotência divergente retorna E0007', async () => {
  const f = fakePool({ duplicate: true });
  await assert.rejects(makePostgresRepository(f.pool).register({ ...command(), request_fingerprint: 'a'.repeat(64) }), e => e.codigo === 'C105E0007');
});
