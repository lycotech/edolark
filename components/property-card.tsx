"use client";

import Image from "next/image";
import { ArrowUpRight, Bath, BedDouble, Heart, MapPin, Scan } from "lucide-react";
import type { Property } from "@/lib/properties";

type PropertyCardProps = {
  property: Property;
  saved: boolean;
  onSave: (id: number) => void;
  onOpen: (property: Property) => void;
};

export function PropertyCard({ property, saved, onSave, onOpen }: PropertyCardProps) {
  return (
    <article className="property-card">
      <div className="property-card__image">
        <Image
          src={property.image}
          alt={`${property.name}, ${property.location}`}
          fill
          sizes="(max-width: 720px) 100vw, (max-width: 1100px) 50vw, 33vw"
        />
        <span className="property-card__tag">{property.tag}</span>
        <button
          className={`save-property ${saved ? "save-property--saved" : ""}`}
          type="button"
          aria-label={`${saved ? "Remove" : "Save"} ${property.name}`}
          aria-pressed={saved}
          onClick={() => onSave(property.id)}
        >
          <Heart size={19} fill={saved ? "currentColor" : "none"} strokeWidth={1.6} />
        </button>
        <button className="property-card__open" type="button" onClick={() => onOpen(property)}>
          <span>View residence</span><ArrowUpRight size={21} />
        </button>
      </div>
      <div className="property-card__body">
        <p className="property-card__location"><MapPin size={14} />{property.location}</p>
        <h3 className="property-card__title">
          <button type="button" onClick={() => onOpen(property)}>{property.name}</button>
        </h3>
        <p className="property-card__price">{property.price}</p>
        <div className="property-card__details" aria-label={`${property.beds} bedrooms, ${property.baths} bathrooms, ${property.area}`}>
          <span><BedDouble size={17} strokeWidth={1.5} />{property.beds} Beds</span>
          <span><Bath size={16} strokeWidth={1.5} />{property.baths} Baths</span>
          <span><Scan size={16} strokeWidth={1.5} />{property.area}</span>
        </div>
      </div>
    </article>
  );
}
