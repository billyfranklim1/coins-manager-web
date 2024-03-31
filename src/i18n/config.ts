import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import us from "./locales/us.json";
import fr from "./locales/fr.json";
import br from "./locales/br.json";
import es from "./locales/es.json";

const resources = {
  us: {
    translation: us,
  },
  fr: {
    translation: fr,
  },
  br: {
    translation: br,
  },
  es: {
    translation: es,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "br",
  fallbackLng: "br",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
