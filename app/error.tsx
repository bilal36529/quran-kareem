'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    console.error('Application error:', error);
    setErrorMessage(error.message || 'An unexpected error occurred');
  }, [error]);

  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center text-center p-4">
      <AlertCircle className="h-10 w-10 text-destructive mb-4" />
      <h2 className="text-2xl font-semibold mb-2">Something went wrong!</h2>
      <p className="text-muted-foreground mb-4 max-w-md">
        {errorMessage}
      </p>
      <div className="flex gap-4">
        <Button onClick={() => window.location.reload()}>
          Refresh Page
        </Button>
        <Button variant="outline" onClick={() => reset()}>
          Try Again
        </Button>
      </div>
    </div>
  );
}