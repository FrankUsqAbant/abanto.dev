import htmlElementsData from "./elementsDetail/htmlElementsData.json";
import cssElementsData from "./elementsDetail/cssElementsData.json";
import jsElementsData from "./elementsDetail/jsElementsData.json";
import pythonElementsData from "./elementsDetail/pythonElementsData.json";

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface ElementDetail {
  description: string;
  keyPoints: string[];
  syntax: string;
  codeExample: string;
  useCases: string[];
  bestPractices: string[];
  commonMistakes: string[];
  quizPool: QuizQuestion[];
  categoryColor?: string;
}

export type PeriodicTheme = "html" | "css" | "js" | "python";

// Map of data sources
const dataSources: Record<string, Record<string, ElementDetail>> = {
  html: htmlElementsData.elements as unknown as Record<string, ElementDetail>,
  css: cssElementsData.elements as unknown as Record<string, ElementDetail>,
  // Future expansions
  js: jsElementsData.elements as unknown as Record<string, ElementDetail>,
  python: pythonElementsData.elements as unknown as Record<
    string,
    ElementDetail
  >,
};

export const getElementDetail = (
  elementName: string,
  theme: PeriodicTheme = "html"
): ElementDetail | null => {
  // Normalize key: lowercase to match JSON keys
  const key = elementName.toLowerCase();
  const source = dataSources[theme];

  if (!source) return null;
  return source[key] || null;
};
