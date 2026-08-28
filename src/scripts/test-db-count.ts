import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import { db } from '../lib/db';
import { establishments, localAuthorities } from '../lib/db/schema';
import { sql } from 'drizzle-orm';

async function checkCounts() {
  const est = await db.select({ count: sql`count(*)` }).from(establishments);
  const auth = await db.select({ count: sql`count(*)` }).from(localAuthorities);

  console.log('----------------------------------------------------');
  console.log('📊 CockroachDB Live Status:');
  console.log(`• Local Authorities Ingested: ${auth[0].count} / 363 councils`);
  console.log(`• Food Establishments Ingested: ${Number(est[0].count).toLocaleString()} venues`);
  console.log('----------------------------------------------------');
  process.exit(0);
}

checkCounts().catch((err) => {
  console.error('Check failed:', err.message);
  process.exit(1);
});
