import { createI18n } from "vue-i18n";
import zh_CN from "./zh_CN";
import en_US from "./en_US";

const language = navigator.language || navigator.userLanguage;
let locale = language === 'zh-CN' ? 'zh_CN' : "en_US"
const i18n = createI18n({
  legacy: false,
  warnHtmlMessage: false,
  globalInjection: true,
  missingWarn: false,
  locale,
  messages: {
    zh_CN,
    en_US,
  },
});

export default i18n;
