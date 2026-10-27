import { useState, useEffect, useMemo, useRef, useCallback, memo, type RefObject } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ArrowUpRight, ExternalLink } from 'lucide-react';
import ReactMarkdown, { type Components } from 'react-markdown';
import { allProjects } from '@/data/projects';
import { projectImageSizes } from '@/data/projectImageSizes';
import { GSAPFlipLightbox } from '@/components/GSAPFlipLightbox';
import { generateStandardImageId } from '@/utils/generateId';
import type { ImageDescription, ProjectResult, Project } from '@/types';

// Composant Table des matières
function TableOfContents({ content }: { content: string }) {
  const [activeId, setActiveId] = useState<string>('');
  const pendingHeadingRef = useRef<string | null>(null);
  const pendingTimeoutRef = useRef<number | null>(null);
  
  // Extraire les titres H2 du markdown
  const headings = useMemo(() => content.split('\n')
    .filter(line => line.startsWith('## '))
    .map(line => {
      const title = line.replace('## ', '').trim();
      const id = title.toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
      return { title, id };
    }), [content]);

  // Garder l'index synchronisé avec la section réellement visible.
  useEffect(() => {
    const updateActiveHeading = () => {
      const elements = headings
        .map(({ id }) => document.getElementById(id))
        .filter((element): element is HTMLElement => element !== null);

      if (elements.length === 0) return;

      const activationLine = 120;
      const isAtPageBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;

      if (pendingHeadingRef.current) {
        const pendingElement = document.getElementById(pendingHeadingRef.current);
        const hasReachedTarget = pendingElement
          ? Math.abs(pendingElement.getBoundingClientRect().top - activationLine) <= 8
          : true;

        if (!hasReachedTarget && !isAtPageBottom) return;
        pendingHeadingRef.current = null;
      }

      if (isAtPageBottom) {
        setActiveId(elements[elements.length - 1].id);
        return;
      }

      const current = elements.reduce((active, element) =>
        element.getBoundingClientRect().top <= activationLine ? element : active
      , elements[0]);

      setActiveId(current.id);
    };

    updateActiveHeading();
    window.addEventListener('scroll', updateActiveHeading, { passive: true });
    window.addEventListener('resize', updateActiveHeading);

    return () => {
      window.removeEventListener('scroll', updateActiveHeading);
      window.removeEventListener('resize', updateActiveHeading);
      if (pendingTimeoutRef.current !== null) window.clearTimeout(pendingTimeoutRef.current);
    };
  }, [headings]);

  const scrollToSection = (id: string) => {
    pendingHeadingRef.current = id;
    setActiveId(id);

    if (pendingTimeoutRef.current !== null) window.clearTimeout(pendingTimeoutRef.current);
    pendingTimeoutRef.current = window.setTimeout(() => {
      pendingHeadingRef.current = null;
    }, 1000);

    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  if (headings.length === 0) return null;

  return (
    <nav className="space-y-2">
      <h3 className="text-sm font-medium text-muted-foreground mb-3 uppercase tracking-wider">
        Index
      </h3>
      <ul className="space-y-1.5">
        {headings.map(({ title, id }) => (
          <li key={id}>
            <button
              onClick={() => scrollToSection(id)}
              className={`text-left text-sm transition-colors duration-200 hover:text-foreground w-full ${
                activeId === id 
                  ? 'text-foreground font-medium' 
                  : 'text-muted-foreground'
              }`}
            >
              <span className="truncate block">{title}</span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

// Hook pour tracker la progression du scroll
function useScrollProgress(targetRef: RefObject<HTMLElement | null>) {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      if (!targetRef.current) return;
      
      const target = targetRef.current;
      const targetRect = target.getBoundingClientRect();
      const targetTop = targetRect.top + window.scrollY;
      const targetHeight = targetRect.height;
      const windowHeight = window.innerHeight;
      
      const scrollStart = targetTop;
      const scrollEnd = targetTop + targetHeight - windowHeight;
      const scrollRange = scrollEnd - scrollStart;
      
      if (scrollRange <= 0) {
        setProgress(100);
        return;
      }
      
      const currentScroll = window.scrollY;
      const relativeScroll = currentScroll - scrollStart;
      const scrollProgress = (relativeScroll / scrollRange) * 100;
      
      setProgress(Math.min(100, Math.max(0, scrollProgress)));
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [targetRef]);
  
  return progress;
}

// Fonction pour extraire le sous-titre du H1
function extractSubtitle(content: string): string | null {
  const h1Match = content.match(/^# (.+)$/m);
  if (h1Match) {
    const fullTitle = h1Match[1];
    // Extraire le texte après le ":"
    const parts = fullTitle.split(':');
    if (parts.length > 1) {
      return parts.slice(1).join(':').trim();
    }
  }
  return null;
}

// Fonction pour nettoyer le markdown (retirer tout avant le premier H2)
function cleanMarkdown(content: string): string {
  // Trouver la première occurrence de "## " (titre H2)
  const firstH2Index = content.indexOf('## ');
  if (firstH2Index !== -1) {
    return content.slice(firstH2Index);
  }
  return content;
}

function ProjectNavigation({ nextProject }: { nextProject?: Project }) {
  const navigate = useNavigate();
  const goBack = () => {
    if (typeof window.history.state?.idx === 'number' && window.history.state.idx > 0) navigate(-1);
    else navigate('/#projects');
  };
  return <nav className="mt-6 grid gap-3" aria-label="Navigation entre les projets">
    {nextProject && <Link to={nextProject.href || `/project/${nextProject.id}`} aria-label={`Projet suivant : ${nextProject.name}`} className="flex min-h-11 items-center justify-between gap-3 rounded-lg bg-[#110F0F] px-4 py-3 text-sm text-white transition-colors hover:bg-[#110F0F]/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2">
      <span>Projet suivant</span><ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
    </Link>}
    <button type="button" onClick={goBack} className="flex min-h-11 items-center gap-3 rounded-lg border border-black/15 px-4 py-3 text-sm text-left transition-colors hover:bg-black/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2">
      <ArrowLeft className="h-4 w-4 shrink-0" aria-hidden="true" /><span>Retour</span>
    </button>
  </nav>;
}

function ProjectFacts({ project }: { project: Project }) {
  const facts = [
    ['Projet', project.name],
    ['Durée', project.duration],
    ['Année', project.year],
    ['Mon rôle', project.role || 'UX/UI design'],
    ...(project.team?.length ? [['Équipe', project.team.join(', ')]] : []),
    ...(project.scope ? [['Périmètre', project.scope]] : []),
    ...(project.audience?.length ? [['Utilisateurs', project.audience.join(', ')]] : []),
  ];
  return <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-x-6 mb-10">
    {facts.map(([label, value]) => <div key={label} className="border-t border-black/15 py-4 min-w-0">
      <dt className="text-xs text-muted-foreground mb-2">{label}</dt>
      <dd className="text-sm font-medium leading-relaxed">{value}</dd>
    </div>)}
    {project.website && <div className="border-t border-black/15 py-4"><dt className="text-xs text-muted-foreground mb-2">Lien</dt><dd><a href={project.website} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm underline underline-offset-4">Voir le site <ExternalLink className="h-3 w-3" /></a></dd></div>}
  </dl>;
}

function ProjectCollaboration({ collaboration }: { collaboration?: Project['collaboration'] }) {
  if (!collaboration) return null;
  return <section className="border-t border-black/15 mt-16 sm:mt-20 pt-8 sm:pt-10" aria-labelledby="comment-j-ai-travaille">
    <h2 id="comment-j-ai-travaille" className="text-3xl sm:text-4xl font-medium tracking-tight mb-6 scroll-mt-28">Comment j’ai travaillé</h2>
    <p className="text-base sm:text-lg leading-[1.8] text-[#110F0F]/75">{collaboration.introduction}</p>
    {collaboration.partners?.length ? <div className="grid sm:grid-cols-2 gap-4 mt-8">
      {collaboration.partners.map((partner) => <div key={partner.name} className="min-w-0 rounded-xl border border-black/10 bg-white/50 p-5">
        <h3 className="font-medium mb-2">{partner.name}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{partner.contribution}</p>
      </div>)}
    </div> : null}
    <ol className={`grid sm:grid-cols-2 ${collaboration.steps.length === 5 ? 'xl:grid-cols-5' : 'xl:grid-cols-4'} gap-6 mt-10`} aria-label="Déroulement de la mission">
      {collaboration.steps.map((step, index) => <li key={step.title} className="min-w-0 border-t border-black/25 pt-4">
        <span className="text-xs text-muted-foreground">{String(index + 1).padStart(2, '0')}</span>
        <h3 className="font-medium text-base mt-3 mb-2">{step.title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
      </li>)}
    </ol>
  </section>;
}

function ProjectResults({ results }: { results?: ProjectResult[] }) {
  return <>
        {results && results.length > 0 && (
          <section className="my-8 sm:my-10" aria-label="Résultats et objectifs du projet">
            <div className="grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(min(100%,260px),1fr))]">
              {results.map((result) => (
                <div key={result.value} className="project-kpi-card min-w-0 rounded-2xl border border-black/15 bg-white/50 p-5 sm:p-6">
                  {result.kind !== 'target' && <p className="text-xs text-muted-foreground mb-4">{result.kind === 'metric' ? 'Résultat mesuré' : 'Livraison'}</p>}
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                    <p className={`project-kpi-value font-medium tracking-tight leading-tight ${result.kind === 'delivery' ? 'break-words' : 'whitespace-nowrap'}`}>{result.kind === 'delivery' ? result.value : result.value.replace(/ /g, '\u00a0')}</p>
                    {result.evolution && (
                      <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-emerald-600/10 px-2.5 py-1.5 text-xs font-medium text-emerald-800 whitespace-nowrap" title={result.evolution.description} aria-label={result.evolution.description}>
                        <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                        <span aria-hidden="true">{result.evolution.value.replace(/ /g, '\u00a0')}</span>
                      </span>
                    )}
                  </div>
                  <p className="mt-3 max-w-xl text-base text-muted-foreground leading-relaxed">{result.label}</p>
                </div>
              ))}
            </div>
          </section>
        )}

  </>;
}

// Composant pour parser le markdown avec IDs
const MarkdownContent = memo(function MarkdownContent({ content, onImageClick, projectId, results, collaboration }: {
  content: string;
  projectId: string;
  results?: ProjectResult[];
  collaboration?: Project['collaboration'];
  onImageClick: (src: string, alt: string, layoutId: string, rect: DOMRect) => void;
}) {
  const cleanContent = cleanMarkdown(content);
  
  const components: Components = {
        h2: ({ children }) => {
          const text = String(children);
          const id = text.toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '');
          return <h2 id={id} className="text-3xl sm:text-4xl font-medium tracking-tight mt-20 mb-6 scroll-mt-28">{children}</h2>;
        },
        h3: ({ children }) => (
          <h3 className="text-xl font-medium mt-10 mb-4">{children}</h3>
        ),
        p: ({ children, node }) => node?.children.some((child) => child.type === 'element' && child.tagName === 'img')
          ? <>{children}</>
          : <p className="mb-5 text-[#110F0F]/75 leading-[1.8] text-base sm:text-lg">{children}</p>,
        ul: ({ children }) => (
          <ul className="list-disc list-inside mb-4 space-y-2">{children}</ul>
        ),
        li: ({ children }) => (
          <li className="text-muted-foreground">{children}</li>
        ),
        strong: ({ children }) => (
          <strong className="font-semibold text-foreground">{children}</strong>
        ),
        blockquote: ({ children }) => (
          <blockquote className="border-l-4 border-[#110F0F] pl-4 italic my-6 text-muted-foreground">
            {children}
          </blockquote>
        ),
        img: ({ src, alt }) => {
          const imageSrc = String(src || '');
          const caption = String(alt || 'Image du projet');
          const dimensions = projectImageSizes[decodeURI(imageSrc)];
          return (
            <figure className="my-10 sm:my-14">
              <button
                type="button"
                className="block w-full overflow-hidden rounded-lg border border-black/5 bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black"
                onClick={(event) => onImageClick(imageSrc, caption, `${projectId}-${imageSrc}`, event.currentTarget.getBoundingClientRect())}
                aria-label={`Agrandir : ${caption}`}
              >
                <img src={imageSrc} {...dimensions} alt={caption} loading="lazy" decoding="async" className="block w-full h-auto" />
              </button>
              <figcaption className="mt-3 text-sm text-muted-foreground">{caption}</figcaption>
            </figure>
          );
        },
  };
  // Place results after the opening summary and before its first illustration
  // (or before the next section when the summary has no illustration).
  const boundaries = [cleanContent.indexOf('\n!['), cleanContent.indexOf('\n## ')]
    .filter((index) => index >= 0);
  const summaryEnd = boundaries.length ? Math.min(...boundaries) : cleanContent.length;
  const nextSection = cleanContent.indexOf('\n## ');
  const firstSectionEnd = nextSection >= 0 ? nextSection : cleanContent.length;
  return (
    <>
      <ReactMarkdown components={components}>{cleanContent.slice(0, summaryEnd)}</ReactMarkdown>
      <ProjectResults results={results} />
      <ReactMarkdown components={components}>{cleanContent.slice(summaryEnd, firstSectionEnd)}</ReactMarkdown>
      <ProjectCollaboration collaboration={collaboration} />
      <ReactMarkdown components={components}>{cleanContent.slice(firstSectionEnd)}</ReactMarkdown>
    </>
  );
});

export function ProjectDetail() {
  const { id } = useParams<{ id: string }>();

  const project = allProjects.find(p => p.id === id);
  
  const [selectedImage, setSelectedImage] = useState<ImageDescription | null>(null);
  const [imageRect, setImageRect] = useState<DOMRect | null>(null);
  
  const contentRef = useRef<HTMLDivElement>(null);
  const scrollProgress = useScrollProgress(contentRef);
  
  const handleImageClick = useCallback((src: string, alt: string, layoutId: string, rect: DOMRect, description?: string) => {
    setSelectedImage({ id: layoutId, src, alt, description: description || '' });
    setImageRect(rect);
  }, []);

  const handleCloseImage = useCallback(() => {
    setSelectedImage(null);
    setImageRect(null);
  }, []);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl mb-4">Projet non trouvé</h1>
          <Link to="/" className="text-base hover:opacity-70 transition-opacity">
            ← Retour à l'accueil
          </Link>
        </div>
      </div>
    );
  }

  const projectIndex = allProjects.findIndex((item) => item.id === project.id);
  const nextProject = allProjects.length > 1 ? allProjects[(projectIndex + 1) % allProjects.length] : undefined;

  const otherProjects = allProjects
    .filter(p => p.id !== id)
    .slice(0, 3);


  const hasMarkdown = !!project.markdownContent;
  const cleanedOutline = cleanMarkdown(project.markdownContent || '');
  const firstSectionBoundary = cleanedOutline.indexOf('\n## ');
  const outlinePosition = firstSectionBoundary >= 0 ? firstSectionBoundary : cleanedOutline.length;
  const outlineContent = project.collaboration
    ? cleanedOutline.slice(0, outlinePosition) + '\n## Comment j’ai travaillé\n' + cleanedOutline.slice(outlinePosition)
    : cleanedOutline;

  return (
    <div className="min-h-screen">
      <GSAPFlipLightbox
        image={selectedImage}
        originRect={imageRect}
        isOpen={!!selectedImage}
        onClose={handleCloseImage}
        showDescription={!!selectedImage?.description}
      />

      <div className="fixed bottom-0 left-0 right-0 h-1 bg-[#110F0F]/5 z-50 lg:hidden" aria-hidden="true">
        <div className="h-full bg-[#110F0F]" style={{ width: `${scrollProgress}%` }} />
      </div>

      <header className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-12 pt-8">
        <Link to="/#projects" className="inline-flex items-center gap-2 text-sm hover:opacity-60 transition-opacity">
          <ArrowLeft className="w-4 h-4" /> Tous les projets
        </Link>
      </header>

      <main className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-12">
        <section className="pt-16 sm:pt-24 pb-10 sm:pb-16" aria-labelledby="case-title">
          <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground mb-7">
            Étude de cas <span className="mx-2">/</span> {project.name}
          </p>
          <div className="max-w-5xl">
            <div>
              <h1 id="case-title" className="text-4xl sm:text-5xl lg:text-[clamp(3.25rem,5vw,5.5rem)] leading-[1.07] tracking-tight font-medium text-balance">
                {extractSubtitle(project.markdownContent || '') || project.name}
              </h1>
              <p className="mt-6 max-w-2xl text-base sm:text-lg text-muted-foreground leading-relaxed">{project.description}</p>
            </div>
          </div>
        </section>


        <button
          type="button"
          className="block w-full border border-black/5 bg-white rounded-lg overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black"
          onClick={(event) => handleImageClick(project.imageUrl, project.name, generateStandardImageId(project.id, 0), event.currentTarget.getBoundingClientRect())}
          aria-label={`Agrandir l’image d’ouverture du projet ${project.name}`}
        >
          <img src={project.imageUrl} {...projectImageSizes[project.imageUrl]} alt={`${project.name} — visuel d’ouverture`} className="block w-full h-auto" />
        </button>

        <div ref={contentRef} className="grid lg:grid-cols-[220px_minmax(0,1fr)] gap-10 lg:gap-20 pt-12 sm:pt-20 pb-24">
          <aside className="hidden lg:block">
            <ProjectFacts project={project} />
            <div className="sticky top-12 border-t border-black/20 pt-6">
              {hasMarkdown && project.markdownContent && <TableOfContents content={outlineContent} />}
              <div className="mt-6 h-0.5 bg-black/10"><div className="h-full bg-black" style={{ width: `${scrollProgress}%` }} /></div>
              <ProjectNavigation nextProject={nextProject} />
            </div>
          </aside>
          <article className="min-w-0 max-w-[840px]">
            <div className="lg:hidden mb-10"><ProjectFacts project={project} /><ProjectNavigation nextProject={nextProject} /></div>
            {hasMarkdown && project.markdownContent ? (
              <>
                <MarkdownContent content={project.markdownContent} projectId={project.id} results={project.results} collaboration={project.collaboration} onImageClick={handleImageClick} />

              </>
            ) : <p className="text-muted-foreground">Contenu en cours de rédaction.</p>}
          </article>
        </div>
      </main>

      {otherProjects.length > 0 && (
        <section className="border-t border-black/15 px-4 sm:px-6 lg:px-12 py-16 sm:py-24">
          <div className="mx-auto max-w-[1184px]">
            <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground mb-4">Continuer la visite</p>
            <h2 className="text-4xl sm:text-5xl font-medium tracking-tight mb-10">Autres projets</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {otherProjects.map((p) => (
                <Link key={p.id} to={`/project/${p.id}`} className="group">
                  <div className="aspect-[16/10] rounded-lg border border-black/5 bg-white overflow-hidden mb-4"><img src={p.imageUrl} alt={p.name} loading="lazy" decoding="async" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" /></div>
                  <h3 className="text-xl font-medium group-hover:opacity-70 transition-opacity">{p.name} <span aria-hidden="true">↗</span></h3>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
      <footer className="border-t border-black/15 px-4 sm:px-6 lg:px-12 py-8"><div className="mx-auto max-w-[1184px]"><Link to="/#projects" className="text-base hover:opacity-70 transition-opacity">← Retour aux projets</Link></div></footer>
    </div>
  );
}
