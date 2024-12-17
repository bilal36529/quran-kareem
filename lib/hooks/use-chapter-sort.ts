'use client';

import { Chapter } from '@/lib/types';
import { useState } from 'react';

type SortOption = 'number' | 'verses' | 'revelation';

export function useChapterSort(initialChapters: Chapter[]) {
  const [sortBy, setSortBy] = useState<SortOption>('number');

  const sortChapters = (chapters: Chapter[]) => {
    return [...chapters].sort((a, b) => {
      switch (sortBy) {
        case 'verses':
          return b.numberOfAyahs - a.numberOfAyahs;
        case 'revelation':
          return a.revelationType.localeCompare(b.revelationType);
        case 'number':
        default:
          return a.number - b.number;
      }
    });
  };

  return {
    sortBy,
    setSortBy,
    sortChapters,
  };
}