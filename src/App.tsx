import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box, CircularProgress } from '@mui/material';
import { lazy, Suspense } from 'react';
import Divider from '@mui/material/Divider';
import './App.css';

// Lazy load route pages for better code splitting
const MarketingPage = lazy(() => import('./pages/MarketingPage.tsx'));
const LandingPage = lazy(() => import('./pages/LandingPage.tsx'));
const Features = lazy(() => import('./pages/Features.tsx'));
const About = lazy(() => import('./pages/About.tsx'));
const CheckoutPage = lazy(() => import('./pages/CheckoutPage.tsx'));

interface AppProps {
  toggleColorMode: () => void;
}

function App({ toggleColorMode }: AppProps) {
  const basename = '';
  
  return (
    <Box sx={{ 
      minHeight: '100vh',
      width: '100%',
    }}>
      <Router basename={basename}>
        <Suspense fallback={
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            minHeight: '100vh' 
          }}>
            <CircularProgress />
          </Box>
        }>
          <Routes>
            <Route path="/" element={<MarketingPage toggleColorMode={toggleColorMode} />} />
            <Route path="/landing" element={<LandingPage toggleColorMode={toggleColorMode} />} />
            <Route path="/features" element={<Features toggleColorMode={toggleColorMode} />} />
            <Route path="/about" element={<About toggleColorMode={toggleColorMode} />} />
            <Route path="/checkout" element={<CheckoutPage toggleColorMode={toggleColorMode} />} />
            <Route path="*" element={<MarketingPage toggleColorMode={toggleColorMode} />} />
          </Routes>
        </Suspense>
      </Router>
    </Box>
  );
}

export default App;
