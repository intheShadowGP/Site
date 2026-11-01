import type { Dictionary } from './fr';

export const en: Dictionary = {
  meta: {
    title: 'GP | Systems & Network Security',
    description:
      'Independent professional portfolio focused on systems administration, networking and cybersecurity.',
  },
  a11y: {
    skip: 'Skip to content',
    primaryNav: 'Main navigation',
    languageNav: 'Language selection',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    menu: 'Menu',
    close: 'Close',
    home: 'GP — back to top',
    switchTo: 'Read the site in English',
    current: 'current language',
  },
  nav: {
    home: 'Home',
    about: 'About',
    skills: 'Skills',
    experience: 'Experience',
    projects: 'Projects',
    contact: 'Contact',
  },
  hero: {
    eyebrow: 'Portfolio — Cybersecurity & infrastructure',
    subtitle: 'Systems & Network Security',
    text: 'Designing, understanding and securing digital infrastructures. An approach built on technical precision, analysis and continuous improvement.',
    ctaProfile: 'Discover my profile',
    ctaProjects: 'Explore my projects',
    figure: 'Fig. 01 — Identity mark',
    facts: [
      { label: 'Fields', value: 'Systems · Networks · Security' },
      { label: 'Method', value: 'Analysis · Precision · Continuous improvement' },
      { label: 'Path', value: "Bachelor (RNCP 6) · Cybersecurity master's (RNCP 7)" },
    ],
    scroll: 'Scroll',
  },
  about: {
    label: 'About',
    title: 'About me',
    paragraphs: [
      'An IT professional focused on systems, networks and cybersecurity, I have built hands-on experience in technical support, network administration and incident resolution.',
      'My approach is grounded in understanding infrastructures, analysing events and finding reliable solutions.',
      'I intend to deepen my expertise in securing IT environments, monitoring, automation and risk management.',
    ],
    axesTitle: 'Three areas of focus',
    axes: [
      { title: 'Systems', text: 'Administration, operation and maintenance of IT environments.' },
      { title: 'Networks', text: 'Architecture, troubleshooting, monitoring and analysis of communications.' },
      { title: 'Cybersecurity', text: 'Infrastructure protection, vulnerability analysis and security improvement.' },
    ],
    sheetTitle: 'Profile sheet',
    sheet: [
      { label: 'Public identity', value: 'GP' },
      { label: 'Field', value: 'Systems, networks & cybersecurity' },
      { label: 'Experience', value: '3 years of work-study — 2023 to 2026' },
      { label: 'Education', value: "Bachelor (RNCP 6) · Master's (RNCP 7)" },
      { label: 'Site languages', value: 'Français · English' },
    ],
  },
  skills: {
    label: 'Skills',
    title: 'Skills',
    intro:
      'A technical foundation built through work-study, formal education and lab practice. No arbitrary ratings, no gauges — just the fields and the tools.',
    legendTitle: 'Highlight',
    legendAll: 'All',
    kinds: {
      protocol: 'Protocol',
      tool: 'Tool',
      platform: 'Platform',
      standard: 'Reference',
      practice: 'Practice',
      language: 'Language',
    },
    count: (n: number) => `${n} items`,
  },
  experience: {
    label: 'Experience',
    title: 'Experience',
    intro:
      'A path built in the field. For discretion, organisations are not named and no figures or results are claimed.',
    missions: 'Responsibilities',
  },
  education: {
    label: 'Education',
    title: 'Education & certifications',
    intro: 'An academic path focused on infrastructure first, then on governance and both offensive and defensive security.',
    topicsTitle: 'Programme topics',
    certTitle: 'Certifications',
    certNone:
      'No certification is claimed at this time. Any certification in preparation will be listed as such, with its actual status.',
    certStatus: { preparing: 'In preparation', obtained: 'Obtained' },
    status: { completed: 'Completed', inProgress: 'In progress', upcoming: 'Upcoming' },
  },
  projects: {
    label: 'Projects',
    title: 'Technical lab',
    intro:
      'An evolving workspace. Each entry shows its actual status: DRAFT projects are planned tracks with no results claimed. A project is only marked completed once it has been built and documented.',
    filterLabel: 'Filter by status',
    filterAll: 'All',
    status: { draft: 'Draft', 'in-progress': 'In progress', completed: 'Completed' },
    fields: {
      objective: 'Objective',
      stack: 'Technologies',
      stackPlanned: 'Planned stack',
      difficulty: 'Difficulty',
      link: 'Public link',
    },
    difficulty: { foundational: 'Foundational', intermediate: 'Intermediate', advanced: 'Advanced' },
    noLink: 'No public link yet',
    openLink: 'View',
    empty: 'No project with this status yet.',
    shown: (n: number, total: number) => `Showing ${n} of ${total} project${total > 1 ? 's' : ''}`,
  },
  contact: {
    label: 'Contact',
    title: "Let's connect",
    text: "Interested in technology, infrastructure security or collaborative projects? Let's connect.",
    channelLabel: 'Professional channel',
    channelPending:
      'A separate professional channel, published under the GP pseudonym, is being validated. It will appear here as soon as it is operational.',
    privacyTitle: 'This site',
    privacy: ['No cookies', 'No trackers', 'No third-party resources', 'No personal data'],
  },
  footer: {
    mention: 'GP — Systems & Network Security',
    signature: 'Designed with precision. Built with security in mind.',
    rights: 'All rights reserved.',
    top: 'Back to top',
    language: 'Language',
  },
  errors: {
    storage: 'Your language preference could not be saved: local storage is unavailable.',
  },
};
