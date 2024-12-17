import { Metadata, Viewport } from 'next';
import { SITE_CONFIG } from '@/lib/constants';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' }
  ]
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://qurankareem.app'),
  title: {
    template: `%s | ${SITE_CONFIG.name}`,
    default: SITE_CONFIG.name,
  },
  description: SITE_CONFIG.description,
  applicationName: SITE_CONFIG.name,
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/icons/icon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icons/icon-512x512.png', sizes: '512x512', type: 'image/png' }
    ],
    apple: [
      { url: '/icons/icon-192x192.png', sizes: '192x192', type: 'image/png' }
    ],
    shortcut: ['/icons/icon-192x192.png']
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: SITE_CONFIG.name
  },
  formatDetection: {
    telephone: false
  },
  openGraph: {
    type: 'website',
    siteName: SITE_CONFIG.name,
    title: SITE_CONFIG.name,
    description: SITE_CONFIG.description
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_CONFIG.name,
    description: SITE_CONFIG.description
  },
  other: {
    'mobile-web-app-capable': 'yes'
  }
};