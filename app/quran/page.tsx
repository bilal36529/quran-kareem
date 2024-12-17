import { Suspense } from 'react';
import { getChapters } from '@/lib/api';
import { Skeleton } from '@/components/ui/skeleton';
import QuranInterface from '@/components/quran/quran-interface';
import { generateBreadcrumbSchema } from '@/lib/seo/schema';

export const dynamic = 'error';

// Server component to fetch initial data
async function getInitialData() {
  const chapters = await getChapters();
  return { chapters };
}

export default async function QuranPage() {
  const { chapters } = await getInitialData();
  // Generate breadcrumb schema
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Browse Quran', url: '/quran' }
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Suspense fallback={<Skeleton className="h-[600px]" />}>
        <QuranInterface initialChapters={chapters} />
      </Suspense>
    </>
  );
}