import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useTranslation } from 'react-i18next';
import { styled } from '@mui/material/styles';
import { alpha } from '@mui/material/styles';
import EventIcon from '@mui/icons-material/Event';

const TimerBox = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(2),
  borderRadius: '12px',
  background: alpha(theme.palette.primary.main, 0.1),
  border: '2px solid',
  borderColor: theme.palette.primary.main,
}));

interface CourseTimerProps {
  nextCourseDate?: Date;
}

export default function CourseTimer({ 
  nextCourseDate = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000) // Default: 3 days from now
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

  return (
    <Box
      sx={{
        py: { xs: 4, sm: 6 },
        bgcolor: 'background.default',
      }}
    >
      <Container maxWidth="md">
        <Card
          sx={{
            background: (theme) =>
              `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(theme.palette.secondary?.main || theme.palette.primary.light, 0.1)} 100%)`,
            border: '2px solid',
            borderColor: 'primary.main',
          }}
        >
          <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 3 }}>
              <EventIcon sx={{ fontSize: 40, color: 'primary.main', mr: 1 }} />
              <Typography variant="h5" component="h3" sx={{ fontWeight: 700 }}>
                {t('timer.title', { defaultValue: 'Следующий курс начинается' })}
              </Typography>
            </Box>
            <Typography variant="h6" textAlign="center" color="text.secondary" sx={{ mb: 4 }}>
              {formatDate(nextCourseDate)}
            </Typography>

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                gap: 2,
                flexWrap: 'wrap',
              }}
            >
              <Box sx={{ minWidth: { xs: 'calc(50% - 8px)', sm: 'auto' }, flex: { xs: '0 1 calc(50% - 8px)', sm: '0 1 auto' } }}>
                <TimerBox>
                  <Typography variant="h3" component="div" sx={{ fontWeight: 700, color: 'primary.main' }}>
                    {timeLeft.days}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {t('timer.days', { defaultValue: 'дней' })}
                  </Typography>
                </TimerBox>
              </Box>
              <Box sx={{ minWidth: { xs: 'calc(50% - 8px)', sm: 'auto' }, flex: { xs: '0 1 calc(50% - 8px)', sm: '0 1 auto' } }}>
                <TimerBox>
                  <Typography variant="h3" component="div" sx={{ fontWeight: 700, color: 'primary.main' }}>
                    {timeLeft.hours}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {t('timer.hours', { defaultValue: 'часов' })}
                  </Typography>
                </TimerBox>
              </Box>
              <Box sx={{ minWidth: { xs: 'calc(50% - 8px)', sm: 'auto' }, flex: { xs: '0 1 calc(50% - 8px)', sm: '0 1 auto' } }}>
                <TimerBox>
                  <Typography variant="h3" component="div" sx={{ fontWeight: 700, color: 'primary.main' }}>
                    {timeLeft.minutes}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {t('timer.minutes', { defaultValue: 'минут' })}
                  </Typography>
                </TimerBox>
              </Box>
              <Box sx={{ minWidth: { xs: 'calc(50% - 8px)', sm: 'auto' }, flex: { xs: '0 1 calc(50% - 8px)', sm: '0 1 auto' } }}>
                <TimerBox>
                  <Typography variant="h3" component="div" sx={{ fontWeight: 700, color: 'primary.main' }}>
                    {timeLeft.seconds}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {t('timer.seconds', { defaultValue: 'секунд' })}
                  </Typography>
                </TimerBox>
              </Box>
            </Box>

            <Typography variant="body2" textAlign="center" color="text.secondary" sx={{ mt: 3 }}>
              {t('timer.subtitle', { defaultValue: 'Успейте записаться до начала курса!' })}
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}

