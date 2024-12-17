'use client';

import { useAudioSettings } from '@/lib/audio-context';
import { RECITERS } from '@/lib/audio-settings';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { CardContent } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function AudioSettings() {
  const { globalSettings, updateGlobalSettings } = useAudioSettings();

  return (
    <CardContent className="space-y-6 p-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Default Reciter</Label>
          <Select
            value={globalSettings.reciter}
            onValueChange={(value) => updateGlobalSettings({ reciter: value })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {RECITERS.map(reciter => (
                <SelectItem key={reciter.id} value={reciter.id}>
                  {reciter.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Default Playback Speed</Label>
          <Select
            value={globalSettings.playbackSpeed.toString()}
            onValueChange={(value) =>
              updateGlobalSettings({ playbackSpeed: parseFloat(value) })
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0.5">0.5x</SelectItem>
              <SelectItem value="0.75">0.75x</SelectItem>
              <SelectItem value="1">1x</SelectItem>
              <SelectItem value="1.25">1.25x</SelectItem>
              <SelectItem value="1.5">1.5x</SelectItem>
              <SelectItem value="2">2x</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="auto-play">Auto-play Next Verse</Label>
            <Switch
              id="auto-play"
              checked={globalSettings.autoPlay}
              onCheckedChange={(checked) =>
                updateGlobalSettings({ autoPlay: checked })
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="repeat-enabled">Enable Verse Repetition</Label>
            <Switch
              id="repeat-enabled"
              checked={globalSettings.repeatEnabled}
              onCheckedChange={(checked) =>
                updateGlobalSettings({ repeatEnabled: checked })
              }
            />
          </div>

          {globalSettings.repeatEnabled && (
            <div className="space-y-2">
              <Label>Default Repeat Count</Label>
              <Select
                value={globalSettings.repeatCount.toString()}
                onValueChange={(value) =>
                  updateGlobalSettings({ repeatCount: parseInt(value) })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[2, 3, 5, 10].map(count => (
                    <SelectItem key={count} value={count.toString()}>
                      {count} times
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
      </div>
    </CardContent>
  );
}