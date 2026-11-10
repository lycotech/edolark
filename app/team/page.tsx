import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { team } from "@/lib/data";
import { PageHero } from "@/components/page-hero";
import { Magnetic, Reveal, SplitText } from "@/components/motion";
import { TeamCard } from "@/components/team-card";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Meet the team",
  description: "Meet the people behind Edolark Ltd — a Lagos design and construction team committed to quality workmanship and excellent client service.",
  alternates: { canonical: "/team" },
};

export default function TeamPage() {
  return (
    <>
      <PageHero
        title={"Meet the\n*team*"}
        subtitle="The people behind Edolark"
        image="/img/pexels-gustavo-fring-6285152.jpg"
      />
      <section className="team-page section shell" aria-labelledby="team-list-title">
        <div className="section-head">
          <div>
            <Reveal><p className="eyebrow">Our people</p></Reveal>
            <SplitText id="team-list-title" text={"A team that listens,\n*advises and delivers.*"} />
          </div>
          <Reveal delay={150}>
            <p className="section-head__note">Our priority is a high level of satisfaction for our clients — which is why we have reliable, credible professionals on every project.</p>
          </Reveal>
        </div>
        <div className="team-grid">
          {team.map((member, i) => (
            <Reveal key={member.name} delay={(i % 2) * 120}>
              <TeamCard member={member} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="cta section section--dark grain" aria-label="Work with us">
        <div className="shell cta__inner">
          <Reveal><p className="eyebrow eyebrow--light">Work with us</p></Reveal>
          <SplitText as="h2" className="cta__title" text={"Want to work with us or *enquire* about a project?"} />
          <Reveal delay={200} className="cta__actions">
            <Magnetic>
              <Link className="btn btn--red btn--lg" href="/contact">
                Get in touch <ArrowUpRight size={20} />
              </Link>
            </Magnetic>
          </Reveal>
        </div>
      </section>
    </>
  );
}
