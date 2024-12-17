import { Metadata } from 'next';

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
  const url = `https://qurankareem.app${path}`;

  return {
    title,
    description,
    metadataBase: new URL('https://qurankareem.app'),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: 'Quran Kareem',
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
      'apple-mobile-web-app-title': 'Quran Kareem',
      'format-detection': 'telephone=no',
    },
  };
}