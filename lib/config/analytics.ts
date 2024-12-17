export const ANALYTICS_CONFIG = {
  enabled: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === 'true',
  debug: process.env.NEXT_PUBLIC_ENABLE_DEBUG === 'true',
  gaId: process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_GA_ID : undefined,
  adsenseId: process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_ADSENSE_ID : undefined,
  development: process.env.NODE_ENV === 'development'
} as const;

// Analytics event types
export type AnalyticsEvent = {
  category: string;
  action: string;
  label?: string;
  value?: number;
};

// Analytics service interface
export interface AnalyticsService {
  initialize(): Promise<void>;
  trackEvent(event: AnalyticsEvent): void;
  trackPageView(path: string): void;
}