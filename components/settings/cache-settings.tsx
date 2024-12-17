'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { CardContent } from '@/components/ui/card';
import { cacheService } from '@/lib/cache-service';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

export default function CacheSettings() {
  const [isClearing, setIsClearing] = useState(false);
  const { toast } = useToast();

  const handleClearCache = async () => {
    try {
      setIsClearing(true);
      await cacheService.clearCache();
      toast({
        title: 'Cache cleared',
        description: 'All cached data has been successfully cleared.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to clear cache. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsClearing(false);
    }
  };

  return (
    <CardContent className="space-y-6 p-6">
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium mb-4">Storage Settings</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="offline-mode">Enable Offline Mode</Label>
              <Switch id="offline-mode" />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="auto-cache">Automatically Cache Visited Pages</Label>
              <Switch id="auto-cache" />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Cache Management</h3>
          <Button
            variant="destructive"
            onClick={handleClearCache}
            disabled={isClearing}
          >
            {isClearing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Clearing Cache...
              </>
            ) : (
              'Clear Cache'
            )}
          </Button>
          <p className="text-sm text-muted-foreground">
            This will clear all cached chapters, verses, and audio files.
          </p>
        </div>
      </div>
    </CardContent>
  );
}