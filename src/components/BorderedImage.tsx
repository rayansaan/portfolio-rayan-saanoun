import { motion } from 'framer-motion';

interface BorderedImageProps {
  src: string;
  alt: string;
  layoutId?: string;
  className?: string;
  onClick?: (rect: DOMRect) => void;
}

export function BorderedImage({ 
  src, 
  alt,
  layoutId,
  className = '', 
  onClick
}: BorderedImageProps) {
  const handleClick = (e: React.MouseEvent) => {
    if (onClick) {
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      onClick(rect);
    }
  };

  return (
    <div className="rounded-lg border border-[#110F0F]/5 overflow-hidden h-full">
      <motion.img
        layoutId={layoutId}
        layout
        transition={{ layout: { duration: 0.4, ease: [0.32, 0.72, 0, 1] } }}
        src={src}
        alt={alt}
        className={`w-full h-full object-cover ${className}`}
        onClick={handleClick}
        style={{ willChange: 'transform' }}
      />
    </div>
  );
}
