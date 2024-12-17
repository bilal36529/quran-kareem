import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import SearchInterface from '@/components/search/search-interface';

export const dynamic = 'error';

export default function SearchPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Search Quran</h1>
      <Suspense fallback={<Skeleton className="h-[600px]" />}>
        <SearchInterface />
      </Suspense>
    </div>
  );
}