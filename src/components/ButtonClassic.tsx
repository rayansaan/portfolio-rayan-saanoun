import type { ReactNode } from 'react';

interface ButtonClassicProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}

export function ButtonClassic({ children, onClick, className = '' }: ButtonClassicProps) {
  return (
    <button
      onClick={onClick}
      className={`relative overflow-hidden px-6 py-3 bg-black text-white text-base rounded-lg border-2 border-black transition-all duration-200 hover:bg-gradient-to-t hover:from-white/20 hover:to-transparent ${className}`}
    >
      <span className="relative z-10">{children}</span>
    </button>
  );
}
