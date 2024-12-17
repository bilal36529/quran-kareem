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
import { Switch } from '@/components/ui/switch';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card } from '@/components/ui/card';
import { SlidersHorizontal } from 'lucide-react';

const TRANSLATIONS = [
  { id: '131', name: 'Sahih International' },
  { id: '20', name: 'Muhsin Khan' },
  { id: '85', name: 'Pickthall' },
];

interface AdvancedFiltersProps {
  filters: SearchFilters;
  onChange: (filters: SearchFilters) => void;
}

export default function AdvancedFilters({ filters, onChange }: AdvancedFiltersProps) {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="advanced-filters" className="border-none">
        <AccordionTrigger className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <SlidersHorizontal className="h-4 w-4" />
          Advanced Filters
        </AccordionTrigger>
        <AccordionContent>
          <Card className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
              <div className="space-y-3">
                <Label className="text-sm font-medium">Translation</Label>
                <Select
                  value={filters.language || "131"}
                  onValueChange={(value) =>
                    onChange({ ...filters, language: value })
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select translation" />
                  </SelectTrigger>
                  <SelectContent>
                    {TRANSLATIONS.map((trans) => (
                      <SelectItem key={trans.id} value={trans.id}>
                        {trans.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label className="text-sm font-medium">Search Mode</Label>
                <Select
                  value={filters.searchMode || "exact"}
                  onValueChange={(value) =>
                    onChange({ ...filters, searchMode: value as "exact" | "root" | "word" })
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Search mode" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="exact">Exact Match</SelectItem>
                    <SelectItem value="root">Root Word</SelectItem>
                    <SelectItem value="word">Word Match</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                <Label className="text-sm font-medium">Additional Options</Label>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="include-context" className="text-sm">
                      Include Context
                    </Label>
                    <Switch
                      id="include-context"
                      checked={filters.includeContext || false}
                      onCheckedChange={(checked) =>
                        onChange({ ...filters, includeContext: checked })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="include-tafsir" className="text-sm">
                      Include Tafsir
                    </Label>
                    <Switch
                      id="include-tafsir"
                      checked={filters.includeTafsir || false}
                      onCheckedChange={(checked) =>
                        onChange({ ...filters, includeTafsir: checked })
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}