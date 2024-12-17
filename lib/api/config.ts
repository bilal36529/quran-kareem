export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_BASE || 'https://api.qurancdn.com/api/qdc',
  AUDIO_BASE: process.env.NEXT_PUBLIC_AUDIO_BASE || 'https://everyayah.com/data',
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000,
  CACHE_TIME: 3600,
} as const;

export const API_ENDPOINTS = {
  CHAPTERS: '/chapters',
  VERSES: '/verses/by_chapter',
  VERSE: '/verses/by_key',
  SEARCH: '/search',
  AUDIO: '/audio_files',
} as const;