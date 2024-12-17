export class APIError extends Error {
  constructor(
    message: string,
    public code: string,
    public status?: number,
    public originalError?: unknown
  ) {
    super(message);
    this.name = 'APIError';
  }

  static notFound(message = 'Resource not found') {
    return new APIError(message, 'NOT_FOUND', 404);
  }

  static timeout(message = 'Request timed out') {
    return new APIError(message, 'TIMEOUT', 408);
  }

  static networkError(message = 'Network error occurred') {
    return new APIError(message, 'NETWORK_ERROR', 500);
  }
}