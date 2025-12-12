import { defineConfig } from 'drizzle-kit';
import 'dotenv/config';

const isProduction = !!process.env.DATABASE_URL;

export default defineConfig(
  isProduction
    ? {
        schema: './lib/db/schema.pg.ts',
        out: './drizzle',
        dialect: 'postgresql',
        dbCredentials: {
          url: process.env.DATABASE_URL!,
        },
      }
    : {
        schema: './lib/db/schema.ts',
        out: './drizzle',
        dialect: 'sqlite',
        dbCredentials: {
          url: './data/app.db',
        },
      }
);
