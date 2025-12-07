import { sqliteTable, text, integer, uniqueIndex, index } from 'drizzle-orm/sqlite-core';

export const settings = sqliteTable('settings', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  sessionId: text('session_id').notNull(),
  key: text('key').notNull(),
  value: text('value').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
}, (table) => [
  uniqueIndex('settings_session_key_idx').on(table.sessionId, table.key),
]);

export const messages = sqliteTable('messages', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  sessionId: text('session_id').notNull(),
  role: text('role', { enum: ['user', 'assistant', 'system'] }).notNull(),
  content: text('content').notNull(),
  metadata: text('metadata'), // JSON: { agentId, agentName, model, tools[], tokensUsed }
  files: text('files'), // JSON: [{ name, type, size, url, isImage }]
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
}, (table) => [
  index('messages_session_idx').on(table.sessionId),
]);

export type Message = typeof messages.$inferSelect;

export const websites = sqliteTable('websites', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  sessionId: text('session_id').notNull(),
  url: text('url').notNull(),
  domain: text('domain').notNull(),
  name: text('name'),
  description: text('description'),
  mainColor: text('main_color'),
  logoUrl: text('logo_url'),
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
}, (table) => [
  uniqueIndex('websites_session_domain_idx').on(table.sessionId, table.domain),
]);

// Setting keys
export const SETTING_KEYS = {
  SUGGESTIONS_ENABLED: 'suggestions_enabled',
  SELECTED_WEBSITE_ID: 'selected_website_id',
  WEBSITE_CONTEXT_ENABLED: 'website_context_enabled',
  SELECTED_AGENT: 'selected_agent',
} as const;

export type SettingKey = (typeof SETTING_KEYS)[keyof typeof SETTING_KEYS];

export type Website = typeof websites.$inferSelect;
