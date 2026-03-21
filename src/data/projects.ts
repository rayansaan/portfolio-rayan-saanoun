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
    tools: ['Figjam', 'Figma', 'Miro', 'Notion', 'Bubble.io'],
    website: 'https://www.flymoove.com/',
    description: 'Moove est une solution tout-en-un dédiée au secteur de l\'aviation d\'affaires. C\'est une plateforme centralisée conçue pour simplifier et optimiser la gestion des déplacements professionnels par avion privé.',
    context: `Moove est une solution tout-en-un dédiée au secteur de l'aviation d'affaires. C'est une plateforme centralisée conçue pour simplifier et optimiser la gestion des déplacements professionnels par avion privé. Elle offre des outils et des services adaptés aux besoins des opérateurs aériens, des entreprises et des voyageurs.

Aujourd'hui la solution se décline en 4 axes :

**Comparateur de vols privés :** Moove propose un comparateur de vols privés permettant aux utilisateurs de trouver rapidement et facilement les meilleures options pour leurs déplacements en avion privé.

**Gestion de la flotte d'entreprise :** La plateforme offre des outils pour gérer les flottes d'avions d'entreprise, facilitant ainsi la gestion des déplacements professionnels.

**Empty Leg :** Moove propose des Empty Leg, c'est-à-dire des vols à prix réduits lorsqu'un avion privé doit retourner à vide vers sa base ou effectuer un vol sans passagers.

**Services aux passagers :** La plateforme offre également des services aux passagers pour améliorer l'expérience de voyage, tels que la gestion des préférences de voyage, l'assistance 24/7 et d'autres services personnalisés.`,
    role: `**Role:** Product Designer SaaS (UX/UI, UX Research)
**Timeline:** Octobre 2022 - Février 2024 (16 mois)
**Context:** B2B, SaaS, Webapp & Mobile App
**Tools & Stack:** Figjam, Figma, Miro, Notion, Bubble.io`,
    team: ['Developer', 'CTO', 'Stakeholders'],
    challenge: `## Rendre l'aviation d'affaires transparente et accessible

Moove est une start-up développant une plateforme SaaS B2B dédiée à l'optimisation des vols dans l'aviation d'affaires. L'ambition était claire : permettre aux opérateurs de valoriser leurs vols et aux passagers de comprendre le véritable impact économique et écologique de leur trajet. 

Mon défi principal en tant que Product Designer était de repenser totalement le comparateur de la page de recherche. L'enjeu n'était pas seulement esthétique, il était double et hautement stratégique : il fallait concevoir un outil capable de démontrer instantanément aux clients finaux l'avantage d'un trajet "porte-à-porte", tout en offrant aux courtiers et opérateurs une vitrine performante pour vendre leurs solutions.`,
    statusQuo: {
      content: `## Une technologie puissante mais illisible

Quand j'ai pris le projet en main, le constat était sans appel : l'ancienne page de recherche exécutait l'analyse comparative rapidement, mais elle manquait cruellement de clarté. 

L'interface souffrait d'un manque d'uniformité et utilisait des mesures complexes que l'utilisateur moyen ne parvenait pas à déchiffrer. Résultat : l'outil échouait à mettre en évidence les forces et les faiblesses des différentes options de voyage (train, voiture, vols commerciaux) face à l'aviation d'affaires. Nous avions un moteur puissant sous le capot, mais une carrosserie qui n'inspirait ni confiance ni prise de décision.`,
      images: ['/images/projects/moove/search/Bastien__scapin.png']
    },
    process: {
      discovery: {
        content: `## De l'incertitude à une vision claire - Partie 1

Je n'ai pas commencé par ouvrir Figma. Pour concevoir un produit juste, j'ai d'abord animé des ateliers collaboratifs avec les parties prenantes pour clarifier notre vision, définir les KPIs et explorer nos propositions de valeur. 

Ensuite, je suis allé chercher la vérité sur le terrain. J'ai interviewé des passagers, des opérateurs et des pilotes pour comprendre leurs véritables moteurs : le besoin de transparence sur les prix, l'importance du gain de temps porte-à-porte, et la préoccupation croissante pour l'impact écologique (notamment via la valorisation des vols à vide).`,
        images: [
          {
            src: '/images/projects/moove/search/golden_nuggets.png',
            alt: 'Recherche utilisateur - Golden Nuggets',
            description: '**Phase de Discovery** - Identification des insights clés utilisateurs lors des interviews.\n\nPoints marquants:\n- Besoin de comparaison claire entre modes de transport\n- Importance du temps "porte-à-porte"\n- Sensibilité environnementale croissante'
          }
        ]
      },
      define: {
        content: `## De l'incertitude à une vision claire - Partie 2

L'analyse de nos concurrents m'a révélé une opportunité clé : aucun d'entre eux ne proposait de "map" permettant de comparer clairement les trajets selon le coût, le temps et l'empreinte carbone. J'ai alors animé un atelier pour cartographier le parcours utilisateur et mis en place un "Impact mapping" centré sur les passagers. Cela a forcé l'équipe à faire des choix et à classer nos hypothèses stratégiques en trois catégories (gains rapides, évolutions significatives, paris ambitieux) pour créer une feuille de route réaliste.`,
        images: [
          {
            src: '/images/projects/moove/search/User_map_B2C.png',
            alt: 'User Journey Map',
            description: '**User Journey Map** - Cartographie complète du parcours utilisateur B2C.\n\nCette visualisation nous a permis d\'identifier les points de friction et les opportunités d\'amélioration dans l\'expérience de recherche de vols.'
          },
          '/images/projects/moove/search/image.png',
          '/images/projects/moove/search/image 1.png'
        ]
      },
      design: {
        content: 'Conception des interfaces et parcours utilisateurs en mettant l\'accent sur la comparaison multimodale complète.',
        images: ['/images/projects/moove/search/voles__vide_agrgateur.png', '/images/projects/moove/search/image 2.png']
      },
      prototyping: {
        content: 'Création de prototypes interactifs pour validation. Nous avons structuré les tests utilisateurs en étapes clés, de la définition des objectifs jusqu'à la phase pilote, afin d'obtenir des retours exploitables pour optimiser l'expérience de la search page.'
      },
      testing: {
        content: 'Tests utilisateurs et itérations efficaces sur notre proposition de valeur.',
        images: ['/images/projects/moove/search/Frame_306.png']
      }
    },
    solution: {
      content: `## Un calculateur multimodal intelligent

[Insérer ici : Vidéo/GIF du prototype final de la Search Page]
[Insérer ici : Maquette de l'agrégateur de vols à vide / Empty Legs]

Le résultat est un calculateur multimodal complet qui évalue trois piliers essentiels : le temps de trajet porte-à-porte, le coût total, et l'impact écologique. 

Pour transformer cette vision en réalité rapidement, j'ai collaboré étroitement avec les fondateurs et les développeurs pour implémenter l'interface via l'outil no-code Bubble. Mon rôle de Product Designer a été de m'assurer que chaque décision UI répondait aux objectifs stratégiques définis lors de la phase de recherche, tout en m'adaptant aux contraintes techniques de l'intégration.`,
      images: ['/images/projects/moove/image.png']
    },
    impact: `## Un déploiement validé par l'industrie

Le véritable test d'un design reste son adoption sur le marché. Déployée avec succès le 07 octobre 2023, la nouvelle page de recherche a eu un impact business immédiat. 

L'entreprise Michelin Air Services a non seulement validé notre solution, mais nous a confié un déploiement à grande échelle, incluant l'intégration directe de leur base de données. Vincent Tourlonias, Head of Operational Flows chez Michelin, a qualifié Moove de "game-changer pour l'aviation d'affaires", soulignant la simplification des processus et les gains de temps majeurs apportés par la plateforme. De plus, nos recherches et ce premier lancement ont confirmé auprès de Michelin la très forte valeur ajoutée d'intégrer une messagerie directe entre le pilote et le client.`,
    learnings: `## Limites techniques et pivot stratégique

Ce projet de 16 mois a été une immense source d'apprentissages. 

Sur le plan technique, construire le produit sur Bubble.io nous a permis d'itérer vite, mais nous nous sommes heurtés à des limites de performances pour les calculs d'itinéraires complexes et à des difficultés pour maintenir une expérience front-end parfaitement fidèle aux maquettes. 

Sur le plan produit, j'ai réalisé qu'un bon design fait parfois évoluer la trajectoire de l'entreprise : l'expérience a prouvé que la relation humaine était tout aussi vitale que la donnée, faisant du développement de la messagerie pilote-client notre nouvel objectif principal. J'en tire une conviction forte : la roadmap d'un produit complexe ne se devine pas, elle se priorise uniquement sur la base des retours issus de tests utilisateurs continus sur le terrain.`,
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
    tools: ['Figma'],
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
    tools: ['Figma'],
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
    tools: ['Figma'],
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
