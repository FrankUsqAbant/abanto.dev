export type View = "home" | "blog" | "courses" | "about" | "theme";

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  description: string;
  content: string;
  date: string;
  readTime: string;
  image: string;
  tags: string[];
}

export interface VideoLesson {
  id: string;
  title: string;
  youtubeId: string;
  duration: string;
  description?: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail?: string;
  badge?: string;
  level: number;
  tags: string[];
  lessons?: VideoLesson[];
  unlocked?: boolean;
  icon?: string;
  youtubeId?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  githubUrl: string;
  image: string;
  liveUrl?: string;
}

export interface GithubRepo {
  id: string;
  name: string;
  description: string;
  stars: number;
  forks: number;
  language: string;
  url: string;
  homepage?: string; // Enlace a la demo del proyecto
  tech: string[];
  bannerImage?: string;
}

export interface TechTopic {
  id: string;
  title: string;
  category: string;
  summary: string;
  content: string;
  imageUrl: string;
  sourceUrl: string;
  authors?: { name: string; avatar?: string }[];
  plusText?: string;
  fullContent?: string;
  readingTime?: number;
  reactions?: number;
  publishedAt?: string;
  smartContent?: {
    didYouKnow?: string[];
    relatedRepos?: GithubRepo[];
    relatedTerms?: { term: string; definition: string }[];
  };
}

export type Topic = TechTopic;

export interface AIContentResponse {
  tema: string;
  contenido: {
    resumen: string;
    explicacion: string;
    ejemplo_codigo: string;
  };
  quiz: {
    pregunta: string;
    opciones: string[];
    indice_correcta: number;
    explicacion_respuesta: string;
  }[];
}

// ============================================
// PERIODIC TABLE TYPES - Generic & Specific
// ============================================

// Base generic type for periodic elements
export interface PeriodicElement {
  number?: number; // Sequential number (optional)
  symbol: string; // Short abbreviation (e.g., "H", "D")
  name: string; // Full name (e.g., "html", "display")
  description: string; // Description
  row: number; // Grid row position
  col: number; // Grid column position
  mdnUrl?: string; // MDN documentation link
  example?: string; // Code example
}

// HTML Element Categories
export type HTMLElementCategory =
  | "document"
  | "metadata"
  | "group"
  | "textual"
  | "multimedia"
  | "tables"
  | "form"
  | "scripting"
  | "interactive"
  | "semantics"
  | "ideographic"
  | "edition"
  | "obsolete";

// CSS Property Categories
export type CSSPropertyCategory =
  | "layout"
  | "typography"
  | "visual"
  | "flexbox"
  | "grid"
  | "transform"
  | "positioning"
  | "effects"
  | "table"
  | "lists"
  | "content"
  | "misc";

// JavaScript Feature Categories
export type JSFeatureCategory =
  | "core"
  | "functions"
  | "objects"
  | "arrays"
  | "async"
  | "modules"
  | "errors"
  | "dom"
  | "modern"
  | "advanced";

// Python Feature Categories
export type PythonFeatureCategory =
  | "basics"
  | "control"
  | "functions"
  | "oop"
  | "data"
  | "modules"
  | "exceptions"
  | "fileio"
  | "advanced"
  | "stdlib";

// Database Feature Categories (SQL + NoSQL)
export type DatabaseFeatureCategory =
  | "dml"
  | "ddl"
  | "joins"
  | "aggregation"
  | "nosql_queries"
  | "nosql_concepts"
  | "datatypes"
  | "transactions"
  | "indexing"
  | "advanced";

// Git Command Categories
export type GitCommandCategory =
  | "basic"
  | "branching"
  | "remote"
  | "history"
  | "stashing"
  | "undoing"
  | "tagging"
  | "config"
  | "advanced"
  | "collaboration";

// Bash/Shell Command Categories
export type BashCommandCategory =
  | "file_ops"
  | "text_processing"
  | "system_info"
  | "permissions"
  | "process_mgmt"
  | "network"
  | "archives"
  | "search"
  | "scripting"
  | "advanced";

// Cybersecurity Categories
export type CybersecurityCategory =
  | "attacks"
  | "defenses"
  | "cryptography"
  | "network_security"
  | "authentication"
  | "vulnerabilities"
  | "tools"
  | "compliance"
  | "incident_response"
  | "best_practices";

// Machine Learning Categories
export type MLCategory =
  | "supervised"
  | "unsupervised"
  | "deep_learning"
  | "preprocessing"
  | "metrics"
  | "optimization"
  | "frameworks"
  | "model_types"
  | "advanced"
  | "mlops";

// Neural Networks Categories
export type NeuralNetCategory =
  | "basic_architectures"
  | "layer_types"
  | "activation_functions"
  | "loss_functions"
  | "cnn_architectures"
  | "rnn_architectures"
  | "attention_transformers"
  | "regularization"
  | "training_techniques"
  | "applications";

// HTML Periodic Element (extends generic)
export interface HTMLPeriodicElement extends PeriodicElement {
  category: HTMLElementCategory;
}

// CSS Periodic Element (extends generic)
export interface CSSPeriodicElement extends PeriodicElement {
  category: CSSPropertyCategory;
  syntax?: string; // CSS syntax (e.g., "display: flex;")
  values?: string[]; // Possible values (e.g., ["block", "inline", "flex"])
}

// JavaScript Periodic Element (extends generic)
export interface JSPeriodicElement extends PeriodicElement {
  category: JSFeatureCategory;
  syntax?: string; // JS syntax (e.g., "const x = 10;")
  values?: string[]; // Possible values or use cases
}

// Python Periodic Element (extends generic)
export interface PythonPeriodicElement extends PeriodicElement {
  category: PythonFeatureCategory;
  syntax?: string; // Python syntax (e.g., "x = 10")
  values?: string[]; // Possible values or use cases
}

// Database Periodic Element (extends generic) - SQL + NoSQL
export interface DatabasePeriodicElement extends PeriodicElement {
  category: DatabaseFeatureCategory;
  syntax?: string; // SQL/NoSQL syntax
  values?: string[]; // Examples or use cases
}

// Git Periodic Element (extends generic)
export interface GitPeriodicElement extends PeriodicElement {
  category: GitCommandCategory;
  syntax?: string; // Git command syntax
  values?: string[]; // Command options or examples
}

// Bash/Shell Periodic Element (extends generic)
export interface BashPeriodicElement extends PeriodicElement {
  category: BashCommandCategory;
  syntax?: string; // Bash command syntax
  values?: string[]; // Command options or examples
}

// Cybersecurity Periodic Element (extends generic)
export interface CybersecurityElement extends PeriodicElement {
  category: CybersecurityCategory;
  severity?: "low" | "medium" | "high" | "critical"; // Severity level
  values?: string[]; // Examples or attack vectors
}

// Machine Learning Periodic Element (extends generic)
export interface MLElement extends PeriodicElement {
  category: MLCategory;
  complexity?: "beginner" | "intermediate" | "advanced"; // Complexity level
  values?: string[]; // Use cases or parameters
}

// Neural Networks Periodic Element (extends generic)
export interface NeuralNetElement extends PeriodicElement {
  category: NeuralNetCategory;
  year?: number; // Year of invention/publication
  values?: string[]; // Key characteristics or parameters
}
