// AdSense analytics and monitoring
export function initAdSense() {
  if (typeof window === 'undefined') return;

  // Monitor ad blockers
  window.addEventListener('load', () => {
    setTimeout(() => {
      const adBlockEnabled = !document.querySelector('ins.adsbygoogle');
      if (adBlockEnabled) {
        console.log('AdBlock is enabled');
      }
    }, 2000);
  });

  // Monitor ad performance
  window.addEventListener('message', (event) => {
    if (event.data.type === 'adsbygoogle-status') {
      console.log('AdSense status:', event.data);
    }
  });
}

// Track ad impressions and clicks
export function trackAdEvent(type: 'impression' | 'click', adUnit: string) {
  try {
    fetch('/api/analytics/ads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type, adUnit, timestamp: Date.now() })
    });
  } catch (error) {
    console.error('Failed to track ad event:', error);
  }
}