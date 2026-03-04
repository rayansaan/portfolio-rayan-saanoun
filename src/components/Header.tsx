import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
} from '@/components/ui/drawer';

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Accueil', href: '/' },
    { name: 'Projets', href: '/#projets' },
    { name: 'Contact', href: 'mailto:rayansaan.pro@gmail.com' },
    { name: 'À propos', href: '/#about' },
  ];

  return (
    <header className="w-full px-4 sm:px-6 lg:px-32 xl:px-48 py-6 sm:py-8">
      <div className="flex items-center justify-between">
        {/* Name - Always visible */}
        <Link to="/" className="text-sm sm:text-base font-medium">
          Rayan Saanoun
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <div className="text-sm sm:text-base">
            Product Designer à Bordeaux
          </div>
          <a 
            href="mailto:rayansaan.pro@gmail.com"
            className="text-sm sm:text-base transition-opacity duration-200 hover:opacity-70"
          >
            rayansaan.pro@gmail.com
          </a>
          <div className="text-sm sm:text-base text-right">
            Disponible pour projets
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(true)}
          className="md:hidden p-2 -mr-2 transition-opacity duration-200 hover:opacity-70"
          aria-label="Ouvrir le menu"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile Drawer */}
      <Drawer open={isOpen} onOpenChange={setIsOpen} direction="right">
        <DrawerContent className="w-3/4 max-w-sm bg-white">
          <DrawerHeader className="border-b border-black/5">
            <div className="flex items-center justify-between">
              <DrawerTitle className="text-lg font-medium">Menu</DrawerTitle>
              <DrawerClose asChild>
                <button
                  className="p-2 -mr-2 transition-opacity duration-200 hover:opacity-70"
                  aria-label="Fermer le menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </DrawerClose>
            </div>
          </DrawerHeader>
          <nav className="flex flex-col p-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                onClick={() => setIsOpen(false)}
                className="text-2xl font-medium py-4 transition-opacity duration-200 hover:opacity-70"
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </DrawerContent>
      </Drawer>
    </header>
  );
}
