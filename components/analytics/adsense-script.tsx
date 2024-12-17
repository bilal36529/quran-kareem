'use client';

import Script from 'next/script';
import { useEffect, useState } from 'react';
import { adSenseService } from '@/lib/services/adsense';

export default function AdSenseScript() {
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const initAdsense = async () => {
      if (isLoading || adSenseService.isInitialized()) return;
      setIsLoading(true);

      try {
        await adSenseService.initialize();
      } catch (err) {
        console.error('AdSense initialization error:', err);
        setError(err instanceof Error ? err : new Error('Failed to initialize AdSense'));
      } finally {
        setIsLoading(false);
      }
    };

    // Initialize after a short delay to ensure proper loading
    const timer = setTimeout(initAdsense, 2000);
    return () => clearTimeout(timer);
  }, [isLoading]);

  // Only render script in production
  if (process.env.NODE_ENV !== 'production') {
    return null;
  }

  return (
    <Script
      id="adsense-init"
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_ID}`}
      crossOrigin="anonymous"
      strategy="lazyOnload"
      onError={(e) => {
        console.error('AdSense script failed to load:', e);
        setError(new Error('Failed to load AdSense script'));
      }}
    />
  );
}