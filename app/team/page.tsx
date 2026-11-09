import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { team } from "@/lib/data";
import { PageHero } from "@/components/page-hero";
import { TeamCard } from "@/components/team-card";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Meet the team",
  description: "Meet the people behind Edolark Ltd — a Lagos real estate team committed to quality homes and excellent client service.",
  alternates: { canonical: "/team" },
};

export default function TeamPage() {
  return (
    <>
      <PageHero title="Meet the team" subtitle="The people behind Edolark" image="/img/pexels-gustavo-fring-6285152.jpg" />
      <section className="team-page shell" aria-labelledby="team-list-title">
        <div className="team-page__intro">
          <p className="eyebrow">Our people</p>
          <h2 id="team-list-title">A team that listens, advises and delivers.</h2>
          <p>From project managers to client relations, every member of the Edolark team is focused on one thing: helping you move into a home you love.</p>
        </div>
        <div className="team-grid">
          {team.map((member) => (
            <TeamCard key={member.name} member={member} />
          ))}
        </div>
        <div className="team-page__cta">
          <p>Want to work with us or enquire about a project?</p>
          <Link className="button button--dark" href="/contact">Get in touch <ArrowUpRight size={18} /></Link>
        </div>
      </section>
    </>
  );
}
