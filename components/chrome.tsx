"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUp, MessageCircle } from "lucide-react";
import { company } from "@/lib/data";

/* ---------- Preloader: logo + counter, once per browser session ---------- */
export function Preloader() {
  const [pct, setPct] = useState(0);
  const [done, setDone] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    let seen = false;
    try {
      seen = !!sessionStorage.getItem("edo-intro");
    } catch {}
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (seen || reduced) {
      setGone(true);
      root.setAttribute("data-ready", "");
      return;
    }

    let raf = 0;
    let timer: ReturnType<typeof setTimeout>;
    const start = performance.now();
    const duration = 1500;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      setPct(Math.round((1 - Math.pow(1 - p, 3)) * 100));
      if (p < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        try {
          sessionStorage.setItem("edo-intro", "1");
        } catch {}
        setDone(true);
        root.setAttribute("data-ready", "");
        timer = setTimeout(() => setGone(true), 1200);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timer);
    };
  }, []);

  if (gone) return null;

  return (
    <div className={`preloader${done ? " is-done" : ""}`} aria-hidden="true">
      <div className="preloader__inner">
        <p className="preloader__name">
          <span>EDOLARK</span>
        </p>
        <p className="preloader__tag">{company.slogan}</p>
      </div>
      <div className="preloader__count">{String(pct).padStart(3, "0")}</div>
      <div className="preloader__bar">
        <span style={{ transform: `scaleX(${pct / 100})` }} />
      </div>
    </div>
  );
}

/* ---------- Cursor: dot + ring, grows on links, shows labels ---------- */
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const root = document.documentElement;
    root.classList.add("has-cursor");

    let x = -100;
    let y = -100;
    let rx = -100;
    let ry = -100;
    let raf = 0;

    const loop = () => {
      rx += (x - rx) * 0.18;
      ry += (y - ry) * 0.18;
      if (dot.current) dot.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      if (ring.current) ring.current.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const onMove = (event: MouseEvent) => {
      x = event.clientX;
      y = event.clientY;
      ring.current?.classList.add("is-visible");
      dot.current?.classList.add("is-visible");
    };
    const onOver = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target || !ring.current) return;
      const labelled = target.closest<HTMLElement>("[data-cursor]");
      const interactive = target.closest("a, button, [role='button'], input, select, textarea, label");
      ring.current.classList.toggle("is-link", !!interactive && !labelled);
      ring.current.classList.toggle("is-label", !!labelled);
      if (label.current) label.current.textContent = labelled?.dataset.cursor ?? "";
    };
    const onLeave = () => {
      ring.current?.classList.remove("is-visible");
      dot.current?.classList.remove("is-visible");
    };
    const onDown = () => ring.current?.classList.add("is-down");
    const onUp = () => ring.current?.classList.remove("is-down");

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.addEventListener("mouseleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      root.classList.remove("has-cursor");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div className="cursor" aria-hidden="true">
      <div ref={ring} className="cursor__ring">
        <span ref={label} className="cursor__label" />
      </div>
      <div ref={dot} className="cursor__dot" />
    </div>
  );
}

/* ---------- Scroll progress bar ---------- */
export function ScrollProgress() {
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      if (bar.current) bar.current.style.transform = `scaleX(${p})`;
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div className="progress" aria-hidden="true">
      <div ref={bar} className="progress__bar" />
    </div>
  );
}

/* ---------- Floating WhatsApp + back-to-top ---------- */
export function FloatingActions() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="floaters">
      <button
        type="button"
        className={`floaters__top${showTop ? " is-visible" : ""}`}
        aria-label="Back to top"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <ArrowUp size={18} />
      </button>
      <a
        className="floaters__wa"
        href={`https://wa.me/${company.whatsapp}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
      >
        <MessageCircle size={22} />
        <span>Chat with us</span>
      </a>
    </div>
  );
}
