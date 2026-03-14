interface BorderedImageProps {
  src: string;
  alt: string;
  className?: string;
  onClick?: (rect: DOMRect) => void;
}

export function BorderedImage({ 
  src, 
  alt,
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
    <div className="h-[400px] rounded-lg border border-[#110F0F]/5 overflow-hidden bg-[#110F0F]/[0.02] flex items-center justify-center">
      <img
        src={src}
        alt={alt}
        className={`w-full h-full object-contain ${className}`}
        onClick={handleClick}
      />
    </div>
  );
}
