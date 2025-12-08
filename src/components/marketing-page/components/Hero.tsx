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
import EmailIcon from '@mui/icons-material/Email';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { alpha } from '@mui/material/styles';
import { keyframes } from '@emotion/react';
import mainHeroImg from '/main-hero-1.jpg';

const pulseAnimation = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(25, 118, 210, 0.7);
  }
  70% {
    box-shadow: 0 0 0 15px rgba(25, 118, 210, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(25, 118, 210, 0);
  }
`;

interface HeroProps {
  title?: string;
  subtitle?: string;
  description?: string;
  buttonText?: string;
  buttonLink?: string;
  imageUrl?: string;
  imageAlt?: string;
  translationKey?: 'home' | 'about' | 'features';
  variant?: 'default' | 'landing';
  showImage?: boolean;
}

export default function Hero({
  title,
  subtitle,
  description,
  buttonText,
  buttonLink = 'https://buy.stripe.com/14A28s0Fs4lycgtg1i3ZK00',
  imageUrl = mainHeroImg,
  imageAlt = 'Driving School Hero',
  translationKey = 'home',
  variant = 'default',
  showImage = true
}: HeroProps) {
  const { t } = useTranslation();
  
  const isLanding = variant === 'landing';
  
  // Use translations from i18n if translationKey is provided and no direct props
  const translationPrefix = isLanding ? 'landing.hero' : `hero.${translationKey}`;
  const displayTitle = title || t(`${translationPrefix}.title`);
  const displaySubtitle = subtitle || t(`${translationPrefix}.subtitle`);
  const displayDescription = description || t(`${translationPrefix}.description`);
  const displayButtonText = buttonText || t(`${translationPrefix}.button`);

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
  
  const greenGradient = 'linear-gradient(135deg, #34D186 0%, #2AB673 100%)';
  
  return (
    <Box
      id="hero"
      sx={(theme) => ({
        width: '100%',
        backgroundColor: isLanding ? '#34D186' : 'transparent',
        backgroundImage: isLanding 
          ? greenGradient
          : theme.palette.mode === 'light'
            ? 'linear-gradient(180deg,rgba(49, 130, 206, 0.20), #FCFCFC)'
            : `linear-gradient(#1F3B60, ${alpha('#05070A', 0.95)})`,
        backgroundSize: isLanding ? 'cover' : '100% 20%',
        backgroundRepeat: 'no-repeat',
        color: isLanding ? '#FFFFFF' : 'inherit',
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
              px: { xs: 1, sm: 0 },
              color: isLanding ? '#FFFFFF' : 'inherit'
            }}
          >
            {displayTitle}
          </Typography>
          <Typography
            variant="h5"
            textAlign="center"
            color={isLanding ? '#FFFFFF' : 'text.secondary'}
            sx={{ 
              alignSelf: 'center', 
              width: { xs: '100%', sm: '100%', md: '85%' },
              fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' },
              fontWeight: 500,
              lineHeight: { xs: 1.4, sm: 1.5 },
              px: { xs: 1, sm: 0 },
              opacity: isLanding ? 0.95 : 1
            }}
          >
            {displaySubtitle}
          </Typography>
          {displayDescription && (
            <Typography
              variant="body1"
              textAlign="center"
              color={isLanding ? '#FFFFFF' : 'text.secondary'}
              sx={{ 
                alignSelf: 'center', 
                width: { xs: '100%', sm: '100%', md: '85%' },
                fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
                lineHeight: { xs: 1.5, sm: 1.6 },
                px: { xs: 1, sm: 0 },
                opacity: isLanding ? 0.95 : 1
              }}
            >
              {displayDescription}
            </Typography>
          )}

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

          {/* Primary CTA Button */}
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            mt: 4,
            px: { xs: 1, sm: 0 }
          }}>
            <Button
              variant={isLanding ? 'contained' : 'contained'}
              size="large"
              endIcon={<ArrowForwardIcon />}
              component="a"
              href={buttonLink}
              target="_blank"
              rel="noopener noreferrer"
              sx={(theme) => ({
                position: 'relative',
                minWidth: { xs: '280px', sm: '320px' },
                py: { xs: 1.5, sm: 2 },
                px: 4,
                background: isLanding 
                  ? '#FFFFFF' 
                  : `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary?.main || theme.palette.primary.light})`,
                color: isLanding 
                  ? '#34D186' 
                  : theme.palette.primary.contrastText || '#ffffff',
                borderRadius: isLanding ? '50px' : '12px',
                fontWeight: 600,
                fontSize: { xs: '1rem', sm: '1.1rem', md: '1.2rem' },
                textTransform: 'none',
                boxShadow: isLanding 
                  ? '0 4px 15px rgba(0,0,0,0.2)' 
                  : '0 4px 20px rgba(0,0,0,0.25)',
                transition: 'all 0.3s ease',
                overflow: 'hidden',
                animation: isLanding ? 'none' : `${pulseAnimation} 2s infinite`,
                '&:hover': {
                  transform: isLanding ? 'scale(1.05)' : 'translateY(-3px)',
                  boxShadow: isLanding 
                    ? '0 6px 20px rgba(0,0,0,0.3)' 
                    : '0 8px 30px rgba(0,0,0,0.35)',
                  background: isLanding 
                    ? '#FFFFFF' 
                    : `linear-gradient(45deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
                  animation: 'none',
                },
                '&:active': {
                  transform: isLanding ? 'scale(1.02)' : 'translateY(-1px)',
                },
                '& .MuiButton-endIcon': {
                  transition: 'transform 0.3s ease',
                },
                '&:hover .MuiButton-endIcon': {
                  transform: 'translateX(4px)',
                },
              })}
            >
              {displayButtonText || t('hero.home.button', { defaultValue: 'Записаться на курс' })}
            </Button>
          </Box>

          {/* Email Button */}
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            mt: 2,
            px: { xs: 1, sm: 0 }
          }}>
            <Button
              variant="outlined"
              size="large"
              startIcon={<EmailIcon />}
              href="mailto:viktorijaautokool@hot.ee?subject=Registratsioon%20autokooli"
              sx={{
                px: 4,
                py: 1.5,
                fontSize: { xs: '0.9rem', sm: '1rem' },
                borderWidth: 2,
                '&:hover': {
                  borderWidth: 2,
                }
              }}
            >
              {t('common.send_email')}
            </Button>
          </Box>
          
        </Stack>
        {/* Image - Hide on landing variant */}
        {showImage && !isLanding && (
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
              loading="eager"
              fetchPriority="high"
              width="1200"
              height="400"
              style={{
                borderRadius: 'inherit',
                display: 'block',
                width: '100%',
                height: 'auto',
                objectFit: 'cover',
                objectPosition: 'center',
                maxHeight: '400px'
              }}
            />
          </Box>
        )}
      </Container>
    </Box>
  );
}
