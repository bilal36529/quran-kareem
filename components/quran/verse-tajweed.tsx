'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TAJWEED_RULES, TajweedRule, applyTajweedHighlighting } from '@/lib/services/tajweed';
import { ScrollArea } from '@/components/ui/scroll-area';
import { motion, AnimatePresence } from 'framer-motion';

interface VerseTajweedProps {
  text: string;
  onClose: () => void;
}

export default function VerseTajweed({ text, onClose }: VerseTajweedProps) {
  const [selectedRule, setSelectedRule] = useState<TajweedRule | null>(null);
  const highlightedText = applyTajweedHighlighting(text);

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle className="text-lg flex items-center justify-between">
          <span>Tajweed Rules</span>
          <Button variant="ghost" size="sm" onClick={onClose}>Close</Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Rules List */}
          <div>
            <h3 className="text-sm font-medium mb-3">Rules</h3>
            <ScrollArea className="h-[300px]">
              <div className="space-y-2">
                {TAJWEED_RULES.map((rule) => (
                  <Button
                    key={rule.name}
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => setSelectedRule(rule)}
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: rule.color }}
                      />
                      <span>{rule.name}</span>
                      <span className="text-sm text-muted-foreground">
                        ({rule.arabicName})
                      </span>
                    </div>
                  </Button>
                ))}
              </div>
            </ScrollArea>
          </div>

          {/* Rule Details */}
          <div>
            <h3 className="text-sm font-medium mb-3">Details</h3>
            <AnimatePresence mode="wait">
              {selectedRule ? (
                <motion.div
                  key={selectedRule.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-4"
                >
                  <div className="p-4 rounded-lg bg-muted">
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      {selectedRule.name}
                      <span className="text-sm text-muted-foreground">
                        ({selectedRule.arabicName})
                      </span>
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {selectedRule.description}
                    </p>
                    {selectedRule.example && (
                      <div className="mt-4">
                        <span className="text-sm text-muted-foreground">Example:</span>
                        <div 
                          className="text-xl font-amiri mt-1"
                          style={{ color: selectedRule.color }}
                        >
                          {selectedRule.example}
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              ) : (
                <div className="text-center text-muted-foreground p-4">
                  Select a rule to see details
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Highlighted Verse */}
        <div>
          <h3 className="text-sm font-medium mb-3">Applied Rules</h3>
          <div
            className="text-2xl font-amiri text-right leading-loose p-4 bg-muted rounded-lg"
            dir="rtl"
            dangerouslySetInnerHTML={{ __html: highlightedText }}
          />
        </div>
      </CardContent>
    </Card>
  );
}