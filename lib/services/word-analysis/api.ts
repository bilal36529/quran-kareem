'use client';

import { fetchWithRetry } from '../api/fetch';
import { APIError } from '../api/errors';
import { WordAnalysis, VerseAnalysis } from '@/lib/types';
import { WordFields, VerseResponse } from './types';

const API_BASE = 'https://api.qurancdn.com/api/qdc';

function mapWordFields(word: WordFields): WordAnalysis {
  return {
    text: word.text_uthmani || word.text_indopak || '',
    transliteration: word.transliteration?.text || '',
    translation: word.translation?.text || '',
    rootWord: typeof word.root === 'string' 
      ? word.root 
      : word.root?.text || word.root?.arabic || null,
    grammarInfo: word.grammar ? {
      type: word.grammar.type || '',
      details: word.grammar.description || ''
    } : null
  };
}

export async function getVerseWordAnalysis(verseKey: string): Promise<VerseAnalysis> {
  try {
    const url = new URL(`${API_BASE}/verses/by_key/${verseKey}`);
    url.searchParams.set('language', 'en');
    url.searchParams.set('words', 'true');
    url.searchParams.set('word_fields', 'text_uthmani,text_indopak,transliteration,translation,root,grammar');
    url.searchParams.set('translation_fields', 'text');

    const response = await fetchWithRetry(url.toString(), {
      timeout: 10000,
      retries: 3,
      cache: 'force-cache'
    });
    
    const data = await response.json();

    if (!data.verse?.words) {
      throw new APIError(
        'Invalid API response format',
        'INVALID_RESPONSE',
        500
      );
    }

    const verse = data.verse as VerseResponse;
    
    return {
      verseKey: verse.verse_key,
      words: verse.words.map(mapWordFields)
    };
  } catch (error) {
    if (error instanceof APIError) {
      switch (error.code) {
        case 'NOT_FOUND':
          throw new APIError(
            'Word analysis not available for this verse',
            'NOT_FOUND',
            404
          );
        case 'TIMEOUT':
          throw new APIError(
            'Word analysis request timed out. Please try again.',
            'TIMEOUT',
            408
          );
        default:
          throw error;
      }
    }
    throw APIError.networkError(
      'Failed to load word analysis. Please check your connection.'
    )
  }
}