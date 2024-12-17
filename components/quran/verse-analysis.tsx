'use client';

import { useState, useEffect, useCallback } from 'react';
import { VerseAnalysis } from '@/lib/types';
import { getVerseWordAnalysis } from '@/lib/services/word-analysis/api';
import { APIError } from '@/lib/services/api/errors';
import WordAnalysisComponent from './word-analysis';
import { Button } from '@/components/ui/button';
import { Book, Loader2, GraduationCap, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface VerseAnalysisProps {
  verseKey: string;
  onClose?: () => void;
}

export default function VerseAnalysisComponent({ verseKey, onClose }: VerseAnalysisProps) {
  const { toast } = useToast();
  const [analysis, setAnalysis] = useState<VerseAnalysis | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const MAX_RETRIES = 3;

  const loadAnalysis = useCallback(async (key: string) => {
    if (!verseKey) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const data = await getVerseWordAnalysis(key);
      setAnalysis(data);
      setRetryCount(0); // Reset retry count on success
    } catch (error) {
      let message = 'Failed to load word analysis';
      
      if (error instanceof APIError) {
        switch (error.code) {
          case 'NOT_FOUND':
            message = 'Word analysis not available for this verse';
            break;
          case 'TIMEOUT':
            message = 'Request timed out. Please try again.';
            break;
          case 'NETWORK_ERROR':
            message = 'Network error. Please check your connection.';
            break;
          default:
            message = error.message;
        }
      }
      
      setError(message);
      toast({
        title: 'Error',
        description: message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }, [toast, verseKey]);

  useEffect(() => {
    if (verseKey) {
      loadAnalysis(verseKey);
    }
  }, [verseKey, loadAnalysis]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" /> 
          <p className="text-sm text-muted-foreground">
            {retryCount > 0 
              ? `Retrying... (Attempt ${retryCount + 1}/${MAX_RETRIES})` 
              : 'Loading word analysis...'}
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <AlertCircle className="h-8 w-8 text-destructive mx-auto mb-4" />
        <p className="text-sm text-muted-foreground mb-4">{error}</p>
        {retryCount < MAX_RETRIES && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => {
              setRetryCount(prev => prev + 1);
              loadAnalysis(verseKey);
            }}
          >
            Try Again
          </Button>
        )}
      </div>
    );
  }

  return (
    <Card className="overflow-hidden bg-gradient-to-br from-background via-background/95 to-accent/10 
                     shadow-lg hover:shadow-xl transition-all duration-300 mt-4 touch-manipulation">
      <CardHeader className="bg-muted/50">
        <CardTitle className="text-lg flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Book className="h-5 w-5" />
            <span>Grammar Analysis</span>
          </div>
          <div className="flex items-center gap-2">
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            {onClose && (
              <Button variant="ghost" size="sm" onClick={onClose}>
                Close
              </Button>
            )}
          </div>
        </CardTitle>
        <CardDescription>
          Explore the meaning and grammar of each word
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6 relative">
        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm">
            <div className="text-center space-y-4">
              <GraduationCap className="h-8 w-8 mx-auto text-muted-foreground" />
              <p className="text-sm text-muted-foreground">{error}</p>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => {
                  setRetryCount(0);
                  loadAnalysis(verseKey);
                }}
              >
                Try Again
              </Button>
            </div>
          </div>
        )}
        <Tabs defaultValue="word-by-word" className="space-y-6">
          <TabsList className="w-full grid grid-cols-2 sticky top-0 bg-background/95 backdrop-blur-sm z-10 touch-manipulation">
            <TabsTrigger value="word-by-word" className="text-sm">Word by Word</TabsTrigger>
            <TabsTrigger value="grammar" className="text-sm">Grammar Details</TabsTrigger>
          </TabsList>
          
          <TabsContent value="word-by-word" className="space-y-4">
            <div className="flex flex-wrap justify-end gap-3 sm:gap-4 leading-loose text-right 
                          overflow-x-auto p-2 rounded-lg bg-accent/5">
              {analysis?.words.map((word, index) => (
                <WordAnalysisComponent 
                  key={index} 
                  word={word}
                  showGrammar={false}
                  className="text-lg sm:text-xl"
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="grammar" className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {analysis?.words.map((word, index) => (
                <Card key={index} className="overflow-hidden bg-accent/5 hover:bg-accent/10 transition-colors">
                  <CardContent className="p-3 sm:p-4 space-y-2 sm:space-y-3">
                    <div className="flex flex-col space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-xl sm:text-2xl font-amiri">{word.text}</span>
                        <span className="text-sm text-muted-foreground">
                          {word.transliteration}
                        </span>
                      </div>
                      <div className="space-y-2 pt-2 border-t">
                        <p className="text-sm leading-relaxed">{word.translation}</p>
                        {word.grammarInfo && (
                          <div className="text-sm text-muted-foreground">
                            <span className="font-medium">{word.grammarInfo.type}</span>
                            {word.grammarInfo.details && (
                              <span> - {word.grammarInfo.details}</span>
                            )}
                          </div>
                        )}
                        {word.rootWord && (
                          <div className="text-sm flex items-center gap-1">
                            <span className="text-muted-foreground">Root:</span>
                            <span className="font-amiri text-lg">{word.rootWord}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}