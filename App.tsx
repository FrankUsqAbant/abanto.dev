import React, { useState, useEffect } from "react";
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Navbar from "./components/layout/Navbar";
import SiteFooter from "./components/home/sections/SiteFooter";
import "./components/home/sections/home.css";
import PageTransition from "./components/layout/PageTransition";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import Courses from "./pages/Courses";
import About from "./pages/About";
import Tech from "./pages/Tech";
import Exercises from "./pages/Exercises";
import ExerciseDetail from "./pages/ExerciseDetail";
import CoursePlayer from "./pages/CoursePlayer";
import HTMLPeriodic from "./pages/HTMLPeriodic";
import JSPeriodic from "./pages/JSPeriodic";
import PythonPeriodic from "./pages/PythonPeriodic";
import ElementDetail from "./pages/ElementDetail";
import CommandCenter from "./components/features/CommandCenter";
import { View } from "./types";
import usePageTitle from "./hooks/usePageTitle";
import { IntroProvider } from "./components/intro";

const App: React.FC = () => {
  usePageTitle(); // Dynamic title management
  const [isCommandCenterOpen, setIsCommandCenterOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    // Scroll to top on reload/mount
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
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
    <div className="min-h-screen bg-[#050505] flex flex-col selection:bg-blue-600/30">
      <Navbar
        currentView={
          location.pathname === "/"
            ? "home"
            : (location.pathname.substring(1) as View)
        }
        onNavigate={(view) =>
          handleNavigate(view === "home" ? "/" : `/${view}`)
        }
        onOpenSearch={() => setIsCommandCenterOpen(true)}
      />

      <main className="flex-1 pt-20">
        {/* initial={false}: la primera página se ve de inmediato (sin depender de una animación) */}
        <AnimatePresence mode="wait" initial={false}>
          <Routes location={location} key={location.pathname}>
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
            <Route
              path="/blog"
              element={
                <PageTransition>
                  <Blog
                    onNavigate={(view) =>
                      handleNavigate(view === "home" ? "/" : `/${view}`)
                    }
                  />
                </PageTransition>
              }
            />
            <Route
              path="/courses"
              element={
                <PageTransition>
                  <Courses />
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
            <Route
              path="/theme"
              element={
                <PageTransition>
                  <Tech />
                </PageTransition>
              }
            />
            <Route
              path="/html-periodic"
              element={
                <PageTransition>
                  <HTMLPeriodic />
                </PageTransition>
              }
            />
            <Route
              path="/js-periodic"
              element={
                <PageTransition>
                  <JSPeriodic />
                </PageTransition>
              }
            />
            <Route
              path="/python-periodic"
              element={
                <PageTransition>
                  <PythonPeriodic />
                </PageTransition>
              }
            />
            <Route
              path="/exercises"
              element={
                <PageTransition>
                  <Exercises />
                </PageTransition>
              }
            />
            <Route
              path="/exercises/:id"
              element={
                <PageTransition>
                  <ExerciseDetail />
                </PageTransition>
              }
            />
            <Route
              path="/courses/:courseId/learn"
              element={
                <PageTransition>
                  <CoursePlayer />
                </PageTransition>
              }
            />
            <Route
              path="/courses/:courseId/learn/:videoId"
              element={
                <PageTransition>
                  <CoursePlayer />
                </PageTransition>
              }
            />
            <Route
              path="/element/:tag"
              element={
                <PageTransition>
                  <ElementDetail />
                </PageTransition>
              }
            />
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
