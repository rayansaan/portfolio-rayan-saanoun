import type { Project } from '@/types';

export const uxUiProjects: Project[] = [
  {
    id: 'moove',
    name: 'Moove',
    imageUrl: '/images/projects/moove/Moove_header.png',
    href: '/project/moove',
    category: 'ux-ui',
    year: '2022-2024',
    duration: '16 mois',
    location: 'Pépinière 27 - Paris',
    tags: ['B2B', 'Mobile App', 'Prototyping', 'SaaS', 'UX Research', 'UX/UI Design', 'Webapp'],
    tools: ['Figma', 'Notion', 'Jira', 'Loom'],
    description: 'Product Design SaaS pour l\'aviation privée - comparateur de vols, Empty Leg, et Services Clients',
    role: 'Product Design SaaS - Responsable du comparateur de vols, Empty Leg, et Services Clients (CRM, billets d\'avion, Gestion des Aéronefs)',
    team: ['Developer', 'CTO', 'Stakeholders'],
    challenge: 'Améliorer l\'impact du comparateur de vols pour montrer l\'avantage de la solution porte-à-porte. Créer un Tableau de bord pour les opérateurs et pilotes. Faciliter les échanges entre clients et opérateurs pendant le processus de devis.',
    process: {
      discovery: 'Phase de découverte avec analyse des besoins utilisateurs et audit de l\'existant',
      define: 'Définition des objectifs et prioritisation des fonctionnalités',
      design: 'Conception des interfaces et parcours utilisateurs',
      prototyping: 'Création de prototypes interactifs pour validation',
      testing: 'Tests utilisateurs et itérations',
      delivery: 'Livraison des maquettes finales et accompagnement développement'
    },
    solution: 'SaaS Product Design incluant comparateur de vols optimisé, système Empty Leg, Services Clients (CRM, billets d\'avion, Gestion des Aéronefs), et Tableau de bord complet pour opérateurs et pilotes.'
  },
  {
    id: 'nash',
    name: 'Nash',
    imageUrl: '/images/projects/nash/Nash_header.png',
    href: '/project/nash',
    category: 'ux-ui',
    year: '2023',
    duration: '1 semaine',
    location: 'Station F - Paris',
    tags: ['Prototyping', 'UX Research', 'UX/UI Design', 'Webapp'],
    tools: ['Figjam', 'Figma'],
    description: 'Refonte UX pour Nash-Renewables - secteur des énergies renouvelables (gestion de parcs photovoltaïques et éoliens)',
    role: 'Refonte UX pour positionner Nash-Renewables comme leader de confiance dans les énergies renouvelables. Optimisation du parcours utilisateur, particulièrement l\'onboarding, pour le rendre plus intuitif et adapté aux opérateurs et gestionnaires de parcs photovoltaïques et éoliens.',
    challenge: 'Positionner Nash-Renewables comme leader de confiance dans les énergies renouvelables. Rendre l\'onboarding plus intuitif et adapté aux besoins des opérateurs et gestionnaires.',
    process: {
      discovery: 'Sessions d\'onboarding avec différents profils d\'utilisateurs pour établir une User story permettant d\'évaluer les opportunités d\'amélioration',
      define: 'Établissement de la User story pour évaluer les opportunités d\'amélioration',
      testing: 'Sessions de tests utilisateurs',
      delivery: 'Proposition avec dénomination claire des étapes invitant les utilisateurs à consulter les informations. Approche Mobile-first car les nouveaux clients consultent Nash sur mobile'
    },
    solution: 'Expérience d\'onboarding Mobile-first avec étapes claires. Approche mobile-first car les nouveaux clients consultent Nash sur mobile.',
    prototypeUrl: 'https://www.figma.com/proto/b2qLP2nMYVHl4nqefW8KZn/Veeton---Rayan'
  },
  {
    id: 'veeton',
    name: 'Veeton',
    imageUrl: '/images/projects/veeton/Slide_-_16.png',
    href: '/project/veeton',
    category: 'ux-ui',
    year: '2024',
    duration: '1 mois',
    location: 'Station F - Paris',
    tags: ['Prototyping', 'UX Research', 'UX/UI Design', 'website'],
    tools: ['Figjam', 'Figma'],
    description: 'Plateforme de photographie de mode par IA pour marques de luxe',
    role: 'UX/UI Design et Recherche pour plateforme de photographie de mode par IA',
    challenge: 'Explorer comment l\'IA de Veeton peut révolutionner la photographie de mode',
    process: {
      discovery: 'Organisation de sessions de brainstorming pour explorer comment l\'IA peut révolutionner la photographie de mode. Études de marché et analyse concurrentielle pour comprendre les besoins des marques de mode. Étude des attentes des utilisateurs finaux concernant la qualité visuelle dans le secteur du luxe'
    },
    prototypeUrl: 'https://www.figma.com/proto/b2qLP2nMYVHl4nqefW8KZn/Veeton---Rayan'
  },
  {
    id: 'rakoono',
    name: 'Rakoono',
    imageUrl: '/images/projects/rakoono/Miniature_Rakoono.png',
    href: '/project/rakoono',
    category: 'ux-ui',
    year: '2024',
    duration: '1 semaine',
    location: 'Station F - Paris',
    tags: ['Prototyping', 'UX Research', 'UX/UI Design', 'website'],
    tools: ['Figjam', 'Figma'],
    description: 'Plateforme d\'expérience utilisateur gamifiée',
    role: 'UX/UI Design avec focus sur la gamification',
    solution: 'Définition des parcours utilisateurs et production de maquettes détaillées. Intégration d\'éléments de gamification (systèmes de récompenses, défis quotidiens, progression de niveaux) pour rendre l\'expérience plus engageante.',
    prototypeUrl: 'https://www.figma.com/proto/b2qLP2nMYVHl4nqefW8KZn/Veeton---Rayan'
  }
];

export const otherProjects: Project[] = [];

export const allProjects: Project[] = [...uxUiProjects, ...otherProjects];
