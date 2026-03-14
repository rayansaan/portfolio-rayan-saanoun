import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
} from '@/components/ui/drawer';
import { ButtonShinyCursor } from './ButtonShinyCursor';

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Work', href: '/#projects' },
    { name: 'About', href: '/#about' },
    { name: 'Contact', href: 'mailto:rayansaan.pro@gmail.com' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 w-full px-4 sm:px-6 lg:px-32 xl:px-48 transition-all duration-300 ease-in-out ${
        isScrolled 
          ? 'py-2 sm:py-3 bg-white/80 backdrop-blur-md shadow-sm border-b border-black/5' 
          : 'py-4 sm:py-5 bg-transparent'
      }`}
    >
      <div className="flex items-center justify-between">
        {/* Logo - Always visible */}
        <Link 
          to="/" 
          className="transition-transform duration-300 hover:scale-105"
        >
          <img 
            src="/icons/logo-rayan-saan.svg" 
            alt="Rayan Saanoun" 
            className={`w-auto transition-all duration-300 ${
              isScrolled ? 'h-5' : 'h-6'
            }`}
          />
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-base transition-opacity duration-200 hover:opacity-70"
            >
              {link.name}
            </a>
          ))}
          <a
            href="/cv/CV-Rayan_Saanoun-2025.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            <ButtonShinyCursor className="px-6 py-3 text-white text-base rounded-lg">
              Mon CV
            </ButtonShinyCursor>
          </a>
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
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-2xl font-medium py-4 transition-opacity duration-200 hover:opacity-70"
              >
                {link.name}
              </a>
            ))}
            <a
              href="/cv/CV-Rayan_Saanoun-2025.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
            >
              <ButtonShinyCursor className="w-full mt-4 px-6 py-3 text-white text-center text-lg rounded-lg">
                Mon CV
              </ButtonShinyCursor>
            </a>
          </nav>
        </DrawerContent>
      </Drawer>
    </header>
  );
}
