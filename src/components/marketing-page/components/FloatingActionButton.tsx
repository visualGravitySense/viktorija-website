import * as React from 'react';
import Fab from '@mui/material/Fab';
import Tooltip from '@mui/material/Tooltip';
import { useTheme, alpha } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import PhoneIcon from '@mui/icons-material/Phone';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { keyframes } from '@emotion/react';
import { trackButtonClick } from '../../../lib/analytics';

const pulse = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(25, 118, 210, 0.7);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(25, 118, 210, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(25, 118, 210, 0);
  }
`;

interface FloatingActionButtonProps {
  buttonLink?: string;
  phoneNumber?: string;
}

export default function FloatingActionButton({ 
  buttonLink = 'https://buy.stripe.com/14A28s0Fs4lycgtg1i3ZK00',
  phoneNumber = '+37253464508'
}: FloatingActionButtonProps) {
  const { t } = useTranslation();
  const theme = useTheme();
  const [showScrollTop, setShowScrollTop] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    trackButtonClick('scroll_to_top', 'info', 'floating_action_button', t('common.scroll_to_top', { defaultValue: 'Наверх' }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Main FAB - Register Button */}
      <Tooltip title={t('hero.home.button', { defaultValue: 'Записаться на курс' })} placement="left" arrow>
        <Fab
          color="primary"
          aria-label="register"
          component="a"
          href={buttonLink}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => {
            // Check if buttonLink is a Stripe payment link
            const isPayment = buttonLink && buttonLink.includes('buy.stripe.com');
            trackButtonClick(
              'floating_register_button',
              isPayment ? 'payment' : 'info',
              'floating_action_button',
              t('hero.home.button', { defaultValue: 'Записаться на курс' }),
              buttonLink
            );
          }}
          sx={(theme) => ({
            position: 'fixed',
            bottom: { xs: 80, sm: 24 },
            right: { xs: 16, sm: 24 },
            zIndex: 1000,
            background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary?.main || theme.palette.primary.light})`,
            color: theme.palette.primary.contrastText || '#ffffff',
            width: { xs: 56, sm: 64 },
            height: { xs: 56, sm: 64 },
            boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
            animation: `${pulse} 2s infinite`,
            '&:hover': {
              transform: 'scale(1.1)',
              boxShadow: '0 6px 25px rgba(0,0,0,0.4)',
            },
            transition: 'all 0.3s ease',
          })}
        >
          <PhoneIcon />
        </Fab>
      </Tooltip>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <Tooltip title={t('common.scroll_to_top', { defaultValue: 'Наверх' })} placement="left" arrow>
          <Fab
            size="small"
            aria-label="scroll to top"
            onClick={scrollToTop}
            sx={(theme) => ({
              position: 'fixed',
              bottom: { xs: 16, sm: 24 },
              right: { xs: 16, sm: 24 },
              zIndex: 999,
              bgcolor: alpha(theme.palette.background.paper, 0.9),
              backdropFilter: 'blur(10px)',
              border: '1px solid',
              borderColor: theme.palette.divider,
              '&:hover': {
                bgcolor: theme.palette.background.paper,
                transform: 'translateY(-4px)',
              },
              transition: 'all 0.3s ease',
            })}
          >
            <ArrowUpwardIcon />
          </Fab>
        </Tooltip>
      )}
    </>
  );
}

