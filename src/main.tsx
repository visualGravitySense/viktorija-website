import { StrictMode, useState, useMemo, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material'
import { HelmetProvider } from 'react-helmet-async'
import { getDesignTokens } from './theme'
import './index.css'

const root = createRoot(document.getElementById('root')!);

// Порядок важен: сначала i18n (без react-i18next), потом react-i18next, потом init — иначе "Cannot access $t before initialization"
import('./i18n/i18n')
  .then((i18nModule) =>
    import('react-i18next').then((reactI18next) => ({
      i18nModule,
      reactI18next,
    }))
  )
  .then(({ i18nModule, reactI18next }) => {
    const { default: i18n, initI18n } = i18nModule;
    return initI18n(reactI18next.initReactI18next).then(() =>
      import('./App.tsx').then((appModule) => ({ i18n, I18nextProvider: reactI18next.I18nextProvider, appModule }))
    );
  })
  .then(({ i18n, I18nextProvider, appModule }) => {
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
