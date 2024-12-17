import { TAFSIR_CONFIG } from './config';
import { TafsirContent, TafsirResponse } from './types';
import { TafsirError } from './errors';
import { formatTafsirContent } from './utils/formatter';
import { fetchWithTimeout } from './utils/fetch';
import { TafsirCache } from './utils/cache';

export async function getTafsir(
  chapterNumber: number,
  verseNumber: number,
  tafsirId: number
): Promise<TafsirContent> {
  const verseKey = `${chapterNumber}:${verseNumber}`;
  const cacheKey = `${verseKey}:${tafsirId}`;
  
  try {
    // Try cache first
    const cached = await TafsirCache.get(cacheKey);
    if (cached) return cached;

    // Fetch tafsir from API
    const url = `${TAFSIR_CONFIG.API_BASE}${TAFSIR_CONFIG.ENDPOINTS.TAFSIR}/${tafsirId}/by_ayah/${verseKey}`;
    const response = await fetchWithTimeout(url);

    if (!response.ok) {
      if (response.status === 404) {
        throw TafsirError.notFound();
      }
      throw TafsirError.networkError();
    }

    const data = await response.json();
    
    if (!data.tafsir || !data.tafsir.text) {
      throw TafsirError.invalidResponse();
    }

    // Get verse details for additional context
    const verseUrl = `${TAFSIR_CONFIG.API_BASE}${TAFSIR_CONFIG.ENDPOINTS.VERSES}/${verseKey}`;
    const verseResponse = await fetchWithTimeout(verseUrl);
    const verseData = await verseResponse.json();

    const content = formatTafsirContent({
      text: data.tafsir.text,
      verseText: verseData.verse.text_uthmani,
      verseTranslation: verseData.verse.translations?.[0]?.text || '',
      tafsirId,
      verse: {
        chapter: chapterNumber,
        number: verseNumber,
        key: verseKey
      }
    });

    // Cache the formatted content
    await TafsirCache.set(cacheKey, content);
    return content;

  } catch (error) {
    if (error instanceof TafsirError) {
      throw error;
    }
    console.error('Tafsir fetch error:', error);
    throw new TafsirError(
      'An unexpected error occurred while fetching tafsir',
      'UNKNOWN_ERROR',
      500
    );
  }
}