import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useTranslation } from 'react-i18next';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';

const LANDING_GREEN = '#34D186';
const LANDING_GREEN_DARK = '#2AB673';

export default function LandingCTA() {
  const { t } = useTranslation();

  return (
    <Box
      id="cta"
      sx={{
        py: { xs: 8, sm: 10 },
        bgcolor: LANDING_GREEN,
        color: '#FFFFFF',
        textAlign: 'center',
      }}
    >
      <Container maxWidth="md">
        {/* Main Heading */}
        <Typography
          variant="h2"
          component="h2"
          sx={{
            mb: 2,
            fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
            fontWeight: 700,
            color: '#FFFFFF',
          }}
        >
          {t('landing.cta.title', { defaultValue: 'Valmis alustama?' })}
        </Typography>

        {/* Subtitle */}
        <Typography
          variant="h6"
          sx={{
            mb: 4,
            fontSize: { xs: '1.1rem', sm: '1.3rem' },
            color: '#FFFFFF',
            opacity: 0.95,
            maxWidth: '700px',
            mx: 'auto',
            lineHeight: 1.6,
          }}
        >
          {t('landing.cta.subtitle', { 
            defaultValue: 'Registreeru täna ja alusta teenimist juba paari nädala pärast!' 
          })}
        </Typography>

        {/* Action Buttons */}
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          justifyContent="center"
          sx={{ mb: 4 }}
        >
          {/* WhatsApp Button */}
          <Button
            variant="contained"
            href="https://wa.me/37253464508"
            target="_blank"
            rel="noopener noreferrer"
            startIcon={<WhatsAppIcon />}
            sx={{
              py: 1.8,
              px: 4,
              borderRadius: '50px',
              bgcolor: '#25D366',
              color: '#FFFFFF',
              fontWeight: 600,
              fontSize: { xs: '1rem', sm: '1.2rem' },
              textTransform: 'none',
              boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
              '&:hover': {
                bgcolor: '#20BA5A',
                boxShadow: '0 6px 20px rgba(0,0,0,0.3)',
                transform: 'scale(1.05)',
              },
              transition: 'all 0.3s ease',
            }}
          >
            {t('landing.cta.button_whatsapp', { defaultValue: 'WhatsApp' })}
          </Button>

          {/* Phone Button */}
          <Button
            variant="contained"
            href="tel:+37253464508"
            startIcon={<PhoneIcon />}
            sx={{
              py: 1.8,
              px: 4,
              borderRadius: '50px',
              bgcolor: '#FFFFFF',
              color: '#E91E63',
              fontWeight: 600,
              fontSize: { xs: '1rem', sm: '1.2rem' },
              textTransform: 'none',
              boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
              '&:hover': {
                bgcolor: '#F5F5F5',
                boxShadow: '0 6px 20px rgba(0,0,0,0.3)',
                transform: 'scale(1.05)',
              },
              '& .MuiSvgIcon-root': {
                color: '#E91E63',
              },
              transition: 'all 0.3s ease',
            }}
          >
            {t('landing.cta.button_call', { defaultValue: 'Helista kohe' })}
          </Button>
        </Stack>

        {/* Email */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 1,
            mt: 4,
          }}
        >
          <EmailIcon sx={{ fontSize: 18, opacity: 0.9 }} />
          <Typography
            component="a"
            href="mailto:viktorijaautokool@hot.ee"
            sx={{
              fontSize: { xs: '0.95rem', sm: '1.1rem' },
              color: '#FFFFFF',
              opacity: 0.9,
              textDecoration: 'none',
              '&:hover': {
                opacity: 1,
                textDecoration: 'underline',
              },
              transition: 'opacity 0.3s ease',
            }}
          >
            {t('landing.cta.email', { defaultValue: 'viktorijaautokool@hot.ee' })}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
