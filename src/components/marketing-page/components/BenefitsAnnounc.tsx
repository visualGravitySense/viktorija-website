import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import FlashOnRoundedIcon from '@mui/icons-material/FlashOnRounded';
import EventIcon from '@mui/icons-material/Event';
import BarChartRoundedIcon from '@mui/icons-material/BarChartRounded';
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import NotificationsActiveRoundedIcon from '@mui/icons-material/NotificationsActiveRounded';
import ChatBubbleOutlineRoundedIcon from '@mui/icons-material/ChatBubbleOutlineRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import PlayCircleOutlineRoundedIcon from '@mui/icons-material/PlayCircleOutlineRounded';
import SmartToyRoundedIcon from '@mui/icons-material/SmartToyRounded';
import DirectionsCarRoundedIcon from '@mui/icons-material/DirectionsCarRounded';
import TrafficRoundedIcon from '@mui/icons-material/TrafficRounded';
import KeyRoundedIcon from '@mui/icons-material/KeyRounded';

// Палитра по ТЗ (улучшенный визуал)
const COLORS = {
  bgGradient: 'linear-gradient(135deg, #eff6ff 0%, #f8fafc 40%, #fef3f2 100%)',
  textPrimary: '#0f172a',
  textSecondary: '#475569',
  accentBlue: '#3b82f6',
  accentViolet: '#8b5cf6',
  ctaGradient: 'linear-gradient(135deg, #f97316 0%, #fb923c 50%, #fbbf24 100%)',
  ctaShadow: '0 4px 16px rgba(249, 115, 22, 0.3), 0 8px 32px rgba(249, 115, 22, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
  ctaShadowHover: '0 8px 24px rgba(249, 115, 22, 0.4), 0 12px 40px rgba(249, 115, 22, 0.25)',
  badgeBg: 'linear-gradient(135deg, #f97316 0%, #fb923c 100%)',
  badgeGlow: '0 0 24px rgba(249, 115, 22, 0.4)',
  headlineAccentGradient: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
  bubbleBg: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
  bubbleShadow: '0 2px 8px rgba(59, 130, 246, 0.12)',
};

// Градиенты для иконок преимуществ (по ТЗ)
const BENEFIT_ICON_GRADIENTS = [
  'linear-gradient(135deg, #3b82f6, #1d4ed8)',
  'linear-gradient(135deg, #8b5cf6, #6d28d9)',
  'linear-gradient(135deg, #22c55e, #16a34a)',
  'linear-gradient(135deg, #f59e0b, #d97706)',
  'linear-gradient(135deg, #f97316, #ea580c)',
  'linear-gradient(135deg, #06b6d4, #0891b2)',
];

const benefitKeys = [
  { key: 'instant', Icon: FlashOnRoundedIcon },
  { key: 'booking', Icon: EventIcon },
  { key: 'progress', Icon: BarChartRoundedIcon },
  { key: 'theory', Icon: SchoolRoundedIcon },
  { key: 'reminders', Icon: NotificationsActiveRoundedIcon },
  { key: 'support', Icon: ChatBubbleOutlineRoundedIcon },
];

const chatMessages = ['botAnnounce.chat.1', 'botAnnounce.chat.2', 'botAnnounce.chat.3'];
const chatOptionKeys = ['morning', 'day', 'evening', 'weekend'] as const;
const chatOptionEmoji = ['📅', '🌤️', '🌆', '🗓️'];

