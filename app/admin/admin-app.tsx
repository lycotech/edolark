"use client";

import { useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import type { Project, TeamMember } from "@/lib/data";
import type { EquipmentItem, Service } from "@/lib/content";
import { deleteEnquiry, logout, saveContent, setEnquiryHandled } from "./actions";

export type Enquiry = {
  id: string;
  created_at: string;
  name: string;
  phone: string;
  email: string;
  interest: string;
  message: string;
  handled: boolean;
};

type Tab = "projects" | "team" | "services" | "equipment" | "enquiries";

const STATUSES: Project["status"][] = ["Available now", "Completed", "Ongoing", "Executed", "Coming soon"];

const slugify = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 80);

function move<T>(items: T[], from: number, to: number) {
  if (to < 0 || to >= items.length) return items;
  const next = [...items];
  const [item] = next.splice(from, 1);
  next.splice(to, 0, item);
  return next;
}

/* ---------- shared: edit a list, then save it ---------- */
function useCollection<T>(key: "projects" | "team" | "services" | "equipment", initial: T[]) {
  const [items, setItems] = useState<T[]>(initial);
  const [dirty, setDirty] = useState(false);
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(null);
  const [saving, startSaving] = useTransition();

  const update = (next: T[]) => {
    setItems(next);
    setDirty(true);
    setMessage(null);
  };

  const save = () =>
    startSaving(async () => {
      const result = await saveContent(key, items);
      if (result.ok) {
        setDirty(false);
        setMessage({ ok: true, text: "Saved. The live site is updated." });
      } else {
        setMessage({ ok: false, text: result.error });
      }
    });

  return { items, update, dirty, message, saving, save };
}

function SaveBar({ dirty, saving, message, onSave }: { dirty: boolean; saving: boolean; message: { ok: boolean; text: string } | null; onSave: () => void }) {
  return (
    <div className="admin-savebar">
      <span className={message ? (message.ok ? "admin-ok" : "admin-err") : dirty ? "admin-dirty" : ""}>
        {message ? message.text : dirty ? "You have unsaved changes." : "No unsaved changes."}
      </span>
      <button type="button" className="admin-btn admin-btn--primary" onClick={onSave} disabled={!dirty || saving}>
        {saving ? "Saving…" : "Save changes"}
      </button>
    </div>
  );
}

/* ---------- photo upload (resized in the browser first) ---------- */
async function resizeImage(file: File, max = 2000): Promise<Blob> {
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, max / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  canvas.getContext("2d")!.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  return new Promise((resolve, reject) => canvas.toBlob((blob) => (blob ? resolve(blob) : reject(new Error("resize failed"))), "image/jpeg", 0.85));
}

