export class AnalyticsError extends Error {
  constructor(message: string, public originalError?: unknown) {
    super(message);
    this.name = 'AnalyticsError';
  }
}