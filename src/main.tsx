import { StrictMode, useState, useMemo, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material'
import { HelmetProvider } from 'react-helmet-async'
import { getDesignTokens } from './theme'
import './index.css'
// Только i18n — без react-i18next до готовности (устраняет "Cannot access $t before initialization")
import i18n, { initPromise } from './i18n/i18n'

const root = createRoot(document.getElementById('root')!);

// Рендер только после инициализации i18n; тогда подгружаем react-i18next и App
initPromise.then(() => {
  return Promise.all([
    import('react-i18next'),
    import('./App.tsx'),
  ])
}).then(([reactI18next, appModule]) => {
  const { I18nextProvider } = reactI18next;
  const App = appModule.default;

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

  root.render(
    <StrictMode>
      <Suspense fallback={<div>Loading...</div>}>
        <ThemeApp />
      </Suspense>
    </StrictMode>,
  );
}).catch((err) => {
  console.error('App bootstrap failed:', err);
  root.render(<div>Loading...</div>);
});
