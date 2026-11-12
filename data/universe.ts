export interface UniverseElement {
  id: string;
  symbol: string;
  name: string;
  category: "syntax" | "concept" | "structure" | "meta" | "style";
  number: number;
  description: string;
  codeSnippet?: string;
  difficulty: number; // 1-10
  tags: string[];
}

export interface UniverseCategory {
  id: string;
  name: string;
  icon: string; // FontAwesome class
  color: string; // Tailwind color text class
  elements: UniverseElement[];
}

export const UNIVERSE_DATA: UniverseCategory[] = [
  {
    id: "html",
    name: "HTML5",
    icon: "fab fa-html5",
    color: "text-orange-500",
    elements: [
      // === STRUCTURE ===
      {
        id: "html",
        symbol: "H",
        name: "<html>",
        category: "structure",
        number: 1,
        description: "The root element of an HTML page.",
        codeSnippet: "<html lang='en'>...</html>",
        difficulty: 1,
        tags: ["Root", "Core"],
      },
      {
        id: "head",
        symbol: "Hd",
        name: "<head>",
        category: "meta",
        number: 2,
        description: "Container for metadata (title, scripts, styles).",
        codeSnippet: "<head><title>Page</title></head>",
        difficulty: 2,
        tags: ["Meta", "Config"],
      },
      {
        id: "body",
        symbol: "Bd",
        name: "<body>",
        category: "structure",
        number: 3,
        description: "Contains all the visible content of a document.",
        codeSnippet: "<body>...</body>",
        difficulty: 1,
        tags: ["Core", "Visible"],
      },
      // === METADATA ===
      {
        id: "meta",
        symbol: "Mt",
        name: "<meta>",
        category: "meta",
        number: 4,
        description: "Metadata about the HTML document.",
        codeSnippet: "<meta charset='UTF-8'>",
        difficulty: 2,
        tags: ["SEO", "Config"],
      },
      {
        id: "title",
        symbol: "Ti",
        name: "<title>",
        category: "meta",
        number: 5,
        description: "Defines the title of the document.",
        codeSnippet: "<title>My Portfolio</title>",
        difficulty: 1,
        tags: ["SEO", "Tab"],
      },
      // === SEMANTICS ===
      {
        id: "header",
        symbol: "Hr",
        name: "<header>",
        category: "concept",
        number: 6,
        description: "Introductory content or navigation links.",
        codeSnippet: "<header><nav>...</nav></header>",
        difficulty: 2,
        tags: ["Semantic", "Layout"],
      },
      {
        id: "nav",
        symbol: "Nv",
        name: "<nav>",
        category: "concept",
        number: 7,
        description: "Section of page with navigation links.",
        codeSnippet: "<nav><a href='/'>Home</a></nav>",
        difficulty: 2,
        tags: ["Semantic", "Links"],
      },
      {
        id: "main",
        symbol: "Mn",
        name: "<main>",
        category: "structure",
        number: 8,
        description: "The dominant content of the <body>.",
        codeSnippet: "<main>...</main>",
        difficulty: 2,
        tags: ["Semantic", "Core"],
      },
      {
        id: "section",
        symbol: "Sc",
        name: "<section>",
        category: "structure",
        number: 9,
        description: "Thematic grouping of content, typically with a heading.",
        codeSnippet: "<section><h2>About</h2>...</section>",
        difficulty: 2,
        tags: ["Semantic", "Group"],
      },
      {
        id: "article",
        symbol: "Ar",
        name: "<article>",
        category: "concept",
        number: 10,
        description: "Self-contained composition (blog post, news story).",
        codeSnippet: "<article><h2>Post</h2>...</article>",
        difficulty: 3,
        tags: ["Semantic", "Content"],
      },
      {
        id: "aside",
        symbol: "As",
        name: "<aside>",
        category: "structure",
        number: 11,
        description:
          "Content indirectly related to the main content (sidebar).",
        codeSnippet: "<aside>Ads here</aside>",
        difficulty: 2,
        tags: ["Semantic", "Sidebar"],
      },
      {
        id: "footer",
        symbol: "Ft",
        name: "<footer>",
        category: "structure",
        number: 12,
        description: "Footer for a section or page.",
        codeSnippet: "<footer>© 2024</footer>",
        difficulty: 1,
        tags: ["Semantic", "End"],
      },
      // === TEXT CONTENT ===
      {
        id: "h1",
        symbol: "H1",
        name: "<h1>",
        category: "structure",
        number: 13,
        description: "The most important heading.",
        codeSnippet: "<h1>Main Title</h1>",
        difficulty: 1,
        tags: ["Heading", "SEO"],
      },
      {
        id: "p",
        symbol: "P",
        name: "<p>",
        category: "structure",
        number: 14,
        description: "Paragraph element.",
        codeSnippet: "<p>Text here</p>",
        difficulty: 1,
        tags: ["Text", "Block"],
      },
      {
        id: "a",
        symbol: "A",
        name: "<a>",
        category: "concept",
        number: 15,
        description: "Hyperlink, used to link from one page to another.",
        codeSnippet: "<a href='url'>Link</a>",
        difficulty: 2,
        tags: ["Link", "Interactive"],
      },
      // === FORMS ===
      {
        id: "form",
        symbol: "Fm",
        name: "<form>",
        category: "structure",
        number: 16,
        description: "Interactive controls for submitting information.",
        codeSnippet: "<form>...</form>",
        difficulty: 4,
        tags: ["Input", "Data"],
      },
      {
        id: "input",
        symbol: "In",
        name: "<input>",
        category: "structure",
        number: 17,
        description: "Input field for user data.",
        codeSnippet: "<input type='text' />",
        difficulty: 3,
        tags: ["Form", "Data"],
      },
      {
        id: "button",
        symbol: "Bt",
        name: "<button>",
        category: "style",
        number: 18,
        description: "Clickable button.",
        codeSnippet: "<button>Click Me</button>",
        difficulty: 1,
        tags: ["Interaction", "UI"],
      },
      // === MULTIMEDIA ===
      {
        id: "img",
        symbol: "Im",
        name: "<img>",
        category: "style",
        number: 19,
        description: "Embeds an image.",
        codeSnippet: "<img src='pic.jpg' alt='desc' />",
        difficulty: 1,
        tags: ["Media", "Visual"],
      },
      {
        id: "video",
        symbol: "Vd",
        name: "<video>",
        category: "style",
        number: 20,
        description: "Embeds a video player.",
        codeSnippet: "<video src='movie.mp4' controls></video>",
        difficulty: 3,
        tags: ["Media", "Player"],
      },
      {
        id: "canvas",
        symbol: "Cv",
        name: "<canvas>",
        category: "structure",
        number: 21,
        description: "Graphics drawing region via Scripting.",
        codeSnippet: "<canvas></canvas>",
        difficulty: 7,
        tags: ["Graphics", "API"],
      },
      {
        id: "div",
        symbol: "Dv",
        name: "<div>",
        category: "structure",
        number: 22,
        description: "Generic flow container.",
        codeSnippet: "<div>Content</div>",
        difficulty: 1,
        tags: ["Block", "Core"],
      },
      {
        id: "span",
        symbol: "Sp",
        name: "<span>",
        category: "structure",
        number: 23,
        description: "Generic inline container.",
        codeSnippet: "<span>Text</span>",
        difficulty: 1,
        tags: ["Inline", "Text"],
      },
    ],
  },
  {
    id: "css",
    name: "CSS3",
    icon: "fab fa-css3-alt",
    color: "text-blue-500",
    elements: [
      {
        id: "flexbox",
        symbol: "Fx",
        name: "Flexbox",
        category: "style",
        number: 1,
        description:
          "A one-dimensional layout method for laying out items in rows or columns.",
        codeSnippet:
          ".container {\n  display: flex;\n  justify-content: center;\n}",
        difficulty: 4,
        tags: ["Layout", "1D"],
      },
      {
        id: "grid",
        symbol: "Gd",
        name: "Grid",
        category: "style",
        number: 2,
        description:
          "A two-dimensional layout system for the web. It lets you lay out content in rows and columns.",
        codeSnippet:
          ".container {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n}",
        difficulty: 6,
        tags: ["Layout", "2D"],
      },
      {
        id: "boxmodel",
        symbol: "Bx",
        name: "Box Model",
        category: "concept",
        number: 3,
        description:
          "The foundation of layout on the Web. Every element is a rectangular box: content, padding, border, and margin.",
        codeSnippet: "* {\n  box-sizing: border-box;\n}",
        difficulty: 3,
        tags: ["Core", "Spacing"],
      },
      {
        id: "animations",
        symbol: "An",
        name: "Animations",
        category: "style",
        number: 4,
        description:
          "Animate transitions from one CSS style configuration to another.",
        codeSnippet:
          "@keyframes slide {\n  from { left: 0; }\n  to { left: 100px; }\n}",
        difficulty: 7,
        tags: ["Motion", "Keyframes"],
      },
      {
        id: "variables",
        symbol: "Var",
        name: "Variables",
        category: "syntax",
        number: 5,
        description:
          "Entities defined by CSS authors that contain specific values to be reused throughout a document.",
        codeSnippet: ":root {\n  --main-color: #ff0000;\n}",
        difficulty: 2,
        tags: ["Custom Props", "DRY"],
      },
    ],
  },
  {
    id: "javascript",
    name: "JavaScript",
    icon: "fab fa-js",
    color: "text-yellow-400",
    elements: [
      {
        id: "closures",
        symbol: "Cl",
        name: "Closures",
        category: "concept",
        number: 1,
        description:
          "A closure is the combination of a function bundled together (enclosed) with references to its surrounding state.",
        codeSnippet:
          "function makeAdder(x) {\n  return function(y) {\n    return x + y;\n  };\n}",
        difficulty: 8,
        tags: ["Scope", "Functions"],
      },
      {
        id: "promises",
        symbol: "Pr",
        name: "Promises",
        category: "concept",
        number: 2,
        description:
          "An object representing the eventual completion or failure of an asynchronous operation.",
        codeSnippet: "fetchData().then(data => console.log(data));",
        difficulty: 6,
        tags: ["Async", "ES6"],
      },
      {
        id: "eventloop",
        symbol: "El",
        name: "Event Loop",
        category: "concept",
        number: 3,
        description:
          "The mechanism that allows JavaScript to perform non-blocking I/O operations despite being single-threaded.",
        difficulty: 9,
        tags: ["Async", "Runtime"],
      },
      {
        id: "es6",
        symbol: "Es",
        name: "ES6 Syntax",
        category: "syntax",
        number: 4,
        description:
          "Modern JavaScript features like Arrow Functions, Destructuring, and Spread Operator.",
        codeSnippet:
          "const sum = (...args) => args.reduce((a, b) => a + b, 0);",
        difficulty: 3,
        tags: ["Modern", "Sugar"],
      },
      {
        id: "hoisting",
        symbol: "Hs",
        name: "Hoisting",
        category: "concept",
        number: 5,
        description:
          "JavaScript's default behavior of moving declarations to the top.",
        codeSnippet: "console.log(x); // undefined\nvar x = 5;",
        difficulty: 5,
        tags: ["Scope", "Legacy"],
      },
    ],
  },
  {
    id: "python",
    name: "Python",
    icon: "fab fa-python",
    color: "text-blue-400",
    elements: [
      {
        id: "lists",
        symbol: "Li",
        name: "Lists",
        category: "structure",
        number: 1,
        description:
          "Ordered, mutable collections of items. One of the most used data types in Python.",
        codeSnippet: "fruits = ['apple', 'banana']\nfruits.append('orange')",
        difficulty: 2,
        tags: ["Data Structure", "Array"],
      },
      {
        id: "decorators",
        symbol: "Dc",
        name: "Decorators",
        category: "concept",
        number: 2,
        description:
          "A design pattern that allows a user to add new functionality to an existing object without modifying its structure.",
        codeSnippet: "@my_decorator\ndef say_hello():\n    print('Hello!')",
        difficulty: 7,
        tags: ["Meta", "Functions"],
      },
      {
        id: "comprehensions",
        symbol: "Lc",
        name: "List Comp",
        category: "syntax",
        number: 3,
        description: "A concise way to create lists. Common in Pythonic code.",
        codeSnippet: "squares = [x**2 for x in range(10)]",
        difficulty: 5,
        tags: ["Pythonic", "Concise"],
      },
    ],
  },

  // === Databases ===
  {
    id: "databases",
    name: "Databases",
    icon: "fas fa-database",
    color: "text-cyan-400",
    elements: [
      {
        id: "select",
        symbol: "SEL",
        name: "SELECT",
        category: "syntax",
        number: 1,
        description: "Consulta SQL.",
        codeSnippet: "SELECT * FROM users;",
        difficulty: 1,
        tags: ["SQL"],
      },
    ],
  },

  // === Git ===
  {
    id: "git",
    name: "Git",
    icon: "fab fa-git-alt",
    color: "text-orange-500",
    elements: [
      {
        id: "git-init",
        symbol: "Init",
        name: "git init",
        category: "syntax",
        number: 1,
        description: "Inicializa repositorio Git.",
        codeSnippet: "git init",
        difficulty: 1,
        tags: ["Git", "Basic"],
      },
    ],
  },

  // === Bash/Shell ===
  {
    id: "bash",
    name: "Bash",
    icon: "fas fa-terminal",
    color: "text-green-500",
    elements: [
      {
        id: "bash-ls",
        symbol: "ls",
        name: "ls",
        category: "syntax",
        number: 1,
        description: "Lista archivos.",
        codeSnippet: "ls -la",
        difficulty: 1,
        tags: ["Bash", "Shell"],
      },
    ],
  },

  // === Cybersecurity ===
  {
    id: "cybersecurity",
    name: "Cybersecurity",
    icon: "fas fa-shield-alt",
    color: "text-red-500",
    elements: [
      {
        id: "cyber-phishing",
        symbol: "Phish",
        name: "Phishing",
        category: "concept",
        number: 1,
        description: "Ataque de fraude por correo.",
        codeSnippet: "Email malicioso",
        difficulty: 5,
        tags: ["Security", "Attacks"],
      },
    ],
  },

  // === Machine Learning ===
  {
    id: "ml",
    name: "Machine Learning",
    icon: "fas fa-brain",
    color: "text-purple-500",
    elements: [
      {
        id: "ml-linreg",
        symbol: "LinReg",
        name: "Linear Regression",
        category: "concept",
        number: 1,
        description: "Modelo de regresión lineal.",
        codeSnippet: "from sklearn.linear_model import LinearRegression",
        difficulty: 3,
        tags: ["ML", "Supervised"],
      },
    ],
  },

  // === Neural Networks ===
  {
    id: "neuralnet",
    name: "Neural Networks",
    icon: "fas fa-project-diagram",
    color: "text-indigo-500",
    elements: [
      {
        id: "nn-perceptron",
        symbol: "Percep",
        name: "Perceptron",
        category: "concept",
        number: 1,
        description: "Neurona artificial simple.",
        codeSnippet: "Neural Network basic unit",
        difficulty: 4,
        tags: ["Neural Networks", "Deep Learning"],
      },
    ],
  },
];
