import { Chapter, Verse } from './types';

const API_BASE = 'https://api.qurancdn.com/api/qdc';
const AUDIO_BASE = 'https://everyayah.com/data';
const RECITER = 'Abdul_Basit_Murattal_64kbps';

export async function getChapters(): Promise<Chapter[]> {
  try {
    const response = await fetch('https://api.qurancdn.com/api/qdc/chapters?language=en', {
      next: { revalidate: 3600 },
      headers: {
        'Accept': 'application/json',
        'Accept-Language': 'en'
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch chapters: ${response.status}`);
    }

    const data = await response.json();
    if (!data.chapters || !Array.isArray(data.chapters)) {
      throw new Error('Invalid API response format');
    }

    return data.chapters.map((chapter: any) => ({
      number: chapter.id,
      name: chapter.name_arabic,
      englishName: chapter.name_simple,
      englishNameTranslation: chapter.translated_name.name,
      numberOfAyahs: chapter.verses_count,
      revelationType: chapter.revelation_place === 'makkah' ? 'Meccan' : 'Medinan',
    }));
  } catch (error) {
    console.error('Error fetching chapters:', error);
    return [];
  }
}

function padNumber(num: number, width: number): string {
  return String(num).padStart(width, '0');
}

export async function getVerses(chapterNumber: number): Promise<Verse[]> {
  try {
    const response = await fetch(
      `${API_BASE}/verses/by_chapter/${chapterNumber}?language=en&words=true&translations=131&fields=text_uthmani,verse_key&per_page=300`,
      { 
        next: { revalidate: 3600 },
        headers: {
          'Accept': 'application/json',
          'Accept-Language': 'en'
        }
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch verses: ${response.status}`);
    }

    const data = await response.json();
    if (!data.verses || !Array.isArray(data.verses)) {
      throw new Error('Invalid verses response format');
    }
    
    return data.verses.map((verse: any) => {
      const verseNumber = verse.verse_number;
      let text = verse.text_uthmani;
      const translation = verse.translations?.[0]?.text || '';

      // Remove Bismillah from all verses except Al-Fatiha (1:1) and An-Naml (27:30)
      if (!(chapterNumber === 1 && verseNumber === 1) && !(chapterNumber === 27 && verseNumber === 30)) {
        text = text.replace(/^بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ\s*/, '').trim();
      }

      // Generate audio URL
      const audioUrl = `${AUDIO_BASE}/${RECITER}/${padNumber(chapterNumber, 3)}${padNumber(verseNumber, 3)}.mp3`;

      return {
        number: verseNumber,
        text,
        translation: translation.replace(/<sup.*?<\/sup>/g, ''),
        audio: audioUrl,
        audioTimestamp: 0,
        audioEndTimestamp: 0,
        verseKey: `${chapterNumber}:${verseNumber}`,
      };
    });
  } catch (error) {
    console.error('Error fetching verses:', error);
    return [];
  }
}