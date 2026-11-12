# Frank Abanto — Portafolio

Sitio personal de Frank Abanto (Software Architect & Content Creator): inicio con intro animada,
servicios de agentes de IA y software a medida, proyectos reales, proceso, preguntas, contacto
(Formspree) y reserva de llamadas (Cal.com). La sección Aprende (`/aprende`) son 7 tablas periódicas interactivas: fundamentos web, frameworks, backend, datos,
IA aplicada, agentes y automatización, y herramientas.

## Desarrollo

```bash
npm install
npm run dev     # servidor de desarrollo (Vite)
npm run build   # build de producción en dist/
```

## Stack

React 19 · TypeScript · Vite 6 · Tailwind CSS v4 · Framer Motion · React Router 7 · i18next

## Proyectos del inicio

La sección **Proyectos y laboratorio** muestra una lista curada con capturas reales, más los repos nuevos que
marques en GitHub. Todo vive en estos archivos:

- `data/projects.json`: los proyectos, **en el orden en que se muestran**: `repo`, `title` (nombre visible, con
  tildes), `description` (corta y honesta; las webs para negocios empiezan con «Web demo para negocios»), `chips`
  (máx. 3), `demoUrl` (o `null`), `repoUrl`, `image` y `source` (de dónde sale la imagen).
- `public/images/projects/<repo>.webp`: la captura (1200×750, < 150 KB).
- `scripts/project-shots.mjs`: genera esas capturas.

### Añadir un proyecto

**Opción A (recomendada, con captura real):**
1. Añade una entrada a `data/projects.json` donde quieras que aparezca.
2. En `source` pon `{ "readme": "<URL de la primera captura del README>" }` o, si el README no tiene imagen,
   `{ "page": "<URL de la demo>" }` para que se haga una captura del sitio (1440×900 a 2x). Opcional:
   `"position": "top"` para recortar centrado (por defecto, arriba a la izquierda).
3. Ejecuta `npm run projects:shots` (o `npm run projects:shots -- <repo>` para uno solo) y haz commit.
   La primera vez quizá necesites `npx playwright install chromium`.

**Opción B (automática):** en GitHub, añade el topic `portfolio` al repo (⚙️ junto a *About* → *Topics*).
Aparecerá solo, al final del carrusel (o al principio si también tiene el topic `featured`), con la tarjeta
automática de GitHub como imagen, el nombre del repo como título, la descripción de *About* y el *Website* como demo.
Cuando quieras su captura real, pásalo a `data/projects.json` (opción A).

### Qué toma de GitHub en vivo

- La fecha del último push: «Activo» si fue en los últimos 30 días; si no, «Publicado».
- Los repos nuevos con `portfolio` (opción B). Un proyecto curado desaparece si archivas el repo.
- El navegador consulta la API como mucho una vez por hora (`gh-projects-cache` en localStorage). Si falla o se
  alcanza el límite (60 peticiones/hora), usa `data/github-projects.json`, que se regenera en cada
  `npm run build` (`prebuild`) o con `npm run github:sync`.
