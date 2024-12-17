'use client';

import { SearchResult, SearchFilters } from './types';
import { Chapter } from './types';

const SEARCH_API_BASE = 'https://api.qurancdn.com/api/qdc/search';
const CHAPTERS_API = 'https://api.qurancdn.com/api/qdc/chapters';

const CHAPTER_NAMES = {
  'al-fatihah': ['الفاتحة', 'alfatiha', 'al fatiha', 'the opener'],
  'al-baqarah': ['البقرة', 'albaqara', 'al baqara', 'the cow'],
  'ali-imran': ['آل عمران', 'al imran', 'ali imran', 'family of imran'],
  'an-nisa': ['النساء', 'alnisa', 'an nisa', 'the women'],
  'al-maidah': ['المائدة', 'almaidah', 'al maida', 'the table spread'],
  'al-anam': ['الأنعام', 'alanam', 'al anam', 'the cattle'],
  // Add more chapter names and variations
};

function normalizeSearchTerm(term: string): string {
  return term
    .toLowerCase()
    .replace(/[^\w\s]/g, '') // Remove special characters
    .replace(/\s+/g, ' ') // Normalize spaces
    .trim();
}

function findChapterByName(query: string): number[] {
  const normalizedQuery = normalizeSearchTerm(query);
  
  const matches: number[] = [];
  Object.entries(CHAPTER_NAMES).forEach(([key, variations], index) => {
    const allVariations = [key, ...variations].map(normalizeSearchTerm);
    if (allVariations.some(variation => 
      variation.includes(normalizedQuery) || 
      normalizedQuery.includes(variation)
    )) {
      matches.push(index + 1); // Chapter numbers start at 1
    }
  });
  
  return matches;
}

export async function searchQuran(
  query: string,
  filters: SearchFilters = {},
  page: number = 1
): Promise<SearchResult> {
  try {
    const normalizedQuery = query.trim();
    if (!normalizedQuery) {
      throw new Error('Search query is required');
    }

    // Try to find chapters by name first
    const matchedChapterNumbers = findChapterByName(normalizedQuery);

    if (matchedChapterNumbers.length > 0) {
      const chaptersResponse = await fetch(`${CHAPTERS_API}?language=en`);
      const chaptersData = await chaptersResponse.json();
      
      const matchedChapters = chaptersData.chapters.filter((chapter: any) =>
        matchedChapterNumbers.includes(chapter.id)
      );

      // If chapters are found, return them as results
      return {
        results: matchedChapters.map((chapter: any) => ({
          verseKey: `${chapter.id}:1`,
          text: chapter.name_arabic,
          translation: `${chapter.name_simple} - ${chapter.translated_name.name}`,
          highlightedText: chapter.name_arabic,
          highlightedTranslation: `${chapter.name_simple} - ${chapter.translated_name.name}`,
          chapter: chapter.id,
          verse: 1,
          isChapter: true,
        })),
        totalResults: matchedChapters.length,
        currentPage: 1,
        totalPages: 1,
      };
    }

    // If no chapters found, perform verse search
    const params = new URLSearchParams({
      q: normalizedQuery,
      size: '10',
      page: page.toString(),
      language: filters.language || '131',
      translations: '131',
    });

    if (filters.revelationType) {
      params.append('revelation_type', filters.revelationType.toUpperCase());
    }

    const response = await fetch(`${SEARCH_API_BASE}?${params.toString()}`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      cache: 'no-store'
    });

    if (!response.ok) {
      throw new Error(`Search failed: ${response.statusText}`);
    }

    const data = await response.json();

    if (!data.search?.results) {
      return {
        results: [],
        totalResults: 0,
        currentPage: 1,
        totalPages: 0,
      };
    }

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
  if (!query.trim()) return [];

  const searchTerm = query.toLowerCase();
  const arabicPattern = /[\u0600-\u06FF]/;
  const isArabic = arabicPattern.test(query);

  const suggestions: string[] = [];
  
  // Get suggestions from chapter names
  Object.entries(CHAPTER_NAMES).forEach(([key, variations]) => {
    const [arabic, transliteration, english, meaning] = variations;
    
    if (isArabic && arabic.includes(query)) {
      suggestions.push(arabic);
    } else if (
      normalizeSearchTerm(transliteration).includes(searchTerm) ||
      normalizeSearchTerm(english).includes(searchTerm) ||
      normalizeSearchTerm(meaning).includes(searchTerm)
    ) {
      suggestions.push(`${english} (${meaning})`);
    }
  });

  return suggestions.slice(0, 8);
}