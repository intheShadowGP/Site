import type { Localized } from '../i18n';

export type SkillKind = 'protocol' | 'tool' | 'platform' | 'standard' | 'practice' | 'language';

export interface Skill {
  name: Localized;
  kind: SkillKind;
}

export interface SkillCategory {
  id: string;
  title: Localized;
  scope: Localized;
  items: Skill[];
}

const same = (s: string): Localized => ({ fr: s, en: s });

export const skillCategories: SkillCategory[] = [
  {
    id: 'networking',
    title: { fr: 'Réseaux', en: 'Networking' },
    scope: { fr: 'Protocoles, segmentation, diagnostic.', en: 'Protocols, segmentation, troubleshooting.' },
    items: [
      { name: same('TCP/IP'), kind: 'protocol' },
      { name: same('VLAN'), kind: 'protocol' },
      { name: same('Wi-Fi'), kind: 'protocol' },
      { name: same('VoIP'), kind: 'protocol' },
      { name: same('Cisco Packet Tracer'), kind: 'tool' },
      { name: same('Wireshark'), kind: 'tool' },
      { name: { fr: 'Diagnostic réseau', en: 'Network troubleshooting' }, kind: 'practice' },
    ],
  },
  {
    id: 'systems',
    title: { fr: 'Administration systèmes', en: 'System administration' },
    scope: { fr: 'Exploitation, stockage, supervision.', en: 'Operations, storage, monitoring.' },
    items: [
      { name: same('Linux'), kind: 'platform' },
      { name: same('Windows Server'), kind: 'platform' },
      { name: { fr: 'Virtualisation', en: 'Virtualisation' }, kind: 'practice' },
      { name: { fr: 'Stockage NAS', en: 'NAS storage' }, kind: 'platform' },
      { name: { fr: 'Administration systèmes', en: 'Systems administration' }, kind: 'practice' },
      { name: { fr: 'Supervision', en: 'Monitoring' }, kind: 'practice' },
    ],
  },
  {
    id: 'security',
    title: { fr: 'Cybersécurité', en: 'Cybersecurity' },
    scope: { fr: 'Analyse, authentification, traçabilité.', en: 'Analysis, authentication, traceability.' },
    items: [
      { name: same('Nmap'), kind: 'tool' },
      { name: same('SSL/TLS'), kind: 'protocol' },
      { name: same('CVE'), kind: 'standard' },
      { name: { fr: 'Authentification 2FA', en: 'Two-factor authentication' }, kind: 'practice' },
      { name: { fr: 'Journalisation', en: 'Logging' }, kind: 'practice' },
      { name: { fr: 'Analyse réseau', en: 'Network analysis' }, kind: 'practice' },
      { name: { fr: 'Sécurité des infrastructures', en: 'Infrastructure security' }, kind: 'practice' },
    ],
  },
  {
    id: 'development',
    title: { fr: 'Développement & automatisation', en: 'Development & automation' },
    scope: { fr: 'Langages et scripts.', en: 'Languages and scripting.' },
    items: [
      { name: same('Python'), kind: 'language' },
      { name: same('Shell'), kind: 'language' },
      { name: same('Java'), kind: 'language' },
      { name: same('C/C++'), kind: 'language' },
      { name: same('SQL'), kind: 'language' },
      { name: same('Scripting'), kind: 'practice' },
    ],
  },
];

export const skillKinds: SkillKind[] = ['protocol', 'tool', 'platform', 'standard', 'practice', 'language'];
