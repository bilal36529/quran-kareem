import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { ANALYTICS_CONFIG } from '@/lib/config/analytics';
import { rateLimit } from '@/lib/utils/rate-limit';

export async function POST(request: NextRequest) {
  try {
    // Apply rate limiting
    const rateLimitResult = await rateLimit(request);
    if (!rateLimitResult.success) {
      return NextResponse.json(
        { error: 'Too many requests' },
        { status: 429, headers: { 'Retry-After': '60' } }
      );
    }

    const headersList = headers();
    const ip = headersList.get('x-forwarded-for') || 'unknown';

    const events = await request.json();

    if (ANALYTICS_CONFIG.development && ANALYTICS_CONFIG.debug) {
      console.log('Analytics events:', events);
    }

    return NextResponse.json(
      { success: true },
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-store',
          'X-Content-Type-Options': 'nosniff'
        },
      }
    );
  } catch (error) {
    console.error('Analytics error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to process analytics events' 
      },
      { 
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-store'
        }
      }
    );
  }
}

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

// Define allowed HTTP methods
export const allowedMethods = ['POST'];