import Cookies from 'js-cookie';
import { COOKIE_NAMES, COOKIE_DEFAULTS } from '@/lib/constants/cookies';

export interface CookieConsent {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  preferences: boolean;
  timestamp: string;
}

export const getConsentCookie = (): CookieConsent | null => {
  try {
    const consent = Cookies.get(COOKIE_NAMES.CONSENT);
    return consent ? JSON.parse(consent) : null;
  } catch {
    return null;
  }
};

export const setConsentCookie = (consent: Partial<CookieConsent>) => {
  const newConsent: CookieConsent = {
    necessary: true, // Always required
    analytics: false,
    marketing: false,
    preferences: false,
    timestamp: new Date().toISOString(),
    ...consent,
  };

  Cookies.set(COOKIE_NAMES.CONSENT, JSON.stringify(newConsent), {
    ...COOKIE_DEFAULTS,
    expires: 365, // 1 year
    domain: process.env.NODE_ENV === 'development' ? 'localhost' : undefined,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax'
  });

  return newConsent;
};

export const removeConsentCookie = () => {
  Cookies.remove(COOKIE_NAMES.CONSENT, { path: '/' });
};