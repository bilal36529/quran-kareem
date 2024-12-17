'use client';

import { useTheme } from 'next-themes';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';
import { CardContent } from '@/components/ui/card';

export default function AppearanceSettings() {
  const { theme, setTheme } = useTheme();

  return (
    <CardContent className="space-y-6 p-6">
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium mb-4">Theme</h3>
          <RadioGroup
            value={theme}
            onValueChange={setTheme}
            className="grid grid-cols-3 gap-4"
          >
            <div>
              <RadioGroupItem value="light" id="light" className="peer sr-only" />
              <Label
                htmlFor="light"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              >
                Light
              </Label>
            </div>
            <div>
              <RadioGroupItem value="dark" id="dark" className="peer sr-only" />
              <Label
                htmlFor="dark"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              >
                Dark
              </Label>
            </div>
            <div>
              <RadioGroupItem value="system" id="system" className="peer sr-only" />
              <Label
                htmlFor="system"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              >
                System
              </Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Accessibility</h3>
          <div className="flex items-center justify-between">
            <Label htmlFor="reduce-animations">Reduce animations</Label>
            <Switch id="reduce-animations" />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="large-text">Larger text</Label>
            <Switch id="large-text" />
          </div>
        </div>
      </div>
    </CardContent>
  );
}