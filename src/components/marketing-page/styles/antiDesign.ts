import { styled } from '@mui/material/styles';
import { Box, Typography, Card } from '@mui/material';

// Define colors for the floating icons
const floatingIconColors = {
  red: 'linear-gradient(45deg, #FF5252, #FF1744)',
  yellow: 'linear-gradient(45deg, #FFD740, #FFAB00)',
  green: 'linear-gradient(45deg, #69F0AE, #00C853)',
  default: '', // Will be set from the theme
};

export const AntiDesignBox = styled(Box)(({ theme }) => ({
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: -10,
    left: -10,
    right: -10,
    bottom: -10,
    background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
    zIndex: -1,
    borderRadius: '20px',
    opacity: 0.1,
  },
}));

export const AntiDesignTypography = styled(Typography)(({ theme }) => ({
  position: 'relative',
  display: 'inline-block',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: -4,
    left: 0,
    right: 0,
    height: '4px',
    background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
    borderRadius: '2px',
  },
}));

export const AntiDesignCard = styled(Card)(({ theme }) => ({
  position: 'relative',
  overflow: 'visible',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: -5,
    left: -5,
    right: -5,
    bottom: -5,
    background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
    zIndex: -1,
    borderRadius: '20px',
    opacity: 0.2,
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'url("/pattern.png")',
    opacity: 0.05,
    pointerEvents: 'none',
  },
}));

export const FloatingIcon = styled(Box)<{ color?: 'red' | 'yellow' | 'green' | undefined }>(
  ({ theme, color }) => {
    // Use the specified color gradient or fallback to theme colors
    const backgroundGradient = color
      ? floatingIconColors[color]
      : `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`;

    return {
      position: 'absolute',
      width: '60px',
      height: '60px',
      background: backgroundGradient,
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
      animation: 'float 3s ease-in-out infinite',
      '@keyframes float': {
        '0%': {
          transform: 'translateY(0px)',
        },
        '50%': {
          transform: 'translateY(-10px)',
        },
        '100%': {
          transform: 'translateY(0px)',
        },
      },
    };
  }
);

export const GradientText = styled(Typography)(({ theme }) => ({
  background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  fontWeight: 900,
}));

export const AntiDesignButton = styled(Box)(({ theme }) => ({
  position: 'relative',
  display: 'inline-block',
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
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'url("/pattern.png")',
    opacity: 0.1,
    borderRadius: '8px',
  },
})); 