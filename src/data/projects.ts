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
    description: 'Moove est une plateforme SaaS B2B dédiée à la gestion et l\'optimisation des vols dans l\'aviation d\'affaires. J\'y ai travaillé pendant 16 mois en tant que Product Designer SaaS.',
    markdownContent: `# Moove : L'aviation d'affaires rendue transparente

**Index**
* Le contexte
* Le problème : La complexité cache la valeur
* Nos principes : Clarté, Transparence, Évolution
* Clarté par la comparaison multimodale
* Transparence grâce à la carte (Map)
* L'impact : Un déploiement à grande échelle
* Remerciements

**10 octobre 2022 — 29 février 2024**

Moove est une plateforme SaaS B2B dédiée à la gestion et l'optimisation des vols dans l'aviation d'affaires. J'y ai travaillé pendant 16 mois en tant que Product Designer SaaS. 

L'objectif de cette étude de cas n'est pas de vous montrer des écrans statiques, mais de vous expliquer comment nous avons rendu un processus complexe (la réservation de jets et l'analyse d'impact) accessible et évident pour les passagers et les opérateurs.

## Le contexte

Moove est une solution tout-en-un dédiée au secteur de l'aviation d'affaires. C'est une plateforme centralisée conçue pour simplifier et optimiser la gestion des déplacements professionnels par avion privé. Elle offre des outils et des services adaptés aux besoins des opérateurs aériens, des entreprises et des voyageurs.

Aujourd'hui la solution se décline en 4 axes :

**Comparateur de vols privés :** Moove propose un comparateur de vols privés permettant aux utilisateurs de trouver rapidement et facilement les meilleures options pour leurs déplacements en avion privé.

**Gestion de la flotte d'entreprise :** La plateforme offre des outils pour gérer les flottes d'avions d'entreprise, facilitant ainsi la gestion des déplacements professionnels.

**Empty Leg :** Moove propose des Empty Leg, c'est-à-dire des vols à prix réduits lorsqu'un avion privé doit retourner à vide vers sa base ou effectuer un vol sans passagers.

**Services aux passagers :** La plateforme offre également des services aux passagers pour améliorer l'expérience de voyage, tels que la gestion des préférences de voyage, l'assistance 24/7 et d'autres services personnalisés.

## Le problème : La complexité cache la valeur

Au départ, notre comparateur de vols était puissant, mais illisible. 

L'ancienne page manquait d'uniformité et utilisait des mesures incompréhensibles pour un utilisateur moyen. Le calcul était rapide, mais il échouait à mettre en évidence les forces et les faiblesses de chaque option de voyage. 

Les clients ne comprenaient pas la valeur du service. Les opérateurs ne parvenaient pas à vendre leurs vols. Il fallait tout repenser.

### Une technologie puissante mais illisible

Quand j'ai pris le projet en main, le constat était sans appel : l'ancienne page de recherche exécutait l'analyse comparative rapidement, mais elle manquait cruellement de clarté. 

L'interface souffrait d'un manque d'uniformité et utilisait des mesures complexes que l'utilisateur moyen ne parvenait pas à déchiffrer. Résultat : l'outil échouait à mettre en évidence les forces et les faiblesses des différentes options de voyage (train, voiture, vols commerciaux) face à l'aviation d'affaires. Nous avions un moteur puissant sous le capot, mais une carrosserie qui n'inspirait ni confiance ni prise de décision.

## Nos principes : Clarté, Transparence, Évolution

Le développement de notre stratégie produit a fait émerger trois piliers :
1. **Clarté :** L'information doit être digeste instantanément.
2. **Transparence :** Le coût financier et écologique ne doit jamais être caché.
3. **Évolution :** L'interface doit s'adapter aussi bien au passager final qu'au courtier.

## Clarté par la comparaison multimodale

De nombreux outils vous donnent le prix d'un vol. Presque aucun ne vous donne le coût réel de votre trajet de bout en bout.

Nous avons conçu un calculateur multimodal complet. En un coup d'œil, l'utilisateur évalue le temps "porte-à-porte", le coût total et l'impact écologique. Il peut comparer objectivement le train, la voiture, les vols commerciaux et l'aviation d'affaires.

*[Insérer ici : Comparatif Avant / Après de la page de recherche]*

Sans cette clarté visuelle, l'utilisateur est noyé. Avec elle, il prend une décision éclairée.

### Un calculateur multimodal intelligent

Le résultat est un calculateur multimodal complet qui évalue trois piliers essentiels : le temps de trajet porte-à-porte, le coût total, et l'impact écologique. 

Pour transformer cette vision en réalité rapidement, j'ai collaboré étroitement avec les fondateurs et les développeurs pour implémenter l'interface via l'outil no-code Bubble. Mon rôle de Product Designer a été de m'assurer que chaque décision UI répondait aux objectifs stratégiques définis lors de la phase de recherche, tout en m'adaptant aux contraintes techniques de l'intégration.

## Transparence grâce à la carte (Map)

L'analyse de nos concurrents a révélé un vide : il manquait une représentation spatiale claire.

Nous avons introduit une carte interactive. Ce n'est pas juste un élément esthétique. C'est l'outil qui permet de visualiser le gain de temps et l'empreinte carbone (notamment via les vols à vide / Empty legs) en temps réel.

*[Insérer ici : GIF ou Vidéo de l'interaction avec la map et les filtres]*

## L'impact : Un déploiement à grande échelle

Un bon design génère du business. 

La nouvelle version a été finalisée et déployée le 07 octobre 2023. Le résultat ? Michelin Air Services a validé notre solution et nous a confié un déploiement à grande échelle, en intégrant directement sa base de données.

> "Digitalization and modernization, with major time savings and simplified processes. Moove is a game-changer for corporate aviation..." — Vincent Tourlonias, Head of Operational Flows chez Michelin.

L'itération continue. Les retours du terrain nous ont prouvé qu'une messagerie pilote-client était la prochaine étape cruciale pour asseoir cette confiance.

### Un déploiement validé par l'industrie

Le véritable test d'un design reste son adoption sur le marché. Déployée avec succès le 07 octobre 2023, la nouvelle page de recherche a eu un impact business immédiat. 

L'entreprise Michelin Air Services a non seulement validé notre solution, mais nous a confié un déploiement à grande échelle, incluant l'intégration directe de leur base de données. Vincent Tourlonias, Head of Operational Flows chez Michelin, a qualifié Moove de "game-changer pour l'aviation d'affaires", soulignant la simplification des processus et les gains de temps majeurs apportés par la plateforme. De plus, nos recherches et ce premier lancement ont confirmé auprès de Michelin la très forte valeur ajoutée d'intégrer une messagerie directe entre le pilote et le client.

## Remerciements

Construire Moove n'a pas été un effort solitaire. Je tiens à remercier les fondateurs, les développeurs, et le CTO pour leur collaboration étroite, ainsi que les équipes de Michelin pour leurs retours précieux lors de nos phases de test.

## Limites techniques et pivot stratégique

Ce projet de 16 mois a été une immense source d'apprentissages. 

Sur le plan technique, construire le produit sur Bubble.io nous a permis d'itérer vite, mais nous nous sommes heurtés à des limites de performances pour les calculs d'itinéraires complexes et à des difficultés pour maintenir une expérience front-end parfaitement fidèle aux maquettes. 

Sur le plan produit, j'ai réalisé qu'un bon design fait parfois évoluer la trajectoire de l'entreprise : l'expérience a prouvé que la relation humaine était tout aussi vitale que la donnée, faisant du développement de la messagerie pilote-client notre nouvel objectif principal. J'en tire une conviction forte : la roadmap d'un produit complexe ne se devine pas, elle se priorise uniquement sur la base des retours issus de tests utilisateurs continus sur le terrain.`,
    images: [
      '/images/projects/moove/Moove_header.png',
      '/images/projects/moove/search/Bastien__scapin.png',
      '/images/projects/moove/search/golden_nuggets.png',
      '/images/projects/moove/search/image 1.png',
      '/images/projects/moove/search/User_map_B2C.png',
      '/images/projects/moove/search/image.png',
      '/images/projects/moove/search/voles__vide_agrgateur.png',
      '/images/projects/moove/search/image 2.png',
      '/images/projects/moove/search/Frame_306.png',
      '/images/projects/moove/image.png'
    ]
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
    markdownContent: `# Nash : Optimiser l'expérience utilisateur pour les énergies renouvelables

## Le contexte

Nash est une plateforme qui offre des solutions technologiques pour faciliter le fonctionnement et la maintenance des éoliennes et des panneaux solaires. Elle fournit des outils pour surveiller, analyser et optimiser les performances des équipements d'énergie renouvelable.

## Le problème : Séduire les opérateurs d'énergies renouvelables

Nash-Renewables est une entreprise basée à Hambourg qui combine technologie avancée et expertise environnementale pour optimiser la production des parcs photovoltaïques et éoliens. Leur produit phare, Nash Dev, est un outil SaaS pointu conçu pour automatiser la gestion de ces installations.

Mon défi lors de ce sprint intensif d'une semaine à Station F était clair : repenser l'expérience utilisateur globale pour accompagner l'entreprise dans son positionnement de leader de confiance. L'objectif principal était d'optimiser l'onboarding pour le rendre intuitif, fluide et parfaitement adapté aux besoins spécifiques des opérateurs.

### Une solution d'urgence qui montre ses limites

Le point de départ était complexe. Par manque de ressources en développement disponibles à ce moment-là, Nash avait dû intégrer rapidement des solutions d'urgence : leur onboarding se résumait à une simple vidéo.

De plus, mon audit UX initial a mis en lumière des problèmes structurels dans la navigation de la plateforme. L'outil manquait de la simplicité d'utilisation nécessaire pour réellement valoriser la puissance de leurs solutions technologiques.

## La découverte : Co-création et découverte inattendue

Plutôt que de me baser sur des suppositions, j'ai organisé des sessions d'onboarding avec différents profils d'utilisateurs : certains familiers avec l'outil et d'autres totalement novices. Cela m'a permis de construire des User Stories solides et d'évaluer précisément les opportunités d'amélioration.

Mais le vrai tournant du projet est venu d'un sondage de recherche : nous avons découvert que les nouveaux clients intéressés par cette solution consultaient le site de Nash principalement sur leur téléphone mobile ! Une donnée cruciale qui a radicalement fait pivoter ma stratégie de design.

## La stratégie : Mobile First

Suite à la découverte cruciale sur l'usage mobile, j'ai complètement repensé l'approche pour adopter une conception axée "Mobile first". Cette stratégie s'aligne parfaitement avec les habitudes réelles de nos prospects qui découvrent Nash principalement sur smartphone.

J'ai cartographié les parcours utilisateurs et établi des user stories priorisées pour guider la conception de l'expérience d'onboarding.

## La solution : Un onboarding structuré et progressif

Ma proposition s'est articulée autour d'une dénomination claire des étapes, guidant pas à pas l'utilisateur et l'invitant à consulter les informations sans friction.

J'ai modélisé l'ensemble des parcours et livré un prototype interactif sur Figma, avec une attention particulière portée à l'expérience mobile pour garantir une première impression professionnelle et engageante.

## L'impact : Poser les fondations de l'acquisition

En l'espace d'une seule semaine, j'ai réussi à transformer une expérience d'accueil vidéo passive en un véritable parcours d'intégration interactif. Bien que le délai très court du sprint ne permette pas de mesurer des métriques d'adoption à long terme, la nouvelle interface a permis d'allier simplicité et efficacité.

Surtout, elle garantit désormais que la première impression d'un opérateur (qui se fait sur mobile) reflète le professionnalisme et la position de leader de Nash-Renewables.

## Apprentissages : La donnée utilisateur bat toujours l'intuition

Ce projet m'a rappelé une règle d'or : l'importance vitale de la recherche utilisateur (UX Research). Sans ce sondage révélant l'usage majoritaire du mobile lors de la phase de découverte, nous aurions probablement conçu un onboarding "desktop-only" inadapté à l'acquisition de nouveaux clients.

Cela prouve qu'une recherche ciblée, même lors d'un sprint extrêmement contraint d'une semaine, est le meilleur moyen de dérisquer un projet et de concevoir un produit juste.`,
    images: [
      '/images/projects/nash/Nash_header.png',
      '/images/projects/nash/image 1.png',
      '/images/projects/nash/image 2.png',
      '/images/projects/nash/image 3.png',
      '/images/projects/nash/image 6.png',
      '/images/projects/nash/image 7.png',
      '/images/projects/nash/image 8.png',
      '/images/projects/nash/image 9.png'
    ]
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
    tools: ['Figma', 'Figjam'],
    description: 'Veeton utilise l\'intelligence artificielle pour permettre aux marques de mode de générer des shootings photo e-commerce de haute qualité à partir d\'une simple photo de vêtement posée à plat.',
    markdownContent: `# Veeton : L'IA au service de la photographie de mode

**Index**
* Le contexte
* Le problème : La technologie sans les codes
* Nos principes : Élégance, Réassurance, Scalabilité
* Élégance : Adopter les codes du luxe
* Réassurance : Comprendre la boîte noire
* Ce que j'ai appris
* Remerciements

**10 avril 2024 — 10 mai 2024 (Station F)**

Veeton permet aux marques de mode de générer des shootings photo e-commerce à grande échelle grâce à l'Intelligence Artificielle. À partir d'une simple photo d'un vêtement posé à plat, l'IA crée un rendu professionnel sur mannequin.

Mon rôle, le temps d'un sprint d'un mois, a été d'aligner cette technologie de pointe avec les exigences visuelles du luxe.

## Le contexte

Veeton a développé une technologie d'intelligence artificielle exclusive permettant aux marques de mode de générer des shootings photo e-commerce de haute qualité à grande échelle, à partir d'une simple photo de vêtement posée à plat.

## Le problème : La technologie sans les codes

La technologie de Veeton était puissante, mais son interface et ses visuels de présentation ne parlaient pas au monde de la mode.

L'audit initial était clair : les visuels de démonstration étaient trop rigides. Pire, les marques (nos utilisateurs) manquaient d'informations cruciales. Elles ne savaient pas si elles pouvaient alimenter le modèle avec de nouvelles poses ou de nouveaux mannequins.

En l'état, l'interface ne rassurait pas. Sans confiance, impossible de convaincre les directeurs artistiques d'adopter l'outil.

## Nos principes

Pour corriger le tir, notre réflexion s'est articulée autour de trois axes :
1. **Élégance :** L'interface doit s'effacer au profit du vêtement.
2. **Réassurance :** Démystifier l'IA en montrant le contrôle utilisateur.
3. **Scalabilité :** Prouver que l'outil gère des collections entières, pas juste une photo.

## Élégance : Adopter les codes du luxe

J'ai analysé les concurrents (Lalaland, Vmake AI, Botika) et les sites de mode haut de gamme. Les règles sont strictes :
* L'accent est mis sur l'image.
* Les couleurs sont majoritairement noir et blanc.
* Les typographies sont sans empattement (sans serif).

*[Insérer ici : Comparatif visuel "Ancienne interface MVP" vs "Nouvelle interface épurée"]*

En adoptant ces codes, nous avons créé une interface qui utilise un wording valorisant et un design minimaliste. L'outil Veeton n'a plus l'air d'un logiciel SaaS complexe, mais d'une véritable plateforme créative.

## Réassurance : Comprendre la boîte noire

Une Directrice Artistique comme notre persona "Camille" a besoin d'optimiser ses cycles de création, mais elle refuse de perdre le contrôle.

Nous avons revu le parcours utilisateur pour intégrer des interactions fluides démontrant la flexibilité du modèle. L'interface montre explicitement comment changer les poses ou ajuster les mannequins.

*[Insérer ici : Vidéo ou GIF du prototype montrant l'interaction avec le modèle IA]*

Cette transparence transforme l'IA : elle passe d'une "boîte noire intimidante" à un véritable assistant de création sur-mesure.

## Ce que j'ai appris

Ce mois à Station F m'a confirmé une chose : la technologie ne suffit pas.

Dans des secteurs comme la mode, la confiance s'acquiert par le design et le respect des codes visuels. Un bon UX/UI Design ne fait pas que rendre un produit joli, il le rend crédible aux yeux de son marché cible.

## Remerciements

Je remercie l'équipe fondatrice de Veeton et les résidents de Station F pour nos sessions de brainstorming intenses, qui ont permis de redéfinir la vision de ce produit fascinant.`,
    images: [
      '/images/projects/veeton/Slide_-_16.png',
      '/images/projects/veeton/image 1.png',
      '/images/projects/veeton/image 2.png',
      '/images/projects/veeton/image 3.png',
      '/images/projects/veeton/image 4.png',
      '/images/projects/veeton/image 5.png',
      '/images/projects/veeton/image.png'
    ]
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
    markdownContent: `# Rakoono : L'IA au service du football

## Le contexte

Rakoono est un assistant intelligent destiné aux équipes de football. Il combine l'intelligence artificielle et les données sportives pour accompagner les coachs et les recruteurs dans la préparation des matchs et le recrutement de joueurs.

## Le défi : Révolutionner l'analyse sportive

Rakoono est un assistant intelligent destiné aux équipes de football. Mon défi était de repenser l'expérience utilisateur et l'interface, en me concentrant sur les fonctionnalités clés pour les coachs et les recruteurs.

## La découverte

Cette phase a consisté en l'organisation de sessions de brainstorming pour explorer comment l'IA de Rakoono peut aider les coachs et recruteurs dans leur quotidien. Nous avons mené des études de marché et démarqué les concurrents potentiels pour comprendre les besoins des équipes de football en matière d'analyse de données sportives.

## La stratégie

Cette phase a consisté à définir les fonctionnalités clés et l'architecture de l'information. Nous avons créé des user stories et des parcours utilisateurs pour guider le développement.

## La solution : Gamification et engagement

Nous avons défini des parcours utilisateurs et la production de maquettes détaillées. Nous avons intégré des éléments de gamification tels que des systèmes de récompenses, des défis quotidiens et des progressions de niveaux pour rendre l'expérience utilisateur plus engageante.

Interface dédiée aux coachs et recruteurs avec visualisation des données sportives et outils d'analyse.

## Livrables

Prototype interactif sur Figma démontrant l'expérience utilisateur complète.`,
    images: [
      '/images/projects/rakoono/Miniature_Rakoono.png'
    ]
  }
];

export const otherProjects: Project[] = [];

export const allProjects: Project[] = [...uxUiProjects, ...otherProjects];
