import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center text-center px-4">
      <AlertCircle className="h-10 w-10 text-muted-foreground mb-4" />
      <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
      <p className="text-muted-foreground mb-4">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link href="/" passHref>
        <Button>Return Home</Button>
      </Link>
    </div>
  );
}