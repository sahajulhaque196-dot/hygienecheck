import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://hygienecheck.uk';
  const currentDate = new Date().toISOString();

  // Core Static Pages
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/authority`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/business-support`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/foi`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/disclaimer`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.4,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.4,
    },
  ];

  // UK Local Authorities
  const councilSlugs = [
    'london',
    'camden',
    'kensington',
    'southwark',
    'tower-hamlets',
    'islington',
    'birmingham',
    'manchester',
    'liverpool',
    'coventry',
    'salford',
    'wolverhampton',
    'leeds',
    'sheffield',
    'newcastle',
    'york',
    'bradford',
    'glasgow',
    'edinburgh',
    'cardiff',
    'swansea',
    'aberdeen',
    'bristol',
    'brighton',
    'oxford',
    'cambridge',
    'southampton',
    'norwich',
  ];

  const councilRoutes: MetadataRoute.Sitemap = councilSlugs.flatMap((slug) => [
    {
      url: `${baseUrl}/authority/${slug}`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/authority/${slug}/0-star`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.8,
    },
  ]);

  // Outcode Silos
  const outcodes = [
    'sw1a',
    'wc2e',
    'w1',
    'e1',
    'b1',
    'b21',
    'm1',
    'm4',
    'ls1',
    'g1',
    'l1',
    'bs1',
  ];

  const outcodeRoutes: MetadataRoute.Sitemap = outcodes.map((code) => ({
    url: `${baseUrl}/postcode/${code}`,
    lastModified: currentDate,
    changeFrequency: 'daily',
    priority: 0.8,
  }));

  // Featured / Watchlist Establishments
  const sampleVenues = [
    'the-ivy-market-grill-wc2e-8pb-100234',
    'golden-ocean-w2-4qj-1837192',
    'grand-spice-nw1-8tr-1928412',
    'al-sulaymaniyah-w2-1eb-1898885',
    'dishoom-covent-garden-wc2h-9fb-109382',
    'hawksmoor-seven-dials-wc2h-9aw-104928',
    'clos-maggiore-wc2e-8jd-108271',
    'flat-iron-covent-garden-wc2e-8qh-105921',
  ];

  const venueRoutes: MetadataRoute.Sitemap = sampleVenues.map((slug) => ({
    url: `${baseUrl}/hygiene-rating/${slug}`,
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: 0.75,
  }));

  return [...staticRoutes, ...councilRoutes, ...outcodeRoutes, ...venueRoutes];
}
