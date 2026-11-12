import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { setPageMeta } from "../lib/seo";

const PAGES: Record<string, { title?: string; description?: string }> = {
  "/": {},
  "/about": {
    title: "Sobre mí",
    description: "Frank Abanto, desarrollador de software e IA en Perú: cómo trabajo, qué construyo y con qué herramientas.",
  },
  "/privacidad": { title: "Política de privacidad", description: "Qué datos trata este sitio, para qué, con qué proveedores y cómo ejercer tus derechos ARCO." },
  "/terminos": { title: "Términos de uso", description: "Condiciones de uso del sitio de Frank Abanto." },
  "/cookies": { title: "Política de cookies", description: "Qué guarda este sitio en tu navegador y cómo gestionar tu consentimiento." },
};

/** Título, descripción y canónica por ruta. Aprende y la 404 definen los suyos. */
const usePageTitle = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    if (pathname.startsWith("/aprende")) return;
    const page = PAGES[pathname];
    if (page) setPageMeta({ ...page, path: pathname });
  }, [pathname]);
};

export default usePageTitle;
