export const fr = {
  meta: {
    title: 'GP | Sécurité des systèmes et réseaux',
    description:
      "Portfolio professionnel indépendant consacré à l'administration systèmes, aux réseaux et à la cybersécurité.",
  },
  a11y: {
    skip: 'Aller au contenu',
    primaryNav: 'Navigation principale',
    languageNav: 'Choix de la langue',
    openMenu: 'Ouvrir le menu',
    closeMenu: 'Fermer le menu',
    menu: 'Menu',
    close: 'Fermer',
    home: 'GP — retour en haut de page',
    switchTo: 'Lire le site en français',
    current: 'langue actuelle',
  },
  nav: {
    home: 'Accueil',
    about: 'À propos',
    skills: 'Compétences',
    experience: 'Expérience',
    projects: 'Projets',
    contact: 'Contact',
  },
  hero: {
    eyebrow: 'Portfolio — Cybersécurité & infrastructures',
    subtitle: 'Systems & Network Security',
    text: "Concevoir, comprendre et sécuriser les infrastructures numériques. Une approche fondée sur la rigueur technique, l'analyse et l'amélioration continue.",
    ctaProfile: 'Découvrir mon profil',
    ctaProjects: 'Explorer mes projets',
    figure: "Fig. 01 — Marque d'identité",
    facts: [
      { label: 'Domaines', value: 'Systèmes · Réseaux · Sécurité' },
      { label: 'Méthode', value: 'Analyse · Rigueur · Amélioration continue' },
      { label: 'Parcours', value: 'Bachelor RNCP 6 · Mastère cybersécurité RNCP 7' },
    ],
    scroll: 'Défiler',
  },
  about: {
    label: 'À propos',
    title: 'À propos',
    paragraphs: [
      "Professionnel de l'informatique orienté systèmes, réseaux et cybersécurité, j'ai développé une expérience pratique dans le support technique, l'administration réseau et la résolution d'incidents.",
      "Mon approche repose sur la compréhension des infrastructures, l'analyse des événements et la recherche de solutions fiables.",
      "Je souhaite approfondir mes compétences dans la sécurisation des environnements informatiques, la supervision, l'automatisation et la gestion des risques.",
    ],
    axesTitle: "Trois axes de travail",
    axes: [
      { title: 'Systèmes', text: 'Administration, exploitation et maintenance des environnements informatiques.' },
      { title: 'Réseaux', text: 'Architecture, diagnostic, supervision et analyse des communications.' },
      {
        title: 'Cybersécurité',
        text: "Protection des infrastructures, analyse des vulnérabilités et amélioration de la sécurité.",
      },
    ],
    sheetTitle: 'Fiche',
    sheet: [
      { label: 'Identité publique', value: 'GP' },
      { label: 'Domaine', value: 'Systèmes, réseaux & cybersécurité' },
      { label: 'Expérience', value: "3 ans d'alternance — 2023 à 2026" },
      { label: 'Formation', value: 'Bachelor RNCP 6 · Mastère RNCP 7' },
      { label: 'Langues du site', value: 'Français · English' },
    ],
  },
  skills: {
    label: 'Compétences',
    title: 'Compétences',
    intro:
      "Un socle technique construit par l'alternance, la formation et la pratique en laboratoire. Aucune note arbitraire, aucune jauge : les domaines et les outils, simplement.",
    legendTitle: 'Mettre en évidence',
    legendAll: 'Tout',
    kinds: {
      protocol: 'Protocole',
      tool: 'Outil',
      platform: 'Plateforme',
      standard: 'Référentiel',
      practice: 'Pratique',
      language: 'Langage',
    },
    count: (n: number) => `${n} éléments`,
  },
  experience: {
    label: 'Expérience',
    title: 'Expérience',
    intro:
      "Un parcours construit sur le terrain. Par discrétion, les organisations ne sont pas nommées et aucun résultat chiffré n'est revendiqué.",
    missions: 'Missions',
  },
  education: {
    label: 'Formation',
    title: 'Formation & certifications',
    intro: 'Un parcours académique orienté infrastructures, puis gouvernance et sécurité offensive comme défensive.',
    topicsTitle: 'Thématiques au programme',
    certTitle: 'Certifications',
    certNone:
      "Aucune certification n'est revendiquée à ce jour. Toute certification en préparation sera indiquée comme telle, avec son statut réel.",
    certStatus: { preparing: 'En préparation', obtained: 'Obtenue' },
    status: { completed: 'Achevée', inProgress: 'En cours', upcoming: 'À venir' },
  },
  projects: {
    label: 'Projets',
    title: 'Laboratoire technique',
    intro:
      "Un espace de travail évolutif. Chaque fiche affiche son statut réel : les projets « à l'étude » sont des axes planifiés, sans résultat revendiqué. Un projet n'est déclaré terminé qu'une fois réalisé et documenté.",
    filterLabel: 'Filtrer par statut',
    filterAll: 'Tous',
    status: { draft: "À l'étude", 'in-progress': 'En cours', completed: 'Terminé' },
    fields: {
      objective: 'Objectif',
      stack: 'Technologies',
      stackPlanned: 'Technologies envisagées',
      difficulty: 'Difficulté',
      link: 'Lien public',
    },
    difficulty: { foundational: 'Fondamental', intermediate: 'Intermédiaire', advanced: 'Avancé' },
    noLink: 'Aucun lien public pour le moment',
    openLink: 'Consulter',
    empty: 'Aucun projet dans cet état pour le moment.',
    shown: (n: number, total: number) => `${n} projet${n > 1 ? 's' : ''} affiché${n > 1 ? 's' : ''} sur ${total}`,
  },
  contact: {
    label: 'Contact',
    title: 'Échangeons',
    text: "Un intérêt pour la technologie, la sécurité des infrastructures ou un projet collaboratif ? Échangeons.",
    channelLabel: 'Canal professionnel',
    channelPending:
      "Un canal professionnel distinct, publié sous le pseudonyme GP, est en cours de validation. Il apparaîtra ici dès qu'il sera opérationnel.",
    privacyTitle: 'Ce site',
    privacy: ['Aucun cookie', 'Aucun traceur', 'Aucune ressource tierce', 'Aucune donnée personnelle'],
  },
  footer: {
    mention: 'GP — Systems & Network Security',
    signature: 'Conçu avec précision. Pensé pour la sécurité.',
    rights: 'Tous droits réservés.',
    top: 'Haut de page',
    language: 'Langue',
  },
  errors: {
    storage: "Votre préférence de langue n'a pas pu être enregistrée : le stockage local est indisponible.",
  },
};

export type Dictionary = typeof fr;
