'use client';

import { Chapter } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import GlobalAudioSettings from './global-audio-settings';
import BookmarkButton from './bookmark-button';
import { motion } from 'framer-motion';
import { ScrollText, MapPin } from 'lucide-react';

interface ChapterHeaderProps {
  chapter: Chapter;
  className?: string;
}

export default function ChapterHeader({ chapter, className }: ChapterHeaderProps) {
  return (
    <Card className={cn("overflow-hidden bg-gradient-to-r from-background to-primary/5", className)}>
      <CardContent className="p-4">
        <motion.div 
          className="flex flex-col md:flex-row justify-between items-start gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex-1 space-y-2">
            <div className="flex items-center justify-between md:justify-start gap-3">
              <h1 className="text-2xl font-semibold">
                {chapter.englishName}
              </h1>
              <Badge 
                variant="outline" 
                className="text-lg px-3 py-1 bg-primary/5 border-primary/20"
              >
                {chapter.number}
              </Badge>
            </div>
            
            <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4">
              <p className="text-2xl font-amiri text-primary">
                {chapter.name}
              </p>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Badge variant="secondary" className="gap-1">
                  <ScrollText className="h-3 w-3" />
                  {chapter.numberOfAyahs} verses
                </Badge>
                <Badge 
                  variant="secondary"
                  className={`capitalize gap-1 ${
                    chapter.revelationType.toLowerCase() === 'meccan' 
                      ? 'bg-blue-500/10 text-blue-500' 
                      : 'bg-green-500/10 text-green-500'
                  }`}
                >
                  <MapPin className="h-3 w-3" />
                  {chapter.revelationType}
                </Badge>
              </div>
            </div>

            <p className="text-sm text-muted-foreground">
              {chapter.englishNameTranslation}
            </p>
          </div>
          
          <div className="flex flex-row md:flex-col gap-2 w-full md:w-auto">
            <BookmarkButton
              chapterId={chapter.number}
              title={`${chapter.englishName} (${chapter.name})`}
              className="flex-1 md:w-[140px]"
            />
            <GlobalAudioSettings className="flex-1 md:w-[140px]" />
          </div>
        </motion.div>
      </CardContent>
    </Card>
  );
}