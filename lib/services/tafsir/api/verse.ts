import { tafsirClient } from './client';
import { TAFSIR_CONFIG } from '../config';
import { VerseResponse } from '../types';

export async function getVerseDetails(verseKey: string): Promise<VerseResponse> {
  const response = await tafsirClient.fetch(
    `${TAFSIR_CONFIG.ENDPOINTS.VERSES}/${verseKey}?translations=131&fields=text_uthmani`
  );
  return response.json();
}