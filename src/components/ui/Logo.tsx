import Image from "next/image";

// Intrinsic size of public/qaankunka-logo.png (wide wordmark).
const LOGO_WIDTH = 1018;
const LOGO_HEIGHT = 245;

interface LogoProps {
  /** Rendered height in px; width follows the image aspect ratio. */
  size?: number;
  className?: string;
}

export function Logo({ size = 28, className = "" }: LogoProps) {
  const width = Math.round((size * LOGO_WIDTH) / LOGO_HEIGHT);
  return (
    <Image
      src="/qaankunka-logo.png"
      alt="Qaankunka Logo"
      width={width}
      height={size}
      priority
      className={`shrink-0 rounded-sm object-contain transition-transform duration-300 hover:scale-105 ${className}`}
    />
  );
}
