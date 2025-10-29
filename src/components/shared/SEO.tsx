import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  ogUrl?: string;
  ogType?: string;
  language?: string;
  canonicalUrl?: string;
  alternateLanguages?: {
    [lang: string]: string;
  };
}

/**
 * SEO component for handling meta tags across the application
 */
export default function SEO({
  title,
  description,
  keywords,
  ogImage = '/logo.png',
  ogUrl,
  ogType = 'website',
  language = 'ru',
  canonicalUrl,
  alternateLanguages
}: SEOProps) {
  const { t } = useTranslation();
  const defaultKeywords = keywords || t('seo.default_keywords');
  const fullTitle = `${title} | Viktorija Autokool`;
  // Use ogUrl as canonicalUrl if not specified
  const canonical = canonicalUrl || ogUrl;
  
  return (
    <Helmet>
      {/* Basic meta tags */}
      <html lang={language} />
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={defaultKeywords} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      {ogImage && <meta property="og:image" content={ogImage} />}
      {ogUrl && <meta property="og:url" content={ogUrl} />}
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      {ogImage && <meta name="twitter:image" content={ogImage} />}
      
      {/* Canonical link */}
      {canonical && <link rel="canonical" href={canonical} />}
      
      {/* Hreflang tags for language alternatives */}
      {language && canonical && (
        <link rel="alternate" hrefLang={language} href={canonical} />
      )}
      {alternateLanguages && Object.entries(alternateLanguages).map(([lang, url]) => (
        <link key={lang} rel="alternate" hrefLang={lang} href={url} />
      ))}
      
      {/* Add x-default hreflang for search engines */}
      {canonical && (
        <link rel="alternate" hrefLang="x-default" href={canonical} />
      )}
    </Helmet>
  );
} 