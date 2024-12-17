export const TAFSIR_API_BASE = 'https://api.qurancdn.com/api/v4/tafsirs';

export const TAFSIR_RESOURCES = [
  { 
    id: 1, 
    name: 'Tafsir Ibn Kathir (English)', 
    language: 'en',
    author: 'Ibn Kathir'
  },
  { 
    id: 2, 
    name: 'Tafsir Al-Jalalayn (English)', 
    language: 'en',
    author: 'Jalal ad-Din al-Mahalli and Jalal ad-Din as-Suyuti'
  },
  { 
    id: 3, 
    name: 'تفسير ابن كثير', 
    language: 'ar',
    author: 'ابن كثير'
  },
  { 
    id: 4, 
    name: 'تفسير الجلالين', 
    language: 'ar',
    author: 'جلال الدين المحلي وجلال الدين السيوطي'
  }
] as const;

export type TafsirResourceId = typeof TAFSIR_RESOURCES[number]['id'];