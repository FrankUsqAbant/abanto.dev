import React from "react";

interface Props {
  children: React.ReactNode;
}

interface State {
  error: Error | null;
}

/**
 * Evita la "pantalla negra" si algo falla al renderizar:
 * muestra el error y un botón para recargar.
 */
class AppErrorBoundary extends React.Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error("[AppErrorBoundary]", error, info.componentStack);
  }

  render() {
    const { error } = this.state;
    if (!error) return this.props.children;

    return (
      <div
        role="alert"
        className="min-h-screen grid place-items-center bg-[#f4f2ee] text-[#161514] p-6"
      >
        <div className="max-w-lg text-center space-y-4">
          <p className="text-xs uppercase tracking-[0.3em] text-[#6e6a64]">
            Algo salió mal
          </p>
          <p className="text-lg font-medium">No se pudo mostrar la página.</p>
          {import.meta.env.DEV && (
            <pre className="text-left text-xs bg-white/70 border border-black/10 rounded-lg p-3 overflow-auto max-h-60 whitespace-pre-wrap">
              {error.message}
            </pre>
          )}
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="h-11 px-6 rounded-full bg-[#1b1a19] text-white text-sm font-medium"
          >
            Recargar
          </button>
        </div>
      </div>
    );
  }
}

export default AppErrorBoundary;
