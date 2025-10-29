import React from 'react';
import { useTranslation } from 'react-i18next';
import PainPoints, { PainPointItem } from '../components/marketing-page/components/PainPoints';

export default function DrivingCategoriesPage() {
  const { t } = useTranslation();

  const drivingCategories: PainPointItem[] = [
    {
      id: 'category-a',
      title: t('driving_categories.categories.a.title'),
      description: t('driving_categories.categories.a.description'),
      imageUrl: 'https://placehold.co/320x180?text=Before',
      price: {
        theory: 120,
        lesson: 45,
        total: 570
      },
      buttonText: 'Register'
    },
    {
      id: 'category-b',
      title: t('driving_categories.categories.b.title'),
      description: t('driving_categories.categories.b.description'),
      imageUrl: 'https://placehold.co/320x180?text=After',
      price: {
        theory: 150,
        lesson: 50,
        total: 650
      },
      buttonText: 'Register'
    },
    {
      id: 'category-c',
      title: t('driving_categories.categories.c.title'),
      description: t('driving_categories.categories.c.description'),
      imageUrl: 'https://placehold.co/320x180?text=After',
      price: {
        theory: 180,
        lesson: 60,
        total: 780
      },
      buttonText: 'Register'
    }
  ];

  return (
    <React.Fragment>
      <PainPoints
        title={t('driving_categories.page_title')}
        subtitle={t('driving_categories.page_subtitle')}
        items={drivingCategories}
      />
    </React.Fragment>
  );
} 