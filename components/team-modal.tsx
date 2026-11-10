"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import type { TeamMember } from "@/lib/data";

export function TeamModal({ member, onClose }: { member: TeamMember; onClose: () => void }) {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div className="drawer-backdrop" role="dialog" aria-modal="true" aria-labelledby="team-modal-name" onClick={onClose}>
      <aside className="drawer" onClick={(event) => event.stopPropagation()}>
        <button className="drawer__close" type="button" aria-label="Close profile" onClick={onClose}>
          <X size={22} strokeWidth={1.3} />
        </button>
        <div className="drawer__head">
          <div className="drawer__mono" aria-hidden="true">{member.initials}</div>
          <div>
            <h2 id="team-modal-name">{member.name}</h2>
            <p>{member.role}</p>
          </div>
        </div>
        <div className="drawer__body">
          {member.bio.split(/\n+/).map((paragraph, index) =>
            paragraph.trim() ? <p key={index}>{paragraph.trim()}</p> : null
          )}
        </div>
      </aside>
    </div>
  );
}
