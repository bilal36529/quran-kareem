'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Loader2, AlertCircle, RefreshCcw, Languages } from 'lucide-react';
import { getTafsir } from '@/lib/services/tafsir';
import { TAFSIR_EDITIONS } from '@/lib/services/tafsir/config';
import { TafsirError } from '@/lib/services/tafsir/errors';
import { useToast } from '@/hooks/use-toast';

interface VerseTafsirProps {
  verseKey: string;
  onClose: () => void;
}

export default function VerseTafsir({ verseKey, onClose }: VerseTafsirProps) {
  const [selectedEdition, setSelectedEdition] = useState(TAFSIR_EDITIONS[0].id);
  const [tafsirText, setTafsirText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchTafsir = React.useCallback(async () => {
    if (!verseKey || !selectedEdition) return;

    setLoading(true);
    setError(null);

    try {
      const [chapter, verse] = verseKey.split(':').map(Number);
      const tafsir = await getTafsir(chapter, verse, selectedEdition);
      setTafsirText(tafsir.text);
    } catch (error) {
      let errorMessage = 'Failed to load tafsir. Please try another verse or edition.';
      
      if (error instanceof TafsirError) {
        switch (error.code) {
          case 'TAFSIR_NOT_FOUND':
            errorMessage = 'Tafsir not available for this verse. Please try another edition.';
            break;
          case 'NETWORK_ERROR':
            errorMessage = 'Network error. Please check your connection and try again.';
            break;
          case 'TIMEOUT':
            errorMessage = 'Request timed out. Please try again.';
            break;
        }
      }
      
      setError(errorMessage);
      toast({
        title: 'Error loading tafsir',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }, [verseKey, selectedEdition, toast]);

  useEffect(() => {
    fetchTafsir();
  }, [fetchTafsir]);

  return (
    <Card className="mt-4">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Languages className="h-5 w-5 text-primary" />
            Tafsir
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>Close</Button>
        </div>
        <div className="mt-2">
          <Select
            value={selectedEdition.toString()}
            onValueChange={(value) => setSelectedEdition(parseInt(value))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Tafsir" />
            </SelectTrigger>
            <SelectContent>
              {TAFSIR_EDITIONS.map((edition) => (
                <SelectItem key={edition.id} value={edition.id.toString()}>
                  {edition.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] rounded-md border p-4">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <AlertCircle className="h-8 w-8 text-destructive mx-auto mb-4" />
              <p className="text-sm text-muted-foreground mb-4">{error}</p>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={fetchTafsir}
                className="gap-2"
              >
                <RefreshCcw className="h-4 w-4" />
                Retry
              </Button>
            </div>
          ) : (
            <div 
              className="prose dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: tafsirText }}
            />
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}