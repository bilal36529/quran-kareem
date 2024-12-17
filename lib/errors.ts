export class APIError extends Error {
  constructor(
    message: string,
    public status: number,
    public data?: any
  ) {
    super(message);
    this.name = 'APIError';
  }

  static notFound(message = 'Resource not found'): APIError {
    return new APIError(message, 404);
  }

  static networkError(message = 'Network error occurred'): APIError {
    return new APIError(message, 500);
  }

  static timeout(message = 'Request timed out'): APIError {
    return new APIError(message, 408);
  }

  static invalidResponse(message = 'Invalid response from server'): APIError {
    return new APIError(message, 500);
  }
}