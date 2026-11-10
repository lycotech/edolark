"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, MapPin } from "lucide-react";
import type { Project } from "@/lib/data";

/* Desktop: the section pins while vertical scroll drives a horizontal track.
   Mobile / reduced motion: a native swipeable row. */
export function HorizontalShowcase({ projects }: { projects: Project[] }) {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const sec = section.current;
    const trk = track.current;
    const fill = bar.current;
    if (!sec || !trk || !fill) return;

    let active = false;
    let max = 0;
    let raf = 0;

    const update = () => {
      if (!active) return;
      const span = sec.offsetHeight - window.innerHeight;
      const p = span > 0 ? Math.min(1, Math.max(0, -sec.getBoundingClientRect().top / span)) : 0;
      trk.style.transform = `translate3d(${-p * max}px, 0, 0)`;
      fill.style.transform = `scaleX(${p})`;
    };

    const measure = () => {
      const desktop =
        window.innerWidth >= 900 && !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      active = desktop;
      sec.classList.toggle("is-pinned", desktop);
      if (!desktop) {
        sec.style.height = "";
        trk.style.transform = "";
        return;
      }
      max = Math.max(0, trk.scrollWidth - window.innerWidth);
      sec.style.height = `${max + window.innerHeight}px`;
      update();
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    measure();
    window.addEventListener("resize", measure);
    window.addEventListener("load", measure);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", measure);
      window.removeEventListener("load", measure);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <section ref={section} className="hshow" aria-labelledby="hshow-title">
      <div className="hshow__sticky">
        <div ref={track} className="hshow__track">
          <div className="hshow__intro">
            <p className="eyebrow eyebrow--light">Selected developments</p>
            <h2 id="hshow-title">Built across <em>Nigeria.</em></h2>
            <p>From family homes in Lagos and Abuja to civil works and institutional buildings — a portfolio delivered with quality workmanship.</p>
            <Link className="btn btn--light" href="/projects">
              All projects <ArrowRight size={18} />
            </Link>
          </div>
          {projects.map((project) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="hcard"
              data-cursor="View"
            >
              <span className="hcard__media">
                <Image
                  src={encodeURI(project.gallery[0])}
                  alt={project.title}
                  fill
                  sizes="(max-width: 900px) 80vw, 34vw"
                />
                <span className="hcard__shade" />
                <span className="hcard__status">{project.status}</span>
                <span className="hcard__arrow"><ArrowUpRight size={24} strokeWidth={1.3} /></span>
              </span>
              <span className="hcard__meta">
                <span className="hcard__loc"><MapPin size={14} />{project.location}</span>
                <span className="hcard__title">{project.title}</span>
              </span>
            </Link>
          ))}
          <div className="hshow__end" aria-hidden="true" />
        </div>
        <div className="hshow__progress" aria-hidden="true">
          <span ref={bar} />
        </div>
      </div>
    </section>
  );
}
