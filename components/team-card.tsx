"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import type { TeamMember } from "@/lib/data";
import { TeamModal } from "./team-modal";

export function TeamCard({ member }: { member: TeamMember }) {
  const [open, setOpen] = useState(false);
  const [title, ...rest] = member.role.split("|").map((part) => part.trim());
  const sub = rest.join(" · ");
  const preview = member.bio.split("\n")[0];
  const short = preview.length <= 170 ? preview : `${preview.slice(0, 170).trim()}…`;

  return (
    <>
      <article
        className="tcard"
        onClick={() => setOpen(true)}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            setOpen(true);
          }
        }}
        role="button"
        tabIndex={0}
        aria-label={`Read ${member.name}'s profile`}
        data-cursor="Read"
      >
        <div className="tcard__mono" aria-hidden="true">
          <span>{member.initials}</span>
        </div>
        <div className="tcard__body">
          <h3>{member.name}</h3>
          <p className="tcard__role">{title}</p>
          {sub && <p className="tcard__sub">{sub}</p>}
          <p className="tcard__bio">{short}</p>
          <span className="tcard__cta">
            Read profile <ArrowUpRight size={16} />
          </span>
        </div>
      </article>
      {open && <TeamModal member={member} onClose={() => setOpen(false)} />}
    </>
  );
}
