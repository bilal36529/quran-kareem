'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Cookie } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ConsentDialog from './consent-dialog';
import { CookieConsent, setConsentCookie } from '@/lib/utils/cookies';

interface CookieBannerProps {
  onConsent: (consent: CookieConsent) => void;
}

export default function CookieBanner({ onConsent }: CookieBannerProps) {
  const [showDialog, setShowDialog] = useState(false);

  const handleAcceptAll = () => {
    const consent = setConsentCookie({
      necessary: true,
      analytics: true,
      marketing: true,
      preferences: true
    });
    onConsent(consent);
  };

  const handleRejectAll = () => {
    const consent = setConsentCookie({
      necessary: true,
      analytics: false,
      marketing: false,
      preferences: false
    });
    onConsent(consent);
  };

  const handleSavePreferences = (preferences: Partial<CookieConsent>) => {
    const consent = setConsentCookie(preferences);
    onConsent(consent);
  };

  return (
    <>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6 mobile-safe-bottom"
        >
          <div className="max-w-2xl mx-auto w-full">
            <div className="relative overflow-hidden rounded-lg border bg-card shadow-lg">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-background/80 to-background/80 backdrop-blur-md" />
              
              <div className="relative p-4 sm:p-6 space-y-4">
                <div className="flex items-start gap-4">
                  <div className="hidden sm:block">
                    <div className="rounded-full bg-primary/10 p-2">
                      <Cookie className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                  
                  <div className="flex-1 space-y-3">
                    <div className="space-y-2">
                      <h3 className="font-semibold tracking-tight">Cookie Settings</h3>
                      <p className="text-sm text-muted-foreground">
                        We use cookies to enhance your experience and analyze our website traffic. 
                        Choose your preferences below.
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-2">
                      <Button
                        className="sm:flex-1 bg-primary/90 hover:bg-primary"
                        onClick={handleAcceptAll}
                      >
                        Accept All
                      </Button>
                      <Button
                        className="sm:flex-1"
                        variant="outline"
                        onClick={handleRejectAll}
                      >
                        Reject All
                      </Button>
                      <Button
                        className="sm:flex-1"
                        variant="outline"
                        onClick={() => setShowDialog(true)}
                      >
                        Customize
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <ConsentDialog
        open={showDialog}
        onOpenChange={setShowDialog}
        onSave={handleSavePreferences}
      />
    </>
  );
}