'use client';

/**
 * Security utility functions for client-side use
 */

export function addSecurityHeaders() {
  if (typeof window === 'undefined') return;

  // Add meta tags for security headers
  const metaTags = [
    { name: 'referrer', content: 'origin-when-cross-origin' },
    { 'http-equiv': 'X-Content-Type-Options', content: 'nosniff' },
    { 'http-equiv': 'X-Frame-Options', content: 'DENY' },
    { 'http-equiv': 'Content-Security-Policy', content: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://pagead2.googlesyndication.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: https: blob:; media-src 'self' https://everyayah.com data: blob:; connect-src 'self' https://api.qurancdn.com https://everyayah.com https://api.aladhan.com; font-src 'self' data: https://fonts.gstatic.com; frame-ancestors 'none'; worker-src 'self' blob:; manifest-src 'self'; upgrade-insecure-requests;" }
  ];

  metaTags.forEach(({ name, content, 'http-equiv': httpEquiv }) => {
    const meta = document.createElement('meta');
    if (name) meta.name = name;
    if (httpEquiv) meta.httpEquiv = httpEquiv;
    meta.content = content;
    document.head.appendChild(meta);
  });
}

export function checkFrameEmbedding() {
  if (typeof window === 'undefined') return;
  
  if (window.self !== window.top) {
    console.warn('This application should not be embedded in an iframe');
    return false;
  }
  return true;
}

export function validateOrigin(origin: string) {
  const allowedOrigins = [
    'https://qurankareem.app',
    'http://localhost:3000'
  ];
  return allowedOrigins.includes(origin);
}