'use client';

import { apiClient } from '@/lib/services/api-client';
import { API_CONFIG } from '@/lib/config';
import { Chapter, Verse } from '@/lib/types';
import { APIError } from '@/lib/errors';

export async function getChapters(): Promise<Chapter[]> {
  try {
    const response = await apiClient.request<{chapters: any[]}>(`${API_CONFIG.QURAN_API_BASE}${API_CONFIG.ENDPOINTS.CHAPTERS}?language=en`, {
      cache: true,
      retries: 2
    });

    return response.chapters.map(chapter => ({
      number: chapter.id,
      name: chapter.name_arabic,
      englishName: chapter.name_simple,
      englishNameTranslation: chapter.translated_name.name,
      numberOfAyahs: chapter.verses_count,
      revelationType: chapter.revelation_place,
    }));
  } catch (error) {
    console.error('Error fetching chapters:', error);
    throw error instanceof APIError ? error : APIError.networkError();
  }
}

export async function getChapter(chapterNumber: number): Promise<Chapter | null> {
  try {
    const response = await apiClient.request<{chapter: any}>(
      `${API_CONFIG.QURAN_API_BASE}${API_CONFIG.ENDPOINTS.CHAPTERS}/${chapterNumber}?language=en`,
      { cache: true }
    );

    const chapter = response.chapter;
    return {
      number: chapter.id,
      name: chapter.name_arabic,
      englishName: chapter.name_simple,
      englishNameTranslation: chapter.translated_name.name,
      numberOfAyahs: chapter.verses_count,
      revelationType: chapter.revelation_place,
    };
  } catch (error) {
    if (error instanceof APIError && error.status === 404) {
      return null;
    }
    throw error instanceof APIError ? error : APIError.networkError();
  }
}

export async function getVerses(chapterNumber: number): Promise<Verse[]> {
  try {
    const response = await apiClient.request<{verses: any[]}>(
      `${API_CONFIG.QURAN_API_BASE}${API_CONFIG.ENDPOINTS.VERSES}/${chapterNumber}?words=true&translations=131&fields=text_uthmani,verse_key&per_page=300`,
      { cache: true }
    );

    return response.verses.map(verse => {
      const verseKey = verse.verse_key;
      const [surah, ayah] = verseKey.split(':').map(Number);
      let text = verse.text_uthmani;
      const translation = verse.translations?.[0]?.text || '';

      // Remove Bismillah except for Al-Fatiha (1:1) and An-Naml (27:30)
      if (!(surah === 1 && ayah === 1) && !(surah === 27 && ayah === 30)) {
        text = text.replace(/^بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ\s*/, '').trim();
      }

      return {
        number: ayah,
        text,
        translation: translation.replace(/<sup.*?<\/sup>/g, ''),
        audio: `${API_CONFIG.AUDIO_BASE}/${API_CONFIG.DEFAULT_RECITER}/${String(surah).padStart(3, '0')}${String(ayah).padStart(3, '0')}.mp3`,
        audioTimestamp: 0,
        audioEndTimestamp: 0,
        verseKey,
      };
    });
  } catch (error) {
    console.error('Error fetching verses:', error);
    throw error instanceof APIError ? error : APIError.networkError();
  }
}