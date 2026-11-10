"use client";

import { useState } from "react";
import { ArrowUpRight, Building2, HardHat, Leaf, Settings, Truck, Wrench } from "lucide-react";

const icons = [Building2, Wrench, HardHat, Settings, Leaf, Truck];

export function ServicesList({ services }: { services: { title: string; description: string }[] }) {
  const [open, setOpen] = useState(0);

  return (
    <div className="slist">
      {services.map((service, i) => {
        const Icon = icons[i] ?? Building2;
        const isOpen = open === i;
        return (
          <div key={service.title} className={`slist__row${isOpen ? " is-open" : ""}`} onMouseEnter={() => setOpen(i)}>
            <button
              type="button"
              className="slist__head"
              aria-expanded={isOpen}
              aria-controls={`service-${i}`}
              onClick={() => setOpen(i)}
            >
              <span className="slist__icon"><Icon size={28} strokeWidth={1.2} /></span>
              <span className="slist__title">{service.title}</span>
              <span className="slist__arrow"><ArrowUpRight size={26} strokeWidth={1.2} /></span>
            </button>
            <div id={`service-${i}`} className="slist__body" role="region">
              <div>
                <p>{service.description}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
