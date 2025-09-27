import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import {
  AntiDesignTypography,
  FloatingIcon,
  GradientText,
} from '../styles/antiDesign';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import StarIcon from '@mui/icons-material/Star';
import SecurityIcon from '@mui/icons-material/Security';
import SupportIcon from '@mui/icons-material/Support';
import { useTranslation } from 'react-i18next';

const PainPointsContent = styled(Box)(({ theme }) => ({
  position: 'relative',
  padding: theme.spacing(8, 0),
  overflow: 'hidden',
}));

const ComparisonCard = styled(Box)(({ theme }) => ({
  position: 'relative',
  padding: theme.spacing(4),
  borderRadius: '16px',
  background: theme.palette.background.paper,
  backdropFilter: 'blur(10px)',
  boxShadow: theme.palette.mode === 'dark'
    ? '0 8px 32px rgba(0, 0, 0, 0.5)'
    : '0 8px 32px rgba(0, 0, 0, 0.1)',
  transition: 'all 0.3s ease',
  border: '1px solid',
  borderColor: theme.palette.mode === 'dark'
    ? 'rgba(255, 255, 255, 0.08)'
    : 'rgba(0, 0, 0, 0.1)',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: theme.palette.mode === 'dark'
      ? '0 0 12px 2px ' + theme.palette.primary.light + ', 0 8px 24px rgba(0,0,0,0.45)'
      : '0 0 12px 2px ' + theme.palette.primary.main + ', 0 8px 24px rgba(0,0,0,0.10)',
    background: theme.palette.mode === 'dark'
      ? theme.palette.background.paper
      : 'rgba(255, 255, 255, 0.9)',
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'url("/pattern.png")',
    opacity: theme.palette.mode === 'dark' ? 0.03 : 0.05,
    borderRadius: '16px',
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  position: 'relative',
  padding: '12px 24px',
  background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  color: theme.palette.primary.contrastText,
  borderRadius: '8px',
  fontWeight: 600,
  textTransform: 'none',
  boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 20px rgba(0,0,0,0.3)',
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'url("/pattern.png")',
    opacity: 0.1,
    borderRadius: '8px',
  },
}));

export interface PainPointItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  price: {
    theory?: number;
    lesson?: number;
    total?: number;
    manualTotalLabel?: string;
    autoTotalLabel?: string;
    autoTotal?: number;
    finalLabel?: string;
    finalPrice?: number;
  };
  buttonText: string;
  priceLabel?: string;
  afterPrice?: string;
  buttonLink?: string;
}

interface PainPointsProps {
  title?: string;
  subtitle?: string;
  items?: PainPointItem[];
}

