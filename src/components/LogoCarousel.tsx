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
    <div className="w-full max-w-md mx-auto overflow-hidden py-4">
      <div 
        ref={containerRef}
        className="flex animate-scroll-logos"
        style={{
          width: 'fit-content',
        }}
      >
        {/* First set of logos */}
        {logos.map((logo, index) => (
          <div
            key={`logo-1-${index}`}
            className="flex-shrink-0 flex items-center justify-center px-6"
            style={{ width: '120px' }}
          >
            <img
              src={logo.src}
              alt={logo.name}
              className="w-auto h-8 object-contain opacity-60 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0"
            />
          </div>
        ))}
        {/* Duplicate set for infinite scroll */}
        {logos.map((logo, index) => (
          <div
            key={`logo-2-${index}`}
            className="flex-shrink-0 flex items-center justify-center px-6"
            style={{ width: '120px' }}
          >
            <img
              src={logo.src}
              alt={logo.name}
              className="w-auto h-8 object-contain opacity-60 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
