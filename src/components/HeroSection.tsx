import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useLenis } from '@/context/LenisContext';
import { useIsMobile } from '@/hooks/use-mobile';
import { LogoCarousel } from './LogoCarousel';

export function HeroSection() {
  const { lenis } = useLenis();
  const isMobile = useIsMobile();

  const scrollToProjects = () => {
    if (lenis) {
      lenis.scrollTo('#projects', {
        offset: isMobile ? -50 : -100,
        duration: 1.5,
      });
    } else {
      const projectsSection = document.getElementById('projects');
      if (projectsSection) {
        const offset = isMobile ? 50 : 100;
        const elementPosition = projectsSection.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  };

  return (
    <section className="w-full h-[85vh] flex flex-col items-center justify-center px-4 sm:px-6 lg:px-32 xl:px-48 overflow-hidden">
      <div className="flex flex-col items-center text-center gap-6 sm:gap-8">
        {/* Portrait */}
        <motion.img
          src="/images/profile/portrait-rayan-portfolio.png"
          alt="Portrait de Rayan Saanoun"
          className="w-56 h-auto mask-gradient-portrait"
          initial={{ opacity: 0, y: 20, filter: "blur(15px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />

        {/* Name */}
        <motion.h1
          className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-medium tracking-tight"
          initial={{ opacity: 0, y: 20, filter: "blur(15px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          Rayan Saanoun
        </motion.h1>
        
        {/* Tagline */}
        <motion.p
          className="text-lg sm:text-xl lg:text-2xl text-muted-foreground max-w-xl leading-relaxed"
          initial={{ opacity: 0, y: 20, filter: "blur(15px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        >
          Concevoir des expériences digitales où la complexité s'efface pour laisser place à l'intuitif.
        </motion.p>
        
        {/* Logo Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 20, filter: "blur(15px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
          className="w-full"
        >
          <LogoCarousel />
        </motion.div>
        
        {/* Scroll indicator */}
        <motion.button
          onClick={scrollToProjects}
          className="flex items-center gap-2 text-base text-muted-foreground hover:text-foreground transition-colors duration-300 group mt-4"
          aria-label="Voir mes projets"
          initial={{ opacity: 0, y: 20, filter: "blur(15px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
        >
          <span>Découvrir mes projets</span>
          <ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform duration-300" />
        </motion.button>
      </div>
    </section>
  );
}
