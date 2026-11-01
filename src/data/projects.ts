import type { Localized } from '../i18n';

export type ProjectStatus = 'draft' | 'in-progress' | 'completed';
export type Difficulty = 'foundational' | 'intermediate' | 'advanced';

export interface Project {
  id: string;
  name: Localized;
  description: Localized;
  objective: Localized;
  stack: string[];
  difficulty: Difficulty;
  status: ProjectStatus;
  /** Public URL — only once the work and the repository actually exist. */
  link?: string;
  /** Set to false to keep an entry in the data without publishing it. */
  published: boolean;
}

/**
 * Honesty rules for this list:
 * - never mark a project `completed` before it is built and documented;
 * - never add a link to a repository or write-up that does not exist;
 * - `draft` means planned: no outcome may be described as achieved.
 */
export const projects: Project[] = [
  {
    id: 'homelab',
    name: { fr: 'Homelab', en: 'Homelab' },
    description: { fr: 'Environnement virtualisé Linux et Windows.', en: 'Virtualised Linux and Windows environment.' },
    objective: {
      fr: "Disposer d'un environnement isolé pour expérimenter l'administration, le durcissement et la supervision de systèmes.",
      en: 'Provide an isolated environment to practise systems administration, hardening and monitoring.',
    },
    stack: ['Virtualisation', 'Linux', 'Windows Server', 'VLAN'],
    difficulty: 'intermediate',
    status: 'draft',
    published: true,
  },
  {
    id: 'network-monitoring',
    name: { fr: 'Supervision réseau', en: 'Network monitoring' },
    description: {
      fr: "Supervision et analyse d'une infrastructure réseau.",
      en: 'Monitoring and analysis of a network infrastructure.',
    },
    objective: {
      fr: "Collecter, visualiser et interpréter l'état d'une infrastructure de laboratoire pour détecter les anomalies.",
      en: 'Collect, visualise and interpret the state of a lab infrastructure in order to detect anomalies.',
    },
    stack: ['TCP/IP', 'Wireshark', 'Supervision', 'Logs'],
    difficulty: 'intermediate',
    status: 'draft',
    published: true,
  },
  {
    id: 'security-automation',
    name: { fr: 'Automatisation sécurité', en: 'Security automation' },
    description: {
      fr: 'Scripts Python et Shell destinés à automatiser certaines tâches de sécurité.',
      en: 'Python and Shell scripts to automate selected security tasks.',
    },
    objective: {
      fr: 'Réduire les tâches manuelles répétitives : contrôles de configuration, collecte de journaux, rapports.',
      en: 'Reduce repetitive manual work: configuration checks, log collection, reporting.',
    },
    stack: ['Python', 'Shell', 'Linux'],
    difficulty: 'intermediate',
    status: 'draft',
    published: true,
  },
  {
    id: 'vulnerability-analysis',
    name: { fr: 'Analyse de vulnérabilités', en: 'Vulnerability analysis' },
    description: {
      fr: 'Analyse et compréhension de vulnérabilités dans un environnement de laboratoire autorisé.',
      en: 'Analysing and understanding vulnerabilities in an authorised lab environment.',
    },
    objective: {
      fr: 'Étudier des CVE publiques sur des machines volontairement vulnérables et isolées, puis documenter les mesures correctives.',
      en: 'Study public CVEs on deliberately vulnerable, isolated machines, then document the remediation.',
    },
    stack: ['Nmap', 'CVE', 'Wireshark', 'Linux'],
    difficulty: 'advanced',
    status: 'draft',
    published: true,
  },
  {
    id: 'ctf-lab',
    name: { fr: 'CTF & laboratoire sécurité', en: 'CTF & security lab' },
    description: { fr: 'Exercices pratiques de sécurité informatique.', en: 'Hands-on IT security exercises.' },
    objective: {
      fr: 'Entretenir une pratique régulière sur des plateformes et des challenges légaux, avec des comptes rendus méthodiques.',
      en: 'Keep up regular practice on legal platforms and challenges, with methodical write-ups.',
    },
    stack: ['Linux', 'Python', 'Nmap', 'Wireshark'],
    difficulty: 'intermediate',
    status: 'draft',
    published: true,
  },
];

export const projectStatuses: ProjectStatus[] = ['draft', 'in-progress', 'completed'];
