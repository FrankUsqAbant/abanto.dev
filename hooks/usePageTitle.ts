import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

const usePageTitle = () => {
  const { t } = useTranslation();
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    // Aprende define su propio título (según la tabla).
    if (path.startsWith("/aprende/")) return;
    let title = "FrankDev | Software Architect";

    switch (true) {
      case path === "/":
        title = `${t("navbar.home")} | FrankDev`;
        break;
      case path === "/privacidad":
        title = "Política de privacidad | FrankDev";
        break;
      case path === "/terminos":
        title = "Términos de uso | FrankDev";
        break;
      case path === "/cookies":
        title = "Política de cookies | FrankDev";
        break;
      case path === "/about":
        title = `${t("navbar.about")} | FrankDev`;
        break;
      case path === "/theme":
        title = `${t("navbar.theme")} | FrankDev`;
        break;
      case path === "/aprende":
        title = `${t("navbar.learn")} | FrankDev`;
        break;
      case path === "/courses":
        title = `${t("navbar.courses")} | FrankDev`;
        break;
      case path.startsWith("/courses/"):
        title = `Learning | FrankDev`;
        break;
      case path === "/exercises":
        title = `Exercises | FrankDev`;
        break;
      default:
        title = "FrankDev | Software Architect";
    }

    document.title = title;
  }, [location, t]);
};

export default usePageTitle;
