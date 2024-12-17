import { SITE_CONFIG } from '@/lib/constants';

class AdSenseService {
  private static instance: AdSenseService;
  private initialized = false;
  private initializationPromise: Promise<void> | null = null;
  private readonly clientId = SITE_CONFIG.adsense.clientId;

  private constructor() {}

  public static getInstance(): AdSenseService {
    if (!AdSenseService.instance) {
      AdSenseService.instance = new AdSenseService();
    }
    return AdSenseService.instance;
  }

  public async initialize(): Promise<void> {
    if (process.env.NODE_ENV !== 'production') {
      console.log('AdSense disabled in development');
      return;
    }
    if (!SITE_CONFIG.adsense.enabled || !SITE_CONFIG.adsense.clientId) {
      console.warn('AdSense ID not configured');
      return;
    }
    // Return existing initialization promise if it exists
    if (this.initializationPromise) {
      return this.initializationPromise;
    }

    // Don't initialize if already initialized or not in browser
    if (this.initialized || typeof window === 'undefined') {
      return Promise.resolve();
    }

    this.initializationPromise = new Promise((resolve, reject) => {
      try {
        // Initialize adsbygoogle only once
        if (!window.adsbygoogle) {
          window.adsbygoogle = [];
        }

        // Only push config once
        if (!window.adsbygoogle.loaded) {
          window.adsbygoogle.push({
            google_ad_client: this.clientId,
            enable_page_level_ads: true,
            overlays: false // Disable overlay ads
          });
          window.adsbygoogle.loaded = true;
        }

        this.initialized = true;
        resolve();
      } catch (error) {
        reject(new Error('Failed to initialize AdSense'));
      }
    });

    return this.initializationPromise;
  }

  public isInitialized(): boolean {
    return this.initialized;
  }
}

export const adSenseService = AdSenseService.getInstance();