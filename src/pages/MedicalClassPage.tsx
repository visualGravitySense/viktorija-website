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
import Chip from '@mui/material/Chip';
import AppTheme from '../components/shared-theme/AppTheme.tsx';
import AppAppBar from '../components/marketing-page/components/AppAppBar.tsx';
import SEO from '../components/shared/SEO.tsx';
import SEOHeading from '../components/shared/SEOHeading.tsx';
import { CourseSchema } from '../components/shared/StructuredData.tsx';
import { useTranslation } from 'react-i18next';
import EmailIcon from '@mui/icons-material/Email';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import StarIcon from '@mui/icons-material/Star';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PsychologyIcon from '@mui/icons-material/Psychology';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import PeopleIcon from '@mui/icons-material/People';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import SecurityIcon from '@mui/icons-material/Security';
import SchoolIcon from '@mui/icons-material/School';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import Grid from '@mui/material/Grid';
import StepLabel from '@mui/material/StepLabel';
import Step from '@mui/material/Step';
import Stepper from '@mui/material/Stepper';
import { trackButtonClick } from '../lib/analytics';
import CourseTimer from '../components/marketing-page/components/CourseTimer.tsx';
import { keyframes } from '@emotion/react';

const Footer = lazy(() => import('../components/marketing-page/components/Footer.tsx'));
const FloatingActionButton = lazy(() => import('../components/marketing-page/components/FloatingActionButton.tsx'));

interface MedicalClassPageProps {
  disableCustomTheme?: boolean;
  toggleColorMode?: () => void;
}

