'use client';

import { ThemeProvider } from '@/components/theme-provider';
import { TooltipProvider } from '@/components/ui/tooltip';
import { AudioProvider } from '@/lib/audio-context';
import { FontProvider } from '@/lib/font-context';
import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Toaster } from '@/components/ui/toaster';
import CookieConsent from '@/components/cookie-consent';
import Header from '@/components/header';
import Footer from '@/components/footer';
import PageViewTracker from '@/components/analytics/page-view-tracker';
import { clearLocalStorageIfNeeded } from '@/lib/utils';

const GoogleAnalytics = dynamic(() => import('./analytics/google-analytics'), {
  ssr: false
});

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  useEffect(() => {
    clearLocalStorageIfNeeded();
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
          <TooltipProvider>
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
              <PageViewTracker />
              <GoogleAnalytics />
              <Toaster />
              <CookieConsent />
            </div>
          </TooltipProvider>
        </FontProvider>
      </AudioProvider>
    </ThemeProvider>
  );
}