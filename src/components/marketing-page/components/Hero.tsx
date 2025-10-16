import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import StarIcon from '@mui/icons-material/Star';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import SupportIcon from '@mui/icons-material/Support';
import SecurityIcon from '@mui/icons-material/Security';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { alpha } from '@mui/material/styles';
import mainHeroImg from '/main-hero-1.jpg';

interface HeroProps {
  title: string;
  subtitle?: string;
  description: string;
  buttonText: string;
  buttonLink?: string;
  imageUrl?: string;
  imageAlt?: string;
  translationKey?: 'home' | 'about' | 'features';
}

export default function Hero({
  title,
  subtitle,
  description,
  buttonText,
  buttonLink = 'https://buy.stripe.com/14A28s0Fs4lycgtg1i3ZK00',
  imageUrl = mainHeroImg,
  imageAlt = 'Driving School Hero',
  translationKey = 'home'
}: HeroProps) {
  const { t } = useTranslation();
  
  // Use translations from i18n if translationKey is provided and no direct props
  const displayTitle = title || t(`hero.${translationKey}.title`);
  const displaySubtitle = subtitle || t(`hero.${translationKey}.subtitle`);
  const displayDescription = description || t(`hero.${translationKey}.description`);
  const displayButtonText = buttonText || t(`hero.${translationKey}.button`);

  // Social proof data - Enhanced with better metrics and localization
  const socialProof = [
    { 
      text: t('social_proof.rating.value'), 
      icon: <StarIcon sx={{ color: 'warning.main', fontSize: { xs: '1.5rem', sm: '1.8rem' } }} />, 
      label: t('social_proof.rating.label'),
      sublabel: t('social_proof.rating.sublabel')
    },
    { 
      text: t('social_proof.experience.value'), 
      icon: <LocalShippingIcon sx={{ color: 'primary.main', fontSize: { xs: '1.5rem', sm: '1.8rem' } }} />, 
      label: t('social_proof.experience.label'),
      sublabel: t('social_proof.experience.sublabel')
    },
    { 
      text: t('social_proof.students.value'), 
      icon: <SupportIcon sx={{ color: 'success.main', fontSize: { xs: '1.5rem', sm: '1.8rem' } }} />, 
      label: t('social_proof.students.label'),
      sublabel: t('social_proof.students.sublabel')
    },
    { 
      text: t('social_proof.success_rate.value'), 
      icon: <TrendingUpIcon sx={{ color: 'info.main', fontSize: { xs: '1.5rem', sm: '1.8rem' } }} />, 
      label: t('social_proof.success_rate.label'),
      sublabel: t('social_proof.success_rate.sublabel')
    }
  ];

  // Trust indicators
  const trustIndicators = [
    { icon: <SecurityIcon color="success" />, text: "SSL turvaline" },
    { icon: <CheckCircleIcon color="primary" />, text: "Garantitud tulemus" },
    { icon: <SupportIcon color="info" />, text: "24/7 tugi" }
  ];
  
  return (
    <Box
      id="hero"
      sx={(theme) => ({
        width: '100%',
        backgroundImage:
          theme.palette.mode === 'light'
            ? 'linear-gradient(180deg,rgba(49, 130, 206, 0.20), #FCFCFC)'
            : `linear-gradient(#1F3B60, ${alpha('#05070A', 0.95)})`,
        backgroundSize: '100% 20%',
        backgroundRepeat: 'no-repeat',
      })}
    >
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          pt: { xs: 14, sm: 20 },
          pb: { xs: 8, sm: 12 },
        }}
      >
        

        <Stack spacing={{ xs: 3, sm: 2 }} useFlexGap sx={{ width: { xs: '100%', sm: '70%' }, px: { xs: 2, sm: 0 } }}>
          <Typography
            component="h1"
            variant="h1"
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignSelf: 'center',
              textAlign: 'center',
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3.5rem', lg: '4rem' },
              fontWeight: 'bold',
              lineHeight: { xs: 1.2, sm: 1.3 },
              px: { xs: 1, sm: 0 }
            }}
          >
            {displayTitle}
          </Typography>
          <Typography
            variant="h5"
            textAlign="center"
            color="text.secondary"
            sx={{ 
              alignSelf: 'center', 
              width: { xs: '100%', sm: '100%', md: '85%' },
              fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' },
              fontWeight: 500,
              lineHeight: { xs: 1.4, sm: 1.5 },
              px: { xs: 1, sm: 0 }
            }}
          >
            {displaySubtitle}
          </Typography>
          <Typography
            variant="body1"
            textAlign="center"
            color="text.secondary"
            sx={{ 
              alignSelf: 'center', 
              width: { xs: '100%', sm: '100%', md: '85%' },
              fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
              lineHeight: { xs: 1.5, sm: 1.6 },
              px: { xs: 1, sm: 0 }
            }}
          >
            {displayDescription}
          </Typography>

          {/* Trust Indicators */}
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            flexWrap: 'wrap', 
            gap: { xs: 1, sm: 2 },
            mt: 2,
            px: { xs: 1, sm: 0 }
          }}>
            {trustIndicators.map((indicator, index) => (
              <Chip
                key={index}
                icon={indicator.icon}
                label={indicator.text}
                variant="outlined"
                size="small"
                sx={{ 
                  bgcolor: 'background.paper',
                  fontSize: { xs: '0.75rem', sm: '0.875rem' },
                  height: { xs: 28, sm: 32 },
                  '&:hover': {
                    bgcolor: 'primary.50',
                    borderColor: 'primary.main'
                  }
                }}
              />
            ))}
          </Box>

          
        </Stack>
        <Box
          id="image"
          sx={{
            mt: { xs: 6, sm: 8, md: 10 },
            alignSelf: 'center',
            width: '100%',
            maxWidth: { xs: '100%', sm: '90%', md: '80%' },
            borderRadius: { xs: '8px', sm: '10px' },
            outline: '1px solid',
            outlineColor: (theme) =>
              theme.palette.mode === 'light' ? 'primary.200' : 'primary.700',
            boxShadow: (theme) =>
              theme.palette.mode === 'light'
                ? `0 0 ${alpha(theme.palette.primary.main, 0.2)}`
                : `0 0 24px 12px ${alpha(theme.palette.primary.main, 0.2)}`,
            mx: { xs: 2, sm: 0 }
          }}
        >
          <img
            src={imageUrl}
            alt={imageAlt || displayTitle}
            loading="lazy"
            width="100%"
            height="auto"
            style={{
              borderRadius: 'inherit',
              display: 'block',
              width: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
              maxHeight: '400px'
            }}
          />
        </Box>
      </Container>
    </Box>
  );
}
