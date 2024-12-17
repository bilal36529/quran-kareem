'use client';

import { SearchResult, SearchFilters } from './types';

const SEARCH_API_BASE = 'https://api.qurancdn.com/api/qdc/search';

export async function searchQuran(
  query: string,
  filters: SearchFilters,
  page: number = 1
): Promise<SearchResult> {
  try {
    const params = new URLSearchParams({
      q: query,
      size: '10',
      page: page.toString(),
      language: filters.language || '131',
      translations: '131', // Sahih International
    });

    if (filters.revelationType) {
      params.append('revelation_type', filters.revelationType.toUpperCase());
    }

    const response = await fetch(`${SEARCH_API_BASE}?${params.toString()}`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      throw new Error(`Search failed: ${response.statusText}`);
    }

    const data = await response.json();

    return {
      results: data.search.results.map((result: any) => ({
        verseKey: result.verse_key,
        text: result.text,
        translation: result.translations[0]?.text || '',
        highlightedText: result.text,
        highlightedTranslation: result.translations[0]?.text || '',
        chapter: parseInt(result.verse_key.split(':')[0]),
        verse: parseInt(result.verse_key.split(':')[1]),
      })),
      totalResults: data.search.total_results || 0,
      currentPage: data.search.current_page || 1,
      totalPages: Math.ceil((data.search.total_results || 0) / 10),
    };
  } catch (error) {
    console.error('Search error:', error);
    throw error;
  }
}

export function getSearchSuggestions(query: string): string[] {
  const commonTerms = [
    'Allah', 'mercy', 'prayer', 'faith', 'paradise', 'heaven', 'hell',
    'prophet', 'messenger', 'guidance', 'light', 'truth', 'peace',
    'الله', 'الرحمن', 'الصلاة', 'الإيمان', 'الجنة', 'النار', 'الهدى'
  ];
  
  return commonTerms.filter(term => 
    term.toLowerCase().includes(query.toLowerCase())
  );
}