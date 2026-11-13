import { coded } from './errors.js';
export function makePostgresRepository(pool) {
  return {
    async register(c) {
      const client = await pool.connect();
      try {
        await client.query('BEGIN');
        const inserted = await client.query(`
          INSERT INTO c105.comunicacoes
            (communication_id, origin_entity_id, addressee_idup, service_id, subject, content_ref,
             created_by_principal_ref, idempotency_scope, idempotency_key, request_fingerprint, correlation_id)
          VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
          ON CONFLICT (idempotency_scope, idempotency_key) DO NOTHING
          RETURNING communication_id, registered_at`,
          [c.communication_id, c.emissor_entidade, c.destinatario_idup, c.servico, c.assunto, c.conteudo_ref,
           c.principal, c.idempotency_scope, c.chave_idempotencia, c.request_fingerprint, c.correlation_id]);
        if (inserted.rowCount === 0) {
          const existing = await client.query(`SELECT communication_id, registered_at, request_fingerprint
            FROM c105.comunicacoes WHERE idempotency_scope = $1 AND idempotency_key = $2`,
            [c.idempotency_scope, c.chave_idempotencia]);
          await client.query('COMMIT');
          if (existing.rowCount !== 1) throw coded('0009', c.correlation_id);
          if (existing.rows[0].request_fingerprint !== c.request_fingerprint) throw coded('0007', c.correlation_id);
          return { ...existing.rows[0], replayed: true };
        }
        const registeredAt = inserted.rows[0].registered_at;
        const payload = { event_id: c.event_id, event_type: 'ComunicacaoRegistrada', event_version: '1.0', communication_id: c.communication_id,
          origin_entity_id: c.emissor_entidade, addressee_idup: c.destinatario_idup, service_id: c.servico,
          occurred_at: new Date(registeredAt).toISOString(), correlation_id: c.correlation_id };
        await client.query(`INSERT INTO c105.eventos_comunicacao
          (event_id, communication_id, event_type, occurred_at, correlation_id, event_payload, event_version)
          VALUES ($1,$2,'ComunicacaoRegistrada',$3,$4,$5::jsonb,'1.0')`,
          [c.event_id, c.communication_id, registeredAt, c.correlation_id, JSON.stringify(payload)]);
        await client.query(`INSERT INTO c105.outbox
          (outbox_id, event_id, event_type, aggregate_id, event_version, payload)
          VALUES ($1,$2,'ComunicacaoRegistrada',$3,'1.0',$4::jsonb)`,
          [c.outbox_id, c.event_id, c.communication_id, JSON.stringify(payload)]);
        await client.query('COMMIT');
        return { communication_id: c.communication_id, registered_at: registeredAt, replayed: false };
      } catch (error) {
        try { await client.query('ROLLBACK'); } catch { }
        throw error;
      } finally { client.release(); }
    }
  };
}
export async function openPostgresPool() {
  if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL required; no default credentials');
  const { Pool } = await import('pg');
  return new Pool({ connectionString: process.env.DATABASE_URL });
}
