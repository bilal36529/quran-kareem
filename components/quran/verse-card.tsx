'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Verse } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { PenTool, Book } from 'lucide-react';
import { cn } from '@/lib/utils';
import AudioPlayer from './audio-player';
import BookmarkButton from './bookmark-button';
import VerseStudyMode from './verse-study-mode';
import VerseAnalysis from './verse-analysis';

interface VerseCardProps {
  verse: Verse;
  chapterNumber: number;
  totalVerses: number;
  isPlaying: boolean;
  onPlayStateChange?: (isPlaying: boolean) => void;
  onVerseComplete?: () => void;
  onNextVerse?: () => void;
}

export default function VerseCard({
  verse,
  chapterNumber,
  totalVerses,
  isPlaying,
  onPlayStateChange,
  onVerseComplete,
  onNextVerse
}: VerseCardProps) {
  const [showStudyMode, setShowStudyMode] = useState(false);
  const [showAnalysis, setShowAnalysis] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "transform transition-all duration-300",
        isPlaying && "scale-[1.02]"
      )}
    >
      <Card 
        className={cn(
          "overflow-hidden islamic-border relative",
          "bg-gradient-to-br from-background via-background/95 to-accent/10",
          "hover:shadow-lg hover:shadow-primary/5 transition-all duration-300",
          isPlaying && "ring-2 ring-primary shadow-lg shadow-primary/10"
        )}
      >
        <div className="absolute top-0 right-0 w-48 h-48 islamic-pattern opacity-10" />
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-2 sm:items-start mb-2">
            <div className="flex items-center gap-2">
              <Badge variant="outline">
                {chapterNumber}:{verse.number}
              </Badge>
              {verse.juzNumber && (
                <Badge variant="secondary">Juz {verse.juzNumber}</Badge>
              )}
            </div>
            <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-2">
              <AudioPlayer
                chapterNumber={chapterNumber}
                verseNumber={verse.number}
                totalVerses={totalVerses}
                onPlayStateChange={onPlayStateChange}
                onVerseComplete={onVerseComplete}
                className="col-span-2 sm:w-auto"
              />
              <BookmarkButton
                chapterId={chapterNumber}
                verseNumber={verse.number}
                title={`${chapterNumber}:${verse.number}`}
                className="w-full sm:w-auto"
              />
              <Button
                variant="outline"
                size="sm"
                role="button"
                type="button"
                onClick={() => setShowStudyMode(!showStudyMode)}
                className={cn(
                  "gap-2 w-full sm:w-auto",
                  "touch-manipulation no-select",
                  "min-h-[44px] min-w-[44px]",
                  "active:scale-95 transition-transform",
                  "z-10 relative",
                  showStudyMode && "bg-primary text-primary-foreground hover:bg-primary/90"
                )}
                aria-label="Word Analysis"
              >
                <PenTool className="h-4 w-4 mr-2" />
                Word
              </Button>
              <Button
                variant="outline"
                size="sm"
                role="button"
                type="button"
                onClick={() => setShowAnalysis(!showAnalysis)}
                className={cn(
                  "gap-2 w-full sm:w-auto",
                  "touch-manipulation no-select",
                  "min-h-[44px] min-w-[44px]",
                  "active:scale-95 transition-transform",
                  "z-10 relative",
                  showAnalysis && "bg-primary text-primary-foreground hover:bg-primary/90"
                )}
                aria-label="Grammar Analysis"
              >
                <Book className="h-4 w-4 mr-2" />
                Grammar
              </Button>
            </div>
          </div>
          <div className="space-y-4">
            <div dir="rtl" className="arabic-text text-right hover:text-primary/90 transition-colors">
              {verse.text}
            </div>
            <div className="translation-text text-muted-foreground border-t border-border/50 pt-4">
              {verse.translation}
            </div>
          </div>
          {showStudyMode && (
            <VerseStudyMode
              verse={verse}
              chapterNumber={chapterNumber}
              onClose={() => setShowStudyMode(false)}
            />
          )}
          {showAnalysis && (
            <VerseAnalysis
              verseKey={verse.verseKey}
              onClose={() => setShowAnalysis(false)}
            />
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}