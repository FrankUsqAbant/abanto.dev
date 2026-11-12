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
    fallbackLng: "es", // Default to Spanish as requested by context (or 'en' if preferred)
    debug: import.meta.env.DEV,

    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },

    // React specific options
    react: {
      useSuspense: true, // Set to false if you want to handle loading state manually, but true is better for simple apps
    },

    // Don't redirect URL based on language
    detection: {
      lookupQuerystring: "lng",
      lookupCookie: "i18next",
      lookupSessionStorage: "i18next",
      order: ["querystring", "cookie", "navigator"],
    },
  });

export default i18n;
