'use client';

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface ThemeSelectorProps {
  currentTheme: string;
  onThemeChange: (theme: string) => void;
  className?: string;
}

export default function ThemeSelector({
  currentTheme,
  onThemeChange,
  className
}: ThemeSelectorProps) {
  return (
    <RadioGroup
      value={currentTheme}
      onValueChange={onThemeChange}
      className={cn("flex space-x-4", className)}
    >
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="default" id="default" />
        <Label htmlFor="default">Default</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="elegant" id="elegant" />
        <Label htmlFor="elegant">Elegant</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="modern" id="modern" />
        <Label htmlFor="modern">Modern</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="classic" id="classic" />
        <Label htmlFor="classic">Classic</Label>
      </div>
    </RadioGroup>
  );
}