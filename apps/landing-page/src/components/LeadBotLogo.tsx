import type { SVGProps } from "react";

// NucleoAI mark: a "nucleo" ring with its core and an amber lead orbiting in.
// Ring + core inherit currentColor so the mark adapts to light/dark surfaces.
const NucleoMark = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 36 36"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden
  >
    <circle cx="18" cy="18" r="14.5" stroke="currentColor" strokeWidth="3" />
    <circle cx="18" cy="18" r="5" fill="currentColor" />
    <circle cx="29" cy="7" r="3.6" fill="#E0A24A" />
  </svg>
);

export const LeadBotLogo = ({
  className,
}: { className?: string } & SVGProps<SVGSVGElement>) => (
  <div className={`flex items-center gap-2 ${className}`}>
    <NucleoMark className="size-7 text-[#0E5F52] dark:text-white" />
  </div>
);

export const LeadBotLogoFull = ({ className }: { className?: string }) => (
  <div className={`flex items-center gap-2.5 ${className}`}>
    <NucleoMark className="size-7 shrink-0 text-[#0E5F52] dark:text-white" />
    <span className="font-display text-2xl font-semibold tracking-tight text-[#14231E] dark:text-white">
      Nucleo<span className="text-[#0E5F52] dark:text-[#BFE3D4]">AI</span>
    </span>
  </div>
);
