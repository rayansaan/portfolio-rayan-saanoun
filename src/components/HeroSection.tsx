import { ChevronDown } from 'lucide-react';

export function HeroSection() {
  const scrollToProjects = () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="w-full h-[70vh] flex flex-col justify-center px-4 sm:px-6 lg:px-32 xl:px-48">
      <div className="max-w-none">
        {/* Name */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-medium tracking-tight mb-6">
          Rayan Saanoun
        </h1>
        
        {/* Tagline */}
        <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground max-w-2xl leading-relaxed">
          Concevoir des expériences digitales où la complexité s'efface pour laisser place à l'intuitif.
        </p>
      </div>
      
      {/* Scroll indicator */}
      <div className="mt-auto pb-8">
        <button 
          onClick={scrollToProjects}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 group"
          aria-label="Voir mes projets"
        >
          <span>Découvrir mes projets</span>
          <ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform duration-300" />
        </button>
      </div>
    </section>
  );
}
