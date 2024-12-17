import { Verse } from '@/types';
import { getAudioUrl } from '@/lib/services/audio';

const API_BASE = 'https://api.qurancdn.com/api/qdc/verses/by_chapter';

export async function getVerses(chapterNumber: number): Promise<Verse[]> {
  try {
    const versesResponse = await fetch(
      `${API_BASE}/${chapterNumber}?words=true&translations=131&fields=text_uthmani,verse_key&per_page=300`,
      {
        next: { revalidate: 3600 },
      }
    );

    if (!versesResponse.ok) {
      throw new Error('Failed to fetch verses data');
    }

    const versesData = await versesResponse.json();

    return versesData.verses.map((verse: any) => {
      const verseKey = verse.verse_key;
      const [surah, ayah] = verseKey.split(':').map(Number);
      let text = verse.text_uthmani;
      const translation = verse.translations?.[0]?.text || '';

      // Remove Bismillah from all verses except Al-Fatiha (1:1) and An-Naml (27:30)
      if (!(surah === 1 && ayah === 1) && !(surah === 27 && ayah === 30)) {
        text = text.replace(/^بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ\s*/, '').trim();
      }

      return {
        number: ayah,
        text,
        translation: translation.replace(/<sup.*?<\/sup>/g, ''),
        audio: getAudioUrl(surah, ayah),
        audioTimestamp: 0,
        audioEndTimestamp: 0,
        verseKey,
      };
    });
  } catch (error) {
    console.error('Error fetching verses:', error);
    return [];
  }
}