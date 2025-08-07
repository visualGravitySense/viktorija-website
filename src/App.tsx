import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import MarketingPage from './pages/MarketingPage.tsx';
import Features from './pages/Features.tsx';
import About from './pages/About.tsx';
import CheckoutPage from './pages/CheckoutPage.tsx';
import Divider from '@mui/material/Divider';
import './App.css';

interface AppProps {
  toggleColorMode: () => void;
}

function App({ toggleColorMode }: AppProps) {
  const basename = import.meta.env.PROD ? '/viktorija-base' : '';
  
  return (
    <Box sx={{ 
      minHeight: '100vh',
      width: '100%',
    }}>
      <Router basename={basename}>
        <Routes>
          <Route path="/" element={<MarketingPage toggleColorMode={toggleColorMode} />} />
          <Route path="/features" element={<Features toggleColorMode={toggleColorMode} />} />
          <Route path="/about" element={<About toggleColorMode={toggleColorMode} />} />
          <Route path="/checkout" element={<CheckoutPage toggleColorMode={toggleColorMode} />} />
          <Route path="*" element={<MarketingPage toggleColorMode={toggleColorMode} />} />
        </Routes>
      </Router>
    </Box>
  );
}

export default App;
