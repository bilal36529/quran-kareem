import { TAFSIR_CONFIG } from '../config';
import { TafsirError } from '../errors';

export async function fetchWithTimeout(url: string): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), TAFSIR_CONFIG.REQUEST_TIMEOUT);

  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        'Accept': 'application/json',
        'Accept-Language': 'en,ar',
      },
      next: { revalidate: 3600 }
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        throw new TafsirError(
          'Request timed out',
          'TIMEOUT',
          408
        );
      }
      throw new TafsirError(
        error.message,
        'NETWORK_ERROR',
        500
      );
    }
    
    throw new TafsirError(
      'Network request failed',
      'NETWORK_ERROR',
      500
    );
  }
}