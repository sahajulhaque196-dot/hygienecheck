import { MetadataRoute } from 'next';
import { db } from '@/lib/db';
import { localAuthorities, establishments } from '@/lib/db/schema';
import { desc } from 'drizzle-orm';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://hygienecheck.uk';
  const currentDate = new Date().toISOString();

  // Core Static Pages
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}`, lastModified: currentDate, changeFrequency: 'daily', priority: 1.0 },
    { url: `${baseUrl}/authority`, lastModified: currentDate, changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/search`, lastModified: currentDate, changeFrequency: 'daily', priority: 0.85 },
    { url: `${baseUrl}/business-support`, lastModified: currentDate, changeFrequency: 'weekly', priority: 0.85 },
    { url: `${baseUrl}/foi`, lastModified: currentDate, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/about`, lastModified: currentDate, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/contact`, lastModified: currentDate, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/disclaimer`, lastModified: currentDate, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/privacy`, lastModified: currentDate, changeFrequency: 'monthly', priority: 0.4 },
    { url: `${baseUrl}/terms`, lastModified: currentDate, changeFrequency: 'monthly', priority: 0.4 },
  ];

  try {
    // 1. Fetch all local authorities from DB
    const allAuthorities = await db
      .select({ slug: localAuthorities.slug, lastSyncedAt: localAuthorities.lastSyncedAt })
      .from(localAuthorities);

    const authorityRoutes: MetadataRoute.Sitemap = allAuthorities.map((auth) => ({
      url: `${baseUrl}/authority/${auth.slug}`,
      lastModified: auth.lastSyncedAt ? auth.lastSyncedAt.toISOString() : currentDate,
      changeFrequency: 'daily',
      priority: 0.85,
    }));

    // 0-star watchlist routes for all authorities
    const watchlistRoutes: MetadataRoute.Sitemap = allAuthorities.map((auth) => ({
      url: `${baseUrl}/authority/${auth.slug}/0-star`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.8,
    }));

    // 2. Fetch top 5,000 recently inspected establishments for main sitemap
    const topVenues = await db
      .select({ slug: establishments.slug, ratingDate: establishments.ratingDate })
      .from(establishments)
      .orderBy(desc(establishments.ratingDate))
      .limit(5000);

    const venueRoutes: MetadataRoute.Sitemap = topVenues.map((v) => ({
      url: `${baseUrl}/hygiene-rating/${v.slug}`,
      lastModified: v.ratingDate || currentDate,
      changeFrequency: 'weekly',
      priority: 0.75,
    }));

    return [...staticRoutes, ...authorityRoutes, ...watchlistRoutes, ...venueRoutes];
  } catch (error) {
    console.error('Error generating dynamic sitemap from DB:', error);
    return staticRoutes;
  }
}
