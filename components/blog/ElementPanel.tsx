import React, { useEffect, useId, useRef } from "react";
import { createPortal } from "react-dom";
import type { PCategory, PDetail, PItem } from "./types";
import type { TableMeta } from "./tables";
import CodeBlock from "./CodeBlock";
import LivePreview from "./LivePreview";
import RichText from "./RichText";

/** Categorías HTML donde una vista previa renderizada aporta algo. */
const FILE_BY_LANG: Record<NonNullable<PDetail["lang"]>, string> = {
  html: "index.html",
  css: "styles.css",
  js: "app.ts",
  python: "main.py",
  sql: "consulta.sql",
  shell: "terminal",
  text: "notas.txt",
};

interface ElementPanelProps {
  table: TableMeta;
  item: PItem;
  detail: PDetail | undefined;
  detailsLoading: boolean;
  categories: Map<string, PCategory>;
  items: PItem[];
  onClose: () => void;
  onSelect: (k: string) => void;
}

type CC = React.CSSProperties & { "--cc"?: string };

const FOCUSABLE = 'a[href], button:not([disabled]), input, select, textarea, iframe, [tabindex]:not([tabindex="-1"])';

const docHost = (url: string) => {
  try {
    const h = new URL(url).hostname.replace(/^www\./, "");
    return h === "developer.mozilla.org" ? "MDN" : h;
  } catch {
    return "documentación oficial";
  }
};

const ElementPanel: React.FC<ElementPanelProps> = ({ table, item, detail, detailsLoading, categories, items, onClose, onSelect }) => {
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const cat = categories.get(item.c);

  // Foco inicial, Escape y trampa de foco.
  useEffect(() => {
    closeRef.current?.focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;
      const nodes = Array.from(panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)).filter((n) => n.offsetParent !== null || n === document.activeElement);
      if (nodes.length === 0) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (e.shiftKey && (document.activeElement === first || !panelRef.current.contains(document.activeElement))) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    const root = document.documentElement;
    const prevOverflow = root.style.overflow;
    root.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      root.style.overflow = prevOverflow;
    };
  }, [onClose]);

  // Al cambiar de elemento (relacionados), vuelve arriba.
  useEffect(() => {
    bodyRef.current?.scrollTo({ top: 0 });
  }, [item.k]);

  const related = items
    .filter((x) => x.c === item.c && x.k !== item.k)
    .sort((a, b) => Math.abs(a.n - item.n) - Math.abs(b.n - item.n))
    .slice(0, 6);

  const code = detail?.code ?? item.syn;
  const lang = detail?.lang ?? table.lang;
  const file = lang === table.lang ? table.file : FILE_BY_LANG[lang];
  const showPreview = lang === "html" && !!detail?.code && !!detail?.preview;
  const tileStyle: CC = { "--cc": cat?.color };

  return createPortal(
    <div className="ptp-layer">
      <div className="scrim" onClick={onClose} aria-hidden="true" />
      <div ref={panelRef} className="panel" role="dialog" aria-modal="true" aria-labelledby={titleId}>
        <div className="panel__grab" aria-hidden="true" />
        <button ref={closeRef} type="button" className="panel__close" onClick={onClose} aria-label="Cerrar ficha">
          ✕
        </button>
        <div ref={bodyRef} className="panel__in">
          <div className="pd-top">
            <div className="pd-tile" style={tileStyle} aria-hidden="true">
              <span className="tile__n">{item.n}</span>
              <span className="pd-s">{item.s}</span>
              <span className="tile__t">{item.label}</span>
            </div>
            <div className="pd-meta">
              <span className="pd-cat" style={tileStyle}><i aria-hidden="true" />{cat?.name}</span>
              <h2 id={titleId}>{item.name}</h2>
              {detail?.what ? <p className="pd-short">{item.d}</p> : null}
            </div>
          </div>

          <section className="pd-sec" aria-label="Qué hace">
            <h3 className="mono">Qué hace</h3>
            <p><RichText text={detail?.what ?? item.d} /></p>
            {detail?.points?.length ? (
              <ul className="pd-list">
                {detail.points.map((p) => <li key={p}><RichText text={p} /></li>)}
              </ul>
            ) : null}
            {!detail && !detailsLoading ? (
              <p className="muted">Ficha breve. Para todos los detalles, consulta la documentación oficial enlazada abajo.</p>
            ) : null}
          </section>

          {detail?.biz ? (
            <section className="pd-sec pd-biz" aria-label="Para tu negocio">
              <h3 className="mono">Para tu negocio</h3>
              <p><RichText text={detail.biz} /></p>
            </section>
          ) : null}

          {code ? (
            <section className="pd-sec" aria-label="Ejemplo">
              <h3 className="mono">{detail?.code ? "Ejemplo" : "Sintaxis"}</h3>
              <CodeBlock code={code} lang={lang} file={file} />
              {showPreview && detail?.code ? <LivePreview code={detail.code} title={`Vista previa de ${item.label}`} /> : null}
            </section>
          ) : null}

          {detail?.best?.length ? (
            <section className="pd-sec" aria-label="Buenas prácticas">
              <h3 className="mono">Buenas prácticas</h3>
              <ul className="pd-list">
                {detail.best.slice(0, 4).map((p) => <li key={p}><RichText text={p} /></li>)}
              </ul>
            </section>
          ) : null}

          {detail?.compat ? (
            <section className="pd-sec" aria-label="Compatibilidad">
              <h3 className="mono">Compatibilidad {detail.compat.deprecated ? <em className="pd-dep">obsoleto</em> : null}</h3>
              <div className="sups">
                {detail.compat.browsers.map(([b, v]) => (
                  <div className={`sup${v === "No" ? " sup--no" : ""}`} key={b}>
                    <span>{b}</span>
                    <b>{v ?? "—"}</b>
                  </div>
                ))}
              </div>
              <p className="pd-src">Versión desde la que está disponible · fuente: MDN browser-compat-data</p>
            </section>
          ) : null}

          {related.length ? (
            <section className="pd-sec" aria-label="Relacionados">
              <h3 className="mono">Relacionados</h3>
              <div className="chips">
                {related.map((x) => {
                  const st: CC = { "--cc": categories.get(x.c)?.color };
                  return (
                    <button type="button" key={x.k} className="chip" style={st} onClick={() => onSelect(x.k)}>
                      <b aria-hidden="true">{x.s}</b>
                      {x.label}
                    </button>
                  );
                })}
              </div>
            </section>
          ) : null}

          {item.doc ? (
            <a className="pd-mdn" href={item.doc} target="_blank" rel="noopener noreferrer">
              Ver documentación en {docHost(item.doc)} <i aria-hidden="true">↗</i>
              <span className="sr-only"> (se abre en otra pestaña)</span>
            </a>
          ) : null}
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default ElementPanel;
