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
// Get localized SEO title based on language
const getLocalizedTitle = (lang: string): string => {
  switch (lang) {
    case 'et':
      return 'Viktorija Autokool Nõmme - Juhiloba 4-5 nädalaga või raha tagasi! | A & B kategooria';
    case 'en':
      return 'Viktorija Autokool Nõmme - Driver\'s License in 4-5 weeks or money back! | A & B category';
    case 'ru':
      return 'Viktorija Autokool Nõmme - Водительские права за 4-5 недель или возврат денег! | Категория A & B';
    default:
      return 'Viktorija Autokool Nõmme - Juhiloba 4-5 nädalaga või raha tagasi! | A & B kategooria';
  }
};

// Get localized SEO description based on language
const getLocalizedDescription = (lang: string): string => {
  switch (lang) {
    case 'et':
      return 'Viktorija Autokool Nõmmes - professionaalne autokoolitus kategooriatele A ja B. 98% õpilastest sooritab eksami esimesel korral. Juhiluba 4-5 nädalaga või tagastame raha! Kogenud õpetajad, individuaalne lähenemine. Registreeri kohe!';
    case 'en':
      return 'Viktorija Autokool Nõmme - professional driving school training for categories A and B. 98% of students pass the exam on the first try. Driver\'s license in 4-5 weeks or money back! Experienced instructors, individual approach. Register now!';
    case 'ru':
      return 'Viktorija Autokool Nõmme - профессиональное обучение вождению категорий A и B. 98% учеников сдают экзамен с первого раза. Водительские права за 4-5 недель или возврат денег! Опытные инструкторы, индивидуальный подход. Запишитесь сейчас!';
    default:
      return 'Viktorija Autokool Nõmmes - professionaalne autokoolitus kategooriatele A ja B. 98% õpilastest sooritab eksami esimesel korral. Juhiluba 4-5 nädalaga või tagastame raha! Kogenud õpetajad, individuaalne lähenemine. Registreeri kohe!';
  }
};

// Get localized H1 heading based on language
export const getLocalizedH1 = (lang: string): string => {
  switch (lang) {
    case 'et':
      return 'Viktorija Autokool Nõmme - Professionaalne Autokoolitus Tallinnas';
    case 'en':
      return 'Viktorija Autokool Nõmme - Professional Driving School in Tallinn';
    case 'ru':
      return 'Viktorija Autokool Nõmme - Профессиональная автошкола в Таллинне';
    default:
      return 'Viktorija Autokool Nõmme - Professionaalne Autokoolitus Tallinnas';
  }
};

// Get localized H2 headings based on language
export const getLocalizedH2 = (key: string, lang: string): string => {
  const h2Map: { [key: string]: { [lang: string]: string } } = {
    'why_choose': {
      'et': 'Miks valida Viktorija Autokooli?',
      'en': 'Why Choose Viktorija Autokool?',
      'ru': 'Почему выбрать автошколу Viktorija?'
    },
    'categories': {
      'et': 'Meie kategooriad - A ja B juhiload',
      'en': 'Our Categories - A and B Driver\'s Licenses',
      'ru': 'Наши категории - Водительские права A и B'
    },
    'success_rate': {
      'et': '98% õpilastest sooritab eksami esimesel korral',
      'en': '98% of students pass the exam on the first try',
      'ru': '98% учеников сдают экзамен с первого раза'
    },
    'experienced_instructors': {
      'et': 'Kogenud õpetajad 15+ aastat kogemustega',
      'en': 'Experienced instructors with 15+ years of experience',
      'ru': 'Опытные инструкторы с 15+ годами опыта'
    },
    'money_back': {
      'et': 'Juhiluba 4-5 nädalaga või tagastame raha',
      'en': 'Driver\'s license in 4-5 weeks or money back',
      'ru': 'Водительские права за 4-5 недель или возврат денег'
    },
    'individual_approach': {
      'et': 'Individuaalne lähenemine iga õpilasele',
      'en': 'Individual approach to each student',
      'ru': 'Индивидуальный подход к каждому ученику'
    },
    'courses_prices': {
      'et': 'Kursused ja hinnad',
      'en': 'Courses and Prices',
      'ru': 'Курсы и цены'
    },
    'testimonials': {
      'et': 'Mida meie õpilased ütlevad?',
      'en': 'What do our students say?',
      'ru': 'Что говорят наши ученики?'
    }
  };

  return h2Map[key]?.[lang] || h2Map[key]?.['et'] || '';
};

export default function SEO({
  title,
  description,
  keywords,
  ogImage = '/logo.png',
  ogUrl,
  ogType = 'website',
  language,
  canonicalUrl,
  alternateLanguages
}: SEOProps) {
  const { t, i18n } = useTranslation();
  // Use language prop if provided, otherwise use current i18n language
  const currentLanguage = language || i18n.language || 'ru';
  const defaultKeywords = keywords || t('seo.default_keywords');
  // Use the provided title, or default SEO title based on language if title is not provided or empty
  const defaultTitle = getLocalizedTitle(currentLanguage);
  const fullTitle = (title && title.trim()) ? `${title} | Viktorija Autokool` : defaultTitle;
  // Use the provided description, or default SEO description based on language if description is not provided or empty
  const defaultDescription = getLocalizedDescription(currentLanguage);
  const finalDescription = (description && description.trim()) ? description : defaultDescription;
  // Use ogUrl as canonicalUrl if not specified
  const canonical = canonicalUrl || ogUrl;
  
  return (
    <Helmet>
      {/* Basic meta tags */}
      <html lang={currentLanguage} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>{fullTitle}</title>
      <meta name="description" content={finalDescription} />
      <meta name="keywords" content={defaultKeywords} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={finalDescription} />
      {ogImage && <meta property="og:image" content={ogImage} />}
      {ogUrl && <meta property="og:url" content={ogUrl} />}
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={finalDescription} />
      {ogImage && <meta name="twitter:image" content={ogImage} />}
      
      {/* Canonical link */}
      {canonical && <link rel="canonical" href={canonical} />}
      
      {/* Hreflang tags for language alternatives */}
      {currentLanguage && canonical && (
        <link rel="alternate" hrefLang={currentLanguage} href={canonical} />
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