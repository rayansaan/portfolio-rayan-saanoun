import type { Project } from '@/types';

export const uxUiProjects: Project[] = [
  {
    id: 'moove',
    results: [
      { value: '3 000+', label: 'Entreprises qui font confiance à Moove après deux ans, contre une dizaine au départ', kind: 'metric' },
      { value: '300 000', label: 'Utilisateurs après deux ans, contre une cinquantaine au départ', kind: 'metric' },
      { value: '+60 %', label: 'Recherches effectuées sur la plateforme', kind: 'metric' },
    ],
    name: 'Moove',
    imageUrl: '/images/projects/moove/Moove_header.png',
    href: '/project/moove',
    category: 'ux-ui',
    year: '2022-2024',
    duration: '2 ans',
    location: 'Pépinière 27 - Paris',
    tags: ['B2B', 'Mobile App', 'Prototyping', 'SaaS', 'UX Research', 'UX/UI Design', 'Webapp'],
    tools: ['Figjam', 'Figma', 'Miro', 'Notion', 'Bubble.io'],
    website: 'https://www.flymoove.com/',
    description: 'Moove est une plateforme SaaS B2B dédiée à la gestion et l\'optimisation des vols dans l\'aviation d\'affaires. J\'y ai travaillé pendant 2 ans en tant que Product Designer SaaS.',
    markdownContent: `# Moove : Rendre la comparaison des trajets plus claire

## Le projet en bref

Moove est une plateforme de l’aviation d’affaires destinée aux opérateurs et aux voyageurs. Pendant 2 ans, j’ai travaillé comme Product Designer sur ses parcours de recherche et de gestion des vols, au sein de l’équipe produit.

Le point de départ : un moteur de comparaison capable de traiter beaucoup de données, mais une interface qui ne permettait pas d’en comprendre rapidement la valeur. Notre enjeu était de rendre la recherche plus lisible, tout en présentant honnêtement le temps, le prix et l’impact écologique de chaque trajet.

![Aperçu de la recherche de vols Moove](/images/projects/moove/Screen_prez_search.png)

## Comprendre avant de redessiner

Nous avons étudié les besoins des voyageurs et des opérateurs, ainsi que les parcours et interfaces déjà disponibles sur le marché. Ce travail a mis en évidence un décalage : les résultats calculés étaient riches, mais leur présentation ne facilitait ni la comparaison ni la prise de décision.

![Analyse comparative des services existants](/images/projects/moove/search/image.png)

![Synthèse des enseignements de recherche](/images/projects/moove/search/golden_nuggets.png)

Ces observations ont guidé trois principes : rendre les informations compréhensibles d’un coup d’œil, montrer les coûts financiers et écologiques sans les dissimuler, et faire évoluer l’interface selon les besoins du passager comme de l’opérateur.

## Comparer des trajets, pas seulement des vols

Un prix ou une durée de vol ne suffisent pas pour choisir un déplacement. Nous avons conçu une comparaison multimodale qui met en regard le trajet porte à porte, son coût et son impact. L’utilisateur peut ainsi situer l’aviation d’affaires par rapport au train, à la voiture ou à un vol commercial.

Cette décision change la lecture du résultat : les critères deviennent visibles ensemble, au moment où l’utilisateur doit faire son choix.

![Cartographie des besoins et de leur impact sur la recherche](/images/projects/moove/search/User_map_B2C.png)

![Évolution des écrans de recherche et de comparaison](/images/projects/moove/search/image%202.png)

## Donner un repère spatial à la recherche

L’analyse concurrentielle montrait aussi le manque d’une représentation claire des itinéraires. Nous avons introduit une carte pour relier les résultats à un trajet concret et faciliter la lecture des options, notamment les vols à vide.

![Interface de recherche avec carte et résultats de vols](/images/projects/moove/search/Frame_306.png)

J’ai travaillé avec les fondateurs et les développeurs pour intégrer cette interface dans Bubble. Cette solution nous a permis d’itérer rapidement, tout en imposant des compromis de performance et de fidélité entre maquettes et produit final.

## Déploiement et enseignements

La nouvelle recherche a été déployée en octobre 2023. Michelin Air Services a validé la solution et confié à Moove un déploiement plus large avec intégration de sa base de données. C’est un signal concret d’adoption ; il ne remplace pas, à lui seul, des mesures détaillées de l’usage de chaque fonction.

Les retours ont également montré l’importance de la relation entre pilote et client. Une messagerie directe est devenue une piste prioritaire pour la suite du produit. Je retiens de ce projet qu’une interface claire aide à décider, mais que les tests et les usages réels doivent continuer à orienter la roadmap.

![Vue du produit Moove déployé](/images/projects/moove/search/Moove_header_search.png)`,
    images: [
      '/images/projects/moove/Moove_header.png',
      '/images/projects/moove/Screen_prez_search.png',
      '/images/projects/moove/search/Moove_header_search.png',
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
    results: [
      { value: '8 sur 10', label: 'Participants capables de terminer l’onboarding sans assistance — objectif de test', kind: 'target' },
      { value: '−30 %', label: 'De temps jusqu’à la première action utile — scénario cible : de 5 min à 3 min 30', kind: 'target' },
    ],
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
    markdownContent: `# Nash Renewables : L'onboarding repensé par la donnée

**Index**
* Le contexte
* Le problème : L'urgence nuit à l'expérience
* Nos principes : Guidage, Clarté, Accessibilité
* Guidage : De la vidéo passive à l'interaction
* Clarté : Nettoyer la navigation
* Accessibilité : Le pivot "Mobile First"
* L'impact : Convaincre en une semaine
* Ce que j'ai appris

**7 avril 2023 — 14 avril 2023 (Sprint d'une semaine à Station F)**

Nash-Renewables est une entreprise spécialisée dans les solutions énergétiques renouvelables. Leur outil SaaS, Nash Dev, automatise et optimise la gestion des parcs photovoltaïques et éoliens. 

Mon rôle lors de ce sprint intensif d'une semaine était de repenser l'expérience utilisateur, et plus particulièrement l'onboarding, pour refléter leur positionnement de leader technologique.

## Le contexte

Nash est une plateforme qui offre des solutions technologiques pour faciliter le fonctionnement et la maintenance des éoliennes et des panneaux solaires. Elle fournit des outils pour surveiller, analyser et optimiser les performances des équipements d'énergie renouvelable.

## Le problème : L'urgence nuit à l'expérience

Par manque de ressources techniques lors du lancement, Nash avait opté pour une solution de facilité : leur "onboarding" se résumait à une simple vidéo explicative. 

L'audit UX que j'ai réalisé a révélé un outil puissant, mais une interface chaotique. Les informations étaient dupliquées, et lorsqu'une fenêtre était fermée, il devenait parfois impossible de retrouver l'information. L'utilisateur était livré à lui-même face à un outil métier complexe.

![Analyse du parcours et des contenus existants](/images/projects/nash/image%202.png)

## Nos principes

Pour ce sprint, j'ai défini trois axes majeurs de conception :
1. **Guidage :** Accompagner l'utilisateur pas à pas, plutôt que de le noyer d'informations.
2. **Clarté :** Éliminer la redondance visuelle (informations dupliquées).
3. **Accessibilité :** S'adapter à la réalité du terrain et aux habitudes de découverte des opérateurs.

![Organisation des parcours étudiés](/images/projects/nash/image%206.png)

## Guidage : De la vidéo passive à l'interaction

Regarder une vidéo n'est pas "apprendre à utiliser un outil". 

J'ai remplacé l'onboarding vidéo par une dénomination claire des étapes directement dans l'interface. L'objectif psychologique est de rendre l'utilisateur acteur de sa découverte en l'invitant à interagir avec la carte et les données dès les premières secondes.

![Proposition pour guider les premiers pas dans le produit](/images/projects/nash/image%208.png)

## Clarté : Nettoyer la navigation

Pour pallier les fenêtres perdues et les données dupliquées, nous avons rationalisé l'architecture de l'information (GUI). 

L'interface a été épurée pour que la donnée (la production d'énergie, la disponibilité des ressources) soit lisible sans effort cognitif inutile.

![Évolution de la navigation de Nash Dev](/images/projects/nash/image.png)

## Accessibilité : Le pivot "Mobile First"

Voici le point de bascule de ce projet. Au départ, nous pensions concevoir pour des écrans de bureau. 

Cependant, j'ai mené des sessions de recherche et lancé un sondage auprès des utilisateurs. Le constat a été sans appel : la majorité des nouveaux clients intéressés par l'outil le consultaient pour la première fois *depuis leur mobile*. 

J'ai donc fait pivoter toute ma stratégie de conception pour adopter une approche "Mobile First".

![Adaptation des écrans sur mobile](/images/projects/nash/image%207.png)

## L'impact : Convaincre en une semaine

En seulement une semaine de conception et de prototypage sur Figma, nous avons livré un parcours utilisateur totalement révisé. 

Le nouvel onboarding garantit que la première impression d'un prospect (qui se fait sur son téléphone) reflète enfin le professionnalisme et l'expertise technique de Nash-Renewables, ce qui n'était pas le cas avec l'ancienne interface.

## Ce que j'ai appris

La donnée utilisateur (UX Research) bat toujours l'intuition. Sans ce sondage rapide nous indiquant l'usage massif du mobile, j'aurais passé ma semaine à concevoir une interface "desktop" inadaptée à la réalité de l'acquisition client. Ce projet m'a prouvé que même dans un sprint extrêmement court, prendre le temps d'interroger les utilisateurs permet de dérisquer tout le processus de design.`,

    images: [
      '/images/projects/nash/Nash_header.png',
      '/images/projects/nash/image 1.png',
      '/images/projects/nash/image 2.png',
      '/images/projects/nash/image 3.png',
      '/images/projects/nash/image 6.png',
      '/images/projects/nash/image 7.png',
      '/images/projects/nash/image 8.png',
      '/images/projects/nash/image 9.png',
      '/images/projects/nash/image 10.png',
      '/images/projects/nash/image 11.png',
      '/images/projects/nash/image.png'
    ]
  },
  {
    id: 'veeton',
    results: [
      { value: '9 sur 10', label: 'Participants capables d’expliquer l’offre et ses possibilités de personnalisation — objectif de test', kind: 'target' },
      { value: '5 %', label: 'Des visiteurs envoyant une demande de démonstration — objectif de conversion', kind: 'target' },
    ],
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

![Étude des codes de la mode et des expériences comparables](/images/projects/veeton/image%201.png)

## Le problème : La technologie sans les codes

La technologie de Veeton était puissante, mais son interface et ses visuels de présentation ne parlaient pas au monde de la mode.

L'audit initial était clair : les visuels de démonstration étaient trop rigides. Pire, les marques (nos utilisateurs) manquaient d'informations cruciales. Elles ne savaient pas si elles pouvaient alimenter le modèle avec de nouvelles poses ou de nouveaux mannequins.

En l'état, l'interface ne rassurait pas. Sans confiance, impossible de convaincre les directeurs artistiques d'adopter l'outil.

![Analyse de la présentation des modèles générés par IA](/images/projects/veeton/image%202.png)

## Nos principes

Pour corriger le tir, notre réflexion s'est articulée autour de trois axes :
1. **Élégance :** L'interface doit s'effacer au profit du vêtement.
2. **Réassurance :** Démystifier l'IA en montrant le contrôle utilisateur.
3. **Scalabilité :** Prouver que l'outil gère des collections entières, pas juste une photo.

![Synthèse des pistes de design explorées](/images/projects/veeton/image%204.png)

## Élégance : Adopter les codes du luxe

J'ai analysé les concurrents (Lalaland, Vmake AI, Botika) et les sites de mode haut de gamme. Les règles sont strictes :
* L'accent est mis sur l'image.
* Les couleurs sont majoritairement noir et blanc.
* Les typographies sont sans empattement (sans serif).

En adoptant ces codes, nous avons créé une interface qui utilise un wording valorisant et un design minimaliste. L'outil Veeton n'a plus l'air d'un logiciel SaaS complexe, mais d'une véritable plateforme créative.

![Direction visuelle et écrans de Veeton](/images/projects/veeton/image.png)

## Réassurance : Comprendre la boîte noire

Une Directrice Artistique comme notre persona "Camille" a besoin d'optimiser ses cycles de création, mais elle refuse de perdre le contrôle.

Nous avons revu le parcours utilisateur pour intégrer des interactions fluides démontrant la flexibilité du modèle. L'interface montre explicitement comment changer les poses ou ajuster les mannequins.

Cette transparence transforme l'IA : elle passe d'une "boîte noire intimidante" à un véritable assistant de création sur-mesure.

![Structure et parcours des écrans envisagés](/images/projects/veeton/image%205.png)

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
    results: [
      { value: '8 sur 10', label: 'Participants capables de trouver et d’interpréter une donnée sportive sans aide — objectif de test', kind: 'target' },
      { value: '−40 %', label: 'De temps pour accéder à une information clé — scénario cible : de 2 min à 1 min 12', kind: 'target' },
    ],
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

![Interface d’analyse sportive étudiée](/images/projects/rakoono/image.png)

## La découverte

Cette phase a consisté en l'organisation de sessions de brainstorming pour explorer comment l'IA de Rakoono peut aider les coachs et recruteurs dans leur quotidien. Nous avons mené des études de marché et démarqué les concurrents potentiels pour comprendre les besoins des équipes de football en matière d'analyse de données sportives.

![Analyse des mécaniques de récompense](/images/projects/rakoono/image%202.png)
![Analyse des parcours et retours utilisateurs](/images/projects/rakoono/image%203.png)

## La stratégie

Cette phase a consisté à définir les fonctionnalités clés et l'architecture de l'information. Nous avons créé des user stories et des parcours utilisateurs pour guider le développement.

![Pistes de gamification identifiées](/images/projects/rakoono/image%205.png)

## La solution : Gamification et engagement

Nous avons défini des parcours utilisateurs et la production de maquettes détaillées. Nous avons intégré des éléments de gamification tels que des systèmes de récompenses, des défis quotidiens et des progressions de niveaux pour rendre l'expérience utilisateur plus engageante.

Interface dédiée aux coachs et recruteurs avec visualisation des données sportives et outils d'analyse.

![Écrans de la solution Rakoono](/images/projects/rakoono/image%204.png)
![Explorations de l’interface Rakoono](/images/projects/rakoono/image%207.png)

## Livrables

Prototype interactif sur Figma démontrant l'expérience utilisateur complète.`,
    images: [
      '/images/projects/rakoono/Miniature_Rakoono.png',
      '/images/projects/rakoono/image 1.png',
      '/images/projects/rakoono/image 2.png',
      '/images/projects/rakoono/image 3.png',
      '/images/projects/rakoono/image 4.png',
      '/images/projects/rakoono/image 5.png',
      '/images/projects/rakoono/image 6.png',
      '/images/projects/rakoono/image 7.png',
      '/images/projects/rakoono/image.png'
    ]
  }
];

export const otherProjects: Project[] = [];

export const allProjects: Project[] = [...uxUiProjects, ...otherProjects];
