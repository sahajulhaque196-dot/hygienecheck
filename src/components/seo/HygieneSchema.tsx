import React from 'react';

interface SchemaProps {
  businessName: string;
  ratingValue: string;
  ratingDate: string;
  businessType?: string;
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
  telephone?: string;
}

export const HygieneSchema: React.FC<SchemaProps> = ({
  businessName,
  ratingValue,
  ratingDate,
  businessType,
  address,
  geo,
  slug,
  telephone,
}) => {
  const isNumeric = ratingValue && /^[0-5]$/.test(ratingValue.trim());
  const ratingDisplay = isNumeric ? `${ratingValue.trim()} out of 5` : ratingValue;
  const canonicalUrl = `https://hygienecheck.uk/hygiene-rating/${slug}`;

  const schemaData: Record<string, any> = {
    '@context': 'https://schema.org',
    '@type': 'FoodEstablishment',
    '@id': `${canonicalUrl}#establishment`,
    name: businessName,
    url: canonicalUrl,
    ...(businessType && { servesCuisine: businessType }),
    ...(telephone && { telephone }),
    hasMap: `https://maps.google.com/?q=${geo.lat},${geo.lng}`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: address.street || address.city,
      addressLocality: address.city,
      postalCode: address.postcode,
      addressCountry: 'GB',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: geo.lat,
      longitude: geo.lng,
    },
    hasCertification: {
      '@type': 'Certification',
      name: 'Food Standards Agency Food Hygiene Rating',
      issuedBy: {
        '@type': 'GovernmentOrganization',
        name: 'Food Standards Agency',
        url: 'https://www.food.gov.uk',
      },
      certificationIdentification: ratingValue,
      auditDate: ratingDate,
    },
    additionalProperty: [
      {
        '@type': 'PropertyValue',
        name: 'Official Food Hygiene Rating',
        value: ratingDisplay,
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
