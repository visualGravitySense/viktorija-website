import { PricingTier } from './Pricing';

export const getPricingData = (t: (key: string) => string) => ({
  title: t('pricing_data.title'),
  subtitle: t('pricing_data.subtitle'),
  tiers: [
    {
      title: t('pricing_data.tiers.a.title'),
      price: '570',
      description: t('pricing_data.tiers.a.description', { returnObjects: true }) as string[],
      buttonText: t('pricing_data.tiers.a.button_text'),
      buttonVariant: 'outlined' as const,
      buttonColor: 'primary' as const,
    },
    {
      title: t('pricing_data.tiers.b.title'),
      subheader: t('pricing_data.tiers.b.subheader'),
      price: '700',
      description: t('pricing_data.tiers.b.description', { returnObjects: true }) as string[],
      buttonText: t('pricing_data.tiers.b.button_text'),
      buttonVariant: 'contained' as const,
      buttonColor: 'secondary' as const,
    },
    {
      title: t('pricing_data.tiers.final.title'),
      price: '150',
      description: t('pricing_data.tiers.final.description', { returnObjects: true }) as string[],
      buttonText: t('pricing_data.tiers.final.button_text'),
      buttonVariant: 'outlined' as const,
      buttonColor: 'primary' as const,
    },
  ] as PricingTier[],
}); 