export default function PainPoints({ 
  title = "Which Educator Are You Today?",
  subtitle = "Before vs After AI Integration",
  items = []
}: PainPointsProps) {
  const { t } = useTranslation();

  // Enhanced Social proof data with localization
  const socialProof = [
    { 
      text: t('social_proof.rating.value'), 
      icon: <StarIcon sx={{ color: 'warning.main', fontSize: { xs: '1.5rem', sm: '1.8rem' } }} />, 
      label: t('social_proof.rating.label'),
      sublabel: t('social_proof.rating.sublabel')
    },
    { 
      text: t('social_proof.experience.value'), 
      icon: <AccessTimeIcon sx={{ color: 'primary.main', fontSize: { xs: '1.5rem', sm: '1.8rem' } }} />, 
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
  
  const defaultItems: PainPointItem[] = [
    {
      id: 'category-a',
      title: t('painpoints.categories.a.title'),
      description: t('painpoints.categories.a.description'),
      imageUrl: 'https://placehold.co/320x180?text=Before',
      price: {
        theory: 120,
        lesson: 45,
        total: 570
      },
      buttonText: t('painpoints.categories.a.button'),
      priceLabel: t('painpoints.categories.a.price_label')
    },
    {
      id: 'category-b',
      title: t('painpoints.categories.b.title'),
      description: t('painpoints.categories.b.description'),
      imageUrl: 'https://placehold.co/320x180?text=After',
      price: {
        theory: 150,
        lesson: 50,
        total: 650,
        manualTotalLabel: t('painpoints.categories.b.manual_total'),
        autoTotalLabel: t('painpoints.categories.b.auto_total'),
        autoTotal: 780
      },
      buttonText: t('painpoints.categories.b.button'),
      priceLabel: t('painpoints.categories.b.price_label')
    },
    {
      id: 'category-c',
      title: t('painpoints.categories.c.title'),
      description: t('painpoints.categories.c.description'),
      imageUrl: 'https://placehold.co/320x180?text=After',
      price: {
        finalLabel: t('painpoints.categories.c.final_label'),
        finalPrice: 150
      },
      buttonText: t('painpoints.categories.c.button'),
      priceLabel: t('painpoints.categories.c.price_label'),
      afterPrice: t('painpoints.categories.c.after_price')
    }
  ];
  
  // Use provided items or fall back to default items
  const displayItems = items.length > 0 ? items : defaultItems;

  return (
    <PainPointsContent id="pricing">
      <Container maxWidth="xl">
      
        <Stack spacing={4} alignItems="center">
          <FloatingIcon color="red" sx={{ top: 30, left: 30 }}>
            <AccessTimeIcon sx={{ color: 'white', fontSize: 30 }} />
          </FloatingIcon>
          <FloatingIcon color="yellow" sx={{ top: 50, right: 30, animationDelay: '1s' }}>
            <CheckCircleIcon sx={{ color: 'white', fontSize: 30 }} />
          </FloatingIcon>
          <FloatingIcon color="green" sx={{ bottom: 30, left: '40%', animationDelay: '2s' }}>
            <TrendingUpIcon sx={{ color: 'white', fontSize: 30 }} />
          </FloatingIcon>

          {/* Enhanced Social Proof Banner */}
          <Card sx={{ 
            mb: { xs: 3, sm: 4 }, 
            background: 'linear-gradient(135deg, #f8f9ff 0%, #e3f2fd 100%)',
            border: '2px solid', 
            borderColor: 'primary.200',
            maxWidth: '900px',
            width: '100%',
            mx: { xs: 1, sm: 0 },
            boxShadow: '0 8px 32px rgba(25, 118, 210, 0.1)',
            borderRadius: 3,
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '3px',
              background: 'linear-gradient(90deg, #1976d2, #42a5f5, #1976d2)',
              backgroundSize: '200% 100%',
              animation: 'shimmer 3s ease-in-out infinite'
            },
            '@keyframes shimmer': {
              '0%': { backgroundPosition: '-200% 0' },
              '100%': { backgroundPosition: '200% 0' }
            }
          }}>
            <CardContent sx={{ py: { xs: 2, sm: 3 }, px: { xs: 2, sm: 4 } }}>
              <Grid container spacing={{ xs: 1, sm: 2 }} alignItems="stretch" justifyContent="space-around">
                {socialProof.map((item, index) => (
                  <Grid item xs={6} sm={3} key={index} sx={{ display: 'flex' }}>
                    <Box sx={{ 
                      display: 'flex', 
                      flexDirection: 'column', 
                      alignItems: 'center',
                      textAlign: 'center',
                      py: { xs: 1.5, sm: 2 },
                      px: { xs: 0.5, sm: 1 },
                      borderRadius: 2,
                      width: '100%',
                      minHeight: { xs: '140px', sm: '160px' },
                      justifyContent: 'space-between',
                      transition: 'all 0.3s ease-in-out',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        bgcolor: 'rgba(255, 255, 255, 0.8)',
                        boxShadow: '0 4px 20px rgba(25, 118, 210, 0.15)',
                        borderRadius: 2
                      }
                    }}>
                      <Box sx={{ 
                        mb: 1,
                        animation: `pulse 2s ease-in-out infinite ${index * 0.2}s`,
                        flexShrink: 0
                      }}>
                        {item.icon}
                      </Box>
                      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <Typography variant="h5" sx={{ 
                          fontWeight: 'bold', 
                          mb: 0.5,
                          fontSize: { xs: '1.3rem', sm: '1.6rem' },
                          color: 'primary.main',
                          textShadow: '0 1px 2px rgba(0,0,0,0.1)',
                          lineHeight: 1.2
                        }}>
                          {item.text}
                        </Typography>
                        <Typography variant="body2" sx={{
                          fontSize: { xs: '0.8rem', sm: '0.9rem' },
                          fontWeight: 600,
                          color: 'text.primary',
                          mb: 0.5,
                          lineHeight: 1.3
                        }}>
                          {item.label}
                        </Typography>
                        {item.sublabel && (
                          <Typography variant="caption" color="text.secondary" sx={{
                            fontSize: { xs: '0.7rem', sm: '0.75rem' },
                            fontStyle: 'italic',
                            lineHeight: 1.2
                          }}>
                            {item.sublabel}
                          </Typography>
                        )}
                      </Box>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>

          <Box sx={{ 
            textAlign: 'center', 
            mb: { xs: 4, sm: 6 }, 
            position: 'relative', 
            zIndex: 1,
            px: { xs: 2, sm: 0 }
          }}>
            <GradientText variant="h2" gutterBottom sx={{
              fontSize: { xs: '1.8rem', sm: '2.5rem', md: '3rem' },
              lineHeight: { xs: 1.2, sm: 1.3 }
            }}>
              {title}
            </GradientText>
            <AntiDesignTypography variant="h4" sx={{ 
              mb: { xs: 3, sm: 4 },
              fontSize: { xs: '1.2rem', sm: '1.5rem', md: '1.75rem' },
              lineHeight: { xs: 1.3, sm: 1.4 }
            }}>
              {subtitle}
            </AntiDesignTypography>
            
            {/* Trust Indicators */}
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'center', 
              flexWrap: 'wrap', 
              gap: { xs: 1, sm: 2 },
              mt: 3,
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
          </Box>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                sm: 'repeat(2, 1fr)',
                md: 'repeat(3, 1fr)'
              },
              gap: { xs: 2, sm: 3 },
              width: '100%',
              justifyItems: 'center',
              alignItems: 'start',
              maxWidth: '1200px',
              mx: 'auto',
              px: { xs: 2, sm: 0 }
            }}
          >
            {displayItems.length === 0 ? (
              <Typography variant="body1" sx={{ textAlign: 'center', width: '100%' }}>
                {t('painpoints.no_categories')}
              </Typography>
            ) : (
              displayItems.map((item) => (
                <ComparisonCard 
                  key={item.id}
                  sx={{ 
                    width: '100%',
                    maxWidth: '400px',
                    minHeight: { xs: '450px', sm: '500px' },
                    p: { xs: 2, sm: 2.5, md: 3 }, 
                    display: 'flex', 
                    flexDirection: 'column', 
                    justifyContent: 'space-between',
                    mx: { xs: 1, sm: 0 }
                  }}
                >
                  <Box
                    component="img"
                    src={item.imageUrl}
                    alt={item.title}
                    sx={{ 
                      width: '100%', 
                      maxWidth: 320, 
                      height: 'auto', 
                      display: 'block', 
                      mx: 'auto', 
                      mb: 2, 
                      borderRadius: 2 
                    }}
                  />
                  <Typography variant="h5" sx={{ 
                    mb: 2, 
                    fontSize: { xs: '1.1rem', sm: '1.2rem', md: '1.3rem' }, 
                    color: 'text.primary',
                    lineHeight: { xs: 1.3, sm: 1.4 }
                  }}>
                    {item.title}
                  </Typography>
                  <Typography variant="body1" sx={{ 
                    mb: 2, 
                    color: 'text.secondary',
                    fontSize: { xs: '0.9rem', sm: '1rem' },
                    lineHeight: { xs: 1.4, sm: 1.5 }
                  }}>
                    {item.description}
                  </Typography>
                  <Box sx={{ fontWeight: 600, mb: 2 }}>
                    {item.price.finalLabel && item.price.finalPrice !== undefined ? (
                      <Box component="div">
                        <Box component="span" sx={{ fontWeight: 400 }}>{item.price.finalLabel}</Box> {item.price.finalPrice} {t('painpoints.euro')}<br/>
                      </Box>
                    ) : (
                      <Box component="div">
                        {item.price.theory !== undefined && <Box component="div"><Box component="span" sx={{ fontWeight: 400 }}>{t('painpoints.theory')}: </Box> {item.price.theory} {t('painpoints.euro')}</Box>}
                        {item.price.lesson !== undefined && <Box component="div"><Box component="span" sx={{ fontWeight: 400 }}>{t('painpoints.lesson')}: </Box> {item.price.lesson} {t('painpoints.euro')}</Box>}
                        {item.price.manualTotalLabel ? (
                          <Box component="div"><Box component="span" sx={{ fontWeight: 400 }}>{item.price.manualTotalLabel}</Box> {item.price.total} {t('painpoints.euro')}</Box>
                        ) : (
                          item.price.total !== undefined && <Box component="div"><Box component="span" sx={{ fontWeight: 400 }}>{t('painpoints.total')}:</Box> {item.price.total} {t('painpoints.euro')}</Box>
                        )}
                        {item.price.autoTotalLabel && item.price.autoTotal !== undefined && (
                          <Box component="div"><Box component="span" sx={{ fontWeight: 400 }}>{item.price.autoTotalLabel}</Box> {item.price.autoTotal} {t('painpoints.euro')}</Box>
                        )}
                      </Box>
                    )}
                    {item.afterPrice && (
                      <Box component="div" sx={{ fontStyle: 'italic', mt: 1, fontSize: '0.875rem' }}>{item.afterPrice}</Box>
                    )}
                  </Box>
                  {item.buttonLink && item.buttonLink.startsWith('http') ? (
                    <a 
                      href={item.buttonLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ textDecoration: 'none', width: '100%' }}
                    >
                      <StyledButton 
                        variant="contained" 
                        size="large" 
                        sx={{ 
                          mt: 'auto', 
                          fontSize: { xs: '1rem', sm: '1.1rem' }, 
                          py: { xs: 1.5, sm: 1.5 }, 
                          px: { xs: 2, sm: 3 }, 
                          width: '100%',
                          minHeight: { xs: 48, sm: 56 },
                          fontWeight: 600,
                          background: 'linear-gradient(45deg, #4caf50 30%, #66bb6a 90%)',
                          '&:hover': {
                            background: 'linear-gradient(45deg, #388e3c 30%, #4caf50 90%)',
                            transform: 'translateY(-2px)',
                            boxShadow: '0 4px 20px rgba(76, 175, 80, 0.3)',
                            transition: 'all 0.3s ease-in-out'
                          },
                          '&:active': {
                            transform: 'translateY(0px)',
                            transition: 'all 0.1s ease-in-out'
                          }
                        }}
                      >
                        💳 {item.buttonText}
                      </StyledButton>
                    </a>
                  ) : (
                    <Link 
                      to={item.buttonLink ? `${item.buttonLink}?category=${item.id}` : '#'}
                      style={{ textDecoration: 'none', width: '100%' }}
                    >
                      <StyledButton 
                        variant="contained" 
                        size="large" 
                        sx={{ 
                          mt: 'auto', 
                          fontSize: { xs: '1rem', sm: '1.1rem' }, 
                          py: { xs: 1.5, sm: 1.5 }, 
                          px: { xs: 2, sm: 3 }, 
                          width: '100%',
                          minHeight: { xs: 48, sm: 56 },
                          fontWeight: 600,
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
                        {item.buttonText}
                      </StyledButton>
                    </Link>
                  )}
                </ComparisonCard>
              ))
            )}
          </Box>
        </Stack>
      </Container>
    </PainPointsContent>
  );
} 