"use client";

import { useState } from "react";

export function ValuesTabs({ values }: { values: { title: string; text: string }[] }) {
  const [active, setActive] = useState(0);

  return (
    <div className="vtabs">
      <div className="vtabs__list" role="tablist" aria-label="Mission, vision and values">
        {values.map((value, i) => (
          <button
            key={value.title}
            type="button"
            role="tab"
            id={`value-tab-${i}`}
            aria-selected={active === i}
            aria-controls="value-panel"
            className={active === i ? "is-active" : ""}
            onClick={() => setActive(i)}
          >
            {value.title}
          </button>
        ))}
      </div>
      <div className="vtabs__panel" id="value-panel" role="tabpanel" aria-labelledby={`value-tab-${active}`} key={active}>
        <p>{values[active].text}</p>
      </div>
    </div>
  );
}
