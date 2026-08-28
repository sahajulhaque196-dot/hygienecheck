/**
 * HygieneCheck.uk — Full FSA → CockroachDB ETL Pipeline
 * Syncs all 363 UK councils and 500,000+ establishments
 * Run: npx tsx src/scripts/etl-sync-cockroach.ts
 */

import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import axios from 'axios';
import { parseStringPromise } from 'xml2js';
import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import { localAuthorities, establishments } from '../lib/db/schema';
import { eq, sql } from 'drizzle-orm';

const FSA_API_BASE = 'https://api.ratings.food.gov.uk';

// ─── DB Connection ──────────────────────────────────────────────────────────
const client = postgres(process.env.DATABASE_URL!, { ssl: 'require', max: 5 });
const db = drizzle(client);

// ─── Slug Generator ─────────────────────────────────────────────────────────
function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

function makeVenueSlug(name: string, postcode: string, fhrsId: number): string {
  const nameSlug = slugify(name).slice(0, 50);
  const postcodeSlug = slugify(postcode);
  return `${nameSlug}-${postcodeSlug}-${fhrsId}`;
}

function makeCouncilSlug(name: string): string {
  return slugify(name)
    .replace(/\s*council\s*/gi, '')
    .replace(/\s*city\s*/gi, '')
    .replace(/\s*london\s*borough\s*of\s*/gi, '')
    .replace(/\s*borough\s*of\s*/gi, '')
    .replace(/--+/g, '-')
    .replace(/^-|-$/g, '');
}

// ─── Extraction helpers ──────────────────────────────────────────────────────
function extractStr(obj: any): string {
  if (!obj) return '';
  if (typeof obj === 'string') return obj;
  if (Array.isArray(obj)) return obj[0]?._ ?? obj[0] ?? '';
  if (obj._) return obj._;
  return String(obj);
}

function extractInt(obj: any): number | null {
  const s = extractStr(obj);
  const n = parseInt(s, 10);
  return isNaN(n) ? null : n;
}

function extractFloat(obj: any): number | null {
  const s = extractStr(obj);
  const f = parseFloat(s);
  return isNaN(f) ? null : f;
}

// ─── Resilient Network Fetcher with Backoff ──────────────────────────────────
async function fetchWithRetry(url: string, headers: Record<string, string>, retries = 3): Promise<any> {
  let attempt = 0;
  while (attempt < retries) {
    try {
      return await axios.get(url, {
        timeout: 60000,
        headers,
      });
    } catch (err: any) {
      attempt++;
      if (attempt >= retries) throw err;
      const delayMs = attempt * 2000;
      await new Promise((res) => setTimeout(res, delayMs));
    }
  }
}

