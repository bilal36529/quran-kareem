import { Metadata } from 'next';
import { SITE_CONFIG } from './constants';

interface GenerateMetaProps {
  title: string;
  description: string;
  path: string;
  type?: string;
  image?: string;
}

export function generateMeta({
  title,
  description,
  path,
  type = 'website',
  image = '/og-image.jpg'
}: GenerateMetaProps): Metadata {
  // Use string concatenation instead of URL constructor for base URL
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://qurankareem.app';
  const url = `${baseUrl}${path}`;

  return {
    title,
    description,
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_CONFIG.name,
      type,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
    other: {
      'apple-mobile-web-app-capable': 'yes',
      'apple-mobile-web-app-status-bar-style': 'default',
      'apple-mobile-web-app-title': SITE_CONFIG.name,
      'format-detection': 'telephone=no',
    },
  };
}

export const META = {
  title: 'Quran Kareem - Digital Quran Experience',
  description: 'Experience the Holy Quran with modern digital features - Read, Listen, Learn, and Reflect',
  themeColor: '#000000',
};