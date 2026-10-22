"use client";

import Image from "next/image";
import { useState } from "react";

export function ProjectGallery({ images, alt }: { images: readonly string[]; alt: string }) {
  const [active, setActive] = useState(0);
  const activeImage = images[active] ?? images[0];

  return (
    <div className="detail-gallery">
      <div className="image-frame detail-gallery__main">
        <Image src={activeImage} alt={`${alt}, view ${active + 1}`} fill sizes="(max-width: 640px) 100vw, 68vw" />
      </div>
      <div className="detail-gallery__thumbs" aria-label="Concept gallery views">
        {images.map((image, index) => (
          <button
            className="gallery-thumb"
            key={image}
            type="button"
            aria-label={`Show gallery view ${index + 1}`}
            aria-pressed={active === index}
            onClick={() => setActive(index)}
          >
            <Image src={image} alt="" fill sizes="(max-width: 640px) 33vw, 18vw" />
          </button>
        ))}
      </div>
    </div>
  );
}
