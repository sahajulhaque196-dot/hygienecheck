/**
 * Creates all required tables in CockroachDB directly via SQL
 * Run: npx tsx src/scripts/db-migrate.ts
 */
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import postgres from 'postgres';

const sql = postgres(process.env.DATABASE_URL!, { ssl: 'require', max: 1 });

async function migrate() {
  console.log('🔧 Creating tables in CockroachDB...\n');

  await sql`
    CREATE TABLE IF NOT EXISTS local_authorities (
      id SERIAL PRIMARY KEY,
      authority_id INTEGER NOT NULL,
      authority_id_code TEXT NOT NULL,
      name TEXT NOT NULL,
      slug TEXT NOT NULL,
      scheme_type TEXT NOT NULL DEFAULT 'FHRS',
      total_venues INTEGER NOT NULL DEFAULT 0,
      region TEXT,
      email TEXT,
      phone TEXT,
      website_url TEXT,
      last_synced_at TIMESTAMP DEFAULT NOW(),
      created_at TIMESTAMP DEFAULT NOW(),
      CONSTRAINT local_authorities_authority_id_unique UNIQUE (authority_id),
      CONSTRAINT local_authorities_slug_unique UNIQUE (slug)
    )
  `;
  console.log('✅ local_authorities table ready');

  await sql`
    CREATE TABLE IF NOT EXISTS establishments (
      id SERIAL PRIMARY KEY,
      fhrs_id INTEGER NOT NULL,
      local_authority_id INTEGER NOT NULL,
      local_authority_slug TEXT NOT NULL,
      business_name TEXT NOT NULL,
      business_type_id INTEGER,
      business_type_label TEXT,
      slug TEXT NOT NULL,
      address_line1 TEXT,
      address_line2 TEXT,
      address_line3 TEXT,
      postcode TEXT,
      outcode TEXT,
      latitude REAL,
      longitude REAL,
      rating_value TEXT,
      rating_date TEXT,
      new_rating_pending BOOLEAN DEFAULT FALSE,
      hygiene_score INTEGER,
      structural_score INTEGER,
      management_score INTEGER,
      scheme_type TEXT NOT NULL DEFAULT 'FHRS',
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW(),
      CONSTRAINT establishments_fhrs_id_unique UNIQUE (fhrs_id),
      CONSTRAINT establishments_slug_unique UNIQUE (slug)
    )
  `;
  console.log('✅ establishments table ready');

  // Indexes
  await sql`CREATE INDEX IF NOT EXISTS est_postcode_idx ON establishments (postcode)`;
  await sql`CREATE INDEX IF NOT EXISTS est_outcode_idx ON establishments (outcode)`;
  await sql`CREATE INDEX IF NOT EXISTS est_la_slug_idx ON establishments (local_authority_slug)`;
  await sql`CREATE INDEX IF NOT EXISTS est_rating_idx ON establishments (rating_value)`;
  await sql`CREATE INDEX IF NOT EXISTS est_rating_date_idx ON establishments (rating_date)`;
  console.log('✅ All indexes created');

  await sql.end();
  console.log('\n🎉 Migration complete! Tables are live in CockroachDB.');
  console.log('   Now run: npm run sync:cockroach');
}

migrate().catch((err) => {
  console.error('❌ Migration failed:', err.message);
  process.exit(1);
});
