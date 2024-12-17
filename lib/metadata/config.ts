import { SITE_CONFIG } from '@/lib/constants';

export const META_CONFIG = {
  title: {
    template: `%s | ${SITE_CONFIG.name}`,
    default: SITE_CONFIG.name,
  },
  description: SITE_CONFIG.description,
  themeColor: {
    light: '#ffffff',
    dark: '#000000',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    minimumScale: 1,
    maximumScale: 5,
    userScalable: true,
    viewportFit: 'cover',
  },
  manifest: '/manifest.json',
  icons: {
    sizes: ['192x192', '512x512'],
    path: '/icons',
  },
} as const;