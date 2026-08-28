import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'HygieneCheck.uk | UK Food Hygiene Ratings',
    short_name: 'HygieneCheck',
    description: 'Check official food hygiene inspection ratings for over 520,000 UK restaurants and takeaways.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0B0F17',
    theme_color: '#10B981',
    icons: [
      {
        src: '/brand/logo.jpg',
        sizes: '192x192',
        type: 'image/jpeg',
      },
      {
        src: '/brand/logo.jpg',
        sizes: '512x512',
        type: 'image/jpeg',
      },
    ],
  };
}
