// Environment variable validation and typing
export const env = {
  API_BASE: process.env.NEXT_PUBLIC_API_BASE!,
  AUDIO_BASE: process.env.NEXT_PUBLIC_AUDIO_BASE!,
  STATIC_EXPORT: process.env.NEXT_PUBLIC_STATIC_EXPORT === 'true',
  BASE_URL: process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000',
  BASE_PATH: process.env.NEXT_PUBLIC_BASE_PATH || '',
} as const;

// Validate required environment variables
const requiredEnvs = {
  NEXT_PUBLIC_API_BASE: env.API_BASE,
  NEXT_PUBLIC_AUDIO_BASE: env.AUDIO_BASE,
} as const;

Object.entries(requiredEnvs).forEach(([key, value]) => {
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
});

// Type-safe environment variables
export type Env = typeof env;