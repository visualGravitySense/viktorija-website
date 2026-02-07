/**
 * OptimizedImage Component
 * 
 * Provides responsive image loading with WebP/AVIF support and lazy loading
 * Usage: <OptimizedImage src="/image.jpg" alt="Description" priority={false} />
 */

import React from 'react';
import { Box, BoxProps } from '@mui/material';

interface OptimizedImageProps extends Omit<BoxProps, 'component'> {
  src: string;
  alt: string;
  priority?: boolean; // If true, loads eagerly (for above-fold images)
  width?: number | string;
  height?: number | string;
  sizes?: string; // For responsive images
}

export default function OptimizedImage({
  src,
  alt,
  priority = false,
  width,
  height,
  sizes = '100vw',
  sx,
  ...props
}: OptimizedImageProps) {
  // Generate WebP and AVIF variants (assuming they exist after build optimization)
  const basePath = src.replace(/\.(jpg|jpeg|png)$/i, '');
  const webpSrc = `${basePath}.webp`;
  const avifSrc = `${basePath}.avif`;

  return (
    <Box
      component="picture"
      sx={{
        display: 'block',
        width: '100%',
        height: 'auto',
        ...sx,
      }}
      {...props}
    >
      {/* AVIF format (best compression) */}
      <source
        srcSet={`${avifSrc} 1x, ${avifSrc.replace('.avif', '@2x.avif')} 2x`}
        type="image/avif"
      />
      {/* WebP format (fallback) */}
      <source
        srcSet={`${webpSrc} 1x, ${webpSrc.replace('.webp', '@2x.webp')} 2x`}
        type="image/webp"
      />
      {/* Original format (final fallback) */}
      <Box
        component="img"
        src={src}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        fetchpriority={priority ? 'high' : 'auto'}
        width={width}
        height={height}
        sizes={sizes}
        sx={{
          display: 'block',
          width: '100%',
          height: 'auto',
          maxWidth: '100%',
        }}
      />
    </Box>
  );
}
