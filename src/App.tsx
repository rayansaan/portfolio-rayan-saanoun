import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { ProjectSection } from '@/components/ProjectSection';
import { Footer } from '@/components/Footer';
import { CursorFollowImage } from '@/components/CursorFollowImage';
import { HoverImageProvider } from '@/context/HoverImageContext';
import { CustomCursor } from '@/components/CustomCursor';
import { LenisProvider } from '@/context/LenisContext';
import { ProjectDetail } from '@/pages/ProjectDetail';
import { About } from '@/pages/About';
import { uxUiProjects, otherProjects } from '@/data/projects';

function HomePage() {
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0 && !hasScrolled) {
        setHasScrolled(true);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [hasScrolled]);

  return (
    <div className="min-h-screen">
      {/* Cursor follow image */}
      <CursorFollowImage />
      
      {/* Header */}
      <Header />
      
      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <HeroSection />
        
        {/* Projects Sections - appear after first scroll */}
        <div id="projects">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: hasScrolled ? 1 : 0, 
              y: hasScrolled ? 0 : 20 
            }}
            transition={{ duration: 0.6 }}
            style={{ visibility: hasScrolled ? 'visible' : 'hidden' }}
          >
            {/* UX/UI Design Section */}
            <ProjectSection 
              title="UX/UI Design" 
              projects={uxUiProjects} 
            />
            
            {/* Other Projects Section */}
            <ProjectSection 
              title="Autres Projets" 
              projects={otherProjects}
            />
          </motion.div>
        </div>
        
        {/* Footer */}
        <Footer />
      </main>
    </div>
  );
}

function App() {
  return (
    <HoverImageProvider>
      <LenisProvider>
        <CustomCursor />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<About />} />
            <Route path="/project/:id" element={<ProjectDetail />} />
          </Routes>
        </BrowserRouter>
      </LenisProvider>
    </HoverImageProvider>
  );
}

export default App;
