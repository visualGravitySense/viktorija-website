import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import MuiChip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import {
  AntiDesignBox,
  AntiDesignTypography,
  FloatingIcon,
  GradientText,
} from '../styles/antiDesign';
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';

import DevicesRoundedIcon from '@mui/icons-material/DevicesRounded';
import EdgesensorHighRoundedIcon from '@mui/icons-material/EdgesensorHighRounded';
import ViewQuiltRoundedIcon from '@mui/icons-material/ViewQuiltRounded';
import creditPreviewImg from '/credit-preview.png';
import highResImg from '/high-results-1.jpg';
import carsParkImg from '/cars-park-1.jpg';

interface FeatureItem {
  icon: React.ReactNode;
  title: string;
  description: string;
  note: string;
  imageLight: string;
  imageDark: string;
  pdfUrl: string;
}

interface ChipProps {
  selected?: boolean;
}

const StyledChip = styled(MuiChip)<ChipProps>(({ theme, selected }) => ({
  background: selected
    ? `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`
    : theme.palette.mode === 'dark'
    ? 'rgba(255, 255, 255, 0.05)'
    : 'rgba(0, 0, 0, 0.05)',
  color: selected ? theme.palette.primary.contrastText : theme.palette.text.primary,
  border: '1px solid',
  borderColor: selected
    ? 'transparent'
    : theme.palette.mode === 'dark'
    ? 'rgba(255, 255, 255, 0.1)'
    : 'rgba(0, 0, 0, 0.1)',
  '&:hover': {
    background: selected
      ? `linear-gradient(45deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`
      : theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, 0.08)'
      : 'rgba(0, 0, 0, 0.08)',
  },
}));

const FeatureCard = styled(Card)(({ theme }) => ({
  position: 'relative',
  background: theme.palette.mode === 'dark'
    ? 'rgba(18, 18, 18, 0.8)'
    : 'rgba(255, 255, 255, 0.8)',
  backdropFilter: 'blur(10px)',
  boxShadow: theme.palette.mode === 'dark'
    ? '0 8px 32px rgba(0, 0, 0, 0.4)'
    : '0 8px 32px rgba(0, 0, 0, 0.1)',
  border: '1px solid',
  borderColor: theme.palette.mode === 'dark'
    ? 'rgba(255, 255, 255, 0.1)'
    : 'rgba(0, 0, 0, 0.1)',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'url("/pattern.png")',
    opacity: theme.palette.mode === 'dark' ? 0.03 : 0.05,
    borderRadius: '16px',
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  position: 'relative',
  padding: '12px 24px',
  background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  color: theme.palette.primary.contrastText,
  borderRadius: '8px',
  fontWeight: 600,
  textTransform: 'none',
  boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 20px rgba(0,0,0,0.3)',
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'url("/pattern.png")',
    opacity: 0.1,
    borderRadius: '8px',
  },
}));

interface MobileLayoutProps {
  selectedItemIndex: number;
  handleItemClick: (index: number) => void;
  selectedFeature: FeatureItem;
}

