import type { ReactNode } from 'react';
import { motion, type Variants } from 'framer-motion';
import {
  ArrowUpRight,
  BriefcaseBusiness,
  Download,
  Linkedin,
  Mail,
  MapPin,
} from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import './About.css';

const experiences = [
  {
    title: 'Product Designer',
    company: 'Moove',
    period: '2022 — 2024',
  },
  {
    title: 'Designer OPS',
    company: 'Cdiscount',
    period: '2024',
  },
  {
    title: 'UX/UI Designer',
    company: 'Nash, Veeton & Rakoono',
    period: '2023 — 2024',
  },
];

interface StackPill {
  name: string;
  dropX: number;
  startRotate: number;
  restRotate: number;
}

const stackRows: Array<{ className: string; delay: number; tools: StackPill[] }> = [
  {
    className: 'about-stack-row-base',
    delay: 0.08,
    tools: [
      { name: 'Figma', dropX: -28, startRotate: -16, restRotate: -3 },
      { name: 'Notion', dropX: 22, startRotate: 13, restRotate: 2 },
      { name: 'Webflow', dropX: -16, startRotate: -11, restRotate: -2 },
      { name: 'Bubble.io', dropX: 30, startRotate: 17, restRotate: 3 },
    ],
  },
  {
    className: 'about-stack-row-top',
    delay: 0.52,
    tools: [
      { name: 'FigJam', dropX: 24, startRotate: 15, restRotate: 3 },
      { name: 'Miro', dropX: -22, startRotate: -14, restRotate: -2 },
      { name: 'Maze', dropX: 18, startRotate: 12, restRotate: 2 },
      { name: 'Jira', dropX: -18, startRotate: -12, restRotate: -3 },
    ],
  },
];

const tools = stackRows.flatMap((row) => row.tools.map((tool) => tool.name));

const skills = [
  'UX Research',
  'UX/UI Design',
  'Product Strategy',
  'Prototyping',
  'Design System',
  'Design Ops',
  'User Testing',
  'Workshops',
];

const companies = [
  { name: 'Cdiscount', src: '/logos/carousel/C discount.svg' },
  { name: 'Michelin', src: '/logos/carousel/Michelin.svg' },
  { name: 'Moove', src: '/logos/carousel/moove.svg' },
  { name: 'Nash', src: '/logos/carousel/Nash.svg' },
  { name: 'Rakoono', src: '/logos/carousel/Rakoono.svg' },
  { name: 'Veeton', src: '/logos/carousel/Veeton.svg' },
];

interface CardOrigin {
  x?: number;
  y?: number;
  rotate?: number;
  delay?: number;
}

const cardVariants: Variants = {
  hidden: (origin: CardOrigin = {}) => ({
    opacity: 0,
    x: origin.x ?? 0,
    y: origin.y ?? 28,
    rotate: origin.rotate ?? 0,
    scale: 0.96,
    filter: 'blur(10px)',
  }),
  visible: (origin: CardOrigin = {}) => ({
    opacity: 1,
    x: 0,
    y: 0,
    rotate: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      type: 'spring',
      stiffness: 115,
      damping: 18,
      mass: 0.82,
      delay: origin.delay ?? 0,
      opacity: { duration: 0.45, delay: origin.delay ?? 0 },
      filter: { duration: 0.5, delay: origin.delay ?? 0 },
      delayChildren: 0.22,
      staggerChildren: 0.07,
    },
  }),
};

const revealVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const listVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const stackPileVariants: Variants = {
  hidden: {},
  visible: {},
};

const stackRowVariants: Variants = {
  hidden: {},
  visible: (delay = 0) => ({
    transition: {
      delayChildren: delay,
      staggerChildren: 0.11,
    },
  }),
};

const stackPillVariants: Variants = {
  hidden: (tool: StackPill) => ({
    opacity: 0,
    x: tool.dropX,
    y: -150,
    rotate: tool.startRotate,
    scale: 0.92,
  }),
  visible: (tool: StackPill) => ({
    opacity: 1,
    x: 0,
    y: 0,
    rotate: tool.restRotate,
    scale: 1,
    transition: {
      opacity: { duration: 0.12 },
      x: { type: 'spring', stiffness: 150, damping: 14, mass: 0.72 },
      y: { type: 'spring', stiffness: 185, damping: 13, mass: 0.78 },
      rotate: { type: 'spring', stiffness: 145, damping: 12, mass: 0.7 },
      scale: { type: 'spring', stiffness: 180, damping: 15, mass: 0.72 },
    },
  }),
};

