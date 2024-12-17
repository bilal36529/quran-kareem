import { Tafsir } from './types';

const CACHE_PREFIX = 'tafsir-cache-';
const CACHE_EXPIRY = 24 * 60 * 60 * 1000; // 24 hours

interface CacheEntry {
  data: Tafsir;
  timestamp: number;
}

export class TafsirCache {
  static getKey(verseKey: string, tafsirId: number): string {
    return `${CACHE_PREFIX}${verseKey}-${tafsirId}`;
  }

  static async get(verseKey: string, tafsirId: number): Promise<Tafsir | null> {
    try {
      const key = this.getKey(verseKey, tafsirId);
      const cached = localStorage.getItem(key);
      
      if (!cached) return null;
      
      const entry: CacheEntry = JSON.parse(cached);
      const now = Date.now();
      
      if (now - entry.timestamp > CACHE_EXPIRY) {
        localStorage.removeItem(key);
        return null;
      }
      
      return entry.data;
    } catch {
      return null;
    }
  }

  static set(verseKey: string, tafsirId: number, data: Tafsir): void {
    try {
      const key = this.getKey(verseKey, tafsirId);
      const entry: CacheEntry = {
        data,
        timestamp: Date.now(),
      };
      localStorage.setItem(key, JSON.stringify(entry));
    } catch {
      // Ignore cache write errors
    }
  }

  static clear(): void {
    try {
      const keys = Object.keys(localStorage);
      keys.forEach(key => {
        if (key.startsWith(CACHE_PREFIX)) {
          localStorage.removeItem(key);
        }
      });
    } catch {
      // Ignore cache clear errors
    }
  }
}