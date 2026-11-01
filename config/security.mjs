/**
 * Single source of truth for the HTTP security policy.
 * Consumed by the build integration (dist/_headers), the local production
 * server (scripts/serve.mjs), the meta CSP in the page head, and mirrored
 * by hand in deploy/ server samples.
 */

/** @type {Record<string, string[]>} */
const cspDirectives = {
  'default-src': ["'none'"],
  'script-src': ["'self'"],
  'style-src': ["'self'"],
  'img-src': ["'self'"],
  'font-src': ["'self'"],
  'manifest-src': ["'self'"],
  'connect-src': ["'none'"],
  'media-src': ["'none'"],
  'object-src': ["'none'"],
  'worker-src': ["'none'"],
  'child-src': ["'none'"],
  'frame-src': ["'none'"],
  'base-uri': ["'none'"],
  'form-action': ["'none'"],
  'frame-ancestors': ["'none'"],
  'require-trusted-types-for': ["'script'"],
  'trusted-types': ["'none'"],
};

/** Directives that browsers ignore (and warn about) inside <meta>. */
const headerOnly = new Set(['frame-ancestors']);

/**
 * @param {{ meta?: boolean, https?: boolean }} [opts]
 */
export function buildCsp({ meta = false, https = true } = {}) {
  const parts = Object.entries(cspDirectives)
    .filter(([name]) => !(meta && headerOnly.has(name)))
    .map(([name, values]) => `${name} ${values.join(' ')}`);
  if (https && !meta) parts.push('upgrade-insecure-requests');
  return parts.join('; ');
}

const permissionsPolicy = [
  'accelerometer=()',
  'autoplay=()',
  'browsing-topics=()',
  'camera=()',
  'display-capture=()',
  'encrypted-media=()',
  'fullscreen=()',
  'geolocation=()',
  'gyroscope=()',
  'magnetometer=()',
  'microphone=()',
  'midi=()',
  'payment=()',
  'picture-in-picture=()',
  'publickey-credentials-get=()',
  'screen-wake-lock=()',
  'serial=()',
  'usb=()',
  'xr-spatial-tracking=()',
].join(', ');

/**
 * Headers applied to every response.
 * @param {{ https?: boolean }} [opts]
 * @returns {Record<string, string>}
 */
export function securityHeaders({ https = true } = {}) {
  /** @type {Record<string, string>} */
  const headers = {
    'Content-Security-Policy': buildCsp({ https }),
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'Referrer-Policy': 'no-referrer',
    'Permissions-Policy': permissionsPolicy,
    'Cross-Origin-Opener-Policy': 'same-origin',
    'Cross-Origin-Resource-Policy': 'same-origin',
    'Cross-Origin-Embedder-Policy': 'require-corp',
    'Origin-Agent-Cluster': '?1',
    'X-Permitted-Cross-Domain-Policies': 'none',
  };
  // HSTS is only meaningful (and only honoured) over HTTPS.
  if (https) headers['Strict-Transport-Security'] = 'max-age=63072000; includeSubDomains';
  return headers;
}

/** Long-lived caching for fingerprinted build assets; revalidate HTML. */
export const cacheRules = [
  { pattern: '/_assets/*', value: 'public, max-age=31536000, immutable' },
  { pattern: '/*', value: 'public, max-age=0, must-revalidate' },
];
