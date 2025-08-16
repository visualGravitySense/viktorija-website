import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/X';
import SitemarkIcon from './SitemarkIcon';
import FacebookIcon from '@mui/icons-material/Facebook';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { useTranslation } from 'react-i18next';

function Copyright() {
  const { t } = useTranslation();
  return (
    <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
      {t('footer.copyright')}
      {' '}
      <Link color="text.secondary" href="https://viktorijaautokool.ee/">
        Viktorija Autokool Nõmme
      </Link>
      &nbsp;
      {new Date().getFullYear()}
      {' • '}
      <Link color="text.secondary" href="https://github.com/visualGravitySense" target="_blank" rel="noopener noreferrer">
        Created by Dmitri Gornakov
      </Link>
    </Typography>
  );
}

export default function Footer() {
  const { t } = useTranslation();
  
  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: { xs: 3, sm: 6 },
        py: { xs: 4, sm: 8 },
        textAlign: { xs: 'center', sm: 'left' },
        px: { xs: 2, sm: 3 },
      }}
    >
      {/* Contact Info Banner */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          gap: { xs: 1.5, sm: 4 },
          p: { xs: 1.5, sm: 2 },
          bgcolor: 'primary.light',
          borderRadius: 1,
          mb: { xs: 1, sm: 2 },
          color: 'primary.contrastText',
          flexWrap: 'wrap',
        }}
      >
        <Stack direction="row" spacing={1} alignItems="center">
          <PhoneIcon fontSize="small" />
          <Typography variant="body2" sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>
            {t('footer.phone')}: <Link href="tel:+37253464508" sx={{ color: 'inherit', fontWeight: 'bold' }}>+372 53464508</Link>
          </Typography>
        </Stack>
        
        <Stack direction="row" spacing={1} alignItems="center">
          <EmailIcon fontSize="small" />
          <Typography variant="body2" sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>
            {t('footer.email_address')}: <Link href="mailto:viktorijaautokool@hot.ee" sx={{ color: 'inherit', fontWeight: 'bold' }}>viktorijaautokool@hot.ee</Link>
          </Typography>
        </Stack>
        
        <Stack direction="row" spacing={1} alignItems="center">
          <FacebookIcon fontSize="small" />
          <Typography variant="body2" sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>
            {t('footer.facebook')}: <Link href="https://www.facebook.com/viktorija.autokool" target="_blank" rel="noopener noreferrer" sx={{ color: 'inherit', fontWeight: 'bold' }}>viktorija.autokool</Link>
          </Typography>
        </Stack>
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          width: '100%',
          justifyContent: 'space-between',
          gap: { xs: 4, sm: 6 },
        }}
      >
        {/* Newsletter Section */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            width: { xs: '100%', sm: '60%' },
          }}
        >
          <Typography variant="body2" gutterBottom sx={{ fontWeight: 600, fontSize: { xs: '1rem', sm: '1.1rem' } }}>
            {t('footer.subscribe')}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1, fontSize: { xs: '0.875rem', sm: '1rem' } }}>
            {t('footer.weekly_updates')}
          </Typography>
          <InputLabel htmlFor="email-newsletter" sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>{t('footer.email')}</InputLabel>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1} useFlexGap>
            <TextField
              id="email-newsletter"
              hiddenLabel
              size="small"
              variant="outlined"
              fullWidth
              aria-label={t('footer.your_email')}
              placeholder={t('footer.your_email')}
              slotProps={{
                htmlInput: {
                  autoComplete: 'off',
                  'aria-label': t('footer.your_email'),
                },
              }}
              sx={{ 
                width: { xs: '100%', sm: '250px' },
                '& .MuiInputBase-root': {
                  height: { xs: '40px', sm: '36px' }
                }
              }}
            />
            <Button
              variant="contained"
              color="primary"
              size="small"
              sx={{ 
                flexShrink: 0,
                height: { xs: '40px', sm: '36px' },
                width: { xs: '100%', sm: 'auto' }
              }}
            >
              {t('footer.subscribe_button')}
            </Button>
          </Stack>
        </Box>

        {/* Navigation Links - Hidden on mobile */}
        <Box
          sx={{
            display: { xs: 'none', sm: 'flex' },
            flexDirection: 'column',
            gap: 1,
          }}
        >
          <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
            {t('footer.product')}
          </Typography>
          <Link color="text.secondary" variant="body2" href="/#/features">
            {t('navigation.services')}
          </Link>
          <Link color="text.secondary" variant="body2" href="#testimonials">
            {t('navigation.reviews')}
          </Link>
          <Link color="text.secondary" variant="body2" href="#highlights">
            {t('navigation.advantages')}
          </Link>
          <Link color="text.secondary" variant="body2" href="#pricing">
            {t('navigation.prices')}
          </Link>
          <Link color="text.secondary" variant="body2" href="#faq">
            {t('navigation.questions')}
          </Link>
        </Box>

        {/* Company Links - Hidden on mobile */}
        <Box
          sx={{
            display: { xs: 'none', sm: 'flex' },
            flexDirection: 'column',
            gap: 1,
          }}
        >
          <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
            {t('footer.company')}
          </Typography>
          <Link color="text.secondary" variant="body2" href="/#/about">
            {t('navigation.about')}
          </Link>
          <Link color="text.secondary" variant="body2" href="#">
            {t('footer.jobs')}
          </Link>
          <Link color="text.secondary" variant="body2" href="#">
            {t('footer.press')}
          </Link>
        </Box>

        {/* Contact Links - Hidden on mobile */}
        <Box
          sx={{
            display: { xs: 'none', sm: 'flex' },
            flexDirection: 'column',
            gap: 1,
          }}
        >
          <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
            {t('footer.contacts')}
          </Typography>
          <Link color="text.secondary" variant="body2" href="tel:+37253464508">
            {t('footer.phone')}: +372 53464508
          </Link>
          <Link color="text.secondary" variant="body2" href="mailto:viktorijaautokool@hot.ee">
            {t('footer.email_address')}: viktorijaautokool@hot.ee
          </Link>
          <Link color="text.secondary" variant="body2" href="https://www.facebook.com/viktorija.autokool" target="_blank" rel="noopener noreferrer">
            {t('footer.facebook')}: viktorija.autokool
          </Link>
        </Box>
      </Box>

      {/* Bottom Section */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'space-between',
          alignItems: { xs: 'center', sm: 'flex-start' },
          pt: { xs: 3, sm: 6 },
          width: '100%',
          borderTop: '1px solid',
          borderColor: 'divider',
          gap: { xs: 2, sm: 0 },
        }}
      >
        <Box sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
          <Link color="text.secondary" variant="body2" href="#" sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>
            {t('footer.privacy_policy')}
          </Link>
          <Typography sx={{ display: 'inline', mx: 0.5, opacity: 0.5 }}>
            &nbsp;•&nbsp;
          </Typography>
          <Link color="text.secondary" variant="body2" href="#" sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>
            {t('footer.terms_of_service')}
          </Link>
          <Copyright />
        </Box>
        <Stack
          direction="row"
          spacing={1}
          useFlexGap
          sx={{ 
            justifyContent: 'center',
            color: 'text.secondary',
            mt: { xs: 1, sm: 0 }
          }}
        >
          <IconButton
            color="inherit"
            size="small"
            href="https://www.facebook.com/viktorija.autokool"
            aria-label="Facebook"
            target="_blank"
            rel="noopener noreferrer"
            sx={{ 
              alignSelf: 'center',
              '& svg': { fontSize: { xs: '1.5rem', sm: '1.25rem' } }
            }}
          >
            <FacebookIcon />
          </IconButton>
          <IconButton
            color="inherit"
            size="small"
            href="mailto:viktorijaautokool@hot.ee"
            aria-label="Email"
            sx={{ 
              alignSelf: 'center',
              '& svg': { fontSize: { xs: '1.5rem', sm: '1.25rem' } }
            }}
          >
            <EmailIcon />
          </IconButton>
          <IconButton
            color="inherit"
            size="small"
            href="tel:+37253464508"
            aria-label="Phone"
            sx={{ 
              alignSelf: 'center',
              '& svg': { fontSize: { xs: '1.5rem', sm: '1.25rem' } }
            }}
          >
            <PhoneIcon />
          </IconButton>
          <IconButton
            color="inherit"
            size="small"
            href="https://github.com/visualGravitySense"
            aria-label="GitHub"
            target="_blank"
            rel="noopener noreferrer"
            sx={{ 
              alignSelf: 'center',
              '& svg': { fontSize: { xs: '1.5rem', sm: '1.25rem' } }
            }}
          >
            <GitHubIcon />
          </IconButton>
        </Stack>
      </Box>
    </Container>
  );
}
