import { BISMILLAH_EXCEPTIONS } from './config';

export function removeBismillah(text: string, chapterNumber: number, verseNumber: number): string {
  const isBismillahException = 
    (chapterNumber === BISMILLAH_EXCEPTIONS.FATIHA.chapter && verseNumber === BISMILLAH_EXCEPTIONS.FATIHA.verse) ||
    (chapterNumber === BISMILLAH_EXCEPTIONS.NAML.chapter && verseNumber === BISMILLAH_EXCEPTIONS.NAML.verse);

  if (!isBismillahException) {
    return text.replace(/^بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ\s*/, '').trim();
  }
  
  return text;
}

export function formatAudioUrl(chapterNumber: number, verseNumber: number, reciter: string): string {
  const paddedChapter = String(chapterNumber).padStart(3, '0');
  const paddedVerse = String(verseNumber).padStart(3, '0');
  return `${process.env.NEXT_PUBLIC_AUDIO_BASE}/${reciter}/${paddedChapter}${paddedVerse}.mp3`;
}