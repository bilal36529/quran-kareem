'use client';

import { Chapter } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollText, MapPin, BarChart3 } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { motion } from 'framer-motion';

interface QuranStatsProps {
  chapters: Chapter[];
}

export default function QuranStats({ chapters }: QuranStatsProps) {
  if (!Array.isArray(chapters) || chapters.length === 0) {
    return null;
  }

  const meccanCount = chapters.filter(c => c.revelationType.toLowerCase() === 'meccan').length;
  const medinanCount = chapters.filter(c => c.revelationType.toLowerCase() === 'medinan').length;
  const totalVerses = chapters.reduce((acc, chapter) => acc + chapter.numberOfAyahs, 0);
  
  // Find longest and shortest chapters
  const sortedByLength = [...chapters].sort((a, b) => b.numberOfAyahs - a.numberOfAyahs);
  const longestChapter = sortedByLength[0];
  const shortestChapter = sortedByLength[sortedByLength.length - 1];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-primary" />
            Quran Statistics
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Total Verses */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ScrollText className="h-4 w-4 text-primary" />
                <span className="text-sm">Total Verses</span>
              </div>
              <span className="font-semibold">{totalVerses.toLocaleString()}</span>
            </div>
          </div>

          {/* Revelation Types */}
          <div className="space-y-3">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-blue-500" />
                <span className="text-sm">Meccan Chapters</span>
              </div>
              <span className="text-sm font-medium">{meccanCount}</span>
            </div>
            <Progress value={(meccanCount / chapters.length) * 100} className="h-2 bg-blue-100" />
            
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-green-500" />
                <span className="text-sm">Medinan Chapters</span>
              </div>
              <span className="text-sm font-medium">{medinanCount}</span>
            </div>
            <Progress value={(medinanCount / chapters.length) * 100} className="h-2 bg-green-100" />
          </div>

          {/* Chapter Length Statistics */}
          <div className="space-y-3 pt-2 border-t">
            <h4 className="text-sm font-medium">Chapter Length Statistics</h4>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Longest Chapter</span>
                <div className="text-right">
                  <p className="font-medium">{longestChapter.englishName}</p>
                  <p className="text-xs text-muted-foreground">
                    {longestChapter.numberOfAyahs} verses
                  </p>
                </div>
              </div>

              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Shortest Chapter</span>
                <div className="text-right">
                  <p className="font-medium">{shortestChapter.englishName}</p>
                  <p className="text-xs text-muted-foreground">
                    {shortestChapter.numberOfAyahs} verses
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Average Statistics */}
          <div className="text-xs text-muted-foreground pt-2 border-t">
            <p>Average verses per chapter: {Math.round(totalVerses / chapters.length)}</p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}