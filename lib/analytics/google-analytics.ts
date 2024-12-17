// Google Analytics module
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

import { SITE_CONFIG } from '@/lib/constants';

export function initializeAnalytics() {
  if (typeof window === 'undefined') return;
  if (process.env.NODE_ENV !== 'production') {
    console.log('Analytics disabled in development');
    return;
  }
  if (!SITE_CONFIG.analytics.enabled || !SITE_CONFIG.analytics.gaId) {
    console.warn('Google Analytics ID not configured');
    return;
  }

  const loadGtag = () => {
    if (window.gtag) return;

    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
      window.dataLayer.push(arguments);
    };

    // Add Google Analytics script
    const script = document.createElement('script');
    script.src = `https://www.googletagmanager.com/gtag/js?id=${SITE_CONFIG.analytics.gaId}`;
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      window.gtag('js', new Date());
      window.gtag('config', SITE_CONFIG.analytics.gaId!, {
        anonymize_ip: true,
        cookie_flags: 'SameSite=Lax;Secure',
        page_path: window.location.pathname
      });
    };
  };

  loadGtag();
}

export function trackPageView(url: string) {
  if (typeof window === 'undefined' || !window.gtag) return;
  
  window.gtag('config', process.env.NEXT_PUBLIC_GA_ID!, {
    page_path: url,
  });
}

export function trackEvent(action: string, category: string, label?: string, value?: number) {
  if (typeof window === 'undefined' || !window.gtag) return;

  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value
  });
}

// Track specific Quran interactions
export function trackQuranInteraction(type: 'read' | 'listen' | 'bookmark', details: {
  chapter?: number;
  verse?: number;
  reciter?: string;
}) {
  trackEvent(type, 'quran_interaction', JSON.stringify(details));
}