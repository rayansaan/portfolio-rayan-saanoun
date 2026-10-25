import { Link } from 'react-router-dom';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

export function HeroSection() {
  return (
    <section className="landing-hero landing-shell" aria-labelledby="landing-title">
      <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
        <p className="landing-label">Product Designer · Bordeaux</p>
        <h1 id="landing-title">Rayan<br /><span>Saanoun.</span></h1>
        <div className="landing-hero-bottom">
          <div>
            <p>Je transforme des parcours complexes en interfaces claires, de la recherche utilisateur à la conception du produit.</p>
            <p className="landing-hero-secondary">Je développe aussi des identités visuelles et un regard photographique personnel.</p>
          </div>
          <div className="landing-hero-actions">
            <a className="landing-button" href="mailto:rayansaan.pro@gmail.com">Parlons de ton projet <ArrowUpRight size={18} aria-hidden="true" /></a>
            <Link className="landing-text-link" to="/#projects">Voir mes projets <ArrowDown size={16} aria-hidden="true" /></Link>
          </div>
        </div>
        <Link className="landing-proof" to="/project/moove">
          <span className="landing-proof-image"><img src="/images/projects/moove/Screen_prez_search.png" alt="Interface de recherche Moove" decoding="async" /></span>
          <span><span className="landing-label">Un aperçu de mon travail</span><strong>Moove — de la recherche au déploiement</strong><span>16 mois sur un produit de l’aviation d’affaires</span></span>
          <ArrowUpRight size={20} aria-hidden="true" />
        </Link>
      </motion.div>
      <a className="landing-discover" href="#qui-je-suis">Découvrir mon parcours <ArrowDown size={16} aria-hidden="true" /></a>
    </section>
  );
}
