import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/system';
import { GradientText } from '../styles/antiDesign';
import { useTranslation } from 'react-i18next';

// Import images as modules to ensure correct paths
import creditinfoLight from '/creditinfo_ready_light.png';
import maanteeametLight from '/maanteeamet-ready-light.png';
import teoriaLight from '/teoria-ready-light.png';
import creditinfoDark from '/creditinfo_ready.png';
import maanteeametDark from '/maanteeamet-ready.png';
import teoriaDark from '/teoria-ready.png';

// Logos for light theme (light versions, light visuals on light background)
const logosForLightTheme = [
  creditinfoLight,
  maanteeametLight,
  teoriaLight,
];

// Logos for dark theme (regular versions, dark visuals on dark background)
const logosForDarkTheme = [
  creditinfoDark,
  maanteeametDark,
  teoriaDark,
];

const logoStyle = {
  width: '200px',
  height: '180px',
  margin: '0 32px',
  objectFit: 'contain' as 'contain',
  opacity: 0.7,
};

export default function LogoCollection() {
  const theme = useTheme();
  const { t } = useTranslation();
  
  // Use the appropriate logo set based on the current theme
  const logos = theme.palette.mode === 'light' 
    ? logosForLightTheme  // Use dark visuals on light background
    : logosForDarkTheme;  // Use light visuals on dark background

  // Image error handling function
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    console.error(`Failed to load image: ${e.currentTarget.src}`);
    // Optionally fall back to a different image
    // e.currentTarget.src = '/fallback-image.png';
  };

  return (
    <Box id="logoCollection" sx={{ py: 4 }}>
      <GradientText variant="h4" align="center" gutterBottom>
        {t('logo_collection.title')}
      </GradientText>
      <Box sx={{ maxWidth: 800, mx: 'auto' }}>
        <Typography
          component="p"
          variant="subtitle2"
          align="center"
          sx={{ color: 'text.secondary' }}
        >
          {t('logo_collection.description')}
        </Typography>
      </Box>
      <Grid container sx={{ justifyContent: 'center', mt: 0.5, opacity: 0.6 }}>
        {logos.map((logo, index) => (
          <Grid key={index}>
            <img
              src={logo}
              alt={`Partner logo ${index + 1}`}
              style={logoStyle}
              onError={handleImageError}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
