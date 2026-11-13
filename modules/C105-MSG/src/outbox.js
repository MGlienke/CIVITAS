/** Send at-least-once: publisher must be idempotent by event_id; never infer delivery from registration. */
export async function publishBatch(pool, publish, { limit = 25 } = {}) {
  if (typeof publish !== 'function' || !Number.isInteger(limit) || limit < 1 || limit > 100) throw new TypeError('Invalid publisher/limit');
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const res = await client.query(`SELECT outbox_id, event_id, payload FROM c105.outbox
      WHERE published_at IS NULL AND next_attempt_at <= clock_timestamp()
      ORDER BY created_at FOR UPDATE SKIP LOCKED LIMIT $1`, [limit]);
    let published = 0, failed = 0;
    for (const row of res.rows) {
      try {
        await publish(row.payload, { eventId: row.event_id });
        await client.query(`UPDATE c105.outbox SET published_at = clock_timestamp(), attempt_count = attempt_count + 1,
          last_failure_code = NULL WHERE outbox_id = $1`, [row.outbox_id]);
        published++;
      } catch {
        await client.query(`UPDATE c105.outbox SET attempt_count = attempt_count + 1,
          last_failure_code = 'C105E0008', next_attempt_at = clock_timestamp() + (LEAST(3600, POWER(2, LEAST(attempt_count, 11))) * INTERVAL '1 second')
          WHERE outbox_id = $1`, [row.outbox_id]);
        failed++;
      }
    }
    await client.query('COMMIT');
    return { published, failed };
  } catch (err) { try { await client.query('ROLLBACK'); } catch {} throw err; }
  finally { client.release(); }
}
