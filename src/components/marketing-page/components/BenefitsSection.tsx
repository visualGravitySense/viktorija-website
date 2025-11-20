import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useTranslation } from 'react-i18next';
import { styled } from '@mui/material/styles';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import SavingsIcon from '@mui/icons-material/Savings';
import PublicIcon from '@mui/icons-material/Public';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import WorkIcon from '@mui/icons-material/Work';

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  transition: 'all 0.3s ease',
  border: '1px solid',
  borderColor: theme.palette.divider,
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: theme.shadows[8],
    borderColor: theme.palette.primary.main,
  },
}));

interface Benefit {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export default function BenefitsSection() {
  const { t } = useTranslation();

  const benefits: Benefit[] = [
    {
      icon: <DirectionsCarIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: t('benefits.freedom.title', { defaultValue: 'Свобода передвижения' }),
      description: t('benefits.freedom.description', { defaultValue: 'Передвигайтесь в любое время, куда угодно, без зависимости от общественного транспорта' }),
    },
    {
      icon: <SavingsIcon sx={{ fontSize: 40, color: 'success.main' }} />,
      title: t('benefits.savings.title', { defaultValue: 'Экономия денег' }),
      description: t('benefits.savings.description', { defaultValue: 'Экономьте на такси и общественном транспорте. Окупаемость уже в первый год' }),
    },
    {
      icon: <PublicIcon sx={{ fontSize: 40, color: 'info.main' }} />,
      title: t('benefits.travel.title', { defaultValue: 'Путешествия' }),
      description: t('benefits.travel.description', { defaultValue: 'Путешествуйте по Эстонии и Европе на собственном автомобиле' }),
    },
    {
      icon: <EmojiEventsIcon sx={{ fontSize: 40, color: 'warning.main' }} />,
      title: t('benefits.confidence.title', { defaultValue: 'Уверенность' }),
      description: t('benefits.confidence.description', { defaultValue: 'Станьте уверенным водителем с 95% успешной сдачей экзамена с первого раза' }),
    },
    {
      icon: <WorkIcon sx={{ fontSize: 40, color: 'secondary.main' }} />,
      title: t('benefits.career.title', { defaultValue: 'Карьера' }),
      description: t('benefits.career.description', { defaultValue: 'Откройте новые возможности для карьеры, требующие водительские права' }),
    },
    {
      icon: <CheckCircleIcon sx={{ fontSize: 40, color: 'success.main' }} />,
      title: t('benefits.independence.title', { defaultValue: 'Независимость' }),
      description: t('benefits.independence.description', { defaultValue: 'Обретите полную независимость и свободу в передвижении' }),
    },
  ];

  return (
    <Box
      sx={{
        py: { xs: 8, sm: 10 },
        bgcolor: 'background.default',
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h2"
          component="h2"
          textAlign="center"
          sx={{
            mb: 2,
            fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
            fontWeight: 700,
          }}
        >
          {t('benefits.title', { defaultValue: 'Что вы получите' })}
        </Typography>
        <Typography
          variant="h6"
          textAlign="center"
          color="text.secondary"
          sx={{ mb: 6, maxWidth: '700px', mx: 'auto' }}
        >
          {t('benefits.subtitle', { defaultValue: 'Преимущества обучения в нашей автошколе' })}
        </Typography>

        <Grid container spacing={3}>
          {benefits.map((benefit, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
              <StyledCard>
                <CardContent sx={{ p: 3, textAlign: 'center' }}>
                  <Box sx={{ mb: 2, display: 'flex', justifyContent: 'center' }}>
                    {benefit.icon}
                  </Box>
                  <Typography variant="h6" component="h3" gutterBottom sx={{ fontWeight: 600 }}>
                    {benefit.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {benefit.description}
                  </Typography>
                </CardContent>
              </StyledCard>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

