import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';
import EmailIcon from '@mui/icons-material/Email';
import { useTranslation } from 'react-i18next';

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
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 20px rgba(0,0,0,0.3)',
  },
}));

const InstructorCard = styled(Card)(({ theme }) => ({
  position: 'relative',
  padding: theme.spacing(3),
  borderRadius: '16px',
  background: theme.palette.background.paper,
  backdropFilter: 'blur(10px)',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
  transition: 'all 0.3s ease',
  border: '1px solid',
  borderColor: theme.palette.divider,
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15)',
  },
}));

interface Instructor {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  car?: string;
}

interface InstructorsProps {
  title?: string;
  subtitle?: string;
}

export default function Instructors({ 
  title,
  subtitle
}: InstructorsProps) {
  const { t, i18n } = useTranslation('translation');
  
  // Debug: Check if translations are working
  console.log('i18n language:', i18n.language);
  console.log('Test translation:', t('instructors_component.default_title'));
  console.log('Available languages:', i18n.languages);
  console.log('Current language:', i18n.language);
  console.log('Is initialized:', i18n.isInitialized);
  
  const defaultTitle = title || t('instructors_component.default_title', 'Наши преподаватели');
  const defaultSubtitle = subtitle || t('instructors_component.default_subtitle', 'Опытные инструкторы помогут вам освоить вождение');
  
  const instructors: Instructor[] = [
    {
      id: "igor",
      name: t('about.instructors_component.instructors.igor.name', 'Игорь Нагорский'),
      description: t('about.instructors_component.instructors.igor.description', 'Основатель и руководитель автошколы "Viktorija", опытный инструктор по вождению. Автомобиль: Toyota Corolla'),
              imageUrl: "/igor-ready.png",
      car: "Honda CRV"
    },
    {
      id: "maksim",
      name: t('about.instructors_component.instructors.maksim.name', 'Максим Федоренко'),
      description: t('about.instructors_component.instructors.maksim.description', 'Инструктор по вождению, терпеливый и заботливый учитель. Автомобиль: Volkswagen Golf'),
              imageUrl: "/maksim-ready.png",
      car: "Volkswagen Golf"
    },
    {
      id: "stanislav",
      name: t('about.instructors_component.instructors.stanislav.name', 'Станислав Зигадло'),
      description: t('about.instructors_component.instructors.stanislav.description', 'Инструктор по вождению, педагогический стаж 18 лет. Автомобиль: Skoda Octavia'),
              imageUrl: "/stas-ready.png",
      car: "Skoda Octavia"
    },
    {
      id: "ivan",
      name: t('about.instructors_component.instructors.ivan.name', 'Иван Скоробогатов'),
      description: t('about.instructors_component.instructors.ivan.description', 'Опытный инструктор, работал экзаменатором АРК более 2,5 лет. Автомобиль: Toyota Yaris'),
              imageUrl: "/ivan-ready.png",
      car: "Toyota Yaris"
    },
    {
      id: "andrei",
      name: t('about.instructors_component.instructors.andrei.name', 'Андрей Наан'),
      description: t('about.instructors_component.instructors.andrei.description', 'Высококвалифицированный инструктор по вождению категорий В и А. Автомобиль: Volkswagen Polo'),
              imageUrl: "/andrei-ready.png",
      car: "Volkswagen Polo"
    }
  ];
  
  return (
    <Box sx={{ py: 6 }}>
      <Container maxWidth="lg">
        <Typography 
          variant="h2" 
          component="h2" 
          align="center" 
          gutterBottom
          sx={{ mb: 1, fontWeight: 700 }}
        >
          {defaultTitle}
        </Typography>
        <Typography 
          variant="h5" 
          align="center" 
          color="text.secondary" 
          sx={{ mb: 6, maxWidth: '800px', mx: 'auto' }}
        >
          {defaultSubtitle}
        </Typography>
        
        <Grid container spacing={{ xs: 2, sm: 3, md: 5 }} justifyContent="center">
          {instructors.map((instructor) => (
            <Grid item xs={12} sm={6} md={4} lg={4} key={instructor.id} sx={{ maxWidth: { md: '33.333%' } }}>
              <InstructorCard>
                <Box 
                  component="img" 
                  src={instructor.imageUrl}
                  alt={instructor.name}
                  sx={{ 
                    width: '100%', 
                    borderRadius: '8px',
                    objectFit: 'cover',
                    aspectRatio: '1/1',
                    mb: 2
                  }}
                />
                <Box sx={{ flex: 1 }}>
                  <Typography 
                    variant="h5" 
                    component="h3" 
                    gutterBottom
                    sx={{ fontWeight: 'bold' }}
                  >
                    {instructor.name}
                  </Typography>
                  <Typography 
                    variant="body1" 
                    color="text.secondary" 
                    sx={{ mb: 3 }}
                  >
                    {instructor.description}
                  </Typography>
                </Box>
                <StyledButton 
                  variant="contained" 
                  fullWidth
                  component="a"
                  href="https://buy.stripe.com/14A28s0Fs4lycgtg1i3ZK00"
                  target="_blank"
                >
                  {t('about.instructors_component.sign_up_button', 'Записаться на урок')}
                </StyledButton>
              </InstructorCard>
            </Grid>
          ))}
        </Grid>
        <Box sx={{ mt: 4, textAlign: 'center' }}>
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
        </Box>
      </Container>
    </Box>
  );
} 