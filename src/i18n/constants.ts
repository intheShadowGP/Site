// Dependency-free constants, safe to import from client scripts
// without pulling the dictionaries into the browser bundle.
export const LANGS = ['fr', 'en'] as const;
export type Lang = (typeof LANGS)[number];

export const STORAGE_KEY = 'gp.lang';

export function isLang(value: unknown): value is Lang {
  return typeof value === 'string' && (LANGS as readonly string[]).includes(value);
}
