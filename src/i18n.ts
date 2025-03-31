import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

// Use the alias you defined in vite.config.ts
import enTranslations from "@/locales/en.json";
import siTranslations from "@/locales/si.json";
import taTranslations from "@/locales/ta.json";

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslations },
      si: { translation: siTranslations },
      ta: { translation: taTranslations },
    },
    fallbackLng: "en",
    debug: true,
    interpolation: {
      escapeValue: false, // React already escapes values
    },
    supportedLngs: ["en", "si", "ta"],
    load: "languageOnly",
  });

export default i18n;
