import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';

import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';
import PaymentButton from '../../shared/PaymentButton.tsx';

export interface PricingTier {
  title: string;
  subheader?: string;
  price: string;
  description: string[];
  buttonText: string;
  buttonVariant: 'outlined' | 'contained';
  buttonColor: 'primary' | 'secondary';
  categoryId?: string;
}

interface PricingProps {
  title?: string;
  subtitle?: string;
  tiers?: PricingTier[];
}

export default function Pricing({ 
  title,
  subtitle,
  tiers
}: PricingProps) {
  const { t } = useTranslation();
  
  // Use translations or fallback to pricingData
  const translatedTitle = title || t('pricing.title');
  const translatedSubtitle = subtitle || t('pricing.subtitle');
  const translatedTiers = tiers || [
    {
      title: t('pricing.category_a'),
      price: "570",
      description: [
        t('pricing.theory') + " - €120",
        t('pricing.practice') + " - €45 " + t('pricing.per_hour'),
        t('pricing.exam_prep')
      ],
      buttonText: t('pricing.button'),
      buttonVariant: 'outlined',
      buttonColor: 'primary',
      categoryId: 'category-a',
    },
    {
      title: t('pricing.category_b'),
      subheader: t('pricing.most_popular'),
      price: "700",
      description: [
        t('pricing.theory') + " - €150",
        t('pricing.practice') + " - €50 " + t('pricing.per_hour'),
        t('pricing.exam_prep'),
        t('pricing.features') + ":",
        t('pricing.feature1'),
        t('pricing.feature2')
      ],
      buttonText: t('pricing.button'),
      buttonVariant: 'contained',
      buttonColor: 'primary',
      categoryId: 'category-b',
    },
    {
      title: t('pricing.category_c'),
      price: "150",
      description: [
        t('pricing.theory') + " - €150",
        t('pricing.feature3'),
        t('pricing.feature4'),
        t('pricing.feature5'),
        t('pricing.feature6')
      ],
      buttonText: t('pricing.button'),
      buttonVariant: 'outlined',
      buttonColor: 'primary',
      categoryId: 'category-c',
    },
  ];

  return (
    <Container
      id="pricing"
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: { xs: 3, sm: 6 },
      }}
    >
      <Box
        sx={{
          width: { sm: '100%', md: '50%' },
          textAlign: { sm: 'left', md: 'center' },
        }}
      >
        <Typography
          component="h2"
          variant="h4"
          gutterBottom
          sx={{ color: 'text.primary' }}
        >
          {translatedTitle}
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
          {translatedSubtitle}
        </Typography>
      </Box>
      <Grid
        container
        spacing={3}
        sx={{ alignItems: 'center', justifyContent: 'center', width: '100%' }}
      >
        {translatedTiers.map((tier) => (
          <Grid
            size={{ xs: 12, sm: tier.title === 'Enterprise' ? 12 : 6, md: 4 }}
            key={tier.title}
          >
            <Card
              sx={[
                {
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 4,
                },
                tier.title === t('pricing.category_b') &&
                  ((theme) => ({
                    border: 'none',
                    background:
                      'radial-gradient(circle at 50% 0%, hsl(220, 20%, 35%), hsl(220, 30%, 6%))',
                    boxShadow: `0 8px 12px hsla(220, 20%, 42%, 0.2)`,
                    ...theme.applyStyles('dark', {
                      background:
                        'radial-gradient(circle at 50% 0%, hsl(220, 20%, 20%), hsl(220, 30%, 16%))',
                      boxShadow: `0 8px 12px hsla(0, 0%, 0%, 0.8)`,
                    }),
                  })),
              ]}
            >
              <CardContent>
                <Box
                  sx={[
                    {
                      mb: 1,
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      gap: 2,
                    },
                    tier.title === t('pricing.category_b')
                      ? { color: 'grey.100' }
                      : { color: '' },
                  ]}
                >
                  <Typography component="h3" variant="h6">
                    {tier.title}
                  </Typography>
                  {tier.subheader && (
                    <Chip icon={<AutoAwesomeIcon />} label={tier.subheader} />
                  )}
                </Box>
                <Box
                  sx={[
                    {
                      display: 'flex',
                      alignItems: 'baseline',
                    },
                    tier.title === t('pricing.category_b')
                      ? { color: 'grey.50' }
                      : { color: null },
                  ]}
                >
                  <Typography component="h3" variant="h2">
                    €{tier.price}
                  </Typography>
                  <Typography component="h3" variant="h6">
                    &nbsp; {t('pricing.total')}
                  </Typography>
                </Box>
                <Divider sx={{ my: 2, opacity: 0.8, borderColor: 'divider' }} />
                {tier.description.map((line) => (
                  <Box
                    key={line}
                    sx={{ py: 1, display: 'flex', gap: 1.5, alignItems: 'center' }}
                  >
                    <CheckCircleRoundedIcon
                      sx={[
                        {
                          width: 20,
                        },
                        tier.title === t('pricing.category_b')
                          ? { color: 'primary.light' }
                          : { color: 'primary.main' },
                      ]}
                    />
                    <Typography
                      variant="subtitle2"
                      component={'span'}
                      sx={[
                        tier.title === t('pricing.category_b')
                          ? { color: 'grey.50' }
                          : { color: null },
                      ]}
                    >
                      {line}
                    </Typography>
                  </Box>
                ))}
              </CardContent>
              <CardActions>
                <PaymentButton
                  fullWidth
                  variant={tier.buttonVariant}
                  category={tier.categoryId as 'category-a' | 'category-b' | 'category-c'}
                  transmissionType="manual"
                >
                  {tier.buttonText}
                </PaymentButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
