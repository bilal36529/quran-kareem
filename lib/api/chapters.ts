import { Chapter } from '@/types';

const API_BASE = 'https://api.qurancdn.com/api/qdc';

export async function getChapters(): Promise<Chapter[]> {
  try {
    const response = await fetch(`${API_BASE}/chapters?language=en`, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch chapters');
    }

    const data = await response.json();
    return data.chapters.map((chapter: any) => ({
      number: chapter.id,
      name: chapter.name_arabic,
      englishName: chapter.name_simple,
      englishNameTranslation: chapter.translated_name.name,
      numberOfAyahs: chapter.verses_count,
      revelationType: chapter.revelation_place,
    }));
  } catch (error) {
    console.error('Error fetching chapters:', error);
    return [];
  }
}

export async function getChapter(chapterNumber: number): Promise<Chapter | null> {
  try {
    const response = await fetch(`${API_BASE}/chapters/${chapterNumber}?language=en`, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch chapter');
    }

    const data = await response.json();
    const chapter = data.chapter;

    return {
      number: chapter.id,
      name: chapter.name_arabic,
      englishName: chapter.name_simple,
      englishNameTranslation: chapter.translated_name.name,
      numberOfAyahs: chapter.verses_count,
      revelationType: chapter.revelation_place,
    };
  } catch (error) {
    console.error('Error fetching chapter:', error);
    return null;
  }
}