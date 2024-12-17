/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  distDir: '.next',
  poweredByHeader: false,
  trailingSlash: true,
  images: {
    unoptimized: true,
    domains: ['api.qurancdn.com', 'everyayah.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.qurancdn.com',
      },
      {
        protocol: 'https',
        hostname: 'everyayah.com',
      }
    ]
  },
  experimental: {
    optimizeCss: true,
    skipMiddlewareUrlNormalize: true,
    skipTrailingSlashRedirect: true,
    turbotrace: {
      contextDirectory: __dirname
    },
    staticWorkerRequestDeduping: true,
    isrMemoryCacheSize: 0
  },
  onDemandEntries: {
    maxInactiveAge: 60 * 60 * 1000,
    pagesBufferLength: 5
  },
  staticPageGenerationTimeout: 120,
  swcMinify: true,
  env: {
    NEXT_PUBLIC_GA_ID: process.env.NEXT_PUBLIC_GA_ID,
    NEXT_PUBLIC_ADSENSE_ID: process.env.NEXT_PUBLIC_ADSENSE_ID
  }
};

module.exports = nextConfig;