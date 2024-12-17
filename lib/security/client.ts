'use client';

/**
 * Client-side security utilities
 */

// CSP Report handler
export function reportCspViolation(event: SecurityPolicyViolationEvent) {
  console.warn('CSP Violation:', {
    blockedURI: event.blockedURI,
    violatedDirective: event.violatedDirective,
    originalPolicy: event.originalPolicy,
  });

  // Send to analytics if enabled
  if (process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === 'true') {
    try {
      fetch('/api/analytics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'csp_violation',
          data: {
            blockedURI: event.blockedURI,
            violatedDirective: event.violatedDirective,
          },
        }),
      });
    } catch (error) {
      console.error('Failed to report CSP violation:', error);
    }
  }
}

// Initialize security features
export function initializeSecurity() {
  if (typeof window !== 'undefined') {
    // Avoid duplicate initialization
    if (window.__SECURITY_INITIALIZED__) return;
    window.__SECURITY_INITIALIZED__ = true;

    // Listen for CSP violations
    document.addEventListener('securitypolicyviolation', reportCspViolation);

    // Handle frame security without direct navigation
    if (window.self !== window.top) {
      console.warn('This application should not be embedded in an iframe');
      // Instead of forcing navigation, we'll show a warning
    }

    // Add security-related meta tags
    const metaTags = [
      { name: 'referrer', content: 'origin-when-cross-origin' },
      { 'http-equiv': 'X-Content-Type-Options', content: 'nosniff' },
      { 'http-equiv': 'X-Frame-Options', content: 'SAMEORIGIN' },
    ];

    metaTags.forEach(({ name, content, 'http-equiv': httpEquiv }) => {
      const meta = document.createElement('meta');
      if (name) meta.name = name;
      if (httpEquiv) meta.httpEquiv = httpEquiv;
      meta.content = content;
      document.head.appendChild(meta);
    });
  }
}