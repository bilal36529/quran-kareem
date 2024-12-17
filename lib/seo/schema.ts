export function generateMobileAppSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'MobileApplication',
    'name': 'Quran Kareem',
    'applicationCategory': 'ReligiousApp',
    'operatingSystem': 'Any',
    'offers': {
      '@type': 'Offer',
      'price': '0',
      'priceCurrency': 'USD'
    },
    'description': 'A modern digital platform for exploring and studying the Holy Quran',
  };
}

export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': items.map((item, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'name': item.name,
      'item': `https://qurankareem.app${item.url}`
    }))
  };
}

export function generateQuranChapterSchema(chapter: {
  number: number;
  name: string;
  englishName: string;
  versesCount: number;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Chapter',
    'name': chapter.englishName,
    'alternativeHeadline': chapter.name,
    'position': chapter.number,
    'numberOfPages': chapter.versesCount,
    'isPartOf': {
      '@type': 'Book',
      'name': 'The Holy Quran',
      'author': {
        '@type': 'Organization',
        'name': 'Quran Kareem'
      }
    }
  };
}