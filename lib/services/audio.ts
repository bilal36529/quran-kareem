import { audioService } from './audio-service';

export const AUDIO_BASE = 'https://everyayah.com/data';
export const DEFAULT_RECITER = 'Abdul_Basit_Murattal_64kbps';

export function padNumber(num: number, width: number): string {
  return String(num).padStart(width, '0');
}

export function getAudioUrl(chapterNumber: number, verseNumber: number, reciter: string = DEFAULT_RECITER): string {
  const paddedChapter = padNumber(chapterNumber, 3);
  const paddedVerse = padNumber(verseNumber, 3);
  return `${AUDIO_BASE}/${reciter}/${paddedChapter}${paddedVerse}.mp3`;
}

export { audioService };