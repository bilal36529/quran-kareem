'use client';

import { useBookmarks } from '@/hooks/use-bookmarks';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollText, ChevronRight, BookMarked } from 'lucide-react';
import Link from 'next/link';
import { format } from 'date-fns';

export default function RecentlyRead() {
  const { bookmarks } = useBookmarks();
  
  if (bookmarks.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <BookMarked className="h-5 w-5 text-primary" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-4">
            <p className="text-sm text-muted-foreground">
              No recent activity. Start reading to track your progress.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const sortedBookmarks = [...bookmarks]
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, 5);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <BookMarked className="h-5 w-5 text-primary" />
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {sortedBookmarks.map((bookmark) => (
          <Link
            key={bookmark.id}
            href={`/quran/${bookmark.chapterId}${bookmark.verseNumber ? `#verse-${bookmark.verseNumber}` : ''}`}
            className="flex items-center justify-between p-2 rounded-md hover:bg-accent transition-colors"
          >
            <div className="flex items-center gap-3">
              <ScrollText className="h-4 w-4 text-primary" />
              <div>
                <span className="text-sm font-medium">{bookmark.title}</span>
                <p className="text-xs text-muted-foreground">
                  {format(new Date(bookmark.timestamp), 'MMM d, yyyy')}
                </p>
              </div>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </Link>
        ))}
      </CardContent>
    </Card>
  );
}