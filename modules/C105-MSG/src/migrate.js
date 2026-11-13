import { readFile } from 'node:fs/promises';
import { openPostgresPool } from './postgres.js';
const pool = await openPostgresPool();
try {
  const sql = await readFile(new URL('../sql/001_c105_registrar_comunicacao.sql', import.meta.url), 'utf8');
  await pool.query(sql);
  console.log('Migração 001 aplicada em DATABASE_URL');
} finally { await pool.end(); }
