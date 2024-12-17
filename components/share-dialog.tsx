'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Share2 } from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

interface ShareDialogProps {
  url: string;
  title: string;
}

export default function ShareDialog({ url, title }: ShareDialogProps) {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      toast({
        title: 'Link copied',
        description: 'The link has been copied to your clipboard.',
      });
      setOpen(false);
    } catch (err) {
      toast({
        title: 'Failed to copy',
        description: 'Please try copying the link manually.',
        variant: 'destructive',
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Share2 className="h-4 w-4 mr-2" />
          Share
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Share {title}</DialogTitle>
        </DialogHeader>
        <div className="flex gap-2">
          <Input
            readOnly
            value={url}
            onClick={(e) => e.currentTarget.select()}
          />
          <Button onClick={handleCopy}>Copy</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}