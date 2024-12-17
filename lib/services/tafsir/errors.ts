export class TafsirError extends Error {
  constructor(
    message: string,
    public code: string,
    public statusCode?: number
  ) {
    super(message);
    this.name = 'TafsirError';
  }

  static notFound() {
    return new TafsirError(
      'Tafsir not found for the requested verse',
      'TAFSIR_NOT_FOUND',
      404
    );
  }

  static networkError() {
    return new TafsirError(
      'Failed to fetch tafsir due to network error',
      'NETWORK_ERROR',
      500
    );
  }

  static invalidResponse() {
    return new TafsirError(
      'Invalid response from tafsir service',
      'INVALID_RESPONSE',
      500
    );
  }
}