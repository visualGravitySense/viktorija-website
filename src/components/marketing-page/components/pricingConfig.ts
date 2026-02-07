export interface PricingTier {
  title: string;
  subheader?: string;
  price: string;
  description: string[];
  buttonText: string;
  buttonVariant: 'outlined' | 'contained';
  buttonColor: 'primary' | 'secondary';
}

export interface PricingConfig {
  title: string;
  subtitle: string;
  tiers: PricingTier[];
}

export const defaultPricingConfig: PricingConfig = {
  title: "Pricing",
  subtitle: "Quickly build an effective pricing table for your potential customers with this layout. It's built with default Material UI components with little customization.",
  tiers: [
    {
      title: 'Free',
      price: '0',
      description: [
        '10 users included',
        '2 GB of storage',
        'Help center access',
        'Email support',
      ],
      buttonText: 'Sign up for free',
      buttonVariant: 'outlined',
      buttonColor: 'primary',
    },
    {
      title: 'Professional',
      subheader: 'Recommended',
      price: '15',
      description: [
        '20 users included',
        '10 GB of storage',
        'Help center access',
        'Priority email support',
        'Dedicated team',
        'Best deals',
      ],
      buttonText: 'Start now',
      buttonVariant: 'contained',
      buttonColor: 'secondary',
    },
    {
      title: 'Enterprise',
      price: '30',
      description: [
        '50 users included',
        '30 GB of storage',
        'Help center access',
        'Phone & email support',
      ],
      buttonText: 'Contact us',
      buttonVariant: 'outlined',
      buttonColor: 'primary',
    },
  ],
}; 