/**
 * Google Analytics utility functions for tracking user interactions
 */

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

/**
 * Track a button click event in Google Analytics
 * @param buttonName - The name/identifier of the button
 * @param eventCategory - Category of the event: 'info' (email, phone, etc.) or 'payment' (Stripe payment)
 * @param buttonLocation - Where the button is located (e.g., 'hero', 'pricing', 'cta')
 * @param buttonText - The visible text on the button
 * @param buttonUrl - The URL the button links to (if applicable)
 */
export function trackButtonClick(
  buttonName: string,
  eventCategory: 'info' | 'payment',
  buttonLocation?: string,
  buttonText?: string,
  buttonUrl?: string
): void {
  if (typeof window === 'undefined' || !window.gtag) {
    // Fallback for development or if gtag is not loaded
    if (process.env.NODE_ENV === 'development') {
      console.log('GA Event:', {
        event: 'button_click',
        event_category: eventCategory,
        button_name: buttonName,
        button_location: buttonLocation,
        button_text: buttonText,
        button_url: buttonUrl,
      });
    }
    return;
  }

  try {
    window.gtag('event', 'button_click', {
      event_category: eventCategory,
      event_label: buttonName,
      button_name: buttonName,
      button_location: buttonLocation || 'unknown',
      button_text: buttonText || '',
      button_url: buttonUrl || '',
    });
  } catch (error) {
    console.error('Error tracking button click:', error);
  }
}

/**
 * Track a link click event in Google Analytics
 * @param linkUrl - The URL being clicked
 * @param linkText - The visible text of the link
 * @param linkLocation - Where the link is located
 */
export function trackLinkClick(
  linkUrl: string,
  linkText?: string,
  linkLocation?: string
): void {
  if (typeof window === 'undefined' || !window.gtag) {
    if (process.env.NODE_ENV === 'development') {
      console.log('GA Event:', {
        event: 'link_click',
        link_url: linkUrl,
        link_text: linkText,
        link_location: linkLocation,
      });
    }
    return;
  }

  try {
    window.gtag('event', 'link_click', {
      event_category: 'engagement',
      event_label: linkUrl,
      link_url: linkUrl,
      link_text: linkText || '',
      link_location: linkLocation || 'unknown',
    });
  } catch (error) {
    console.error('Error tracking link click:', error);
  }
}

/**
 * Track a form submission event in Google Analytics
 * @param formName - The name/identifier of the form
 * @param formLocation - Where the form is located
 */
export function trackFormSubmit(
  formName: string,
  formLocation?: string
): void {
  if (typeof window === 'undefined' || !window.gtag) {
    if (process.env.NODE_ENV === 'development') {
      console.log('GA Event:', {
        event: 'form_submit',
        form_name: formName,
        form_location: formLocation,
      });
    }
    return;
  }

  try {
    window.gtag('event', 'form_submit', {
      event_category: 'engagement',
      event_label: formName,
      form_name: formName,
      form_location: formLocation || 'unknown',
    });
  } catch (error) {
    console.error('Error tracking form submit:', error);
  }
}

