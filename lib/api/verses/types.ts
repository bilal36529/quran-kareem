export interface VersesRequestParams {
  page?: number;
  perPage?: number;
  fields?: string[];
  translations?: number[];
  reciter?: string;
}

export interface VersePagination {
  currentPage: number;
  totalPages: number;
  totalRecords: number;
  perPage: number;
}

export interface VersesResponse {
  verses: {
    id: number;
    verse_key: string;
    text_uthmani: string;
    translations?: Array<{
      text: string;
      language_name: string;
    }>;
    verse_number: number;
    juz_number?: number;
  }[];
  pagination: VersePagination;
}