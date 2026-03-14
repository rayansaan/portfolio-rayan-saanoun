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
    { name: 'Work', href: '/#projects' },
    { name: 'About', href: '/#about' },
    { name: 'Contact', href: 'mailto:rayansaan.pro@gmail.com' },
  ];

  return (
    <header className="w-full px-4 sm:px-6 lg:px-32 xl:px-48 py-6 sm:py-8">
      <div className="flex items-center justify-between">
        {/* Logo - Always visible */}
        <Link 
          to="/" 
          className="transition-transform duration-300 hover:scale-105"
        >
          <img 
            src="/icons/logo-rayan-saan.svg" 
            alt="Rayan Saanoun" 
            className="h-6 w-auto"
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
            className="px-6 py-3 bg-black text-white text-base rounded-lg transition-opacity duration-200 hover:opacity-90"
          >
            Mon CV
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
              className="mt-4 px-6 py-3 bg-black text-white text-center text-lg rounded-lg transition-opacity duration-200 hover:opacity-90"
            >
              Mon CV
            </a>
          </nav>
        </DrawerContent>
      </Drawer>
    </header>
  );
}
