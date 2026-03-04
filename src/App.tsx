
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from '@/components/Header';
import { ProjectSection } from '@/components/ProjectSection';
import { InfoSection } from '@/components/InfoSection';
import { Footer } from '@/components/Footer';
import { CursorFollowImage } from '@/components/CursorFollowImage';
import { HoverImageProvider } from '@/context/HoverImageContext';
import { CustomCursor } from '@/components/CustomCursor';
import { LenisProvider } from '@/context/LenisContext';
import { ProjectDetail } from '@/pages/ProjectDetail';
import { uxUiProjects, otherProjects } from '@/data/projects';

function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Cursor follow image */}
      <CursorFollowImage />
      
      {/* Header */}
      <Header />
      
      {/* Main Content */}
      <main>
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
        
        {/* Info Section */}
        <InfoSection />
        
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
            <Route path="/project/:id" element={<ProjectDetail />} />
          </Routes>
        </BrowserRouter>
      </LenisProvider>
    </HoverImageProvider>
  );
}

export default App;
