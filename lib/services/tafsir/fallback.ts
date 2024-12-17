import { Tafsir } from './types';
import { TAFSIR_RESOURCES } from './constants';

export function getFallbackTafsir(verseKey: string, tafsirId: number): Tafsir {
  const tafsirResource = TAFSIR_RESOURCES.find(t => t.id === tafsirId);
  
  return {
    id: tafsirId,
    name: tafsirResource?.name || 'Unknown Tafsir',
    authorName: tafsirResource?.author || 'Unknown Author',
    languageCode: tafsirResource?.language || 'en',
    text: `<div class="text-center p-4">
      <p class="text-muted-foreground mb-4">
        The tafsir for verse ${verseKey} is currently unavailable.
      </p>
      <p class="text-sm text-muted-foreground">
        Please try another verse or select a different tafsir.
      </p>
    </div>`
  };
}