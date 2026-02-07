import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Checkout from '../components/checkout/Checkout.tsx';
import SEO from '../components/shared/SEO.tsx';
import SEOHeading from '../components/shared/SEOHeading.tsx';
import { CourseSchema } from '../components/shared/StructuredData.tsx';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import aCatImg from '/a-cat.jpg';
import bCatImg from '/b-cat.jpg';

interface CheckoutPageProps {
  disableCustomTheme?: boolean;
  toggleColorMode?: () => void;
}

export default function CheckoutPage({ disableCustomTheme, toggleColorMode }: CheckoutPageProps) {
  const { t, i18n } = useTranslation();
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category') || '';
  
  // Determine the title based on the category parameter
  // Empty title will use default localized title from SEO component
  let title = '';
  let description = t('navigation.signup');
  let courseName = t('checkout.selected_products');
  let courseDescription = t('checkout.selected_products');
  let courseImage = '';
  let coursePrice = 0;
  
  if (category === 'category-a') {
    title = t('painpoints.categories.a.title');
    description = t('painpoints.categories.a.description');
    courseName = t('painpoints.categories.a.title');
    courseDescription = t('painpoints.categories.a.description');
    courseImage = aCatImg;
    coursePrice = 570;
  } else if (category === 'category-b') {
    title = t('painpoints.categories.b.title');
    description = t('painpoints.categories.b.description');
    courseName = t('painpoints.categories.b.title');
    courseDescription = t('painpoints.categories.b.description');
    courseImage = bCatImg;
    coursePrice = 700;
  } else if (category === 'category-c') {
    title = t('painpoints.categories.c.title');
    description = t('painpoints.categories.c.description');
    courseName = t('painpoints.categories.c.title');
    courseDescription = t('painpoints.categories.c.description');
    courseImage = bCatImg;
    coursePrice = 150;
  }
  
  // Determine H1 heading text based on category
  let h1Title = title;
  if (category === 'category-a') {
    h1Title = t('painpoints.categories.a.title');
  } else if (category === 'category-b') {
    h1Title = t('painpoints.categories.b.title');
  } else if (category === 'category-c') {
    h1Title = t('painpoints.categories.c.title');
  } else {
    h1Title = t('checkout.page_title') || t('checkout.place_order');
  }

  return (
    <Box sx={{ minHeight: '100vh', width: '100%' }}>
      <SEO 
        title={title}
        description={description}
        ogUrl={`https://viktorijaautokool.ee/checkout${category ? `?category=${category}` : ''}`}
        canonicalUrl="https://viktorijaautokool.ee/checkout"
        language={i18n.language}
      />
      
      {/* SEO H1 Heading - on all pages */}
      <SEOHeading />
      
      {/* Dynamic Course Structured Data based on URL parameter */}
      <CourseSchema
        name={courseName}
        description={courseDescription}
        provider="Viktorija Autokool Nõmme"
        url={`https://viktorijaautokool.ee/checkout?category=${category}`}
        image={courseImage}
        price={coursePrice}
      />
      
      <Checkout disableCustomTheme={disableCustomTheme} h1Title={h1Title} />
    </Box>
  );
} 