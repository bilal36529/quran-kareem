export interface WordFields {
  text_uthmani?: string;
  text_indopak?: string;
  transliteration?: {
    text: string;
  };
  translation?: {
    text: string;
  };
  root?: {
    text?: string;
    arabic?: string;
  } | string;
  grammar?: {
    type?: string;
    description?: string;
  };
}

export interface VerseResponse {
  verse_key: string;
  words: WordFields[];
}