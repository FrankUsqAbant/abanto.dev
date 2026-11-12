import React from "react";

interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
}

/**
 * Componente reutilizable para mostrar bloques de código
 * Con estilo futurista coherente con el diseño de la web
 */
const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language = "html",
  title,
}) => {
  return (
    <div className="relative group">
      {/* Header del código */}
      {title && (
        <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/10 rounded-t-xl">
          <span className="text-xs font-mono text-white/60 uppercase tracking-wider">
            {title}
          </span>
          <span className="text-xs font-mono text-blue-400">{language}</span>
        </div>
      )}

      {/* Bloque de código */}
      <pre
        className={`
          bg-[#0a0a0a] border border-white/10 p-4 overflow-x-auto
          text-sm font-mono text-white/90 leading-relaxed
          ${title ? "rounded-b-xl" : "rounded-xl"}
        `}
      >
        <code className="language-html">{code}</code>
      </pre>

      {/* Botón copiar (aparece en hover) */}
      <button
        onClick={() => navigator.clipboard.writeText(code)}
        className="
          absolute top-2 right-2 
          opacity-0 group-hover:opacity-100
          px-2 py-1 rounded-md
          bg-white/10 hover:bg-white/20
          text-xs text-white/70 hover:text-white
          transition-all duration-200
        "
        title="Copiar código"
      >
        Copiar
      </button>
    </div>
  );
};

export default CodeBlock;
