const MAX_REQUESTS = 60; // 60 requests per minute
const WINDOW_SIZE = 60 * 1000; // 1 minute window

const rateLimit = new Map<string, { count: number; timestamp: number }>();

function cleanupRateLimit() {
  const now = Date.now();
  for (const [ip, data] of rateLimit.entries()) {
    if (now - data.timestamp > WINDOW_SIZE) {
      rateLimit.delete(ip);
    }
  }
}

function checkRateLimit(ip: string): boolean {
  cleanupRateLimit();
  const now = Date.now();
  const data = rateLimit.get(ip);

  if (!data) {
    rateLimit.set(ip, { count: 1, timestamp: now });
    return true;
  }

  if (now - data.timestamp > WINDOW_SIZE) {
    rateLimit.set(ip, { count: 1, timestamp: now });
    return true;
  }

  if (data.count >= MAX_REQUESTS) {
    return false;
  }

  data.count++;
  return true;
}

export async function withApiMiddleware(handler: Function) {
  return async (req: Request) => {
    try {
      // Rate limiting
      const ip = req.headers.get('x-forwarded-for') || 'anonymous';
      if (!checkRateLimit(ip)) {
        return new Response('Too many requests', { 
          status: 429,
          headers: {
            'Content-Type': 'application/json',
            'Retry-After': '60'
          }
        });
      }

      // Execute handler
      const response = await handler(req);

      // Add security headers
      const headers = new Headers(response.headers);
      headers.set('X-Content-Type-Options', 'nosniff');
      headers.set('X-Frame-Options', 'DENY');
      headers.set('X-XSS-Protection', '1; mode=block');
      headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

      return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers
      });
    } catch (error) {
      console.error('API Error:', error);
      return new Response('Internal Server Error', { status: 500 });
    }
  };
}