export function MobileLayout({
  selectedItemIndex,
  handleItemClick,
  selectedFeature,
}: MobileLayoutProps) {
  const { t } = useTranslation();
  const items = getFeatureItems(t);
  
  if (!items[selectedItemIndex]) {
    return null;
  }

  return (
    <Box
      sx={{
        display: { xs: 'flex', sm: 'none' },
        flexDirection: 'column',
        gap: 2,
      }}
    >
      <Box sx={{ display: 'flex', gap: 2, overflow: 'auto' }}>
        {items.map(({ title }, index) => (
          <StyledChip
            size="medium"
            key={index}
            label={title}
            onClick={() => handleItemClick(index)}
            selected={selectedItemIndex === index}
          />
        ))}
      </Box>
      <FeatureCard variant="outlined">
        {items[selectedItemIndex].pdfUrl && items[selectedItemIndex].imageLight ? (
          <Box
            sx={{
              mb: 2,
              minHeight: 280,
              position: 'relative',
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              backgroundImage: 'var(--items-imageLight)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'flex-end',
              pb: 3, // padding at bottom for button
            }}
            style={
              items[selectedItemIndex]
                ? ({
                    '--items-imageLight': items[selectedItemIndex].imageLight,
                    '--items-imageDark': items[selectedItemIndex].imageDark,
                  } as any)
                : {}
            }
          >
            <Button 
              variant="contained" 
              color="primary"
              component="a"
              href={items[selectedItemIndex].pdfUrl}
              target="_blank"
              sx={{ pointerEvents: 'auto', mt: 'auto' }}
            >
              {/* {t('features.view_document')} */}
              {t('features.view_report')}
            </Button>
          </Box>
        ) : (
          <Box
            sx={(theme) => ({
              mb: 2,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              minHeight: 280,
              backgroundImage: 'var(--items-imageLight)',
              ...theme.applyStyles('dark', {
                backgroundImage: 'var(--items-imageDark)',
              }),
            })}
            style={
              items[selectedItemIndex]
                ? ({
                    '--items-imageLight': items[selectedItemIndex].imageLight,
                    '--items-imageDark': items[selectedItemIndex].imageDark,
                  } as any)
                : {}
            }
          />
        )}
        <Box sx={{ px: 2, pb: 2 }}>
          <Typography
            gutterBottom
            sx={{ color: 'text.primary', fontWeight: 'medium' }}
          >
            {selectedFeature.title}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1.5 }}>
            {selectedFeature.description}
          </Typography>
        </Box>
      </FeatureCard>
    </Box>
  );
}

function getFeatureItems(t: any): FeatureItem[] {
  return [
    {
      icon: <span style={{ fontSize: 32 }}>🏆</span>,
      title: t('features.feature5'),
      description: t('features.feature5_desc'),
      note: t('features.feature5_desc'),
      imageLight: `url("${creditPreviewImg}")`,
      imageDark: `url("${creditPreviewImg}")`,
      // pdfUrl: '/Krediidireiting_ENG.pdf',
      pdfUrl: `${import.meta.env.BASE_URL}Krediidireiting_ENG.pdf`,
    },
    {
      icon: <span style={{ fontSize: 32 }}>📊</span>,
      title: t('features.feature6'),
      description: t('features.feature6_desc'),
      note: t('features.feature6_desc'),
      imageLight: `url("${highResImg}")`,
      imageDark: `url("${highResImg}")`,
      pdfUrl: '',
    },
    {
      icon: <span style={{ fontSize: 32 }}>🚗</span>,
      title: t('features.feature2'),
      description: t('features.feature2_desc'),
      note: t('features.feature2_desc'),
      imageLight: `url("${carsParkImg}")`,
      imageDark: `url("${carsParkImg}")`,
      pdfUrl: '',
    },
  ];
}

interface FeaturesProps {
  heading?: string;
}

