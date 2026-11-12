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

export const ShoeIcon: React.FC = () => (
  <svg viewBox="0 0 64 40" aria-hidden="true" focusable="false">
    <path d="M4 30c8 0 14-6 20-14 3 4 8 6 14 6 10 0 18 4 22 10v4H4z" fill="#1d1d1c" />
    <path d="M4 34h56" stroke="#f4f2ee" strokeWidth="2" />
  </svg>
);
