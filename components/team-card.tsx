import type { TeamMember } from "@/lib/data";

export function TeamCard({ member }: { member: TeamMember }) {
  return (
    <article className="team-card">
      <div className="team-card__avatar" aria-hidden="true">
        <span>{member.initials}</span>
      </div>
      <h3>{member.name}</h3>
      <p>{member.role}</p>
    </article>
  );
}
