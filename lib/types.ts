export interface Chapter {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: string;
}

export interface Verse {
  number: number;
  text: string;
  translation: string;
  audio: string;
  audioTimestamp: number;
  audioEndTimestamp: number;
  verseKey: string;
  juzNumber?: number;
}

export interface AllahName {
  id: number;
  name: string;
  transliteration: string;
  number: number;
  en: {
    meaning: string;
    desc: string;
  };
  ar: {
    meaning: string;
    desc: string;
  };
}

export interface SearchFilters {
  language?: string;
  revelationType?: 'meccan' | 'medinan';
  sortBy?: 'relevance' | 'verse_key';
  searchMode?: 'exact' | 'root' | 'word';
  includeContext?: boolean;
  includeTafsir?: boolean;
}

export interface SearchResult {
  results: {
    verseKey: string;
    text: string;
    translation: string;
    highlightedText: string;
    highlightedTranslation: string;
    chapter: number;
    verse: number;
  }[];
  totalResults: number;
  currentPage: number;
  totalPages: number;
}

export interface WordAnalysis {
  text: string;
  transliteration: string;
  translation: string;
  rootWord?: string;
  grammarInfo?: {
    type: string;
    details: string;
  };
}

export interface VerseAnalysis {
  verseKey: string;
  words: WordAnalysis[];
}

export interface ReadingPlan {
  id: string;
  name: string;
  goal: string;
  targetDate: string;
  chapters: number[];
  progress: {
    completed: number[];
    lastRead?: string;
  };
}

export interface ReadingProgress {
  lastReadDate: string;
  completedVerses: number[];
  bookmarks: string[];
  notes: { [key: string]: string };
}