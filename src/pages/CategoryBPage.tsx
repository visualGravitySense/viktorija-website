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
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PersonIcon from '@mui/icons-material/Person';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import StarIcon from '@mui/icons-material/Star';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import PeopleIcon from '@mui/icons-material/People';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import SecurityIcon from '@mui/icons-material/Security';
import SchoolIcon from '@mui/icons-material/School';
import StepLabel from '@mui/material/StepLabel';
import Step from '@mui/material/Step';
import Stepper from '@mui/material/Stepper';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import ChecklistIcon from '@mui/icons-material/Checklist';
import InfoIcon from '@mui/icons-material/Info';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import PsychologyIcon from '@mui/icons-material/Psychology';
import SpeedIcon from '@mui/icons-material/Speed';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import WarningIcon from '@mui/icons-material/Warning';
import { trackButtonClick } from '../lib/analytics';
import CourseTimer from '../components/marketing-page/components/CourseTimer.tsx';
import { keyframes } from '@emotion/react';
import bCatImg from '/b-cat.jpg';

const Footer = lazy(() => import('../components/marketing-page/components/Footer.tsx'));
const FloatingActionButton = lazy(() => import('../components/marketing-page/components/FloatingActionButton.tsx'));

interface CategoryBPageProps {
  disableCustomTheme?: boolean;
  toggleColorMode?: () => void;
}

