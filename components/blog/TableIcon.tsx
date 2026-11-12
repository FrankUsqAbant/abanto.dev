import React from "react";

const SVGS: Record<string, React.ReactNode> = {
  db: <><ellipse cx="12" cy="6" rx="7" ry="3" /><path d="M5 6v12c0 1.7 3.1 3 7 3s7-1.3 7-3V6M5 12c0 1.7 3.1 3 7 3s7-1.3 7-3" /></>,
  git: <><circle cx="6" cy="6" r="2.5" /><circle cx="6" cy="18" r="2.5" /><circle cx="18" cy="8" r="2.5" /><path d="M6 8.5v7M18 10.5c0 4-6 3-11 6" /></>,
  shield: <><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" /><path d="M9 12l2 2 4-4" /></>,
  ml: <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M6 18l2.5-2.5M15.5 8.5L18 6" />,
  nn: <><circle cx="5" cy="7" r="2" /><circle cx="5" cy="17" r="2" /><circle cx="12" cy="12" r="2" /><circle cx="19" cy="7" r="2" /><circle cx="19" cy="17" r="2" /><path d="M7 7.5l3.3 3.3M7 16.5l3.3-3.3M13.7 10.8L17 7.5M13.7 13.2L17 16.5" /></>,
};

const TableIcon: React.FC<{ icon: string }> = ({ icon }) => (
  <i className="lang__ic" aria-hidden="true">
    {icon.startsWith("svg:") ? <svg viewBox="0 0 24 24">{SVGS[icon.slice(4)]}</svg> : icon}
  </i>
);

export default TableIcon;
