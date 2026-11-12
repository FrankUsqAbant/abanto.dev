import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { LazyMotion } from "framer-motion";
import App from "./App";
import AppErrorBoundary from "./components/layout/AppErrorBoundary";
import "./styles.css";

// framer-motion: el núcleo `m` va en el bundle principal; las animaciones/layout se cargan aparte.
const loadMotionFeatures = () => import("./lib/motionFeatures").then((mod) => mod.default);

const container = document.getElementById("root");
if (!container) throw new Error("Root container not found");

const root = createRoot(container);
root.render(
  <React.StrictMode>
    <AppErrorBoundary>
      <BrowserRouter>
        <LazyMotion features={loadMotionFeatures}>
          <App />
        </LazyMotion>
      </BrowserRouter>
    </AppErrorBoundary>
  </React.StrictMode>
);
