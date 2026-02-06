import { StrictMode, useState, useMemo, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material'
import { HelmetProvider } from 'react-helmet-async'
import { I18nextProvider } from 'react-i18next'
import { getDesignTokens } from './theme'
import './index.css'
// i18n должен быть инициализирован до любого компонента, использующего useTranslation
import i18n from './i18n/i18n'
import App from './App.tsx'

const ThemeApp = () => {
  const [mode, setMode] = useState<'light' | 'dark'>('light');
  
  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);
  
  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };
  
  return (
    <I18nextProvider i18n={i18n}>
      <HelmetProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <App toggleColorMode={toggleColorMode} />
        </ThemeProvider>
      </HelmetProvider>
    </I18nextProvider>
  );
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Suspense fallback={<div>Loading...</div>}>
      <ThemeApp />
    </Suspense>
  </StrictMode>,
)
