'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Slider } from '@/components/ui/slider';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useAudioSettings } from '@/lib/audio-context';
import { getAudioUrl } from '@/lib/services/audio';
import { audioService } from '@/lib/services/audio-service';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Volume1,
  SkipForward, 
  Loader2,
  Settings,
  Repeat
} from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

interface AudioPlayerProps {
  chapterNumber: number;
  verseNumber: number;
  totalVerses: number;
  onPlayStateChange?: (isPlaying: boolean) => void;
  onVerseComplete?: () => void;
  className?: string;
}

export default function AudioPlayer({
  chapterNumber,
  verseNumber,
  totalVerses,
  onPlayStateChange,
  onVerseComplete,
  className
}: AudioPlayerProps) {
  const { toast } = useToast();
  const { globalSettings, updateGlobalSettings } = useAudioSettings();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [volume, setVolume] = useState(globalSettings.volume);
  const [isMuted, setIsMuted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentRepeat, setCurrentRepeat] = useState(1);
  const [totalRepeats, setTotalRepeats] = useState(1);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);

  const updateAudioSettings = React.useCallback(() => {
    return audioService.updateSettings({
      playbackSpeed: globalSettings.playbackSpeed,
      volume: isMuted ? 0 : volume,
      autoPlay: globalSettings.autoPlay,
      repeatEnabled: globalSettings.repeatEnabled,
      repeatCount: globalSettings.repeatCount
    });
  }, [globalSettings, volume, isMuted]);

  useEffect(() => {
    updateAudioSettings();
    
    const handleAudioStop = (reason?: string) => {
      setIsPlaying(false);
      onPlayStateChange?.(false);
      
      // Handle auto-play for natural ending
      if (reason === 'ended' && globalSettings.autoPlay && onVerseComplete) {
        onVerseComplete();
      }
    };

    audioService.onStop(handleAudioStop);
    
    return () => {
      audioService.offStop(handleAudioStop);
    };
  }, [updateAudioSettings, onPlayStateChange, onVerseComplete, globalSettings.autoPlay]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isPlaying) {
        setCurrentRepeat(audioService.getCurrentRepeat());
        setTotalRepeats(audioService.getTotalRepeats());
      }
    }, 200); // Reduced polling frequency for better performance

    return () => clearInterval(interval);
  }, [isPlaying]);

  const handlePlayback = async () => {
    try {
      setError(null);
      setIsAutoPlaying(false);
      setIsLoading(true);

      if (isPlaying) {
        audioService.stop();
        return;
      }

      const audioUrl = getAudioUrl(chapterNumber, verseNumber, globalSettings.reciter);

      await audioService.playVerse(`${chapterNumber}:${verseNumber}`, audioUrl);

      setIsPlaying(true);
      onPlayStateChange?.(true);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to play audio';
      console.warn('Audio playback error:', errorMessage);
      setError(errorMessage);
      setIsPlaying(false);
      onPlayStateChange?.(false);
      toast({
        title: 'Audio Error',
        description: 'Unable to play audio. Please try again later.',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleNextVerse = () => {
    if (verseNumber < totalVerses && onVerseComplete) {
      audioService.stop(); // Stop current audio
      setIsPlaying(false);
      setIsAutoPlaying(false);
      onPlayStateChange?.(false);
      // Add small delay before triggering next verse
      setTimeout(() => {
      onVerseComplete();
      }, 100);
    }
  };

  const getVolumeIcon = () => {
    if (isMuted || volume === 0) return <VolumeX className="h-4 w-4" />;
    if (volume < 0.5) return <Volume1 className="h-4 w-4" />;
    return <Volume2 className="h-4 w-4" />;
  };

  return (
    <div className={cn(
      "flex items-center gap-1.5 bg-accent/50 rounded-full",
      "p-1.5 sm:p-2",
      "shadow-sm border border-border/50",
      className
    )}>
      <div className="flex items-center">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={isPlaying ? "default" : "ghost"}
              size="sm"
              onClick={handlePlayback}
              disabled={isLoading}
              className={cn(
                "w-7 h-7 sm:w-8 sm:h-8 p-0 rounded-full",
                "hover:bg-accent transition-colors",
                isPlaying && "bg-primary text-primary-foreground hover:bg-primary/90"
              )}
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : isPlaying ? (
                <Pause className="h-4 w-4" />
              ) : (
                <Play className="h-4 w-4 ml-0.5" />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent side="top">
            {isPlaying ? 'Pause' : 'Play'}
          </TooltipContent>
        </Tooltip>
      </div>

      {globalSettings.repeatEnabled && isPlaying && (
        <div className="hidden sm:flex items-center gap-1 px-2 py-1 bg-accent rounded-full text-xs">
          <Repeat className="h-3 w-3" />
          <span>{currentRepeat}/{totalRepeats}</span>
        </div>
      )}

      <div className="flex items-center gap-1">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className={cn( 
                "w-8 h-8 p-0 rounded-full hover:bg-accent",
                isMuted && "text-muted-foreground"
              )}
              onClick={() => {
                setIsMuted(!isMuted);
                audioService.updateSettings({ volume: isMuted ? volume : 0 });
              }}
            >
              <span>{getVolumeIcon()}</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-64" side="top" align="center">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Volume</Label>
                <span className="text-sm text-muted-foreground">
                  {Math.round(volume * 100)}%
                </span>
              </div>
              <Slider
                value={[isMuted ? 0 : volume * 100]}
                min={0}
                max={100}
                step={1}
                onValueChange={([value]) => {
                  const newVolume = value / 100;
                  setVolume(newVolume);
                  setIsMuted(false);
                  audioService.updateSettings({ volume: newVolume });
                }}
                className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
              />
            </div>
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="w-8 h-8 p-0 rounded-full hover:bg-accent"
              aria-label="Audio Settings"
            >
              <Settings className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-64" side="top" align="center">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Playback Speed</Label>
                <Slider
                  value={[globalSettings.playbackSpeed * 100]}
                  min={50}
                  max={200}
                  step={25}
                  onValueChange={([value]) => {
                    updateGlobalSettings({ 
                      playbackSpeed: value / 100 
                    });
                  }}
                  className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>0.5x</span>
                  <span>1x</span>
                  <span>2x</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Auto-play Next Verse</Label>
                  <Switch
                    checked={globalSettings.autoPlay}
                    onCheckedChange={(checked) => {
                      updateGlobalSettings({ autoPlay: checked });
                    }}
                  />
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      {verseNumber < totalVerses && (
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              disabled={isLoading}
              onClick={handleNextVerse}
              className={cn(
                "w-8 h-8 p-0 rounded-full",
                "hover:bg-accent hover:text-primary",
                "active:scale-95 transition-all"
              )}
            >
              <SkipForward className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="top">Next verse</TooltipContent>
        </Tooltip>
      )}

      {error && (
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
          <span className="text-xs text-destructive bg-background/95 px-2 py-1 rounded-md shadow-sm" title={error}>
            Error playing audio
          </span>
        </div>
      )}
    </div>
  );
}