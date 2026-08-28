import { db } from './index';
import { establishments, localAuthorities, Establishment, LocalAuthority } from './schema';
import { eq, and, sql, desc, ilike, or } from 'drizzle-orm';

/**
 * Fetch a single establishment by its unique slug
 */
export async function getEstablishmentBySlug(slug: string): Promise<Establishment | null> {
  try {
    const result = await db
      .select()
      .from(establishments)
      .where(eq(establishments.slug, slug))
      .limit(1);
    return result[0] || null;
  } catch (error) {
    console.error(`Error fetching establishment for slug ${slug}:`, error);
    return null;
  }
}

/**
 * Fetch nearby establishments in the same outcode / authority
 */
export async function getNearbyEstablishments(
  outcode: string | null,
  excludeSlug: string,
  limit = 4
): Promise<Establishment[]> {
  try {
    if (!outcode) return [];
    return await db
      .select()
      .from(establishments)
      .where(and(eq(establishments.outcode, outcode), sql`${establishments.slug} != ${excludeSlug}`))
      .orderBy(desc(establishments.ratingDate))
      .limit(limit);
  } catch (error) {
    console.error('Error fetching nearby establishments:', error);
    return [];
  }
}

/**
 * Fetch local authority details by slug with stats
 */
export async function getLocalAuthorityBySlug(slug: string): Promise<{
  authority: LocalAuthority | null;
  stats: {
    total: number;
    fives: number;
    zeros: number;
    passRate: number;
  };
  sampleVenues: Establishment[];
  zeroStarVenues: Establishment[];
}> {
  try {
    const authResult = await db
      .select()
      .from(localAuthorities)
      .where(eq(localAuthorities.slug, slug))
      .limit(1);

    const authority = authResult[0] || null;
    if (!authority) {
      return {
        authority: null,
        stats: { total: 0, fives: 0, zeros: 0, passRate: 0 },
        sampleVenues: [],
        zeroStarVenues: [],
      };
    }

    // Fetch top sample venues
    const sampleVenues = await db
      .select()
      .from(establishments)
      .where(eq(establishments.localAuthoritySlug, slug))
      .orderBy(desc(establishments.ratingDate))
      .limit(12);

    // Fetch 0-star / 1-star failed venues
    const zeroStarVenues = await db
      .select()
      .from(establishments)
      .where(
        and(
          eq(establishments.localAuthoritySlug, slug),
          or(eq(establishments.ratingValue, '0'), eq(establishments.ratingValue, '1'), eq(establishments.ratingValue, 'Improvement Required'))
        )
      )
      .orderBy(desc(establishments.ratingDate))
      .limit(10);

    // Calculate rating stats
    const statsQuery = await db
      .select({
        rating: establishments.ratingValue,
        count: sql<number>`count(*)`,
      })
      .from(establishments)
      .where(eq(establishments.localAuthoritySlug, slug))
      .groupBy(establishments.ratingValue);

    let total = 0;
    let fives = 0;
    let zeros = 0;
    let goodCount = 0; // 4 or 5 or Pass

    for (const row of statsQuery) {
      const c = Number(row.count);
      total += c;
      if (row.rating === '5') fives += c;
      if (row.rating === '0') zeros += c;
      if (row.rating === '5' || row.rating === '4' || row.rating === 'Pass') goodCount += c;
    }

    const passRate = total > 0 ? Math.round((goodCount / total) * 1000) / 10 : 85;

    return {
      authority,
      stats: {
        total: total || authority.totalVenues,
        fives,
        zeros,
        passRate,
      },
      sampleVenues,
      zeroStarVenues,
    };
  } catch (error) {
    console.error(`Error fetching authority data for slug ${slug}:`, error);
    return {
      authority: null,
      stats: { total: 0, fives: 0, zeros: 0, passRate: 0 },
      sampleVenues: [],
      zeroStarVenues: [],
    };
  }
}

/**
 * Fetch establishments for a specific postcode outcode (e.g. SW1A, B1, M1)
 */
export async function getEstablishmentsByOutcode(
  outcode: string,
  limit = 24
): Promise<{
  venues: Establishment[];
  total: number;
  fives: number;
  zeros: number;
}> {
  try {
    const upperOutcode = outcode.toUpperCase().trim();
    const venues = await db
      .select()
      .from(establishments)
      .where(eq(establishments.outcode, upperOutcode))
      .orderBy(desc(establishments.ratingDate))
      .limit(limit);

    // Accurate SQL aggregations across all establishments in the outcode
    const statsQuery = await db
      .select({
        rating: establishments.ratingValue,
        count: sql<number>`count(*)`,
      })
      .from(establishments)
      .where(eq(establishments.outcode, upperOutcode))
      .groupBy(establishments.ratingValue);

    let total = 0;
    let fives = 0;
    let zeros = 0;

    for (const row of statsQuery) {
      const c = Number(row.count);
      total += c;
      if (row.rating === '5') fives += c;
      if (row.rating === '0' || row.rating === '1' || row.rating === 'Improvement Required') zeros += c;
    }

    return {
      venues,
      total: total || venues.length,
      fives,
      zeros,
    };
  } catch (error) {
    console.error(`Error fetching outcode data for ${outcode}:`, error);
    return { venues: [], total: 0, fives: 0, zeros: 0 };
  }
}

/**
 * Search establishments by keyword / postcode / city
 * Prioritizes indexed outcode and postcode prefix matches before full text scan
 */
export async function searchEstablishments(query: string, limit = 20): Promise<Establishment[]> {
  try {
    const q = query.trim();
    if (!q || q.length < 2) return [];

    const upperQ = q.toUpperCase();
    const safeLimit = Math.min(Math.max(limit, 1), 50);

    // 1. Fast path: Direct outcode exact or prefix match (Hits est_outcode_idx or est_postcode_idx)
    const isPotentialPostcode = /^[A-Z]{1,2}[0-9][0-9A-Z]?(\s*[0-9][A-Z]{2})?$/i.test(q);
    if (isPotentialPostcode) {
      const postcodeResults = await db
        .select()
        .from(establishments)
        .where(
          or(
            eq(establishments.outcode, upperQ),
            ilike(establishments.postcode, `${upperQ}%`)
          )
        )
        .orderBy(desc(establishments.ratingDate))
        .limit(safeLimit);

      if (postcodeResults.length > 0) {
        return postcodeResults;
      }
    }

    // 2. Name & Location search with sanitized input
    const cleanQ = q.replace(/[%_]/g, '\\$&');
    return await db
      .select()
      .from(establishments)
      .where(
        or(
          ilike(establishments.businessName, `%${cleanQ}%`),
          ilike(establishments.postcode, `${cleanQ}%`),
          ilike(establishments.outcode, `${cleanQ}%`),
          ilike(establishments.localAuthoritySlug, `%${cleanQ}%`)
        )
      )
      .orderBy(desc(establishments.ratingDate))
      .limit(safeLimit);
  } catch (error) {
    console.error(`Error searching establishments with query ${query}:`, error);
    return [];
  }
}
