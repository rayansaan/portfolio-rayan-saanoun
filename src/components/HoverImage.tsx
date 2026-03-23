import { useHoverImage } from '@/context/HoverImageContext';

export function HoverImage() {
  const { currentImage } = useHoverImage();

  return (
    <div 
      className="fixed inset-0 z-[-1] pointer-events-none"
      style={{ willChange: 'opacity' }}
    >
      {currentImage && (
        <img
          src={currentImage}
          alt=""
          className="w-full h-full object-cover transition-opacity duration-hover ease-hover"
          style={{ 
            opacity: currentImage ? 1 : 0,
          }}
        />
      )}
      {/* Overlay to ensure text readability */}
      <div 
        className="absolute inset-0 bg-black/20 transition-opacity duration-hover"
        style={{ opacity: currentImage ? 1 : 0 }}
      />
    </div>
  );
}
