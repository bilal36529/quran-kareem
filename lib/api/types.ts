export interface APIResponse<T> {
  data: T;
  error?: string;
  status: number;
}

export interface PaginationParams {
  page?: number;
  perPage?: number;
}

export interface APIConfig {
  baseUrl: string;
  timeout: number;
  retryAttempts: number;
  retryDelay: number;
  cacheTime: number;
}

export interface APIError {
  message: string;
  code: string;
  status?: number;
}