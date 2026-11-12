import React, { useState, useEffect, useRef } from "react";
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
  useParams,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Navbar from "./components/layout/Navbar";
import SiteFooter from "./components/home/sections/SiteFooter";
import "./components/home/sections/home.css";
import PageTransition from "./components/layout/PageTransition";
import Home from "./pages/Home";
import Aprende from "./pages/Aprende";
import About from "./pages/About";
import CommandCenter from "./components/features/CommandCenter";
import { View } from "./types";
import usePageTitle from "./hooks/usePageTitle";
import { IntroProvider } from "./components/intro";

/** /element/:tag (ruta antigua, solo HTML) → ficha en Aprende */
const ElementRedirect: React.FC = () => {
  const { tag } = useParams<{ tag: string }>();
  return <Navigate to={tag ? `/aprende/fundamentos-web/${encodeURIComponent(tag.toLowerCase())}` : "/aprende/fundamentos-web"} replace />;
};

/** /blog/... (nombre anterior de la sección) → /aprende/... */
const BlogRedirect: React.FC = () => {
  const { "*": rest } = useParams();
  const { search, hash } = useLocation();
  return <Navigate to={`/aprende${rest ? `/${rest}` : ""}${search}${hash}`} replace />;
};

/** Todas las rutas de Aprende comparten una sola página (sin transición ni scroll al top entre tablas/fichas). */
const routeKeyOf = (path: string) => (path === "/aprende" || path.startsWith("/aprende/") ? "/aprende" : path);

const App: React.FC = () => {
  usePageTitle(); // Dynamic title management
  const [isCommandCenterOpen, setIsCommandCenterOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const routeKey = routeKeyOf(location.pathname);
  const onAprende = routeKey === "/aprende";
  const onAprendeRef = useRef(onAprende);
  onAprendeRef.current = onAprende;

  useEffect(() => {
    // Scroll to top on route change (no al cambiar de tabla/ficha dentro de Aprende)
    window.scrollTo(0, 0);
  }, [routeKey]);

  useEffect(() => {
    // Scroll to top on reload/mount
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);

    const handleKeyDown = (e: KeyboardEvent) => {
      // En Aprende, Ctrl/Cmd+K enfoca la búsqueda de la tabla (lo gestiona la página).
      if ((e.metaKey || e.ctrlKey) && e.key === "k" && !onAprendeRef.current) {
        e.preventDefault();
        setIsCommandCenterOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleNavigate = (path: string) => {
    navigate(path);
    setIsCommandCenterOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <IntroProvider enabled={location.pathname === "/"}>
    <div className="min-h-screen bg-[#f4f2ee] flex flex-col selection:bg-blue-600/30">
      <Navbar
        currentView={
          location.pathname === "/"
            ? "home"
            : (location.pathname.split("/")[1] as View)
        }
        onNavigate={(view) =>
          handleNavigate(view === "home" ? "/" : `/${view}`)
        }
        onOpenSearch={() => setIsCommandCenterOpen(true)}
      />

      <main className="flex-1 pt-20">
        {/* initial={false}: la primera página se ve de inmediato (sin depender de una animación) */}
        <AnimatePresence mode="wait" initial={false}>
          <Routes location={location} key={routeKey}>
            <Route
              path="/"
              element={
                <PageTransition>
                  <Home
                    onNavigate={(view) =>
                      handleNavigate(view === "home" ? "/" : `/${view}`)
                    }
                  />
                </PageTransition>
              }
            />
            <Route path="/aprende" element={<Navigate to="/aprende/fundamentos-web" replace />} />
            <Route
              path="/aprende/:table/:el?"
              element={
                <PageTransition>
                  <Aprende />
                </PageTransition>
              }
            />
            <Route
              path="/about"
              element={
                <PageTransition>
                  <About />
                </PageTransition>
              }
            />
            {/* /blog/* → /aprende/* (Aprende resuelve después las tablas antiguas) */}
            <Route path="/blog/*" element={<BlogRedirect />} />
            <Route path="/html-periodic" element={<Navigate to="/aprende/fundamentos-web" replace />} />
            <Route path="/js-periodic" element={<Navigate to="/aprende/fundamentos-web" replace />} />
            <Route path="/python-periodic" element={<Navigate to="/aprende/backend" replace />} />
            <Route path="/element/:tag" element={<ElementRedirect />} />
            {/* Cursos, Lecturas y Ejercicios se retiraron: /courses, /theme, /exercises… caen aquí */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AnimatePresence>
      </main>

      <SiteFooter
        onNavigate={(view) =>
          handleNavigate(view === "home" ? "/" : `/${view}`)
        }
      />

      {isCommandCenterOpen && (
        <CommandCenter
          isOpen={isCommandCenterOpen}
          onClose={() => setIsCommandCenterOpen(false)}
          onNavigate={(view) =>
            handleNavigate(view === "home" ? "/" : `/${view}`)
          }
        />
      )}
    </div>
    </IntroProvider>
  );
};

export default App;
