'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const AnalyticsScript = dynamic(() => import('./analytics-script'), {
  ssr: false,
});

const AdSenseScript = dynamic(() => import('./adsense-script'), {
  ssr: false,
});

export default function HeadScripts() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Only render scripts after component mounts on client
  if (!mounted) return null;

  return (
    <>
      <AnalyticsScript />
      <AdSenseScript />
    </>
  );
}
