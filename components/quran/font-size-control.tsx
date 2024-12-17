'use client';

import { useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Type } from 'lucide-react';
import { useFontSettings } from '@/lib/font-context';

export default function FontSizeControl() {
  const { fontSettings, updateFontSettings } = useFontSettings();

  const handleArabicSizeChange = useCallback(([value]: number[]) => {
    updateFontSettings({ arabicSize: value });
  }, [updateFontSettings]);

  const handleTranslationSizeChange = useCallback(([value]: number[]) => {
    updateFontSettings({ translationSize: value });
  }, [updateFontSettings]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className="gap-1.5 h-9 px-2.5 sm:px-3"
        >
          <Type className="h-4 w-4" />
          <span className="hidden sm:inline">Font Size</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Arabic Text Size</Label>
              <span className="text-sm text-muted-foreground">
                {fontSettings.arabicSize}px
              </span>
            </div>
            <Slider
              value={[fontSettings.arabicSize]}
              min={18} max={48} step={2}
              onValueChange={handleArabicSizeChange}
              className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Translation Text Size</Label>
              <span className="text-sm text-muted-foreground">
                {fontSettings.translationSize}px
              </span>
            </div>
            <Slider
              value={[fontSettings.translationSize]}
              min={12} max={32} step={2}
              onValueChange={handleTranslationSizeChange}
              className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
            />
          </div>

          <div className="pt-2 text-xs text-muted-foreground">
            Adjust the text size for comfortable reading
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}