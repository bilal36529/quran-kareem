'use client';

import Script from 'next/script';
import { useEffect, useState } from 'react';
import { initializeAnalytics } from '@/lib/analytics/google-analytics';

export default function AnalyticsScript() {
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (!initialized) {
      initializeAnalytics();
      setInitialized(true);
    }
  }, [initialized]);

  return (
    <>
      <Script
        id="gtag-base"
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
      />
      <Script
        id="gtag-config"
        strategy="afterInteractive"
      >
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
            page_path: window.location.pathname,
            anonymize_ip: true
          });
        `}
      </Script>
    </>
  );
}