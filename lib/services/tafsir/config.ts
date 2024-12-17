export const TAFSIR_CONFIG = {
  API_BASE: 'https://api.quran.com/api/v4',
  ENDPOINTS: {
    TAFSIRS: '/resources/tafsirs',
    VERSES: '/verses/by_key',
    TAFSIR: '/tafsirs'
  },
  CACHE_PREFIX: 'tafsir-cache-',
  CACHE_DURATION: 24 * 60 * 60 * 1000, // 24 hours
  REQUEST_TIMEOUT: 8000,
} as const;

export const TAFSIR_EDITIONS = [
  {
    id: 169,
    name: 'Tafsir Ibn Kathir',
    author: 'Ibn Kathir',
    language: 'en',
    direction: 'ltr',
    slug: 'en-tafisr-ibn-kathir'
  },
  {
    id: 171,
    name: 'تفسير الطبري',
    author: 'الطبري',
    language: 'ar',
    direction: 'rtl',
    slug: 'ar-tafsir-tabari'
  },
  {
    id: 93,
    name: 'تفسير السعدي',
    author: 'عبد الرحمن السعدي',
    language: 'ar',
    direction: 'rtl',
    slug: 'ar-tafsir-saadi'
  },
  {
    id: 167,
    name: 'Maarif-ul-Quran',
    author: 'Muhammad Shafi Usmani',
    language: 'en',
    direction: 'ltr',
    slug: 'en-tafsir-maarif-ul-quran'
  }
] as const;

export type TafsirEditionId = typeof TAFSIR_EDITIONS[number]['id'];