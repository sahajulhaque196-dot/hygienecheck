import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Navbar } from '@/components/ui/Navbar';
import { SearchCommand } from '@/components/ui/SearchCommand';
import { AuthorBox } from '@/components/ui/AuthorBox';
import { Footer } from '@/components/ui/Footer';

export const metadata: Metadata = {
  title: {
    default: 'HygieneCheck.uk | Official UK Food Hygiene Ratings & Inspection Scores',
    template: '%s | HygieneCheck.uk',
  },
  description: 'Search official Food Standards Agency (FSA) hygiene scores, sub-score dials, and 5-year inspection history for over 520,000 UK restaurants, takeaways, cafes, and care homes.',
  metadataBase: new URL('https://hygienecheck.uk'),
  alternates: {
    canonical: 'https://hygienecheck.uk',
  },
  openGraph: {
    title: 'HygieneCheck.uk | Official UK Food Hygiene Intelligence',
    description: 'Check official food hygiene ratings and kitchen cleanliness scores for 520,000+ UK food places.',
    url: 'https://hygienecheck.uk',
    siteName: 'HygieneCheck.uk',
    locale: 'en_GB',
    type: 'website',
    images: [
      {
        url: '/brand/hero-visual.jpg',
        width: 1200,
        height: 630,
        alt: 'HygieneCheck.uk UK Food Hygiene Intelligence Dashboard',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HygieneCheck.uk | Check Food Hygiene Ratings Before You Eat',
    description: 'Search official food hygiene ratings and inspection reports for 520,000+ UK takeaways and restaurants.',
    creator: '@saddamh58509953',
    images: ['/brand/hero-visual.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/brand/logo.jpg',
    apple: '/brand/logo.jpg',
  },
};

export const viewport: Viewport = {
  themeColor: '#0B0F17',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const globalOrgSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': 'https://hygienecheck.uk/#organization',
        name: 'HygieneCheck.uk',
        url: 'https://hygienecheck.uk',
        logo: {
          '@type': 'ImageObject',
          url: 'https://hygienecheck.uk/brand/logo.jpg',
        },
        founder: {
          '@type': 'Person',
          name: 'Sahajul',
          jobTitle: 'Founder & Lead Architect',
          sameAs: ['https://x.com/saddamh58509953'],
          nationality: 'Indian',
          homeLocation: 'Assam, India',
        },
        sameAs: ['https://x.com/saddamh58509953'],
      },
      {
        '@type': 'WebSite',
        '@id': 'https://hygienecheck.uk/#website',
        url: 'https://hygienecheck.uk',
        name: 'HygieneCheck.uk',
        publisher: {
          '@id': 'https://hygienecheck.uk/#organization',
        },
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: 'https://hygienecheck.uk/authority/london?q={search_term_string}',
          },
          'query-input': 'required name=search_term_string',
        },
      },
    ],
  };

  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        {/* Prevent browser extensions (e.g. Bitdefender, Avast) from injecting attributes like bis_skin_checked before React hydration */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var origSet = Element.prototype.setAttribute;
                  Element.prototype.setAttribute = function(name, val) {
                    if (name === 'bis_skin_checked' || name === 'bis_size_checked' || name === 'data-gr-ext-installed') return;
                    return origSet.apply(this, arguments);
                  };
                  if (typeof document !== 'undefined') {
                    document.querySelectorAll('[bis_skin_checked],[bis_size_checked]').forEach(function(el) {
                      el.removeAttribute('bis_skin_checked');
                      el.removeAttribute('bis_size_checked');
                    });
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(globalOrgSchema) }}
        />
      </head>
      <body 
        className="bg-[#0B0F17] text-gray-100 min-h-screen flex flex-col antialiased selection:bg-emerald-500 selection:text-black overflow-x-hidden"
        suppressHydrationWarning
      >
        <Navbar />
        <SearchCommand />
        <main className="flex-1">{children}</main>
        
        {/* Sitewide Google E-E-A-T Author Box & Strong YMYL Public Health Disclaimer */}
        <AuthorBox />
        
        <Footer />
      </body>
    </html>
  );
}
