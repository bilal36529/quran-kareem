import { APIError } from './errors';

interface FetchOptions {
  retries?: number;
  timeout?: number;
  headers?: Record<string, string>;
  cache?: RequestCache;
}

export async function fetchWithRetry(url: string, options: FetchOptions = {}): Promise<Response> {
  const {
    retries = 3,
    timeout = 5000,
    headers = {},
    cache = 'force-cache'
  } = options;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url, {
        headers: {
          'Accept': 'application/json',
          'Accept-Language': 'en,ar',
          ...headers
        },
        signal: controller.signal,
        cache,
        next: { 
          revalidate: 3600,
          tags: ['api-data']
        }
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        if (response.status === 404) {
          throw APIError.notFound();
        }
        throw new APIError(
          `HTTP error ${response.status}`,
          'HTTP_ERROR',
          response.status
        );
      }

      return response;
    } catch (error) {
      clearTimeout(timeoutId);

      if (error instanceof Error && error.name === 'AbortError') {
        throw APIError.timeout();
      }

      if (i === retries - 1) {
        throw APIError.networkError(error instanceof Error ? error.message : 'Network request failed');
      }

      // Exponential backoff
      await new Promise(resolve => setTimeout(resolve, Math.pow(2, i) * 1000));
    }
  }

  throw APIError.networkError('Max retries exceeded');
}