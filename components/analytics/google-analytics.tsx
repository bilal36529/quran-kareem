'use client';

import Script from 'next/script';
import { useEffect } from 'react';
import { SITE_CONFIG } from '@/lib/constants';

export default function GoogleAnalytics() {
  if (!SITE_CONFIG.analytics.enabled || !SITE_CONFIG.analytics.gaId) {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${SITE_CONFIG.analytics.gaId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${SITE_CONFIG.analytics.gaId}', {
            page_path: window.location.pathname,
            anonymize_ip: true,
            cookie_flags: 'SameSite=Lax;Secure'
          });
        `}
      </Script>
    </>
  );
}