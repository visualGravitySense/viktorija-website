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
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Chip from '@mui/material/Chip';
import AppTheme from '../components/shared-theme/AppTheme.tsx';
import AppAppBar from '../components/marketing-page/components/AppAppBar.tsx';
import SEO from '../components/shared/SEO.tsx';
import SEOHeading from '../components/shared/SEOHeading.tsx';
import { CourseSchema } from '../components/shared/StructuredData.tsx';
import { useTranslation } from 'react-i18next';
import EmailIcon from '@mui/icons-material/Email';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AppsIcon from '@mui/icons-material/Apps';
import StarIcon from '@mui/icons-material/Star';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import PeopleIcon from '@mui/icons-material/People';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import SchoolIcon from '@mui/icons-material/School';
import PsychologyIcon from '@mui/icons-material/Psychology';
import SecurityIcon from '@mui/icons-material/Security';
import StepLabel from '@mui/material/StepLabel';
import Step from '@mui/material/Step';
import Stepper from '@mui/material/Stepper';
import { trackButtonClick } from '../lib/analytics';
import CourseTimer from '../components/marketing-page/components/CourseTimer.tsx';
import { keyframes } from '@emotion/react';
import fCatImg from '/final-cat-1.jpg';

const Footer = lazy(() => import('../components/marketing-page/components/Footer.tsx'));
const FloatingActionButton = lazy(() => import('../components/marketing-page/components/FloatingActionButton.tsx'));

interface FinalTestPageProps {
  disableCustomTheme?: boolean;
  toggleColorMode?: () => void;
}

