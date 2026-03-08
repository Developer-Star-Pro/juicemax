// src/components/TitleUpdater.jsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function TitleUpdater() {
  const location = useLocation();

  useEffect(() => {
    let title = "Abdullah Aviation";

    switch (location.pathname) {
      case "/":
        title = "welcome";
        break;

      

      default:
        title = "Abdullah Aviation";
    }

    document.title = title;
  }, [location.pathname]);

  return null;
}