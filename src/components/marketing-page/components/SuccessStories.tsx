import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { styled } from '@mui/material/styles';

interface CaseStudy {
  title: string;
  metrics: string;
}

interface Metric {
  value: string;
  label: string;
}

interface SuccessStoriesProps {
  title: string;
  caseStudies: CaseStudy[];
  metrics: Metric[];
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

const MetricCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(3),
  textAlign: 'center',
  backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)',
}));

export default function SuccessStories({
  title,
  caseStudies,
  metrics,
  buttonText,
  buttonLink = "#"
}: SuccessStoriesProps) {
  return (
    <Container id="success-stories" sx={{ py: { xs: 8, sm: 16 } }}>
      <Box sx={{ textAlign: 'center', mb: 8 }}>
        <Typography
          component="h2"
          variant="h4"
          gutterBottom
          sx={{ color: 'text.primary', fontWeight: 'bold' }}
        >
          {title}
        </Typography>
      </Box>

      <Grid container spacing={4} sx={{ mb: 8 }}>
        {caseStudies.map((study, index) => (
          <Grid item xs={12} md={4} key={index}>
            <StyledCard>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  {study.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {study.metrics}
                </Typography>
              </CardContent>
            </StyledCard>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={4} sx={{ mb: 8 }}>
        {metrics.map((metric, index) => (
          <Grid item xs={12} md={4} key={index}>
            <MetricCard>
              <Typography variant="h3" color="primary" gutterBottom>
                {metric.value}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {metric.label}
              </Typography>
            </MetricCard>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ textAlign: 'center' }}>
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