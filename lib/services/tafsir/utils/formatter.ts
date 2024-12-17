import { TafsirContent } from '../types';
import { TAFSIR_EDITIONS } from '../config';

interface FormatTafsirInput {
  text: string;
  verseText: string;
  verseTranslation: string;
  tafsirId: number;
  verse: {
    chapter: number;
    number: number;
    key: string;
  };
}

export function formatTafsirContent(input: FormatTafsirInput): TafsirContent {
  const edition = TAFSIR_EDITIONS.find(e => e.id === input.tafsirId);
  
  if (!edition) {
    throw new Error(`Unknown tafsir edition: ${input.tafsirId}`);
  }

  const isArabic = edition.language === 'ar';
  const cleanText = input.text
    .replace(/<\/?(?!p|br|div|span)[^>]*>/g, '') // Allow only basic HTML tags
    .trim();

  return {
    text: `
      <div class="prose dark:prose-invert max-w-none space-y-6">
        <div class="p-4 rounded-lg bg-muted/50">
          <div dir="rtl" class="text-xl font-amiri mb-2 leading-loose">
            ${input.verseText}
          </div>
          <div class="text-sm text-muted-foreground">
            ${input.verseTranslation}
          </div>
        </div>

        <div class="flex items-center gap-2 text-sm text-muted-foreground">
          <span>Source:</span>
          <span class="font-medium">${edition.name}</span>
          <span>by</span>
          <span class="font-medium">${edition.author}</span>
        </div>

        <div 
          dir="${edition.direction}" 
          class="${isArabic ? 'font-amiri text-xl leading-loose' : 'leading-relaxed'}"
        >
          ${cleanText}
        </div>
      </div>
    `,
    edition,
    verse: input.verse
  };
}