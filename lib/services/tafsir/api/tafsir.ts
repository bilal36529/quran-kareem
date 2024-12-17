import { tafsirClient } from './client';
import { TAFSIR_CONFIG } from '../config';
import { TafsirResponse } from '../types';
import { TafsirError } from '../errors';

export async function getTafsirContent(
  verseKey: string,
  tafsirId: number
): Promise<TafsirResponse> {
  try {
    const response = await tafsirClient.fetch(
      `${TAFSIR_CONFIG.ENDPOINTS.TAFSIR}/${tafsirId}/by_ayah/${verseKey}`
    );
    const data = await response.json();

    if (!data.tafsir?.text) {
      throw new TafsirError(
        'Invalid tafsir response format',
        'INVALID_RESPONSE',
        500
      );
    }

    return data;
  } catch (error) {
    if (error instanceof TafsirError) {
      throw error;
    }
    throw new TafsirError(
      'Failed to fetch tafsir content',
      'FETCH_ERROR',
      500
    );
  }
}