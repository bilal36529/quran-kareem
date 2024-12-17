'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface QuranSearchProps {
  className?: string;
}

export default function QuranSearch({ className }: QuranSearchProps) {
  const [query, setQuery] = useState('');

  return (
    <div className={`relative ${className}`}>
      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder="Search chapters..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="pl-9"
      />
    </div>
  );
}