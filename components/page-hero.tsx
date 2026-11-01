import Image from "next/image";

export function PageHero({ title, subtitle, image }: { title: string; subtitle?: string; image?: string }) {
  return (
    <section className="page-hero" aria-labelledby="page-title">
      {image && (
        <>
          <Image className="page-hero__image" src={image} alt="" fill sizes="100vw" priority />
          <div className="page-hero__veil" />
        </>
      )}
      <div className="page-hero__content shell">
        <p className="eyebrow">{subtitle}</p>
        <h1 id="page-title">{title}</h1>
      </div>
    </section>
  );
}
