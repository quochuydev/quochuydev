import { pgTable, text, serial, timestamp, uniqueIndex, index } from 'drizzle-orm/pg-core';

export const settings = pgTable('settings', {
  id: serial('id').primaryKey(),
  sessionId: text('session_id').notNull(),
  key: text('key').notNull(),
  value: text('value').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
}, (table) => [
  uniqueIndex('settings_session_key_idx').on(table.sessionId, table.key),
]);

export const messages = pgTable('messages', {
  id: serial('id').primaryKey(),
  sessionId: text('session_id').notNull(),
  role: text('role', { enum: ['user', 'assistant', 'system'] }).notNull(),
  content: text('content').notNull(),
  metadata: text('metadata'),
  files: text('files'),
  createdAt: timestamp('created_at').defaultNow(),
}, (table) => [
  index('messages_session_idx').on(table.sessionId),
]);

export type Message = typeof messages.$inferSelect;

export const websites = pgTable('websites', {
  id: serial('id').primaryKey(),
  sessionId: text('session_id').notNull(),
  url: text('url').notNull(),
  domain: text('domain').notNull(),
  name: text('name'),
  description: text('description'),
  mainColor: text('main_color'),
  logoUrl: text('logo_url'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
}, (table) => [
  uniqueIndex('websites_session_domain_idx').on(table.sessionId, table.domain),
]);

export const SETTING_KEYS = {
  SUGGESTIONS_ENABLED: 'suggestions_enabled',
  SELECTED_WEBSITE_ID: 'selected_website_id',
  WEBSITE_CONTEXT_ENABLED: 'website_context_enabled',
  SELECTED_AGENT: 'selected_agent',
} as const;

export type SettingKey = (typeof SETTING_KEYS)[keyof typeof SETTING_KEYS];

export type Website = typeof websites.$inferSelect;
