import { getChapters, getVerses } from '@/lib/api';
import { Skeleton } from '@/components/ui/skeleton';
import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import ChapterHeader from '@/components/quran/chapter-header';
import VerseList from '@/components/quran/verse-list';
import { Loader2 } from 'lucide-react';
import { generateQuranChapterSchema } from '@/lib/seo/schema';
import { generateMeta } from '@/lib/seo/meta';

interface PageProps {
  params: { chapterId: string };
}

export async function generateStaticParams() {
  return Array.from({ length: 114 }, (_, i) => ({
    chapterId: (i + 1).toString(),
  }));
}

function LoadingFallback() {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="text-center">
        <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
        <p className="text-sm text-muted-foreground">Loading chapter...</p>
      </div>
    </div>
  );
}

export async function generateMetadata({ params }: PageProps) {
  const chapterId = parseInt(params.chapterId);
  const chapters = await getChapters();
  const chapter = chapters.find(c => c.number === chapterId);

  if (!chapter) return {};

  return generateMeta({
    title: `${chapter.englishName} (${chapter.name}) - Quran Kareem`,
    description: `Read, listen and study ${chapter.englishName} (${chapter.name}) with translation and audio recitation.`,
    path: `/quran/${chapterId}`,
    type: 'article',
  });
}

export default async function ChapterPage({ params }: PageProps) {
  const chapterId = parseInt(params.chapterId);
  
  // Validate chapter ID
  if (isNaN(chapterId) || chapterId < 1 || chapterId > 114) {
    notFound();
  }

  try {
    // Get all chapters and find the requested one
    const chapters = await getChapters();
    const chapter = chapters.find(c => c.number === chapterId);
    
    // Get verses for the chapter
    const verses = await getVerses(chapterId);

    // Validate data
    if (!chapter || !verses || verses.length === 0) {
      notFound();
    }

    // Generate schema for SEO
    const schema = generateQuranChapterSchema({
      number: chapter.number,
      name: chapter.name,
      englishName: chapter.englishName,
      versesCount: chapter.numberOfAyahs,
    });

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
        <div className="container mx-auto px-4 py-8 space-y-8">
          <Suspense fallback={<LoadingFallback />}>
            <ChapterHeader chapter={chapter} />
          </Suspense>

          <Suspense fallback={<LoadingFallback />}>
            <VerseList verses={verses} chapterNumber={chapterId} />
          </Suspense>
        </div>
      </>
    );
  } catch (error) {
    console.error('Error loading chapter:', error);
    notFound();
  }
}