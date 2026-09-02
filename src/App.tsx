import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { lazy, Suspense, useState, useEffect } from 'react';
import { motion, MotionConfig } from 'framer-motion';
import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { ProjectSection } from '@/components/ProjectSection';
import { Footer } from '@/components/Footer';
import { CursorFollowImage } from '@/components/CursorFollowImage';
import { HoverImageProvider } from '@/context/HoverImageContext';
import { CustomCursor } from '@/components/CustomCursor';
import { LenisProvider } from '@/context/LenisContext';
import { uxUiProjects, otherProjects } from '@/data/projects';

const ProjectDetail = lazy(() => import('@/pages/ProjectDetail').then((module) => ({ default: module.ProjectDetail })));
const About = lazy(() => import('@/pages/About').then((module) => ({ default: module.About })));

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
            
            {otherProjects.length > 0 && (
              <ProjectSection
                title="Autres Projets"
                projects={otherProjects}
              />
            )}
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
    <MotionConfig reducedMotion="user">
      <HoverImageProvider>
        <LenisProvider>
          <CustomCursor />
          <BrowserRouter>
            <Suspense fallback={<div className="min-h-screen" aria-hidden="true" />}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<About />} />
                <Route path="/project/:id" element={<ProjectDetail />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </LenisProvider>
      </HoverImageProvider>
    </MotionConfig>
  );
}

export default App;
