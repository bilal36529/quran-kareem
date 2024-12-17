'use client';

import { useState, useEffect } from 'react';
import { offlineManager } from '@/lib/offline-manager';
import { useToast } from '@/hooks/use-toast';

export function useOfflineSync() {
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState<Date | null>(null);
  const [cacheSize, setCacheSize] = useState<{ [key: string]: number }>({});
  const [isOfflineAvailable, setIsOfflineAvailable] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    checkOfflineAvailability();
    loadCacheInfo();
  }, []);

  const checkOfflineAvailability = async () => {
    try {
      const sizes = await offlineManager.getCacheSize();
      setIsOfflineAvailable(Object.values(sizes).some(size => size > 0));
    } catch (error) {
      console.error('Error checking offline availability:', error);
    }
  };

  const loadCacheInfo = async () => {
    try {
      const sizes = await offlineManager.getCacheSize();
      setCacheSize(sizes);

      const lastSync = await offlineManager.getLastSync('chapters');
      if (lastSync) {
        setLastSyncTime(new Date(lastSync));
      }
    } catch (error) {
      console.error('Error loading cache info:', error);
    }
  };

  const syncChapter = async (chapterNumber: number) => {
    try {
      setIsSyncing(true);

      // Fetch and cache chapter data
      const response = await fetch(`/api/chapters/${chapterNumber}`);
      const chapterData = await response.json();
      await offlineManager.cacheChapter(chapterData);

      // Fetch and cache verses
      const versesResponse = await fetch(`/api/verses/${chapterNumber}`);
      const versesData = await versesResponse.json();
      await offlineManager.cacheVerses(chapterNumber, versesData);

      await loadCacheInfo();
      
      toast({
        title: 'Sync Complete',
        description: `Chapter ${chapterNumber} is now available offline.`,
      });
    } catch (error) {
      console.error('Error syncing chapter:', error);
      toast({
        title: 'Sync Failed',
        description: 'Unable to sync chapter for offline use.',
        variant: 'destructive',
      });
    } finally {
      setIsSyncing(false);
    }
  };

  const clearOfflineData = async () => {
    try {
      setIsSyncing(true);
      await offlineManager.clearCache();
      await loadCacheInfo();
      
      toast({
        title: 'Cache Cleared',
        description: 'All offline data has been removed.',
      });
    } catch (error) {
      console.error('Error clearing cache:', error);
      toast({
        title: 'Error',
        description: 'Failed to clear offline data.',
        variant: 'destructive',
      });
    } finally {
      setIsSyncing(false);
    }
  };

  const getCachedChapter = async (chapterNumber: number) => {
    try {
      return await offlineManager.getCachedChapter(chapterNumber);
    } catch (error) {
      console.error('Error getting cached chapter:', error);
      return null;
    }
  };

  const getCachedVerses = async (chapterNumber: number) => {
    try {
      return await offlineManager.getCachedVerses(chapterNumber);
    } catch (error) {
      console.error('Error getting cached verses:', error);
      return null;
    }
  };

  const getCachedAudio = async (url: string) => {
    try {
      return await offlineManager.getCachedAudio(url);
    } catch (error) {
      console.error('Error getting cached audio:', error);
      return null;
    }
  };

  return {
    isSyncing,
    lastSyncTime,
    cacheSize,
    isOfflineAvailable,
    syncChapter,
    clearOfflineData,
    getCachedChapter,
    getCachedVerses,
    getCachedAudio,
  };
}