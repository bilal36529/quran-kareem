// Analytics utility for handling Google Analytics and AdSense
export const initializeAnalytics = async () => {
  if (typeof window === 'undefined') {
    return;
  }

  // Log analytics status in development
  if (ANALYTICS_CONFIG.development) {
    console.log('Analytics disabled in development');
    return;
  }

  if (!ANALYTICS_CONFIG.enabled || !ANALYTICS_CONFIG.gaId) {
    return;
  }

  // Initialize Google Analytics
  window.dataLayer = window.dataLayer || [];
  function gtag(...args: any[]) {
    window.dataLayer.push(args);
  }
  gtag('js', new Date());
  gtag('config', ANALYTICS_CONFIG.gaId, {
    page_path: window.location.pathname,
    anonymize_ip: true,
    cookie_flags: 'SameSite=Lax;Secure'
  });
};

export const initializeAdsense = async () => {
  if (typeof window === 'undefined') {
    return;
  }

  if (ANALYTICS_CONFIG.development || !ANALYTICS_CONFIG.enabled || !ANALYTICS_CONFIG.adsenseId) {
    return;
  }

  // Initialize AdSense
  (window.adsbygoogle = window.adsbygoogle || []).push({
    google_ad_client: ANALYTICS_CONFIG.adsenseId,
    enable_page_level_ads: true
  });
};