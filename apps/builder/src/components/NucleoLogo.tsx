import type { SVGProps } from "react";
import { cn } from "@typebot.io/ui/lib/cn";

// NucleoAI mark: a "nucleo" ring with its core and an amber lead orbiting in.
// Ring + core inherit currentColor so the mark adapts to light/dark surfaces.
export const NucleoMark = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <circle cx="18" cy="18" r="14.5" stroke="currentColor" strokeWidth="3" />
    <circle cx="18" cy="18" r="5" fill="currentColor" />
    <circle cx="29" cy="7" r="3.6" fill="#E0A24A" />
  </svg>
);

export const NucleoLogoFull = ({
  className,
  variant = "light",
}: {
  className?: string;
  variant?: "light" | "dark";
}) => (
  <div className={cn("flex items-center gap-3", className)}>
    <NucleoMark
      className={cn(
        "size-9 shrink-0",
        variant === "light" ? "text-white" : "text-[#0E5F52]",
      )}
    />
    <div className="flex flex-col leading-none">
      <span
        className={cn(
          "font-display text-xl font-semibold tracking-tight",
          variant === "light" ? "text-white" : "text-[#14231E]",
        )}
      >
        Nucleo
        <span className={variant === "light" ? "text-[#BFE3D4]" : "text-[#0E5F52]"}>
          AI
        </span>
      </span>
      <span
        className={cn(
          "mt-0.5 text-[10px] font-semibold tracking-[0.16em] uppercase",
          variant === "light" ? "text-[#BFE3D4]/80" : "text-[#586863]",
        )}
      >
        AI Platform
      </span>
    </div>
  </div>
);
