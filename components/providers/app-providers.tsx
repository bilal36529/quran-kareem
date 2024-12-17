'use client';

import { ThemeProvider } from './theme-provider';
import { TooltipProvider } from '@/components/ui/tooltip';
import { AudioProvider } from '@/lib/audio-context';
import { FontProvider } from '@/lib/font-context';
import { useEffect } from 'react';
import { clearLocalStorageIfNeeded } from '@/lib/utils';

export function AppProviders({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    clearLocalStorageIfNeeded();
  }, []);

  return (
    <ThemeProvider>
      <AudioProvider>
        <FontProvider>
          <TooltipProvider>
            {children}
          </TooltipProvider>
        </FontProvider>
      </AudioProvider>
    </ThemeProvider>
  );
}