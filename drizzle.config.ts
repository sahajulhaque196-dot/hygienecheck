import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/lib/db/schema.ts',
  out: './src/lib/db/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL || 'postgresql://sahajul:cp-DkJInapoPu3Hz9u1nOg@toothy-bug-32945.j77.aws-ap-south-1.cockroachlabs.cloud:26257/defaultdb?sslmode=verify-full',
  },
  verbose: true,
  strict: true,
});
