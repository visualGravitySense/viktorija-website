import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { styled, keyframes } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import { getLocalizedH2 } from '../../shared/SEO.tsx';

const fadeInDown = keyframes`
  from {
    opacity: 0;
    transform: translateY(-30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const TestimonialCard = styled(Card)(({ theme }) => ({
  background: '#ffffff',
  borderRadius: '24px',
  padding: '40px',
  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.2)',
  position: 'relative',
  overflow: 'hidden',
  transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  [theme.breakpoints.down('sm')]: {
    padding: '32px 24px',
  },
  '&::before': {
    
    position: 'absolute',
    top: '20px',
    left: '30px',
    fontSize: '120px',
    fontFamily: 'Georgia, serif',
    color: 'rgba(102, 126, 234, 0.1)',
    lineHeight: 1,
    fontWeight: 700,
    [theme.breakpoints.down('sm')]: {
      fontSize: '80px',
      top: '10px',
      left: '20px',
    },
  },
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 30px 80px rgba(0, 0, 0, 0.3)',
    '& .avatar-box': {
      transform: 'scale(1.1) rotate(-5deg)',
    },
  },
}));

// Градиенты для аватаров
const avatarGradients = [
  'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
  'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
  'linear-gradient(135deg, #10b981 0%, #059669 100%)',
];

const AvatarBox = styled(Box)({
  width: { xs: '60px', sm: '70px' },
  height: { xs: '60px', sm: '70px' },
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: { xs: '1.5rem', sm: '1.75rem' },
  fontWeight: 700,
  color: 'white',
  flexShrink: 0,
  boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)',
  position: 'relative',
  transition: 'all 0.3s ease',
  '&::before': {
    content: '""',
    position: 'absolute',
    inset: '-4px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    zIndex: -1,
  },
});

export default function Testimonials() {
  const { t, i18n } = useTranslation();

  const testimonials = [
    {
      name: t('testimonials.testimonial1.author'),
      occupation: t('testimonials.testimonial1.role'),
      testimonial: t('testimonials.testimonial1.text'),
      initials: 'EK',
      rating: t('testimonials.testimonial1.rating', { defaultValue: '⭐⭐⭐⭐⭐' })
    },
    {
      name: t('testimonials.testimonial2.author'),
      occupation: t('testimonials.testimonial2.role'),
      testimonial: t('testimonials.testimonial2.text'),
      initials: 'MV',
      rating: t('testimonials.testimonial2.rating', { defaultValue: '⭐⭐⭐⭐⭐' })
    },
    {
      name: t('testimonials.testimonial3.author'),
      occupation: t('testimonials.testimonial3.role'),
      testimonial: t('testimonials.testimonial3.text'),
      initials: 'AS',
      rating: t('testimonials.testimonial3.rating', { defaultValue: '⭐⭐⭐⭐⭐' })
    }
  ];

  return (
    <Box
      id="testimonials"
      sx={{
        background: 'linear-gradient(135deg, #667eea 0%, hsl(210, 100%, 80%) 100%)',
        pt: { xs: 10, sm: 10 },
        pb: { xs: 10, sm: 10 },
        px: { xs: 2, sm: 2.5 },
        minHeight: '100vh',
      }}
    >
      <Container maxWidth="lg">
        {/* Section Header */}
        <Box
          sx={{
            textAlign: 'center',
            mb: { xs: 5, sm: 7.5 },
            animation: `${fadeInDown} 0.8s ease-out`,
          }}
        >
          <Typography
            component="h2"
            variant="h2"
            sx={{
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3.5rem' },
              fontWeight: 800,
              color: 'white',
              mb: 2.5,
              textShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
              lineHeight: 1.2,
            }}
          >
            {getLocalizedH2('testimonials', i18n.language || 'et')}
          </Typography>
          <Typography
            component="p"
            sx={{
              fontSize: { xs: '1.15rem', sm: '1.35rem' },
              color: 'rgba(255, 255, 255, 0.95)',
              fontWeight: 500,
              lineHeight: 1.6,
              maxWidth: '900px',
              mx: 'auto',
              py: 2.5,
              px: { xs: 2.5, sm: 3.75 },
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '16px',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
            }}
          >
            {t('testimonials.testimonial1.text', { defaultValue: 'Parim autokool linnas! Sooritasin eksami esimesel katsel tänu kannatlikele ja professionaalsetele instruktoritele. 30 päevaga juhiluba käes!' })}
          </Typography>
        </Box>

        {/* Testimonials Container */}
        <Box
          sx={{
            display: 'grid',
            gap: 4,
            mb: 7.5,
          }}
        >
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              sx={{
                animation: `${fadeInUp} 0.6s ease-out ${index * 0.1}s backwards`,
              }}
            >
              {/* Verified Badge */}
              <Box
                sx={{
                  position: 'absolute',
                  top: { xs: 16, sm: 20 },
                  right: { xs: 16, sm: 20 },
                  background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                  color: 'white',
                  py: 1,
                  px: 2,
                  borderRadius: '50px',
                  fontSize: { xs: '0.8rem', sm: '0.875rem' },
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.75,
                  boxShadow: '0 4px 12px rgba(34, 197, 94, 0.3)',
                  zIndex: 2,
                }}
              >
                <Box component="span">✓</Box>
                <Box component="span">Kinnitatud</Box>
              </Box>

              <CardContent sx={{ p: 0, position: 'relative', zIndex: 1 }}>
                {/* Card Header */}
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' },
                    alignItems: { xs: 'flex-start', sm: 'center' },
                    gap: 2.5,
                    mb: 3,
                  }}
                >
                  <Box className="avatar-box">
                    <AvatarBox 
                      sx={{ 
                        background: avatarGradients[index % avatarGradients.length] || avatarGradients[0],
                      }}
                    >
                      {testimonial.initials}
                    </AvatarBox>
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography
                      sx={{
                        fontSize: { xs: '1.25rem', sm: '1.5rem' },
                        fontWeight: 700,
                        color: '#1e293b',
                        mb: 0.5,
                      }}
                    >
                      {testimonial.name}
                    </Typography>
                    <Box
                      sx={{
                        fontSize: { xs: '0.9rem', sm: '1rem' },
                        color: '#64748b',
                        fontWeight: 500,
                        display: 'flex',
                        flexDirection: { xs: 'column', sm: 'row' },
                        alignItems: { xs: 'flex-start', sm: 'center' },
                        gap: 1,
                        mb: 1,
                      }}
                    >
                      <Box
                        component="span"
                        sx={{
                          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                          color: 'white',
                          py: 0.5,
                          px: 1.5,
                          borderRadius: '50px',
                          fontSize: '0.85rem',
                          fontWeight: 600,
                        }}
                      >
                        {testimonial.occupation}
                      </Box>
                    </Box>
                    {/* Rating */}
                    <Box
                      sx={{
                        display: 'flex',
                        gap: 0.5,
                        mt: 1,
                      }}
                    >
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Box
                          key={star}
                          component="span"
                          sx={{
                            color: '#fbbf24',
                            fontSize: '1.25rem',
                          }}
                        >
                          ★
                        </Box>
                      ))}
                    </Box>
                  </Box>
                </Box>

                {/* Testimonial Text */}
                <Typography
                  component="div"
                  sx={{
                    fontSize: { xs: '1.05rem', sm: '1.15rem' },
                    lineHeight: 1.8,
                    color: '#475569',
                    fontWeight: 400,
                  }}
                >
                  {(() => {
                    // Highlight key phrases in testimonial text
                    const text = testimonial.testimonial;
                    const highlightPatterns = [
                      /(eksami esimesel katsel)/g,
                      /(30 päevaga juhiluba käes!?)/g,
                      /(iga päev enesekindlalt! 100% soovitan!)/g,
                      /(tõeliselt hea juht)/g,
                    ];
                    
                    let highlightedText = text;
                    highlightPatterns.forEach((pattern) => {
                      highlightedText = highlightedText.replace(pattern, (match) => {
                        return `__HIGHLIGHT_START__${match}__HIGHLIGHT_END__`;
                      });
                    });
                    
                    const parts = highlightedText.split(/(__HIGHLIGHT_START__.*?__HIGHLIGHT_END__)/g);
                    
                    return (
                      <>
                        {parts.map((part, idx) => {
                          if (part.startsWith('__HIGHLIGHT_START__') && part.endsWith('__HIGHLIGHT_END__')) {
                            const highlightText = part.replace(/__HIGHLIGHT_START__|__HIGHLIGHT_END__/g, '');
                            return (
                              <Box
                                key={idx}
                                component="span"
                                sx={{
                                  background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.15) 0%, rgba(118, 75, 162, 0.15) 100%)',
                                  padding: '2px 6px',
                                  borderRadius: '4px',
                                  fontWeight: 600,
                                  color: '#5b21b6',
                                }}
                              >
                                {highlightText}
                              </Box>
                            );
                          }
                          return <Box key={idx} component="span">{part}</Box>;
                        })}
                      </>
                    );
                  })()}
                </Typography>
              </CardContent>
            </TestimonialCard>
          ))}
        </Box>

        {/* CTA Button */}
        
      </Container>
    </Box>
  );
}
