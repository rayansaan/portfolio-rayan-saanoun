import { BorderedImage } from './BorderedImage';
import type { ImageWithDescription } from '@/types';

interface ImageWithCaptionProps {
  image: ImageWithDescription;
  onClick: (rect: DOMRect) => void;
  layoutId?: string;
}

// Composant pour afficher du texte avec des sauts de ligne
function FormattedText({ text }: { text: string }) {
  if (!text) return null;
  return (
    <div className="whitespace-pre-wrap text-base leading-relaxed">
      {text}
    </div>
  );
}

export function ImageWithCaption({ image, onClick }: ImageWithCaptionProps) {
  return (
    <div className="p-2 border border-[#110F0F]/5 rounded-lg bg-[#110F0F]/[0.02]">
      <BorderedImage
        src={image.src}
        alt={image.alt || ''}
        onClick={onClick}
      />
      {image.description && (
        <div className="mt-4 text-base leading-relaxed">
          <FormattedText text={image.description} />
        </div>
      )}
    </div>
  );
}
