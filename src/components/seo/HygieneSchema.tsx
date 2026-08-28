import React from 'react';

interface SchemaProps {
  businessName: string;
  ratingValue: string;
  ratingDate: string;
  address: {
    street: string;
    city: string;
    postcode: string;
  };
  geo: {
    lat: number;
    lng: number;
  };
  slug: string;
}

export const HygieneSchema: React.FC<SchemaProps> = ({
  businessName,
  ratingValue,
  ratingDate,
  address,
  geo,
  slug,
}) => {
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'FoodEstablishment',
    '@id': `https://hygienecheck.uk/hygiene-rating/${slug}#establishment`,
    name: businessName,
    hasMap: `https://maps.google.com/?q=${geo.lat},${geo.lng}`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: address.street,
      addressLocality: address.city,
      postalCode: address.postcode,
      addressCountry: 'GB',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: geo.lat,
      longitude: geo.lng,
    },
    ...(ratingValue && /^[0-5]$/.test(ratingValue.trim())
      ? {
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: ratingValue.trim(),
            bestRating: '5',
            worstRating: '0',
            ratingCount: '1',
            reviewCount: '1',
          },
        }
      : {}),
    additionalProperty: [
      {
        '@type': 'PropertyValue',
        name: 'Food Standards Agency Hygiene Score',
        value: `${ratingValue} out of 5`,
      },
      {
        '@type': 'PropertyValue',
        name: 'Inspection Date',
        value: ratingDate,
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
};
