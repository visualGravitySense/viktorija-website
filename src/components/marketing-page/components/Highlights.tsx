import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AutoFixHighRoundedIcon from '@mui/icons-material/AutoFixHighRounded';
import ConstructionRoundedIcon from '@mui/icons-material/ConstructionRounded';
import QueryStatsRoundedIcon from '@mui/icons-material/QueryStatsRounded';
import SettingsSuggestRoundedIcon from '@mui/icons-material/SettingsSuggestRounded';
import SupportAgentRoundedIcon from '@mui/icons-material/SupportAgentRounded';
import ThumbUpAltRoundedIcon from '@mui/icons-material/ThumbUpAltRounded';
import EmailIcon from '@mui/icons-material/Email';
import { useTranslation } from 'react-i18next';
import { getLocalizedH2 } from '../../shared/SEO.tsx';

export default function Highlights() {
  const { t, i18n } = useTranslation();
  
  const items = [
    {
      icon: <SettingsSuggestRoundedIcon />,
      title: t('highlights.highlight1'),
      description: t('highlights.highlight1_desc')
    },
    {
      icon: <ConstructionRoundedIcon />,
      title: t('highlights.highlight2'),
      description: t('highlights.highlight2_desc')
    },
    {
      icon: <ThumbUpAltRoundedIcon />,
      title: t('highlights.highlight3'),
      description: t('highlights.highlight3_desc')
    },
    {
      icon: <AutoFixHighRoundedIcon />,
      title: t('highlights.highlight4'),
      description: t('highlights.highlight4_desc')
    },
    {
      icon: <SupportAgentRoundedIcon />,
      title: t('highlights.highlight5'),
      description: t('highlights.highlight5_desc')
    },
    {
      icon: <QueryStatsRoundedIcon />,
      title: t('highlights.highlight6'),
      description: t('highlights.highlight6_desc')
    }
  ];

  return (
    <Box
      id="highlights"
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
        color: 'white',
        bgcolor: 'grey.900',
      }}
    >
      <Container
        sx={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: { xs: 3, sm: 6 },
        }}
      >
        <Box
          sx={{
            width: { sm: '100%', md: '60%' },
            textAlign: { sm: 'left', md: 'center' },
          }}
        >
          <Typography component="h2" variant="h4" gutterBottom>
            {getLocalizedH2('success_rate', i18n.language || 'et')}
          </Typography>
          <Typography variant="body1" sx={{ color: 'grey.400' }}>
            {t('highlights.subtitle')}
          </Typography>
        </Box>
        <Grid container spacing={2}>
          {items.map((item, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
              <Stack
                direction="column"
                component={Card}
                spacing={1}
                useFlexGap
                sx={{
                  color: 'inherit',
                  p: 3,
                  height: '100%',
                  borderColor: 'hsla(220, 25%, 25%, 0.3)',
                  backgroundColor: 'grey.800',
                }}
              >
                <Box sx={{ opacity: '50%' }}>{item.icon}</Box>
                <div>
                  <Typography gutterBottom sx={{ fontWeight: 'medium' }}>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'grey.400' }}>
                    {item.description}
                  </Typography>
                </div>
              </Stack>
            </Grid>
          ))}
        </Grid>
        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Button
            variant="outlined"
            size="large"
            startIcon={<EmailIcon />}
            href="mailto:viktorijaautokool@hot.ee?subject=Registratsioon%20autokooli"
            sx={{
              px: 4,
              py: 1.5,
              borderWidth: 2,
              color: 'white',
              borderColor: 'white',
              '&:hover': {
                borderWidth: 2,
                borderColor: 'white',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              }
            }}
          >
            {t('common.send_email')}
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
