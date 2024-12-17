import { TafsirContent } from '../types';
import { TAFSIR_CONFIG } from '../config';

interface CacheEntry {
  content: TafsirContent;
  timestamp: number;
}

export class TafsirCache {
  private static isExpired(timestamp: number): boolean {
    return Date.now() - timestamp > TAFSIR_CONFIG.CACHE_DURATION;
  }

  static async get(key: string): Promise<TafsirContent | null> {
    try {
      const cacheKey = `${TAFSIR_CONFIG.CACHE_PREFIX}${key}`;
      const cached = localStorage.getItem(cacheKey);
      
      if (!cached) return null;
      
      const entry: CacheEntry = JSON.parse(cached);
      
      if (this.isExpired(entry.timestamp)) {
        localStorage.removeItem(cacheKey);
        return null;
      }
      
      return entry.content;
    } catch {
      return null;
    }
  }

  static async set(key: string, content: TafsirContent): Promise<void> {
    try {
      const cacheKey = `${TAFSIR_CONFIG.CACHE_PREFIX}${key}`;
      const entry: CacheEntry = {
        content,
        timestamp: Date.now()
      };
      localStorage.setItem(cacheKey, JSON.stringify(entry));
    } catch (error) {
      console.warn('Failed to cache tafsir:', error);
    }
  }

  static async clear(): Promise<void> {
    try {
      const keys = Object.keys(localStorage);
      keys.forEach(key => {
        if (key.startsWith(TAFSIR_CONFIG.CACHE_PREFIX)) {
          localStorage.removeItem(key);
        }
      });
    } catch (error) {
      console.warn('Failed to clear tafsir cache:', error);
    }
  }
}