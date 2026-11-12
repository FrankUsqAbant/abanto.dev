import React, { Suspense } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import AppErrorBoundary from "./components/layout/AppErrorBoundary";
import "./i18n";
import "./styles.css";

const container = document.getElementById("root");
if (!container) throw new Error("Root container not found");

const root = createRoot(container);
root.render(
  <React.StrictMode>
    <AppErrorBoundary>
      <BrowserRouter>
        <Suspense fallback={<div className="min-h-screen bg-[#f4f2ee]" />}>
          <App />
        </Suspense>
      </BrowserRouter>
    </AppErrorBoundary>
  </React.StrictMode>
);
