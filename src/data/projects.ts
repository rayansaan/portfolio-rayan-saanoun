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
    tools: ['Figma', 'Figjam', 'Maze', 'Notion', 'Papier & Crayon'],
    website: 'https://www.flymoove.com/',
    description: 'Moove est une solution tout-en-un dédiée au secteur de l\'aviation d\'affaires. C\'est une plateforme centralisée conçue pour simplifier et optimiser la gestion des déplacements professionnels par avion privé.',
    context: `Moove est une solution tout-en-un dédiée au secteur de l'aviation d'affaires. C'est une plateforme centralisée conçue pour simplifier et optimiser la gestion des déplacements professionnels par avion privé. Elle offre des outils et des services adaptés aux besoins des opérateurs aériens, des entreprises et des voyageurs.

Aujourd'hui la solution se décline en 4 axes :

**Comparateur de vols privés :** Moove propose un comparateur de vols privés permettant aux utilisateurs de trouver rapidement et facilement les meilleures options pour leurs déplacements en avion privé.

**Gestion de la flotte d'entreprise :** La plateforme offre des outils pour gérer les flottes d'avions d'entreprise, facilitant ainsi la gestion des déplacements professionnels.

**Empty Leg :** Moove propose des Empty Leg, c'est-à-dire des vols à prix réduits lorsqu'un avion privé doit retourner à vide vers sa base ou effectuer un vol sans passagers.

**Services aux passagers :** La plateforme offre également des services aux passagers pour améliorer l'expérience de voyage, tels que la gestion des préférences de voyage, l'assistance 24/7 et d'autres services personnalisés.`,
    role: `Chez Moove, j'étais responsable du Product Design SaaS, qui comprenait le comparateur de vols, les Empty Leg, et les Services Clients (CRM, billets d'avion, Gestion des Aéronefs).

Mon objectif était :
• Améliorer l'impact du comparateur de la page de recherche pour que les clients voient l'avantage de la solution porte-à-porte.
• Créer un Tableau de bord pour les opérateurs et les pilotes.
• Faciliter les échanges entre les clients et les opérateurs pendant le processus de devis.`,
    team: ['Developer', 'CTO', 'Stakeholders'],
    challenge: 'Bien que l\'analyse comparative soit exécutée rapidement, elle manque actuellement d\'une présentation claire des forces et des faiblesses de chaque option de voyage. Cette lacune ne permet pas de mettre en évidence les avantages ou les inconvénients comparatifs de manière efficace pour l\'utilisateur final.',
    statusQuo: '',
    process: {
      discovery: {
        content: 'Avant de se lancer dans la conception, nous avons mené des sessions d\'interviews avec différents profils d\'utilisateurs (familiers avec l\'outil et d\'autres non) afin d\'identifier les principaux problèmes et d\'orienter le projet dans la bonne direction. J\'ai collaboré avec les fondateurs et les développeurs pour mener à bien ce projet, en prenant en charge la conception UX et l\'interface UI.',
        images: ['/images/projects/moove/search/golden_nuggets.png', '/images/projects/moove/search/Bastien__scapin.png']
      },
      define: {
        content: 'Définition des objectifs et prioritisation des fonctionnalités. Notre outil doit être adaptable à la fois aux clients qui recherchent un voyage adapté à leurs besoins et aux opérateurs qui souhaitent mettre en avant les avantages de leurs services.',
        images: ['/images/projects/moove/search/User_map_B2C.png']
      },
      design: {
        content: 'Conception des interfaces et parcours utilisateurs en mettant l\'accent sur la comparaison multimodale complète.',
        images: ['/images/projects/moove/search/voles__vide_agrgateur.png']
      },
      prototyping: {
        content: 'Création de prototypes interactifs pour validation. Nous avons structuré les tests utilisateurs en étapes clés, de la définition des objectifs jusqu\'à la phase pilote, afin d\'obtenir des retours exploitables pour optimiser l\'expérience de la search page.',
        images: ['/images/projects/moove/search/image.png', '/images/projects/moove/search/image 1.png']
      },
      testing: {
        content: 'Tests utilisateurs et itérations efficaces sur notre proposition de valeur.',
        images: ['/images/projects/moove/search/image 2.png', '/images/projects/moove/search/Frame_306.png']
      },
      delivery: {
        content: 'Livraison des maquettes finales et accompagnement développement avec les équipes techniques.',
        images: ['/images/projects/moove/Screen_prez_search.png']
      }
    },
    solution: {
      content: `Nous avons donc cherché à facilité la comparaison entre les différents modes de transport en créant des fiches détaillées. Notre proposition de valeurs se décompose en 3 éléments distinct :

**Temps de trajet total** (y compris les temps d'attente en aéroport)
**Budget** (coût total du voyage)
**Empreinte carbone** (impact environnemental)

Cette approche permet aux utilisateurs de comparer facilement les différentes options de transport en avion privé, vols commerciaux, train et voiture, en mettant en avant la solution la plus adaptée à leurs besoins.

La page de recherche propose un calculateur multimodal complet qui évalue le temps de trajet porte-à-porte, le coût total et l'impact écologique pour différents modes de transport.`,
      images: ['/images/projects/moove/image.png']
    },
    impact: '',
    learnings: '',
    useCases: ['Search page'],
    prototypeUrl: ''
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
    context: `Nash est une plateforme qui offre des solutions technologiques pour faciliter le fonctionnement et la maintenance des éoliennes et des panneaux solaires. Elle fournit des outils pour surveiller, analyser et optimiser les performances des équipements d'énergie renouvelable.`,
    role: `Mon rôle a été de repenser l'expérience utilisateur afin d'accompagner Nash-Renewables dans son positionnement comme leader de confiance dans les énergies renouvelables. J'ai travaillé sur l'optimisation du parcours utilisateur, en particulier l'onboarding, pour le rendre plus intuitif, fluide et adapté aux besoins des opérateurs et gestionnaires de parcs photovoltaïques et éoliens.

L'objectif était d'allier simplicité d'utilisation et efficacité afin de valoriser les solutions technologiques proposées par Nash-Renewables.`,
    team: [],
    challenge: '',
    statusQuo: '',
    process: {
      discovery: `Avant de se lancer dans la conception d'une solution, il est essentiel de bien comprendre le contexte, les utilisateurs et les opportunités. Nous avons ainsi commencé par des sessions d'interviews avec différents profils d'utilisateurs (familiers avec l'outil et d'autres non) afin d'identifier les principaux problèmes et d'orienter le projet dans la bonne direction.`,
      define: `Nous avons commencé par des sessions d'onboarding avec différents profils d'utilisateurs (familiers avec l'outil et d'autres non) afin d'établir une User story nous permettant d'évaluer les opportunités d'amélioration.`,
      testing: `Sessions de tests utilisateurs pour valider les parcours proposés.`,
      delivery: `Notre proposition se présente par une dénomination claire des étapes, en invitant les utilisateurs à consulter les informations. Notre proposition s'axe aussi sur le "Mobile first" car après sondage, les nouveaux clients intéressés par cet outil consultent le site Nash sur Mobile.`
    },
    solution: `Expérience d'onboarding Mobile-first avec étapes claires. Approche mobile-first car les nouveaux clients consultent Nash sur mobile.

L'interface propose une navigation simplifiée avec des étapes clairement identifiées pour guider les utilisateurs dans la prise en main de la plateforme.`,
    impact: '',
    learnings: '',
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
    context: `Veeton est une start-up qui propose une solution innovante pour la production de photos de mode à grande échelle grâce à l'intelligence artificielle. La plateforme permet aux marques de créer des images de mode réalistes et de haute qualité sans nécessiter de séances photo traditionnelles, réduisant ainsi les coûts et le temps de production.`,
    role: 'UX/UI Design et Recherche pour plateforme de photographie de mode par IA',
    team: [],
    challenge: 'Explorer comment l\'IA de Veeton peut révolutionner la photographie de mode',
    statusQuo: '',
    process: {
      discovery: `Cette phase a consisté en l'organisation de sessions de brainstorming pour explorer comment l'IA de Veeton peut révolutionner la photographie de mode. Nous avons mené des études de marché et démarqué les concurrents potentiels pour comprendre les besoins des marques de mode en matière de production d'images. Parallèlement, nous avons étudié les attentes des utilisateurs finaux concernant la qualité visuelle et la présentation dans le secteur du luxe.`,
      define: `Cette phase a consisté à définir les fonctionnalités clés et l'architecture de l'information. Nous avons créé des user stories et des parcours utilisateurs pour guider le développement. Les ateliers de co-conception nous ont permis d'aligner les objectifs business avec les besoins utilisateurs.`
    },
    solution: '',
    impact: '',
    learnings: '',
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
    description: 'Assistant intelligent destiné aux équipes de football',
    context: `Rakoono est un assistant intelligent destiné aux équipes de football. Il combine l'intelligence artificielle et les données sportives pour accompagner les coachs et les recruteurs dans la préparation des matchs et le recrutement de joueurs.`,
    role: `J'ai travaillé sur la refonte de l'expérience utilisateur et de l'interface de Rakoono, en me concentrant sur les fonctionnalités clés pour les coachs et les recruteurs.`,
    team: [],
    challenge: '',
    statusQuo: '',
    process: {
      discovery: `Cette phase a consisté en l'organisation de sessions de brainstorming pour explorer comment l'IA de Rakoono peut aider les coachs et recruteurs dans leur quotidien. Nous avons mené des études de marché et démarqué les concurrents potentiels pour comprendre les besoins des équipes de football en matière d'analyse de données sportives.`,
      define: `Cette phase a consisté à définir les fonctionnalités clés et l'architecture de l'information. Nous avons créé des user stories et des parcours utilisateurs pour guider le développement.`,
      delivery: `Nous avons défini des parcours utilisateurs et la production de maquettes détaillées. Nous avons intégré des éléments de gamification tels que des systèmes de récompenses, des défis quotidiens et des progressions de niveaux pour rendre l'expérience utilisateur plus engageante.`
    },
    solution: `Intégration d'éléments de gamification tels que des systèmes de récompenses, des défis quotidiens et des progressions de niveaux pour rendre l'expérience utilisateur plus engageante.

Interface dédiée aux coachs et recruteurs avec visualisation des données sportives et outils d'analyse.`,
    impact: '',
    learnings: '',
    prototypeUrl: 'https://www.figma.com/proto/b2qLP2nMYVHl4nqefW8KZn/Veeton---Rayan'
  }
];

export const otherProjects: Project[] = [];

export const allProjects: Project[] = [...uxUiProjects, ...otherProjects];
