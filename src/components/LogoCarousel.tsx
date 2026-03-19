import { useRef } from 'react';

const logos = [
  { name: 'C discount', src: '/logos/C discount.png' },
  { name: 'Michelin', src: '/logos/Michelin.png' },
  { name: 'Moove', src: '/logos/moove.png' },
  { name: 'Nash', src: '/logos/Nash.png' },
  { name: 'Rakoono', src: '/logos/Rakoono.png' },
  { name: 'Stooly', src: '/logos/Stooly.png' },
  { name: 'Veeton', src: '/logos/Veeton.png' },
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
