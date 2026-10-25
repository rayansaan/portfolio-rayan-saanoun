import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

export function HeroSection() {
  return (
    <section className="landing-hero landing-shell" aria-labelledby="landing-title">
      <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
        <p className="landing-label">Product design · Branding · Photographie</p>
        <h1 id="landing-title">Rayan<br /><span>Saanoun.</span></h1>
        <div className="landing-hero-bottom">
          <p>Je conçois des produits clairs, des identités qui ont du sens et des images qui racontent une histoire.</p>
          <a className="landing-button" href="mailto:rayansaan.pro@gmail.com">Parlons de ton projet <ArrowUpRight size={18} aria-hidden="true" /></a>
        </div>
      </motion.div>
      <a className="landing-discover" href="#qui-je-suis">Découvrir mon univers <ArrowDown size={16} aria-hidden="true" /></a>
    </section>
  );
}
