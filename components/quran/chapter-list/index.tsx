'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Chapter } from '@/lib/types';
import { ScrollArea } from '@/components/ui/scroll-area';
import ChapterCard from './ChapterCard';
import ChapterSkeleton from './ChapterSkeleton';
import { useBookmarks } from '@/hooks/use-bookmarks';
import { motion, AnimatePresence } from 'framer-motion';

interface ChapterListProps {
  chapters: Chapter[];
  filter: 'all' | 'meccan' | 'medinan';
}

export default function ChapterList({ chapters, filter }: ChapterListProps) {
  const [isNavigating, setIsNavigating] = useState(false);
  const router = useRouter();
  const { isBookmarked } = useBookmarks();

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
            : `No ${filter} chapters found.`}
        </p>
      </div>
    );
  }

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

  if (isNavigating) {
    return <ChapterSkeleton />;
  }

  return (
    <ScrollArea className="h-[calc(100vh-250px)]">
      <AnimatePresence mode="wait">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-8">
          {filteredChapters.map((chapter, index) => (
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