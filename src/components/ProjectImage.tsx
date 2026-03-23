interface ProjectImageProps {
  src: string;
  alt: string;
  onClick?: (rect: DOMRect) => void;
}

export function ProjectImage({ src, alt, onClick }: ProjectImageProps) {
  const handleClick = (e: React.MouseEvent) => {
    if (onClick) {
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      onClick(rect);
    }
  };

  return (
    <div className="h-[400px] flex items-center justify-center rounded-lg border border-[#110F0F]/5 overflow-hidden bg-[#110F0F]/[0.02]">
      <img
        src={src}
        alt={alt}
        className="h-full w-auto object-contain"
        onClick={handleClick}
      />
    </div>
  );
}
