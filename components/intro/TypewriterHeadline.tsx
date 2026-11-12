import React, { useEffect, useMemo, useState } from "react";
import { INTRO_TIMING, reached, useIntro } from "./IntroContext";

export interface HeadlineLine {
  text: string;
  /** Clase extra para la línea (p. ej. itálica). */
  className?: string;
}

interface TypewriterHeadlineProps {
  lines: HeadlineLine[];
  id?: string;
  className?: string;
  lineClassName?: string;
}

interface Glyph {
  char: string;
  /** Momento (ms desde el inicio) en que aparece. */
  at: number;
}

/** Variación determinista (sin Math.random) para que el ritmo se sienta humano. */
const jitter = (i: number): number => {
  const x = Math.sin(i * 12.9898) * 43758.5453;
  return 0.55 + (x - Math.floor(x)) * 0.9; // 0.55 – 1.45
};

const buildSchedule = (lines: HeadlineLine[], speed: number, pause: number) => {
  let t = 0;
  let n = 0;
  const glyphLines: Glyph[][] = lines.map((line, li) => {
    if (li > 0) t += pause;
    return Array.from(line.text).map((char) => {
      t += speed * jitter(n++) * (char === " " ? 0.6 : 1);
      return { char, at: t };
    });
  });
  return { glyphLines, total: t, count: n };
};

/**
 * Titular que se escribe letra por letra con un cursor parpadeante.
 * El texto completo siempre está en el DOM (aria-label en el h1 y letras
 * ocultas con opacidad), así que no hay saltos de diseño y Google lo lee.
 */
const TypewriterHeadline: React.FC<TypewriterHeadlineProps> = ({
  lines,
  id,
  className,
  lineClassName = "",
}) => {
  const { phase, mode, advance } = useIntro();
  const fullText = lines.map((l) => l.text).join(" ");

  const schedule = useMemo(
    () =>
      buildSchedule(
        lines,
        mode === "short" ? INTRO_TIMING.typeShort : INTRO_TIMING.typeFull,
        mode === "short" ? 60 : INTRO_TIMING.linePause
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [fullText, mode]
  );

  const [count, setCount] = useState(0);
  const typing = phase === "typing";
  const finished = reached(phase, "building");

  useEffect(() => {
    if (!typing) return;
    let raf = 0;
    let start = 0;
    const flat = schedule.glyphLines.flat();
    const step = (now: number) => {
      if (!start) start = now;
      const elapsed = now - start;
      let n = 0;
      while (n < flat.length && flat[n].at <= elapsed) n++;
      setCount((c) => (c === n ? c : n));
      if (n < flat.length) {
        raf = requestAnimationFrame(step);
      } else {
        advance("building");
      }
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [typing, schedule, advance]);

  // Estado final: texto normal, sin spans por letra.
  if (phase === "done") {
    return (
      <h1 id={id} className={className}>
        {lines.map((line, li) => (
          <React.Fragment key={li}>
            {li > 0 ? " " : null}
            <span className={`${lineClassName} ${line.className ?? ""}`}>
              {line.text}
            </span>
          </React.Fragment>
        ))}
      </h1>
    );
  }

  const visible = finished ? schedule.count : typing ? count : 0;
  const caretAt = visible; // el cursor va justo después de la última letra escrita
  const showCaret = typing || finished;
  let idx = 0;

  const caret = (
    <span key="caret" className="tw-caret" aria-hidden="true" />
  );

  return (
    <h1 id={id} className={className} aria-label={fullText}>
      {schedule.glyphLines.map((glyphs, li) => {
        // Agrupa por palabras para que el salto de línea nunca corte una palabra.
        const words: React.ReactNode[] = [];
        let current: React.ReactNode[] = [];
        const flush = (key: string) => {
          if (current.length) {
            words.push(
              <span key={key} className="tw-word">
                {current}
              </span>
            );
            current = [];
          }
        };
        glyphs.forEach((g, gi) => {
          const i = idx++;
          if (showCaret && i === caretAt) current.push(caret);
          if (g.char === " ") {
            flush(`w${gi}`);
            words.push(
              <span key={`s${gi}`} className={`tw-ch${i < visible ? " is-on" : ""}`}>
                {" "}
              </span>
            );
          } else {
            current.push(
              <span key={gi} className={`tw-ch${i < visible ? " is-on" : ""}`}>
                {g.char}
              </span>
            );
          }
        });
        if (showCaret && caretAt === idx && li === schedule.glyphLines.length - 1) {
          current.push(caret);
        }
        flush("last");
        return (
          <span
            key={li}
            className={`${lineClassName} ${lines[li].className ?? ""}`}
            aria-hidden="true"
          >
            {words}
          </span>
        );
      })}
    </h1>
  );
};

export default TypewriterHeadline;
