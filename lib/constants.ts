export const SITE_CONFIG = {
  name: 'Quran Kareem',
  description: 'Experience the Divine Words through modern technology',
  url: process.env.NEXT_PUBLIC_BASE_URL!,
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
  analytics: {
    enabled: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === 'true',
    gaId: process.env.NEXT_PUBLIC_GA_ID
  },
  adsense: {
    enabled: process.env.NEXT_PUBLIC_ENABLE_ADSENSE === 'true',
    clientId: process.env.NEXT_PUBLIC_ADSENSE_ID
  }
};

export const NAVIGATION = {
  main: [
    { name: 'Browse', href: '/quran' },
    { name: 'Search', href: '/search' },
    { name: 'Settings', href: '/settings' },
  ],
  resources: [
    { name: 'About', href: '/about' },
    { name: 'Privacy', href: '/privacy' },
    { name: 'Terms', href: '/terms' },
  ],
  social: [
    { name: 'GitHub', href: 'https://github.com', icon: 'Github' },
    { name: 'Twitter', href: 'https://twitter.com', icon: 'Twitter' },
  ],
};

export const META = {
  title: 'MyQuran - Digital Quran Experience',
  description: 'Experience the Holy Quran with modern digital features - Read, Listen, Learn, and Reflect',
  themeColor: '#000000',
};