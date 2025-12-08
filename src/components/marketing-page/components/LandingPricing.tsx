import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useTranslation } from 'react-i18next';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import FlashOnIcon from '@mui/icons-material/FlashOn';

const LANDING_GREEN = '#34D186';
const LANDING_GREEN_DARK = '#2AB673';

export default function LandingPricing() {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        py: { xs: 8, sm: 10 },
        bgcolor: '#f8f9fa',
      }}
    >
      <Container maxWidth="sm">
        <Typography
          variant="h2"
          component="h2"
          textAlign="center"
          sx={{
            mb: 6,
            fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
            fontWeight: 700,
            color: LANDING_GREEN_DARK,
          }}
        >
          {t('landing.pricing.title', { defaultValue: 'Hind' })}
        </Typography>

        <Card
          sx={{
            bgcolor: '#FFFFFF',
            borderRadius: '15px',
            boxShadow: '0 5px 25px rgba(0,0,0,0.1)',
            maxWidth: '500px',
            mx: 'auto',
          }}
        >
          <CardContent sx={{ p: { xs: 4, sm: 5 }, textAlign: 'center' }}>
            {/* Main Price */}
            <Typography
              variant="h1"
              component="div"
              sx={{
                fontSize: { xs: '3rem', sm: '3.5rem', md: '4rem' },
                fontWeight: 700,
                color: LANDING_GREEN,
                mb: 2,
                lineHeight: 1,
              }}
            >
              {t('landing.pricing.price', { defaultValue: '690€' })}
            </Typography>

            {/* Package Description */}
            <Typography
              variant="body1"
              sx={{
                color: '#666666',
                mb: 4,
                fontSize: { xs: '1rem', sm: '1.1rem' },
                lineHeight: 1.6,
              }}
            >
              {t('landing.pricing.package_description', { 
                defaultValue: 'Täispakk: teooria + praktika + litsentsi vormistamine' 
              })}
            </Typography>

            {/* Installment Payment Info */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 1,
                mb: 3,
              }}
            >
              <CreditCardIcon sx={{ fontSize: 20, color: '#1976D2' }} />
              <Typography
                variant="body2"
                sx={{
                  color: '#666666',
                  fontSize: { xs: '0.9rem', sm: '1rem' },
                }}
              >
                {t('landing.pricing.installment', { 
                  defaultValue: 'Võimalik maksta osade kaupa' 
                })}
              </Typography>
            </Box>

            {/* Special Offer */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 1,
                mt: 2,
                p: 2,
                borderRadius: '8px',
                bgcolor: 'rgba(52, 209, 134, 0.05)',
                mb: 4,
              }}
            >
              <FlashOnIcon sx={{ fontSize: 24, color: '#FF6B35' }} />
              <Typography
                variant="body1"
                sx={{
                  color: LANDING_GREEN_DARK,
                  fontWeight: 600,
                  fontSize: { xs: '1rem', sm: '1.2rem' },
                  lineHeight: 1.5,
                }}
              >
                {t('landing.pricing.special_offer', { 
                  defaultValue: 'Esimesed 5 registreerijat saavad -50€ soodustust!' 
                })}
              </Typography>
            </Box>

            {/* Action Buttons */}
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={2}
              sx={{ mt: 3 }}
            >
              <Button
                variant="outlined"
                fullWidth
                href="https://buy.stripe.com/14A28s0Fs4lycgtg1i3ZK00"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  py: 1.5,
                  borderRadius: '50px',
                  borderColor: LANDING_GREEN_DARK,
                  color: LANDING_GREEN_DARK,
                  fontWeight: 600,
                  fontSize: { xs: '0.95rem', sm: '1rem' },
                  '&:hover': {
                    borderColor: LANDING_GREEN,
                    bgcolor: 'rgba(52, 209, 134, 0.05)',
                    transform: 'scale(1.02)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                {t('landing.pricing.button_theory', { 
                  defaultValue: 'Оплатить теорию' 
                })}
              </Button>
              <Button
                variant="contained"
                fullWidth
                href="https://buy.stripe.com/6oU4gA9bY5pC4O1dTa3ZK03"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  py: 1.5,
                  borderRadius: '50px',
                  bgcolor: LANDING_GREEN,
                  color: '#FFFFFF',
                  fontWeight: 600,
                  fontSize: { xs: '0.95rem', sm: '1rem' },
                  boxShadow: '0 4px 15px rgba(52, 209, 134, 0.3)',
                  '&:hover': {
                    bgcolor: LANDING_GREEN_DARK,
                    boxShadow: '0 6px 20px rgba(52, 209, 134, 0.4)',
                    transform: 'scale(1.02)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                {t('landing.pricing.button_full_course', { 
                  defaultValue: 'Оплатить весь курс и получить скидку' 
                })}
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}
