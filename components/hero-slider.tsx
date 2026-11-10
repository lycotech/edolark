"use client";

import { useEffect, useState, type CSSProperties } from "react";
import Image from "next/image";

type Slide = { src: string; alt: string };

const DURATION = 6500;

export function HeroSlider({ slides }: { slides: Slide[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setIndex((v) => (v + 1) % slides.length), DURATION);
    return () => clearTimeout(timer);
  }, [index, slides.length]);

  return (
    <div className="hslider" style={{ "--dur": `${DURATION}ms` } as CSSProperties}>
      {slides.map((slide, i) => (
        <div key={slide.src} className={`hslider__slide${i === index ? " is-active" : ""}`}>
          <Image src={encodeURI(slide.src)} alt={slide.alt} fill sizes="100vw" priority={i === 0} />
        </div>
      ))}
      <div className="hslider__bars" role="tablist" aria-label="Hero images">
        {slides.map((slide, i) => (
          <button
            key={slide.src}
            type="button"
            role="tab"
            aria-selected={i === index}
            aria-label={`Show image ${i + 1}`}
            className={i === index ? "is-active" : ""}
            onClick={() => setIndex(i)}
          >
            <span />
          </button>
        ))}
      </div>
    </div>
  );
}