const cardMotion = (origin: CardOrigin) => ({
  custom: origin,
  variants: cardVariants,
  initial: 'hidden' as const,
  whileInView: 'visible' as const,
  viewport: { once: true, amount: 0.2 },
});

function CardLabel({ children }: { children: ReactNode }) {
  return <motion.p variants={revealVariants} className="about-card-label">{children}</motion.p>;
}

export function About() {
  return (
    <div className="min-h-screen">
      <Header />

      <main className="about-page">
        <section className="about-bento" aria-label="À propos de Rayan Saanoun">
          <motion.article
            className="about-card about-profile-card"
            {...cardMotion({ x: -34, y: 24, rotate: -1.2 })}
          >
            <div className="about-profile-copy">
              <CardLabel>About me</CardLabel>
              <motion.h1 variants={revealVariants}>Rayan Saanoun</motion.h1>
              <motion.p variants={revealVariants} className="about-profile-role">
                Product Designer
              </motion.p>
              <motion.p variants={revealVariants} className="about-profile-bio">
                Je transforme des sujets complexes en expériences digitales simples, utiles et alignées avec les
                objectifs business.
              </motion.p>
              <motion.div variants={revealVariants} className="about-location">
                <MapPin aria-hidden="true" />
                Bordeaux, France
              </motion.div>
            </div>
            <motion.img
              variants={{
                hidden: { opacity: 0, y: 70, scale: 0.9 },
                visible: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
                },
              }}
              src="/images/profile/portrait-rayan-portfolio.png"
              alt="Portrait de Rayan Saanoun"
              className="about-profile-portrait"
              decoding="async"
            />
          </motion.article>

          <motion.a
            href="mailto:rayansaan.pro@gmail.com"
            className="about-card about-availability-card about-interactive-card"
            aria-label="Rayan est disponible, envoyer un e-mail"
            {...cardMotion({ x: 30, y: -18, rotate: 1, delay: 0.08 })}
          >
            <motion.div variants={revealVariants} className="about-availability-status">
              <span className="about-availability-dot" aria-hidden="true">
                <span />
              </span>
              <span>Available</span>
            </motion.div>
            <motion.p variants={revealVariants}>Pour des missions Product Design</motion.p>
            <ArrowUpRight className="about-card-arrow" aria-hidden="true" />
          </motion.a>

          <motion.a
            href="https://www.linkedin.com/in/rayan-saanoun-72baa4146/"
            target="_blank"
            rel="noopener noreferrer"
            className="about-card about-linkedin-card about-interactive-card"
            aria-label="Voir le profil LinkedIn de Rayan Saanoun"
            {...cardMotion({ x: 24, y: 24, rotate: -0.8, delay: 0.14 })}
          >
            <motion.div variants={revealVariants} className="about-linkedin-content">
              <Linkedin aria-hidden="true" />
              <span>LinkedIn</span>
            </motion.div>
            <ArrowUpRight className="about-card-arrow" aria-hidden="true" />
          </motion.a>

          <motion.article
            className="about-card about-years-card"
            {...cardMotion({ x: 28, y: 26, rotate: 1.1, delay: 0.18 })}
          >
            <motion.strong variants={revealVariants}>4+</motion.strong>
            <motion.span variants={revealVariants}>années d’expérience</motion.span>
          </motion.article>

          <motion.article
            className="about-card about-statement-card"
            {...cardMotion({ x: -28, y: 36, rotate: 0.8 })}
          >
            <CardLabel>Mon approche</CardLabel>
            <motion.h2 variants={revealVariants}>
              Transformer la complexité en produits <span>simples et utiles.</span>
            </motion.h2>
            <motion.div variants={listVariants} className="about-approach-steps" aria-label="Recherche, stratégie et design">
              {['Recherche', 'Stratégie', 'Design'].map((step, index) => (
                <motion.span variants={revealVariants} key={step}>
                  <i>{String(index + 1).padStart(2, '0')}</i>
                  {step}
                </motion.span>
              ))}
            </motion.div>
          </motion.article>

          <motion.article
            className="about-card about-experience-card"
            {...cardMotion({ x: 32, y: 30, rotate: -1 })}
          >
            <div className="about-card-heading">
              <CardLabel>Expérience</CardLabel>
              <BriefcaseBusiness aria-hidden="true" />
            </div>
            <motion.ul variants={listVariants} className="about-experience-list">
              {experiences.map((experience) => (
                <motion.li variants={revealVariants} key={`${experience.company}-${experience.title}`}>
                  <div>
                    <strong>{experience.title}</strong>
                    <span>{experience.company}</span>
                  </div>
                  <time>{experience.period}</time>
                </motion.li>
              ))}
            </motion.ul>
          </motion.article>

          <motion.article
            className="about-card about-stack-card"
            {...cardMotion({ x: -20, y: 28, rotate: -0.5 })}
          >
            <CardLabel>Stack</CardLabel>
            <span className="sr-only">{tools.join(', ')}</span>
            <motion.div
              className="about-stack-gravity"
              variants={stackPileVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.7 }}
              aria-hidden="true"
            >
              {stackRows.map((row) => (
                <motion.div
                  className={`about-stack-row ${row.className}`}
                  custom={row.delay}
                  variants={stackRowVariants}
                  key={row.className}
                >
                  {row.tools.map((tool) => (
                    <motion.span
                      className="about-pill about-stack-pill"
                      custom={tool}
                      variants={stackPillVariants}
                      key={tool.name}
                    >
                      {tool.name}
                    </motion.span>
                  ))}
                </motion.div>
              ))}
            </motion.div>
          </motion.article>

          <motion.a
            href="/cv/CV-Rayan-Saanoun-2026.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="about-card about-cv-card about-interactive-card"
            aria-label="Ouvrir le CV de Rayan Saanoun"
            {...cardMotion({ x: -28, y: 38, rotate: 1 })}
          >
            <div className="about-card-heading">
              <CardLabel>Mon parcours</CardLabel>
              <Download aria-hidden="true" />
            </div>
            <motion.div variants={revealVariants} className="about-cv-copy">
              <h2>Voir mon CV</h2>
              <p>Expériences, formation et compétences</p>
            </motion.div>
            <motion.div variants={revealVariants} className="about-cv-paper" aria-hidden="true">
              <div className="about-cv-paper-head">
                <span>RS</span>
                <div>
                  <strong>Rayan Saanoun</strong>
                  <small>Product Designer</small>
                </div>
              </div>
              <div className="about-cv-paper-rule" />
              <small>EXPÉRIENCE</small>
              <div className="about-cv-paper-line about-cv-paper-line-long" />
              <div className="about-cv-paper-line" />
              <div className="about-cv-paper-line about-cv-paper-line-short" />
            </motion.div>
          </motion.a>

          <motion.article
            className="about-card about-companies-card"
            {...cardMotion({ x: 30, y: 26, rotate: -0.6, delay: 0.06 })}
          >
            <CardLabel>Collaborations</CardLabel>
            <span className="sr-only">{companies.map((company) => company.name).join(', ')}</span>
            <motion.div variants={revealVariants} className="about-marquee about-company-marquee" aria-hidden="true">
              <div className="about-marquee-track about-companies-track">
                {[...companies, ...companies].map((company, index) => (
                  <span className="about-company-logo" key={`${company.name}-${index}`}>
                    <img src={company.src} alt="" decoding="async" />
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.article>

          <motion.article
            className="about-card about-skills-card"
            {...cardMotion({ x: 26, y: 34, rotate: 0.7, delay: 0.1 })}
          >
            <CardLabel>Compétences</CardLabel>
            <motion.div variants={listVariants} className="about-skills-list">
              {skills.map((skill) => (
                <motion.span variants={revealVariants} className="about-pill" key={skill}>{skill}</motion.span>
              ))}
            </motion.div>
          </motion.article>

          <motion.a
            href="mailto:rayansaan.pro@gmail.com"
            className="about-card about-contact-card about-interactive-card"
            {...cardMotion({ y: 36, rotate: -0.5 })}
          >
            <motion.div variants={revealVariants} className="about-contact-icon">
              <Mail aria-hidden="true" />
            </motion.div>
            <motion.div variants={revealVariants}>
              <CardLabel>Contact</CardLabel>
              <h2>Un projet en tête ? Parlons-en.</h2>
            </motion.div>
            <ArrowUpRight className="about-contact-arrow" aria-hidden="true" />
          </motion.a>
        </section>
      </main>

      <Footer />
    </div>
  );
}
