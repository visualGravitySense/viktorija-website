import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { getDesignTokens } from '../../theme';
import AppAppBar from './components/AppAppBar';
import Hero from './components/Hero';
import PainPoints from './components/PainPoints';
import LogoCollection from './components/LogoCollection';
import Highlights from './components/Highlights';
import Pricing from './components/Pricing';
import Features from './components/Features';
import AdministrativeAutomation from './components/AdministrativeAutomation';
import TimeCalculator from './components/TimeCalculator';
import SuccessStories from './components/SuccessStories';
import UrgencySection from './components/UrgencySection';
import AIAssistant from './components/AIAssistant';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import ExitIntentPopup from './components/ExitIntentPopup';

export default function MarketingPage() {
  const [mode, setMode] = React.useState<'light' | 'dark'>('light');
  const [showExitPopup, setShowExitPopup] = React.useState(false);
  const theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  React.useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      // Only show popup if mouse is moving towards the top of the page
      if (e.clientY <= 0) {
        setShowExitPopup(true);
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          bgcolor: 'background.default',
          color: 'text.primary',
        }}
      >
        <AppAppBar />
        <Hero />
        <PainPoints />
        <div>
          <LogoCollection />
          <Features />
          <AdministrativeAutomation />
          <TimeCalculator />
          <SuccessStories />
          <UrgencySection />
          <AIAssistant />
          <Divider />
          <Testimonials />
          <Divider />
          <Highlights />
          <Divider />
          <Pricing />
          <Divider />
          <FAQ />
          <Divider />
          <Footer />
        </div>
        <ExitIntentPopup 
          open={showExitPopup} 
          onClose={() => setShowExitPopup(false)} 
        />
      </Box>
    </ThemeProvider>
  );
}
