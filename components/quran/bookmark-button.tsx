'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { BookMarked, BookPlus } from 'lucide-react';
import { useBookmarks, Bookmark } from '@/hooks/use-bookmarks';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

interface BookmarkButtonProps {
  chapterId: number;
  verseNumber?: number;
  title: string;
  className?: string;
}

export default function BookmarkButton({
  chapterId,
  verseNumber,
  title,
  className,
}: BookmarkButtonProps) {
  const { isBookmarked, addBookmark, removeBookmark, getBookmark } = useBookmarks();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [notes, setNotes] = useState('');
  const [tags, setTags] = useState('');
  const { toast } = useToast();
  
  const bookmarked = isBookmarked(chapterId, verseNumber);
  const existingBookmark = getBookmark(chapterId, verseNumber);

  const handleBookmark = () => {
    if (bookmarked) {
      if (existingBookmark) {
        removeBookmark(existingBookmark.id);
        toast({
          title: 'Bookmark Removed',
          description: 'The bookmark has been removed successfully.',
        });
      }
    } else {
      setIsDialogOpen(true);
    }
  };

  const handleSaveBookmark = () => {
    const bookmark: Omit<Bookmark, 'id' | 'timestamp'> = {
      type: verseNumber ? 'verse' : 'chapter',
      chapterId,
      verseNumber,
      title,
      notes: notes.trim(),
      tags: tags.split(',').map(t => t.trim()).filter(Boolean),
      progress: 0,
    };

    addBookmark(bookmark);
    setIsDialogOpen(false);
    setNotes('');
    setTags('');

    toast({
      title: 'Bookmark Added',
      description: 'The bookmark has been saved successfully.',
    });
  };

  return (
    <>
      <Button
        variant={bookmarked ? 'default' : 'outline'} 
        size="sm"
        onClick={handleBookmark}
        className={cn("h-9 w-9 p-0", className)}
      >
        {bookmarked ? <BookMarked className="h-4 w-4" /> : <BookPlus className="h-4 w-4" />}
      </Button>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Bookmark</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Title</Label>
              <Input value={title} disabled />
            </div>
            
            <div className="space-y-2">
              <Label>Notes (optional)</Label>
              <Textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add any notes about this bookmark..."
                className="min-h-[100px]"
              />
            </div>

            <div className="space-y-2">
              <Label>Tags (optional)</Label>
              <Input
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="Enter tags separated by commas"
              />
            </div>

            <Button 
              onClick={handleSaveBookmark} 
              className="w-full h-10 mt-4"
            >
              Save Bookmark
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}