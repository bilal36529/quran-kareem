export const VERSES_CONFIG = {
  DEFAULT_PAGE: 1,
  DEFAULT_PER_PAGE: 20,
  MAX_PER_PAGE: 20,
  MIN_PER_PAGE: 5,
  DEFAULT_FIELDS: ['text_uthmani', 'verse_key'],
  DEFAULT_TRANSLATION: 131, // Sahih International
  CACHE_TIME: 3600, // 1 hour
  API_TIMEOUT: 10000, // 10 seconds
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000,
} as const;

export const BISMILLAH_EXCEPTIONS = {
  FATIHA: { chapter: 1, verse: 1 },
  NAML: { chapter: 27, verse: 30 },
};