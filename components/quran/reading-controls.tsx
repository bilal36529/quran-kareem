'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Type,
  Moon,
  Sun,
  Book,
  Maximize2,
  Minimize2,
  Languages
} from 'lucide-react';

interface ReadingControlsProps {
  onFontSizeChange: (size: number) => void;
  onThemeChange: (theme: 'light' | 'sepia' | 'dark') => void;
  onTranslationToggle: () => void;
  onFullscreenToggle: () => void;
  fontSize: number;
  theme: string;
  showTranslation: boolean;
  isFullscreen: boolean;
}

export default function ReadingControls({
  onFontSizeChange,
  onThemeChange,
  onTranslationToggle,
  onFullscreenToggle,
  fontSize,
  theme,
  showTranslation,
  isFullscreen,
}: ReadingControlsProps) {
  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-background/95 backdrop-blur-lg border rounded-full px-4 py-2 shadow-lg flex items-center gap-4">
      <div className="flex items-center gap-2">
        <Type className="h-4 w-4" />
        <Slider
          value={[fontSize]}
          onValueChange={([value]) => onFontSizeChange(value)}
          min={16}
          max={32}
          step={2}
          className="w-24"
        />
      </div>

      <div className="h-6 w-px bg-border" />

      <Select value={theme} onValueChange={(value: 'light' | 'sepia' | 'dark') => onThemeChange(value)}>
        <SelectTrigger className="w-[100px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="light">
            <div className="flex items-center gap-2">
              <Sun className="h-4 w-4" />
              Light
            </div>
          </SelectItem>
          <SelectItem value="sepia">
            <div className="flex items-center gap-2">
              <Book className="h-4 w-4" />
              Sepia
            </div>
          </SelectItem>
          <SelectItem value="dark">
            <div className="flex items-center gap-2">
              <Moon className="h-4 w-4" />
              Dark
            </div>
          </SelectItem>
        </SelectContent>
      </Select>

      <div className="h-6 w-px bg-border" />

      <Button
        variant="ghost"
        size="sm"
        onClick={onTranslationToggle}
        className={showTranslation ? 'text-primary' : ''}
      >
        <Languages className="h-4 w-4" />
      </Button>

      <Button
        variant="ghost"
        size="sm"
        onClick={onFullscreenToggle}
      >
        {isFullscreen ? (
          <Minimize2 className="h-4 w-4" />
        ) : (
          <Maximize2 className="h-4 w-4" />
        )}
      </Button>
    </div>
  );
}