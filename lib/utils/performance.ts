// Performance optimization utilities
export const preloadResources = () => {
  if (typeof window === 'undefined') return;

  // Clean up existing preload links to avoid duplicates
  document.querySelectorAll('link[rel="preload"]').forEach(el => el.remove());

  // Only preload resources that will be used immediately
  const criticalResources = [
    {
      url: '/icons/icon-192x192.png',
      as: 'image',
      type: 'image/png',
      importance: 'high',
      crossorigin: 'anonymous'
    },
    {
      url: '/screenshots/home-light.png',
      as: 'image',
      type: 'image/png',
      importance: 'low',
      crossorigin: 'anonymous'
    },
    {
      url: '/screenshots/home-dark.png',
      as: 'image', 
      type: 'image/png',
      importance: 'low',
      crossorigin: 'anonymous'
    },
    {
      url: '/manifest.json',
      as: 'fetch',
      type: 'application/json',
      importance: 'high',
      crossorigin: 'anonymous'
    }
  ];

  // Add new preload links
  criticalResources.forEach(resource => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = resource.url;
    link.as = resource.as;
    if (resource.type) {
      link.type = resource.type;
    }
    link.setAttribute('importance', resource.importance);
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
  });

  // Prefetch non-critical resources
  const prefetchResources = [
    '/icons/icon-512x512.png',
    '/icons/browse-96x96.png',
    '/icons/search-96x96.png'
  ];

  prefetchResources.forEach(url => {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = url;
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
  });
};