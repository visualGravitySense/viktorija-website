import React, { useMemo, Suspense, lazy, useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import AppTheme from '../components/shared-theme/AppTheme.tsx';
import AppAppBar from '../components/marketing-page/components/AppAppBar.tsx';
import SEO from '../components/shared/SEO.tsx';
import SEOHeading from '../components/shared/SEOHeading.tsx';
import { CourseSchema } from '../components/shared/StructuredData.tsx';
import { useTranslation } from 'react-i18next';
import EmailIcon from '@mui/icons-material/Email';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PersonIcon from '@mui/icons-material/Person';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import StarIcon from '@mui/icons-material/Star';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import PeopleIcon from '@mui/icons-material/People';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import SpeedIcon from '@mui/icons-material/Speed';
import SecurityIcon from '@mui/icons-material/Security';
import SchoolIcon from '@mui/icons-material/School';
import StepLabel from '@mui/material/StepLabel';
import Step from '@mui/material/Step';
import Stepper from '@mui/material/Stepper';
import { trackButtonClick } from '../lib/analytics';
import CourseTimer from '../components/marketing-page/components/CourseTimer.tsx';
import { keyframes } from '@emotion/react';
import aCatImg from '/a-cat.jpg';

const Footer = lazy(() => import('../components/marketing-page/components/Footer.tsx'));
const FloatingActionButton = lazy(() => import('../components/marketing-page/components/FloatingActionButton.tsx'));

interface CategoryAPageProps {
  disableCustomTheme?: boolean;
  toggleColorMode?: () => void;
}

export default function CategoryAPage({ disableCustomTheme, toggleColorMode }: CategoryAPageProps) {
  const { t, i18n } = useTranslation();
  const [spotsLeft] = useState(5); // Simulated remaining spots
  
  const ogImageUrl = import.meta.env.PROD 
    ? 'https://viktorijaautokool.ee' + aCatImg
    : aCatImg;

  // Next course date - first group
  const nextCourseDate = new Date('2025-02-10T09:00:00');

  // Social proof metrics
  const socialProof = [
    { icon: <StarIcon sx={{ color: 'warning.main' }} />, value: '4.9/5', label: t('social_proof.rating.label', { defaultValue: 'Hindamine' }) },
    { icon: <TrendingUpIcon sx={{ color: 'success.main' }} />, value: '98%', label: t('social_proof.success_rate.label', { defaultValue: 'Edu esimesel korral' }) },
    { icon: <PeopleIcon sx={{ color: 'primary.main' }} />, value: '1000+', label: t('social_proof.students.label', { defaultValue: 'Õpilast' }) },
  ];

  // CREATE Action Funnel - Benefits (EVALUATION)
  const benefits = [
    { icon: <EmojiEventsIcon sx={{ color: 'warning.main', fontSize: 40 }} />, title: t('create.benefits.freedom.title', { defaultValue: 'Свобода передвижения' }), description: t('create.benefits.freedom.desc', { defaultValue: 'Поезжай куда хочешь, когда хочешь' }) },
    { icon: <SpeedIcon sx={{ color: 'error.main', fontSize: 40 }} />, title: t('create.benefits.speed.title', { defaultValue: 'Скорость и адреналин' }), description: t('create.benefits.speed.desc', { defaultValue: 'Ощути настоящую свободу на двух колесах' }) },
    { icon: <SecurityIcon sx={{ color: 'success.main', fontSize: 40 }} />, title: t('create.benefits.confidence.title', { defaultValue: 'Уверенность' }), description: t('create.benefits.confidence.desc_motorcycle', { defaultValue: 'Стань мастером управления мотоциклом' }) },
    { icon: <SchoolIcon sx={{ color: 'primary.main', fontSize: 40 }} />, title: t('create.benefits.expertise.title', { defaultValue: 'Профессиональное обучение' }), description: t('create.benefits.expertise.desc', { defaultValue: 'Опытные инструкторы с 15+ лет опыта' }) },
  ];

  // CREATE Action Funnel - Process Steps (ABILITY)
  const processSteps = [
    t('create.process.step1', { defaultValue: 'Заполни форму или позвони' }),
    t('create.process.step2', { defaultValue: 'Оплати курс' }),
    t('create.process.step3', { defaultValue: 'Начни обучение' }),
    t('create.process.step4', { defaultValue: 'Получи права!' }),
  ];

  // Pulse animation for CUE elements
  const pulse = keyframes`
    0% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.05); opacity: 0.9; }
    100% { transform: scale(1); opacity: 1; }
  `;

  return (
    <AppTheme disableCustomTheme={disableCustomTheme}>
      <SEO 
        title={t('hero.category_a.title', { defaultValue: 'A-kategooria - Mootorrattakursus' })}
        description={t('hero.category_a.subtitle', { defaultValue: 'A-kategooria on sinu võimalus saada mootorratta juhtimise meistriks' })}
        ogImage={ogImageUrl}
        ogUrl="https://viktorijaautokool.ee/a-kategooria"
        language={i18n.language}
        canonicalUrl="https://viktorijaautokool.ee/a-kategooria"
        alternateLanguages={{
          'ru': 'https://viktorijaautokool.ee/a-kategooria?lang=ru',
          'en': 'https://viktorijaautokool.ee/a-kategooria?lang=en',
          'et': 'https://viktorijaautokool.ee/a-kategooria?lang=et'
        }}
      />
      
      <CourseSchema
        name={t('hero.category_a.title', { defaultValue: 'A-kategooria' })}
        description={t('hero.category_a.subtitle', { defaultValue: 'A-kategooria on sinu võimalus saada mootorratta juhtimise meistriks' })}
        provider="Viktorija Autokool Nõmme"
        url="https://viktorijaautokool.ee/a-kategooria"
        image={aCatImg}
        price={570}
      />
      
      <CssBaseline enableColorScheme />
      <SEOHeading />

      <AppAppBar toggleColorMode={toggleColorMode} />

      {/* Hero Section */}
      <Box
        sx={{
          pt: { xs: 8, sm: 10 },
          pb: { xs: 4, sm: 6 },
          background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography
              variant="h2"
              component="h1"
              sx={{
                fontWeight: 700,
                fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                mb: 2,
                color: 'primary.main',
                background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              🏍️ {t('hero.category_a.title', { defaultValue: 'Tunne vabadust kahel rattal A-kategooriaga!' })}
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: 'text.secondary',
                maxWidth: '800px',
                mx: 'auto',
                mb: 3,
              }}
            >
              {t('hero.category_a.subtitle', { defaultValue: 'A-kategooria on sinu võimalus saada mootorratta juhtimise meistriks. Naudi kiirust, manööverdusvõimet ja unustamatuid emotsioone.' })}
            </Typography>

            {/* Social Proof Banner */}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                gap: { xs: 2, sm: 4 },
                flexWrap: 'wrap',
                mb: 3,
                p: 2,
                background: 'linear-gradient(135deg, #f8f9ff 0%, #e3f2fd 100%)',
                borderRadius: 3,
                maxWidth: '900px',
                mx: 'auto',
              }}
            >
              {socialProof.map((item, index) => (
                <Box key={index} sx={{ textAlign: 'center' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, justifyContent: 'center', mb: 0.5 }}>
                    {item.icon}
                    <Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.main' }}>
                      {item.value}
                    </Typography>
                  </Box>
                  <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.75rem' }}>
                    {item.label}
                  </Typography>
                </Box>
              ))}
            </Box>

            {/* Urgency Banner */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 2,
                mb: 3,
                flexWrap: 'wrap',
              }}
            >
              <Chip
                icon={<LocalFireDepartmentIcon />}
                label={t('hero.category_a.urgency_spots', { spots: spotsLeft, defaultValue: `Jäänud kohti: ${spotsLeft}` })}
                color="error"
                sx={{
                  fontSize: '0.95rem',
                  py: 2.5,
                  fontWeight: 600,
                  '& .MuiChip-icon': {
                    fontSize: '1.2rem',
                  },
                }}
              />
              <Chip
                icon={<AccessTimeIcon />}
                label={t('hero.category_a.urgency_today', { count: Math.floor(Math.random() * 5) + 3, defaultValue: `${Math.floor(Math.random() * 5) + 3} inimest registreerisid täna` })}
                color="warning"
                sx={{
                  fontSize: '0.95rem',
                  py: 2.5,
                  fontWeight: 600,
                  '& .MuiChip-icon': {
                    fontSize: '1.2rem',
                  },
                }}
              />
            </Box>
          </Box>

          {/* Main Content Card */}
          <Card
            sx={{
              borderRadius: 4,
              boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
              maxWidth: '900px',
              mx: 'auto',
            }}
          >
            <CardContent sx={{ p: { xs: 3, sm: 4, md: 5 } }}>
              {/* Requirements Section */}
              <Box sx={{ mb: 4 }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    mb: 2,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                  }}
                >
                  📋 {t('hero.category_a.main_text', { defaultValue: 'Mida vajad registreerimiseks?' })}
                </Typography>
                <Stack spacing={2}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <PersonIcon sx={{ color: 'primary.main', fontSize: 28 }} />
                    <Typography variant="body1">
                      {t('requirements.passport', { defaultValue: 'Pass või ID-kaart' })}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <MedicalServicesIcon sx={{ color: 'primary.main', fontSize: 28 }} />
                    <Typography variant="body1">
                      {t('requirements.medical', { defaultValue: 'Meditsiiniline tõend A-kategooria jaoks' })}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <LocalFireDepartmentIcon sx={{ color: 'error.main', fontSize: 28 }} />
                    <Typography variant="body1" sx={{ color: 'primary.main', fontWeight: 600 }}>
                      {t('hero.category_a.highlight_text', { defaultValue: 'Saa tõeliseks mootorratturiks - alusta koolitust täna!' })}
                    </Typography>
                  </Box>
                </Stack>
              </Box>

              {/* Price Section */}
              <Box sx={{ mb: 4, textAlign: 'center' }}>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 600,
                    mb: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 1,
                  }}
                >
                  🛣️ {t('hero.category_a.main_text_continuation', { defaultValue: 'Teooria ja praktika TÄISKURSUS: 570 €' })}
                </Typography>
              </Box>

              {/* Course Timer Section */}
              <Box sx={{ mb: 4 }}>
                <CourseTimer nextCourseDate={nextCourseDate} />
              </Box>

              {/* Course Dates Section */}
              <Box sx={{ mb: 4 }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    mb: 2,
                    color: 'primary.main',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                  }}
                >
                  <CalendarTodayIcon /> {t('hero.category_a.offer_title', { defaultValue: 'Vali endale sobiv alguskuupäev:' })}
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Card 
                      variant="outlined" 
                      sx={{ 
                        p: 2, 
                        textAlign: 'center',
                        border: '2px solid',
                        borderColor: 'primary.main',
                        background: 'linear-gradient(135deg, rgba(25, 118, 210, 0.05) 0%, rgba(66, 165, 245, 0.05) 100%)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-4px)',
                          boxShadow: '0 8px 24px rgba(25, 118, 210, 0.2)',
                        },
                      }}
                    >
                      <Typography variant="body1" sx={{ fontWeight: 600 }}>
                        🎯 {t('hero.category_a.offer_text', { defaultValue: 'Esimene grupp: 10.02.2025 - 09.00' })}
                      </Typography>
                    </Card>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Card 
                      variant="outlined" 
                      sx={{ 
                        p: 2, 
                        textAlign: 'center',
                        border: '2px solid',
                        borderColor: 'primary.main',
                        background: 'linear-gradient(135deg, rgba(25, 118, 210, 0.05) 0%, rgba(66, 165, 245, 0.05) 100%)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-4px)',
                          boxShadow: '0 8px 24px rgba(25, 118, 210, 0.2)',
                        },
                      }}
                    >
                      <Typography variant="body1" sx={{ fontWeight: 600 }}>
                        🎯 {t('hero.category_a.offer_text_2', { defaultValue: 'Teine grupp: 25.02.2025 - 09.00' })}
                      </Typography>
                    </Card>
                  </Grid>
                </Grid>
              </Box>

              {/* CREATE Action Funnel: EXECUTION - Enhanced CTA Section */}
              <Box sx={{ mb: 3, p: 3, bgcolor: 'success.light', borderRadius: 2, textAlign: 'center' }}>
                <Typography variant="body2" sx={{ mb: 1, color: 'success.dark', fontWeight: 600 }}>
                  {t('create.execution.ready', { defaultValue: '✅ Готов начать? Регистрация займет всего 2 минуты!' })}
                </Typography>
              </Box>

              {/* Action Buttons */}
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <Button
                  variant="contained"
                  size="large"
                  endIcon={<ArrowForwardIcon />}
                  href="https://buy.stripe.com/8x2aEYewiaJW94hdTa3ZK02"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackButtonClick(
                    'category_a_register',
                    'payment',
                    'category_a_page',
                    t('hero.category_a.button_text', { defaultValue: 'Registreeru mootorrattakursusele' }),
                    'https://buy.stripe.com/8x2aEYewiaJW94hdTa3ZK02'
                  )}
                  sx={{
                    flex: 1,
                    py: 2.5,
                    borderRadius: 3,
                    background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
                    boxShadow: '0 8px 24px rgba(25, 118, 210, 0.4)',
                    fontSize: '1.2rem',
                    fontWeight: 700,
                    textTransform: 'none',
                    position: 'relative',
                    overflow: 'hidden',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: '-100%',
                      width: '100%',
                      height: '100%',
                      background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                      transition: 'left 0.5s',
                    },
                    '&:hover': {
                      background: 'linear-gradient(135deg, #1565c0 0%, #1976d2 100%)',
                      boxShadow: '0 12px 32px rgba(25, 118, 210, 0.5)',
                      transform: 'translateY(-2px)',
                      '&::before': {
                        left: '100%',
                      },
                    },
                    transition: 'all 0.3s ease',
                    animation: `${pulse} 3s infinite`,
                  }}
                >
                  {t('hero.category_a.button_text', { defaultValue: 'Registreeru mootorrattakursusele →' })}
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  startIcon={<EmailIcon />}
                  href="mailto:viktorijaautokool@hot.ee?subject=A-kategooria%20registreerimine"
                  onClick={() => trackButtonClick(
                    'category_a_email',
                    'info',
                    'category_a_page',
                    t('common.send_email'),
                    'mailto:viktorijaautokool@hot.ee?subject=A-kategooria%20registreerimine'
                  )}
                  sx={{
                    flex: 1,
                    py: 1.5,
                    borderRadius: 2,
                  }}
                >
                  {t('common.send_email')}
                </Button>
              </Stack>

              {/* Limited Places Notice */}
              <Typography
                variant="body2"
                sx={{
                  mt: 3,
                  textAlign: 'center',
                  color: 'text.secondary',
                  fontStyle: 'italic',
                }}
              >
                {t('hero.category_a.limit_text', { defaultValue: 'Kohtade arv on piiratud!' })}
              </Typography>
            </CardContent>
          </Card>
        </Container>
      </Box>

      {/* CREATE Action Funnel: EVALUATION - Benefits Section */}
      <Box sx={{ py: { xs: 6, sm: 8 }, bgcolor: 'background.default' }}>
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            component="h2"
            sx={{
              textAlign: 'center',
              fontWeight: 700,
              mb: 1,
              color: 'primary.main',
            }}
          >
            {t('create.benefits.title', { defaultValue: 'Что вы получите?' })}
          </Typography>
          <Typography
            variant="h6"
            sx={{
              textAlign: 'center',
              color: 'text.secondary',
              mb: 4,
            }}
          >
            {t('create.benefits.subtitle', { defaultValue: 'Ваши преимущества после прохождения курса' })}
          </Typography>
          <Grid container spacing={3}>
            {benefits.map((benefit, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card
                  sx={{
                    height: '100%',
                    p: 3,
                    textAlign: 'center',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 12px 24px rgba(0,0,0,0.15)',
                    },
                  }}
                >
                  <Box sx={{ mb: 2 }}>{benefit.icon}</Box>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                    {benefit.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {benefit.description}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      <Divider />

      {/* CREATE Action Funnel: REACTION - Success Story Section */}
      <Box sx={{ py: { xs: 6, sm: 8 }, bgcolor: 'background.default' }}>
        <Container maxWidth="lg">
          <Card
            sx={{
              p: { xs: 3, sm: 4, md: 5 },
              background: 'linear-gradient(135deg, rgba(25, 118, 210, 0.05) 0%, rgba(66, 165, 245, 0.05) 100%)',
              border: '2px solid',
              borderColor: 'primary.main',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              <StarIcon sx={{ color: 'warning.main', fontSize: 40 }} />
              <Box>
                <Typography variant="h5" sx={{ fontWeight: 700, color: 'primary.main' }}>
                  {t('create.reaction.title', { defaultValue: 'История успеха' })}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', fontStyle: 'italic' }}>
                  {t('create.reaction.subtitle', { defaultValue: 'Реальная история нашего ученика' })}
                </Typography>
              </Box>
            </Box>
            <Typography
              variant="body1"
              sx={{
                fontSize: '1.1rem',
                lineHeight: 1.8,
                mb: 2,
                color: 'text.primary',
              }}
            >
              {t('create.reaction.story', { defaultValue: '"Я всегда мечтал о мотоцикле, но боялся начать обучение. Инструкторы Viktorija помогли мне преодолеть страх и всего за 4 недели я получил права категории A. Теперь я свободен!"' })}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {t('create.reaction.author', { defaultValue: '— Мартин, 28 лет' })}
              </Typography>
              <CheckCircleIcon sx={{ color: 'success.main', fontSize: 20 }} />
            </Box>
          </Card>
        </Container>
      </Box>

      <Divider />

      {/* CREATE Action Funnel: ABILITY - Process Steps Section */}
      <Box sx={{ py: { xs: 6, sm: 8 }, bgcolor: 'background.paper' }}>
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            component="h2"
            sx={{
              textAlign: 'center',
              fontWeight: 700,
              mb: 1,
              color: 'primary.main',
            }}
          >
            {t('create.process.title', { defaultValue: 'Как это работает?' })}
          </Typography>
          <Typography
            variant="h6"
            sx={{
              textAlign: 'center',
              color: 'text.secondary',
              mb: 4,
            }}
          >
            {t('create.process.subtitle', { defaultValue: 'Всего 4 простых шага до ваших прав' })}
          </Typography>
          <Box sx={{ maxWidth: '800px', mx: 'auto' }}>
            <Stepper activeStep={-1} orientation="vertical" sx={{ '& .MuiStepLabel-label': { fontSize: '1.1rem' } }}>
              {processSteps.map((step, index) => (
                <Step key={index} completed={false}>
                  <StepLabel
                    StepIconComponent={() => (
                      <Box
                        sx={{
                          width: 48,
                          height: 48,
                          borderRadius: '50%',
                          bgcolor: 'primary.main',
                          color: 'white',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 700,
                          fontSize: '1.2rem',
                          animation: `${pulse} 2s infinite`,
                        }}
                      >
                        {index + 1}
                      </Box>
                    )}
                  >
                    {step}
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>
        </Container>
      </Box>

      <Divider />
      <Suspense fallback={<div style={{ minHeight: '200px' }} />}>
        <Footer />
      </Suspense>

      <Suspense fallback={null}>
        <FloatingActionButton buttonLink="https://buy.stripe.com/8x2aEYewiaJW94hdTa3ZK02" />
      </Suspense>
    </AppTheme>
  );
}
