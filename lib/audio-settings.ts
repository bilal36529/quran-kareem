'use client';

export interface AudioSettings {
  reciter: string;
  autoPlay: boolean;
  repeatEnabled: boolean;
  repeatCount: number;
  playbackSpeed: number;
  volume: number;
}

export const RECITERS = [
  { id: 'Abdul_Basit_Murattal_64kbps', name: 'Abdul Basit Murattal' },
  { id: 'Alafasy_64kbps', name: 'Mishary Alafasy' },
  { id: 'Husary_64kbps', name: 'Mahmoud Khalil Al-Husary' },
  { id: 'Minshawy_Murattal_128kbps', name: 'Mohamed Siddiq El-Minshawi' },
  { id: 'Mohammad_al_Tablaway_64kbps', name: 'Mohammad al Tablaway' },
];

export const DEFAULT_SETTINGS: AudioSettings = {
  reciter: 'Abdul_Basit_Murattal_64kbps',
  autoPlay: false,
  repeatEnabled: false,
  repeatCount: 1,
  playbackSpeed: 1,
  volume: 1,
};

export function getAudioUrl(reciterId: string, chapterNumber: number, verseNumber: number): string {
  const paddedChapter = String(chapterNumber).padStart(3, '0');
  const paddedVerse = String(verseNumber).padStart(3, '0');
  return `https://everyayah.com/data/${reciterId}/${paddedChapter}${paddedVerse}.mp3`;
}