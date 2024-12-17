'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Verse } from '@/lib/types';
import { motion, AnimatePresence } from 'framer-motion';
import ReadingControls from './reading-controls';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DistractionFreeModeProps {
  verses: Verse[];
  chapterNumber: number;
  onExit: () => void;
}

export default function DistractionFreeMode({ verses, chapterNumber, onExit }: DistractionFreeModeProps) {
  const [fontSize, setFontSize] = useState(24);
  const [theme, setTheme] = useState<'light' | 'sepia' | 'dark'>('light');
  const [showTranslation, setShowTranslation] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const controlsTimeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const handleMouseMove = () => {
      setShowControls(true);
      
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      
      timeoutId = setTimeout(() => setShowControls(false), 3000);
    };

    document.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, []);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (error) {
      console.error('Error toggling fullscreen:', error);
    }
  };

  return (
    <div
      className={cn(
        'min-h-screen transition-colors duration-300 relative',
        theme === 'light' && 'bg-white text-black',
        theme === 'sepia' && 'bg-[#f4ecd8] text-[#433422]',
        theme === 'dark' && 'bg-gray-900 text-white'
      )}
    >
      {/* Back Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={onExit}
        className="absolute top-4 left-4 z-50"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Exit Reading Mode
      </Button>

      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="space-y-12">
          {verses.map((verse) => (
            <motion.div
              key={verse.verseKey}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="space-y-4">
                <div
                  dir="rtl"
                  className="text-right font-amiri leading-loose transition-all duration-300"
                  style={{ fontSize: `${fontSize}px` }}
                >
                  {verse.text}
                </div>
                <AnimatePresence>
                  {showTranslation && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="text-muted-foreground"
                    >
                      {verse.translation}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {showControls && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            <ReadingControls
              fontSize={fontSize}
              theme={theme}
              showTranslation={showTranslation}
              isFullscreen={isFullscreen}
              onFontSizeChange={setFontSize}
              onThemeChange={setTheme}
              onTranslationToggle={() => setShowTranslation(!showTranslation)}
              onFullscreenToggle={toggleFullscreen}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}