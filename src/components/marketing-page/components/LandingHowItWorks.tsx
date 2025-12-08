import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';

const LANDING_GREEN = '#34D186';
const LANDING_GREEN_DARK = '#2AB673';

interface Step {
  number: number;
  title: string;
  description: string;
}

export default function LandingHowItWorks() {
  const { t } = useTranslation();

  const steps: Step[] = [
    {
      number: 1,
      title: t('landing.how_it_works.step1.title', { 
        defaultValue: 'Registreerimine ja konsultatsioon' 
      }),
      description: t('landing.how_it_works.step1.description', { 
        defaultValue: 'Räägime läbi kõik detailid ja kontrollime sinu dokumente. Tasuta konsultatsioon!' 
      }),
    },
    {
      number: 2,
      title: t('landing.how_it_works.step2.title', { 
        defaultValue: 'Teooria ja eksamid' 
      }),
      description: t('landing.how_it_works.step2.description', { 
        defaultValue: '5 tundi taksojuhi teooriat: liikluseeskirjad, klienditeenindus, maksusüsteem. Online ja kohapeal.' 
      }),
    },
    {
      number: 3,
      title: t('landing.how_it_works.step3.title', { 
        defaultValue: 'Praktilised sõidutunnid' 
      }),
      description: t('landing.how_it_works.step3.description', { 
        defaultValue: '10 tundi praktikat kogenud juhendajaga. Õpid parimaid marsruute ja kliendisuhtlust.' 
      }),
    },
    {
      number: 4,
      title: t('landing.how_it_works.step4.title', { 
        defaultValue: 'Dokumentide vormistamine' 
      }),
      description: t('landing.how_it_works.step4.description', { 
        defaultValue: 'Aitame hankida takso litsentsi, registreerida ettevõtjaks (FIE) ja liituda Boltiga.' 
      }),
    },
    {
      number: 5,
      title: t('landing.how_it_works.step5.title', { 
        defaultValue: 'Alusta teenimist!' 
      }),
      description: t('landing.how_it_works.step5.description', { 
        defaultValue: 'Oled valmis alustama. Meie tugimeeskond on alati abiks ka pärast kursuse lõppu.' 
      }),
    },
  ];

  return (
    <Box
      sx={{
        py: { xs: 8, sm: 10 },
        bgcolor: '#FFFFFF',
      }}
    >
      <Container maxWidth="md">
        <Typography
          variant="h2"
          component="h2"
          textAlign="center"
          sx={{
            mb: 6,
            fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
            fontWeight: 700,
            color: LANDING_GREEN_DARK,
          }}
        >
          {t('landing.how_it_works.title', { defaultValue: 'Kuidas see toimub?' })}
        </Typography>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
          }}
        >
          {steps.map((step) => (
            <Box
              key={step.number}
              sx={{
                display: 'flex',
                gap: 3,
                alignItems: 'flex-start',
              }}
            >
              {/* Step Number Circle */}
              <Box
                sx={{
                  minWidth: 50,
                  width: 50,
                  height: 50,
                  borderRadius: '50%',
                  bgcolor: LANDING_GREEN,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <Typography
                  variant="h5"
                  component="span"
                  sx={{
                    color: '#FFFFFF',
                    fontWeight: 700,
                    fontSize: '1.5rem',
                  }}
                >
                  {step.number}
                </Typography>
              </Box>

              {/* Step Content */}
              <Box sx={{ flex: 1 }}>
                <Typography
                  variant="h6"
                  component="h3"
                  sx={{
                    fontWeight: 600,
                    fontSize: { xs: '1.2rem', sm: '1.4rem' },
                    color: '#333333',
                    mb: 1,
                  }}
                >
                  {step.title}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: '#666666',
                    lineHeight: 1.6,
                    fontSize: { xs: '0.95rem', sm: '1rem' },
                  }}
                >
                  {step.description}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
