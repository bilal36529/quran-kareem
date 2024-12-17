export interface VerseResponse {
  verse: {
    text_uthmani: string;
    translations: Array<{
      text: string;
    }>;
  };
}

export interface TafsirResponse {
  tafsir: {
    text: string;
    verse_key: string;
    resource_id: number;
    language_name: string;
  };
}