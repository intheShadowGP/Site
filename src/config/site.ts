/**
 * Public identity. GP is the only identity published by this site —
 * never add a civil name, personal e-mail, phone, address or photo here.
 */
export const SITE = {
  name: 'GP',
  tagline: 'Systems & Network Security',
  /** ISO date of the build, used for honest time-dependent statuses. */
  buildDate: new Date(),
} as const;

/**
 * Optional professional contact channel, published under the GP pseudonym
 * only, and only once it has been validated (see docs/PRIVACY.md).
 * Keep `null` until then: the Contact section shows a neutral notice
 * instead of a placeholder button.
 *
 * Example once validated:
 *   { label: 'Signal — GP', href: 'https://signal.me/#eu/…' }
 */
export const CONTACT_CHANNEL: { label: string; href: string } | null = null;
