'use client';

import { createContext, useContext, useState, useEffect } from 'react';

interface FontSettings {
  arabicSize: number;
  translationSize: number;
}

interface FontContextType {
  fontSettings: FontSettings;
  updateFontSettings: (settings: Partial<FontSettings>) => void;
}

const DEFAULT_SETTINGS: FontSettings = {
  arabicSize: 24,
  translationSize: 16,
};

const FontContext = createContext<FontContextType | undefined>(undefined);

export function FontProvider({ children }: { children: React.ReactNode }) {
  const [fontSettings, setFontSettings] = useState<FontSettings>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('font-settings');
      return stored ? { ...DEFAULT_SETTINGS, ...JSON.parse(stored) } : DEFAULT_SETTINGS;
    }
    return DEFAULT_SETTINGS;
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('font-settings', JSON.stringify(fontSettings));
      
      // Update CSS variables
      document.documentElement.style.setProperty('--arabic-font-size', `${fontSettings.arabicSize}px`);
      document.documentElement.style.setProperty('--translation-font-size', `${fontSettings.translationSize}px`);
    }
  }, [fontSettings]);

  const updateFontSettings = (newSettings: Partial<FontSettings>) => {
    setFontSettings(prev => ({ ...prev, ...newSettings }));
  };

  return (
    <FontContext.Provider value={{ fontSettings, updateFontSettings }}>
      {children}
    </FontContext.Provider>
  );
}

export function useFontSettings() {
  const context = useContext(FontContext);
  if (context === undefined) {
    throw new Error('useFontSettings must be used within a FontProvider');
  }
  return context;
}