import { apiClient } from '../client';
import { VERSES_CONFIG } from './config';
import { VersesRequestParams, VersesResponse } from './types';
import { chunk } from '@/lib/utils';

export async function fetchVerses(
  chapterNumber: number,
  params: VersesRequestParams = {}
): Promise<VersesResponse> {
  // Implement pagination to handle large chapters
  const perPage = Math.min(
    Math.max(params.perPage || VERSES_CONFIG.DEFAULT_PER_PAGE, VERSES_CONFIG.MIN_PER_PAGE),
    VERSES_CONFIG.MAX_PER_PAGE
  );

  // Only fetch required fields to reduce payload size
  const fields = params.fields?.length 
    ? params.fields 
    : ['verse_key', 'text_uthmani', 'verse_number', 'juz_number'];

  const url = new URL(`${process.env.NEXT_PUBLIC_API_BASE}/verses/by_chapter/${chapterNumber}`);
  
  // Add query parameters
  url.searchParams.set('page', (params.page || VERSES_CONFIG.DEFAULT_PAGE).toString());
  url.searchParams.set('per_page', perPage.toString());
  url.searchParams.set('fields', fields.join(','));
  url.searchParams.set('translations', (params.translations || [VERSES_CONFIG.DEFAULT_TRANSLATION]).join(','));
  url.searchParams.set('language', 'en');
  url.searchParams.set('word_fields', 'text_uthmani'); // Minimize word fields

  const response = await apiClient.fetch<VersesResponse>(url.toString(), {
    next: { revalidate: VERSES_CONFIG.CACHE_TIME }
  });

  // Process verses in chunks to avoid memory issues
  if (response.verses.length > 50) {
    const chunks = chunk(response.verses, 50);
    response.verses = chunks[0]; // Return first chunk
    
    // Cache remaining chunks for later
    chunks.slice(1).forEach((chunk, index) => {
      const pageNum = index + 2;
      localStorage.setItem(
        `verses-${chapterNumber}-page-${pageNum}`,
        JSON.stringify(chunk)
      );
    });
  }

  return response;
}