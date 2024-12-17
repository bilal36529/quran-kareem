'use client';

import { useState, useCallback } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Heart, Wallet } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

const PAYPAL_DONATE_LINK = 'https://www.paypal.com/donate/?hosted_button_id=6BWZ83ENUVEH8';

export default function DonationDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const handleDonateClick = useCallback(() => {
    window.open(PAYPAL_DONATE_LINK, '_blank', 'noopener,noreferrer');
    setIsOpen(false);
    
    // Show thank you toast
    setTimeout(() => {
      toast({
        title: "Thank you for considering a donation!",
        description: "Your support helps us maintain and improve MyQuran.so.",
      });
    }, 1000);
  }, [toast]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Heart className="h-4 w-4 text-red-500" />
          Support Us
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-red-500" />
            Support Quran Kareem
          </DialogTitle>
        </DialogHeader>

        <motion.div 
          className="space-y-6 py-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="text-center space-y-4">
            <Wallet className="h-12 w-12 mx-auto text-primary" />
            <p className="text-lg font-medium">
              Support Quran Kareem through PayPal
            </p>
            <p className="text-sm text-muted-foreground">
              Your donation helps us maintain and improve Quran Kareem. All contributions are greatly appreciated.
            </p>
          </div>

          <Button 
            className="w-full" 
            onClick={handleDonateClick}
            size="lg"
          >
            <Wallet className="mr-2 h-5 w-5" />
            Donate with PayPal
          </Button>

          <p className="text-xs text-center text-muted-foreground">
            Donations are processed securely through PayPal. You can specify any amount on the PayPal page.
          </p>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}