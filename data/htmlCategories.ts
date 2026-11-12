import { HTMLElementCategory } from "../types";

export const categoryColors: Record<HTMLElementCategory, string> = {
  document: "#7eff00", // Verde brillante
  metadata: "#7eff00", // Verde brillante
  group: "#f3f700", // Amarillo
  textual: "#d4c4b0", // Beige
  multimedia: "#ffb3ba", // Rosa/Salmón
  tables: "#b3ffda", // Verde agua
  form: "#b3ffda", // Verde agua
  scripting: "#ffb3ba", // Rosa/Salmón
  interactive: "#b3f5ff", // Cyan
  semantics: "#b3f5ff", // Cyan
  ideographic: "#85d4ff", // Azul
  edition: "#85d4ff", // Azul
  obsolete: "#9a9a9a", // Gris
};

export const categoryNames: Record<HTMLElementCategory, string> = {
  document: "Document",
  metadata: "Metadata",
  group: "Group",
  textual: "Textual",
  multimedia: "Multimedia",
  tables: "Tables",
  form: "Form",
  scripting: "Scripting",
  interactive: "Interactive",
  semantics: "Semantics",
  ideographic: "Ideographic",
  edition: "Edition",
  obsolete: "Obsolete",
};

export const categories: HTMLElementCategory[] = [
  "document",
  "metadata",
  "group",
  "textual",
  "multimedia",
  "tables",
  "form",
  "scripting",
  "interactive",
  "semantics",
  "ideographic",
  "edition",
  "obsolete",
];
