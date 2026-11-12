import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

const usePageTitle = () => {
  const { t } = useTranslation();
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    // El blog define su propio título (según la tabla).
    if (path.startsWith("/blog/")) return;
    let title = "FrankDev | Software Architect";

    switch (true) {
      case path === "/":
        title = `${t("navbar.home")} | FrankDev`;
        break;
      case path === "/about":
        title = `${t("navbar.about")} | FrankDev`;
        break;
      case path === "/theme":
        title = `${t("navbar.theme")} | FrankDev`;
        break;
      case path === "/blog":
        title = `${t("navbar.blog")} | FrankDev`;
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
