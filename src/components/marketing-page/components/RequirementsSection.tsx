import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useTranslation } from 'react-i18next';
import { styled } from '@mui/material/styles';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import DescriptionIcon from '@mui/icons-material/Description';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import Button from '@mui/material/Button';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  transition: 'all 0.3s ease',
  border: '1px solid',
  borderColor: theme.palette.divider,
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[6],
    borderColor: theme.palette.primary.main,
  },
}));

export default function RequirementsSection() {
  const { t } = useTranslation();

  const requirements = [
    {
      icon: <DescriptionIcon sx={{ color: 'primary.main' }} />,
      text: t('requirements.passport', { defaultValue: 'Паспорт или ID-карта' }),
    },
    {
      icon: <LocalHospitalIcon sx={{ color: 'error.main' }} />,
      text: t('requirements.medical', { defaultValue: 'Медицинская справка для категории A или B' }),
    },
    {
      icon: <CreditCardIcon sx={{ color: 'success.main' }} />,
      text: t('requirements.payment', { defaultValue: 'Оплата (можно в рассрочку)' }),
    },
  ];

  return (
    <Box
      sx={{
        py: { xs: 8, sm: 10 },
        bgcolor: 'background.paper',
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
          {t('requirements.title', { defaultValue: 'Что нужно для записи' })}
        </Typography>
        <Typography
          variant="h6"
          textAlign="center"
          color="text.secondary"
          sx={{ mb: 6, maxWidth: '700px', mx: 'auto' }}
        >
          {t('requirements.subtitle', { defaultValue: 'Простой процесс записи - всего 3 шага' })}
        </Typography>

        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 6 }}>
            <StyledCard>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
                  {t('requirements.docs_title', { defaultValue: 'Документы' })}
                </Typography>
                <List>
                  {requirements.map((req, index) => (
                    <ListItem key={index} sx={{ px: 0 }}>
                      <ListItemIcon sx={{ minWidth: 40 }}>
                        {req.icon}
                      </ListItemIcon>
                      <ListItemText 
                        primary={req.text}
                        primaryTypographyProps={{ variant: 'body1' }}
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </StyledCard>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <StyledCard>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
                  {t('requirements.process_title', { defaultValue: 'Процесс записи' })}
                </Typography>
                <List>
                  <ListItem sx={{ px: 0, mb: 2 }}>
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      <CheckCircleIcon sx={{ color: 'primary.main' }} />
                    </ListItemIcon>
                    <ListItemText 
                      primary={t('requirements.step1', { defaultValue: 'Выберите категорию' })}
                      secondary={t('requirements.step1_desc', { defaultValue: 'A, B или C' })}
                    />
                  </ListItem>
                  <ListItem sx={{ px: 0, mb: 2 }}>
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      <CheckCircleIcon sx={{ color: 'primary.main' }} />
                    </ListItemIcon>
                    <ListItemText 
                      primary={t('requirements.step2', { defaultValue: 'Заполните форму или позвоните' })}
                      secondary={t('requirements.step2_desc', { defaultValue: 'Займет всего 2 минуты' })}
                    />
                  </ListItem>
                  <ListItem sx={{ px: 0 }}>
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      <CheckCircleIcon sx={{ color: 'primary.main' }} />
                    </ListItemIcon>
                    <ListItemText 
                      primary={t('requirements.step3', { defaultValue: 'Оплатите и начните обучение' })}
                      secondary={t('requirements.step3_desc', { defaultValue: 'Безопасная оплата через Stripe' })}
                    />
                  </ListItem>
                </List>

                <Box sx={{ mt: 4, display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Button
                    variant="contained"
                    size="large"
                    endIcon={<ArrowForwardIcon />}
                    href="https://buy.stripe.com/14A28s0Fs4lycgtg1i3ZK00"
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{ width: '100%' }}
                  >
                    {t('requirements.register_button', { defaultValue: 'Записаться сейчас' })}
                  </Button>
                  <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
                    <Button
                      variant="outlined"
                      startIcon={<PhoneIcon />}
                      href="tel:+37253464508"
                      sx={{ flex: { xs: '1 1 100%', sm: '0 1 auto' } }}
                    >
                      {t('common.call', { defaultValue: 'Позвонить' })}
                    </Button>
                    <Button
                      variant="outlined"
                      startIcon={<EmailIcon />}
                      href="mailto:viktorijaautokool@hot.ee?subject=Registratsioon%20autokooli"
                      sx={{ flex: { xs: '1 1 100%', sm: '0 1 auto' } }}
                    >
                      {t('common.send_email')}
                    </Button>
                  </Box>
                </Box>
              </CardContent>
            </StyledCard>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