export default function CategoryBPage({ disableCustomTheme, toggleColorMode }: CategoryBPageProps) {
  const { t, i18n } = useTranslation();
  const [spotsLeft] = useState(8);
  const [showDetailedInfo, setShowDetailedInfo] = useState(false); // System 2 toggle
  
  const ogImageUrl = import.meta.env.PROD 
    ? 'https://viktorijaautokool.ee' + bCatImg
    : bCatImg;

  // Next course date - ensure it's in the future
  const nextCourseDate = useMemo(() => {
    const date = new Date('2025-02-03T17:30:00');
    // If date is in the past, set it to 7 days from now
    if (date.getTime() < Date.now()) {
      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + 2);
      futureDate.setHours(17, 30, 0, 0);
      return futureDate;
    }
    return date;
  }, []);

  const socialProof = [
    { icon: <StarIcon sx={{ color: 'warning.main' }} />, value: '4.9/5', label: t('social_proof.rating.label', { defaultValue: 'Hindamine' }) },
    { icon: <TrendingUpIcon sx={{ color: 'success.main' }} />, value: '98%', label: t('social_proof.success_rate.label', { defaultValue: 'Edu esimesel korral' }) },
    { icon: <PeopleIcon sx={{ color: 'primary.main' }} />, value: '1000+', label: t('social_proof.students.label', { defaultValue: 'Õpilast' }) },
  ];

  // CREATE Action Funnel - Benefits (EVALUATION)
  const benefits = [
    { icon: <EmojiEventsIcon sx={{ color: 'warning.main', fontSize: 40 }} />, title: t('create.benefits.freedom.title', { defaultValue: 'Свобода передвижения' }), description: t('create.benefits.freedom.desc', { defaultValue: 'Поезжай куда хочешь, когда хочешь' }) },
    { icon: <DirectionsCarIcon sx={{ color: 'error.main', fontSize: 40 }} />, title: t('create.benefits.independence.title', { defaultValue: 'Независимость' }), description: t('create.benefits.independence.desc', { defaultValue: 'Больше не нужно ждать автобус или такси' }) },
    { icon: <SecurityIcon sx={{ color: 'success.main', fontSize: 40 }} />, title: t('create.benefits.confidence.title', { defaultValue: 'Уверенность' }), description: t('create.benefits.confidence.desc', { defaultValue: 'Стань уверенным водителем за 4-5 недель' }) },
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

  // Spectrum of Thinking Interventions - Data
  // Habits: Quick decision checklist
  const quickChecklist = [
    t('spectrum.habits.check1', { defaultValue: 'У меня есть паспорт или ID-карта' }),
    t('spectrum.habits.check2', { defaultValue: 'Мне исполнилось 18 лет' }),
    t('spectrum.habits.check3', { defaultValue: 'Я готов начать обучение' }),
  ];

  // Active Mindset: Comparison data
  const comparisonData = [
    {
      feature: t('spectrum.active.feature1', { defaultValue: 'Сложность обучения' }),
      manual: t('spectrum.active.manual1', { defaultValue: 'Средняя' }),
      auto: t('spectrum.active.auto1', { defaultValue: 'Легкая' }),
    },
    {
      feature: t('spectrum.active.feature2', { defaultValue: 'Стоимость' }),
      manual: '840€',
      auto: '840€',
    },
    {
      feature: t('spectrum.active.feature3', { defaultValue: 'Время обучения' }),
      manual: t('spectrum.active.manual3', { defaultValue: '4-5 недель' }),
      auto: t('spectrum.active.auto3', { defaultValue: '4-5 недель' }),
    },
    {
      feature: t('spectrum.active.feature4', { defaultValue: 'Права' }),
      manual: t('spectrum.active.manual4', { defaultValue: 'Только механика' }),
      auto: t('spectrum.active.auto4', { defaultValue: 'Механика + автомат' }),
    },
  ];

  // Heuristics: Quick decision rules
  const decisionRules = [
    {
      condition: t('spectrum.heuristics.rule1.condition', { defaultValue: 'Если у тебя ограниченный бюджет' }),
      action: t('spectrum.heuristics.rule1.action', { defaultValue: '→ Выбери механику (840€)' }),
      icon: <DirectionsCarIcon />,
    },
    {
      condition: t('spectrum.heuristics.rule2.condition', { defaultValue: 'Если хочешь водить любую машину' }),
      action: t('spectrum.heuristics.rule2.action', { defaultValue: '→ Выбери автомат (840€)' }),
      icon: <CompareArrowsIcon />,
    },
    {
      condition: t('spectrum.heuristics.rule3.condition', { defaultValue: 'Если сомневаешься' }),
      action: t('spectrum.heuristics.rule3.action', { defaultValue: '→ Начни с механики, потом добавь автомат' }),
      icon: <InfoIcon />,
    },
  ];

  // Focused Calculation: Detailed FAQ
  const faqItems = [
    {
      question: t('spectrum.focused.faq1.q', { defaultValue: 'Сколько времени занимает обучение?' }),
      answer: t('spectrum.focused.faq1.a', { defaultValue: 'Обучение занимает 4-5 недель, включая теорию (28 часов), практику (28 часов) и курсы первой помощи (16 часов).' }),
    },
    {
      question: t('spectrum.focused.faq2.q', { defaultValue: 'Можно ли оплатить в рассрочку?' }),
      answer: t('spectrum.focused.faq2.a', { defaultValue: 'Да, мы предлагаем возможность оплаты в рассрочку. Свяжитесь с нами для уточнения условий.' }),
    },
    {
      question: t('spectrum.focused.faq3.q', { defaultValue: 'Что включено в стоимость курса?' }),
      answer: t('spectrum.focused.faq3.a', { defaultValue: 'В стоимость включены: теория (28 часов), практика (28 часов), курсы первой помощи (16 часов), курсы вождения по скользкой дороге и в темноте.' }),
    },
    {
      question: t('spectrum.focused.faq4.q', { defaultValue: 'Какой процент успешной сдачи экзамена?' }),
      answer: t('spectrum.focused.faq4.a', { defaultValue: '98% наших учеников сдают экзамен с первого раза благодаря качественной подготовке и опытным инструкторам.' }),
    },
  ];

  return (
    <AppTheme disableCustomTheme={disableCustomTheme}>
      <SEO 
        title={t('hero.category_b.title', { defaultValue: 'B-kategooria - Autojuhiluba' })}
        description={t('hero.category_b.subtitle', { defaultValue: 'Valitse teed B-kategooriaga! Oled valmis saama oma juhiloa?' })}
        ogImage={ogImageUrl}
        ogUrl="https://viktorijaautokool.ee/b-kategooria"
        language={i18n.language}
        canonicalUrl="https://viktorijaautokool.ee/b-kategooria"
        alternateLanguages={{
          'ru': 'https://viktorijaautokool.ee/b-kategooria?lang=ru',
          'en': 'https://viktorijaautokool.ee/b-kategooria?lang=en',
          'et': 'https://viktorijaautokool.ee/b-kategooria?lang=et'
        }}
      />
      
      <CourseSchema
        name={t('hero.category_b.title', { defaultValue: 'B-kategooria' })}
        description={t('hero.category_b.subtitle', { defaultValue: 'Valitse teed B-kategooriaga!' })}
        provider="Viktorija Autokool Nõmme"
        url="https://viktorijaautokool.ee/b-kategooria"
        image={bCatImg}
        price={840}
      />
      
      <CssBaseline enableColorScheme />
      <SEOHeading />

      <AppAppBar toggleColorMode={toggleColorMode} />

      {/* Hero Section */}
      <Box
        sx={{
          pt: { xs: 12, sm: 14, md: 16 },
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
              }}
            >
              🚗 {t('hero.category_b.title', { defaultValue: 'Valitse teed B-kategooriaga!' })}
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
              {t('hero.category_b.subtitle', { defaultValue: 'Tere tulemast Viktorija Autokooli Nõmme! Oled valmis saama oma juhiloa? Meie autokool pakub professionaalset õpetust kategooriatele A (mootorratas) ja B (sõiduauto) juba üle 15 aasta. Meie unikaalne garantii: juhiluba 4-5 nädalaga või tagastame sulle raha tagasi!' })}
            </Typography>

            {/* Dual Process Theory: System 1 - Quick Visual Decision Helper */}
            <Box
              sx={{
                mb: 3,
                p: 3,
                background: 'linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%)',
                borderRadius: 3,
                maxWidth: '900px',
                mx: 'auto',
                border: '2px solid',
                borderColor: 'warning.main',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <FlashOnIcon sx={{ color: 'warning.main', fontSize: 32 }} />
                <Typography variant="h6" sx={{ fontWeight: 700, color: 'warning.dark' }}>
                  {t('dual.system1.title', { defaultValue: '⚡ Быстрое решение? Выбери за 30 секунд!' })}
                </Typography>
              </Box>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <Card
                    sx={{
                      p: 2,
                      textAlign: 'center',
                      bgcolor: 'background.paper',
                      border: '2px solid',
                      borderColor: 'primary.main',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'scale(1.05)',
                        boxShadow: '0 8px 24px rgba(25, 118, 210, 0.3)',
                      },
                    }}
                    onClick={() => {
                      trackButtonClick('quick_decision_manual', 'payment', 'category_b_page', 'Quick Decision: Manual', 'https://buy.stripe.com/14A28s0Fs4lycgtg1i3ZK00');
                      window.open('https://buy.stripe.com/14A28s0Fs4lycgtg1i3ZK00', '_blank');
                    }}
                  >
                    <DirectionsCarIcon sx={{ fontSize: 48, color: 'primary.main', mb: 1 }} />
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                      {t('dual.system1.quick_manual', { defaultValue: 'Механика' })}
                    </Typography>
                    <Typography variant="h5" sx={{ fontWeight: 700, color: 'primary.main', mb: 1 }}>
                      840€
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      {t('dual.system1.quick_manual_desc', { defaultValue: 'Быстро и выгодно' })}
                    </Typography>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Card
                    sx={{
                      p: 2,
                      textAlign: 'center',
                      bgcolor: 'background.paper',
                      border: '2px solid',
                      borderColor: 'success.main',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'scale(1.05)',
                        boxShadow: '0 8px 24px rgba(46, 125, 50, 0.3)',
                      },
                    }}
                    onClick={() => {
                      trackButtonClick('quick_decision_auto', 'payment', 'category_b_page', 'Quick Decision: Auto', 'https://buy.stripe.com/14A28s0Fs4lycgtg1i3ZK00');
                      window.open('https://buy.stripe.com/14A28s0Fs4lycgtg1i3ZK00', '_blank');
                    }}
                  >
                    <CompareArrowsIcon sx={{ fontSize: 48, color: 'success.main', mb: 1 }} />
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                      {t('dual.system1.quick_auto', { defaultValue: 'Автомат' })}
                    </Typography>
                    <Typography variant="h5" sx={{ fontWeight: 700, color: 'success.main', mb: 1 }}>
                      840€
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      {t('dual.system1.quick_auto_desc', { defaultValue: 'Больше возможностей' })}
                    </Typography>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Card
                    sx={{
                      p: 2,
                      textAlign: 'center',
                      bgcolor: 'background.paper',
                      border: '2px solid',
                      borderColor: 'warning.main',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'scale(1.05)',
                        boxShadow: '0 8px 24px rgba(255, 152, 0, 0.3)',
                      },
                    }}
                    onClick={() => {
                      trackButtonClick('quick_decision_theory', 'payment', 'category_b_page', 'Quick Decision: Theory', 'https://buy.stripe.com/14A28s0Fs4lycgtg1i3ZK00');
                      window.open('https://buy.stripe.com/14A28s0Fs4lycgtg1i3ZK00', '_blank');
                    }}
                  >
                    <SchoolIcon sx={{ fontSize: 48, color: 'warning.main', mb: 1 }} />
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                      {t('dual.system1.quick_theory', { defaultValue: 'Платная теория' })}
                    </Typography>
                    <Typography variant="h5" sx={{ fontWeight: 700, color: 'warning.main', mb: 1 }}>
                      160€
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      {t('dual.system1.quick_theory_desc', { defaultValue: 'Только теория' })}
                    </Typography>
                  </Card>
                </Grid>
              </Grid>
              <Box sx={{ mt: 2, textAlign: 'center' }}>
                <Button
                  variant="text"
                  size="small"
                  onClick={() => setShowDetailedInfo(!showDetailedInfo)}
                  endIcon={showDetailedInfo ? <ExpandMoreIcon sx={{ transform: 'rotate(180deg)' }} /> : <ExpandMoreIcon />}
                  sx={{ color: 'text.secondary' }}
                >
                  {showDetailedInfo ? t('dual.system1.toggle_hide', { defaultValue: 'Peida üksikasjad' }) : t('dual.system1.toggle_show', { defaultValue: 'Vajad üksikasju? (System 2)' })}
                </Button>
              </Box>
            </Box>

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
                label={t('hero.category_b.urgency_spots', { spots: spotsLeft, defaultValue: `Jäänud kohti: ${spotsLeft}` })}
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
                label={t('hero.category_b.urgency_today', { count: Math.floor(Math.random() * 5) + 5, defaultValue: `${Math.floor(Math.random() * 5) + 5} inimest registreerisid täna` })}
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
              {/* Course Image Placeholder */}
              <Box sx={{ mb: 4, borderRadius: 3, overflow: 'hidden', boxShadow: '0 8px 24px rgba(0,0,0,0.15)' }}>
                <Box
                  component="img"
                  src="/gemini-image-2_Professional_driving_instructor_and_student_sitting_in_car_interior_instructor_i-0 (1).jpg"
                  alt={t('hero.category_b.course_image_alt', { defaultValue: 'B-kategooria kursus' })}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/b-cat.jpg';
                  }}
                  sx={{
                    width: '100%',
                    height: { xs: 300, sm: 400, md: 500 },
                    display: 'block',
                    objectFit: 'cover',
                    objectPosition: 'center center',
                    bgcolor: 'grey.200',
                  }}
                />
              </Box>

              {/* Dual Process Theory: System 1 - Visual Cues Enhancement */}
              <Box sx={{ mb: 3, p: 2, bgcolor: 'primary.light', borderRadius: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                  <SpeedIcon sx={{ color: 'primary.dark', fontSize: 24 }} />
                  <Typography variant="body2" sx={{ fontWeight: 600, color: 'primary.dark' }}>
                    {t('dual.system1.visual_cue', { defaultValue: '💡 Визуальные подсказки: Синий = безопасно, Зеленый = рекомендовано, Оранжевый = срочно' })}
                  </Typography>
                </Box>
              </Box>

              {/* Spectrum of Thinking: HABITS - Quick Decision Checklist */}
              <Box sx={{ mb: 4, p: 3, bgcolor: 'success.light', borderRadius: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <ChecklistIcon sx={{ color: 'success.dark', fontSize: 28 }} />
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      color: 'success.dark',
                    }}
                  >
                    {t('spectrum.habits.title', { defaultValue: 'Быстрая проверка: Готов ли ты?' })}
                  </Typography>
                </Box>
                <Stack spacing={1.5}>
                  {quickChecklist.map((item, index) => (
                    <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <CheckCircleIcon sx={{ color: 'success.dark', fontSize: 24 }} />
                      <Typography variant="body1" sx={{ fontWeight: 500 }}>
                        {item}
                      </Typography>
                    </Box>
                  ))}
                </Stack>
                <Typography
                  variant="body2"
                  sx={{
                    mt: 2,
                    fontStyle: 'italic',
                    color: 'text.secondary',
                  }}
                >
                  {t('spectrum.habits.subtitle', { defaultValue: 'Если все пункты отмечены - ты готов начать!' })}
                </Typography>
              </Box>

              {/* Course Contents Section */}
              <Box sx={{ mb: 4 }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    mb: 2,
                  }}
                >
                  {t('hero.category_b.course_contents_title', { defaultValue: 'Mis kuulub kursustesse?' })}
                </Typography>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary={t('hero.category_b.theory', { defaultValue: 'Teooria - 28 akadeemilist tundi' })}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary={t('hero.category_b.driving', { defaultValue: 'Sõit - 28 akadeemilist tundi' })}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary={t('hero.category_b.first_aid', { defaultValue: 'Esmaabi kursused - 16 tundi' })}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary={t('hero.category_b.special_courses', { defaultValue: 'Pimeda ja libeda tee sõidukursused' })}
                    />
                  </ListItem>
                </List>
              </Box>

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
                  📋 {t('hero.category_b.requirements_title', { defaultValue: 'Mida vajad registreerimiseks?' })}
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
                      {t('requirements.medical', { defaultValue: 'Meditsiiniline tõend B-kategooria jaoks' })}
                    </Typography>
                  </Box>
                </Stack>
              </Box>

              {/* Course Timer Section */}
              <Box sx={{ mb: 4 }}>
                <CourseTimer nextCourseDate={nextCourseDate} />
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
                  <LocalFireDepartmentIcon /> {t('hero.category_b.cta_text', { defaultValue: 'Alusta oma teekonda juhiloani täna – tee ootab sind!' })} <DirectionsCarIcon />
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ color: 'text.secondary' }}
                >
                  {t('hero.category_b.course_date', { defaultValue: 'Kursuse alguskuupäevad: 03.02.2025 - 17.30' })}
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
                  href="https://buy.stripe.com/14A28s0Fs4lycgtg1i3ZK00"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackButtonClick(
                    'category_b_register',
                    'payment',
                    'category_b_page',
                    t('hero.category_b.button_text', { defaultValue: 'Manööverda oma unistuse poole — registreeru kursusele!' }),
                    'https://buy.stripe.com/14A28s0Fs4lycgtg1i3ZK00'
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
                  {t('hero.category_b.button_text', { defaultValue: 'Manööverda oma unistuse poole — registreeru kursusele! →' })}
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  startIcon={<EmailIcon />}
                  href="mailto:viktorijaautokool@hot.ee?subject=B-kategooria%20registreerimine"
                  onClick={() => trackButtonClick(
                    'category_b_email',
                    'info',
                    'category_b_page',
                    t('common.send_email'),
                    'mailto:viktorijaautokool@hot.ee?subject=B-kategooria%20registreerimine'
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
                {t('hero.category_b.footer_text', { defaultValue: 'Sinu juhiluba — meie missioon. Alustame koos!' })}
              </Typography>
            </CardContent>
          </Card>
        </Container>
      </Box>

      {/* Spectrum of Thinking: ACTIVE MINDSET - Comparison Section */}
      <Box sx={{ py: { xs: 6, sm: 8 }, bgcolor: 'background.paper' }}>
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3, justifyContent: 'center' }}>
            <CompareArrowsIcon sx={{ color: 'primary.main', fontSize: 40 }} />
            <Typography
              variant="h3"
              component="h2"
              sx={{
                fontWeight: 700,
                color: 'primary.main',
              }}
            >
              {t('spectrum.active.title', { defaultValue: 'Сравнение: Механика vs Автомат' })}
            </Typography>
          </Box>
          <Typography
            variant="h6"
            sx={{
              textAlign: 'center',
              color: 'text.secondary',
              mb: 4,
            }}
          >
            {t('spectrum.active.subtitle', { defaultValue: 'Выбери вариант, который подходит именно тебе' })}
          </Typography>
          <TableContainer component={Paper} sx={{ maxWidth: '800px', mx: 'auto', mt: 4 }}>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: 'primary.main' }}>
                  <TableCell sx={{ color: 'white', fontWeight: 700 }}>{t('spectrum.active.table.feature', { defaultValue: 'Характеристика' })}</TableCell>
                  <TableCell align="center" sx={{ color: 'white', fontWeight: 700 }}>{t('spectrum.active.table.manual', { defaultValue: 'Механика' })}</TableCell>
                  <TableCell align="center" sx={{ color: 'white', fontWeight: 700 }}>{t('spectrum.active.table.auto', { defaultValue: 'Автомат' })}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {comparisonData.map((row, index) => (
                  <TableRow
                    key={index}
                    sx={{
                      '&:nth-of-type(odd)': { bgcolor: 'action.hover' },
                      '&:hover': { bgcolor: 'action.selected' },
                    }}
                  >
                    <TableCell component="th" scope="row" sx={{ fontWeight: 600 }}>
                      {row.feature}
                    </TableCell>
                    <TableCell align="center">{row.manual}</TableCell>
                    <TableCell align="center">{row.auto}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      </Box>

      <Divider />

      {/* Spectrum of Thinking: HEURISTICS - Quick Decision Rules */}
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
            {t('spectrum.heuristics.title', { defaultValue: 'Быстрые правила принятия решения' })}
          </Typography>
          <Typography
            variant="h6"
            sx={{
              textAlign: 'center',
              color: 'text.secondary',
              mb: 4,
            }}
          >
            {t('spectrum.heuristics.subtitle', { defaultValue: 'Простое руководство для выбора' })}
          </Typography>
          <Grid container spacing={3}>
            {decisionRules.map((rule, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card
                  sx={{
                    height: '100%',
                    p: 3,
                    background: 'linear-gradient(135deg, rgba(25, 118, 210, 0.05) 0%, rgba(66, 165, 245, 0.05) 100%)',
                    border: '2px solid',
                    borderColor: 'primary.main',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 8px 24px rgba(25, 118, 210, 0.2)',
                    },
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                    <Box sx={{ color: 'primary.main' }}>{rule.icon}</Box>
                    <Typography variant="h6" sx={{ fontWeight: 600, color: 'primary.main' }}>
                      {t('spectrum.heuristics.rule', { defaultValue: 'Правило' })} {index + 1}
                    </Typography>
                  </Box>
                  <Typography variant="body1" sx={{ mb: 1.5, fontWeight: 500 }}>
                    {rule.condition}
                  </Typography>
                  <Typography variant="body1" sx={{ color: 'primary.main', fontWeight: 700 }}>
                    {rule.action}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      <Divider />

      {/* Spectrum of Thinking: FOCUSED CALCULATION - Detailed FAQ */}
      <Box sx={{ py: { xs: 6, sm: 8 }, bgcolor: 'background.paper' }}>
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3, justifyContent: 'center' }}>
            <InfoIcon sx={{ color: 'primary.main', fontSize: 40 }} />
            <Typography
              variant="h3"
              component="h2"
              sx={{
                fontWeight: 700,
                color: 'primary.main',
              }}
            >
              {t('spectrum.focused.title', { defaultValue: 'Детальная информация' })}
            </Typography>
          </Box>
          <Typography
            variant="h6"
            sx={{
              textAlign: 'center',
              color: 'text.secondary',
              mb: 4,
            }}
          >
            {t('spectrum.focused.subtitle', { defaultValue: 'Ответы на важные вопросы для принятия решения' })}
          </Typography>
          <Box sx={{ maxWidth: '900px', mx: 'auto' }}>
            {faqItems.map((item, index) => (
              <Accordion key={index} sx={{ mb: 2, boxShadow: 2 }}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon sx={{ color: 'primary.main' }} />}
                  sx={{
                    bgcolor: 'background.default',
                    '&:hover': { bgcolor: 'action.hover' },
                  }}
                >
                  <Typography variant="h6" sx={{ fontWeight: 600, color: 'primary.main' }}>
                    {item.question}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body1" sx={{ lineHeight: 1.8, color: 'text.primary' }}>
                    {item.answer}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
        </Container>
      </Box>

      <Divider />

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
                  <Box
                    sx={{
                      mb: 2,
                      borderRadius: 2,
                      overflow: 'hidden',
                      height: 200,
                      position: 'relative',
                      bgcolor: 'background.default',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Box
                      component="img"
                      src={[
                        '/gemini-image-2_Professional_driving_instructor_and_student_sitting_in_car_interior_instructor_i-0 (1).jpg',
                        '/gemini-image-2_Professional_driving_instructor_and_student_sitting_in_car_interior_instructor_i-0 (2).jpg',
                        '/gemini-image-2_Professional_driving_instructor_and_student_sitting_in_car_interior_instructor_i-0 (3).jpg',
                        '/gemini-image-2_Internet_meme_recreation_distracted_boyfriend_template_urban_street_background_w-0 (1).jpg'
                      ][index] || `/b-cat-benefit-${index + 1}-placeholder.jpg`}
                      alt={benefit.title}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        const fallbacks = ['/Leonardo_Phoenix_10_Driving_school_student_successfully_perfor_1.jpg', '/kool-1-1024x581.jpg', '/kool-2-1024x581.jpg', '/cars-park-1.jpg'];
                        const fallbackIndex = fallbacks.findIndex(fb => !target.src.includes(fb));
                        if (fallbackIndex >= 0) {
                          target.src = fallbacks[fallbackIndex];
                        } else {
                          target.style.display = 'none';
                        }
                      }}
                      sx={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        bgcolor: 'grey.200',
                      }}
                    />
                    <Box
                      sx={{
                        position: 'relative',
                        zIndex: 1,
                        bgcolor: 'rgba(255, 255, 255, 0.9)',
                        borderRadius: '50%',
                        p: 1,
                      }}
                    >
                      {benefit.icon}
                    </Box>
                  </Box>
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
            <Grid container spacing={4} alignItems="stretch">
              <Grid item xs={12} md={4}>
                <Box
                  sx={{
                    borderRadius: 3,
                    overflow: 'hidden',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                    display: 'flex',
                  }}
                >
                  <Box
                    component="img"
                    src="/gemini-image-2_Professional_driving_instructor_and_student_sitting_in_car_interior_instructor_i-0 (2).jpg"
                    alt={t('create.reaction.author_b', { defaultValue: 'Катрин, 34 года' })}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/Leonardo_Phoenix_10_Driving_school_graduate_receiving_their_Ca_2.jpg';
                    }}
                    sx={{
                      width: '100%',
                      height: { xs: 400, sm: 450, md: 500 },
                      display: 'block',
                      objectFit: 'cover',
                      objectPosition: 'center center',
                      bgcolor: 'grey.200',
                    }}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} md={8}>
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
                  {t('create.reaction.story_b', { defaultValue: '"Я получил права категории B всего за 5 недель! Инструкторы были терпеливыми и профессиональными. Теперь я могу ездить на работу на своей машине. Спасибо Viktorija!"' })}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {t('create.reaction.author_b', { defaultValue: '— Катрин, 34 года' })}
                  </Typography>
                  <CheckCircleIcon sx={{ color: 'success.main', fontSize: 20 }} />
                </Box>
              </Grid>
            </Grid>
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
        <FloatingActionButton buttonLink="tel:+37253464508" />
      </Suspense>
    </AppTheme>
  );
}
