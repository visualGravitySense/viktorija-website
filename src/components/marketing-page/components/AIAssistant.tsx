import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { styled, keyframes } from '@mui/material/styles';
import {
  AntiDesignBox,
  AntiDesignTypography,
  FloatingIcon,
  GradientText,
} from '../styles/antiDesign';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import PsychologyIcon from '@mui/icons-material/Psychology';
import StarIcon from '@mui/icons-material/Star';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import EmailIcon from '@mui/icons-material/Email';
import { useTranslation } from 'react-i18next';
import { trackButtonClick } from '../../../lib/analytics';

const floatAnimation = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const pulseAnimation = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const rotateAnimation = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

interface Feature {
  title: string;
  description: string;
  icon: 'smartToy' | 'autoAwesome' | 'psychology' | 'star' | 'rocketLaunch';
}

interface AIAssistantProps {
  title: string;
  subtitle: string;
  features: Feature[];
  quote: {
    text: string;
    author: string;
    position: string;
  };
  buttonText: string;
  buttonLink?: string;
}

const StyledCard = styled(Card)(({ theme }) => ({
  position: 'relative',
  padding: theme.spacing(3),
  borderRadius: '16px',
  background: theme.palette.mode === 'dark'
    ? 'rgba(18, 18, 18, 0.8)'
    : 'rgba(255, 255, 255, 0.8)',
  backdropFilter: 'blur(10px)',
  boxShadow: theme.palette.mode === 'dark'
    ? '0 8px 32px rgba(0, 0, 0, 0.4)'
    : '0 8px 32px rgba(0, 0, 0, 0.1)',
  border: '1px solid',
  borderColor: theme.palette.mode === 'dark'
    ? 'rgba(255, 255, 255, 0.1)'
    : 'rgba(0, 0, 0, 0.1)',
  transition: 'all 0.3s ease',
  overflow: 'hidden',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: theme.palette.mode === 'dark'
      ? '0 12px 40px rgba(0, 0, 0, 0.5)'
      : '0 12px 40px rgba(0, 0, 0, 0.15)',
    background: theme.palette.mode === 'dark'
      ? 'rgba(18, 18, 18, 0.9)'
      : 'rgba(255, 255, 255, 0.9)',
    '& .feature-icon': {
      transform: 'scale(1.1) rotate(5deg)',
    },
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'url("/pattern.png")',
    opacity: theme.palette.mode === 'dark' ? 0.03 : 0.05,
    borderRadius: '16px',
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    top: -50,
    right: -50,
    width: '100px',
    height: '100px',
    background: `radial-gradient(circle, ${theme.palette.primary.main} 0%, transparent 70%)`,
    opacity: 0.1,
    animation: `${rotateAnimation} 20s linear infinite`,
  },
}));

const FeatureIcon = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '48px',
  height: '48px',
  borderRadius: '12px',
  background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  marginBottom: theme.spacing(2),
  transition: 'all 0.3s ease',
  '& svg': {
    color: theme.palette.primary.contrastText,
    fontSize: '24px',
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  position: 'relative',
  padding: '12px 24px',
  background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  color: theme.palette.primary.contrastText,
  borderRadius: '8px',
  fontWeight: 600,
  textTransform: 'none',
  boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
  transition: 'all 0.3s ease',
  overflow: 'hidden',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 20px rgba(0,0,0,0.3)',
    '&::before': {
      transform: 'scale(1.1)',
    },
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'url("/pattern.png")',
    opacity: 0.1,
    transition: 'all 0.3s ease',
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    top: -50,
    right: -50,
    width: '100px',
    height: '100px',
    background: `radial-gradient(circle, ${theme.palette.primary.main} 0%, transparent 70%)`,
    opacity: 0.2,
    animation: `${rotateAnimation} 20s linear infinite`,
  },
}));

const QuoteBox = styled(Box)(({ theme }) => ({
  position: 'relative',
  padding: theme.spacing(3),
  borderRadius: '16px',
  background: theme.palette.mode === 'dark'
    ? 'rgba(18, 18, 18, 0.8)'
    : 'rgba(255, 255, 255, 0.8)',
  backdropFilter: 'blur(10px)',
  border: '1px solid',
  borderColor: theme.palette.mode === 'dark'
    ? 'rgba(255, 255, 255, 0.1)'
    : 'rgba(0, 0, 0, 0.1)',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'url("/pattern.png")',
    opacity: theme.palette.mode === 'dark' ? 0.03 : 0.05,
    borderRadius: '16px',
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    top: -50,
    right: -50,
    width: '100px',
    height: '100px',
    background: `radial-gradient(circle, ${theme.palette.primary.main} 0%, transparent 70%)`,
    opacity: 0.1,
    animation: `${rotateAnimation} 20s linear infinite`,
  },
}));

const BackgroundGradient = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: `radial-gradient(circle at 50% 0%, ${theme.palette.primary.main} 0%, transparent 50%),
               radial-gradient(circle at 100% 100%, ${theme.palette.secondary.main} 0%, transparent 50%)`,
  opacity: 0.1,
  pointerEvents: 'none',
}));