export default function BenefitsAnnounc() {
  const { t } = useTranslation();
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const [showHowItWorks, setShowHowItWorks] = React.useState(false);

  const sectionBg = isDark
    ? 'linear-gradient(135deg, #0f172a 0%, #1e293b 40%, #1c1917 100%)'
    : COLORS.bgGradient;
  const dotGridColor = isDark ? 'rgba(255,255,255,0.08)' : '#cbd5e1';
  const bubbleBg = isDark
    ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.25) 0%, rgba(30, 64, 175, 0.3) 100%)'
    : COLORS.bubbleBg;
  // Явные светлые цвета текста в dark theme для читаемости
  const textPrimary = isDark ? '#f1f5f9' : COLORS.textPrimary;
  const textSecondary = isDark ? '#cbd5e1' : COLORS.textSecondary;
  const textMuted = isDark ? '#94a3b8' : COLORS.textSecondary;

  return (
    <Box
      component="section"
      sx={{
        py: { xs: 8, sm: 10, md: 12 },
        minHeight: { md: 680 },
        background: sectionBg,
        position: 'relative',
        overflow: 'hidden',
        // Точечная сетка на фоне
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          backgroundImage: `radial-gradient(circle, ${dotGridColor} 1px, transparent 1px)`,
          backgroundSize: '32px 32px',
          opacity: isDark ? 0.5 : 0.2,
          pointerEvents: 'none',
        },
        '@keyframes botAnnounce-pulse': {
          '0%, 100%': { opacity: 1, boxShadow: COLORS.badgeGlow },
          '50%': { opacity: 0.95 },
        },
        '@keyframes botAnnounce-shimmer': {
          '0%': { backgroundPosition: '200% center' },
          '100%': { backgroundPosition: '-200% center' },
        },
        '@keyframes botAnnounce-fadeIn': {
          from: { opacity: 0, transform: 'translateY(16px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
        '@keyframes botAnnounce-fadeInShort': {
          from: { opacity: 0, transform: 'translateY(8px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
        '@keyframes botAnnounce-slideIn': {
          from: { opacity: 0, transform: 'translateX(32px)' },
          to: { opacity: 1, transform: 'translateX(0)' },
        },
        '@keyframes botAnnounce-msgIn': {
          from: { opacity: 0, transform: 'translateY(8px) scale(0.98)' },
          to: { opacity: 1, transform: 'translateY(0) scale(1)' },
        },
        '@keyframes botAnnounce-typing': {
          '0%, 60%, 100%': { transform: 'translateY(0)' },
          '30%': { transform: 'translateY(-4px)' },
        },
        '@keyframes botAnnounce-float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        '@keyframes botAnnounce-glow': {
          '0%, 100%': { opacity: 0.6 },
          '50%': { opacity: 1 },
        },
      }}
    >
      {/* Blob-формы на фоне */}
      <Box
        sx={{
          position: 'absolute',
          top: -80,
          left: -80,
          width: 400,
          height: 400,
          borderRadius: '50%',
          background: isDark ? 'rgba(59, 130, 246, 0.12)' : 'rgba(219, 234, 254, 0.4)',
          filter: 'blur(120px)',
          pointerEvents: 'none',
          display: { xs: 'none', md: 'block' },
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: -60,
          right: -60,
          width: 350,
          height: 350,
          borderRadius: '50%',
          background: isDark ? 'rgba(249, 115, 22, 0.1)' : 'rgba(254, 215, 170, 0.3)',
          filter: 'blur(100px)',
          pointerEvents: 'none',
          display: { xs: 'none', md: 'block' },
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          top: '40%',
          left: '10%',
          width: 200,
          height: 200,
          borderRadius: '50%',
          background: isDark ? 'rgba(34, 197, 94, 0.08)' : 'rgba(209, 250, 229, 0.25)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
          display: { xs: 'none', lg: 'block' },
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2, px: { xs: 2, sm: 3, md: 4 } }}>
        <Grid container spacing={{ xs: 5, md: 8 }} alignItems="center">
          {/* Левая часть */}
          <Grid size={{ xs: 12, md: 6 }}>
            {/* Бейдж */}
            <Box
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 0.5,
                mb: 3,
                px: 2,
                py: 1,
                borderRadius: 2,
                background: COLORS.badgeBg,
                color: '#fff',
                fontSize: '0.875rem',
                fontWeight: 700,
                letterSpacing: '0.05em',
                boxShadow: COLORS.badgeGlow,
                animation: 'botAnnounce-pulse 2s ease-in-out infinite',
              }}
            >
              {t('botAnnounce.badge', { defaultValue: 'НОВИНКА' })}
              <Box component="span" sx={{ fontSize: 20, lineHeight: 1 }}>🔥</Box>
            </Box>

            {/* Заголовок */}
            <Typography
              component="h2"
              variant="h1"
              sx={{
                fontSize: { xs: '2rem', sm: '2.75rem', md: '3.5rem' },
                fontWeight: 700,
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
                color: COLORS.textPrimary,
                mb: 3,
                textShadow: '0 2px 12px rgba(0, 0, 0, 0.08)',
                animation: 'botAnnounce-fadeIn 0.6s ease-out 0.1s both',
              }}
            >
              {t('botAnnounce.headline', { defaultValue: 'Знакомьтесь: ваш личный ' })}
              <Box
                component="span"
                sx={{
                  background: COLORS.headlineAccentGradient,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {t('botAnnounce.headlineAccent', { defaultValue: 'AI-помощник' })}
              </Box>
              {t('botAnnounce.headlineEnd', { defaultValue: '!' })}
            </Typography>

            {/* Описание */}
            <Typography
              sx={{
                fontSize: { xs: 17, sm: 20 },
                lineHeight: 1.7,
                color: textSecondary,
                maxWidth: 580,
                mb: 5,
                animation: 'botAnnounce-fadeIn 0.6s ease-out 0.25s both',
              }}
            >
              {t('botAnnounce.description', {
                defaultValue:
                  'Наш умный бот поможет вам на каждом этапе обучения — от записи на первое занятие до получения прав. Доступен 24/7 в Telegram и на сайте.',
              })}
            </Typography>

            {/* Список преимуществ — 2 колонки, иконки 40px с градиентом */}
            <Grid container spacing={{ xs: 2, sm: 2.5 }} sx={{ mb: 6 }}>
              {benefitKeys.map(({ key, Icon }, index) => (
                <Grid size={{ xs: 12, sm: 6 }} key={key}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2,
                      py: 1.25,
                      transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      animation: `botAnnounce-fadeInShort 0.5s ease-out ${0.35 + index * 0.06}s both`,
                      '&:hover': {
                        '& .benefit-icon-wrap': {
                          transform: 'translateY(-2px)',
                          boxShadow: '0 6px 16px rgba(0,0,0,0.15)',
                        },
                      },
                    }}
                  >
                    <Box
                      className="benefit-icon-wrap"
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: 2,
                        background: BENEFIT_ICON_GRADIENTS[index],
                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                      }}
                    >
                      <Icon sx={{ fontSize: 22, color: '#fff' }} />
                    </Box>
                    <Typography sx={{ fontSize: 17, fontWeight: 500, color: textPrimary }}>
                      {t(`botAnnounce.benefits.${key}`, {
                        defaultValue:
                          key === 'instant'
                            ? 'Мгновенные ответы на вопросы'
                            : key === 'booking'
                              ? 'Запись и перенос занятий онлайн'
                              : key === 'progress'
                                ? 'Отслеживание вашего прогресса'
                                : key === 'theory'
                                  ? 'Доступ к теории и тестам'
                                  : key === 'reminders'
                                    ? 'Умные напоминания о занятиях'
                                    : 'Поддержка в Telegram и на сайте',
                      })}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>

            {/* CTA */}
            <Box sx={{ animation: 'botAnnounce-fadeIn 0.6s ease-out 0.7s both' }}>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, alignItems: 'center', mb: 2 }}>
                <Button
                  component={Link}
                  to="/bot"
                  variant="contained"
                  size="large"
                  endIcon={<ArrowForwardRoundedIcon sx={{ fontSize: 22 }} />}
                  sx={{
                    height: 60,
                    px: 4,
                    py: 2,
                    borderRadius: 2,
                    background: COLORS.ctaGradient,
                    backgroundSize: '200% 200%',
                    color: '#fff',
                    fontSize: 17,
                    fontWeight: 600,
                    boxShadow: COLORS.ctaShadow,
                    transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s ease',
                    '&:hover': {
                      background: COLORS.ctaGradient,
                      transform: 'scale(1.03)',
                      boxShadow: COLORS.ctaShadowHover,
                    },
                  }}
                >
                  {t('botAnnounce.cta', { defaultValue: 'Начать общение с ботом' })}
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  startIcon={<PlayCircleOutlineRoundedIcon />}
                  onClick={() => setShowHowItWorks(true)}
                  sx={{
                    height: 60,
                    px: 3,
                    borderRadius: 2,
                    border: '2px solid',
                    borderColor: 'divider',
                    color: 'text.secondary',
                    fontSize: 17,
                    fontWeight: 500,
                    '&:hover': {
                      borderColor: 'primary.main',
                      color: 'primary.main',
                      bgcolor: isDark ? 'action.hover' : 'rgba(255,255,255,0.8)',
                    },
                  }}
                >
                  {t('botAnnounce.ctaSecondary', { defaultValue: 'Как это работает?' })}
                </Button>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap' }}>
                {/* Мини-аватарки (социальное доказательство) */}
                <Box sx={{ display: 'flex' }}>
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Box
                      key={i}
                      sx={{
                        width: 32,
                        height: 32,
                        borderRadius: '50%',
                        border: '2px solid',
                        borderColor: 'background.paper',
                        ml: i > 1 ? -1.5 : 0,
                        background: `linear-gradient(135deg, ${['#3b82f6', '#8b5cf6', '#22c55e', '#f59e0b', '#f97316'][i - 1]}, #94a3b8)`,
                        boxShadow: 1,
                      }}
                    />
                  ))}
                </Box>
                <Typography sx={{ fontSize: 15, color: textMuted }}>
                  ⚡ {t('botAnnounce.ctaHint', { defaultValue: 'Уже помог 500+ ученикам' })}
                </Typography>
              </Box>
            </Box>
          </Grid>

          {/* Правая часть: мокап чата с 3D и улучшенным UI */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Box
              sx={{
                position: 'relative',
                animation: 'botAnnounce-slideIn 0.9s ease-out 0.3s both',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {/* Плавающие иконки вокруг чата (desktop) */}
              <Box
                sx={{
                  position: 'absolute',
                  top: -20,
                  right: { xs: 10, md: 60 },
                  animation: 'botAnnounce-float 3s ease-in-out infinite',
                  color: isDark ? 'primary.main' : 'rgba(59, 130, 246, 0.5)',
                  opacity: isDark ? 0.6 : 1,
                  display: { xs: 'none', md: 'block' },
                }}
              >
                <DirectionsCarRoundedIcon sx={{ fontSize: 48 }} />
              </Box>
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 40,
                  left: { xs: 10, md: 20 },
                  animation: 'botAnnounce-float 3s ease-in-out infinite 0.5s',
                  color: isDark ? 'warning.main' : 'rgba(249, 115, 22, 0.4)',
                  opacity: isDark ? 0.5 : 1,
                  display: { xs: 'none', md: 'block' },
                }}
              >
                <TrafficRoundedIcon sx={{ fontSize: 40 }} />
              </Box>
              <Box
                sx={{
                  position: 'absolute',
                  top: '30%',
                  right: -10,
                  animation: 'botAnnounce-float 3s ease-in-out infinite 1s',
                  color: isDark ? 'success.main' : 'rgba(34, 197, 94, 0.4)',
                  opacity: isDark ? 0.5 : 1,
                  display: { xs: 'none', lg: 'block' },
                }}
              >
                <KeyRoundedIcon sx={{ fontSize: 36 }} />
              </Box>

              <Box
                sx={{
                  width: '100%',
                  maxWidth: { xs: 360, sm: 420, md: 480 },
                  perspective: '1000px',
                  position: 'relative',
                  '& > *': {
                    transform: 'rotateY(-4deg) rotateX(2deg)',
                    transformStyle: 'preserve-3d',
                  },
                }}
              >
                {/* Notification badge */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: -8,
                    right: { xs: 8, md: 16 },
                    zIndex: 1,
                    width: 28,
                    height: 28,
                    borderRadius: '50%',
                    bgcolor: '#ef4444',
                    color: '#fff',
                    fontSize: 14,
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 2px 8px rgba(239, 68, 68, 0.5)',
                  }}
                >
                  3
                </Box>
                <Box
                  sx={{
                    borderRadius: 4,
                    overflow: 'hidden',
                    background: isDark
                      ? 'linear-gradient(180deg, rgba(30, 41, 59, 0.98) 0%, rgba(15, 23, 42, 0.98) 100%)'
                      : 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)',
                    boxShadow: isDark
                      ? '0 20px 60px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255,255,255,0.08)'
                      : '0 20px 60px rgba(0, 0, 0, 0.12), 0 8px 24px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(0, 0, 0, 0.04)',
                    border: '1px solid',
                    borderColor: 'divider',
                  }}
                >
                  {/* Шапка чата */}
                  <Box
                    sx={{
                      p: 2.5,
                      background: isDark ? 'rgba(51, 65, 85, 0.5)' : 'linear-gradient(180deg, #f8fafc 0%, #fff 100%)',
                      borderBottom: '1px solid',
                      borderColor: 'divider',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2,
                    }}
                  >
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: '50%',
                        background: COLORS.headlineAccentGradient,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative',
                      }}
                    >
                      <SmartToyRoundedIcon sx={{ color: '#fff', fontSize: 24 }} />
                      <Box
                        sx={{
                          position: 'absolute',
                          bottom: 2,
                          right: 2,
                          width: 10,
                          height: 10,
                          borderRadius: '50%',
                          bgcolor: '#22c55e',
                          border: '2px solid #fff',
                        }}
                      />
                    </Box>
                    <Box>
                      <Typography sx={{ fontWeight: 700, fontSize: 16, color: 'text.primary' }}>
                        {t('botAnnounce.chatTitle', { defaultValue: 'AI-Ассистент' })} 🤖
                      </Typography>
                      <Typography sx={{ fontSize: 12, color: 'text.secondary' }}>
                        {t('botAnnounce.chatStatus', { defaultValue: 'Онлайн • отвечает мгновенно' })}
                      </Typography>
                    </Box>
                  </Box>

                  {/* Сообщения */}
                  <Box sx={{ p: 2.5 }}>
                    {chatMessages.slice(0, 2).map((msgKey, i) => (
                      <Box
                        key={msgKey}
                        sx={{
                          mb: 1.5,
                          animation: `botAnnounce-msgIn 0.4s ease-out ${0.6 + i * 0.2}s both`,
                        }}
                      >
                        <Box
                          sx={{
                            display: 'inline-block',
                            maxWidth: '90%',
                            px: 2,
                            py: 1.5,
                            borderRadius: '18px 18px 18px 4px',
                            background: bubbleBg,
                            color: textPrimary,
                            fontSize: 15,
                            lineHeight: 1.45,
                            boxShadow: isDark ? '0 2px 12px rgba(0,0,0,0.3)' : COLORS.bubbleShadow,
                          }}
                        >
                          {t(msgKey, {
                            defaultValue:
                              i === 0
                                ? 'Привет! Я помогу тебе записаться на занятия 👋'
                                : 'Когда тебе удобно заниматься?',
                          })}
                        </Box>
                      </Box>
                    ))}

                    {/* Кнопки-опции (2x2) */}
                    <Box
                      sx={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: 1,
                        mt: 1.5,
                        animation: 'botAnnounce-msgIn 0.4s ease-out 1s both',
                      }}
                    >
                      {chatOptionKeys.map((optKey, i) => (
                        <Box
                          key={optKey}
                          sx={{
                            py: 1.25,
                            px: 1.5,
                            borderRadius: 2,
                            border: '2px solid',
                            borderColor: isDark ? 'rgba(255,255,255,0.12)' : '#e2e8f0',
                            bgcolor: isDark ? 'rgba(30,41,59,0.6)' : '#fff',
                            fontSize: 14,
                            fontWeight: 500,
                            color: textPrimary,
                            textAlign: 'center',
                            transition: 'border-color 0.2s, box-shadow 0.2s',
                            '&:hover': {
                              borderColor: COLORS.accentBlue,
                              boxShadow: '0 2px 8px rgba(59, 130, 246, 0.15)',
                            },
                          }}
                        >
                          {chatOptionEmoji[i]} {t(`botAnnounce.chatOptions.${optKey}`)}
                        </Box>
                      ))}
                    </Box>

                    {/* Typing indicator */}
                    <Box sx={{ display: 'flex', gap: 0.75, alignItems: 'center', mt: 2, pl: 1 }}>
                      {[0, 1, 2].map((i) => (
                        <Box
                          key={i}
                          sx={{
                            width: 8,
                            height: 8,
                            borderRadius: '50%',
                            bgcolor: textMuted,
                            animation: `botAnnounce-typing 1.2s ease-in-out infinite ${i * 0.15}s`,
                          }}
                        />
                      ))}
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* Модалка */}
      {showHowItWorks && (
        <Box
          onClick={() => setShowHowItWorks(false)}
          sx={{
            position: 'fixed',
            inset: 0,
            bgcolor: 'rgba(0,0,0,0.6)',
            zIndex: 1300,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            p: 2,
          }}
        >
          <Box
            onClick={(e) => e.stopPropagation()}
            sx={{
              bgcolor: 'background.paper',
              borderRadius: 3,
              p: 3,
              maxWidth: 440,
              boxShadow: 24,
              border: '1px solid',
              borderColor: 'divider',
            }}
          >
            <Typography variant="h6" sx={{ mb: 2, color: textPrimary }}>
              {t('botAnnounce.howItWorks.title', { defaultValue: 'Как это работает' })}
            </Typography>
            <Typography sx={{ color: textSecondary, mb: 3, lineHeight: 1.6 }}>
              {t('botAnnounce.howItWorks.text', {
                defaultValue:
                  'Нажмите «Начать общение с ботом» — откроется чат на сайте. Войдите через Google или начните без входа. Бот задаст несколько вопросов и поможет записаться на занятие или ответить на вопросы об обучении.',
              })}
            </Typography>
            <Button
              variant="contained"
              onClick={() => setShowHowItWorks(false)}
              sx={{ borderRadius: 2, background: COLORS.ctaGradient }}
            >
              {t('botAnnounce.howItWorks.close', { defaultValue: 'Понятно' })}
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
}
