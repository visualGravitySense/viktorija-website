import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Slider from '@mui/material/Slider';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { styled } from '@mui/material/styles';

const activities = [
  {
    label: 'One-on-one student time',
    value: 0,
  },
  {
    label: 'Curriculum development',
    value: 0,
  },
  {
    label: 'Marketing and growth',
    value: 0,
  },
  {
    label: 'Personal time and work-life balance',
    value: 0,
  },
  {
    label: 'Professional development',
    value: 0,
  },
];

const StyledCard = styled(Card)(({ theme }) => ({
  marginTop: theme.spacing(4),
  padding: theme.spacing(3),
  backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)',
}));

const marks = [
  { value: 0, label: '0h' },
  { value: 5, label: '5h' },
  { value: 10, label: '10h' },
  { value: 15, label: '15h' },
];

export default function TimeCalculator() {
  const [allocations, setAllocations] = React.useState(activities);
  const [totalHours, setTotalHours] = React.useState(0);

  const handleSliderChange = (index: number) => (event: Event, newValue: number | number[]) => {
    const newAllocations = [...allocations];
    newAllocations[index].value = newValue as number;
    setAllocations(newAllocations);
    
    const total = newAllocations.reduce((sum, activity) => sum + activity.value, 0);
    setTotalHours(total);
  };

  const getTopPriority = () => {
    return allocations.reduce((max, current) => 
      current.value > max.value ? current : max
    , allocations[0]);
  };

  const getMeaningfulComparison = (hours: number) => {
    if (hours >= 15) return 'a full workday';
    if (hours >= 10) return 'a morning of focused work';
    if (hours >= 5) return 'a few hours of uninterrupted time';
    return 'some extra time';
  };

  const topPriority = getTopPriority();

  return (
    <Container id="time-calculator" sx={{ py: { xs: 8, sm: 16 } }}>
      <Box sx={{ textAlign: 'center', mb: 8 }}>
        <Typography
          component="h2"
          variant="h4"
          gutterBottom
          sx={{ color: 'text.primary', fontWeight: 'bold' }}
        >
          What Would You Do With 15 Extra Hours Every Week?
        </Typography>
        <Typography
          variant="body1"
          sx={{ color: 'text.secondary', mb: 4, maxWidth: '800px', mx: 'auto' }}
        >
          Allocate your recovered time to different activities and see the impact
        </Typography>
      </Box>

      <StyledCard>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            Total Hours Allocated: {totalHours}/15
          </Typography>
          <Slider
            value={totalHours}
            min={0}
            max={15}
            disabled
            sx={{ mt: 2 }}
          />
        </Box>

        {allocations.map((activity, index) => (
          <Box key={index} sx={{ mb: 4 }}>
            <Typography variant="subtitle1" gutterBottom>
              {activity.label}
            </Typography>
            <Slider
              value={activity.value}
              onChange={handleSliderChange(index)}
              min={0}
              max={15}
              marks={marks}
              valueLabelDisplay="auto"
            />
          </Box>
        ))}
      </StyledCard>

      {totalHours > 0 && (
        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Typography variant="h6" gutterBottom>
            Based on your priorities, our system would give you {topPriority.value} hours for {topPriority.label.toLowerCase()} every month.
          </Typography>
          <Typography variant="body1" sx={{ mb: 4 }}>
            That's equivalent to {getMeaningfulComparison(topPriority.value)}.
          </Typography>
        </Box>
      )}

      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          sx={{ px: 4, py: 1.5 }}
        >
          Get Your Personalized Time-Saving Plan →
        </Button>
      </Box>
    </Container>
  );
} 