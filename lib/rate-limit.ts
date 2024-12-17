class RateLimit {
  private requests: Map<string, { count: number; timestamp: number }> = new Map();
  private readonly WINDOW_SIZE = 60 * 1000; // 1 minute
  private readonly MAX_REQUESTS = 60; // 60 requests per minute

  async check(ip: string): Promise<boolean> {
    const now = Date.now();
    const windowStart = now - this.WINDOW_SIZE;

    // Clean up old entries
    for (const [key, data] of this.requests) {
      if (data.timestamp < windowStart) {
        this.requests.delete(key);
      }
    }

    const current = this.requests.get(ip);
    if (!current) {
      this.requests.set(ip, { count: 1, timestamp: now });
      return true;
    }

    if (current.timestamp < windowStart) {
      this.requests.set(ip, { count: 1, timestamp: now });
      return true;
    }

    if (current.count >= this.MAX_REQUESTS) {
      return false;
    }

    current.count++;
    return true;
  }
}

const limiter = new RateLimit();

export async function rateLimit(req: Request) {
  if (process.env.NODE_ENV === 'development') {
    return { success: true };
  }

  const ip = req.headers.get('x-forwarded-for') || 'anonymous';
  const allowed = await limiter.check(ip);

  return { success: allowed };
}