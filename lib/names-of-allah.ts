'use client';

import { AllahName } from './types';

const NAMES_API = 'https://api.aladhan.com/v1/asmaAlHusna';

const FALLBACK_NAMES: AllahName[] = [
  {
    id: 1,
    name: 'الله',
    transliteration: 'Allah',
    number: 1,
    en: {
      meaning: 'The One True God',
      desc: 'The name of the Lord, the Exalted. It is said that it is Allah\'s Greatest Name.',
    },
    ar: {
      meaning: 'الله جل جلاله',
      desc: 'اسم الجلالة، وقيل إنه اسم الله الأعظم، وهو الاسم الجامع لجميع صفات الكمال'
    },
  },
];

export async function getAllahNames(): Promise<AllahName[]> {
  try {
    const response = await fetch(NAMES_API);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    if (!data.data || !Array.isArray(data.data)) {
      console.warn('Invalid data structure from API, using fallback data');
      return FALLBACK_NAMES;
    }

    return data.data.map((item: any) => ({
      id: item.number,
      name: item.name,
      transliteration: item.transliteration,
      number: item.number,
      en: {
        meaning: item.en.meaning,
        desc: item.en.meaning, // Aladhan API doesn't provide detailed descriptions
      },
      ar: {
        meaning: item.name,
        desc: getArabicDescription(item.name, item.transliteration)
      },
    }));
  } catch (error) {
    console.error('Error fetching Names of Allah:', error);
    return FALLBACK_NAMES;
  }
}

// Helper function to get Arabic descriptions
function getArabicDescription(name: string, transliteration: string): string {
  // Map of Arabic descriptions for common names
  const arabicDescriptions: Record<string, string> = {
    'الرحمن': 'ذو الرحمة الواسعة التي وسعت كل شيء',
    'الرحيم': 'الذي يوصل الرحمة لمن يشاء من عباده',
    'الملك': 'المالك المتصرف في جميع الأمور',
    'القدوس': 'المنزه عن كل عيب ونقص',
    'السلام': 'السالم من كل عيب ونقص والمسلم على عباده',
    'المؤمن': 'الذي يؤمن عباده من العذاب',
    'المهيمن': 'الرقيب الحافظ لكل شيء',
    'العزيز': 'الغالب الذي لا يُغلب',
    'الجبار': 'العظيم القاهر لكل شيء',
    'المتكبر': 'المتعالي عن صفات الخلق',
  };

  return arabicDescriptions[name] || `اسم من أسماء الله الحسنى يدل على ${name}`;
}
export function searchAllahNames(names: AllahName[], query: string): AllahName[] {
  if (!query.trim()) return names;

  const searchTerm = query.toLowerCase();
  const arabicPattern = /[\u0600-\u06FF]/;
  const isArabicSearch = arabicPattern.test(query);

  return names.filter(name => {
    if (isArabicSearch) {
      return (
        name.name.includes(query) ||
        name.ar.meaning.includes(query) ||
        name.ar.desc.includes(query)
      );
    }

    return (
      name.transliteration.toLowerCase().includes(searchTerm) ||
      name.en.meaning.toLowerCase().includes(searchTerm) ||
      name.en.desc.toLowerCase().includes(searchTerm)
    );
  });
}