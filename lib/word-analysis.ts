'use client';

import { WordAnalysis, VerseAnalysis } from './types';

const API_BASE = 'https://api.qurancdn.com/api/qdc';

interface FetchOptions {
  retries?: number;
  timeout?: number;
}

async function fetchWithRetry(url: string, options: FetchOptions = {}): Promise<Response> {
  const { retries = 3, timeout = 5000 } = options;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url, {
        mode: 'cors',
        headers: {
          'Accept': 'application/json',
          'Accept-Language': 'en,ar',
          'Origin': window.location.origin,
        },
        signal: controller.signal,
        next: { revalidate: 3600 }
      });
      
      clearTimeout(timeoutId);
      
      if (response.ok) return response;
      
      if (response.status === 404) {
        throw new Error('Word analysis not available for this verse');
      }
      
      throw new Error(`API error: ${response.status}`);
    } catch (error) {
      clearTimeout(timeoutId);
      
      if (error instanceof Error && error.name === 'AbortError') {
        throw new Error('Request timed out');
      }

      if (i === retries - 1) throw error;
      await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
    }
  }
  throw new Error('Failed after retries');
}

export async function getVerseWordAnalysis(verseKey: string): Promise<VerseAnalysis | null> {
  try {
    const url = new URL(`${API_BASE}/verses/by_key/${verseKey}`);
    url.searchParams.set('language', 'en');
    url.searchParams.set('words', 'true');
    url.searchParams.set('word_fields', 'text_uthmani,text_indopak,transliteration,translation,root,grammar');
    url.searchParams.set('translation_fields', 'text');

    const response = await fetchWithRetry(url);

    const data = await response.json();
    
    if (!data.verse || !data.verse.words) {
      if (response.status === 404) {
        throw new Error('Word analysis not available for this verse');
      }
      throw new Error(`API error: ${response.status}`);
    }

    const verse = data.verse;
    const words: WordAnalysis[] = verse.words.map((word: any) => ({
      text: word.text_uthmani || word.text_indopak || '',
      transliteration: word.transliteration?.text || '',
      translation: word.translation?.text || word.text_translation || '',
      rootWord: word.root?.text || word.root?.arabic || word.root || null,
      grammarInfo: word.grammar ? {
        type: word.grammar?.type || '',
        details: word.grammar?.description || ''
      } : null
    }));

    return {
      verseKey: verse.verse_key,
      words
    };
  } catch (error) {
    console.error('Word analysis error:', error);
    const message = error instanceof Error ? error.message : 'Failed to load word analysis';
    throw new Error(message);
    return null;
  }
}