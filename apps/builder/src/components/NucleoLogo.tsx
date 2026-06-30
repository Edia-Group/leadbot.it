import type { SVGProps } from "react";
import { cn } from "@typebot.io/ui/lib/cn";

export const NucleoMark = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg" {...props}>
    <rect width="36" height="36" rx="9" fill="#1E40AF" />
    <circle cx="18" cy="18" r="4.6" fill="#fff" />
    <circle cx="18" cy="7" r="2.1" fill="#93C5FD" />
    <circle cx="18" cy="29" r="2.1" fill="#93C5FD" />
    <circle cx="7" cy="18" r="2.1" fill="#93C5FD" />
    <circle cx="29" cy="18" r="2.1" fill="#93C5FD" />
    <path
      d="M18 11.4v-2.3M18 24.6v2.3M11.4 18H9.1M24.6 18h2.3"
      stroke="#60A5FA"
      strokeWidth="1.6"
    />
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
    <NucleoMark className="size-10 shrink-0" />
    <div className="flex flex-col">
      <span
        className={cn(
          "text-xl font-extrabold tracking-tight",
          variant === "light" ? "text-white" : "text-[#0f172a]",
        )}
      >
        NUCLEO
      </span>
      <span
        className={cn(
          "text-xs font-medium tracking-wide uppercase",
          variant === "light" ? "text-blue-200/80" : "text-slate-500",
        )}
      >
        AI Platform
      </span>
    </div>
  </div>
);
