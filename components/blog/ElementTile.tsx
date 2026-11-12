import React from "react";
import type { PCategory, PItem } from "./types";

interface ElementTileProps {
  item: PItem;
  cat: PCategory | undefined;
  dim: boolean;
  selected: boolean;
  /** Orden de la animación de entrada */
  order: number;
  style?: React.CSSProperties;
  onOpen: (item: PItem, el: HTMLButtonElement) => void;
}

type TileStyle = React.CSSProperties & { "--cc"?: string; "--i"?: number };

const ElementTile: React.FC<ElementTileProps> = ({ item, cat, dim, selected, order, style, onOpen }) => {
  const s: TileStyle = { ...style, "--cc": cat?.color ?? "#A9A7A2", "--i": order };
  return (
    <button
      type="button"
      className={`tile c-${item.c}${cat?.id === "obsolete" ? " c-obsolete" : ""}${dim ? " is-dim" : ""}${selected ? " is-sel" : ""}`}
      style={s}
      data-k={item.k}
      aria-haspopup="dialog"
      title={`${item.label} · ${item.d}`}
      onClick={(e) => onOpen(item, e.currentTarget)}
    >
      <span className="tile__fx" aria-hidden="true" />
      {/* El nombre accesible empieza por el texto visible (WCAG 2.5.3) y suma la descripción. */}
      <span className="tile__n">{item.n}</span>
      <span className="sr-only">. </span>
      <span className="tile__s">{item.s}</span>
      <span className="sr-only"> · </span>
      <span className="tile__t">{item.label}</span>
      <span className="sr-only">{`: ${item.d.replace(/\.$/, "")}. Categoría ${cat?.name ?? item.c}.`}</span>
    </button>
  );
};

export default React.memo(ElementTile);
