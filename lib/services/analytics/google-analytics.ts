'use client';

import { AnalyticsError } from './errors';

interface GAConfig {
  measurementId: string;
  anonymizeIp?: boolean;
  cookieFlags?: string;
}

class GoogleAnalyticsService {
  private static instance: GoogleAnalyticsService;
  private initialized: boolean = false;
  private config: GAConfig;

  private constructor() {
    this.config = {
      measurementId: 'G-M6M71CH0TE',
      anonymizeIp: true,
      cookieFlags: 'SameSite=Lax;Secure'
    };
  }

  public static getInstance(): GoogleAnalyticsService {
    if (!GoogleAnalyticsService.instance) {
      GoogleAnalyticsService.instance = new GoogleAnalyticsService();
    }
    return GoogleAnalyticsService.instance;
  }

  public initialize(): void {
    if (this.initialized || typeof window === 'undefined') {
      return;
    }

    try {
      window.dataLayer = window.dataLayer || [];
      window.gtag = function gtag() {
        window.dataLayer.push(arguments);
      };

      window.gtag('js', new Date());
      window.gtag('config', this.config.measurementId, {
        page_path: window.location.pathname,
        anonymize_ip: this.config.anonymizeIp,
        cookie_flags: this.config.cookieFlags
      });

      this.initialized = true;
    } catch (error) {
      throw new AnalyticsError('Failed to initialize Google Analytics', error);
    }
  }

  public trackPageView(path: string): void {
    if (!this.initialized) return;

    try {
      window.gtag('config', this.config.measurementId, {
        page_path: path
      });
    } catch (error) {
      console.error('Failed to track page view:', error);
    }
  }
}

export const googleAnalytics = GoogleAnalyticsService.getInstance();