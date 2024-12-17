import { getTafsirContent } from './api/tafsir';
import { getVerseDetails } from './api/verse';
import { TafsirCache } from './cache';
import { formatTafsirContent } from './utils/formatter';
import { TafsirError } from './errors';
import { TafsirContent } from './types/models';
import { TAFSIR_EDITIONS } from './config';

export async function getTafsir(
  chapterNumber: number,
  verseNumber: number,
  tafsirId: number
): Promise<TafsirContent> {
  const verseKey = `${chapterNumber}:${verseNumber}`;
  const cacheKey = `${verseKey}:${tafsirId}`;

  try {
    // Check cache first
    const cached = await TafsirCache.get(cacheKey);
    if (cached) {
      return cached;
    }

    // Fetch verse details and tafsir content in parallel
    const [verseDetails, tafsirContent] = await Promise.all([
      getVerseDetails(verseKey),
      getTafsirContent(verseKey, tafsirId)
    ]);

    const content = formatTafsirContent({
      text: tafsirContent.tafsir.text,
      verseText: verseDetails.verse.text_uthmani,
      verseTranslation: verseDetails.verse.translations[0]?.text || '',
      tafsirId,
      verse: {
        key: verseKey,
        chapter: chapterNumber,
        number: verseNumber
      }
    });

    // Cache the result
    await TafsirCache.set(cacheKey, content);
    return content;

  } catch (error) {
    console.error('Error fetching tafsir:', error);
    
    if (error instanceof TafsirError) {
      throw error;
    }

    throw new TafsirError(
      'An unexpected error occurred',
      'UNKNOWN_ERROR',
      500
    );
  }
}

export { TAFSIR_EDITIONS };
export type { TafsirContent, TafsirEdition };