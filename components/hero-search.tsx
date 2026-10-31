"use client";

import { FormEvent, useState } from "react";
import { ChevronDown, MapPin, Search } from "lucide-react";

export type SearchFilters = {
  location: string;
  type: string;
  budget: string;
};

export function HeroSearch({ onSearch }: { onSearch: (filters: SearchFilters) => void }) {
  const [location, setLocation] = useState("All locations");
  const [type, setType] = useState("All types");
  const [budget, setBudget] = useState("Any budget");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSearch({ location, type, budget });
  }

  return (
    <form className="property-search" onSubmit={submit} aria-label="Search properties">
      <div className="search-field">
        <label htmlFor="search-location">Location</label>
        <div className="search-field__control">
          <MapPin size={18} strokeWidth={1.6} aria-hidden="true" />
          <select id="search-location" value={location} onChange={(e) => setLocation(e.target.value)}>
            <option>All locations</option>
            <option>Banana Island</option>
            <option>Ikoyi</option>
            <option>Lekki Phase 1</option>
            <option>Victoria Island</option>
            <option>Ajah</option>
            <option>Ikeja GRA</option>
          </select>
          <ChevronDown size={16} aria-hidden="true" />
        </div>
      </div>
      <div className="search-field">
        <label htmlFor="search-type">Property type</label>
        <div className="search-field__control">
          <select id="search-type" value={type} onChange={(e) => setType(e.target.value)}>
            <option>All types</option>
            <option>Apartment</option>
            <option>Duplex</option>
            <option>Villa</option>
          </select>
          <ChevronDown size={16} aria-hidden="true" />
        </div>
      </div>
      <div className="search-field">
        <label htmlFor="search-budget">Price range</label>
        <div className="search-field__control">
          <select id="search-budget" value={budget} onChange={(e) => setBudget(e.target.value)}>
            <option>Any budget</option>
            <option>Under ₦250m</option>
            <option>₦250m – ₦500m</option>
            <option>Above ₦500m</option>
          </select>
          <ChevronDown size={16} aria-hidden="true" />
        </div>
      </div>
      <button className="search-submit" type="submit">
        <Search size={19} strokeWidth={1.8} />
        <span>Find a home</span>
      </button>
    </form>
  );
}
