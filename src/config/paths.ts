/**
 * Base path of the deployment: "" at a domain root, "/Site" for a GitHub
 * Pages project site. Every internal absolute URL goes through withBase().
 */
export const BASE = import.meta.env.BASE_URL.replace(/\/+$/, '');

export function withBase(path: string): string {
  return `${BASE}${path.startsWith('/') ? path : `/${path}`}`;
}
