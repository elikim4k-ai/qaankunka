import Image from "next/image";

interface LogoProps {
  size?: number;
  className?: string;
}

export function Logo({ size = 32, className = "" }: LogoProps) {
  return (
    <Image
      src="/qaankunka-logo.png"
      alt="Qaankunka Logo"
      width={size}
      height={size}
      priority
      className={`shrink-0 rounded-sm object-contain transition-transform duration-300 hover:scale-105 ${className}`}
    />
  );
}
