'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { Loader2, HardDrive, Database, Trash2 } from 'lucide-react';
import { getLocalStorageSize, clearLocalStorageIfNeeded } from '@/lib/utils';

export default function StorageSettings() {
  const [isClearing, setIsClearing] = useState(false);
  const [storageSize, setStorageSize] = useState(0);
  const [offlineEnabled, setOfflineEnabled] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const size = getLocalStorageSize();
    setStorageSize(size);
  }, []);

  const handleClearStorage = async () => {
    try {
      setIsClearing(true);
      clearLocalStorageIfNeeded(0); // Clear all storage
      setStorageSize(0);
      toast({
        title: 'Storage cleared',
        description: 'All cached data has been successfully cleared.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to clear storage. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsClearing(false);
    }
  };

  const formatSize = (bytes: number) => {
    const mb = bytes / (1024 * 1024);
    return `${mb.toFixed(2)} MB`;
  };

  const storagePercentage = (storageSize / (10 * 1024 * 1024)) * 100; // 10MB max

  return (
    <CardContent className="space-y-6 p-6">
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium mb-4">Offline Mode</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Save for Offline</Label>
              <p className="text-xs text-muted-foreground">Access content without internet</p>
              <Switch
                id="offline-mode"
                checked={offlineEnabled}
                onCheckedChange={setOfflineEnabled}
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Cache Used</span>
              <span>{formatSize(storageSize)}</span>
            </div>
            <Progress value={storagePercentage} className="h-2" />
            <p className="text-xs text-muted-foreground">
              {formatSize(storageSize)} of 10 MB
            </p>
          </div>
        </div>

        <div className="pt-4">
          <Button
            variant="destructive"
            onClick={handleClearStorage}
            disabled={isClearing || storageSize === 0}
            className="w-full"
          >
            {isClearing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Clearing...
              </>
            ) : (
              <>
                <Trash2 className="mr-2 h-4 w-4" />
                Clear Cache
              </>
            )}
          </Button>
          <p className="text-xs text-muted-foreground mt-2 text-center">
            Clear saved content and settings
          </p>
        </div>
      </div>
    </CardContent>
  );
}