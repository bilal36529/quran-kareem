import Cookies from 'js-cookie';

export interface CookieOptions {
  expires?: number;
  path?: string;
  secure?: boolean;
  sameSite?: 'strict' | 'lax' | 'none';
}

const DEFAULT_OPTIONS: CookieOptions = {
  expires: 365, // 1 year
  path: '/',
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax'
};

export const COOKIE_KEYS = {
  THEME: 'qurankareem-theme',
  FONT_SETTINGS: 'qurankareem-font-settings',
  AUDIO_SETTINGS: 'qurankareem-audio-settings',
  LAST_READ: 'qurankareem-last-read',
  PREFERENCES: 'qurankareem-preferences',
  CONSENT: 'qurankareem-cookie-consent'
} as const;

export function setCookie(key: string, value: any, options: CookieOptions = {}) {
  try {
    const mergedOptions = { ...DEFAULT_OPTIONS, ...options };
    Cookies.set(key, JSON.stringify(value), mergedOptions);
  } catch (error) {
    console.error('Error setting cookie:', error);
  }
}

export function getCookie<T>(key: string, defaultValue?: T): T | undefined {
  try {
    const value = Cookies.get(key);
    return value ? JSON.parse(value) : defaultValue;
  } catch (error) {
    console.error('Error getting cookie:', error);
    return defaultValue;
  }
}

export function removeCookie(key: string, options: CookieOptions = {}) {
  try {
    const mergedOptions = { ...DEFAULT_OPTIONS, ...options };
    Cookies.remove(key, mergedOptions);
  } catch (error) {
    console.error('Error removing cookie:', error);
  }
}

export function clearAllCookies() {
  try {
    Object.values(COOKIE_KEYS).forEach(key => {
      removeCookie(key);
    });
  } catch (error) {
    console.error('Error clearing cookies:', error);
  }
}