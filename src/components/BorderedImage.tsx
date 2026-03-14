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
    <div className="rounded-lg border border-[#110F0F]/5 overflow-hidden h-full">
      <img
        src={src}
        alt={alt}
        className={`w-full h-full object-cover ${className}`}
        onClick={handleClick}
      />
    </div>
  );
}
