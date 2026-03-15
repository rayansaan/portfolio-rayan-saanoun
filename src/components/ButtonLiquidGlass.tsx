import { useState, useRef, useEffect } from 'react';

interface ButtonLiquidGlassProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export function ButtonLiquidGlass({ children, onClick, className = '' }: ButtonLiquidGlassProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia('(pointer: coarse)').matches);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current || isMobile) return;

    const rect = buttonRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setMousePosition({ x, y });
  };

  // Fallback pour mobile : bouton noir simple sans effet
  if (isMobile) {
    return (
      <button
        onClick={onClick}
        className={`px-6 py-3 bg-black text-white text-base rounded-lg border-2 border-black ${className}`}
      >
        {children}
      </button>
    );
  }

  return (
    <>
      {/* SVG Filter pour l'effet liquid glass */}
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <defs>
          <filter id="liquid-glass" x="-50%" y="-50%" width="200%" height="200%">
            {/* Turbulence intense pour distortion prononcée */}
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.02"
              numOctaves="4"
              seed="2"
              result="noise"
            />
            {/* Displacement fort (30px) */}
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="30"
              xChannelSelector="R"
              yChannelSelector="G"
              result="displaced"
            />
            {/* Blur pour effet verre */}
            <feGaussianBlur in="displaced" stdDeviation="2" result="blur" />
            {/* Luminosité augmentée */}
            <feComponentTransfer>
              <feFuncA type="linear" slope="1.5" />
            </feComponentTransfer>
          </filter>
        </defs>
      </svg>

      <button
        ref={buttonRef}
        onClick={onClick}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`relative overflow-hidden px-6 py-3 bg-black text-white text-base rounded-lg border-2 border-black cursor-pointer ${className}`}
        style={{
          isolation: 'isolate',
        }}
      >
        {/* Calque liquid glass qui suit la souris */}
        <div
          className="absolute pointer-events-none"
          style={{
            left: 0,
            top: 0,
            width: '100%',
            height: '100%',
            opacity: isHovered ? 1 : 0,
            filter: 'url(#liquid-glass)',
            background: isHovered
              ? `radial-gradient(circle 80px at ${mousePosition.x}% ${mousePosition.y}%, 
                  rgba(255,255,255,0.9) 0%, 
                  rgba(255,255,255,0.7) 15%, 
                  rgba(255,255,255,0.4) 35%, 
                  rgba(255,255,255,0.1) 60%, 
                  rgba(0,0,0,0.2) 80%, 
                  transparent 100%)`
              : 'transparent',
            mixBlendMode: 'screen',
            transition: 'opacity 0.1s ease-out',
          }}
        />

        {/* Texte du bouton */}
        <span className="relative z-10">{children}</span>
      </button>
    </>
  );
}
