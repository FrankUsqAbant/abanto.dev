import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Navigate, useLocation, useNavigate, useParams } from "react-router-dom";
import { setPageMeta } from "../lib/seo";
import { DEFAULT_TABLE, LEGACY_TABLES, TABLES, getTable, loadDetails, loadTable } from "../components/blog/tables";
import type { PCategory, PDetails, PItem, PTableData } from "../components/blog/types";
import ElementTile from "../components/blog/ElementTile";
import ElementPanel from "../components/blog/ElementPanel";
import TableIcon from "../components/blog/TableIcon";
import { CONTACT_EMAIL } from "../components/home/sections/homeLinks";
import { Ambient, CountUp, HintRotator } from "../components/blog/fx/HeaderFx";
import { useGridFx } from "../components/blog/fx/useGridFx";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import "../components/blog/blog.css";

const useMediaQuery = (q: string) => {
  const [m, setM] = useState(() => typeof window !== "undefined" && window.matchMedia(q).matches);
  useEffect(() => {
    const mq = window.matchMedia(q);
    const on = () => setM(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, [q]);
  return m;
};

const norm = (s: string) =>
  s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[<>]/g, "").trim();

interface NavState {
  fromGrid?: boolean;
}

/** Elemento de la clave "Cómo leer la tabla" */
const KEY_ITEM: Record<string, string> = {
  "fundamentos-web": "section",
  frameworks: "rsc",
  backend: "fastapi",
  datos: "pgvector",
  "ia-aplicada": "rag",
  "agentes-automatizacion": "mcp",
  herramientas: "docker",
};

/**
 * Aprende = 7 tablas periódicas, de los fundamentos web a los agentes de IA.
 * URL: /aprende/:tabla/:elemento (las tablas antiguas redirigen a la más cercana).
 */
const Aprende: React.FC = () => {
  const { table: tableParam, el } = useParams<{ table?: string; el?: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const meta = getTable(tableParam);

  const [data, setData] = useState<PTableData | null>(null);
  const [details, setDetails] = useState<PDetails | null>(null);
  const [loadError, setLoadError] = useState(false);
  const [cat, setCat] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);
  const wrapRef = useRef<HTMLElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);
  const grouped = useMediaQuery("(max-width: 1023px)");

  const tableId = meta?.id ?? DEFAULT_TABLE;

  // Carga diferida de la tabla y (en segundo plano) de sus fichas.
  useEffect(() => {
    let alive = true;
    // La tabla anterior se mantiene hasta que llega la nueva (transición sin salto).
    setDetails(null);
    setLoadError(false);
    setCat(null);
    setQuery("");
    loadTable(tableId)
      .then((d) => alive && setData(d))
      .catch(() => alive && setLoadError(true));
    loadDetails(tableId)
      .then((d) => alive && setDetails(d))
      .catch(() => alive && setDetails({}));
    return () => {
      alive = false;
    };
  }, [tableId]);


  // Ctrl/Cmd + K enfoca la búsqueda de la tabla (en Aprende reemplaza al Command Center).
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        searchRef.current?.focus();
        searchRef.current?.select();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const catMap = useMemo(() => new Map<string, PCategory>((data?.categories ?? []).map((c) => [c.id, c])), [data]);
  const ready = !!data && data.id === tableId;
  const selected = useMemo(() => (el && data && data.id === tableId ? data.items.find((x) => x.k === el) ?? null : null), [el, data, tableId]);
  const notFound = !!(el && ready && !selected);

  useEffect(() => {
    if (!meta) return;
    if (selected) {
      setPageMeta({
        title: `${selected.name} — ${meta.label} · Aprende`,
        description: `${selected.d.replace(/\.$/, "")}. Ficha de la tabla periódica ${meta.titleEm}: qué es, para qué sirve y un ejemplo.`,
        path: `/aprende/${meta.id}/${selected.k}`,
      });
    } else {
      setPageMeta({
        title: `Aprende: la tabla periódica ${meta.titleEm}`,
        description: `La tabla periódica ${meta.titleEm}: ${meta.keyText}`,
        path: `/aprende/${meta.id}`,
      });
    }
  }, [meta, selected]);

  const q = norm(query);
  const matches = useCallback(
    (x: PItem) => !q || norm(x.name).includes(q) || norm(x.label).includes(q) || norm(x.s) === q || norm(x.d).includes(q),
    [q],
  );
  const isDim = useCallback((x: PItem) => (cat !== null && x.c !== cat) || !matches(x), [cat, matches]);
  const matchCount = data ? data.items.filter((x) => !isDim(x)).length : 0;
  const filtering = cat !== null || !!q;

  useGridFx(wrapRef, { idle: !el && !filtering, dep: data?.id });

  const openItem = useCallback(
    (item: PItem, opener?: HTMLElement) => {
      openerRef.current = opener ?? null;
      const fromGrid = (location.state as NavState | null)?.fromGrid;
      navigate(`/aprende/${tableId}/${item.k}`, { state: { fromGrid: true }, replace: !!el && !!fromGrid });
    },
    [navigate, tableId, el, location.state],
  );

  const onTileOpen = useCallback((item: PItem, btn: HTMLButtonElement) => openItem(item, btn), [openItem]);

  const closePanel = useCallback(() => {
    const k = el;
    if ((location.state as NavState | null)?.fromGrid) navigate(-1);
    else navigate(`/aprende/${tableId}`, { replace: true });
    // Devuelve el foco a la celda.
    window.setTimeout(() => {
      const target = openerRef.current ?? (k ? document.querySelector<HTMLElement>(`.tile[data-k="${CSS.escape(k)}"]`) : null);
      target?.focus({ preventScroll: true });
      openerRef.current = null;
    }, 30);
  }, [el, location.state, navigate, tableId]);

  const selectRelated = useCallback(
    (k: string) => navigate(`/aprende/${tableId}/${k}`, { state: location.state, replace: true }),
    [navigate, tableId, location.state],
  );

  if (!meta) {
    const legacy = tableParam ? LEGACY_TABLES[tableParam] : undefined;
    return <Navigate to={legacy ? `/aprende/${legacy}${el ? `/${encodeURIComponent(el)}` : ""}` : `/aprende/${DEFAULT_TABLE}`} replace />;
  }
  // Ficha inexistente (p. ej. de una tabla antigua): al índice de la tabla.
  if (notFound) return <Navigate to={`/aprende/${tableId}`} replace />;

  const items = data?.items ?? [];
  const main = items.filter((x) => x.r <= 7);
  const fblock = items.filter((x) => x.r > 7);
  const keyItem = items.find((x) => x.k === KEY_ITEM[tableId]) ?? items[0];
  const obsolete = catMap.get("obsolete")?.count;
  const fRowNames = [9, 10].map((r) =>
    Array.from(new Set(fblock.filter((x) => x.r === r).map((x) => catMap.get(x.c)?.name ?? x.c))).join(" · "),
  );
  const cols = data?.cols ?? 18;
  const gridStyle = { "--cols": cols } as React.CSSProperties;
  // Cascada diagonal desde arriba a la izquierda.
  const order = (x: PItem) => x.col + x.r;

  const onSearchKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const first = items.find((x) => !isDim(x));
      if (first) openItem(first);
    } else if (e.key === "Escape" && query) {
      e.stopPropagation();
      setQuery("");
    }
  };

  const tile = (x: PItem, style?: React.CSSProperties, ord = 0) => (
    <ElementTile
      key={x.k}
      item={x}
      cat={catMap.get(x.c)}
      dim={isDim(x)}
      selected={selected?.k === x.k}
      order={ord}
      style={style}
      onOpen={onTileOpen}
    />
  );

  return (
    <MotionConfig reducedMotion="user">
    <div className={`ptp${filtering ? " is-filtering" : ""}${q ? " is-searching" : ""}`}>
      <Ambient tint={data?.id ?? ""} colors={(data?.categories ?? []).slice(0, 3).map((c) => c.color)} />
      <div className="ptp__grain" aria-hidden="true" />
      <main className="pt" aria-labelledby="pt-title">
        <section className="pt-head wrap-w">
          <div className="pt-head__l">
            <p className="eyebrow">Aprende · Herramienta interactiva</p>
            <h1 className="pt-title" id="pt-title" key={tableId}>
              <span className="pt-mask"><span className="pt-rise">La tabla periódica</span></span>{" "}
              <span className="pt-mask"><em className="pt-rise pt-rise--2">{meta.titleEm}</em></span>
            </h1>
          </div>
          <div className="pt-head__r">
            <p className="pt-sub">
              <CountUp value={ready ? items.length : null} /> {meta.noun} organizados por categoría. Toca cualquiera para ver qué hace, cómo se usa y con qué se relaciona.
            </p>
            <label className="search">
              <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="6.5" /><path d="M16 16l4 4" /></svg>
              <span className="sr-only">Buscar en la tabla</span>
              <input
                ref={searchRef}
                type="search"
                placeholder={`Buscar en ${meta.noun}…`}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onSearchKey}
                aria-describedby="pt-search-status"
                aria-keyshortcuts="Control+K Meta+K"
              />
              <kbd aria-hidden="true">Ctrl K</kbd>
            </label>
            <p id="pt-search-status" className="sr-only" aria-live="polite">
              {q || cat ? `${matchCount} resultados` : ""}
            </p>
            <div className="stats">
              <span><CountUp value={ready && data ? data.categories.length : null} /> categorías</span>
              {obsolete ? <span><b>{obsolete}</b> obsoletos</span> : null}
              <span><b>{TABLES.length}</b> tablas</span>
            </div>
            <HintRotator />
          </div>
        </section>

        <section className="controls wrap-w" aria-label="Tablas y categorías">
          <div className="langs" role="toolbar" aria-label="Elegir tabla">
            {TABLES.map((t) => (
              <button
                key={t.id}
                type="button"
                className={`lang${t.id === tableId ? " is-on" : ""}`}
                aria-pressed={t.id === tableId}
                onClick={() => t.id !== tableId && navigate(`/aprende/${t.id}`)}
              >
                {t.id === tableId ? <motion.span layoutId="pt-lang-pill" className="pill" transition={PILL} aria-hidden="true" /> : null}
                <TableIcon icon={t.icon} />
                <span className="lang__lb">{t.label}</span>
              </button>
            ))}
          </div>
          <div className="ctrl-row">
            <div className="cats" role="group" aria-label="Filtrar por categoría">
              <button
                type="button"
                className={`cat${cat === null ? " is-on" : ""}`}
                aria-pressed={cat === null}
                style={{ "--cc": "#141414" } as React.CSSProperties}
                onClick={() => setCat(null)}
              >
                {cat === null ? <motion.span layoutId="pt-cat-pill" className="pill" transition={PILL} aria-hidden="true" /> : null}
                <i aria-hidden="true" />Todos <em>{items.length}</em>
              </button>
              {(data?.categories ?? []).map((c) => (
                <button
                  key={c.id}
                  type="button"
                  className={`cat${cat === c.id ? " is-on" : ""}`}
                  aria-pressed={cat === c.id}
                  style={{ "--cc": c.color } as React.CSSProperties}
                  onClick={() => setCat(cat === c.id ? null : c.id)}
                >
                  {cat === c.id ? <motion.span layoutId="pt-cat-pill" className="pill" transition={PILL} aria-hidden="true" /> : null}
                  <i aria-hidden="true" />{c.name} <em>{c.count}</em>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section ref={wrapRef} className="table-wrap wrap-w" aria-label={`Tabla periódica ${meta.titleEm}`} aria-busy={!ready}>
          {loadError ? <p className="pt-notice" role="alert">No se pudo cargar la tabla. Recarga la página.</p> : null}
          {!data && !loadError ? <div className="pt-loading" aria-hidden="true" /> : null}
          <AnimatePresence mode="popLayout" initial={false}>
          {data && !grouped ? (
            <motion.div key={data.id} className="pt-anim" exit={EXIT}>
              <div className="ptable-g" style={{ ...gridStyle, gridTemplateRows: `repeat(${Math.min(7, data.rows)}, var(--row))` }}>
                {keyItem ? (
                  <div className="key" style={{ gridColumn: `3 / ${data.keyEnd ?? cols - 5}` }}>
                    <div className="key__tile" style={{ "--cc": catMap.get(keyItem.c)?.color } as React.CSSProperties} aria-hidden="true">
                      <span className="key__n">{keyItem.n}</span>
                      <span className="key__s">{keyItem.s}</span>
                      <span className="key__t">{keyItem.label}</span>
                      <i className="key__l key__l--n">Número</i>
                      <i className="key__l key__l--s">Símbolo</i>
                      <i className="key__l key__l--t">Nombre</i>
                    </div>
                    <div className="key__txt">
                      <p className="mono">Cómo leer la tabla</p>
                      <h2>
                        Cada {meta.noun === "propiedades" ? "propiedad" : meta.noun.replace(/s$/, "")},{" "}
                        <em>una pieza del conjunto.</em>
                      </h2>
                      <p>{meta.keyText}</p>
                    </div>
                  </div>
                ) : null}
                {main.map((x) => tile(x, { gridRow: x.r, gridColumn: x.col }, order(x)))}
              </div>
              {fblock.length ? (
                <div className="fblock">
                  <div className="fblock__head">
                    <span className="mono">Bloque inferior</span>
                    {fRowNames.filter(Boolean).map((n) => <span key={n}>{n}</span>)}
                  </div>
                  <div className="ptable-f" style={gridStyle}>
                    {fblock.map((x) => tile(x, { gridRow: x.r - 8, gridColumn: x.col }, order(x)))}
                  </div>
                </div>
              ) : null}
            </motion.div>
          ) : null}
          {data && grouped ? (
            <motion.div key={`g-${data.id}`} className="mgroups pt-anim" exit={EXIT}>
              {data.categories.map((c) => {
                const list = items.filter((x) => x.c === c.id);
                const groupDim = cat !== null && cat !== c.id;
                return (
                  <section key={c.id} className={`mgroup${groupDim ? " is-dim" : ""}`} style={{ "--cc": c.color } as React.CSSProperties} aria-label={c.name}>
                    <h2 className="mgroup__h"><i aria-hidden="true" /><b>{c.name}</b><em>{c.count}</em></h2>
                    <div className="mgroup__g">{list.map((x, i) => tile(x, undefined, i))}</div>
                  </section>
                );
              })}
            </motion.div>
          ) : null}
          </AnimatePresence>
          <p className="table-foot">
            <span className="mono">Fuente</span> {meta.source} ·{" "}
            <a href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(`Error en la tabla periódica ${meta.titleEm}`)}`}>¿Encontraste un error? Escríbeme ↗</a>
          </p>
        </section>
      </main>

      {selected && data ? (
        <ElementPanel
          table={meta}
          item={selected}
          detail={details?.[selected.k]}
          detailsLoading={details === null}
          categories={catMap}
          items={items}
          onClose={closePanel}
          onSelect={selectRelated}
        />
      ) : null}
    </div>
    </MotionConfig>
  );
};

const PILL = { type: "spring", stiffness: 420, damping: 38, mass: 0.8 } as const;
const EXIT = { opacity: 0, scale: 0.985, transition: { duration: 0.22, ease: [0.4, 0, 1, 1] } } as const;

export default Aprende;
