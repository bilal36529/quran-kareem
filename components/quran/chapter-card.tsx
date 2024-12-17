'use client';

import { Chapter } from '@/lib/types';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BookMarked, ScrollText } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ChapterCardProps {
  chapter: Chapter;
  index: number;
  onClick: () => void;
  isBookmarked: boolean;
}

export default function ChapterCard({ chapter, index, onClick, isBookmarked }: ChapterCardProps) {
  return (
    <Card
      onClick={onClick}
      className={cn(
        "group cursor-pointer h-full islamic-border relative",
        "bg-gradient-to-br from-background via-background/98 to-accent/10",
        "hover:shadow-lg hover:shadow-primary/5 hover:scale-[1.02]",
        "transition-all duration-500",
        "relative overflow-hidden"
      )}
    >
      <div className="absolute top-0 right-0 w-48 h-48 islamic-pattern opacity-10 
                    group-hover:opacity-20 transition-opacity duration-500" />
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <CardTitle className="flex items-center gap-2 text-xl">
              <span>{chapter.englishName}</span>
              {isBookmarked && (
                <BookMarked className="h-4 w-4 text-primary animate-pulse" />
              )}
            </CardTitle>
            <div className="arabic-text text-right">
              {chapter.name}
            </div>
          </div>
          <Badge 
            variant="outline" 
            className={cn(
              "text-lg px-3 py-1",
              "bg-primary/5 border-primary/20",
              "shadow-sm"
            )}
          >
            {chapter.number}
          </Badge>
        </div>
        <CardDescription className="text-base">
          {chapter.englishNameTranslation}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4">
          <Badge variant="secondary" className="gap-1">
            <ScrollText className="h-3 w-3" />
            {chapter.numberOfAyahs} verses
          </Badge>
          <Badge 
            variant="secondary"
            className={cn(
              "capitalize",
              chapter.revelationType.toLowerCase() === 'meccan'
                ? "bg-blue-500/10 text-blue-500"
                : "bg-green-500/10 text-green-500"
            )}
          >
            {chapter.revelationType}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}