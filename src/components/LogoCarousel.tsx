import { useRef } from 'react';

const logos = [
  { name: 'C discount', src: '/logos/carousel/C discount.svg' },
  { name: 'Michelin', src: '/logos/carousel/Michelin.svg' },
  { name: 'Moove', src: '/logos/carousel/moove.svg' },
  { name: 'Nash', src: '/logos/carousel/Nash.svg' },
  { name: 'Rakoono', src: '/logos/carousel/Rakoono.svg' },
  { name: 'Stooly', src: '/logos/carousel/Stooly.svg' },
  { name: 'Veeton', src: '/logos/carousel/Veeton.svg' },
];

export function LogoCarousel() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="w-full px-2 sm:px-6 lg:px-32 xl:px-48 py-4 sm:py-6 overflow-hidden">
      <div className="max-w-4xl mx-auto overflow-hidden mask-gradient-carousel">
        <div 
          ref={containerRef}
          className="flex animate-scroll-logos"
          style={{
            width: 'fit-content',
            willChange: 'transform',
          }}
        >
          {/* First set of logos */}
          {logos.map((logo, index) => (
            <div
              key={`logo-1-${index}`}
              className="flex-shrink-0 flex items-center justify-center px-3 sm:px-8"
              style={{ width: 'auto' }}
            >
              <img
                src={logo.src}
                alt={logo.name}
                decoding="async"
                className="w-auto h-8 sm:h-12 object-contain opacity-60 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0"
              />
            </div>
          ))}
          {/* Duplicate set for infinite scroll */}
          {logos.map((logo, index) => (
            <div
              key={`logo-2-${index}`}
              className="flex-shrink-0 flex items-center justify-center px-3 sm:px-8"
              style={{ width: 'auto' }}
            >
              <img
                src={logo.src}
                alt=""
                aria-hidden="true"
                decoding="async"
                className="w-auto h-8 sm:h-12 object-contain opacity-60 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
