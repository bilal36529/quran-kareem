'use client';

import { API_CONFIG } from '@/lib/config';
import { APIError } from '@/lib/errors';

interface RequestConfig extends RequestInit {
  timeout?: number;
  retries?: number;
  cache?: boolean;
}

class APIClient {
  private static instance: APIClient;
  private controller: AbortController;
  private cache: Map<string, { data: any; timestamp: number }>;

  private constructor() {
    this.controller = new AbortController();
    this.cache = new Map();
  }

  static getInstance(): APIClient {
    if (!this.instance) {
      this.instance = new APIClient();
    }
    return this.instance;
  }

  private getCacheKey(url: string, config?: RequestConfig): string {
    return `${config?.method || 'GET'}-${url}`;
  }

  private isCacheValid(timestamp: number): boolean {
    return Date.now() - timestamp < API_CONFIG.CACHE_DURATION;
  }

  private async fetchWithTimeout(url: string, config?: RequestConfig): Promise<Response> {
    const timeout = config?.timeout || API_CONFIG.REQUEST_TIMEOUT;
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(url, {
        ...config,
        signal: controller.signal,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          ...config?.headers,
        },
      });
      clearTimeout(id);
      return response;
    } catch (error) {
      clearTimeout(id);
      throw error;
    }
  }

  async request<T>(url: string, config?: RequestConfig): Promise<T> {
    const cacheKey = this.getCacheKey(url, config);
    
    // Check cache if enabled
    if (config?.cache !== false) {
      const cached = this.cache.get(cacheKey);
      if (cached && this.isCacheValid(cached.timestamp)) {
        return cached.data as T;
      }
    }

    const maxRetries = config?.retries || API_CONFIG.MAX_RETRIES;
    let lastError: Error | null = null;

    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        const response = await this.fetchWithTimeout(url, config);

        if (!response.ok) {
          throw new APIError(
            `HTTP error! status: ${response.status}`,
            response.status,
            await response.text()
          );
        }

        const data = await response.json();

        // Cache the successful response if caching is enabled
        if (config?.cache !== false) {
          this.cache.set(cacheKey, {
            data,
            timestamp: Date.now()
          });
        }

        return data as T;
      } catch (error) {
        lastError = error as Error;
        
        // Don't retry on 4xx errors
        if (error instanceof APIError && error.status >= 400 && error.status < 500) {
          throw error;
        }

        // Wait before retrying
        if (attempt < maxRetries) {
          await new Promise(resolve => 
            setTimeout(resolve, Math.pow(2, attempt) * 1000)
          );
        }
      }
    }

    throw lastError || new Error('Request failed');
  }

  clearCache(): void {
    this.cache.clear();
  }
}

export const apiClient = APIClient.getInstance();