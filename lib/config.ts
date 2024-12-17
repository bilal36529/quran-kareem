export const API_CONFIG = {
  QURAN_API_BASE: 'https://api.qurancdn.com/api/qdc',
  AUDIO_BASE: 'https://everyayah.com/data',
  DEFAULT_RECITER: 'Abdul_Basit_Murattal_64kbps',
  
  // API Configuration
  REQUEST_TIMEOUT: 10000, // 10 seconds
  MAX_RETRIES: 2,
  CACHE_DURATION: 24 * 60 * 60 * 1000, // 24 hours
  
  ENDPOINTS: {
    CHAPTERS: '/chapters',
    VERSES: '/verses/by_chapter',
    VERSE: '/verses/by_key',
    TRANSLATIONS: '/resources/translations',
    AUDIO: '/audio_files',
  }
} as const;