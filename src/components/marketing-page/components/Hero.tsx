import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
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
  buttonLink = '/checkout?category=category-b',
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
  
  return (
    <Box
      id="hero"
      sx={(theme) => ({
        width: '100%',
        backgroundImage:
          theme.palette.mode === 'light'
            ? 'linear-gradient(180deg, #CEE5FD, #FFF)'
            : `linear-gradient(#02294F, ${alpha('#090E10', 0.95)})`,
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
        <Stack spacing={2} useFlexGap sx={{ width: { xs: '100%', sm: '70%' } }}>
          <Typography
            component="h1"
            variant="h1"
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignSelf: 'center',
              textAlign: 'center',
              fontSize: { xs: '2.5rem', sm: '3rem', md: '3.5rem', lg: '4rem' },
              fontWeight: 'bold',
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
              width: { sm: '100%', md: '85%' },
              fontSize: { xs: '1.1rem', sm: '1.25rem' },
              fontWeight: 500,
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
              width: { sm: '100%', md: '85%' },
              fontSize: { xs: '1rem', sm: '1.1rem' },
            }}
          >
            {displayDescription}
          </Typography>
          <Stack 
            direction={{ xs: 'column', sm: 'row' }} 
            alignSelf="center" 
            spacing={1} 
            useFlexGap 
            sx={{ pt: 2, width: { xs: '100%', sm: 'auto' } }}
          >
            <Button
              variant="contained"
              color="primary"
              size="large"
              component={Link}
              to={buttonLink}
              sx={{
                fontSize: '1.1rem',
                fontWeight: 600,
                px: 4,
                py: 1.5,
                borderRadius: 2,
              }}
            >
              {displayButtonText}
            </Button>
          </Stack>
        </Stack>
        <Box
          id="image"
          sx={{
            mt: { xs: 8, sm: 10 },
            alignSelf: 'center',
            width: '100%',
            borderRadius: '10px',
            outline: '1px solid',
            outlineColor: (theme) =>
              theme.palette.mode === 'light' ? 'primary.200' : 'primary.700',
            boxShadow: (theme) =>
              theme.palette.mode === 'light'
                ? `0 0 12px 8px ${alpha(theme.palette.primary.main, 0.2)}`
                : `0 0 24px 12px ${alpha(theme.palette.primary.main, 0.2)}`,
          }}
        >
          <img
            src={imageUrl}
            alt={imageAlt || displayTitle}
            loading="lazy"
            width="100%"
            height="auto"
            style={{
              borderRadius: '10px',
              display: 'block',
              width: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
            }}
          />
        </Box>
      </Container>
    </Box>
  );
}
