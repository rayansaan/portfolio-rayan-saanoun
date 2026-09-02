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

  const image = (
    <img
      src={src}
      alt={alt}
      decoding="async"
      className={`w-full h-full object-cover ${className}`}
    />
  );

  if (onClick) {
    return (
      <button
        type="button"
        className="block h-full w-full overflow-hidden rounded-lg border border-[#110F0F]/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#110F0F] focus-visible:ring-offset-4"
        onClick={handleClick}
        aria-label={`Agrandir l’image ${alt}`}
      >
        {image}
      </button>
    );
  }

  return (
    <div className="h-full overflow-hidden rounded-lg border border-[#110F0F]/5">
      {image}
    </div>
  );
}
