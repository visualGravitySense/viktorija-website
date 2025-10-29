import { createTheme, ThemeOptions } from '@mui/material/styles';

// Define a unified color palette for the entire application
const colors = {
  primary: {
    main: '#6C63FF', // Vibrant purple as primary color
    light: '#8A84FF',
    dark: '#4A42D4',
    contrastText: '#FFFFFF',
  },
  secondary: {
    main: '#FFD700', // Gold/yellow as secondary color
    light: '#FFE44D',
    dark: '#D4B300',
    contrastText: '#000000',
  },
  background: {
    default: '#FFFFFF',
    paper: '#F8F9FA',
    dark: '#121212',
    darkPaper: '#1E1E1E',
  },
  text: {
    primary: '#1A1A1A',
    secondary: '#4A4A4A',
    lightPrimary: '#FFFFFF',
    lightSecondary: '#B0B0B0',
  },
  grey: {
    50: '#F8F9FA',
    100: '#F1F3F5',
    200: '#E9ECEF',
    300: '#DEE2E6',
    400: '#CED4DA',
    500: '#ADB5BD',
    600: '#6C757D',
    700: '#495057',
    800: '#343A40',
    900: '#212529',
  },
  error: {
    main: '#FF4D4D',
    light: '#FF6B6B',
    dark: '#E03131',
  },
  warning: {
    main: '#FFB800',
    light: '#FFC107',
    dark: '#F59F00',
  },
  info: {
    main: '#00B8FF',
    light: '#29B6F6',
    dark: '#0288D1',
  },
  success: {
    main: '#00C853',
    light: '#66BB6A',
    dark: '#388E3C',
  },
};

// Define consistent spacing and sizing
const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

// Define consistent typography
const typography = {
  fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  fontWeightLight: 300,
  fontWeightRegular: 400,
  fontWeightMedium: 500,
  fontWeightBold: 700,
  h1: {
    fontSize: '3.5rem',
    fontWeight: 700,
    letterSpacing: '-0.02em',
    lineHeight: 1.2,
  },
  h2: {
    fontSize: '2.75rem',
    fontWeight: 700,
    letterSpacing: '-0.02em',
    lineHeight: 1.2,
  },
  h3: {
    fontSize: '2.25rem',
    fontWeight: 600,
    letterSpacing: '-0.01em',
    lineHeight: 1.3,
  },
  h4: {
    fontSize: '1.75rem',
    fontWeight: 600,
    letterSpacing: '-0.01em',
    lineHeight: 1.3,
  },
  h5: {
    fontSize: '1.5rem',
    fontWeight: 500,
    letterSpacing: '-0.01em',
    lineHeight: 1.4,
  },
  h6: {
    fontSize: '1.25rem',
    fontWeight: 500,
    letterSpacing: '-0.01em',
    lineHeight: 1.4,
  },
  body1: {
    fontSize: '1rem',
    lineHeight: 1.5,
  },
  body2: {
    fontSize: '0.875rem',
    lineHeight: 1.5,
  },
  button: {
    textTransform: 'none',
    fontWeight: 500,
  },
  caption: {
    fontSize: '0.75rem',
    lineHeight: 1.5,
  },
  overline: {
    fontSize: '0.75rem',
    textTransform: 'uppercase',
    fontWeight: 500,
    letterSpacing: '0.08em',
  },
};

// Consistent shape properties
const shape = {
  borderRadius: 12,
};

// Base theme shared between light and dark modes
const baseTheme: ThemeOptions = {
  typography,
  shape,
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          padding: '12px 24px',
          borderRadius: '8px',
          transition: 'all 0.2s ease-in-out',
        },
        contained: {
          boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
          '&:hover': {
            boxShadow: '0 6px 15px rgba(0,0,0,0.15)',
            transform: 'translateY(-2px)',
          },
        },
        outlined: {
          borderWidth: '2px',
          '&:hover': {
            borderWidth: '2px',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '16px',
          boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
          overflow: 'hidden',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '8px',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
        elevation1: {
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        },
        elevation2: {
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        },
        elevation3: {
          boxShadow: '0 6px 16px rgba(0,0,0,0.12)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          textDecoration: 'none',
          '&:hover': {
            textDecoration: 'none',
          },
        },
      },
    },
  },
};

// Theme with mode-specific settings
export const getDesignTokens = (mode: 'light' | 'dark') => ({
  ...baseTheme,
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          // Light mode colors
          primary: colors.primary,
          secondary: colors.secondary,
          background: {
            default: colors.background.default,
            paper: colors.background.paper,
          },
          text: {
            primary: colors.text.primary,
            secondary: colors.text.secondary,
          },
          error: colors.error,
          warning: colors.warning,
          info: colors.info,
          success: colors.success,
          grey: colors.grey,
        }
      : {
          // Dark mode colors
          primary: {
            ...colors.primary,
            main: colors.primary.light, // Brighter primary for dark mode
          },
          secondary: {
            ...colors.secondary,
            main: colors.secondary.light, // Brighter secondary for dark mode
          },
          background: {
            default: colors.background.dark,
            paper: colors.background.darkPaper,
          },
          text: {
            primary: colors.text.lightPrimary,
            secondary: colors.text.lightSecondary,
          },
          error: {
            ...colors.error,
            main: colors.error.light, // Brighter error for dark mode
          },
          warning: {
            ...colors.warning,
            main: colors.warning.light, // Brighter warning for dark mode
          },
          info: {
            ...colors.info,
            main: colors.info.light, // Brighter info for dark mode
          },
          success: {
            ...colors.success,
            main: colors.success.light, // Brighter success for dark mode
          },
          grey: colors.grey,
        }),
  },
}); 