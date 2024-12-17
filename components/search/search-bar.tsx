'use client';

import { useState, useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, X } from 'lucide-react';
import SearchSuggestions from './search-suggestions';
import VoiceSearch from './voice-search';
import { getSearchSuggestions } from '@/lib/search-service';

interface SearchBarProps {
  query: string;
  setQuery: (query: string) => void;
  onSearch: (query: string) => void;
  isLoading: boolean;
}

export default function SearchBar({
  query,
  setQuery,
  onSearch,
  isLoading
}: SearchBarProps) {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Handle clicks outside of search component
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (query.trim()) {
      const results = getSearchSuggestions(query);
      setSuggestions(results);
    } else {
      setSuggestions([]);
    }
  }, [query]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setShowSuggestions(true);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    onSearch(suggestion);
    setShowSuggestions(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch(query);
      setShowSuggestions(false);
    }
  };

  return (
    <div className="relative" ref={searchRef}>
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search in Arabic or English..."
            value={query}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={() => setShowSuggestions(true)}
            className="pl-9"
          />
          {query && (
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-2 top-2"
              onClick={() => {
                setQuery('');
                setSuggestions([]);
                setShowSuggestions(false);
              }}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
        <VoiceSearch onResult={(transcript) => {
          setQuery(transcript);
          onSearch(transcript);
        }} />
        <Button onClick={() => {
          onSearch(query);
          setShowSuggestions(false);
        }} disabled={isLoading}>
          {isLoading ? 'Searching...' : 'Search'}
        </Button>
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <SearchSuggestions
          suggestions={suggestions}
          onSelect={handleSuggestionClick}
          highlightedText={query}
        />
      )}
    </div>
  );
}