import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
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
import { trackButtonClick } from '../../../lib/analytics';

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

const fadeInLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const fadeInRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const rotateBackground = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
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
  nextCourseDate?: Date;
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
  showImage = true,
  nextCourseDate = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
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

  // Trust indicators - using emoji icons like in the mockup
  const trustIndicators = [
    { icon: '🎯', text: t('social_proof.success_rate.label', { defaultValue: '98% õpilastest sooritab eksami esimesel korral' }) },
    { icon: '⏱️', text: t('common.support_24_7', { defaultValue: '24/7 tugi' }) },
    { icon: '✅', text: t('common.guaranteed_result', { defaultValue: 'Garanteeritud tulemus' }) }
  ];
  
  const greenGradient = 'linear-gradient(135deg, #34D186 0%, #2AB673 100%)';
  const darkGradient = 'linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)';
  
  return (
    <Box
      id="hero"
      sx={(theme) => ({
        width: '100%',
        minHeight: { xs: 'auto', md: '100vh' },
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: isLanding ? '#34D186' : 'transparent',
        backgroundImage: isLanding 
          ? greenGradient
          : darkGradient,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        color: '#FFFFFF',
        '&::before': {
          content: '""',
          position: 'absolute',
          width: '200%',
          height: '200%',
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)',
          animation: `${rotateBackground} 20s linear infinite`,
          top: '-50%',
          left: '-50%',
          zIndex: 0,
        },
      })}
    >
      <Container
        maxWidth="lg"
        sx={{
          position: 'relative',
          zIndex: 1,
          pt: { xs: 8, sm: 12, md: 14 },
          pb: { xs: 6, sm: 8, md: 10 },
        }}
      >
        <Grid container spacing={{ xs: 4, md: 6 }} alignItems="center">
          {/* Left Column - Content */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Stack 
              spacing={{ xs: 3, sm: 2 }} 
              useFlexGap
              sx={{
                animation: `${fadeInLeft} 1s ease-out`,
                textAlign: { xs: 'center', md: 'left' },
              }}
            >
              <Typography
                component="h2"
                variant="h2"
                sx={{
                  fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem', lg: '3.5rem' },
                  fontWeight: 800,
                  lineHeight: 1.2,
                  textShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
                  mb: 3,
                  mt: 6,
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: { xs: 0.5, sm: 1 },
                  alignItems: 'baseline',
                }}
              >
                {(() => {
                  // Function to render title with gradient colors like in the mockup
                  const renderGradientTitle = (text: string) => {
                    // Color scheme from the mockup:
                    // White -> Medium Blue -> Lighter Blue -> Light Blue/Teal -> Teal
                    const colors = {
                      white: '#FFFFFF',
                      mediumBlue: '#3b82f6',
                      lightBlue: '#60a5fa',
                      teal: '#06b6d4',
                      darkTeal: '#14b8a6'
                    };
                    
                    // Split by common patterns
                    // Pattern: "Viktorija Autokool" (white) "Nõmme -" (medium blue) "Professionaalne" (light blue) "Autokoolitus" (teal) "Tallinnas" (dark teal)
                    
                    // For Estonian: "Viktorija Autokool Nõmme - Professionaalne Autokoolitus Tallinnas"
                    if (text.includes('Viktorija Autokool Nõmme')) {
                      const parts = text.split(/(\s+|Nõmme|Professionaalne|Autokoolitus|Tallinnas|-)/);
                      return parts.filter(part => part).map((part, index) => {
                        if (!part.trim() && part !== '-') {
                          return <Box key={index} component="span">{part}</Box>;
                        }
                        let color = colors.white;
                        if (part.includes('Nõmme')) color = colors.mediumBlue;
                        else if (part.includes('Professionaalne')) color = colors.lightBlue;
                        else if (part.includes('Autokoolitus')) color = colors.teal;
                        else if (part.includes('Tallinnas')) color = colors.darkTeal;
                        else if (part === '-') color = colors.mediumBlue;
                        else if (part.includes('Viktorija') || part.includes('Autokool')) color = colors.white;
                        
                        return (
                          <Box key={index} component="span" sx={{ color, fontSize: '30px', lineHeight: 1.2 }}>
                            {part}
                          </Box>
                        );
                      });
                    }
                    
                    // For English: "Viktorija Autokool Nõmme - Professional Driving School in Tallinn"
                    if (text.includes('Professional Driving School')) {
                      const parts = text.split(/(\s+|Nõmme|Professional|Driving|School|in|Tallinn|-)/);
                      return parts.filter(part => part).map((part, index) => {
                        if (!part.trim() && part !== '-') {
                          return <Box key={index} component="span">{part}</Box>;
                        }
                        let color = colors.white;
                        if (part.includes('Nõmme')) color = colors.mediumBlue;
                        else if (part.includes('Professional')) color = colors.lightBlue;
                        else if (part.includes('Driving') || part.includes('School') || part === 'in') color = colors.teal;
                        else if (part.includes('Tallinn')) color = colors.darkTeal;
                        else if (part === '-') color = colors.mediumBlue;
                        else if (part.includes('Viktorija') || part.includes('Autokool')) color = colors.white;
                        
                        return (
                          <Box key={index} component="span" sx={{ color, fontSize: '30px', lineHeight: 1.2 }}>
                            {part}
                          </Box>
                        );
                      });
                    }
                    
                    // For Russian: "Viktorija Autokool Nõmme - Профессиональная автошкола в Таллинне"
                    if (text.includes('Профессиональная')) {
                      const parts = text.split(/(\s+|Nõmme|Профессиональная|автошкола|в|Таллинне|-)/);
                      return parts.filter(part => part).map((part, index) => {
                        if (!part.trim() && part !== '-') {
                          return <Box key={index} component="span">{part}</Box>;
                        }
                        let color = colors.white;
                        if (part.includes('Nõmme')) color = colors.mediumBlue;
                        else if (part.includes('Профессиональная')) color = colors.lightBlue;
                        else if (part.includes('автошкола') || part === 'в') color = colors.teal;
                        else if (part.includes('Таллинн')) color = colors.darkTeal;
                        else if (part === '-') color = colors.mediumBlue;
                        else if (part.includes('Viktorija') || part.includes('Autokool')) color = colors.white;
                        
                        return (
                          <Box key={index} component="span" sx={{ color, fontSize: '30px', lineHeight: 1.2 }}>
                            {part}
                          </Box>
                        );
                      });
                    }
                    
                    // Fallback: show with white color
                    return <Box component="span" sx={{ color: colors.white }}>{text}</Box>;
                  };
                  
                  return renderGradientTitle(displayTitle);
                })()}
              </Typography>
              {displayDescription && (
                <Typography
                  variant="body1"
                  sx={{ 
                    fontSize: { xs: '1rem', sm: '1.125rem' },
                    lineHeight: 1.8,
                    color: 'rgba(255, 255, 255, 0.9)',
                    maxWidth: '580px',
                    mb: 4
                  }}
                >
                  {displayDescription}
                </Typography>
              )}

              

              {/* CTA Buttons */}
              <Box sx={{ 
                display: 'flex',
                gap: 2,
                flexWrap: 'wrap',
                justifyContent: { xs: 'center', md: 'flex-start' }
              }}>
                <Button
                  size="large"
                  endIcon={<ArrowForwardIcon />}
                  component="a"
                  href={buttonLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    const isPayment = buttonLink && buttonLink.includes('buy.stripe.com');
                    trackButtonClick(
                      'hero_primary_cta',
                      isPayment ? 'payment' : 'info',
                      'hero',
                      displayButtonText || t('hero.home.button', { defaultValue: 'Записаться на курс' }),
                      buttonLink
                    );
                  }}
                  sx={{
                    py: 2,
                    px: 4,
                    fontSize: { xs: '1rem', sm: '1.125rem' },
                    fontWeight: 600,
                    borderRadius: '12px',
                    background: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)',
                    color: 'white',
                    boxShadow: '0 10px 30px rgba(59, 130, 246, 0.3)',
                    textTransform: 'none',
                    transition: 'all 0.3s ease',
                    width: { xs: '100%', sm: 'auto' },
                    justifyContent: { xs: 'center', sm: 'flex-start' },
                    '&:hover': {
                      transform: 'translateY(-3px)',
                      boxShadow: '0 15px 40px rgba(59, 130, 246, 0.4)',
                      background: 'linear-gradient(135deg, #2563eb 0%, #0891b2 100%)',
                    },
                    '& .MuiButton-endIcon': {
                      transition: 'transform 0.3s ease',
                    },
                    '&:hover .MuiButton-endIcon': {
                      transform: 'translateX(4px)',
                    },
                  }}
                >
                  {displayButtonText || t('hero.home.button', { defaultValue: 'Записаться на курс' })}
                </Button>

                {/* <Button
                  variant="outlined"
                  size="large"
                  startIcon={<EmailIcon />}
                  href="mailto:viktorijaautokool@hot.ee?subject=Registratsioon%20autokooli"
                  onClick={() => trackButtonClick(
                    'hero_email',
                    'info',
                    'hero',
                    t('common.send_email'),
                    'mailto:viktorijaautokool@hot.ee?subject=Registratsioon%20autokooli'
                  )}
                  sx={{
                    py: 2,
                    px: 4,
                    fontSize: { xs: '1rem', sm: '1.125rem' },
                    fontWeight: 600,
                    borderRadius: '12px',
                    background: 'rgba(255, 255, 255, 0.1)',
                    color: 'white',
                    border: '2px solid rgba(255, 255, 255, 0.3)',
                    backdropFilter: 'blur(10px)',
                    textTransform: 'none',
                    transition: 'all 0.3s ease',
                    width: { xs: '100%', sm: 'auto' },
                    justifyContent: { xs: 'center', sm: 'flex-start' },
                    '&:hover': {
                      background: 'rgba(255, 255, 255, 0.2)',
                      transform: 'translateY(-3px)',
                      borderColor: 'rgba(255, 255, 255, 0.5)',
                    }
                  }}
                >
                  {t('common.send_email')}
                </Button> */}

                
              </Box>

              {/* Stats/Trust Indicators */}
              {/* <Box sx={{ 
                display: 'flex', 
                flexWrap: 'wrap', 
                gap: { xs: 2, sm: 4 },
                mb: 5,
                justifyContent: { xs: 'center', md: 'flex-start' }
              }}>
                {trustIndicators.map((indicator, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1.5,
                      px: 2.5,
                      py: 1.5,
                      background: 'rgba(255, 255, 255, 0.1)',
                      borderRadius: '12px',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        background: 'rgba(255, 255, 255, 0.15)',
                        transform: 'translateY(-2px)',
                      }
                    }}
                  >
                    <Box component="span" sx={{ fontSize: '1.5rem' }}>
                      {indicator.icon}
                    </Box>
                    <Typography
                      sx={{
                        color: 'rgba(255, 255, 255, 0.95)',
                        fontSize: { xs: '0.875rem', sm: '0.95rem' },
                        fontWeight: 500,
                      }}
                    >
                      {indicator.text}
                    </Typography>
                  </Box>
                ))}
              </Box> */}
            </Stack>
          </Grid>

          {/* Right Column - One block: image background + B card overlay (original design) */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Box
              sx={{
                position: 'relative',
                animation: `${fadeInRight} 1s ease-out`,
                borderRadius: '20px',
                overflow: 'hidden',
                boxShadow: '0 25px 60px rgba(0, 0, 0, 0.4)',
                minHeight: { xs: 380, sm: 420 },
                border: isLanding ? '2px solid rgba(52, 209, 134, 0.35)' : '2px solid rgba(59, 130, 246, 0.3)',
                background: '#0f2027',
              }}
            >
              {/* Background image - full block */}
              {showImage && (
                <>
                  <Box
                    sx={{
                      position: 'absolute',
                      inset: 0,
                      zIndex: 0,
                    }}
                  >
                    <img
                      src={imageUrl}
                      alt={imageAlt || displayTitle}
                      loading="eager"
                      fetchPriority="high"
                      style={{
                        display: 'block',
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: 'center',
                      }}
                    />
                  </Box>
                  {/* No overlay on image — road/photo stays visible; only the card at bottom has its own background */}
                </>
              )}

              {/* Category B card - only the card has background; no glass layer, image stays visible above */}
              <Box
                sx={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  bottom: 0,
                  zIndex: 2,
                  px: { xs: 2.5, sm: 3 },
                  pb: { xs: 2.5, sm: 3 },
                  pt: 2,
                  fontFamily: 'sans-serif',
                }}
              >
              <Box
                sx={{
                  padding: { xs: '16px 20px', sm: '20px 24px' },
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 0,
                  borderRadius: '12px',
                  border: '0.5px solid rgba(255,255,255,0.12)',
                  maxWidth: 420,
                  mx: 'auto',
                  background: '#1a2a3a',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
                }}
              >
                {/* Header */}
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    mb: 1.75,
                  }}
                >
                  <Box>
                    <Typography
                      component="p"
                      sx={{
                        color: '#90b8d8',
                        fontSize: 11,
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                        m: 0,
                      }}
                    >
                      {t('hero.category_b_label', { defaultValue: 'Sõiduauto' })}
                    </Typography>
                    <Typography
                      component="h2"
                      sx={{
                        color: '#fff',
                        fontSize: 20,
                        fontWeight: 500,
                        m: 0,
                      }}
                    >
                      {t('painpoints.categories.b.card_title', { defaultValue: 'Kategooria B juhiluba' })}
                    </Typography>
                  </Box>
                  <Chip
                    label={t('hero.category_b_badge', { defaultValue: 'B-kategooria' })}
                    size="small"
                    sx={{
                      background: 'rgba(30,144,255,0.15)',
                      border: '1px solid rgba(30,144,255,0.3)',
                      borderRadius: 1,
                      color: '#5eaff5',
                      fontSize: 12,
                      height: 28,
                    }}
                  />
                </Box>

                {/* Prices */}
                <Box
                  sx={{
                    background: 'rgba(255,255,255,0.04)',
                    borderRadius: 1,
                    py: 1.25,
                    px: 1.75,
                    border: '0.5px solid rgba(255,255,255,0.07)',
                    mb: 2,
                  }}
                >
                  {[
                    { label: t('painpoints.theory'), value: '160 €', highlight: false },
                    { label: t('painpoints.lesson'), value: '30 €', highlight: false },
                    { label: t('hero.category_b.manual_total_short', { defaultValue: 'Manuaal kokku' }), value: '840 €', highlight: false },
                    { label: t('hero.category_b.auto_total_short', { defaultValue: 'Automaat kokku' }), value: '840 €', highlight: true },
                  ].map((p, i, arr) => (
                    <Box
                      key={p.label}
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        py: 0.5,
                        borderBottom: i < arr.length - 1 ? '0.5px solid rgba(255,255,255,0.06)' : 'none',
                      }}
                    >
                      <Typography component="span" sx={{ color: '#7a9db8', fontSize: 12 }}>
                        {p.label}
                      </Typography>
                      <Typography
                        component="span"
                        sx={{
                          color: p.highlight ? '#1e90ff' : '#c8dff0',
                          fontSize: p.highlight ? 13 : 12,
                          fontWeight: 500,
                        }}
                      >
                        {p.value}
                      </Typography>
                    </Box>
                  ))}
                </Box>

                {/* CTA */}
                <Button
                  component="a"
                  href={buttonLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  fullWidth
                  onClick={() => {
                    const isPayment = buttonLink && buttonLink.includes('buy.stripe.com');
                    trackButtonClick(
                      'hero_category_b_cta',
                      isPayment ? 'payment' : 'info',
                      'hero',
                      t('painpoints.categories.b.button', { defaultValue: 'Juhiluba lihtsalt!' }),
                      buttonLink
                    );
                  }}
                  sx={{
                    background: 'linear-gradient(90deg, #1a6fc4, #1e90ff)',
                    color: '#fff',
                    borderRadius: 1,
                    py: 1.375,
                    px: 2.5,
                    fontSize: 14,
                    fontWeight: 500,
                    textTransform: 'none',
                    '&:hover': {
                      background: 'linear-gradient(90deg, #1557a0, #1a7ad4)',
                    },
                  }}
                >
                  {t('painpoints.categories.b.button', { defaultValue: 'Juhiluba lihtsalt!' })}
                </Button>
              </Box>
            </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
