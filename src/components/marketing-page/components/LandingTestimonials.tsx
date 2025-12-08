import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { useTranslation } from 'react-i18next';
import EmailIcon from '@mui/icons-material/Email';

const LANDING_GREEN = '#34D186';
const LANDING_GREEN_DARK = '#2AB673';

interface Testimonial {
  text: string;
  name: string;
  licenseCategory: string;
  initials: string;
}

export default function LandingTestimonials() {
  const { t } = useTranslation();

  const testimonials: Testimonial[] = [
    {
      text: t('landing.testimonials.testimonial1.text', { 
        defaultValue: 'Best driving school in town! I passed my exam on the first try thanks to the patient and professional instructors.' 
      }),
      name: t('landing.testimonials.testimonial1.name', { 
        defaultValue: 'Maria K.' 
      }),
      licenseCategory: t('landing.testimonials.testimonial1.license', { 
        defaultValue: 'Category B License Holder' 
      }),
      initials: 'MK'
    },
    {
      text: t('landing.testimonials.testimonial2.text', { 
        defaultValue: 'I was terrified of driving, but my instructor helped me overcome my fears. Now I drive with confidence every day!' 
      }),
      name: t('landing.testimonials.testimonial2.name', { 
        defaultValue: 'Thomas L.' 
      }),
      licenseCategory: t('landing.testimonials.testimonial2.license', { 
        defaultValue: 'Category A License Holder' 
      }),
      initials: 'TL'
    },
    {
      text: t('landing.testimonials.testimonial3.text', { 
        defaultValue: 'The lessons were both educational and fun. I learned not just to pass the test, but to be a truly good driver.' 
      }),
      name: t('landing.testimonials.testimonial3.name', { 
        defaultValue: 'Anna S.' 
      }),
      licenseCategory: t('landing.testimonials.testimonial3.license', { 
        defaultValue: 'Category B License Holder' 
      }),
      initials: 'AS'
    }
  ];

  return (
    <Box
      sx={{
        py: { xs: 8, sm: 10 },
        bgcolor: '#FFFFFF',
      }}
    >
      <Container maxWidth="lg">
        {/* Title */}
        <Typography
          variant="h2"
          component="h2"
          textAlign="center"
          sx={{
            mb: 6,
            fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
            fontWeight: 700,
            color: '#000000',
          }}
        >
          {t('landing.testimonials.title', { defaultValue: 'What Our Students Say' })}
        </Typography>

        {/* Testimonial Cards */}
        <Grid container spacing={3} sx={{ mb: 6 }}>
          {testimonials.map((testimonial, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
              <Card
                sx={{
                  height: '100%',
                  bgcolor: '#FFFFFF',
                  borderRadius: '12px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  transition: 'all 0.3s ease',
                  border: 'none',
                  '&:hover': {
                    boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
                    transform: 'translateY(-4px)',
                  },
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  {/* Testimonial Text */}
                  <Typography
                    variant="body1"
                    sx={{
                      color: '#000000',
                      mb: 3,
                      fontSize: { xs: '0.95rem', sm: '1rem' },
                      lineHeight: 1.6,
                      minHeight: '80px',
                    }}
                  >
                    "{testimonial.text}"
                  </Typography>

                  {/* Student Info */}
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2,
                    }}
                  >
                    <Avatar
                      sx={{
                        width: 48,
                        height: 48,
                        bgcolor: '#E0E0E0',
                        color: '#666666',
                        fontWeight: 600,
                        fontSize: '1rem',
                      }}
                    >
                      {testimonial.initials}
                    </Avatar>
                    <Box>
                      <Typography
                        variant="subtitle1"
                        sx={{
                          fontWeight: 600,
                          color: '#000000',
                          fontSize: { xs: '0.9rem', sm: '1rem' },
                          mb: 0.5,
                        }}
                      >
                        {testimonial.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: '#666666',
                          fontSize: { xs: '0.8rem', sm: '0.85rem' },
                        }}
                      >
                        {testimonial.licenseCategory}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Send Email Button */}
        <Box sx={{ textAlign: 'center' }}>
          <Button
            variant="outlined"
            size="large"
            startIcon={<EmailIcon />}
            href="mailto:viktorijaautokool@hot.ee?subject=Registratsioon%20autokooli"
            sx={{
              px: 4,
              py: 1.5,
              borderRadius: '12px',
              borderColor: '#000000',
              color: '#000000',
              fontWeight: 600,
              fontSize: { xs: '0.95rem', sm: '1rem' },
              textTransform: 'none',
              borderWidth: 1.5,
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              '&:hover': {
                borderColor: LANDING_GREEN_DARK,
                bgcolor: 'rgba(52, 209, 134, 0.05)',
                borderWidth: 1.5,
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                transform: 'translateY(-2px)',
              },
              transition: 'all 0.3s ease',
            }}
          >
            {t('landing.testimonials.send_email', { defaultValue: 'Send email' })}
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
