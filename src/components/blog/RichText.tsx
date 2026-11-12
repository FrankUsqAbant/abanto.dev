import React from "react";

/** Renderiza `código` y **negrita** de los textos de datos como nodos React (sin HTML crudo). */
const RichText: React.FC<{ text: string }> = ({ text }) => {
  const parts = text.split(/(`[^`]+`|\*\*[^*]+\*\*)/g);
  return (
    <>
      {parts.map((p, i) => {
        if (p.startsWith("`") && p.endsWith("`") && p.length > 1) return <code key={i}>{p.slice(1, -1)}</code>;
        if (p.startsWith("**") && p.endsWith("**") && p.length > 3) return <b key={i}>{p.slice(2, -2)}</b>;
        return <React.Fragment key={i}>{p}</React.Fragment>;
      })}
    </>
  );
};

export default RichText;
