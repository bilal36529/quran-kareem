'use client';

import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SearchErrorProps {
  message: string;
  onRetry?: () => void;
}

export default function SearchError({ message, onRetry }: SearchErrorProps) {
  return (
    <div className="flex flex-col items-center justify-center py-8 text-center">
      <AlertCircle className="h-8 w-8 text-destructive mb-4" />
      <h3 className="text-lg font-semibold mb-2">Search Error</h3>
      <p className="text-muted-foreground mb-4">{message}</p>
      {onRetry && (
        <Button onClick={onRetry} variant="outline">
          Try Again
        </Button>
      )}
    </div>
  );
}