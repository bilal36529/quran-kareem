export const COOKIE_CATEGORIES = {
  NECESSARY: 'necessary',
  ANALYTICS: 'analytics',
  MARKETING: 'marketing',
  PREFERENCES: 'preferences',
} as const;

export const COOKIE_NAMES = {
  CONSENT: 'cookie-consent',
  ANALYTICS_CONSENT: 'ga-consent',
  PREFERENCES: 'user-preferences',
} as const;

export const COOKIE_DEFAULTS = {
  path: '/',
  sameSite: 'lax' as const,
  expires: 365, // days
  // Remove secure and domain from defaults to allow override
};