interface RateLimitResult {
  success: boolean;
  limit?: number;
  remaining?: number;
  reset?: number;
}

const rateLimit = new Map<string, { count: number; timestamp: number }>();
const WINDOW_SIZE = 60 * 1000; // 1 minute
const MAX_REQUESTS = 60; // 60 requests per minute

export async function rateLimit(request: Request): Promise<RateLimitResult> {
  if (process.env.NODE_ENV === 'development') {
    return { success: true };
  }

  const ip = request.headers.get('x-forwarded-for') || 'anonymous';
  const now = Date.now();
  const windowStart = now - WINDOW_SIZE;

  // Clean up old entries
  for (const [key, data] of rateLimit.entries()) {
    if (data.timestamp < windowStart) {
      rateLimit.delete(key);
    }
  }

  const data = rateLimit.get(ip);
  if (!data) {
    rateLimit.set(ip, { count: 1, timestamp: now });
    return { success: true, limit: MAX_REQUESTS, remaining: MAX_REQUESTS - 1 };
  }

  if (data.timestamp < windowStart) {
    rateLimit.set(ip, { count: 1, timestamp: now });
    return { success: true, limit: MAX_REQUESTS, remaining: MAX_REQUESTS - 1 };
  }

  if (data.count >= MAX_REQUESTS) {
    return {
      success: false,
      limit: MAX_REQUESTS,
      remaining: 0,
      reset: data.timestamp + WINDOW_SIZE
    };
  }

  data.count++;
  return {
    success: true,
    limit: MAX_REQUESTS,
    remaining: MAX_REQUESTS - data.count
  };
}