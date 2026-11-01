import { fr, type Dictionary } from './fr';
import { en } from './en';
import type { Lang } from './constants';
import { withBase } from '../config/paths';

export type { Dictionary };
export { LANGS, STORAGE_KEY, isLang, type Lang } from './constants';

/** A value provided in every supported language. */
export type Localized<T = string> = Record<Lang, T>;

const dictionaries: Record<Lang, Dictionary> = { fr, en };

export const LANG_META: Record<Lang, { code: string; label: string; locale: string; ogLocale: string }> = {
  fr: { code: 'FR', label: 'Français', locale: 'fr-FR', ogLocale: 'fr_FR' },
  en: { code: 'EN', label: 'English', locale: 'en-GB', ogLocale: 'en_GB' },
};

export function t(lang: Lang): Dictionary {
  return dictionaries[lang];
}

/** Picks the right language out of a localized value. */
export function pick<T>(value: Localized<T>, lang: Lang): T {
  return value[lang];
}

export function homePath(lang: Lang): string {
  return withBase(`/${lang}/`);
}

export function otherLang(lang: Lang): Lang {
  return lang === 'fr' ? 'en' : 'fr';
}
