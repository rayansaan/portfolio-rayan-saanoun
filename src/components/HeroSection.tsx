import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

export function HeroSection() {
  return (
    <section className="landing-hero landing-shell" aria-labelledby="landing-title">
      <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
        <p className="landing-label">Product Designer · Bordeaux</p>
        <h1 id="landing-title">Rayan Saanoun</h1>
        <div className="landing-hero-bottom">
          <div>
            <p>Je transforme des parcours complexes en interfaces claires, de la recherche utilisateur à la conception du produit.</p>
            <p className="landing-hero-secondary">Je développe aussi des identités visuelles et un regard photographique personnel.</p>
          </div>
          <div className="landing-hero-actions">
            <a className="landing-button" href="mailto:rayansaan.pro@gmail.com">Me contacter <ArrowUpRight size={18} aria-hidden="true" /></a>
          </div>
        </div>
      </motion.div>
      <a className="landing-discover" href="#qui-je-suis">Découvrir mon parcours <ArrowDown size={16} aria-hidden="true" /></a>
    </section>
  );
}
