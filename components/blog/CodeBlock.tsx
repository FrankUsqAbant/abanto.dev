import React, { useEffect, useRef, useState } from "react";
import type { TableMeta } from "./tables";

type Lang = TableMeta["lang"];

const KEYWORDS: Record<Lang, string[]> = {
  html: [],
  css: [],
  js: ["const", "let", "var", "function", "return", "if", "else", "for", "of", "in", "while", "class", "extends", "new", "this", "import", "export", "default", "from", "async", "await", "try", "catch", "finally", "throw", "typeof", "instanceof", "yield", "null", "undefined", "true", "false"],
  python: ["def", "return", "if", "elif", "else", "for", "in", "while", "class", "import", "from", "as", "try", "except", "finally", "raise", "with", "yield", "lambda", "None", "True", "False", "and", "or", "not", "pass", "break", "continue", "self"],
  sql: ["SELECT", "FROM", "WHERE", "INSERT", "INTO", "VALUES", "UPDATE", "SET", "DELETE", "CREATE", "TABLE", "ALTER", "DROP", "JOIN", "LEFT", "RIGHT", "INNER", "FULL", "CROSS", "ON", "GROUP", "BY", "ORDER", "HAVING", "LIMIT", "AND", "OR", "NOT", "NULL", "PRIMARY", "KEY", "FOREIGN", "REFERENCES", "INDEX", "BEGIN", "COMMIT", "ROLLBACK", "AS", "DISTINCT", "LIKE", "IN", "UNIQUE"],
  shell: ["if", "then", "else", "fi", "for", "do", "done", "while", "in", "case", "esac", "function", "sudo", "git"],
  text: [],
};

const tokenRe = (lang: Lang) => {
  const comment =
    lang === "python" || lang === "shell" ? "#[^\\n]*" : lang === "sql" ? "--[^\\n]*" : lang === "text" ? "(?!)" : "\\/\\/[^\\n]*|\\/\\*[\\s\\S]*?\\*\\/";
  return new RegExp(`(${comment})|("(?:\\\\.|[^"\\\\])*"|'(?:\\\\.|[^'\\\\])*'|\`(?:\\\\.|[^\`\\\\])*\`)|(\\b\\d+(?:\\.\\d+)?\\b)|([A-Za-z_][\\w-]*)`, "g");
};

/** Resaltado simple: produce nodos React (nunca HTML crudo). */
const highlight = (src: string, lang: Lang): React.ReactNode[] => {
  const out: React.ReactNode[] = [];
  let last = 0;
  let i = 0;
  const push = (text: string, cls?: string) => {
    if (!text) return;
    out.push(cls ? <span key={i++} className={cls}>{text}</span> : <React.Fragment key={i++}>{text}</React.Fragment>);
  };
  if (lang === "html") {
    const re = /(<!--[\s\S]*?-->)|(<\/?)([a-zA-Z][\w-]*)|([a-zA-Z_:@][\w:.-]*)(=)("[^"]*"|'[^']*')/g;
    let m: RegExpExecArray | null;
    while ((m = re.exec(src))) {
      push(src.slice(last, m.index));
      if (m[1]) push(m[1], "h-com");
      else if (m[3]) { push(m[2]); push(m[3], "h-tag"); }
      else { push(m[4], "h-attr"); push(m[5]); push(m[6], "h-str"); }
      last = re.lastIndex;
    }
    push(src.slice(last));
    return out;
  }
  if (lang === "css") {
    const re = /(\/\*[\s\S]*?\*\/)|([\w-]+)(\s*:)(?![^{]*\{)|("[^"]*"|'[^']*')|(#[0-9a-fA-F]{3,8}\b|\b\d+(?:\.\d+)?(?:px|rem|em|%|s|ms|deg|fr|vh|vw)?\b)/g;
    let m: RegExpExecArray | null;
    while ((m = re.exec(src))) {
      push(src.slice(last, m.index));
      if (m[1]) push(m[1], "h-com");
      else if (m[2]) { push(m[2], "h-attr"); push(m[3]); }
      else if (m[4]) push(m[4], "h-str");
      else push(m[5], "h-num");
      last = re.lastIndex;
    }
    push(src.slice(last));
    return out;
  }
  const kw = new Set(KEYWORDS[lang]);
  const re = tokenRe(lang);
  let m: RegExpExecArray | null;
  while ((m = re.exec(src))) {
    if (m[0] === "") { re.lastIndex++; continue; }
    push(src.slice(last, m.index));
    if (m[1]) push(m[1], "h-com");
    else if (m[2]) push(m[2], "h-str");
    else if (m[3]) push(m[3], "h-num");
    else if (m[4] && (kw.has(m[4]) || (lang === "sql" && kw.has(m[4].toUpperCase())))) push(m[4], "h-tag");
    else push(m[0]);
    last = re.lastIndex;
  }
  push(src.slice(last));
  return out;
};

interface CodeBlockProps {
  code: string;
  lang: Lang;
  file: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code, lang, file }) => {
  const [copied, setCopied] = useState<"idle" | "ok" | "error">("idle");
  const timer = useRef<number | undefined>(undefined);
  useEffect(() => () => window.clearTimeout(timer.current), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied("ok");
    } catch {
      setCopied("error");
    }
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied("idle"), 1600);
  };

  return (
    <div className="code">
      <div className="code__bar">
        <span className="dots" aria-hidden="true"><i /><i /><i /></span>
        <span>{file}</span>
        <button type="button" className="copy" onClick={copy}>
          {copied === "ok" ? "Copiado ✓" : copied === "error" ? "No se pudo copiar" : "Copiar"}
        </button>
        <span className="sr-only" aria-live="polite">{copied === "ok" ? "Código copiado al portapapeles" : ""}</span>
      </div>
      <pre tabIndex={0} aria-label={`Ejemplo de código (${file})`}><code>{highlight(code, lang)}</code></pre>
    </div>
  );
};

export default CodeBlock;
