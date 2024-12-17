'use client';

import { useState, useEffect } from 'react';

export interface Bookmark {
  id: string;
  type: 'chapter' | 'verse';
  chapterId: number;
  verseNumber?: number;
  title: string;
  timestamp: string;
  notes?: string;
  tags?: string[];
  progress?: number;
}

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('quran-bookmarks');
    if (stored) {
      setBookmarks(JSON.parse(stored));
    }
  }, []);

  const addBookmark = (bookmark: Omit<Bookmark, 'id' | 'timestamp'>) => {
    const newBookmark: Bookmark = {
      ...bookmark,
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
    };
    
    const updatedBookmarks = [...bookmarks, newBookmark];
    setBookmarks(updatedBookmarks);
    localStorage.setItem('quran-bookmarks', JSON.stringify(updatedBookmarks));
    return newBookmark;
  };

  const removeBookmark = (id: string) => {
    const updatedBookmarks = bookmarks.filter(b => b.id !== id);
    setBookmarks(updatedBookmarks);
    localStorage.setItem('quran-bookmarks', JSON.stringify(updatedBookmarks));
  };

  const updateBookmark = (id: string, updates: Partial<Omit<Bookmark, 'id'>>) => {
    const updatedBookmarks = bookmarks.map(bookmark =>
      bookmark.id === id ? { ...bookmark, ...updates } : bookmark
    );
    setBookmarks(updatedBookmarks);
    localStorage.setItem('quran-bookmarks', JSON.stringify(updatedBookmarks));
  };

  const isBookmarked = (chapterId: number, verseNumber?: number) => {
    return bookmarks.some(b => 
      b.chapterId === chapterId && 
      (verseNumber ? b.verseNumber === verseNumber : !b.verseNumber)
    );
  };

  const getBookmark = (chapterId: number, verseNumber?: number) => {
    return bookmarks.find(b => 
      b.chapterId === chapterId && 
      (verseNumber ? b.verseNumber === verseNumber : !b.verseNumber)
    );
  };

  return {
    bookmarks,
    addBookmark,
    removeBookmark,
    updateBookmark,
    isBookmarked,
    getBookmark,
  };
}