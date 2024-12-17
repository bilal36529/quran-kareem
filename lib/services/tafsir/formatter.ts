import { TafsirContent, TafsirResponse } from './types';
import { TAFSIR_EDITIONS } from './config';

export function formatTafsirContent(data: TafsirResponse['data']): TafsirContent {
  const edition = TAFSIR_EDITIONS.find(e => e.id === data.edition.identifier) || {
    id: data.edition.identifier,
    name: data.edition.englishName,
    author: data.edition.name,
    language: data.edition.language,
    direction: data.edition.direction as 'ltr' | 'rtl'
  };

  const isArabic = edition.language === 'ar';
  
  return {
    text: `
      <div class="prose dark:prose-invert max-w-none">
        <div class="mb-4 pb-4 border-b">
          <div class="text-sm text-muted-foreground">
            Source: ${edition.name} by ${edition.author}
          </div>
        </div>
        <div 
          dir="${edition.direction}" 
          class="${isArabic ? 'font-amiri text-xl leading-loose' : 'leading-relaxed'}"
        >
          ${data.text}
        </div>
      </div>
    `,
    edition,
    verse: {
      number: data.aya,
      chapter: data.sura
    }
  };
}