"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function ProjectGallery({ photos, title }: { photos: string[]; title: string }) {
  const [index, setIndex] = useState(0);

  function next() {
    setIndex((i) => (i + 1) % photos.length);
  }

  function previous() {
    setIndex((i) => (i - 1 + photos.length) % photos.length);
  }

  return (
    <div className="project-gallery">
      <div className="project-gallery__stage">
        <Image
          src={encodeURI(photos[index])}
          alt={`${title} — photo ${index + 1} of ${photos.length}`}
          fill
          sizes="(max-width: 900px) 100vw, 55vw"
          priority
        />
        <button className="project-gallery__nav project-gallery__nav--prev" type="button" aria-label="Previous photo" onClick={previous}>
          <ChevronLeft size={24} />
        </button>
        <button className="project-gallery__nav project-gallery__nav--next" type="button" aria-label="Next photo" onClick={next}>
          <ChevronRight size={24} />
        </button>
      </div>
      <div className="project-gallery__thumbs" role="tablist" aria-label="Project photos">
        {photos.map((photo, i) => (
          <button
            key={i}
            type="button"
            role="tab"
            aria-selected={i === index}
            aria-label={`Photo ${i + 1}`}
            className={i === index ? "active" : ""}
            onClick={() => setIndex(i)}
          >
            <Image src={encodeURI(photo)} alt="" fill sizes="120px" />
          </button>
        ))}
      </div>
    </div>
  );
}
