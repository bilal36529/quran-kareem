'use client';

import { useState, useCallback } from 'react';
import { SearchFilters } from '@/lib/types';
import SearchBar from './search-bar';
import SearchFiltersComponent from './search-filters';
import AdvancedFilters from './advanced-filters';
import SearchResults from './search-results';
import SearchError from './search-error';
import { searchQuran } from '@/lib/search-service';
import { useToast } from '@/hooks/use-toast';
import { Card } from '@/components/ui/card';
import { motion, AnimatePresence } from 'framer-motion';

export default function SearchInterface() {
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState<SearchFilters>({});
  const [results, setResults] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const { toast } = useToast();

  const handleSearch = useCallback(async (searchQuery: string, page: number = 1) => {
    if (!searchQuery.trim()) {
      toast({
        title: 'Search query required',
        description: 'Please enter a search term',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    setError(null);
    setCurrentPage(page);

    try {
      const searchResults = await searchQuran(searchQuery, filters, page);
      setResults(searchResults);
      
      if (searchResults.totalResults === 0) {
        toast({
          title: 'No results found',
          description: 'Try adjusting your search terms or filters',
        });
      }
    } catch (error) {
      setError('Failed to perform search. Please try again.');
      toast({
        title: 'Search failed',
        description: 'An error occurred while searching. Please try again.',
        variant: 'destructive',
      });
      setResults(null);
    } finally {
      setIsLoading(false);
    }
  }, [filters, toast]);

  const handleFilterChange = useCallback((newFilters: SearchFilters) => {
    setFilters(newFilters);
    if (query.trim()) {
      handleSearch(query, 1);
    }
  }, [query, handleSearch]);

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="p-6">
          <div className="space-y-6">
            <SearchBar
              query={query}
              setQuery={setQuery}
              onSearch={(q) => handleSearch(q)}
              isLoading={isLoading}
            />

            <div className="space-y-4">
              <SearchFiltersComponent
                filters={filters}
                onChange={handleFilterChange}
              />
              
              <AdvancedFilters
                filters={filters}
                onChange={handleFilterChange}
              />
            </div>
          </div>
        </Card>
      </motion.div>

      <AnimatePresence mode="wait">
        {error && (
          <motion.div
            key="error"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <SearchError
              message={error}
              onRetry={() => handleSearch(query, currentPage)}
            />
          </motion.div>
        )}

        {results && !error && (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <SearchResults
              results={results}
              currentPage={currentPage}
              onPageChange={(page) => handleSearch(query, page)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}