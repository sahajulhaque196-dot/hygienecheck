import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/*?q=',
          '/*?*q=',
          '/*?page=',
          '/*?sort=',
          '/*?filter=',
        ],
      },
      {
        userAgent: ['Googlebot', 'Bingbot'],
        allow: '/',
        disallow: ['/api/'],
      },
    ],
    sitemap: 'https://hygienecheck.uk/sitemap.xml',
  };
}
