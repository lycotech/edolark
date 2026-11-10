import Image from "next/image";
import { Parallax, Reveal, SplitText } from "./motion";

export function PageHero({
  title,
  subtitle,
  image,
  intro,
}: {
  title: string;
  subtitle?: string;
  image?: string;
  intro?: string;
}) {
  return (
    <section className="phero grain" aria-labelledby="page-title">
      {image && (
        <Parallax className="phero__media" speed={0.18}>
          <Image src={encodeURI(image)} alt="" fill sizes="100vw" priority />
        </Parallax>
      )}
      <div className="phero__veil" />
      <div className="phero__grid" aria-hidden="true" />
      <div className="phero__content shell">
        {subtitle && <p className="eyebrow eyebrow--light phero__eyebrow">{subtitle}</p>}
        <SplitText as="h1" id="page-title" hero text={title} delay={150} />
        {intro && (
          <Reveal className="phero__intro" delay={500}>
            <p>{intro}</p>
          </Reveal>
        )}
      </div>
      <div className="phero__scroll" aria-hidden="true">
        <span>Scroll</span>
        <i />
      </div>
    </section>
  );
}
