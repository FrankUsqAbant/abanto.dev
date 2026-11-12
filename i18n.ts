import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";

i18n
  // load translation using http -> see /public/locales
  // learn more: https://github.com/i18next/i18next-http-backend
  .use(Backend)
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languagedetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    supportedLngs: ["es", "en"],
    nonExplicitSupportedLngs: true,
    load: "languageOnly", // es-PE / es-419 -> /locales/es (evita pedir archivos que no existen)
    fallbackLng: "es", // El sitio es en español; inglés solo si se elige (?lng=en)
    debug: import.meta.env.DEV,

    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },

    // React specific options
    react: {
      useSuspense: true, // Set to false if you want to handle loading state manually, but true is better for simple apps
    },

    // Sin detección por navegador: español por defecto; ?lng=en es una elección explícita
    // y se recuerda en localStorage ("lang", clave nueva para ignorar detecciones antiguas).
    detection: {
      order: ["querystring", "localStorage"],
      lookupQuerystring: "lng",
      lookupLocalStorage: "lang",
      caches: ["localStorage"],
    },
  });

export default i18n;
