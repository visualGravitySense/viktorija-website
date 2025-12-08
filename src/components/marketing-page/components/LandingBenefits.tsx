import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useTranslation } from 'react-i18next';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import SavingsIcon from '@mui/icons-material/Savings';
import PublicIcon from '@mui/icons-material/Public';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import WorkIcon from '@mui/icons-material/Work';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AssignmentIcon from '@mui/icons-material/Assignment';
import SchoolIcon from '@mui/icons-material/School';

const LANDING_GREEN = '#34D186';
const LANDING_GREEN_DARK = '#2AB673';

interface Benefit {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface LandingBenefitsProps {
  variant?: 'why-choose' | 'what-you-get';
}

export default function LandingBenefits({ variant = 'why-choose' }: LandingBenefitsProps) {
  const { t } = useTranslation();

  // "Why choose" benefits (4 cards) - Bolt driver focused
  const whyChooseBenefits: Benefit[] = [
    {
      icon: <FlashOnIcon sx={{ fontSize: 48, color: '#FF6B35' }} />,
      title: t('landing.why_choose.quick_start.title', { defaultValue: 'Kiire alustamine' }),
      description: t('landing.why_choose.quick_start.description', { 
        defaultValue: 'Täielik koolitus 2 nädala jooksul. Kõik dokumendid ja litsents korras' 
      }),
    },
    {
      icon: <AttachMoneyIcon sx={{ fontSize: 48, color: '#FFB800' }} />,
      title: t('landing.why_choose.earn_money.title', { defaultValue: 'Teenid kohe raha' }),
      description: t('landing.why_choose.earn_money.description', { 
        defaultValue: 'Bolt juhid teenivad keskmiselt 15-25€/tund. Paindlik töögraafik' 
      }),
    },
    {
      icon: <AssignmentIcon sx={{ fontSize: 48, color: '#8B6F47' }} />,
      title: t('landing.why_choose.all_in_one.title', { defaultValue: 'Kõik ühest kohast' }),
      description: t('landing.why_choose.all_in_one.description', { 
        defaultValue: 'Aitame hankida takso litsentsi, registreerida Boltis ja alustada tööd' 
      }),
    },
    {
      icon: <SchoolIcon sx={{ fontSize: 48, color: '#4A90E2' }} />,
      title: t('landing.why_choose.experienced_instructors.title', { defaultValue: 'Kogenud juhendajad' }),
      description: t('landing.why_choose.experienced_instructors.description', { 
        defaultValue: 'Õpetame kõik praktilised nippe ja linna parimad marsruudid' 
      }),
    },
  ];

  // "What you'll get" benefits (6 cards) - General benefits
  const whatYouGetBenefits: Benefit[] = [
    {
      icon: <DirectionsCarIcon sx={{ fontSize: 48, color: '#1976D2' }} />,
      title: t('benefits.freedom.title', { defaultValue: 'Freedom of Movement' }),
      description: t('benefits.freedom.description', { 
        defaultValue: 'Move anytime, anywhere, without depending on public transport' 
      }),
    },
    {
      icon: <SavingsIcon sx={{ fontSize: 48, color: '#2E7D32' }} />,
      title: t('benefits.savings.title', { defaultValue: 'Save Money' }),
      description: t('benefits.savings.description', { 
        defaultValue: 'Save on taxis and public transport. Payback already in the first year' 
      }),
    },
    {
      icon: <PublicIcon sx={{ fontSize: 48, color: '#1976D2' }} />,
      title: t('benefits.travel.title', { defaultValue: 'Travel' }),
      description: t('benefits.travel.description', { 
        defaultValue: 'Travel around Estonia and Europe in your own car' 
      }),
    },
    {
      icon: <EmojiEventsIcon sx={{ fontSize: 48, color: '#FFB800' }} />,
      title: t('benefits.confidence.title', { defaultValue: 'Confidence' }),
      description: t('benefits.confidence.description', { 
        defaultValue: 'Become a confident driver with 95% first-time exam success rate' 
      }),
    },
    {
      icon: <WorkIcon sx={{ fontSize: 48, color: '#7B1FA2' }} />,
      title: t('benefits.career.title', { defaultValue: 'Career' }),
      description: t('benefits.career.description', { 
        defaultValue: 'Open new career opportunities that require a driver\'s license' 
      }),
    },
    {
      icon: <CheckCircleIcon sx={{ fontSize: 48, color: '#2E7D32' }} />,
      title: t('benefits.independence.title', { defaultValue: 'Independence' }),
      description: t('benefits.independence.description', { 
        defaultValue: 'Achieve complete independence and freedom of movement' 
      }),
    },
  ];

  const benefits = variant === 'why-choose' ? whyChooseBenefits : whatYouGetBenefits;
  const title = variant === 'why-choose' 
    ? t('landing.why_choose.title', { defaultValue: 'Miks valida Viktorija Autokool?' })
    : t('benefits.title', { defaultValue: 'What You\'ll Get' });
  const subtitle = variant === 'why-choose' 
    ? undefined
    : t('benefits.subtitle', { defaultValue: 'Benefits of learning at our driving school' });

  return (
    <Box
      sx={{
        py: { xs: 8, sm: 10 },
        bgcolor: '#FFFFFF',
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h2"
          component="h2"
          textAlign="center"
          sx={{
            mb: subtitle ? 2 : 6,
            fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
            fontWeight: 700,
            color: LANDING_GREEN_DARK,
          }}
        >
          {title}
        </Typography>
        {subtitle && (
          <Typography
            variant="h6"
            textAlign="center"
            sx={{ 
              mb: 6, 
              maxWidth: '700px', 
              mx: 'auto',
              color: 'text.secondary'
            }}
          >
            {subtitle}
          </Typography>
        )}

        <Grid container spacing={3}>
          {benefits.map((benefit, index) => (
            <Grid size={{ xs: 12, sm: 6, md: variant === 'why-choose' ? 3 : 4 }} key={index}>
              <Card
                sx={{
                  height: '100%',
                  bgcolor: '#f8f9fa',
                  borderRadius: '12px',
                  transition: 'all 0.3s ease',
                  border: 'none',
                  boxShadow: 'none',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 5px 20px rgba(0,0,0,0.1)',
                  },
                }}
              >
                <CardContent sx={{ p: 3, textAlign: 'center' }}>
                  <Box 
                    sx={{ 
                      mb: 2, 
                      display: 'flex', 
                      justifyContent: 'center',
                      alignItems: 'center',
                      minHeight: '60px'
                    }}
                  >
                    {benefit.icon}
                  </Box>
                  <Typography 
                    variant="h6" 
                    component="h3" 
                    gutterBottom 
                    sx={{ 
                      fontWeight: 600,
                      fontSize: { xs: '1.1rem', sm: '1.3rem' },
                      color: LANDING_GREEN_DARK,
                      mb: 1.5
                    }}
                  >
                    {benefit.title}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      color: '#666666',
                      lineHeight: 1.6,
                      fontSize: { xs: '0.9rem', sm: '1rem' }
                    }}
                  >
                    {benefit.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
