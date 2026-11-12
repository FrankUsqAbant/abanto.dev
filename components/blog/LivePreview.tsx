import React, { useMemo } from "react";

/**
 * Vista previa del ejemplo HTML en un iframe aislado:
 * sandbox="" (sin scripts, formularios, popups ni mismo origen) y una CSP que
 * bloquea cualquier carga externa. El contenido es el ejemplo estático del repo.
 */
const PREVIEW_CSS = `
  :root{color-scheme:light}
  body{margin:14px;font:14px/1.5 Inter,system-ui,sans-serif;color:#141414;background:#fff}
  h1,h2,h3,h4{font-family:Georgia,serif;font-weight:400;margin:.2em 0}
  table{border-collapse:collapse}td,th{border:1px solid #ddd;padding:4px 8px}
  input,select,textarea,button{font:inherit}
  img,video,canvas,svg{max-width:100%}
  *{box-sizing:border-box}
`;

const LivePreview: React.FC<{ code: string; title: string }> = ({ code, title }) => {
  const srcDoc = useMemo(
    () =>
      `<!doctype html><html lang="es"><head><meta charset="utf-8">` +
      `<meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'unsafe-inline'; img-src data:">` +
      `<style>${PREVIEW_CSS}</style></head><body>${code}</body></html>`,
    [code],
  );
  return (
    <div className="preview">
      <span className="mono">Vista previa</span>
      <iframe className="preview__frame" title={title} sandbox="" srcDoc={srcDoc} loading="lazy" referrerPolicy="no-referrer" />
    </div>
  );
};

export default LivePreview;
