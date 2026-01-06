import { lazy, Suspense } from 'react';
import { Box, CircularProgress, Alert, AlertTitle, Typography, Link, Divider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import AppTheme from '../components/shared-theme/AppTheme';
import AppAppBar from '../components/marketing-page/components/AppAppBar';
import Footer from '../components/marketing-page/components/Footer';

const DrivingSchoolBot = lazy(() => import('../components/bot/DrivingSchoolBot'));

interface BotPageProps {
  toggleColorMode?: () => void;
  disableCustomTheme?: boolean;
}

// Проверка наличия переменных Supabase
const hasSupabaseConfig = () => {
  const url = import.meta.env.VITE_SUPABASE_URL;
  const key = import.meta.env.VITE_SUPABASE_ANON_KEY;
  return url && key && 
         url !== 'https://your-project-id.supabase.co' && 
         key !== 'your-anon-key-here';
};

export default function BotPage({ toggleColorMode, disableCustomTheme }: BotPageProps) {
  const supabaseConfigured = hasSupabaseConfig();

  return (
    <AppTheme disableCustomTheme={disableCustomTheme}>
      <CssBaseline enableColorScheme />
      <Box
        sx={{
          minHeight: '100vh',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          bgcolor: 'background.default',
        }}
      >
        {/* Header */}
        <AppAppBar toggleColorMode={toggleColorMode} />

        {/* Main Content */}
                <Box
                  component="main"
                  sx={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    backgroundColor: (theme) => theme.palette.mode === 'dark' ? theme.palette.background.default : '#f9fafb',
                    minHeight: 'calc(100vh - 200px)', // Вычитаем высоту header и footer
                    paddingTop: { xs: '80px', sm: '100px', md: '120px' }, // Отступ для фиксированного Header
                  }}
                >
          {!supabaseConfigured && (
            <Box sx={{ p: 2 }}>
              <Alert severity="warning" sx={{ mb: 2 }}>
                <AlertTitle>Требуется настройка Supabase</AlertTitle>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  Для работы бота необходимо настроить переменные окружения Supabase.
                </Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  1. Создайте файл <code>.env.local</code> в корне проекта
                </Typography>
                <Typography variant="body2">
                  2. Добавьте следующие переменные:
                </Typography>
                <Box component="pre" sx={{ mt: 1, p: 1, bgcolor: 'grey.100', borderRadius: 1, fontSize: '0.875rem' }}>
{`VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here`}
                </Box>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  Подробные инструкции см. в <Link href="/" target="_blank">SUPABASE_SETUP.md</Link> или <Link href="/" target="_blank">BOT_QUICKSTART.md</Link>
                </Typography>
              </Alert>
            </Box>
          )}
          <Suspense
            fallback={
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  minHeight: '50vh',
                }}
              >
                <CircularProgress />
              </Box>
            }
          >
            <DrivingSchoolBot />
          </Suspense>
        </Box>

        {/* Footer */}
        <Divider />
        <Suspense fallback={<Box sx={{ minHeight: '200px' }} />}>
          <Footer />
        </Suspense>
      </Box>
    </AppTheme>
  );
}
