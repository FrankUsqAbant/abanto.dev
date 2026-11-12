import React from "react";

/** Iconos en SVG en línea (sustituyen a Font Awesome: sin CDN ni CSS bloqueante). */
const PATHS = {
  bars: "M4 7h16M4 12h16M4 17h16",
  times: "M6 6l12 12M18 6L6 18",
  search: "M10.5 17a6.5 6.5 0 1 0 0-13 6.5 6.5 0 0 0 0 13zM20 20l-4.6-4.6",
  house: "M4 11l8-7 8 7M6 9.5V20h4v-5h4v5h4V9.5",
  graduation: "M2.5 9L12 4.5 21.5 9 12 13.5 2.5 9zM6.5 11v4.5c0 1.6 2.5 3 5.5 3s5.5-1.4 5.5-3V11M21.5 9v5",
  user: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4.5 20c.8-3.6 3.8-6 7.5-6s6.7 2.4 7.5 6",
  chevronRight: "M9 5l7 7-7 7",
} as const;

export type IconName = keyof typeof PATHS;

const Icon: React.FC<{ name: IconName; className?: string; size?: number | string }> = ({ name, className, size = "1em" }) => (
  <svg
    className={className}
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    focusable="false"
  >
    <path d={PATHS[name]} />
  </svg>
);

export default Icon;
