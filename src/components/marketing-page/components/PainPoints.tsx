import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
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
          <Box sx={{ textAlign: 'center', mb: 6, position: 'relative', zIndex: 1 }}>
            <GradientText variant="h2" gutterBottom>
              {title}
            </GradientText>
            <AntiDesignTypography variant="h4" sx={{ mb: 4 }}>
              {subtitle}
            </AntiDesignTypography>
          </Box>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                sm: 'repeat(2, 1fr)',
                md: 'repeat(3, 1fr)'
              },
              gap: 3,
              width: '100%',
              justifyItems: 'center',
              alignItems: 'start',
              maxWidth: '1200px',
              mx: 'auto'
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
                    minHeight: '500px',
                    p: { xs: 2, md: 3 }, 
                    display: 'flex', 
                    flexDirection: 'column', 
                    justifyContent: 'space-between' 
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
                  <Typography variant="h5" sx={{ mb: 2, fontSize: { xs: '1.2rem', md: '1.3rem' }, color: 'text.primary' }}>
                    {item.title}
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 2, color: 'text.secondary' }}>
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
                  <Link 
                    to={item.buttonLink ? `${item.buttonLink}?category=${item.id}` : '#'}
                    style={{ textDecoration: 'none', width: '100%' }}
                  >
                    <StyledButton 
                      variant="contained" 
                      size="large" 
                      sx={{ mt: 'auto', fontSize: '1.1rem', py: 1.5, px: 3, width: '100%' }}
                    >
                      {item.buttonText}
                    </StyledButton>
                  </Link>
                </ComparisonCard>
              ))
            )}
          </Box>
        </Stack>
      </Container>
    </PainPointsContent>
  );
} 