import { STORAGE_KEY, isLang, type Lang } from '../i18n/constants';

/** Saves the language choice. Returns false when storage is unavailable. */
export function saveLang(lang: Lang): boolean {
  try {
    window.localStorage.setItem(STORAGE_KEY, lang);
    return window.localStorage.getItem(STORAGE_KEY) === lang;
  } catch {
    return false;
  }
}

export function readLang(): Lang | null {
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    return isLang(value) ? value : null;
  } catch {
    return null;
  }
}

export const prefersReducedMotion = (): boolean =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;
