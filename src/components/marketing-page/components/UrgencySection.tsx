import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import EmailIcon from '@mui/icons-material/Email';
import { useTranslation } from 'react-i18next';
import PaymentButton from '../../shared/PaymentButton.tsx';

const StyledCard = styled(Card)(({ theme }) => ({
  marginTop: theme.spacing(4),
  padding: theme.spacing(4),
  backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)',
  border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
}));


interface UrgencySectionProps {
  title: string;
  subtitle: string;
  mainText: string;
  highlightText: string;
  mainTextContinuation: string;
  offerTitle: string;
  offerText: string;
  buttonText: string;
  buttonLink?: string;
  limitText?: string;
  category?: 'category-a' | 'category-b' | 'category-c';
  transmissionType?: 'manual' | 'automatic';
}

export default function UrgencySection({
  title,
  subtitle,
  mainText,
  highlightText,
  mainTextContinuation,
  offerTitle,
  offerText,
  buttonText,
  buttonLink = "#",
  limitText,
  category = 'category-a',
  transmissionType = 'manual'
}: UrgencySectionProps) {
  const { t } = useTranslation();
  
  return (
    <Container id="urgency" sx={{ py: { xs: 8, sm: 16 } }}>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography
          component="h2"
          variant="h4"
          gutterBottom
          sx={{ color: 'text.primary', fontWeight: 'bold' }}
        >
          {title}
        </Typography>
        <Typography
          variant="h6"
          sx={{ color: 'text.secondary', mb: 4 }}
        >
          {subtitle}
        </Typography>
      </Box>

      <StyledCard>
        <CardContent>
          <Typography variant="body1" sx={{ mb: 2 }}>
            {mainText}{' '}
            <Box component="span" sx={{ color: 'primary.main', fontWeight: 'bold' }}>
              {highlightText}
            </Box>{' '}
            {mainTextContinuation}
          </Typography>
          
          <Box sx={{ mt: 4, textAlign: 'center' }}>
            <Typography variant="h6" color="primary" gutterBottom>
              {offerTitle}
            </Typography>
            <Typography variant="body1" sx={{ mb: 4 }}>
              {offerText}
            </Typography>
          </Box>

          <Box sx={{ textAlign: 'center' }}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center" alignItems="center">
              <PaymentButton
                variant="contained"
                size="large"
                category={category}
                transmissionType={transmissionType}
                sx={{ px: 4, py: 1.5 }}
              >
                {buttonText}
              </PaymentButton>
              <Button
                variant="outlined"
                size="large"
                startIcon={<EmailIcon />}
                href="mailto:viktorijaautokool@hot.ee?subject=Registratsioon%20autokooli"
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
            {limitText && (
              <Typography variant="caption" display="block" sx={{ mt: 2, color: 'text.secondary' }}>
                {limitText}
              </Typography>
            )}
          </Box>
        </CardContent>
      </StyledCard>
    </Container>
  );
} 