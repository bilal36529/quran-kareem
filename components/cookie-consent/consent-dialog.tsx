'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Cookie, Shield, BarChart, Settings } from 'lucide-react';
import { CookieConsent } from '@/lib/utils/cookies';

interface ConsentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (consent: Partial<CookieConsent>) => void;
  initialConsent?: CookieConsent;
}

export default function ConsentDialog({
  open,
  onOpenChange,
  onSave,
  initialConsent
}: ConsentDialogProps) {
  const [consent, setConsent] = useState<Partial<CookieConsent>>({
    necessary: true,
    analytics: initialConsent?.analytics || false,
    marketing: initialConsent?.marketing || false,
    preferences: initialConsent?.preferences || false,
  });

  const handleSave = () => {
    onSave(consent);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div className="rounded-full bg-primary/10 p-1.5">
              <Cookie className="h-4 w-4 text-primary" />
            </div>
            Cookie Preferences
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="max-h-[60vh] pr-6">
          <div className="space-y-6">
            {/* Essential Cookies */}
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="rounded-full bg-primary/10 p-1.5 mt-0.5">
                  <Shield className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1 space-y-1">
                  <Label className="text-sm font-medium">Essential Cookies</Label>
                  <p className="text-sm text-muted-foreground">
                    Required for core functionality. These cannot be disabled.
                  </p>
                  <Switch checked disabled className="mt-2" />
                </div>
              </div>
            </div>

            {/* Analytics Cookies */}
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="rounded-full bg-primary/10 p-1.5 mt-0.5">
                  <BarChart className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1 space-y-1">
                  <Label className="text-sm font-medium">Analytics Cookies</Label>
                  <p className="text-sm text-muted-foreground">
                    Help us improve by collecting anonymous usage data.
                  </p>
                  <Switch
                    checked={consent.analytics}
                    onCheckedChange={(checked) =>
                      setConsent(prev => ({ ...prev, analytics: checked }))
                    }
                    className="mt-2"
                  />
                </div>
              </div>
            </div>

            {/* Preference Cookies */}
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="rounded-full bg-primary/10 p-1.5 mt-0.5">
                  <Settings className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1 space-y-1">
                  <Label className="text-sm font-medium">Preference Cookies</Label>
                  <p className="text-sm text-muted-foreground">
                    Remember your settings and customize your experience.
                  </p>
                  <Switch
                    checked={consent.preferences}
                    onCheckedChange={(checked) =>
                      setConsent(prev => ({ ...prev, preferences: checked }))
                    }
                    className="mt-2"
                  />
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>

        <div className="flex flex-col-reverse sm:flex-row gap-2 pt-4 border-t">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="sm:flex-1"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className="sm:flex-1"
          >
            Save Preferences
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}