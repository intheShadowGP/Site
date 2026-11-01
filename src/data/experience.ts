import type { Localized } from '../i18n';

export interface MissionGroup {
  title: Localized;
  items: Localized[];
}

export interface Experience {
  period: string;
  /** Machine-readable start/end years for <time>. */
  start: string;
  end?: string;
  role: Localized;
  kind: Localized;
  summary: Localized;
  groups: MissionGroup[];
}

/**
 * Organisation names and colleagues' details are intentionally absent.
 * Do not add figures or outcomes that cannot be substantiated.
 */
export const experiences: Experience[] = [
  {
    period: '2023 — 2026',
    start: '2023',
    end: '2026',
    role: { fr: 'Support technique & administration réseau', en: 'Technical support & network administration' },
    kind: { fr: 'Alternance — 3 ans', en: 'Work-study — 3 years' },
    summary: {
      fr: "Trois années d'expérience en alternance dans un environnement professionnel de support technique et d'administration réseau.",
      en: 'Three years of work-study experience in a professional technical support and network administration environment.',
    },
    groups: [
      {
        title: { fr: 'Réseau & infrastructure', en: 'Network & infrastructure' },
        items: [
          { fr: "Diagnostic et résolution d'incidents réseau", en: 'Network incident diagnosis and resolution' },
          { fr: "Gestion d'environnements Wi-Fi", en: 'Wi-Fi environment management' },
          { fr: 'IPTV et VoIP', en: 'IPTV and VoIP' },
          { fr: "Administration et dimensionnement d'infrastructures", en: 'Infrastructure administration and sizing' },
        ],
      },
      {
        title: { fr: 'Supervision & sécurité', en: 'Monitoring & security' },
        items: [
          { fr: 'Supervision matérielle et logicielle', en: 'Hardware and software monitoring' },
          { fr: 'Journalisation', en: 'Logging' },
          { fr: 'Authentification à deux facteurs', en: 'Two-factor authentication' },
        ],
      },
      {
        title: { fr: 'Support & service', en: 'Support & service' },
        items: [
          { fr: 'Support technique N1', en: 'Level 1 technical support' },
          { fr: 'Gestion des tickets ITSM', en: 'ITSM ticket management' },
          { fr: 'Relation utilisateurs et clients', en: 'User and customer relations' },
          { fr: 'Documentation technique', en: 'Technical documentation' },
        ],
      },
    ],
  },
  {
    period: '2023',
    start: '2023',
    role: { fr: 'Support matériel informatique', en: 'IT hardware support' },
    kind: { fr: 'Stage', en: 'Internship' },
    summary: {
      fr: 'Diagnostic, maintenance et réparation de matériels informatiques et électroniques.',
      en: 'Diagnosis, maintenance and repair of computer and electronic hardware.',
    },
    groups: [],
  },
  {
    period: '2021',
    start: '2021',
    role: { fr: 'Réseaux informatiques', en: 'IT networking' },
    kind: { fr: 'Stage', en: 'Internship' },
    summary: {
      fr: "Première immersion dans le déploiement et la protection d'un réseau d'entreprise.",
      en: 'A first immersion in deploying and protecting an enterprise network.',
    },
    groups: [
      {
        title: { fr: 'Missions', en: 'Responsibilities' },
        items: [
          { fr: "Initiation au déploiement de réseaux d'entreprise", en: 'Introduction to enterprise network deployment' },
          { fr: 'Sécurisation des infrastructures', en: 'Infrastructure security' },
          { fr: 'Mise en place de sauvegardes sur NAS', en: 'Setting up NAS backups' },
        ],
      },
    ],
  },
];
