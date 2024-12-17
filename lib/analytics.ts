'use client';

type EventType = 'page_view' | 'search' | 'audio_play' | 'bookmark' | 'error';

interface AnalyticsEvent {
  type: EventType;
  data?: Record<string, any>;
  timestamp?: number;
}

class Analytics {
  private static instance: Analytics;
  private queue: AnalyticsEvent[] = [];
  private isProcessing = false;

  private constructor() {
    if (typeof window !== 'undefined') {
      window.addEventListener('beforeunload', () => this.flush());
    }
  }

  public static getInstance(): Analytics {
    if (!Analytics.instance) {
      Analytics.instance = new Analytics();
    }
    return Analytics.instance;
  }

  public track(type: EventType, data?: Record<string, any>) {
    this.queue.push({
      type,
      data,
      timestamp: Date.now()
    });

    if (!this.isProcessing) {
      this.processQueue();
    }
  }

  private async processQueue() {
    if (this.queue.length === 0 || this.isProcessing) return;

    this.isProcessing = true;

    try {
      const events = this.queue.splice(0, 10);
      await fetch('/api/analytics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(events),
      });
    } catch (error) {
      console.error('Analytics error:', error);
    } finally {
      this.isProcessing = false;
      if (this.queue.length > 0) {
        setTimeout(() => this.processQueue(), 1000);
      }
    }
  }

  private async flush() {
    if (this.queue.length > 0) {
      await this.processQueue();
    }
  }
}

export const analytics = Analytics.getInstance();