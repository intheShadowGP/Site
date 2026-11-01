import type { Localized } from '../i18n';

export type EducationStatus = 'completed' | 'inProgress' | 'upcoming';

export interface Education {
  title: Localized;
  level: Localized;
  /** Localized date sentence, resolved against the build date. */
  timing: (status: EducationStatus) => Localized;
  /** Known, stated status (e.g. a completed degree). */
  status?: EducationStatus;
  /** ISO start date: the status is derived from it at build time. */
  starts?: string;
  topics: Localized[];
}

export interface Certification {
  name: string;
  status: 'preparing' | 'obtained';
}

export const education: Education[] = [
  {
    title: { fr: 'Bachelor — Systèmes, réseaux & sécurité', en: 'Bachelor — Systems, networks & security' },
    level: { fr: 'Niveau 6 RNCP', en: 'RNCP Level 6' },
    status: 'completed',
    timing: () => ({ fr: 'Achevé en 2026', en: 'Completed in 2026' }),
    topics: [],
  },
  {
    title: { fr: 'Mastère — Cybersécurité', en: "Master's programme — Cybersecurity" },
    level: { fr: 'Niveau 7 RNCP', en: 'RNCP Level 7' },
    starts: '2026-10-01',
    timing: (status) =>
      status === 'upcoming'
        ? { fr: 'Débute en octobre 2026', en: 'Starting October 2026' }
        : { fr: 'Depuis octobre 2026', en: 'Since October 2026' },
    topics: [
      { fr: 'Gouvernance et gestion des risques', en: 'Governance and risk management' },
      { fr: 'EBIOS RM', en: 'EBIOS RM' },
      { fr: 'ISO 27001', en: 'ISO/IEC 27001' },
      { fr: 'NIS2', en: 'NIS2' },
      { fr: 'Sécurité des environnements industriels', en: 'Industrial systems security' },
      { fr: 'Architecture sécurisée', en: 'Secure architecture' },
      { fr: "Tests d'intrusion", en: 'Penetration testing' },
      { fr: 'SOC', en: 'SOC operations' },
      { fr: 'Investigation numérique', en: 'Digital forensics' },
      { fr: 'Gestion de crise', en: 'Crisis management' },
    ],
  },
];

/**
 * Only list a certification once it is genuinely being prepared or obtained.
 * Example: { name: 'CompTIA Security+', status: 'preparing' }
 */
export const certifications: Certification[] = [];

export function educationStatus(entry: Education, now: Date): EducationStatus {
  if (entry.status) return entry.status;
  if (entry.starts && now < new Date(entry.starts)) return 'upcoming';
  return 'inProgress';
}
