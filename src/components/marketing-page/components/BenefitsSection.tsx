import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useTranslation } from 'react-i18next';
import { styled } from '@mui/material/styles';
import { getLocalizedH2 } from '../../shared/SEO.tsx';
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
  const { t, i18n } = useTranslation();

  const benefits: Benefit[] = [
    {
      icon: <DirectionsCarIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: t('benefits.freedom.title', { defaultValue: 'kõrgeim näitaja Tallinnas' }),
      description: t('benefits.freedom.description', { defaultValue: '98% õpilastest sooritab eksami esimesel korral' }),
    },
    {
      icon: <SavingsIcon sx={{ fontSize: 40, color: 'success.main' }} />,
      title: t('benefits.savings.title', { defaultValue: 'autokool garantiiga' }),
      description: t('benefits.savings.description', { defaultValue: 'Juhiluba 4-5 nädalaga kui on kiire' }),
    },
    {
      icon: <PublicIcon sx={{ fontSize: 40, color: 'info.main' }} />,
      title: t('benefits.travel.title', { defaultValue: 'professionaalsed ja kannatlikud' }),
      description: t('benefits.travel.description', { defaultValue: 'Kogenud õpetajad üle 15 aasta kogemusega' }),
    },
    {
      icon: <EmojiEventsIcon sx={{ fontSize: 40, color: 'warning.main' }} />,
      title: t('benefits.confidence.title', { defaultValue: 'individuaalne lähenemine' }),
      description: t('benefits.confidence.description', { defaultValue: 'Iga õpilane saab 100% tähelepanu' }),
    },
    {
      icon: <WorkIcon sx={{ fontSize: 40, color: 'secondary.main' }} />,
      title: t('benefits.career.title', { defaultValue: 'kaasaegsed õppeautod' }),
      description: t('benefits.career.description', { defaultValue: 'Manuaal- ja automaatkäigukastiga' }),
    },
    {
      icon: <CheckCircleIcon sx={{ fontSize: 40, color: 'success.main' }} />,
      title: t('benefits.independence.title', { defaultValue: 'paindlik ajakava' }),
      description: t('benefits.independence.description', { defaultValue: 'õpid siis, kui sulle sobib' }),
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
          {getLocalizedH2('why_choose', i18n.language || 'et')}
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
                  <Typography variant="h6" component="h2" gutterBottom sx={{ fontWeight: 600 }}>
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

