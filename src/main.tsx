import { StrictMode, useState, useMemo } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material'
import { HelmetProvider } from 'react-helmet-async'
import { getDesignTokens } from './theme'
import './index.css'
import App from './App.tsx'
import './i18n/i18n'

const ThemeApp = () => {
  const [mode, setMode] = useState<'light' | 'dark'>('light');
  
  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);
  
  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };
  
  return (
    <HelmetProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App toggleColorMode={toggleColorMode} />
      </ThemeProvider>
    </HelmetProvider>
  );
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Suspense fallback={<div>Loading...</div>}>
      <ThemeApp />
    </Suspense>
  </StrictMode>,
)
