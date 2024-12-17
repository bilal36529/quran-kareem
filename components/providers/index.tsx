'use client';

import { ThemeProvider } from '@/components/theme-provider';
import { TooltipProvider } from '@/components/ui/tooltip';
import { AudioProvider } from '@/lib/audio-context';
import { FontProvider } from '@/lib/font-context';
import { FontProvider } from '@/lib/font-context';
import { useEffect } from 'react';
import { preloadResources } from '@/lib/utils/performance';
import { addSecurityHeaders } from '@/lib/utils/security';
import { initializeAnalytics, initializeAdsense } from '@/lib/utils/analytics';
import { ANALYTICS_CONFIG } from '@/lib/config/analytics';

export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const initializeApp = async () => {
      // Initialize core features
      preloadResources();
      addSecurityHeaders();

      // Initialize analytics if enabled
      if (ANALYTICS_CONFIG.enabled && !ANALYTICS_CONFIG.development) {
        await Promise.all([
          initializeAnalytics(),
          initializeAdsense()
        ]);
      }
    };

    initializeApp();
  }, []);

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <AudioProvider>
        <FontProvider>
        <FontProvider>
          <TooltipProvider>
            {children}
          </TooltipProvider>
        </FontProvider>
        </FontProvider>
      </AudioProvider>
    </ThemeProvider>
  );
}