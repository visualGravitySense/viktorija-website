import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import EmailIcon from '@mui/icons-material/Email';
import { useTranslation } from 'react-i18next';

export interface PhotoGalleryImage {
  src: string;
  alt: string;
  caption?: string;
}

export interface PhotoGalleryProps {
  title?: string;
  images: PhotoGalleryImage[];
}

export default function PhotoGallery({ title = 'Gallery', images }: PhotoGalleryProps) {
  const { t } = useTranslation();
  
  return (
    <Box sx={{ py: 8, backgroundColor: 'background.default' }}>
      <Container maxWidth="lg">
        {title && (
          <Typography variant="h3" align="center" gutterBottom sx={{ mb: 6 }}>
            {title}
          </Typography>
        )}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: '1fr 1fr',
              md: '1fr 1fr 1fr',
            },
            gap: 3,
          }}
        >
          {images.map((img, idx) => (
            <Box key={idx} sx={{ textAlign: 'center' }}>
              <Box
                component="img"
                src={img.src}
                alt={img.alt}
                sx={{
                  width: '100%',
                  maxWidth: 360,
                  height: 'auto',
                  borderRadius: 2,
                  boxShadow: 2,
                  mb: 1,
                }}
              />
              {img.caption && (
                <Typography variant="body2" color="text.secondary">
                  {img.caption}
                </Typography>
              )}
            </Box>
          ))}
        </Box>
        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Button
            variant="outlined"
            size="large"
            startIcon={<EmailIcon />}
            href="mailto:viktorijaautokool@hot.ee?subject=Registratsioon%20autokooli"
            sx={{
              px: 4,
              py: 1.5,
              borderWidth: 2,
              '&:hover': {
                borderWidth: 2,
              }
            }}
          >
            {t('common.send_email')}
          </Button>
        </Box>
      </Container>
    </Box>
  );
} 