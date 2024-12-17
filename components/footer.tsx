'use client';

import Link from 'next/link';
import { NAVIGATION, SITE_CONFIG } from '@/lib/constants';
import { Heart, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import DonationDialog from './donation/donation-dialog';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-gradient-to-b from-background to-background/80 backdrop-blur-xl">
      <div className="container py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Branding */}
          <div className="space-y-4 text-center sm:text-left">
            <h3 className="text-lg font-semibold">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary/90 to-primary/70">
                Qurankareem.app
              </span>
            </h3>
            <p className="text-sm text-muted-foreground">
              Your companion for Quran memorization
            </p>
            <DonationDialog />
          </div>

          {/* Main Navigation */}
          <div className="text-center sm:text-left">
            <h3 className="text-sm font-semibold mb-4">Navigation</h3>
            <ul className="space-y-3">
              {NAVIGATION.main.map((item) => (
                <li key={item.name}>
                  <Link 
                    href={item.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="text-center sm:text-left">
            <h3 className="text-sm font-semibold mb-4">Resources</h3>
            <ul className="space-y-3">
              {NAVIGATION.resources.map((item) => (
                <li key={item.name}>
                  <Link 
                    href={item.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t">
          <div className="flex flex-col items-center justify-center gap-2 text-center">
            <div className="flex items-center gap-2 text-sm">
              <span>Made with</span>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 1.5,
                  ease: "easeInOut"
                }}
              >
                <Heart className="h-4 w-4 text-red-500" />
              </motion.div>
              <span>by</span>
              <span className="font-medium">Abdirahman Ahmed</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Sparkles className="h-3 w-3" />
              <span>© {currentYear} Qurankareem.app</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}