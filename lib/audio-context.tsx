'use client';

import { createContext, useContext, useState, useEffect } from 'react';

export interface AudioSettings {
  reciter: string;
  autoPlay: boolean;
  repeatEnabled: boolean;
  repeatCount: number;
  playbackSpeed: number;
  volume: number;
}

export const DEFAULT_SETTINGS: AudioSettings = {
  reciter: 'Abdul_Basit_Murattal_64kbps',
  autoPlay: false,
  repeatEnabled: false,
  repeatCount: 1,
  playbackSpeed: 1,
  volume: 0.8
};

interface AudioContextType {
  globalSettings: AudioSettings;
  updateGlobalSettings: (settings: Partial<AudioSettings>) => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [globalSettings, setGlobalSettings] = useState<AudioSettings>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('audioSettings');
      return stored ? { ...DEFAULT_SETTINGS, ...JSON.parse(stored) } : DEFAULT_SETTINGS;
    }
    return DEFAULT_SETTINGS;
  });

  useEffect(() => {
    localStorage.setItem('audioSettings', JSON.stringify(globalSettings));
  }, [globalSettings]);

  const updateGlobalSettings = (settings: Partial<AudioSettings>) => {
    setGlobalSettings(prev => ({ ...prev, ...settings }));
  };

  return (
    <AudioContext.Provider value={{ globalSettings, updateGlobalSettings }}>
      {children}
    </AudioContext.Provider>
  );
}

export function useAudioSettings() {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error('useAudioSettings must be used within an AudioProvider');
  }
  return context;
}