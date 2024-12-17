'use client';

import { Chapter, Verse } from './types';
import { openDB, DBSchema, IDBPDatabase } from 'idb';

interface QuranDBSchema extends DBSchema {
  chapters: {
    key: number;
    value: Chapter;
  };
  verses: {
    key: string;
    value: Verse[];
  };
  audio: {
    key: string;
    value: ArrayBuffer;
  };
  translations: {
    key: string;
    value: any;
  };
  wordAnalysis: {
    key: string;
    value: any;
  };
  lastSync: {
    key: string;
    value: number;
  };
}

class OfflineManager {
  private static instance: OfflineManager;
  private db: IDBPDatabase<QuranDBSchema> | null = null;
  private dbName = 'qurankareem-offline-db';
  private version = 1;

  private constructor() {}

  public static getInstance(): OfflineManager {
    if (!OfflineManager.instance) {
      OfflineManager.instance = new OfflineManager();
    }
    return OfflineManager.instance;
  }

  private async initDB() {
    if (!this.db) {
      this.db = await openDB<QuranDBSchema>(this.dbName, this.version, {
        upgrade(db) {
          // Create object stores if they don't exist
          if (!db.objectStoreNames.contains('chapters')) {
            db.createObjectStore('chapters');
          }
          if (!db.objectStoreNames.contains('verses')) {
            db.createObjectStore('verses');
          }
          if (!db.objectStoreNames.contains('audio')) {
            db.createObjectStore('audio');
          }
          if (!db.objectStoreNames.contains('translations')) {
            db.createObjectStore('translations');
          }
          if (!db.objectStoreNames.contains('wordAnalysis')) {
            db.createObjectStore('wordAnalysis');
          }
          if (!db.objectStoreNames.contains('lastSync')) {
            db.createObjectStore('lastSync');
          }
        },
      });
    }
    return this.db;
  }

  async cacheChapter(chapter: Chapter): Promise<void> {
    const db = await this.initDB();
    await db.put('chapters', chapter, chapter.number);
    await this.updateLastSync('chapters');
  }

  async getCachedChapter(chapterNumber: number): Promise<Chapter | undefined> {
    const db = await this.initDB();
    return db.get('chapters', chapterNumber);
  }

  async cacheVerses(chapterNumber: number, verses: Verse[]): Promise<void> {
    const db = await this.initDB();
    await db.put('verses', verses, chapterNumber.toString());
    await this.updateLastSync('verses');
  }

  async getCachedVerses(chapterNumber: number): Promise<Verse[] | undefined> {
    const db = await this.initDB();
    return db.get('verses', chapterNumber.toString());
  }

  async cacheAudio(url: string, audioData: ArrayBuffer): Promise<void> {
    const db = await this.initDB();
    await db.put('audio', audioData, url);
    await this.updateLastSync('audio');
  }

  async getCachedAudio(url: string): Promise<ArrayBuffer | undefined> {
    const db = await this.initDB();
    return db.get('audio', url);
  }

  async cacheTranslation(key: string, data: any): Promise<void> {
    const db = await this.initDB();
    await db.put('translations', data, key);
    await this.updateLastSync('translations');
  }

  async getCachedTranslation(key: string): Promise<any> {
    const db = await this.initDB();
    return db.get('translations', key);
  }

  async cacheWordAnalysis(verseKey: string, data: any): Promise<void> {
    const db = await this.initDB();
    await db.put('wordAnalysis', data, verseKey);
    await this.updateLastSync('wordAnalysis');
  }

  async getCachedWordAnalysis(verseKey: string): Promise<any> {
    const db = await this.initDB();
    return db.get('wordAnalysis', verseKey);
  }

  private async updateLastSync(store: string): Promise<void> {
    const db = await this.initDB();
    await db.put('lastSync', Date.now(), store);
  }

  async getLastSync(store: string): Promise<number | undefined> {
    const db = await this.initDB();
    return db.get('lastSync', store);
  }

  async clearCache(): Promise<void> {
    const db = await this.initDB();
    await Promise.all([
      db.clear('chapters'),
      db.clear('verses'),
      db.clear('audio'),
      db.clear('translations'),
      db.clear('wordAnalysis'),
      db.clear('lastSync'),
    ]);
  }

  async getCacheSize(): Promise<{ [key: string]: number }> {
    const db = await this.initDB();
    const sizes: { [key: string]: number } = {};
    
    for (const storeName of db.objectStoreNames) {
      const store = db.transaction(storeName).objectStore(storeName);
      const keys = await store.getAllKeys();
      sizes[storeName] = keys.length;
    }
    
    return sizes;
  }
}

export const offlineManager = OfflineManager.getInstance();