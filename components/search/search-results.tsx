'use client';

import { SearchResult } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, BookOpen, Search } from 'lucide-react';
import { motion } from 'framer-motion';

interface SearchResultsProps {
  results: SearchResult;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export default function SearchResults({
  results,
  currentPage,
  onPageChange,
}: SearchResultsProps) {
  if (results.totalResults === 0) {
    return (
      <div className="text-center py-12">
        <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold mb-2">No results found</h3>
        <p className="text-sm text-muted-foreground max-w-md mx-auto">
          Try searching for different terms or check your spelling. You can search using:
          <ul className="mt-2 space-y-1">
            <li>• Surah names (e.g., &quot;Al-Fatiha&quot;, &quot;البقرة&quot;)</li>
            <li>• English translations</li>
            <li>• Arabic text</li>
          </ul>
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Found {results.totalResults.toLocaleString()} results
        </p>
        <p className="text-sm text-muted-foreground">
          Page {currentPage} of {results.totalPages}
        </p>
      </div>

      <div className="space-y-4">
        {results.results.map((result, index) => (
          <motion.div
            key={`${result.verseKey}-${index}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Link href={`/quran/${result.chapter}${result.isChapter ? '' : `#verse-${result.verse}`}`}>
              <Card className="p-4 hover:bg-accent transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">
                      {result.isChapter ? `Chapter ${result.chapter}` : result.verseKey}
                    </span>
                  </div>
                </div>
                <div
                  dir="rtl"
                  className="text-xl font-amiri mb-2 leading-loose"
                  dangerouslySetInnerHTML={{ __html: result.highlightedText }}
                />
                <div
                  className="text-muted-foreground"
                  dangerouslySetInnerHTML={{ __html: result.highlightedTranslation }}
                />
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>

      {results.totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          <Button
            variant="outline"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>
          <div className="flex items-center gap-2">
            {Array.from({ length: Math.min(5, results.totalPages) }, (_, i) => {
              const pageNum = i + 1;
              return (
                <Button
                  key={pageNum}
                  variant={currentPage === pageNum ? "default" : "outline"}
                  onClick={() => onPageChange(pageNum)}
                  className="w-10"
                >
                  {pageNum}
                </Button>
              );
            })}
          </div>
          <Button
            variant="outline"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === results.totalPages}
          >
            Next
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      )}
    </div>
  );
}