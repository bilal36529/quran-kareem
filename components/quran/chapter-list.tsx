'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Chapter } from '@/lib/types';
import { ScrollArea } from '@/components/ui/scroll-area';
import ChapterCard from './chapter-card';
import { motion, AnimatePresence } from 'framer-motion';
import { useBookmarks } from '@/hooks/use-bookmarks';
import { Skeleton } from '@/components/ui/skeleton';

interface ChapterListProps {
  chapters: Chapter[];
  filter: 'all' | 'meccan' | 'medinan';
  onLoadingChange?: (loading: boolean) => void;
}

export default function ChapterList({ 
  chapters, 
  filter,
  onLoadingChange 
}: ChapterListProps) {
  const [isNavigating, setIsNavigating] = useState(false);
  const router = useRouter();
  const { isBookmarked } = useBookmarks();

  // Move useEffect after all hooks
  useEffect(() => {
    if (onLoadingChange) {
      onLoadingChange(isNavigating);
    }
  }, [isNavigating, onLoadingChange]);
  const filteredChapters = chapters.filter(chapter => {
    if (filter === 'all') return true;
    return chapter.revelationType.toLowerCase() === filter.toLowerCase();
  });

  if (filteredChapters.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">
          {filter === 'all'
            ? 'No chapters available.'
            : `No ${filter.charAt(0).toUpperCase() + filter.slice(1)} chapters found.`}
        </p>
      </div>
    );
  }

  const sortedChapters = [...filteredChapters].sort((a, b) => a.number - b.number);

  const handleChapterClick = (chapterNumber: number) => {
    setIsNavigating(true);
    try {
      router.prefetch(`/quran/${chapterNumber}`);
      router.push(`/quran/${chapterNumber}`);
    } catch (error) {
      console.error('Navigation error:', error);
      setIsNavigating(false);
    }
  };


  return (
    <ScrollArea className="h-[calc(100vh-250px)]">
      <AnimatePresence mode="wait">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-8">
          {sortedChapters.map((chapter, index) => (
            <motion.div
              key={chapter.number}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <ChapterCard
                chapter={chapter}
                index={index}
                onClick={() => handleChapterClick(chapter.number)}
                isBookmarked={isBookmarked(chapter.number)}
              />
            </motion.div>
          ))}
        </div>
      </AnimatePresence>
    </ScrollArea>
  );
}