// ─── MAIN ETL ───────────────────────────────────────────────────────────────
async function runSync() {
  console.log('═══════════════════════════════════════════════════════════');
  console.log('🚀  HygieneCheck.uk → CockroachDB Full ETL Sync');
  console.log('═══════════════════════════════════════════════════════════\n');

  // Step 1: Fetch all 363 UK local authorities
  console.log('📡 Step 1: Fetching 363 UK Local Authorities from FSA API...');
  const { data: authData } = await axios.get(`${FSA_API_BASE}/authorities/basic`, {
    headers: { 'x-api-version': '2', accept: 'application/json' },
    timeout: 30000,
  });

  const authorities: any[] = authData.authorities || [];
  const totalExpected = authorities.reduce((acc: number, a: any) => acc + (a.EstablishmentCount || 0), 0);

  console.log(`✅ Discovered ${authorities.length} local authorities`);
  console.log(`🇬🇧 Total expected establishments: ${totalExpected.toLocaleString()}\n`);

  // Step 2: Upsert all local authorities into DB
  console.log('💾 Step 2: Upserting local authorities into CockroachDB...');
  for (const auth of authorities) {
    const slug = makeCouncilSlug(auth.Name || '');
    const schemeType = auth.SchemeType === 1 ? 'FHIS' : 'FHRS';
    try {
      await db.insert(localAuthorities).values({
        authorityId: auth.LocalAuthorityId,
        authorityIdCode: String(auth.LocalAuthorityIdCode || ''),
        name: auth.Name || '',
        slug: slug || `authority-${auth.LocalAuthorityId}`,
        schemeType,
        totalVenues: auth.EstablishmentCount || 0,
        lastSyncedAt: new Date(),
      }).onConflictDoUpdate({
        target: localAuthorities.authorityId,
        set: {
          name: auth.Name || '',
          totalVenues: auth.EstablishmentCount || 0,
          lastSyncedAt: new Date(),
        },
      });
    } catch (err: any) {
      console.warn(`  ⚠️  Failed authority ${auth.Name}: ${err.message}`);
    }
  }
  console.log(`✅ ${authorities.length} authorities saved to DB\n`);

  // Step 3: Download and ingest each council's XML feed
  console.log('═══════════════════════════════════════════════════════════');
  console.log('📦 Step 3: Ingesting all council XML feeds...');
  console.log('═══════════════════════════════════════════════════════════\n');

  let totalProcessed = 0;
  let totalFailed = 0;
  const failedCouncils: string[] = [];
  const BATCH_SIZE = 500; // upsert 500 rows at a time

  for (let i = 0; i < authorities.length; i++) {
    const auth = authorities[i];
    const code = auth.LocalAuthorityIdCode;
    const councilSlug = makeCouncilSlug(auth.Name || '');
    const xmlUrl = `https://ratings.food.gov.uk/OpenDataFiles/FHRS${code}en-GB.xml`;

    try {
      const { data: xmlData } = await fetchWithRetry(xmlUrl, {
        'User-Agent': 'HygieneCheck.uk DataSync/2.0 (+https://hygienecheck.uk)',
      }, 3);

      const parsed = await parseStringPromise(xmlData, { explicitArray: true });
      const estList: any[] = parsed.FHRSEstablishment?.EstablishmentCollection?.[0]?.EstablishmentDetail || [];

      // Process in batches
      let batch: any[] = [];
      for (const est of estList) {
        const fhrsId = extractInt(est.FHRSID?.[0]);
        if (!fhrsId) continue;

        const name = extractStr(est.BusinessName?.[0]);
        const postcode = extractStr(est.PostCode?.[0]).trim().toUpperCase();
        const ratingVal = extractStr(est.RatingValue?.[0]);
        const outcode = postcode.split(' ')[0] || '';
        const slug = makeVenueSlug(name, postcode, fhrsId);

        const scores = est.Scores?.[0];
        const geocode = est.Geocode?.[0];

        batch.push({
          fhrsId,
          localAuthorityId: auth.LocalAuthorityId,
          localAuthoritySlug: councilSlug,
          businessName: name,
          businessTypeId: extractInt(est.BusinessType?.[0]?.['@_id']) ?? extractInt(est.BusinessTypeID?.[0]),
          businessTypeLabel: extractStr(est.BusinessType?.[0]?.['_'] || est.BusinessType?.[0]),
          slug,
          addressLine1: extractStr(est.AddressLine1?.[0]),
          addressLine2: extractStr(est.AddressLine2?.[0]),
          addressLine3: extractStr(est.AddressLine3?.[0]),
          postcode,
          outcode,
          latitude: extractFloat(geocode?.Latitude?.[0]),
          longitude: extractFloat(geocode?.Longitude?.[0]),
          ratingValue: ratingVal,
          ratingDate: extractStr(est.RatingDate?.[0])?.split('T')[0] || null,
          newRatingPending: extractStr(est.NewRatingPending?.[0])?.toLowerCase() === 'true',
          hygieneScore: extractInt(scores?.Hygiene?.[0]),
          structuralScore: extractInt(scores?.Structural?.[0]),
          managementScore: extractInt(scores?.ConfidenceInManagement?.[0]),
          schemeType: auth.SchemeType === 1 ? 'FHIS' : 'FHRS',
          updatedAt: new Date(),
        });

        // Flush batch
        if (batch.length >= BATCH_SIZE) {
          await db.insert(establishments)
            .values(batch)
            .onConflictDoUpdate({
              target: establishments.fhrsId,
              set: {
                businessName: sql`excluded.business_name`,
                ratingValue: sql`excluded.rating_value`,
                ratingDate: sql`excluded.rating_date`,
                hygieneScore: sql`excluded.hygiene_score`,
                structuralScore: sql`excluded.structural_score`,
                managementScore: sql`excluded.management_score`,
                postcode: sql`excluded.postcode`,
                outcode: sql`excluded.outcode`,
                latitude: sql`excluded.latitude`,
                longitude: sql`excluded.longitude`,
                updatedAt: sql`excluded.updated_at`,
              },
            });
          totalProcessed += batch.length;
          batch = [];
        }
      }

      // Flush remaining
      if (batch.length > 0) {
        await db.insert(establishments)
          .values(batch)
          .onConflictDoUpdate({
            target: establishments.fhrsId,
            set: {
              businessName: sql`excluded.business_name`,
              ratingValue: sql`excluded.rating_value`,
              ratingDate: sql`excluded.rating_date`,
              hygieneScore: sql`excluded.hygiene_score`,
              structuralScore: sql`excluded.structural_score`,
              managementScore: sql`excluded.management_score`,
              postcode: sql`excluded.postcode`,
              outcode: sql`excluded.outcode`,
              latitude: sql`excluded.latitude`,
              longitude: sql`excluded.longitude`,
              updatedAt: sql`excluded.updated_at`,
            },
          });
        totalProcessed += batch.length;
      }

      console.log(`  [${String(i + 1).padStart(3, '0')}/${authorities.length}] ✅ ${auth.Name.padEnd(45)} → ${String(estList.length).padStart(6)} venues`);
    } catch (err: any) {
      totalFailed++;
      failedCouncils.push(`${auth.Name} (${code})`);
      console.warn(`  [${String(i + 1).padStart(3, '0')}/${authorities.length}] ⚠️  ${auth.Name} — FAILED: ${err.message?.slice(0, 60)}`);
    }

    // Progress every 50 councils
    if ((i + 1) % 50 === 0) {
      console.log(`\n  📊 Progress: ${i + 1}/${authorities.length} councils | ${totalProcessed.toLocaleString()} venues saved\n`);
    }
  }

  // Final Summary
  console.log('\n═══════════════════════════════════════════════════════════');
  console.log('🎉  SYNC COMPLETE — SUMMARY');
  console.log('═══════════════════════════════════════════════════════════');
  console.log(`  • Total Councils Processed : ${authorities.length - totalFailed} / ${authorities.length}`);
  console.log(`  • Total Venues Saved       : ${totalProcessed.toLocaleString()}`);
  console.log(`  • Coverage                 : ${((totalProcessed / totalExpected) * 100).toFixed(2)}%`);
  console.log(`  • Failed Councils          : ${totalFailed}`);
  if (failedCouncils.length > 0) {
    console.log(`  • Failed List              : ${failedCouncils.slice(0, 5).join(', ')}${failedCouncils.length > 5 ? '...' : ''}`);
  }
  console.log('═══════════════════════════════════════════════════════════\n');

  await client.end();
  console.log('✅ DB connection closed. Sync finished.');
}

runSync().catch((err) => {
  console.error('❌ Fatal ETL Error:', err.message);
  process.exit(1);
});
