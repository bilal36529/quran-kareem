'use client';
'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion'; // Only one import here
import { Verse } from '@/lib/types';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Maximize2, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import VerseCard from './verse-card';
import DistractionFreeMode from './distraction-free-mode';
import { useAudioSettings } from '@/lib/audio-context';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import FontSizeControl from './font-size-control';
import { audioService } from '@/lib/services/audio-service';

// ... Rest of the code remains unchanged


interface VerseListProps {
  verses: Verse[];
  chapterNumber: number;
}

function LoadingState() {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="text-center">
        <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
        <p className="text-sm text-muted-foreground">Loading verses...</p>
      </div>
    </div>
  );
}

export default function VerseList({ verses, chapterNumber }: VerseListProps) {
  const [currentlyPlaying, setCurrentlyPlaying] = useState<number | null>(null);
  const [isDistractionFree, setIsDistractionFree] = useState(false);
  const { globalSettings } = useAudioSettings();
  const verseRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

  useEffect(() => {
    if (currentlyPlaying !== null && verseRefs.current[currentlyPlaying]) {
      // Ensure the currently playing verse is visible
      verseRefs.current[currentlyPlaying].scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'nearest'
      });
    }
  }, [currentlyPlaying]);

  const handlePlayStateChange = (verseNumber: number, isPlaying: boolean) => {
    if (isPlaying) {
      setCurrentlyPlaying(verseNumber);
    } else if (currentlyPlaying === verseNumber) {
      setCurrentlyPlaying(null);
    }
  };

  const handleVerseComplete = (verseNumber: number) => {
    if (verseNumber < verses.length) {
      const nextVerseNumber = verseNumber + 1;
      
      // Small delay to allow current verse to finish
      setTimeout(() => {
        setCurrentlyPlaying(nextVerseNumber);
        
        // Scroll to next verse with offset
        if (verseRefs.current[nextVerseNumber]) {
          const yOffset = -100; // Adjusted offset for better visibility
          const element = verseRefs.current[nextVerseNumber];
          const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
          
          window.scrollTo({
            top: y,
            behavior: 'smooth'
          });

          // Start playing the next verse if autoPlay is enabled
          if (globalSettings.autoPlay) {
            const nextVerse = verses[nextVerseNumber - 1];
            const audioUrl = getAudioUrl(chapterNumber, nextVerse.number, globalSettings.reciter);
            audioService.playVerse(`${chapterNumber}:${nextVerse.number}`, audioUrl)
              .catch(console.error);
          }
        }
      }, 500); // Reduced delay for better responsiveness
    } else {
      setCurrentlyPlaying(null);
    }
  };

  if (isDistractionFree) {
    return (
      <DistractionFreeMode 
        verses={verses} 
        chapterNumber={chapterNumber} 
        onExit={() => setIsDistractionFree(false)}
      />
    );
  }

  return (
    <div className="relative">
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-xl p-4 border-b flex justify-between items-center">
        <div className="hidden sm:block text-sm text-muted-foreground">
          {verses.length} Verses
        </div>
        <div className="flex items-center gap-1.5 w-full sm:w-auto justify-end">
          <FontSizeControl />
          <Tooltip delayDuration={300}>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsDistractionFree(true)}
                className="gap-1.5 h-9 px-2.5 sm:px-3 hover:bg-accent/50"
              >
                <Maximize2 className="h-4 w-4" />
                <span className="hidden sm:inline">Reading Mode</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Enter distraction-free reading mode</TooltipContent>
          </Tooltip>
        </div>
      </div>

      <ScrollArea className="h-[calc(100vh-300px)]" type="auto">
        <div className="space-y-8 p-4 sm:p-6 md:p-8">
          {verses.map((verse, index) => (
            <motion.div
              key={verse.verseKey}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.4,
                delay: index * 0.05,
                ease: [0.4, 0, 0.2, 1]
              }}
              ref={el => verseRefs.current[verse.number] = el}
              className={cn(
                "transition-all duration-300",
                currentlyPlaying === verse.number && "scale-[1.02] shadow-lg"
              )}
            >
              <VerseCard
                verse={verse}
                chapterNumber={chapterNumber}
                onPlayStateChange={(isPlaying) => handlePlayStateChange(verse.number, isPlaying)}
                totalVerses={verses.length}
                isPlaying={currentlyPlaying === verse.number}
                onVerseComplete={() => handleVerseComplete(verse.number)}
              />
            </motion.div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}