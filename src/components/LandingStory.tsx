import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { LogoCarousel } from './LogoCarousel';
import './landing.css';

const services = [
  ['01', 'Product design', 'Comprendre les usages, simplifier les parcours et concevoir des interfaces utiles. De la recherche utilisateur au prototype, je relie les besoins aux décisions de design.'],
  ['02', 'Branding', 'Donner une direction et une cohérence visuelle à une marque. Une identité pensée pour son public, puis déclinée sur ses points de contact.'],
  ['03', 'Photographie', 'Observer les détails, travailler la lumière et raconter autrement. Un regard personnel que je développe à travers les portraits, les voitures et les voyages.'],
];
const steps = [
  ['Écouter', 'Comprendre le contexte, les personnes et ce qui bloque aujourd’hui. Poser les bonnes questions avant de dessiner.'],
  ['Cadrer', 'Croiser les observations, préciser le problème et choisir les priorités avec l’équipe.'],
  ['Concevoir', 'Explorer plusieurs pistes, structurer les parcours et donner forme aux idées dans des prototypes.'],
  ['Éprouver', 'Confronter les propositions aux utilisateurs et aux contraintes réelles. Ajuster ce qui ne fonctionne pas.'],
  ['Accompagner', 'Préparer la livraison avec les développeurs et faire évoluer le produit à partir des retours.'],
];

export function LandingIntroduction() {
  return <>
    <section id="qui-je-suis" className="landing-shell landing-section landing-about" aria-labelledby="intro-title">
      <div className="landing-about-portrait"><img src="/images/profile/portrait-rayan-portfolio.png" alt="Rayan Saanoun" loading="lazy" className="mask-gradient-portrait" /></div>
      <div>
        <p className="landing-label">01 / Qui je suis</p>
        <h2 id="intro-title">Un regard curieux.<br />Une approche concrète.</h2>
        <p>Je suis Rayan, Product Designer basé à Bordeaux. J’allie UX/UI design, approche centrée utilisateur et design systems pour rendre les produits plus compréhensibles.</p>
        <p>De l’aviation d’affaires à la mode et aux énergies renouvelables, j’aime comprendre des univers différents et travailler avec les équipes pour traduire leur complexité en expériences claires.</p>
        <Link to="/about" className="landing-text-link">En savoir plus sur mon parcours <ArrowUpRight size={16} aria-hidden="true" /></Link>
      </div>
    </section>
    <section className="landing-shell landing-section" aria-labelledby="services-title">
      <p className="landing-label">02 / Ce que je fais</p>
      <h2 id="services-title" className="landing-section-title">Trois façons de<br />donner forme aux idées.</h2>
      <div className="landing-services">{services.map(([number, title, text]) => <article key={number}><span className="landing-label">{number}</span><h3>{title}</h3><p>{text}</p></article>)}</div>
      <div className="landing-trust"><p className="landing-label">Des équipes avec lesquelles j’ai travaillé</p><LogoCarousel /></div>
    </section>
  </>;
}

export function LandingProcess() {
  return <section id="process" className="landing-shell landing-section" aria-labelledby="process-title">
    <div className="landing-process-heading"><div><p className="landing-label">04 / Mon process</p><h2 id="process-title" className="landing-section-title">Avancer avec méthode.<br />Garder l’esprit ouvert.</h2></div><p>Un cadre qui s’adapte au projet, aux contraintes et aux retours du terrain.</p></div>
    <ol className="landing-process">{steps.map(([title, text], index) => <li key={title}><span className="landing-label">0{index + 1}</span><h3>{title}</h3><p>{text}</p></li>)}</ol>
  </section>;
}

export function LandingContact() {
  const ref = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] });
  const y = useTransform(scrollYProgress, [0.15, 0.8], [65, 0]);
  const opacity = useTransform(scrollYProgress, [0.1, 0.65], [0.25, 1]);
  return <section ref={ref} id="contact" className="landing-contact" aria-labelledby="contact-title">
    <div className="landing-contact-sticky">
      <motion.div className="landing-shell" style={reducedMotion ? undefined : { y, opacity }}>
        <p className="landing-label">La suite commence par une conversation</p>
        <h2 id="contact-title">Une idée en tête ?<br />Donnons-lui forme.</h2>
        <a className="landing-button" href="mailto:rayansaan.pro@gmail.com">Me contacter <ArrowUpRight size={18} aria-hidden="true" /></a>
        <a className="landing-contact-email" href="mailto:rayansaan.pro@gmail.com">rayansaan.pro@gmail.com</a>
      </motion.div>
    </div>
  </section>;
}
