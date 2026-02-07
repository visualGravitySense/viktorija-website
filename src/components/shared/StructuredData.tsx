import React from 'react';
import { Helmet } from 'react-helmet-async';

interface LocalBusinessProps {
  name: string;
  description: string;
  url: string;
  telephone: string;
  email: string;
  address: {
    streetAddress: string;
    addressLocality: string;
    addressRegion?: string;
    postalCode: string;
    addressCountry: string;
  };
  geo?: {
    latitude: number;
    longitude: number;
  };
  openingHours?: string[];
  image?: string;
}

export const LocalBusinessSchema: React.FC<LocalBusinessProps> = ({
  name,
  description,
  url,
  telephone,
  email,
  address,
  geo,
  openingHours,
  image
}) => {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'DrivingSchool',
    name,
    description,
    url,
    telephone,
    email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: address.streetAddress,
      addressLocality: address.addressLocality,
      addressRegion: address.addressRegion,
      postalCode: address.postalCode,
      addressCountry: address.addressCountry
    },
    ...(geo && {
      geo: {
        '@type': 'GeoCoordinates',
        latitude: geo.latitude,
        longitude: geo.longitude
      }
    }),
    ...(openingHours && { openingHoursSpecification: openingHours }),
    ...(image && { image })
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
};

interface FAQProps {
  questions: Array<{
    question: string;
    answer: string;
  }>;
}

export const FAQSchema: React.FC<FAQProps> = ({ questions }) => {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: questions.map(q => ({
      '@type': 'Question',
      name: q.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: q.answer
      }
    }))
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
};

interface CourseProps {
  name: string;
  description: string;
  provider: string;
  url: string;
  image?: string;
  price?: number;
  priceCurrency?: string;
}

export const CourseSchema: React.FC<CourseProps> = ({
  name,
  description,
  provider,
  url,
  image,
  price,
  priceCurrency = 'EUR'
}) => {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name,
    description,
    provider: {
      '@type': 'Organization',
      name: provider
    },
    url,
    ...(image && { image }),
    ...(price && {
      offers: {
        '@type': 'Offer',
        price,
        priceCurrency
      }
    })
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
}; 