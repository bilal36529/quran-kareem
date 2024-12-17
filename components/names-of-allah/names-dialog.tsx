'use client';

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent } from '@/components/ui/card';
import { Star, Search, Sparkles, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getAllahNames, searchAllahNames } from '@/lib/names-of-allah';
import { AllahName } from '@/lib/types';

export default function NamesDialog() {
  const [names, setNames] = useState<AllahName[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedName, setSelectedName] = useState<AllahName | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchNames = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getAllahNames();
        setNames(data);
      } catch (err) {
        setError('Failed to load Names of Allah. Please try again later.');
        console.error('Error loading names:', err);
      } finally {
        setLoading(false);
      }
    };

    if (isOpen) {
      fetchNames();
    }
  }, [isOpen]);

  const filteredNames = searchQuery ? searchAllahNames(names, searchQuery) : names;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2">
          <Star className="h-4 w-4 text-primary" />
          Names of Allah
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px] h-[80vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Sparkles className="h-5 w-5 text-primary" />
            Names of Allah (أسماء الله الحسنى)
          </DialogTitle>
        </DialogHeader>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search Names..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-[400px]">
            <div className="text-center">
              <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
              <p className="text-sm text-muted-foreground">Loading Names of Allah...</p>
            </div>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center h-[400px]">
            <div className="text-center">
              <p className="text-sm text-destructive">{error}</p>
              <Button
                variant="outline"
                size="sm"
                className="mt-4"
                onClick={() => setIsOpen(false)}
              >
                Close
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
            <ScrollArea className="h-[calc(80vh-180px)]">
              <div className="space-y-2 pr-4">
                <AnimatePresence>
                  {filteredNames.map((name) => (
                    <motion.div
                      key={name.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Card
                        className={`cursor-pointer transition-all hover:border-primary ${
                          selectedName?.id === name.id ? 'border-primary bg-primary/5' : ''
                        }`}
                        onClick={() => setSelectedName(name)}
                      >
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="text-lg font-semibold">{name.transliteration}</p>
                              <p className="text-sm text-muted-foreground">{name.en.meaning}</p>
                            </div>
                            <p className="text-2xl font-amiri text-primary">{name.name}</p>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </ScrollArea>

            <div className="border-l pl-6">
              {selectedName ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="text-center space-y-2">
                    <h3 className="text-3xl font-amiri text-primary">{selectedName.name}</h3>
                    <p className="text-xl font-semibold">{selectedName.transliteration}</p>
                    <p className="text-lg text-muted-foreground">{selectedName.en.meaning}</p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">English Description</h4>
                      <p className="text-muted-foreground">{selectedName.en.desc}</p>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Arabic Description</h4>
                      <p className="text-muted-foreground font-amiri text-lg" dir="rtl">
                        {selectedName.ar.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <div className="h-full flex items-center justify-center text-center text-muted-foreground">
                  <p>Select a name to view details</p>
                </div>
              )}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}