import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { LayoutGrid, Mail, UserRound } from 'lucide-react';
import { CV_URL } from '@/constants/links';

const navLinks = [
  { name: 'Work', href: '/#projects', icon: LayoutGrid },
  { name: 'About', href: '/about', icon: UserRound, isRoute: true },
  { name: 'Contact', href: 'mailto:rayansaan.pro@gmail.com', icon: Mail },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const closeOnHistoryNavigation = () => setIsOpen(false);
    window.addEventListener('popstate', closeOnHistoryNavigation);
    window.addEventListener('hashchange', closeOnHistoryNavigation);
    return () => {
      window.removeEventListener('popstate', closeOnHistoryNavigation);
      window.removeEventListener('hashchange', closeOnHistoryNavigation);
    };
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const closeOnOutsideClick = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) setIsOpen(false);
    };

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    document.addEventListener('pointerdown', closeOnOutsideClick);
    document.addEventListener('keydown', closeOnEscape);
    return () => {
      document.removeEventListener('pointerdown', closeOnOutsideClick);
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, [isOpen]);

  return (
    <header ref={headerRef} className="site-header">
      <div className="site-navbar">
        <Link
          to="/"
          className="site-logo"
          aria-label="Retour à l'accueil"
          onClick={() => setIsOpen(false)}
        >
          <img src="/icons/logo-rayan-saan.svg" alt="Rayan Saanoun" decoding="async" />
        </Link>

        <nav className="site-desktop-nav" aria-label="Navigation principale">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const content = (
              <>
                <Icon className="site-nav-icon" aria-hidden="true" />
                <span>{link.name}</span>
              </>
            );

            return link.isRoute ? (
              <Link key={link.name} to={link.href} className="site-nav-link">
                {content}
              </Link>
            ) : (
              <a key={link.name} href={link.href} className="site-nav-link">
                {content}
              </a>
            );
          })}
          <a
            href={CV_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="site-cv-link"
          >
            Mon CV
          </a>
        </nav>

        <div className="site-mobile-actions">
          <a
            href={CV_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="site-cv-link"
          >
            Mon CV
          </a>
          <button
            ref={menuButtonRef}
            type="button"
            className={`site-menu-button${isOpen ? ' is-open' : ''}`}
            onClick={() => setIsOpen((current) => !current)}
            aria-label={isOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
          >
            <span className="site-menu-icon" aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.nav
            id="mobile-navigation"
            className="site-mobile-menu"
            aria-label="Navigation mobile"
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          >
            {navLinks.map((link, index) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.04 + index * 0.04 }}
              >
                {link.isRoute ? (
                  <Link to={link.href} className="site-mobile-link" onClick={() => setIsOpen(false)}>
                    <link.icon className="site-mobile-link-icon" aria-hidden="true" />
                    <span>{link.name}</span>
                  </Link>
                ) : (
                  <a href={link.href} className="site-mobile-link" onClick={() => setIsOpen(false)}>
                    <link.icon className="site-mobile-link-icon" aria-hidden="true" />
                    <span>{link.name}</span>
                  </a>
                )}
              </motion.div>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
