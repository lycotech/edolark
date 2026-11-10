"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";

export function ProjectGallery({ photos, title }: { photos: string[]; title: string }) {
  const [index, setIndex] = useState(0);
  const [box, setBox] = useState(false);
  const thumbs = useRef<HTMLDivElement>(null);
  const touchX = useRef<number | null>(null);

  const go = (step: number) => setIndex((i) => (i + step + photos.length) % photos.length);

  useEffect(() => {
    const strip = thumbs.current;
    const active = strip?.querySelector<HTMLElement>("[aria-selected='true']");
    if (strip && active) {
      strip.scrollTo({ left: active.offsetLeft - strip.clientWidth / 2 + active.clientWidth / 2, behavior: "smooth" });
    }
  }, [index]);

  useEffect(() => {
    if (!box) return;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setBox(false);
      if (event.key === "ArrowRight") go(1);
      if (event.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [box, photos.length]);

  const onTouchStart = (event: React.TouchEvent) => {
    touchX.current = event.touches[0].clientX;
  };
  const onTouchEnd = (event: React.TouchEvent) => {
    if (touchX.current === null) return;
    const dx = event.changedTouches[0].clientX - touchX.current;
    if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
    touchX.current = null;
  };

  return (
    <div className="gallery">
      <div className="gallery__stage" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        <span className="gallery__bg" style={{ backgroundImage: `url("${encodeURI(photos[index])}")` }} aria-hidden="true" />
        <Image
          key={index}
          className="gallery__img"
          src={encodeURI(photos[index])}
          alt={`${title} — photo ${index + 1} of ${photos.length}`}
          fill
          sizes="(max-width: 1200px) 100vw, 1200px"
          priority={index === 0}
        />
        <button className="gallery__open" type="button" aria-label="Open full screen" onClick={() => setBox(true)} data-cursor="Zoom">
          <Expand size={18} />
        </button>
        {photos.length > 1 && (
          <>
            <button className="gallery__nav gallery__nav--prev" type="button" aria-label="Previous photo" onClick={() => go(-1)}>
              <ChevronLeft size={26} strokeWidth={1.3} />
            </button>
            <button className="gallery__nav gallery__nav--next" type="button" aria-label="Next photo" onClick={() => go(1)}>
              <ChevronRight size={26} strokeWidth={1.3} />
            </button>
          </>
        )}
        <span className="gallery__count">
          {String(index + 1).padStart(2, "0")} / {String(photos.length).padStart(2, "0")}
        </span>
      </div>

      {photos.length > 1 && (
        <div ref={thumbs} className="gallery__thumbs" role="tablist" aria-label="Project photos">
          {photos.map((photo, i) => (
            <button
              key={photo}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Photo ${i + 1}`}
              className={i === index ? "is-active" : ""}
              onClick={() => setIndex(i)}
            >
              <Image src={encodeURI(photo)} alt="" fill sizes="140px" />
            </button>
          ))}
        </div>
      )}

      {box && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={`${title} photos`} onClick={() => setBox(false)}>
          <button className="lightbox__close" type="button" aria-label="Close" onClick={() => setBox(false)}>
            <X size={26} strokeWidth={1.2} />
          </button>
          <div className="lightbox__stage" onClick={(event) => event.stopPropagation()} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
            <Image
              key={index}
              src={encodeURI(photos[index])}
              alt={`${title} — photo ${index + 1}`}
              fill
              sizes="100vw"
            />
          </div>
          {photos.length > 1 && (
            <>
              <button className="lightbox__nav lightbox__nav--prev" type="button" aria-label="Previous photo" onClick={(e) => { e.stopPropagation(); go(-1); }}>
                <ChevronLeft size={34} strokeWidth={1} />
              </button>
              <button className="lightbox__nav lightbox__nav--next" type="button" aria-label="Next photo" onClick={(e) => { e.stopPropagation(); go(1); }}>
                <ChevronRight size={34} strokeWidth={1} />
              </button>
            </>
          )}
          <span className="lightbox__count">{index + 1} / {photos.length}</span>
        </div>
      )}
    </div>
  );
}
