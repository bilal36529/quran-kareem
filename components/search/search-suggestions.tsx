'use client';

import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SearchSuggestionsProps {
  suggestions: string[];
  onSelect: (suggestion: string) => void;
  highlightedText: string;
}

export default function SearchSuggestions({ 
  suggestions, 
  onSelect,
  highlightedText 
}: SearchSuggestionsProps) {
  if (suggestions.length === 0) return null;

  const highlightMatch = (text: string) => {
    if (!highlightedText) return text;
    
    const parts = text.split(new RegExp(`(${highlightedText})`, 'gi'));
    return parts.map((part, i) => 
      part.toLowerCase() === highlightedText.toLowerCase() ? 
        <span key={i} className="font-medium text-primary">{part}</span> : 
        part
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="absolute z-50 w-full mt-1 bg-background/95 backdrop-blur-sm border rounded-lg shadow-lg overflow-hidden"
    >
      <div className="p-2 border-b">
        <span className="text-sm font-medium text-muted-foreground">Suggestions</span>
      </div>
      <AnimatePresence>
        <ul className="max-h-[300px] overflow-y-auto py-1">
          {suggestions.map((suggestion, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ delay: index * 0.05 }}
            >
              <Button
                variant="ghost"
                className="w-full text-left px-4 py-2 flex items-center gap-3 hover:bg-accent group"
                onClick={() => onSelect(suggestion)}
              >
                <Search className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                <span className="truncate text-base">{highlightMatch(suggestion)}</span>
              </Button>
            </motion.li>
          ))}
        </ul>
      </AnimatePresence>
    </motion.div>
  );
}