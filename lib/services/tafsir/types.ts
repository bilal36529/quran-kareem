export interface TafsirEdition {
  id: string;
  name: string;
  author: string;
  language: string;
  direction: 'ltr' | 'rtl';
}

export interface TafsirContent {
  text: string;
  edition: TafsirEdition;
  verse: {
    number: number;
    chapter: number;
  };
}

export interface TafsirResponse {
  code: number;
  status: string;
  data: {
    text: string;
    edition: {
      identifier: string;
      language: string;
      name: string;
      englishName: string;
      direction: string;
    };
    sura: number;
    aya: number;
  };
}

export interface TafsirError {
  code: string;
  message: string;
  status?: number;
}