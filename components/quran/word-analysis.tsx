'use client';

import { WordAnalysis } from '@/lib/types';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { cn } from '@/lib/utils';

interface WordAnalysisProps {
  word: WordAnalysis;
  showGrammar?: boolean;
  className?: string;
}

export default function WordAnalysisComponent({ 
  word, 
  showGrammar = true,
  className 
}: WordAnalysisProps) {
  return (
    <HoverCard openDelay={200}>
      <HoverCardTrigger asChild>
        <span
          className={cn(
            "cursor-help inline-block font-amiri",
            "transition-colors hover:text-primary focus:text-primary",
            "focus:outline-none focus:ring-2 focus:ring-primary/20 rounded",
            "active:scale-95 transform",
            className
          )}
        >
          {word.text}
        </span>
      </HoverCardTrigger>
      <HoverCardContent 
        align="center"
        className="w-[280px] sm:w-80 backdrop-blur-sm bg-background/95"
        side="top"
      >
        <div className="space-y-3">
          <div className="text-center">
            {word.transliteration && (
              <p className="text-sm font-medium mb-1">{word.transliteration}</p>
            )}
            <p className="text-sm text-muted-foreground">{word.translation}</p>
          </div>

          {showGrammar && (
            <>
              {word.rootWord && (
                <div className="pt-3 border-t text-center">
                  <span className="text-xs text-muted-foreground block mb-1">Root Word</span>
                  <p className="font-amiri text-xl">{word.rootWord}</p>
                </div>
              )}

              {word.grammarInfo && (
                <div className="pt-3 border-t text-center">
                  <span className="text-xs text-muted-foreground block mb-1">Grammar</span>
                  <p className="text-sm">
                    {word.grammarInfo.type}
                    {word.grammarInfo.details && (
                      <span className="text-muted-foreground"> - {word.grammarInfo.details}</span>
                    )}
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}