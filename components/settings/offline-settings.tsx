'use client';

import { useOfflineSync } from '@/hooks/use-offline-sync';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, Trash2, WifiOff, HardDrive } from 'lucide-react';
import { format } from 'date-fns';

export default function OfflineSettings() {
  const {
    isSyncing,
    lastSyncTime,
    cacheSize,
    isOfflineAvailable,
    clearOfflineData,
  } = useOfflineSync();

  const totalSize = Object.values(cacheSize).reduce((acc, size) => acc + size, 0);
  const formattedDate = lastSyncTime ? format(lastSyncTime, 'PPp') : 'Never';

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <WifiOff className="h-5 w-5" />
          Offline Access
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>Enable Offline Mode</Label>
            <p className="text-sm text-muted-foreground">
              Access Quran content without internet
            </p>
          </div>
          <Switch checked={isOfflineAvailable} />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Storage Used</span>
            <span>{totalSize} items cached</span>
          </div>
          <Progress value={(totalSize / 1000) * 100} className="h-2" />
          <p className="text-xs text-muted-foreground">
            Last synced: {formattedDate}
          </p>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <HardDrive className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Chapters</span>
              </div>
              <p className="text-sm text-muted-foreground">
                {cacheSize.chapters || 0} stored
              </p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Download className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Audio Files</span>
              </div>
              <p className="text-sm text-muted-foreground">
                {cacheSize.audio || 0} stored
              </p>
            </div>
          </div>
        </div>

        <Button
          variant="destructive"
          onClick={clearOfflineData}
          disabled={isSyncing || !isOfflineAvailable}
          className="w-full"
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Clear Offline Data
        </Button>
      </CardContent>
    </Card>
  );
}