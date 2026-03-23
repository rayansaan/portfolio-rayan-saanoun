import type { ImageDescription } from '@/types';
import { ImageDescriptionCard } from './ImageDescriptionCard';

interface ImageDescriptionGridProps {
  images: ImageDescription[];
  onImageClick: (image: ImageDescription, rect: DOMRect) => void;
}

export function ImageDescriptionGrid({ images, onImageClick }: ImageDescriptionGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {images.map((image) => (
        <ImageDescriptionCard
          key={image.id}
          image={image}
          onClick={onImageClick}
        />
      ))}
    </div>
  );
}