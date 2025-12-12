import { neon } from '@neondatabase/serverless';
import { drizzle as drizzlePg } from 'drizzle-orm/neon-http';
import Database from 'better-sqlite3';
import { drizzle as drizzleSqlite } from 'drizzle-orm/better-sqlite3';
import * as schemaPg from './schema.pg';
import * as schemaSqlite from './schema';

const isProduction = process.env.NODE_ENV === 'production' || !!process.env.DATABASE_URL;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let db: any;

if (isProduction && process.env.DATABASE_URL) {
  const sql = neon(process.env.DATABASE_URL);
  db = drizzlePg(sql, { schema: schemaPg });
} else {
  const sqlite = new Database('./data/app.db');
  db = drizzleSqlite(sqlite, { schema: schemaSqlite });
}

export { db };

export * from './schema';
export { SETTING_KEYS } from './schema';
export type { Website, Message, SettingKey } from './schema';
