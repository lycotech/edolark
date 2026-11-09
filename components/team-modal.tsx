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
    <div className="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="team-modal-name" onClick={onClose}>
      <div className="team-modal" onClick={(event) => event.stopPropagation()}>
        <button className="modal-close" type="button" aria-label="Close profile" onClick={onClose}>
          <X size={20} strokeWidth={1.5} />
        </button>
        <div className="team-modal__header">
          <div className="team-modal__avatar" aria-hidden="true">
            <span>{member.initials}</span>
          </div>
          <div>
            <h2 id="team-modal-name">{member.name}</h2>
            <p className="team-modal__role">{member.role}</p>
          </div>
        </div>
        <div className="team-modal__body">
          {member.bio.split(/\n+/).map((paragraph, index) =>
            paragraph.trim() ? <p key={index}>{paragraph.trim()}</p> : null
          )}
        </div>
      </div>
    </div>
  );
}
