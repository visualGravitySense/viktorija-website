import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import Container from '@mui/material/Container';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';
import { TelegramService } from '../services/telegramService';
import { trackButtonClick } from '../lib/analytics';
import SEO from '../components/shared/SEO';
import SEOHeading from '../components/shared/SEOHeading';

const STRIPE_PAYMENT_URL = 'https://buy.stripe.com/14A28s0Fs4lycgtg1i3ZK00';

export default function RegistrationPage() {
  const { t, i18n } = useTranslation();
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [submitting, setSubmitting] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!firstName.trim() || !lastName.trim() || !phone.trim() || !email.trim()) {
      setError(t('registration.error_send'));
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError(t('registration.error_send'));
      return;
    }
    setSubmitting(true);
    setError('');
    try {
      await TelegramService.notifyWebsiteRegistration({
        name: `${firstName.trim()} ${lastName.trim()}${message.trim() ? ` — ${message.trim()}` : ''}`,
        email: email.trim(),
        phone: phone.trim(),
      });
      setSuccess(true);
    } catch {
      setError(t('registration.error_send'));
    } finally {
      setSubmitting(false);
    }
  };

  const handlePayNow = () => {
    trackButtonClick('registration_pay_now', 'payment', 'registration_page', t('registration.pay_now'), STRIPE_PAYMENT_URL);
    window.open(STRIPE_PAYMENT_URL, '_blank');
  };

  return (
    <Box sx={{ minHeight: '100vh', py: 4 }}>
      <SEO
        title={t('registration.title')}
        description={t('registration.subtitle')}
        ogUrl="https://viktorijaautokool.ee/register"
        canonicalUrl="https://viktorijaautokool.ee/register"
        language={i18n.language}
      />
      <SEOHeading />
      <Container maxWidth="sm">
        <Card sx={{ overflow: 'visible' }}>
          <CardContent sx={{ p: 3 }}>
            {!success ? (
              <>
                <Typography component="h1" variant="h5" gutterBottom fontWeight={600}>
                  {t('registration.title')}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {t('registration.subtitle')}
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    label={t('registration.first_name')}
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    autoFocus
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    label={t('registration.last_name')}
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    label={t('registration.phone')}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+372 53464508"
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    type="email"
                    label={t('registration.email')}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <TextField
                    margin="normal"
                    fullWidth
                    multiline
                    rows={2}
                    label={t('registration.message')}
                    placeholder={t('registration.message_placeholder')}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                  {error && (
                    <Alert severity="error" sx={{ mt: 2 }}>
                      {error}
                    </Alert>
                  )}
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    disabled={submitting}
                    sx={{
                      mt: 3,
                      mb: 1,
                      py: 1.5,
                      fontWeight: 600,
                      background: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
                      '&:hover': {
                        background: 'linear-gradient(45deg, #1565c0 30%, #1976d2 90%)',
                      },
                    }}
                  >
                    {submitting ? t('registration.submitting') : t('registration.submit')}
                  </Button>
                </Box>
              </>
            ) : (
              <>
                <Typography component="h1" variant="h5" gutterBottom fontWeight={600} color="success.main">
                  {t('registration.success_title')}
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  {t('registration.success_text')}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  <Button
                    variant="contained"
                    onClick={handlePayNow}
                    sx={{
                      fontWeight: 600,
                      background: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
                      '&:hover': {
                        background: 'linear-gradient(45deg, #1565c0 30%, #1976d2 90%)',
                      },
                    }}
                  >
                    {t('registration.pay_now')}
                  </Button>
                  <Button
                    variant="outlined"
                    component={RouterLink}
                    to="/"
                    sx={{ fontWeight: 600 }}
                  >
                    {t('registration.pay_later')}
                  </Button>
                </Box>
              </>
            )}
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}
