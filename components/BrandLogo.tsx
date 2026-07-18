import Link from "next/link";
import { APP_NAME, APP_TAGLINE } from "@/lib/brand";

export type BrandLogoSize = "sm" | "md" | "lg";

const NAME_SIZE: Record<BrandLogoSize, string> = {
  sm: "text-sm",
  md: "text-lg",
  lg: "text-2xl",
};

const TAGLINE_SIZE = "text-xs";

interface BrandLogoMark {
  src: string;
  height: number;
}

interface BrandLogoProps {
  size?: BrandLogoSize;
  href?: string | null;
  showTagline?: boolean;
  /** Optional wordmark image to render instead of the text name (name is still used as alt text). */
  mark?: BrandLogoMark;
  theme?: "light" | "dark";
  align?: "start" | "center";
  className?: string;
}

export function BrandLogo({
  size = "md",
  href = "/",
  showTagline = true,
  mark,
  theme = "light",
  align = "start",
  className = "",
}: BrandLogoProps) {
  const nameColor = theme === "dark" ? "text-white" : "text-slate-950";
  const taglineColor = theme === "dark" ? "text-white/55" : "text-slate-500";

  const content = (
    <span className={`flex flex-col ${align === "center" ? "items-center" : "items-start"} ${className}`}>
      {mark ? (
        <img src={mark.src} alt={APP_NAME} style={{ height: mark.height, width: "auto" }} />
      ) : (
        <span className={`font-semibold leading-tight ${NAME_SIZE[size]} ${nameColor}`}>{APP_NAME}</span>
      )}
      {showTagline && (
        <span className={`leading-tight ${TAGLINE_SIZE} ${taglineColor}`}>{APP_TAGLINE}</span>
      )}
    </span>
  );

  if (!href) return content;

  return (
    <Link href={href} className="inline-flex">
      {content}
    </Link>
  );
}
