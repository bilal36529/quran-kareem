export interface TafsirContent {
  text: string;
  edition: {
    id: number;
    name: string;
    author: string;
    language: string;
    direction: 'ltr' | 'rtl';
  };
  verse: {
    key: string;
    text: string;
    translation: string;
  };
}

export interface TafsirEdition {
  id: number;
  name: string;
  author: string;
  language: string;
  direction: 'ltr' | 'rtl';
}