'use client';

import { useEffect, useState } from 'react';
import { CookieConsent, getConsentCookie } from '@/lib/utils/cookies';
import CookieBanner from './cookie-consent/cookie-banner';
import { initializeAnalytics } from '@/lib/analytics/google-analytics';

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = getConsentCookie();
    if (!consent) {
      setShowBanner(true);
    } else if (consent.analytics) {
      initializeAnalytics();
    }
  }, []);

  const handleConsent = (consent: CookieConsent) => {
    setShowBanner(false);
    if (consent.analytics) {
      initializeAnalytics();
    }
  };

  if (!showBanner) return null;

  return <CookieBanner onConsent={handleConsent} />;
}