export default function MedicalClassPage({ disableCustomTheme, toggleColorMode }: MedicalClassPageProps) {
  const { t, i18n } = useTranslation();
  const [spotsLeft] = useState(15);
  
  const ogImageUrl = import.meta.env.PROD 
    ? 'https://viktorijaautokool.ee/medical-class.jpg'
    : '/medical-class.jpg';

  const nextCourseDate = new Date('2025-02-01T09:00:00');

  const socialProof = [
    { icon: <StarIcon sx={{ color: 'warning.main' }} />, value: '4.9/5', label: t('social_proof.rating.label', { defaultValue: 'Hindamine' }) },
    { icon: <TrendingUpIcon sx={{ color: 'success.main' }} />, value: '100%', label: t('hero.first_aid.success_label', { defaultValue: 'Läbimise määr' }) },
    { icon: <PeopleIcon sx={{ color: 'primary.main' }} />, value: '2000+', label: t('hero.first_aid.students_label', { defaultValue: 'Lõpetanud' }) },
  ];

  // CREATE Action Funnel - Benefits (EVALUATION)
  const benefits = [
    { icon: <LocalHospitalIcon sx={{ color: 'error.main', fontSize: 40 }} />, title: t('create.benefits.lifesaving.title', { defaultValue: 'Спасение жизней' }), description: t('create.benefits.lifesaving.desc', { defaultValue: 'Научись действовать в экстренных ситуациях' }) },
    { icon: <SecurityIcon sx={{ color: 'success.main', fontSize: 40 }} />, title: t('create.benefits.confidence.title', { defaultValue: 'Уверенность' }), description: t('create.benefits.confidence.desc_medical', { defaultValue: 'Чувствуй себя безопаснее на дороге' }) },
    { icon: <EmojiEventsIcon sx={{ color: 'warning.main', fontSize: 40 }} />, title: t('create.benefits.certificate.title', { defaultValue: 'Сертификат' }), description: t('create.benefits.certificate.desc', { defaultValue: 'Получи официальный сертификат' }) },
    { icon: <SchoolIcon sx={{ color: 'primary.main', fontSize: 40 }} />, title: t('create.benefits.expertise.title', { defaultValue: 'Профессиональное обучение' }), description: t('create.benefits.expertise.desc', { defaultValue: 'Опытные инструкторы с 15+ лет опыта' }) },
  ];

  // CREATE Action Funnel - Process Steps (ABILITY)
  const processSteps = [
    t('create.process.step1', { defaultValue: 'Заполни форму или позвони' }),
    t('create.process.step2', { defaultValue: 'Оплати курс' }),
    t('create.process.step3', { defaultValue: 'Пройди обучение' }),
    t('create.process.step4_medical', { defaultValue: 'Получи сертификат!' }),
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
        title={t('hero.first_aid.title', { defaultValue: 'Esmaabikursused – oluline samm sinu ohutuse poole!' })}
        description={t('hero.first_aid.subtitle', { defaultValue: 'Meie autokoolis õpid oskusi, mis aitavad sul õigesti reageerida hädaolukordades teel ja päästa elusid.' })}
        ogImage={ogImageUrl}
        ogUrl="https://viktorijaautokool.ee/esmaabi"
        language={i18n.language}
        canonicalUrl="https://viktorijaautokool.ee/esmaabi"
        alternateLanguages={{
          'ru': 'https://viktorijaautokool.ee/esmaabi?lang=ru',
          'en': 'https://viktorijaautokool.ee/esmaabi?lang=en',
          'et': 'https://viktorijaautokool.ee/esmaabi?lang=et'
        }}
      />
      
      <CourseSchema
        name={t('hero.first_aid.title', { defaultValue: 'Esmaabikursused' })}
        description={t('hero.first_aid.subtitle', { defaultValue: 'Meie autokoolis õpid oskusi, mis aitavad sul õigesti reageerida hädaolukordades teel ja päästa elusid.' })}
        provider="Viktorija Autokool Nõmme"
        url="https://viktorijaautokool.ee/esmaabi"
        image={ogImageUrl}
        price={0}
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
                background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 1,
                flexWrap: 'wrap',
              }}
            >
              🚑 {t('hero.first_aid.title', { defaultValue: 'Esmaabikursused – oluline samm sinu ohutuse poole!' })}
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
              {t('hero.first_aid.subtitle', { defaultValue: 'Meie autokoolis õpid oskusi, mis aitavad sul õigesti reageerida hädaolukordades teel ja päästa elusid.' })}
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
                label={t('hero.first_aid.urgency_spots', { spots: spotsLeft, defaultValue: `Jäänud kohti: ${spotsLeft}` })}
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
                label={t('hero.first_aid.urgency_today', { count: Math.floor(Math.random() * 5) + 1, defaultValue: `${Math.floor(Math.random() * 5) + 1} inimest registreerisid täna` })}
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
              {/* Course Timer Section */}
              <Box sx={{ mb: 4 }}>
                <CourseTimer nextCourseDate={nextCourseDate} />
              </Box>

              {/* Why Important Section */}
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
                  <StarIcon sx={{ color: 'warning.main' }} /> {t('hero.first_aid.why_title', { defaultValue: 'Miks see on oluline?' })}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: '1.1rem',
                    lineHeight: 1.8,
                    color: 'text.primary',
                    mb: 2,
                  }}
                >
                  {t('hero.first_aid.why_text', { defaultValue: 'Abi enne kiirabi saabumist võib päästa elu. Õpid tegutsema õnnetuste, vigastuste ja teiste kriitiliste juhtumite korral. Kursuste läbimise tunnistus on vajalik eksami sooritamiseks.' })}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', alignItems: 'center' }}>
                  <FavoriteIcon sx={{ color: 'error.main' }} />
                  <PsychologyIcon sx={{ color: 'primary.main' }} />
                </Box>
              </Box>

              {/* What's Included Section */}
              <Box sx={{ mb: 4 }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    mb: 2,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    color: 'primary.main',
                  }}
                >
                  <HelpOutlineIcon /> {t('hero.first_aid.highlight_text', { defaultValue: 'Mida kursused sisaldavad?' })}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, mb: 2, alignItems: 'center' }}>
                  <MenuBookIcon sx={{ color: 'success.main' }} />
                  <MedicalServicesIcon sx={{ color: 'primary.main' }} />
                </Box>
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: '1.1rem',
                    lineHeight: 1.8,
                    color: 'text.primary',
                    mb: 2,
                  }}
                >
                  {t('hero.first_aid.main_text_continuation', { defaultValue: 'Teooria ja praktika: päris stsenaariumid ja töö mannekeenidega. Põhioskused: elustamine, verejooksu peatamine ja šoki abi.' })}
                </Typography>
              </Box>

              {/* Call to Action */}
              <Box sx={{ mb: 4, textAlign: 'center' }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    mb: 2,
                    color: 'primary.main',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 1,
                    flexWrap: 'wrap',
                  }}
                >
                  <LocalFireDepartmentIcon /> {t('hero.first_aid.offer_title', { defaultValue: 'Registreeru täna ja saa enesekindlaks juhiks!' })} <DirectionsCarIcon />
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ color: 'text.secondary' }}
                >
                  {t('hero.first_aid.offer_text', { defaultValue: 'Kursuse alguskuupäevad: 01.02.2025' })}
                </Typography>
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
                  href="mailto:viktorijaautokool@hot.ee?subject=Esmaabikursused%20registreerimine"
                  onClick={() => trackButtonClick(
                    'medical_class_register',
                    'info',
                    'medical_class_page',
                    t('hero.first_aid.button_text', { defaultValue: 'Registreeru kursustele' }),
                    'mailto:viktorijaautokool@hot.ee?subject=Esmaabikursused%20registreerimine'
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
                  {t('hero.first_aid.button_text', { defaultValue: 'Registreeru kursustele →' })}
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  startIcon={<EmailIcon />}
                  href="mailto:viktorijaautokool@hot.ee?subject=Esmaabikursused"
                  onClick={() => trackButtonClick(
                    'medical_class_email',
                    'info',
                    'medical_class_page',
                    t('common.send_email'),
                    'mailto:viktorijaautokool@hot.ee?subject=Esmaabikursused'
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
                {t('hero.first_aid.limit_text', { defaultValue: 'Kohtade arv on piiratud!' })}
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
            {t('create.benefits.subtitle_medical', { defaultValue: 'Ваши преимущества после прохождения курса' })}
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
      <Box sx={{ py: { xs: 6, sm: 8 }, bgcolor: 'background.paper' }}>
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
              {t('create.reaction.story_medical', { defaultValue: '"Курсы первой помощи были очень полезными. Теперь я чувствую себя безопаснее на дороге и знаю, что делать в экстренной ситуации."' })}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {t('create.reaction.author_medical', { defaultValue: '— Лийс, 30 лет' })}
              </Typography>
              <CheckCircleIcon sx={{ color: 'success.main', fontSize: 20 }} />
            </Box>
          </Card>
        </Container>
      </Box>

      <Divider />

      {/* CREATE Action Funnel: ABILITY - Process Steps Section */}
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
            {t('create.process.subtitle_medical', { defaultValue: 'Всего 4 простых шага до сертификата' })}
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
        <FloatingActionButton buttonLink="mailto:viktorijaautokool@hot.ee?subject=Esmaabikursused%20registreerimine" />
      </Suspense>
    </AppTheme>
  );
}
