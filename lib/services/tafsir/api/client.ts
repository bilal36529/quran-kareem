import { TAFSIR_CONFIG } from '../config';
import { TafsirError } from '../errors';

export class TafsirClient {
  private static instance: TafsirClient;
  private controller: AbortController;

  private constructor() {
    this.controller = new AbortController();
  }

  static getInstance(): TafsirClient {
    if (!this.instance) {
      this.instance = new TafsirClient();
    }
    return this.instance;
  }

  private resetTimeout() {
    if (this.controller) {
      this.controller.abort();
    }
    this.controller = new AbortController();
    setTimeout(() => this.controller.abort(), TAFSIR_CONFIG.REQUEST_TIMEOUT);
  }

  async fetch(endpoint: string): Promise<Response> {
    this.resetTimeout();

    try {
      const url = `${TAFSIR_CONFIG.API_BASE}${endpoint}`;
      const response = await fetch(url, {
        signal: this.controller.signal,
        headers: {
          'Accept': 'application/json',
          'Accept-Language': 'en,ar',
        },
        next: { revalidate: 3600 }
      });

      if (!response.ok) {
        throw new TafsirError(
          `HTTP error! status: ${response.status}`,
          'HTTP_ERROR',
          response.status
        );
      }

      return response;
    } catch (error) {
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          throw new TafsirError('Request timed out', 'TIMEOUT', 408);
        }
      }
      throw new TafsirError('Network request failed', 'NETWORK_ERROR', 500);
    }
  }
}

export const tafsirClient = TafsirClient.getInstance();