export default function FinalTestPage({ disableCustomTheme, toggleColorMode }: FinalTestPageProps) {
  const { t, i18n } = useTranslation();
  const [spotsLeft] = useState(12);
  
  const ogImageUrl = import.meta.env.PROD 
    ? 'https://viktorijaautokool.ee' + fCatImg
    : fCatImg;

  const nextCourseDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  const socialProof = [
    { icon: <StarIcon sx={{ color: 'warning.main' }} />, value: '4.9/5', label: t('social_proof.rating.label', { defaultValue: 'Hindamine' }) },
    { icon: <TrendingUpIcon sx={{ color: 'success.main' }} />, value: '98%', label: t('social_proof.success_rate.label', { defaultValue: 'Edu esimesel korral' }) },
    { icon: <PeopleIcon sx={{ color: 'primary.main' }} />, value: '5000+', label: t('social_proof.students.label', { defaultValue: 'Õpilast' }) },
  ];

  // CREATE Action Funnel - Benefits (EVALUATION)
  const benefits = [
    { icon: <EmojiEventsIcon sx={{ color: 'warning.main', fontSize: 40 }} />, title: t('create.benefits.confidence.title', { defaultValue: 'Уверенность' }), description: t('create.benefits.confidence.desc_final', { defaultValue: 'Пройди экзамен с первого раза' }) },
    { icon: <PsychologyIcon sx={{ color: 'error.main', fontSize: 40 }} />, title: t('create.benefits.psychological.title', { defaultValue: 'Психологическая подготовка' }), description: t('create.benefits.psychological.desc', { defaultValue: 'Преодолей страх перед экзаменом' }) },
    { icon: <SecurityIcon sx={{ color: 'success.main', fontSize: 40 }} />, title: t('create.benefits.practice.title', { defaultValue: 'Практика' }), description: t('create.benefits.practice.desc', { defaultValue: 'Отработай все сложные элементы' }) },
    { icon: <SchoolIcon sx={{ color: 'primary.main', fontSize: 40 }} />, title: t('create.benefits.expertise.title', { defaultValue: 'Профессиональная подготовка' }), description: t('create.benefits.expertise.desc', { defaultValue: 'Опытные инструкторы с 15+ лет опыта' }) },
  ];

  // CREATE Action Funnel - Process Steps (ABILITY)
  const processSteps = [
    t('create.process.step1', { defaultValue: 'Заполни форму или позвони' }),
    t('create.process.step2', { defaultValue: 'Оплати курс' }),
    t('create.process.step3', { defaultValue: 'Начни подготовку' }),
    t('create.process.step4_final', { defaultValue: 'Сдай экзамен и получи права!' }),
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
        title={t('hero.final_course.title', { defaultValue: 'Ettevalmistus ARK eksamiks' })}
        description={t('hero.final_course.subtitle', { defaultValue: 'ARK eksam on nagu pimekohting: sa ei tea kunagi, kuidas see lõppeb.' })}
        ogImage={ogImageUrl}
        ogUrl="https://viktorijaautokool.ee/final-test"
        language={i18n.language}
        canonicalUrl="https://viktorijaautokool.ee/final-test"
        alternateLanguages={{
          'ru': 'https://viktorijaautokool.ee/final-test?lang=ru',
          'en': 'https://viktorijaautokool.ee/final-test?lang=en',
          'et': 'https://viktorijaautokool.ee/final-test?lang=et'
        }}
      />
      
      <CourseSchema
        name={t('hero.final_course.title', { defaultValue: 'Ettevalmistus ARK eksamiks' })}
        description={t('hero.final_course.subtitle', { defaultValue: 'Viimane etapp teel alalise juhiloani' })}
        provider="Viktorija Autokool Nõmme"
        url="https://viktorijaautokool.ee/final-test"
        image={fCatImg}
        price={150}
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
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, mb: 2 }}>
              <DirectionsCarIcon sx={{ fontSize: 48, color: 'primary.main' }} />
              <Typography
                variant="h2"
                component="h1"
                sx={{
                  fontWeight: 700,
                  fontSize: { xs: '1.75rem', sm: '2.25rem', md: '2.75rem' },
                  background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  textTransform: 'uppercase',
                }}
              >
                {t('hero.final_course.page_title', { defaultValue: 'ETTEVALMISTUS ARK EKSAMIKS' })}
              </Typography>
            </Box>
            <Typography
              variant="h6"
              sx={{
                color: 'text.secondary',
                maxWidth: '800px',
                mx: 'auto',
                mb: 3,
                fontStyle: 'italic',
              }}
            >
              {t('hero.final_course.intro', { defaultValue: 'ARK eksam on nagu pimekohting: sa ei tea kunagi, kuidas see lõppeb.' })}
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
                label={t('hero.final_course.urgency_spots', { spots: spotsLeft, defaultValue: `Jäänud kohti: ${spotsLeft}` })}
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
                label={t('hero.final_course.urgency_today', { count: Math.floor(Math.random() * 5) + 2, defaultValue: `${Math.floor(Math.random() * 5) + 2} inimest registreerisid täna` })}
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

              {/* Introduction */}
              <Box sx={{ mb: 4 }}>
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: '1.1rem',
                    lineHeight: 1.8,
                    color: 'text.primary',
                  }}
                >
                  {t('hero.final_course.main_text', { defaultValue: 'Kuid meiega on sul kindlasti teine kohting! Valmistame sind nii hästi ette, et inspektor hakkab kahtlema oma autoriteedis.' })}
                </Typography>
              </Box>

              {/* Success Recipe Section */}
              <Box sx={{ mb: 4 }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    mb: 2,
                    color: 'primary.main',
                  }}
                >
                  {t('hero.final_course.recipe_title', { defaultValue: 'Meie salajane eduretsept:' })}
                </Typography>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary={t('hero.final_course.recipe_1', { defaultValue: 'Eksami marsruudi simulaator' })}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary={t('hero.final_course.recipe_2', { defaultValue: 'Psühholoogiline ettevalmistus \'Ka inspektor on inimene\'' })}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary={t('hero.final_course.recipe_3', { defaultValue: 'Paralleelparkimine (parem hoia silmad lahti)' })}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary={t('hero.final_course.recipe_4', { defaultValue: 'Õnnesoov kooli direktorilt' })}
                    />
                  </ListItem>
                </List>
              </Box>

              {/* Web Courses Section */}
              <Box sx={{ mb: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  <AppsIcon sx={{ color: 'primary.main', fontSize: 32 }} />
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 600,
                      color: 'primary.main',
                      textTransform: 'uppercase',
                    }}
                  >
                    {t('hero.final_course.web_courses_title', { defaultValue: 'VEEBIKURSUSED: TEOORIA ILMA IGAVUSETA' })}
                  </Typography>
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
                  {t('hero.final_course.web_courses_text', { defaultValue: 'Õpi oma pidžaamas! Meie kursused on mõeldud neile, kes soovivad õppida liikluseeskirju koos kassi ja teekruusiga. Unusta igavad loengud!' })}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    mb: 1,
                  }}
                >
                  {t('hero.final_course.includes_title', { defaultValue: 'Sisaldab:' })}
                </Typography>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary={t('hero.final_course.includes_1', { defaultValue: 'Interaktiivsed tunnid' })}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary={t('hero.final_course.includes_2', { defaultValue: 'Testid ilma aknast välja hüppamise soovita' })}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary={t('hero.final_course.includes_3', { defaultValue: 'Animeeritud liiklusolukorrad' })}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary={t('hero.final_course.includes_4', { defaultValue: '24/7 juurdepääs' })}
                    />
                  </ListItem>
                </List>
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
                  href="https://buy.stripe.com/eVq5kEgEqcS4a8l5mE3ZK01"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackButtonClick(
                    'final_test_register',
                    'payment',
                    'final_test_page',
                    t('hero.final_course.button_text', { defaultValue: 'Alusta õppimist' }),
                    'https://buy.stripe.com/eVq5kEgEqcS4a8l5mE3ZK01'
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
                  {t('hero.final_course.button_text', { defaultValue: 'Alusta õppimist →' })}
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  startIcon={<EmailIcon />}
                  href="mailto:viktorijaautokool@hot.ee?subject=ARK%20eksami%20ettevalmistus"
                  onClick={() => trackButtonClick(
                    'final_test_email',
                    'info',
                    'final_test_page',
                    t('common.send_email'),
                    'mailto:viktorijaautokool@hot.ee?subject=ARK%20eksami%20ettevalmistus'
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

              {/* Footer Message */}
              <Typography
                variant="body2"
                sx={{
                  mt: 3,
                  textAlign: 'center',
                  color: 'text.secondary',
                  fontStyle: 'italic',
                }}
              >
                {t('hero.final_course.limit_text', { defaultValue: 'Möödu kõigist teistest teel oma juhiloani!' })}
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
            {t('create.benefits.subtitle_final', { defaultValue: 'Ваши преимущества после подготовки' })}
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
              {t('create.reaction.story_final', { defaultValue: '"Экзамен ARK был для меня пугающим, но подготовка Viktorija помогла мне успешно его сдать. Теперь у меня постоянные права!"' })}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {t('create.reaction.author_final', { defaultValue: '— Яан, 25 лет' })}
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
            {t('create.process.subtitle_final', { defaultValue: 'Всего 4 простых шага до успешной сдачи экзамена' })}
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
        <FloatingActionButton buttonLink="https://buy.stripe.com/eVq5kEgEqcS4a8l5mE3ZK01" />
      </Suspense>
    </AppTheme>
  );
}
