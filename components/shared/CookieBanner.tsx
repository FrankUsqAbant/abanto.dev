import React from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { setConsent, useConsent } from "../../lib/consent";

/** Aviso de cookies: barra de vidrio discreta abajo. Solo afecta a Cal.com (terceros). */
const CookieBanner: React.FC = () => {
  const { showBanner } = useConsent();
  return (
    <AnimatePresence>
      {showBanner ? (
        <motion.div
          className="hm ck"
          role="region"
          aria-label="Aviso de cookies"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.4, ease: [0.2, 0.7, 0.1, 1] }}
        >
          <p>
            <span className="ck__long">
              Uso solo lo necesario para que el sitio funcione. Si aceptas, también se carga la agenda de Cal.com, que
              usa sus propias cookies.
            </span>
            <span className="ck__short">Solo lo necesario. Cal.com, solo si aceptas.</span>{" "}
            <Link to="/cookies">Más info</Link>
          </p>
          <div className="ck__btns">
            <button type="button" className="ck__no" onClick={() => setConsent("rejected")}>Rechazar</button>
            <button type="button" className="ck__ok" onClick={() => setConsent("accepted")}>Aceptar</button>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default CookieBanner;
