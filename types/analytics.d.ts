declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
    adsbygoogle: Array<any> & {
      loaded?: boolean;
      push: (...args: any[]) => void;
    };
  }
}

export {};
