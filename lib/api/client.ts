import { API_CONFIG } from './config';
import { APIError } from './errors';
import { sleep } from '@/lib/utils';
import { normalizeUrl, joinUrl } from '@/lib/utils/url';

export class APIClient {
  private static instance: APIClient;
  private controller: AbortController;

  private constructor() {
    this.controller = new AbortController();
  }

  static getInstance(): APIClient {
    if (!APIClient.instance) {
      APIClient.instance = new APIClient();
    }
    return APIClient.instance;
  }

  private resetTimeout() {
    if (this.controller) {
      this.controller.abort();
    }
    this.controller = new AbortController();
    setTimeout(() => this.controller.abort(), API_CONFIG.TIMEOUT);
  }

  async fetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    this.resetTimeout();
    let lastError: Error | null = null;

    for (let attempt = 0; attempt < API_CONFIG.RETRY_ATTEMPTS; attempt++) {
      try {
        const url = normalizeUrl(joinUrl(API_CONFIG.BASE_URL, endpoint));
        const response = await fetch(url, {
          ...options,
          signal: this.controller.signal,
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            ...options.headers,
          },
        });

        if (!response.ok) {
          throw new APIError(
            `HTTP error! status: ${response.status}`,
            'HTTP_ERROR',
            response.status
          );
        }

        return await response.json();
      } catch (error) {
        lastError = error instanceof Error ? error : new Error('Unknown error');
        
        if (error instanceof APIError && error.status >= 400 && error.status < 500) {
          throw error; // Don't retry client errors
        }

        if (attempt < API_CONFIG.RETRY_ATTEMPTS - 1) {
          await sleep(API_CONFIG.RETRY_DELAY * Math.pow(2, attempt));
          continue;
        }
      }
    }

    throw lastError || new APIError('Network request failed', 'NETWORK_ERROR', 500);
  }
}

export const apiClient = APIClient.getInstance();