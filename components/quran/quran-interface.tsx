'use client';

import { useState } from 'react';
import { Chapter } from '@/lib/types';
import ChapterList from './chapter-list';
import QuranSearch from './quran-search';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import QuranStats from './quran-stats';
import BookmarksList from './bookmarks-list';
import RecentlyRead from './recently-read';
import { Bookmark } from 'lucide-react';
import QuranSkeleton from './quran-skeleton';

interface QuranInterfaceProps {
  initialChapters: Chapter[];
}

export default function QuranInterface({ initialChapters }: QuranInterfaceProps) {
  const [chapters] = useState<Chapter[]>(initialChapters);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-8">
        <div className="flex-1 w-full">
          <h1 className="text-4xl font-bold mb-2">Browse Quran</h1>
          <p className="text-muted-foreground">
            Explore all 114 chapters of the Holy Quran
          </p>
        </div>
        <QuranSearch className="w-full md:w-96" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3">
          <Tabs defaultValue="all" className="space-y-6">
            <TabsList className="w-full justify-start">
              <TabsTrigger value="all">All Chapters</TabsTrigger>
              <TabsTrigger value="meccan">Meccan</TabsTrigger>
              <TabsTrigger value="medinan">Medinan</TabsTrigger>
              <TabsTrigger value="bookmarked" className="w-10 p-0">
                <Bookmark className="h-4 w-4" />
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="min-h-[400px]">
              {isLoading ? (
                <QuranSkeleton />
              ) : (
                <ChapterList 
                  chapters={chapters} 
                  filter="all"
                  onLoadingChange={setIsLoading} 
                />
              )}
            </TabsContent>

            <TabsContent value="meccan" className="space-y-6">
              <ChapterList chapters={chapters} filter="meccan" />
            </TabsContent>

            <TabsContent value="medinan" className="space-y-6">
              <ChapterList chapters={chapters} filter="medinan" />
            </TabsContent>

            <TabsContent value="bookmarked" className="space-y-6">
              <BookmarksList />
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <QuranStats chapters={chapters} />
          <RecentlyRead />
        </div>
      </div>
    </div>
  );
}