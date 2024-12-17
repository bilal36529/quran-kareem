import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This middleware function will handle security headers for all routes
export function middleware(request: NextRequest) {
  // Get the response
  const response = NextResponse.next();

  // Add security headers
  const headers = response.headers;
  
  headers.set('X-DNS-Prefetch-Control', 'on');
  headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  headers.set('X-Frame-Options', 'DENY');
  headers.set('X-Content-Type-Options', 'nosniff');
  headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  headers.set('X-XSS-Protection', '1; mode=block');
  headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');

  // Return the response with added headers
  return response;
}

// Configure which routes use the middleware
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - icons (PWA icons)
     */
    '/((?!_next/static|_next/image|favicon.ico|icons).*)',
  ],
};