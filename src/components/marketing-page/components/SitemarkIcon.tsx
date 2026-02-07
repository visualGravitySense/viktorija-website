import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { keyframes } from '@emotion/react';

const pulseGlow = keyframes`
  0%, 100% {
    box-shadow: 0 0 10px rgba(59, 130, 246, 0.3), 0 0 20px rgba(16, 185, 129, 0.2);
  }
  50% {
    box-shadow: 0 0 15px rgba(59, 130, 246, 0.5), 0 0 30px rgba(16, 185, 129, 0.4);
  }
`;

const gradientShift = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

export default function SitemarkIcon() {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', mr: 2, position: 'relative' }}>
      {/* Декоративный градиентный фон вокруг логотипа */}
      <Box
        sx={{
          position: 'relative',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          mr: 1.5,
          '&::before': {
            content: '""',
            position: 'absolute',
            width: '120%',
            height: '120%',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.3) 0%, rgba(16, 185, 129, 0.3) 50%, rgba(139, 92, 246, 0.3) 100%)',
            backgroundSize: '200% 200%',
            animation: `${gradientShift} 3s ease infinite`,
            zIndex: 0,
            filter: 'blur(4px)',
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.2) 0%, transparent 70%)',
            zIndex: 1,
          },
        }}
      >
        <Box
          component="img"
          src="/viktorija-logo.jpg"
          alt="Viktorija"
          sx={{
            height: { xs: 36, sm: 40 }, // Немного меньше на мобильных
            width: { xs: 36, sm: 40 },
            objectFit: 'cover',
            borderRadius: '50%',
            position: 'relative',
            zIndex: 2,
            border: '2px solid',
            borderColor: 'rgba(255, 255, 255, 0.3)',
            animation: `${pulseGlow} 2s ease-in-out infinite`,
            flexShrink: 0, // Предотвращаем деформацию
          }}
        />
      </Box>
      <Typography
        variant="h6"
        component="span"
        sx={{
          fontWeight: 600,
          fontSize: { xs: '0.9rem', sm: '1rem' },
          background: 'linear-gradient(135deg, #3b82f6 0%, #10b981 50%, #8b5cf6 100%)',
          backgroundSize: '200% 200%',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          animation: `${gradientShift} 3s ease infinite`,
          display: { xs: 'none', md: 'inline' }, // Скрываем текст на мобильных устройствах
        }}
      >
        Viktorija Autokool Nõmme
      </Typography>
    </Box>
  );
}
