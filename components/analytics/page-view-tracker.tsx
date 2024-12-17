'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { trackPageView } from '@/lib/analytics/google-analytics';

export default function PageViewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Track page view when pathname or search params change
    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');
    trackPageView(url);
  }, [pathname, searchParams]);

  return null;
}