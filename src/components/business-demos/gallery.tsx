"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function ProjectGallery({ images, alt }: { images: readonly string[]; alt: string }) {
  const [active, setActive] = useState(0);
  const activeImage = images[active] ?? images[0];
  const isRemote = (src: string) => src.startsWith("http://") || src.startsWith("https://");

  return (
    <div className="detail-gallery">
      <div className="image-frame detail-gallery__main relative overflow-hidden bg-neutral-900">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeImage}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <Image
              src={activeImage}
              alt={`${alt}, view ${active + 1}`}
              fill
              unoptimized={isRemote(activeImage)}
              sizes="(max-width: 640px) 100vw, 68vw"
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="detail-gallery__thumbs" aria-label="Concept gallery views">
        {images.map((image, index) => (
          <button
            className={`gallery-thumb transition-all duration-300 ${active === index ? "ring-2 ring-white/80 scale-[1.02]" : "opacity-60 hover:opacity-100"}`}
            key={image}
            type="button"
            aria-label={`Show gallery view ${index + 1}`}
            aria-pressed={active === index}
            onClick={() => setActive(index)}
          >
            <Image
              src={image}
              alt=""
              fill
              unoptimized={isRemote(image)}
              sizes="(max-width: 640px) 33vw, 18vw"
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