/* ====================== PROJECTS ====================== */
function ProjectsEditor({ initial }: { initial: Project[] }) {
  const { items, update, dirty, message, saving, save } = useCollection<Project>("projects", initial);
  const [selected, setSelected] = useState(0);
  const [fresh, setFresh] = useState<Set<string>>(new Set());
  const [uploading, setUploading] = useState(0);
  const [uploadError, setUploadError] = useState("");
  const fileInput = useRef<HTMLInputElement>(null);

  const project = items[selected];
  const patch = (changes: Partial<Project>) => update(items.map((p, i) => (i === selected ? { ...p, ...changes } : p)));

  const add = () => {
    const slug = `new-project-${Date.now().toString(36)}`;
    const blank: Project = { slug, title: "", location: "", status: "Completed", type: "", summary: "", description: "", features: [], gallery: [] };
    update([blank, ...items]);
    setFresh(new Set(fresh).add(slug));
    setSelected(0);
  };

  const remove = () => {
    if (!project || !window.confirm(`Delete "${project.title || "this project"}"? This removes it from the site once you save.`)) return;
    update(items.filter((_, i) => i !== selected));
    setSelected(Math.max(0, selected - 1));
  };

  const onTitle = (title: string) => {
    if (fresh.has(project.slug)) {
      const slug = slugify(title) || project.slug;
      const next = new Set(fresh);
      next.delete(project.slug);
      next.add(slug);
      setFresh(next);
      patch({ title, slug });
    } else {
      patch({ title });
    }
  };

  const upload = async (files: FileList | null) => {
    if (!files?.length || !project) return;
    setUploadError("");
    const urls: string[] = [];
    setUploading(files.length);
    for (const file of Array.from(files)) {
      try {
        const blob = await resizeImage(file);
        const form = new FormData();
        form.append("file", new File([blob], "photo.jpg", { type: "image/jpeg" }));
        form.append("folder", project.slug);
        const response = await fetch("/api/admin/upload", { method: "POST", body: form });
        const result = await response.json();
        if (!response.ok) throw new Error(result.error || "Upload failed");
        urls.push(result.url);
      } catch (error) {
        setUploadError(error instanceof Error ? error.message : "Upload failed");
      }
      setUploading((n) => n - 1);
    }
    if (urls.length) patch({ gallery: [...project.gallery, ...urls] });
    if (fileInput.current) fileInput.current.value = "";
  };

  return (
    <div className="admin-split">
      <aside className="admin-list">
        <button type="button" className="admin-btn admin-btn--primary admin-btn--block" onClick={add}>+ Add project</button>
        <ul>
          {items.map((p, i) => (
            <li key={p.slug}>
              <button type="button" className={i === selected ? "is-active" : ""} onClick={() => setSelected(i)}>
                <strong>{p.title || "Untitled project"}</strong>
                <small>{p.status} · {p.gallery.length} photos</small>
              </button>
            </li>
          ))}
        </ul>
      </aside>

      <section className="admin-form">
        {!project ? (
          <p className="admin-empty">No projects yet. Click “Add project”.</p>
        ) : (
          <>
            <div className="admin-row admin-row--between">
              <h2>{project.title || "New project"}</h2>
              <span className="admin-actions">
                <button type="button" className="admin-btn" onClick={() => { update(move(items, selected, selected - 1)); setSelected(Math.max(0, selected - 1)); }} disabled={selected === 0}>Move up</button>
                <button type="button" className="admin-btn" onClick={() => { update(move(items, selected, selected + 1)); setSelected(Math.min(items.length - 1, selected + 1)); }} disabled={selected === items.length - 1}>Move down</button>
                <button type="button" className="admin-btn admin-btn--danger" onClick={remove}>Delete</button>
              </span>
            </div>
            <p className="admin-hint">Projects appear on the site in this order. Web address: /projects/{project.slug}</p>

            <label>Title<input value={project.title} onChange={(e) => onTitle(e.target.value)} /></label>
            <div className="admin-grid2">
              <label>Location<input value={project.location} onChange={(e) => patch({ location: e.target.value })} placeholder="Gbagada, Lagos State" /></label>
              <label>Status
                <select value={project.status} onChange={(e) => patch({ status: e.target.value as Project["status"] })}>
                  {STATUSES.map((s) => <option key={s}>{s}</option>)}
                </select>
              </label>
              <label>Project type<input value={project.type} onChange={(e) => patch({ type: e.target.value })} placeholder="Residential Development" /></label>
              <label>Year completed<input value={project.completedYear ?? ""} onChange={(e) => patch({ completedYear: e.target.value })} /></label>
              <label>Client<input value={project.client ?? ""} onChange={(e) => patch({ client: e.target.value })} /></label>
              <label>Contract value<input value={project.contractSum ?? ""} onChange={(e) => patch({ contractSum: e.target.value })} /></label>
            </div>
            <label>Short summary (shown on cards)<input value={project.summary} onChange={(e) => patch({ summary: e.target.value })} /></label>
            <label>Full description<textarea rows={6} value={project.description} onChange={(e) => patch({ description: e.target.value })} /></label>
            <label>Highlights (one per line)
              <textarea rows={5} value={project.features.join("\n")} onChange={(e) => patch({ features: e.target.value.split("\n") })} />
            </label>

            <div className="admin-photos">
              <div className="admin-row admin-row--between">
                <h3>Photos ({project.gallery.length})</h3>
                <button type="button" className="admin-btn admin-btn--primary" onClick={() => fileInput.current?.click()} disabled={uploading > 0}>
                  {uploading > 0 ? `Uploading ${uploading}…` : "+ Upload photos"}
                </button>
                <input ref={fileInput} type="file" accept="image/*" multiple hidden onChange={(e) => upload(e.target.files)} />
              </div>
              <p className="admin-hint">The first photo is the cover on the site. Photos are resized automatically.</p>
              {uploadError && <p className="admin-note admin-note--error">{uploadError}</p>}
              <div className="admin-photogrid">
                {project.gallery.map((src, i) => (
                  <figure key={`${src}-${i}`} className={i === 0 ? "is-cover" : ""}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={encodeURI(src)} alt="" loading="lazy" />
                    {i === 0 && <span className="admin-badge">Cover</span>}
                    <figcaption>
                      <button type="button" title="Make cover" onClick={() => patch({ gallery: move(project.gallery, i, 0) })} disabled={i === 0}>★</button>
                      <button type="button" title="Move earlier" onClick={() => patch({ gallery: move(project.gallery, i, i - 1) })} disabled={i === 0}>←</button>
                      <button type="button" title="Move later" onClick={() => patch({ gallery: move(project.gallery, i, i + 1) })} disabled={i === project.gallery.length - 1}>→</button>
                      <button type="button" title="Remove photo" onClick={() => patch({ gallery: project.gallery.filter((_, n) => n !== i) })}>✕</button>
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </>
        )}
      </section>
      <SaveBar dirty={dirty} saving={saving} message={message} onSave={save} />
    </div>
  );
}

/* ====================== TEAM ====================== */
function TeamEditor({ initial }: { initial: TeamMember[] }) {
  const { items, update, dirty, message, saving, save } = useCollection<TeamMember>("team", initial);
  const [selected, setSelected] = useState(0);
  const member = items[selected];
  const patch = (changes: Partial<TeamMember>) => update(items.map((m, i) => (i === selected ? { ...m, ...changes } : m)));
  const initialsOf = (name: string) => name.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]).join("").toUpperCase();

  return (
    <div className="admin-split">
      <aside className="admin-list">
        <button type="button" className="admin-btn admin-btn--primary admin-btn--block" onClick={() => { update([{ name: "", role: "", initials: "", bio: "" }, ...items]); setSelected(0); }}>+ Add team member</button>
        <ul>
          {items.map((m, i) => (
            <li key={i}>
              <button type="button" className={i === selected ? "is-active" : ""} onClick={() => setSelected(i)}>
                <strong>{m.name || "New member"}</strong>
                <small>{m.role}</small>
              </button>
            </li>
          ))}
        </ul>
      </aside>
      <section className="admin-form">
        {!member ? (
          <p className="admin-empty">No team members yet.</p>
        ) : (
          <>
            <div className="admin-row admin-row--between">
              <h2>{member.name || "New member"}</h2>
              <span className="admin-actions">
                <button type="button" className="admin-btn" disabled={selected === 0} onClick={() => { update(move(items, selected, selected - 1)); setSelected(selected - 1); }}>Move up</button>
                <button type="button" className="admin-btn" disabled={selected === items.length - 1} onClick={() => { update(move(items, selected, selected + 1)); setSelected(selected + 1); }}>Move down</button>
                <button type="button" className="admin-btn admin-btn--danger" onClick={() => { if (window.confirm(`Remove ${member.name || "this member"}?`)) { update(items.filter((_, i) => i !== selected)); setSelected(Math.max(0, selected - 1)); } }}>Delete</button>
              </span>
            </div>
            <div className="admin-grid2">
              <label>Full name<input value={member.name} onChange={(e) => patch({ name: e.target.value, initials: member.initials || initialsOf(e.target.value) })} /></label>
              <label>Initials<input value={member.initials} maxLength={3} onChange={(e) => patch({ initials: e.target.value })} /></label>
            </div>
            <label>Role / title<input value={member.role} onChange={(e) => patch({ role: e.target.value })} placeholder="Architect | Edolark Ltd" /></label>
            <label>Biography (leave a blank line between paragraphs)<textarea rows={14} value={member.bio} onChange={(e) => patch({ bio: e.target.value })} /></label>
          </>
        )}
      </section>
      <SaveBar dirty={dirty} saving={saving} message={message} onSave={save} />
    </div>
  );
}

/* ====================== SERVICES ====================== */
function ServicesEditor({ initial }: { initial: Service[] }) {
  const { items, update, dirty, message, saving, save } = useCollection<Service>("services", initial);
  return (
    <div className="admin-stack">
      <button type="button" className="admin-btn admin-btn--primary" onClick={() => update([...items, { title: "", description: "" }])}>+ Add service</button>
      {items.map((service, i) => (
        <div className="admin-card admin-card--row" key={i}>
          <div className="admin-fields">
            <label>Service name<input value={service.title} onChange={(e) => update(items.map((s, n) => (n === i ? { ...s, title: e.target.value } : s)))} /></label>
            <label>Description<textarea rows={4} value={service.description} onChange={(e) => update(items.map((s, n) => (n === i ? { ...s, description: e.target.value } : s)))} /></label>
          </div>
          <div className="admin-actions admin-actions--col">
            <button type="button" className="admin-btn" disabled={i === 0} onClick={() => update(move(items, i, i - 1))}>↑</button>
            <button type="button" className="admin-btn" disabled={i === items.length - 1} onClick={() => update(move(items, i, i + 1))}>↓</button>
            <button type="button" className="admin-btn admin-btn--danger" onClick={() => { if (window.confirm(`Delete "${service.title || "this service"}"?`)) update(items.filter((_, n) => n !== i)); }}>Delete</button>
          </div>
        </div>
      ))}
      <SaveBar dirty={dirty} saving={saving} message={message} onSave={save} />
    </div>
  );
}

/* ====================== EQUIPMENT ====================== */
function EquipmentEditor({ initial }: { initial: EquipmentItem[] }) {
  const { items, update, dirty, message, saving, save } = useCollection<EquipmentItem>("equipment", initial);
  return (
    <div className="admin-stack">
      <button type="button" className="admin-btn admin-btn--primary" onClick={() => update([...items, { name: "" }])}>+ Add equipment</button>
      <div className="admin-card">
        {items.map((item, i) => (
          <div className="admin-line" key={i}>
            <input value={item.name} placeholder="e.g. Dump truck" onChange={(e) => update(items.map((x, n) => (n === i ? { name: e.target.value } : x)))} />
            <button type="button" className="admin-btn" disabled={i === 0} onClick={() => update(move(items, i, i - 1))}>↑</button>
            <button type="button" className="admin-btn" disabled={i === items.length - 1} onClick={() => update(move(items, i, i + 1))}>↓</button>
            <button type="button" className="admin-btn admin-btn--danger" onClick={() => update(items.filter((_, n) => n !== i))}>✕</button>
          </div>
        ))}
      </div>
      <SaveBar dirty={dirty} saving={saving} message={message} onSave={save} />
    </div>
  );
}

/* ====================== ENQUIRIES ====================== */
function EnquiriesPanel({ initial, connected }: { initial: Enquiry[]; connected: boolean }) {
  const router = useRouter();
  const [rows, setRows] = useState(initial);
  const [, start] = useTransition();

  const toggle = (row: Enquiry) => {
    setRows(rows.map((r) => (r.id === row.id ? { ...r, handled: !r.handled } : r)));
    start(async () => {
      await setEnquiryHandled(row.id, !row.handled);
      router.refresh();
    });
  };
  const remove = (row: Enquiry) => {
    if (!window.confirm(`Delete the enquiry from ${row.name}? This cannot be undone.`)) return;
    setRows(rows.filter((r) => r.id !== row.id));
    start(async () => {
      await deleteEnquiry(row.id);
      router.refresh();
    });
  };

  if (!connected) return <p className="admin-empty">Connect Supabase to store enquiries here.</p>;
  if (!rows.length) return <p className="admin-empty">No enquiries yet. New messages from the Contact page will appear here (they are also emailed to info@edolark.com).</p>;

  return (
    <div className="admin-stack">
      {rows.map((row) => (
        <article key={row.id} className={`admin-card admin-enquiry${row.handled ? " is-done" : ""}`}>
          <header>
            <strong>{row.name}</strong>
            <time>{new Date(row.created_at).toLocaleString("en-NG", { dateStyle: "medium", timeStyle: "short" })}</time>
          </header>
          <p className="admin-meta">
            <a href={`mailto:${row.email}`}>{row.email}</a> · <a href={`tel:${row.phone}`}>{row.phone}</a>
            {row.interest ? ` · ${row.interest}` : ""}
          </p>
          {row.message && <p className="admin-message">{row.message}</p>}
          <footer>
            <button type="button" className="admin-btn" onClick={() => toggle(row)}>{row.handled ? "Mark as new" : "Mark as handled"}</button>
            <a className="admin-btn" href={`mailto:${row.email}?subject=Your%20enquiry%20to%20Edolark`}>Reply</a>
            <button type="button" className="admin-btn admin-btn--danger" onClick={() => remove(row)}>Delete</button>
          </footer>
        </article>
      ))}
    </div>
  );
}

/* ====================== SHELL ====================== */
export function AdminApp({
  connected,
  projects,
  team,
  services,
  equipment,
  enquiries,
}: {
  connected: boolean;
  projects: Project[];
  team: TeamMember[];
  services: Service[];
  equipment: EquipmentItem[];
  enquiries: Enquiry[];
}) {
  const [tab, setTab] = useState<Tab>("projects");
  const newCount = enquiries.filter((e) => !e.handled).length;
  const tabs: { id: Tab; label: string }[] = [
    { id: "projects", label: "Projects" },
    { id: "team", label: "Team" },
    { id: "services", label: "Services" },
    { id: "equipment", label: "Equipment" },
    { id: "enquiries", label: newCount ? `Enquiries (${newCount})` : "Enquiries" },
  ];

  return (
    <div className="admin-app">
      <header className="admin-top">
        <div>
          <p className="admin-eyebrow">EDOLARK LTD</p>
          <h1>Site admin</h1>
        </div>
        <span className="admin-actions">
          <a className="admin-btn" href="/" target="_blank" rel="noreferrer">View site ↗</a>
          <form action={logout}><button className="admin-btn" type="submit">Log out</button></form>
        </span>
      </header>

      {!connected && (
        <p className="admin-note admin-note--warn">
          Supabase is not connected, so you can look around but changes can’t be saved. Follow SETUP-ADMIN.md to connect it.
        </p>
      )}

      <nav className="admin-tabs" aria-label="Sections">
        {tabs.map((t) => (
          <button key={t.id} type="button" className={tab === t.id ? "is-active" : ""} onClick={() => setTab(t.id)}>{t.label}</button>
        ))}
      </nav>

      <main className="admin-main">
        <div hidden={tab !== "projects"}><ProjectsEditor initial={projects} /></div>
        <div hidden={tab !== "team"}><TeamEditor initial={team} /></div>
        <div hidden={tab !== "services"}><ServicesEditor initial={services} /></div>
        <div hidden={tab !== "equipment"}><EquipmentEditor initial={equipment} /></div>
        <div hidden={tab !== "enquiries"}><EnquiriesPanel initial={enquiries} connected={connected} /></div>
      </main>
    </div>
  );
}
