import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
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

  // Social proof data
  const socialProof = [
    { text: "4.9/5", icon: <StarIcon sx={{ color: 'warning.main' }} />, label: "Hindamine" },
    { text: "1998", icon: <LocalShippingIcon sx={{ color: 'primary.main' }} />, label: "Aastast" },
    { text: "1000+", icon: <SupportIcon sx={{ color: 'success.main' }} />, label: "Õpilast" },
    { text: "95%", icon: <TrendingUpIcon sx={{ color: 'info.main' }} />, label: "Edu" }
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
        {/* Social Proof Banner */}
        <Card sx={{ 
          mb: { xs: 3, sm: 4 }, 
          bgcolor: 'primary.50', 
          border: '2px solid', 
          borderColor: 'primary.200',
          maxWidth: '800px',
          width: '100%',
          mx: { xs: 1, sm: 0 }
        }}>
          <CardContent sx={{ py: { xs: 1.5, sm: 2 }, px: { xs: 2, sm: 3 } }}>
            <Grid container spacing={{ xs: 1, sm: 2 }} alignItems="center">
              {socialProof.map((item, index) => (
                <Grid item xs={6} sm={3} key={index}>
                  <Box sx={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center',
                    textAlign: 'center',
                    py: { xs: 1, sm: 0 }
                  }}>
                    <Box sx={{ fontSize: { xs: '1.2rem', sm: '1.5rem' } }}>
                      {item.icon}
                    </Box>
                    <Typography variant="h6" sx={{ 
                      fontWeight: 'bold', 
                      mt: 0.5,
                      fontSize: { xs: '1rem', sm: '1.25rem' }
                    }}>
                      {item.text}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{
                      fontSize: { xs: '0.7rem', sm: '0.75rem' }
                    }}>
                      {item.label}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>

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

          <Stack 
            direction={{ xs: 'column', sm: 'row' }} 
            alignSelf="center" 
            spacing={{ xs: 2, sm: 2 }} 
            useFlexGap 
            sx={{ 
              pt: 2, 
              width: { xs: '100%', sm: 'auto' },
              px: { xs: 2, sm: 0 }
            }}
          >
            <Button
              variant="contained"
              color="primary"
              size="large"
              component={Link}
              to={buttonLink}
              sx={{
                fontSize: { xs: '1rem', sm: '1.1rem' },
                fontWeight: 600,
                px: { xs: 3, sm: 4 },
                py: { xs: 1.5, sm: 1.5 },
                minHeight: { xs: 48, sm: 56 },
                borderRadius: 2,
                background: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
                '&:hover': {
                  background: 'linear-gradient(45deg, #1565c0 30%, #1976d2 90%)',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 4px 20px rgba(25, 118, 210, 0.3)',
                  transition: 'all 0.3s ease-in-out'
                },
                '&:active': {
                  transform: 'translateY(0px)',
                  transition: 'all 0.1s ease-in-out'
                }
              }}
            >
              {displayButtonText}
            </Button>
            <Button
              variant="outlined"
              color="primary"
              size="large"
              component={Link}
              to="/about"
              sx={{
                fontSize: { xs: '1rem', sm: '1.1rem' },
                fontWeight: 600,
                px: { xs: 3, sm: 4 },
                py: { xs: 1.5, sm: 1.5 },
                minHeight: { xs: 48, sm: 56 },
                borderRadius: 2,
                '&:hover': {
                  transform: 'translateY(-2px)',
                  transition: 'all 0.3s ease-in-out'
                },
                '&:active': {
                  transform: 'translateY(0px)',
                  transition: 'all 0.1s ease-in-out'
                }
              }}
            >
              Loe rohkem
            </Button>
          </Stack>
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
