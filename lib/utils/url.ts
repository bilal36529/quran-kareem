/**
 * Modern URL utilities without punycode dependency
 */

export function normalizeUrl(url: string): string {
  try {
    const urlObj = new URL(url);
    return urlObj.toString();
  } catch {
    // If URL is invalid, try prepending https://
    try {
      const urlWithProtocol = new URL(`https://${url}`);
      return urlWithProtocol.toString();
    } catch {
      return url; // Return original if still invalid
    }
  }
}

export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

export function getHostname(url: string): string {
  try {
    return new URL(url).hostname;
  } catch {
    return '';
  }
}

export function getPathname(url: string): string {
  try {
    return new URL(url).pathname;
  } catch {
    return '';
  }
}

export function getSearchParams(url: string): URLSearchParams {
  try {
    return new URL(url).searchParams;
  } catch {
    return new URLSearchParams();
  }
}

export function joinUrl(...parts: string[]): string {
  return parts
    .map(part => part.replace(/^\/+|\/+$/g, ''))
    .filter(Boolean)
    .join('/');
}