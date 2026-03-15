import { useState, type ReactNode, type ButtonHTMLAttributes } from 'react';

interface ButtonShinyCursorProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export function ButtonShinyCursor({ children, className = '', ...props }: ButtonShinyCursorProps) {
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePosition({ x, y });
  };

  return (
    <div className={`inline-block border-2 border-black rounded-lg animate-fade-in ${className}`}>
      <button
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative overflow-hidden transition-all duration-200 cursor-pointer px-6 py-3 text-white text-base rounded-[6px] w-full"
        style={{
          background: isHovered
            ? `radial-gradient(circle 40px at ${mousePosition.x}% ${mousePosition.y}%, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.7) 20%, transparent 50%), 
               radial-gradient(circle 180px at ${mousePosition.x}% ${mousePosition.y}%, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.2) 30%, rgba(255,255,255,0.05) 50%, transparent 70%), 
               #000`
            : '#000',
        }}
        {...props}
      >
        {children}
      </button>
    </div>
  );
}
