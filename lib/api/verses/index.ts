import { fetchVerses } from './fetch';
import { removeBismillah, formatAudioUrl } from './utils';
import { VERSES_CONFIG } from './config';
import { Verse } from '@/lib/types';
import { VersesRequestParams } from './types';
import { chunk, getCachedChunk } from '@/lib/utils/array';

export async function getVerses(
  chapterNumber: number,
  params: VersesRequestParams = {}
): Promise<{
  verses: Verse[];
  hasNextPage: boolean;
  totalPages: number;
  currentPage: number;
}> {
  try {
    // Check cache for subsequent pages
    if (params.page && params.page > 1) {
      const cachedChunk = await getCachedChunk<Verse>(`verses-${chapterNumber}-page-${params.page}`);
      if (cachedChunk) {
        return {
          verses: cachedChunk,
          hasNextPage: params.page < (params.perPage || VERSES_CONFIG.DEFAULT_PER_PAGE),
          totalPages: Math.ceil(cachedChunk.length / (params.perPage || VERSES_CONFIG.DEFAULT_PER_PAGE)),
          currentPage: params.page
        };
      }
    }

    const response = await fetchVerses(chapterNumber, {
      page: params.page || VERSES_CONFIG.DEFAULT_PAGE,
      perPage: Math.min(
        params.perPage || VERSES_CONFIG.DEFAULT_PER_PAGE,
        VERSES_CONFIG.MAX_PER_PAGE
      ),
      translations: [VERSES_CONFIG.DEFAULT_TRANSLATION],
      ...params,
    });

    const verses = response.verses.map((verse): Verse => {
      const [chapter, verseNum] = verse.verse_key.split(':').map(Number);
      const text = removeBismillah(verse.text_uthmani, chapter, verseNum);
      const translation = verse.translations?.[0]?.text.replace(/<sup.*?<\/sup>/g, '') || '';
      const audioUrl = formatAudioUrl(chapter, verseNum, params.reciter || 'Abdul_Basit_Murattal_64kbps');

      return {
        number: verse.verse_number,
        text,
        translation,
        audio: audioUrl,
        audioTimestamp: 0,
        audioEndTimestamp: 0,
        verseKey: verse.verse_key,
        juzNumber: verse.juz_number,
      };
    });

    // Split large responses into chunks and cache them
    if (verses.length > VERSES_CONFIG.MAX_PER_PAGE) {
      const chunks = chunk(verses, VERSES_CONFIG.MAX_PER_PAGE);
      chunks.slice(1).forEach((chunk, index) => {
        localStorage.setItem(
          `verses-${chapterNumber}-page-${index + 2}`,
          JSON.stringify(chunk)
        );
      });
    }

    return {
      verses: verses.slice(0, params.perPage || VERSES_CONFIG.DEFAULT_PER_PAGE),
      hasNextPage: response.pagination.currentPage < response.pagination.totalPages,
      totalPages: response.pagination.totalPages,
      currentPage: response.pagination.currentPage
    };

  } catch (error) {
    console.error('Error fetching verses:', error);
    throw error;
  }
}