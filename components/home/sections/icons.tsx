import React from "react";

const base = {
  viewBox: "0 0 24 24",
  "aria-hidden": true,
  focusable: false,
} as const;

export const MailIcon: React.FC = () => (
  <svg {...base}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="M3 7l9 6 9-6" />
  </svg>
);

export const CalendarIcon: React.FC = () => (
  <svg {...base}>
    <rect x="3" y="5" width="18" height="16" rx="2" />
    <path d="M3 10h18M8 3v4M16 3v4" />
  </svg>
);
