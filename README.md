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

## Proyectos desde GitHub

La sección **Proyectos y laboratorio** del inicio se llena sola con los repositorios públicos de
[FrankUsqAbant](https://github.com/FrankUsqAbant?tab=repositories). No hay que tocar el código para añadir uno.

- **Mostrar un repo:** en GitHub, abre el repo → ⚙️ junto a *About* → *Topics* → añade `portfolio`.
  Si al menos un repo tiene `portfolio`, solo se muestran esos; si ninguno lo tiene, se muestran todos los públicos.
- **Ocultar un repo:** quita el topic `portfolio` (o archívalo). Nunca se muestran forks, archivados ni el repo del README del perfil.
- **Orden:** primero los que tienen el topic `featured`; después, el que recibió un push más reciente.
- **Contenido de la tarjeta:** el título sale del nombre del repo (`hostal-aguilar` → «Hostal Aguilar»), el texto de la
  descripción (*About*), las etiquetas del lenguaje y los topics (máx. 3), el enlace «Ver demo» del campo *Website*,
  y la imagen de la vista previa social del repo. «Activo» = push en los últimos 30 días; si no, «Publicado».
- **Actualización:** el navegador consulta la API de GitHub y guarda el resultado 1 hora (`gh-projects-cache` en
  localStorage). Si la API falla o se alcanza el límite (60 peticiones/hora), se usa la copia del último build en
  `data/github-projects.json`, que `npm run build` regenera automáticamente (`prebuild`). También: `npm run github:sync`.
