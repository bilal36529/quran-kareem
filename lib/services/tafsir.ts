const TAFSIR_API = 'https://api.qurancdn.com/api/qdc/tafsirs';

export interface Tafsir {
  id: number;
  name: string;
  authorName: string;
  languageCode: string;
  text: string;
}

export const TAFSIR_RESOURCES = [
  { id: 1, name: 'Tafsir Ibn Kathir', language: 'en' },
  { id: 2, name: 'Tafsir Al-Jalalayn', language: 'en' },
  { id: 3, name: 'Tafsir Al-Saadi', language: 'en' },
  { id: 4, name: 'Tafsir Al-Tabari', language: 'ar' },
  { id: 5, name: 'Tafsir Al-Qurtubi', language: 'ar' },
  { id: 6, name: 'Tafsir Al-Baghawi', language: 'ar' },
];

export async function getTafsir(verseKey: string, tafsirId: number): Promise<Tafsir | null> {
  try {
    const response = await fetch(
      `${TAFSIR_API}/${tafsirId}/by_ayah/${verseKey}`,
      { next: { revalidate: 3600 } }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch tafsir');
    }

    const data = await response.json();
    return {
      id: data.tafsir.id,
      name: data.tafsir.name,
      authorName: data.tafsir.author_name,
      languageCode: data.tafsir.language_code,
      text: data.text,
    };
  } catch (error) {
    console.error('Error fetching tafsir:', error);
    return null;
  }
}