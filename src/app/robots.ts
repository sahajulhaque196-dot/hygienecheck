import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/'],
      },
      {
        userAgent: ['Googlebot', 'Bingbot'],
        allow: '/',
      },
    ],
    sitemap: 'https://hygienecheck.uk/sitemap.xml',
    host: 'https://hygienecheck.uk',
  };
}