export default function Features({ heading }: FeaturesProps) {
  const [selectedItemIndex, setSelectedItemIndex] = React.useState(0);
  const theme = useTheme();
  const { t } = useTranslation();
  
  const items = getFeatureItems(t);

  const handleItemClick = (index: number) => {
    setSelectedItemIndex(index);
  };

  const selectedFeature = items[selectedItemIndex];

  return (
    <Container id="features" sx={{ py: { xs: 8, sm: 16 } }}>
      <Box sx={{ width: { sm: '100%', md: '60%' }, display: 'inline-block' }}>
        <GradientText variant="h4" gutterBottom>
          {heading || t('features.title')}
        </GradientText>
        {/* <AntiDesignTypography variant="body1" sx={{ mb: { xs: 2, sm: 4 } }}>
          {t('features.subtitle')}
        </AntiDesignTypography> */}
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row-reverse' },
          gap: 2,
        }}
      >
        <div>
          <Box
            sx={{
              display: { xs: 'none', sm: 'flex' },
              flexDirection: 'column',
              gap: 2,
              height: '100%',
            }}
          >
            {items.map(({ icon, title, description, note }, index) => (
              <Box
                key={index}
                component={Button}
                onClick={() => handleItemClick(index)}
                sx={[
                  {
                    p: 2,
                    height: '100%',
                    width: '100%',
                    background: theme.palette.mode === 'dark'
                      ? 'rgba(18, 18, 18, 0.8)'
                      : 'rgba(255, 255, 255, 0.8)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid',
                    borderColor: theme.palette.mode === 'dark'
                      ? 'rgba(255, 255, 255, 0.1)'
                      : 'rgba(0, 0, 0, 0.1)',
                    '&:hover': {
                      background: theme.palette.mode === 'dark'
                        ? 'rgba(18, 18, 18, 0.9)'
                        : 'rgba(255, 255, 255, 0.9)',
                      color: '#222',
                    },
                  },
                  selectedItemIndex === index && {
                    background: `linear-gradient(45deg, ${theme.palette.primary.light}, ${theme.palette.secondary.light})`,
                    color: '#222',
                  },
                ]}
              >
                <Box
                  sx={[
                    {
                      width: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'left',
                      gap: 1,
                      textAlign: 'left',
                      textTransform: 'none',
                      color: 'text.secondary',
                    },
                    selectedItemIndex === index && {
                      color: '#222',
                    },
                  ]}
                >
                  {React.cloneElement(icon, { style: selectedItemIndex === index ? { color: '#222' } : {} })}
                  <Typography variant="h6" sx={selectedItemIndex === index ? { color: '#222' } : {}}>{title}</Typography>
                  <Typography variant="body2" sx={selectedItemIndex === index ? { color: '#222' } : {}}>{description}</Typography>
                  {/* <Typography variant="caption" sx={{ fontStyle: 'italic', ...(selectedItemIndex === index ? { color: '#222' } : {}) }}>
                    {note}
                  </Typography> */}
                </Box>
              </Box>
            ))}
          </Box>
          <MobileLayout
            selectedItemIndex={selectedItemIndex}
            handleItemClick={handleItemClick}
            selectedFeature={selectedFeature}
          />
        </div>
        <Box
          sx={{
            display: { xs: 'none', sm: 'flex' },
            width: { xs: '100%', md: '70%' },
            height: 'var(--items-image-height)',
          }}
        >
          <FeatureCard
            variant="outlined"
            sx={{
              height: '100%',
              width: '100%',
              display: { xs: 'none', sm: 'flex' },
              // pointerEvents: 'none',
            }}
          >
            {items[selectedItemIndex].pdfUrl && items[selectedItemIndex].imageLight ? (
              <Box
                sx={{
                  m: 'auto',
                  width: 420,
                  height: 320,
                  position: 'relative',
                  backgroundSize: 'contain',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center',
                  backgroundImage: 'var(--items-imageLight)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  pb: 3, // padding at bottom for button
                }}
                style={
                  items[selectedItemIndex]
                    ? ({
                        '--items-imageLight': items[selectedItemIndex].imageLight,
                        '--items-imageDark': items[selectedItemIndex].imageDark,
                      } as any)
                    : {}
                }
              >
                <Button 
                  variant="contained" 
                  color="primary"
                  component="a"
                  href={items[selectedItemIndex].pdfUrl}
                  target="_blank"
                  sx={{ pointerEvents: 'auto', mt: 'auto' }}
                >
                  {/* {t('features.view_document')} */}
                  {t('features.view_report')}
                </Button>
              </Box>
            ) : (
              <Box
                sx={(theme) => ({
                  m: 'auto',
                  width: 420,
                  height: 320,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundImage: 'var(--items-imageLight)',
                  ...theme.applyStyles('dark', {
                    backgroundImage: 'var(--items-imageDark)',
                  }),
                })}
                style={
                  items[selectedItemIndex]
                    ? ({
                        '--items-imageLight': items[selectedItemIndex].imageLight,
                        '--items-imageDark': items[selectedItemIndex].imageDark,
                      } as any)
                    : {}
                }
              />
            )}
          </FeatureCard>
        </Box>
      </Box>
      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Typography
          variant="body1"
          sx={{ color: 'text.secondary', fontStyle: 'italic', mb: 2 }}
        >
            {t('features.subtitle')}
        </Typography>
        <StyledButton variant="contained" size="large" href="https://buy.stripe.com/14A28s0Fs4lycgtg1i3ZK00">
          {t('features.feature3')}
        </StyledButton>
      </Box>
    </Container>
  );
}
