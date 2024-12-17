'use client';

import { SearchFilters } from '@/lib/types';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';

interface SearchFiltersProps {
  filters: SearchFilters;
  onChange: (filters: SearchFilters) => void;
}

export default function SearchFiltersComponent({
  filters,
  onChange,
}: SearchFiltersProps) {
  return (
    <div className="flex flex-wrap gap-4">
      <div className="space-y-2">
        <Label>Revelation Type</Label>
        <Select
          value={filters.revelationType || "all"}
          onValueChange={(value) =>
            onChange({
              ...filters,
              revelationType: value === "all" ? undefined : value as "meccan" | "medinan",
            })
          }
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="All Types" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="meccan">Meccan</SelectItem>
            <SelectItem value="medinan">Medinan</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Sort By</Label>
        <Select
          value={filters.sortBy || "relevance"}
          onValueChange={(value) =>
            onChange({
              ...filters,
              sortBy: value as "relevance" | "verse_key",
            })
          }
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="relevance">Relevance</SelectItem>
            <SelectItem value="verse_key">Verse Order</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}