import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { LogoCarousel } from './LogoCarousel';
import './landing.css';

const services = [
  { number: '01', title: 'Design de produit', text: 'Recherche utilisateur, architecture des parcours, interfaces et prototypes. Je conçois avec les équipes produit et accompagne la mise en œuvre avec les développeurs.', href: '/project/moove', link: 'Voir le projet Moove' },
  { number: '02', title: 'Identité visuelle', text: 'Direction visuelle, typographie et déclinaisons digitales. Je construis une identité cohérente avec le positionnement de la marque et les attentes de son public.', href: '/project/veeton', link: 'Découvrir Veeton' },
  { number: '03', title: 'Photographie', text: 'Portraits, voitures et voyages : une pratique personnelle pour explorer la lumière, la composition et les détails. Un autre regard qui nourrit mon travail de designer.', href: '/#explorations', link: 'Explorer mes photographies' },
];
const steps = [
  ['Comprendre', 'Recueillir les besoins à travers les entretiens, l’observation des parcours et l’analyse des contraintes.', 'Des observations et des besoins identifiés'],
  ['Cadrer', 'Partager les enseignements avec l’équipe, préciser le problème à résoudre et choisir les priorités.', 'Un problème prioritaire et des critères de réussite'],
  ['Concevoir', 'Explorer les parcours et les pistes d’interface, puis donner forme aux propositions pour pouvoir les discuter.', 'Des parcours, des wireframes et un prototype'],
  ['Tester et ajuster', 'Confronter les propositions aux utilisateurs et aux contraintes techniques. Revoir les décisions à partir des retours.', 'Des retours et des pistes d’amélioration'],
  ['Accompagner', 'Préparer la livraison avec les développeurs et suivre les retours après la mise en ligne.', 'Une livraison documentée et des évolutions à prioriser'],
];

export function LandingIntroduction() {
  return <>
    <section id="qui-je-suis" className="landing-shell landing-section landing-about" aria-labelledby="intro-title">
      <div className="landing-about-portrait"><img src="/images/profile/portrait-rayan-portfolio.png" alt="Rayan Saanoun" loading="lazy" className="mask-gradient-portrait" /></div>
      <div>
        <h2 id="intro-title" className="landing-label">01 / Qui je suis</h2>
        <p>Chez Moove, j’ai travaillé pendant 2 ans sur la recherche et la comparaison de trajets dans l’aviation d’affaires, de la compréhension des besoins à l’accompagnement du déploiement.</p>
        <p>Chez Cdiscount, en Design Ops, j’ai contribué à formaliser les façons de travailler des équipes à travers des handbooks et des ateliers. Ces expériences m’ont appris à concevoir l’interface tout en prenant soin de la collaboration qui la rend possible.</p>
        <Link to="/about" className="landing-text-link">En savoir plus sur mon parcours <ArrowUpRight size={16} aria-hidden="true" /></Link>
      </div>
    </section>
    <section className="landing-shell landing-section" aria-labelledby="services-title">
      <p className="landing-label">02 / Ce que je fais</p>
      <h2 id="services-title" className="landing-section-title">Trois façons de<br />donner forme aux idées.</h2>
      <div className="landing-services">{services.map(({ number, title, text, href, link }) => <article key={number}><span className="landing-label">{number}</span><h3>{title}</h3><p>{text}</p><Link className="landing-text-link" to={href}>{link} <ArrowUpRight size={16} aria-hidden="true" /></Link></article>)}</div>
      <div className="landing-trust"><p className="landing-label">Des équipes avec lesquelles j’ai travaillé</p><LogoCarousel compact /></div>
    </section>
  </>;
}

export function LandingProcess() {
  return <section id="process" className="landing-shell landing-section" aria-labelledby="process-title">
    <div className="landing-process-heading"><div><p className="landing-label">04 / Ma démarche en Product Design</p><h2 id="process-title" className="landing-section-title">Une méthode pour avancer.<br />Des retours pour ajuster.</h2></div><p>Un cadre qui s’adapte au projet, aux contraintes et aux retours du terrain.</p></div>
    <ol className="landing-process">{steps.map(([title, text, output], index) => <li key={title}><span className="landing-label">0{index + 1}</span><h3>{title}</h3><div><p>{text}</p><p className="landing-process-output">{output}</p></div></li>)}</ol>
  </section>;
}

export function LandingContact() {
  const ref = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] });
  const y = useTransform(scrollYProgress, [0.15, 0.8], [18, 0]);

  return <section ref={ref} id="contact" className="landing-contact" aria-labelledby="contact-title">
    <div className="landing-contact-sticky">
      <div className="landing-shell">
        <p className="landing-label">La suite commence par une conversation</p>
        <motion.h2 id="contact-title" style={reducedMotion ? undefined : { y }}>Un produit à faire évoluer ?<br />Parlons-en.</motion.h2>
        <a className="landing-button" href="mailto:rayansaan.pro@gmail.com">Me contacter <ArrowUpRight size={18} aria-hidden="true" /></a>
        <a className="landing-contact-email" href="mailto:rayansaan.pro@gmail.com">rayansaan.pro@gmail.com</a>
      </div>
    </div>
  </section>;
}
