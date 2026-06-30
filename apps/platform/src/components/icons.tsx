import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;
const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  viewBox: "0 0 24 24",
};

export const IconHome = (p: P) => (
  <svg {...base} {...p}>
    <path d="M3 9.5 12 3l9 6.5V20a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z" />
  </svg>
);
export const IconBrain = (p: P) => (
  <svg {...base} {...p}>
    <path d="M9 3a3 3 0 0 0-3 3 3 3 0 0 0-1 5.8A3 3 0 0 0 6 17a3 3 0 0 0 3 3 2 2 0 0 0 2-2V5a2 2 0 0 0-2-2Z" />
    <path d="M15 3a3 3 0 0 1 3 3 3 3 0 0 1 1 5.8A3 3 0 0 1 18 17a3 3 0 0 1-3 3 2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" />
  </svg>
);
export const IconZap = (p: P) => (
  <svg {...base} {...p}>
    <path d="M13 2 4 14h7l-1 8 9-12h-7z" />
  </svg>
);
export const IconCalendar = (p: P) => (
  <svg {...base} {...p}>
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <path d="M16 2v4M8 2v4M3 10h18" />
  </svg>
);
export const IconChat = (p: P) => (
  <svg {...base} {...p}>
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);
export const IconUsers = (p: P) => (
  <svg {...base} {...p}>
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13A4 4 0 0 1 16 11" />
  </svg>
);
export const IconPlug = (p: P) => (
  <svg {...base} {...p}>
    <path d="M12 22v-5M9 8V2M15 8V2M5 8h14v3a7 7 0 0 1-14 0z" />
  </svg>
);
export const IconUpload = (p: P) => (
  <svg {...base} {...p}>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 9l5-5 5 5M12 4v12" />
  </svg>
);
export const IconPlus = (p: P) => (
  <svg {...base} {...p}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);
export const IconDoc = (p: P) => (
  <svg {...base} {...p}>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <path d="M14 2v6h6M9 13h6M9 17h6" />
  </svg>
);
export const IconCheck = (p: P) => (
  <svg {...base} {...p}>
    <path d="M20 6 9 17l-5-5" />
  </svg>
);
export const IconSearch = (p: P) => (
  <svg {...base} {...p}>
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);

export const NucleoMark = (p: P) => (
  <svg viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg" {...p}>
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
