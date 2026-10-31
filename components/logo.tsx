import Image from "next/image";
import Link from "next/link";

type LogoProps = {
  light?: boolean;
  onClick?: () => void;
};

export function Logo({ light = false, onClick }: LogoProps) {
  return (
    <Link
      href="#top"
      className={`logo ${light ? "logo--light" : ""}`}
      aria-label="EDOLARK home"
      onClick={onClick}
    >
      <Image
        className="logo__image"
        src={light ? "/edolark-logo-light.png" : "/edolark-logo-transparent.png"}
        alt="EDOLARK LTD"
        width={400}
        height={460}
        priority
      />
    </Link>
  );
}
