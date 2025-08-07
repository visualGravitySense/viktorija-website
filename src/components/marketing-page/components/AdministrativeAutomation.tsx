import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { styled } from '@mui/material/styles';

import ScheduleIcon from '@mui/icons-material/Schedule';
import NotificationsIcon from '@mui/icons-material/Notifications';
import DescriptionIcon from '@mui/icons-material/Description';
import PaymentIcon from '@mui/icons-material/Payment';
import AnalyticsIcon from '@mui/icons-material/Analytics';

interface Benefit {
  icon: 'schedule' | 'notifications' | 'description' | 'payment' | 'analytics';
  title: string;
  description: string;
}

interface AdministrativeAutomationProps {
  title: string;
  subtitle: string;
  benefits: Benefit[];
  buttonText: string;
  buttonLink?: string;
}

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-4px)',
  },
  backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)',
}));

export default function AdministrativeAutomation({
  title = "Eliminate Your Most Time-Consuming Tasks",
  subtitle = "The average educator spends 15+ hours weekly on tasks our system handles automatically.",
  benefits = [
    {
      icon: 'schedule',
      title: 'Smart Scheduling',
      description: 'Prevents conflicts and optimizes resource use',
    },
    {
      icon: 'notifications',
      title: 'Automated Reminders',
      description: 'Reducing no-shows by 78%',
    },
    {
      icon: 'description',
      title: 'Digital Documentation',
      description: 'Secure, compliant record-keeping',
    },
    {
      icon: 'payment',
      title: 'Integrated Payments',
      description: 'Automatic invoicing and tracking',
    },
    {
      icon: 'analytics',
      title: 'Performance Analytics',
      description: 'Identifying operational bottlenecks',
    },
  ],
  buttonText = "Calculate Your Time Savings →",
  buttonLink = "#",
}: AdministrativeAutomationProps) {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'schedule':
        return <ScheduleIcon sx={{ fontSize: 40 }} />;
      case 'notifications':
        return <NotificationsIcon sx={{ fontSize: 40 }} />;
      case 'description':
        return <DescriptionIcon sx={{ fontSize: 40 }} />;
      case 'payment':
        return <PaymentIcon sx={{ fontSize: 40 }} />;
      case 'analytics':
        return <AnalyticsIcon sx={{ fontSize: 40 }} />;
      default:
        return <ScheduleIcon sx={{ fontSize: 40 }} />;
    }
  };

  return (
    <Container id="automation" sx={{ py: { xs: 8, sm: 16 } }}>
      <Box sx={{ textAlign: 'center', mb: 8 }}>
        <Typography
          component="h2"
          variant="h4"
          gutterBottom
          sx={{ color: 'text.primary', fontWeight: 'bold' }}
        >
          {title}
        </Typography>
        <Typography
          variant="body1"
          sx={{ color: 'text.secondary', mb: 4, maxWidth: '800px', mx: 'auto' }}
        >
          {subtitle}
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {benefits.map((benefit, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <StyledCard>
              <CardContent sx={{ p: 3, textAlign: 'center' }}>
                <Box sx={{ mb: 2, color: 'primary.main' }}>
                  {getIcon(benefit.icon)}
                </Box>
                <Typography variant="h6" gutterBottom>
                  {benefit.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {benefit.description}
                </Typography>
              </CardContent>
            </StyledCard>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ mt: 8, textAlign: 'center' }}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          href={buttonLink}
          sx={{ px: 4, py: 1.5 }}
        >
          {buttonText}
        </Button>
      </Box>
    </Container>
  );
} 