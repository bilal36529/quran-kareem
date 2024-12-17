'use client';

import { openDB, DBSchema, IDBPDatabase } from 'idb';

interface QuranDBSchema extends DBSchema {
  chapters: {
    key: number;
    value: any;
  };
  verses: {
    key: string;
    value: any;
  };
  audio: {
    key: string;
    value: ArrayBuffer;
  };
  wordAnalysis: {
    key: string;
    value: any;
  };
}

class CacheService {
  private static instance: CacheService;
  private db: IDBPDatabase<QuranDBSchema> | null = null;
  private dbName = 'qurankareem-cache';
  private version = 1;

  private constructor() {}

  public static getInstance(): CacheService {
    if (!CacheService.instance) {
      CacheService.instance = new CacheService();
    }
    return CacheService.instance;
  }

  private async initDB() {
    if (!this.db) {
      this.db = await openDB<QuranDBSchema>(this.dbName, this.version, {
        upgrade(db) {
          if (!db.objectStoreNames.contains('chapters')) {
            db.createObjectStore('chapters');
          }
          if (!db.objectStoreNames.contains('verses')) {
            db.createObjectStore('verses');
          }
          if (!db.objectStoreNames.contains('audio')) {
            db.createObjectStore('audio');
          }
          if (!db.objectStoreNames.contains('wordAnalysis')) {
            db.createObjectStore('wordAnalysis');
          }
        },
      });
    }
    return this.db;
  }

  async cacheChapter(chapterId: number, data: any) {
    const db = await this.initDB();
    await db.put('chapters', data, chapterId);
  }

  async getCachedChapter(chapterId: number) {
    const db = await this.initDB();
    return db.get('chapters', chapterId);
  }

  async cacheVerses(chapterId: number, data: any) {
    const db = await this.initDB();
    await db.put('verses', data, chapterId.toString());
  }

  async getCachedVerses(chapterId: number) {
    const db = await this.initDB();
    return db.get('verses', chapterId.toString());
  }

  async cacheAudio(url: string, audioData: ArrayBuffer) {
    const db = await this.initDB();
    await db.put('audio', audioData, url);
  }

  async getCachedAudio(url: string) {
    const db = await this.initDB();
    return db.get('audio', url);
  }

  async cacheWordAnalysis(verseKey: string, data: any) {
    const db = await this.initDB();
    await db.put('wordAnalysis', data, verseKey);
  }

  async getCachedWordAnalysis(verseKey: string) {
    const db = await this.initDB();
    return db.get('wordAnalysis', verseKey);
  }

  async clearCache() {
    const db = await this.initDB();
    await Promise.all([
      db.clear('chapters'),
      db.clear('verses'),
      db.clear('audio'),
      db.clear('wordAnalysis'),
    ]);
  }
}

export const cacheService = CacheService.getInstance();