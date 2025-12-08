import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { useTranslation } from 'react-i18next';

const LANDING_GREEN = '#34D186';

interface Stat {
  value: string;
  label: string;
}

export default function LandingStats() {
  const { t } = useTranslation();

  const stats: Stat[] = [
    {
      value: t('landing.stats.training_time.value', { defaultValue: '2 nädalat' }),
      label: t('landing.stats.training_time.label', { 
        defaultValue: 'Koolitus ja dokumentide vormistamine' 
      }),
    },
    {
      value: t('landing.stats.success_rate.value', { defaultValue: '100%' }),
      label: t('landing.stats.success_rate.label', { 
        defaultValue: 'Aitame kõiki eksamitele ettevalmistada' 
      }),
    },
    {
      value: t('landing.stats.graduates.value', { defaultValue: '500+' }),
      label: t('landing.stats.graduates.label', { 
        defaultValue: 'Lõpetajat töötab juba Boltis' 
      }),
    },
  ];

  return (
    <Box
      sx={{
        py: { xs: 6, sm: 8 },
        bgcolor: '#1a1a1a',
        color: '#FFFFFF',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="center">
          {stats.map((stat, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
              <Box
                sx={{
                  textAlign: 'center',
                }}
              >
                <Typography
                  variant="h2"
                  component="h3"
                  sx={{
                    fontSize: { xs: '2.5rem', sm: '3rem', md: '3.5rem' },
                    fontWeight: 700,
                    color: LANDING_GREEN,
                    mb: 1.5,
                    lineHeight: 1.2,
                  }}
                >
                  {stat.value}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: { xs: '1rem', sm: '1.1rem' },
                    color: '#FFFFFF',
                    opacity: 0.9,
                    lineHeight: 1.5,
                  }}
                >
                  {stat.label}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
