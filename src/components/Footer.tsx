const socialLinks = [
  { name: 'Email', href: 'mailto:rayansaan.pro@gmail.com' },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/rayan-saanoun-72baa4146/', target: '_blank' },
  // { name: 'Behance', href: '#', target: '_blank' }, // TODO: Ajouter l'URL Behance
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#110F0F] text-white">
      <div className="px-4 sm:px-6 lg:px-32 xl:px-48 py-8 sm:py-12">
        {/* Ligne 1 : Logo et liens sociaux */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 pb-8 border-b border-white/10">
          {/* Logo */}
          <a href="/" className="transition-opacity duration-200 hover:opacity-70">
            <img 
              src="/icons/logo-rayan-saan.svg" 
              alt="Rayan Saanoun" 
              loading="lazy"
              decoding="async"
              className="h-6 w-auto brightness-0 invert"
            />
          </a>
          
          {/* Liens sociaux */}
          <div className="flex items-center gap-6 sm:gap-8">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target={link.target}
                rel={link.target === '_blank' ? 'noopener noreferrer' : undefined}
                className="text-base transition-opacity duration-200 hover:opacity-70"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
        
        {/* Ligne 2 : Copyright et localisation */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-6">
          {/* Gauche - Copyright */}
          <div className="text-base text-left">
            Rayan Saanoun @{currentYear}
          </div>
          
          {/* Droite - Localisation */}
          <div className="text-base text-left sm:text-right">
            Bordeaux et Paris
          </div>
        </div>
      </div>
    </footer>
  );
}