export default function AIAssistant({
  title = "Your Tireless Digital Team Member",
  subtitle = "TIDIO AI integration answers questions, books appointments, and guides students—even at 2 AM.",
  features = [
    {
      title: 'Instant Responses',
      description: 'to FAQs about courses, pricing, and requirements',
      icon: 'smartToy',
    },
    {
      title: 'Intelligent Scheduling',
      description: 'that syncs with your availability in real-time',
      icon: 'autoAwesome',
    },
    {
      title: 'Lead Qualification',
      description: 'to prioritize serious prospects',
      icon: 'psychology',
    },
    {
      title: 'Personalized Follow-ups',
      description: 'based on prospect behavior',
      icon: 'star',
    },
    {
      title: 'Multilingual Support',
      description: 'to serve diverse student populations',
      icon: 'rocketLaunch',
    },
  ],
  quote = {
    text: "Our inquiry-to-enrollment conversion jumped 47% after implementing the AI assistant. It pays for itself many times over.",
    author: "James Liu",
    position: "Executive Director, Global Language Institute",
  },
  buttonText = "See the AI Assistant in Action →",
  buttonLink = "#",
}: AIAssistantProps) {
  const { t } = useTranslation();
  
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'smartToy':
        return <SmartToyIcon />;
      case 'autoAwesome':
        return <AutoAwesomeIcon />;
      case 'psychology':
        return <PsychologyIcon />;
      case 'star':
        return <StarIcon />;
      case 'rocketLaunch':
        return <RocketLaunchIcon />;
      default:
        return <SmartToyIcon />;
    }
  };

  return (
    <Box sx={{ position: 'relative', py: { xs: 8, sm: 16 }, overflow: 'hidden' }}>
      <BackgroundGradient />
      
      <FloatingIcon sx={{ top: -30, left: -30, animation: `${floatAnimation} 3s ease-in-out infinite` }}>
        <SmartToyIcon sx={{ color: 'white', fontSize: 30 }} />
      </FloatingIcon>
      
      <FloatingIcon sx={{ top: 50, right: -30, animation: `${floatAnimation} 3s ease-in-out infinite 1s` }}>
        <AutoAwesomeIcon sx={{ color: 'white', fontSize: 30 }} />
      </FloatingIcon>
      
      <FloatingIcon sx={{ bottom: -30, left: '40%', animation: `${floatAnimation} 3s ease-in-out infinite 2s` }}>
        <PsychologyIcon sx={{ color: 'white', fontSize: 30 }} />
      </FloatingIcon>

      <FloatingIcon sx={{ top: '20%', right: '20%', animation: `${pulseAnimation} 2s ease-in-out infinite` }}>
        <StarIcon sx={{ color: 'white', fontSize: 20 }} />
      </FloatingIcon>

      <FloatingIcon sx={{ top: '60%', left: '20%', animation: `${pulseAnimation} 2s ease-in-out infinite 1s` }}>
        <RocketLaunchIcon sx={{ color: 'white', fontSize: 20 }} />
      </FloatingIcon>

      <FloatingIcon sx={{ bottom: '20%', right: '30%', animation: `${pulseAnimation} 2s ease-in-out infinite 2s` }}>
        <LightbulbIcon sx={{ color: 'white', fontSize: 20 }} />
      </FloatingIcon>

      <Container>
        <Stack spacing={4} alignItems="center">
          <Box sx={{ width: { sm: '100%', md: '60%' }, position: 'relative', zIndex: 1 }}>
            <GradientText variant="h2" gutterBottom align="center" sx={{ animation: `${pulseAnimation} 3s ease-in-out infinite` }}>
              {title}
            </GradientText>
            <AntiDesignTypography variant="h5" align="center" sx={{ mb: { xs: 2, sm: 4 } }}>
              {subtitle}
            </AntiDesignTypography>
          </Box>

          <Grid container spacing={3}>
            {features.map((feature, index) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
                <StyledCard>
                  <FeatureIcon className="feature-icon">
                    {getIcon(feature.icon)}
                  </FeatureIcon>
                  <Typography
                    variant="h6"
                    sx={{ color: 'text.primary', mb: 1 }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ color: 'text.secondary' }}
                  >
                    {feature.description}
                  </Typography>
                </StyledCard>
              </Grid>
            ))}
          </Grid>

          <QuoteBox sx={{ maxWidth: '600px', textAlign: 'center' }}>
            <Typography
              variant="body1"
              sx={{ color: 'text.secondary', fontStyle: 'italic' }}
            >
              "{quote.text}" — {quote.author}, {quote.position}
            </Typography>
          </QuoteBox>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center" alignItems="center">
            <StyledButton 
              variant="contained" 
              size="large" 
              href={buttonLink}
              onClick={() => {
                // Check if buttonLink is a Stripe payment link
                const isPayment = buttonLink && buttonLink.includes('buy.stripe.com');
                trackButtonClick(
                  'ai_assistant_cta',
                  isPayment ? 'payment' : 'info',
                  'ai_assistant',
                  buttonText,
                  buttonLink
                );
              }}
            >
              {buttonText}
            </StyledButton>
            <Button
              variant="outlined"
              size="large"
              startIcon={<EmailIcon />}
              href="mailto:viktorijaautokool@hot.ee?subject=Registratsioon%20autokooli"
              onClick={() => trackButtonClick(
                'ai_assistant_email',
                'info',
                'ai_assistant',
                t('common.send_email'),
                'mailto:viktorijaautokool@hot.ee?subject=Registratsioon%20autokooli'
              )}
              sx={{
                px: 4,
                py: 1.5,
                borderWidth: 2,
                '&:hover': {
                  borderWidth: 2,
                }
              }}
            >
              {t('common.send_email')}
            </Button>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
} 