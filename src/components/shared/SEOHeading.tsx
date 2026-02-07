import React from 'react';
import { useTranslation } from 'react-i18next';
import { getLocalizedH1 } from './SEO.tsx';

interface SEOHeadingProps {
  hidden?: boolean;
  className?: string;
}

/**
 * SEO H1 Heading component - displays localized H1 tag on all pages
 * Can be visually hidden for SEO purposes while keeping it accessible
 */
export default function SEOHeading({ hidden = true, className }: SEOHeadingProps) {
  const { i18n } = useTranslation();
  const h1Text = getLocalizedH1(i18n.language || 'et');

  // Always render H1 tag for SEO - use native HTML h1 element
  return (
    <h1
      className={className}
      style={{
        position: hidden ? 'absolute' : 'relative',
        width: hidden ? '1px' : 'auto',
        height: hidden ? '1px' : 'auto',
        padding: hidden ? 0 : undefined,
        margin: hidden ? '-1px' : undefined,
        overflow: hidden ? 'hidden' : 'visible',
        clipPath: hidden ? 'inset(50%)' : 'none',
        whiteSpace: hidden ? 'nowrap' : 'normal',
        border: hidden ? 0 : undefined,
        textAlign: hidden ? undefined : 'center',
        fontSize: hidden ? undefined : 'clamp(2rem, 2.5vw, 3rem)',
        fontWeight: hidden ? undefined : 'bold',
        marginBottom: hidden ? undefined : '1rem',
      }}
    >
      {h1Text}
    </h1>
  );
}

