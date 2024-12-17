'use client';

import { useBookmarks } from '@/hooks/use-bookmarks';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollText, Calendar, Tag, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { format } from 'date-fns';

export default function BookmarksList() {
  const { bookmarks, removeBookmark } = useBookmarks();

  if (bookmarks.length === 0) {
    return (
      <div className="text-center py-8">
        <ScrollText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
        <h3 className="text-lg font-semibold mb-2">No Bookmarks Yet</h3>
        <p className="text-muted-foreground">
          Start bookmarking chapters and verses to track your progress
        </p>
      </div>
    );
  }

  const sortedBookmarks = [...bookmarks].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  return (
    <div className="space-y-4">
      {sortedBookmarks.map((bookmark) => (
        <Card key={bookmark.id}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-semibold">
              <Link
                href={`/quran/${bookmark.chapterId}${bookmark.verseNumber ? `#verse-${bookmark.verseNumber}` : ''}`}
                className="hover:text-primary transition-colors"
              >
                {bookmark.title}
              </Link>
            </CardTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => removeBookmark(bookmark.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{format(new Date(bookmark.timestamp), 'MMM d, yyyy')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <ScrollText className="h-4 w-4" />
                  <span>{bookmark.type === 'chapter' ? 'Chapter' : 'Verse'}</span>
                </div>
              </div>

              {bookmark.notes && (
                <p className="text-sm">{bookmark.notes}</p>
              )}

              {bookmark.tags && bookmark.tags.length > 0 && (
                <div className="flex items-center gap-2">
                  <Tag className="h-4 w-4 text-muted-foreground" />
                  <div className="flex flex-wrap gap-2">
                    {bookmark.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}