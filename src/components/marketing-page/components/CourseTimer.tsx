import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useTranslation } from 'react-i18next';

interface CourseTimerProps {
  nextCourseDate?: Date;
  variant?: 'default' | 'landing';
}

export default function CourseTimer({ 
  nextCourseDate = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // Default: 3 days from now
  variant = 'default'
}: CourseTimerProps) {
  const { t, i18n } = useTranslation();
  const [timeLeft, setTimeLeft] = React.useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  React.useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = nextCourseDate.getTime() - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, [nextCourseDate]);

  const formatDate = (date: Date) => {
    // Map i18n language codes to locale codes
    const localeMap: { [key: string]: string } = {
      'ru': 'ru-RU',
      'et': 'et-EE',
      'en': 'en-US',
    };
    const locale = localeMap[i18n.language] || 'et-EE';
    
    return date.toLocaleDateString(locale, { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });
  };

  const isLanding = variant === 'landing';
  const LANDING_GREEN = '#34D186';
  const LANDING_GREEN_DARK = '#2AB673';

  return (
    <Card
      sx={{
        background: 'rgba(15, 32, 39, 0.9)',
        backdropFilter: 'blur(20px)',
        border: '2px solid rgba(59, 130, 246, 0.3)',
        borderRadius: '20px',
        p: { xs: 3, sm: 4 },
        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5)',
      }}
    >
      <CardContent sx={{ p: 0 }}>
        {/* Course Header */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2.5 }}>
          <Box
            sx={{
              width: 48,
              height: 48,
              background: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.5rem',
            }}
          >
            📅
          </Box>
          <Typography 
            variant="h6" 
            component="h3" 
            sx={{ 
              fontWeight: 700, 
              color: 'white',
              fontSize: '1.25rem'
            }}
          >
            {t('timer.title', { defaultValue: 'Järgmine kursus algab' })}
          </Typography>
        </Box>

        {/* Course Date */}
        <Typography 
          variant="body2" 
          sx={{ 
            color: 'rgba(255, 255, 255, 0.7)', 
            fontSize: '0.95rem',
            mb: 3
          }}
        >
          {formatDate(nextCourseDate)}
        </Typography>

        {/* Countdown Grid */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(4, 1fr)' },
            gap: 1.5,
            mb: 2.5,
          }}
        >
          {[
            { value: timeLeft.days, label: t('timer.days', { defaultValue: 'päeva' }) },
            { value: timeLeft.hours, label: t('timer.hours', { defaultValue: 'tundi' }) },
            { value: timeLeft.minutes, label: t('timer.minutes', { defaultValue: 'minutit' }) },
            { value: timeLeft.seconds, label: t('timer.seconds', { defaultValue: 'sekundit' }) },
          ].map((item, index) => (
            <Box
              key={index}
              sx={{
                textAlign: 'center',
                p: 2,
                background: 'rgba(59, 130, 246, 0.1)',
                borderRadius: '12px',
                border: '1px solid rgba(59, 130, 246, 0.2)',
              }}
            >
              <Typography
                component="div"
                sx={{
                  fontSize: '2rem',
                  fontWeight: 700,
                  color: '#3b82f6',
                  lineHeight: 1,
                  mb: 1,
                }}
              >
                {item.value}
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  fontSize: '0.75rem',
                  color: 'rgba(255, 255, 255, 0.6)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                }}
              >
                {item.label}
              </Typography>
            </Box>
          ))}
        </Box>

        {/* Register Text */}
        <Typography
          variant="body2"
          sx={{
            textAlign: 'center',
            color: 'rgba(255, 255, 255, 0.7)',
            fontSize: '0.875rem',
          }}
        >
          {t('timer.subtitle', { defaultValue: 'Jõua registreeruda enne kursuse algust!' })}
        </Typography>
      </CardContent>
    </Card>
  );
}

