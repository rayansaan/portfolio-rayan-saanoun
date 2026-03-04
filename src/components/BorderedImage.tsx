interface BorderedImageProps {
  src: string;
  alt: string;
  className?: string;
  onClick?: (e: React.MouseEvent, originX: number, originY: number) => void;
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
      const originX = rect.left + rect.width / 2;
      const originY = rect.top + rect.height / 2;
      onClick(e, originX, originY);
    }
  };

  const content = (
    <img
      src={src}
      alt={alt}
      className={`w-full h-full object-cover ${className}`}
      onClick={handleClick}
    />
  );

  return (
    <div className="rounded-lg border border-[#110F0F]/5 overflow-hidden h-full">
      {content}
    </div>
  );
}
