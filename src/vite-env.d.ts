/// <reference types="vite/client" />

// Google Tag Manager / Google Ads types
declare global {
  interface Window {
    gtag?: (
      command: 'config' | 'event' | 'js' | 'set',
      targetId: string | Date,
      config?: {
        [key: string]: any;
      }
    ) => void;
    dataLayer?: any[];
  }
}

export {};
