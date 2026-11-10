"use client";

import { Fragment, useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

/* ---------- shared: fire once when an element enters the viewport ---------- */
function useInView<T extends HTMLElement>(threshold = 0.15, rootMargin = "0px 0px -8% 0px") {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold, rootMargin }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold, rootMargin]);

  return [ref, inView] as const;
}

const finePointer = () =>
  typeof window !== "undefined" && window.matchMedia("(hover: hover) and (pointer: fine)").matches;

const reducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------- Reveal: fade / slide / clip / scale in on scroll ---------- */
export function Reveal({
  children,
  className = "",
  delay = 0,
  variant = "up",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: "up" | "fade" | "clip" | "scale" | "left";
}) {
  const [ref, inView] = useInView<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`reveal reveal--${variant}${inView ? " is-in" : ""} ${className}`.trim()}
      style={{ "--d": `${delay}ms` } as CSSProperties}
    >
      {children}
    </div>
  );
}

/* ---------- SplitText: masked word-by-word headline reveal ----------
   "\n" breaks a line, *word* renders as an accent (italic, red). */
export function SplitText({
  text,
  as: Tag = "h2",
  className = "",
  hero = false,
  delay = 0,
  id,
}: {
  text: string;
  as?: "h1" | "h2" | "h3" | "p" | "div";
  className?: string;
  hero?: boolean;
  delay?: number;
  id?: string;
}) {
  const [ref, inView] = useInView<HTMLSpanElement>(0.35);
  let n = 0;
  const label = text.replace(/\*/g, "").replace(/\n/g, " ");

  return (
    <Tag id={id} className={`split ${hero ? "is-hero" : ""} ${className}`.trim()} aria-label={label}>
      <span ref={ref} className={`split__in${inView ? " is-in" : ""}`} aria-hidden="true">
        {text.split("\n").map((line, li) => (
          <span className="split__line" key={li}>
            {(line.match(/\*[^*]+\*|[^\s*]+/g) ?? []).map((token) => {
              const accent = token.startsWith("*");
              const word = accent ? token.slice(1, -1) : token;
              const style = { "--i": n++, "--base": `${delay}ms` } as CSSProperties;
              return (
                <Fragment key={`${li}-${n}`}>
                  <span className="word">
                    <span className="word__inner" style={style}>
                      {accent ? <em>{word}</em> : word}
                    </span>
                  </span>{" "}
                </Fragment>
              );
            })}
          </span>
        ))}
      </span>
    </Tag>
  );
}

/* ---------- Counter: counts up when scrolled into view ---------- */
export function Counter({
  to,
  prefix = "",
  suffix = "",
  duration = 1800,
}: {
  to: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}) {
  const [ref, inView] = useInView<HTMLSpanElement>(0.4);
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reducedMotion()) {
      setValue(to);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      setValue(Math.round((1 - Math.pow(1 - p, 4)) * to));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration]);

  return (
    <span ref={ref}>
      {prefix}
      {value}
      {suffix}
    </span>
  );
}

/* ---------- Magnetic: element leans towards the cursor ---------- */
export function Magnetic({
  children,
  strength = 0.3,
  className = "",
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const wrap = useRef<HTMLSpanElement>(null);
  const inner = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = wrap.current;
    const move = inner.current;
    if (!el || !move || !finePointer() || reducedMotion()) return;

    const onMove = (event: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = (event.clientX - (rect.left + rect.width / 2)) * strength;
      const y = (event.clientY - (rect.top + rect.height / 2)) * strength;
      move.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    };
    const onLeave = () => {
      move.style.transform = "";
    };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [strength]);

  return (
    <span ref={wrap} className={`magnetic ${className}`.trim()}>
      <span ref={inner} className="magnetic__inner">
        {children}
      </span>
    </span>
  );
}

/* ---------- Parallax: child drifts slower than the page ---------- */
export function Parallax({
  children,
  speed = 0.14,
  className = "",
}: {
  children: ReactNode;
  speed?: number;
  className?: string;
}) {
  const box = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = box.current;
    const move = inner.current;
    if (!el || !move || reducedMotion()) return;
    let raf = 0;

    const update = () => {
      const rect = el.getBoundingClientRect();
      if (rect.bottom < -100 || rect.top > window.innerHeight + 100) return;
      const progress = (rect.top + rect.height / 2 - window.innerHeight / 2) / window.innerHeight;
      move.style.transform = `translate3d(0, ${(-progress * speed * 100).toFixed(2)}px, 0)`;
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
  }, [speed]);

  return (
    <div ref={box} className={`parallax ${className}`.trim()}>
      <div ref={inner} className="parallax__inner">
        {children}
      </div>
    </div>
  );
}

/* ---------- ScrollFill: words light up as you scroll past ---------- */
export function ScrollFill({ text, className = "" }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const words = text.split(/\s+/);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reducedMotion()) {
      setCount(words.length);
      return;
    }
    let raf = 0;
    const update = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = Math.min(1, Math.max(0, (vh * 0.85 - rect.top) / (rect.height + vh * 0.3)));
      setCount(Math.round(p * words.length));
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
  }, [words.length]);

  return (
    <p ref={ref} className={`scroll-fill ${className}`.trim()}>
      {words.map((word, i) => (
        <span key={i} className={i < count ? "on" : ""}>
          {word}{" "}
        </span>
      ))}
    </p>
  );
}
