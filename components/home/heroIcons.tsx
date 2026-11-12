import React from "react";

/** Iconos del hero (SVG en línea, trazo 1.6). */

export const svgProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export type ServiceIconName =
  | "trend"
  | "blend"
  | "chat"
  | "zap"
  | "globe"
  | "share"
  | "bot"
  | "chart";

export const ServiceIcon: React.FC<{ name: ServiceIconName }> = ({ name }) => {
  switch (name) {
    case "trend":
      return (
        <svg {...svgProps}>
          <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
          <polyline points="16 7 22 7 22 13" />
        </svg>
      );
    case "blend":
      return (
        <svg {...svgProps}>
          <circle cx="9" cy="9" r="6" />
          <circle cx="15" cy="15" r="6" />
        </svg>
      );
    case "chat":
      return (
        <svg {...svgProps}>
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          <path d="M8 9h8M8 13h5" />
        </svg>
      );
    case "zap":
      return (
        <svg {...svgProps}>
          <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
        </svg>
      );
    case "globe":
      return (
        <svg {...svgProps}>
          <rect x="3" y="4" width="18" height="16" rx="2" />
          <path d="M3 9h18M7 6.5h.01M10 6.5h.01" />
          <path d="M8 13h5M8 16h8" />
        </svg>
      );
    case "share":
      return (
        <svg {...svgProps}>
          <circle cx="18" cy="5" r="3" />
          <circle cx="6" cy="12" r="3" />
          <circle cx="18" cy="19" r="3" />
          <path d="m8.6 13.5 6.8 4M15.4 6.5l-6.8 4" />
        </svg>
      );
    case "bot":
      return (
        <svg {...svgProps}>
          <rect x="4" y="8" width="16" height="12" rx="3" />
          <path d="M12 8V4M9 4h6" />
          <path d="M9 13v1.5M15 13v1.5" />
          <path d="M2 13v3M22 13v3" />
        </svg>
      );
    case "chart":
      return (
        <svg {...svgProps}>
          <path d="M3 3v18h18" />
          <path d="M8 16v-4M12.5 16V8M17 16v-6" />
        </svg>
      );
  }
};

export const ArrowUpRight: React.FC<{ className?: string }> = ({ className }) => (
  <svg {...svgProps} className={className}>
    <path d="M7 17 17 7" />
    <path d="M7 7h10v10" />
  </svg>
);

export const ArrowDown: React.FC<{ className?: string }> = ({ className }) => (
  <svg {...svgProps} className={className}>
    <path d="M12 5v14" />
    <path d="m19 12-7 7-7-7" />
  </svg>
);
