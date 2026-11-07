"use client";

import { useState } from "react";
import type { TeamMember } from "@/lib/data";
import { TeamModal } from "./team-modal";

export function TeamCard({ member }: { member: TeamMember }) {
  const [open, setOpen] = useState(false);
  const preview = member.bio.length <= 180 ? member.bio : `${member.bio.slice(0, 180).trim()}...`;

  return (
    <>
      <article
        className="team-card"
        onClick={() => setOpen(true)}
        onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); setOpen(true); } }}
        role="button"
        tabIndex={0}
        aria-label={`Read ${member.name}'s profile`}
      >
        <div className="team-card__avatar" aria-hidden="true">
          <span>{member.initials}</span>
        </div>
        <h3>{member.name}</h3>
        <p className="team-card__role">{member.role}</p>
        <p className="team-card__bio">{preview}</p>
        <span className="team-card__cta">Read full profile</span>
      </article>
      {open && <TeamModal member={member} onClose={() => setOpen(false)} />}
    </>
  );
}
