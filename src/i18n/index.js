import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationEN from './locales/en.json';
import translationZH from './locales/zh.json';

// 语言资源
const resources = {
  en: {
    translation: translationEN
  },
  zh: {
    translation: translationZH
  }
};

// 检测浏览器语言或从localStorage获取
const detectUserLanguage = () => {
  const savedLanguage = localStorage.getItem('language');
  if (savedLanguage) return savedLanguage;
  
  const browserLang = navigator.language || navigator.userLanguage;
  return browserLang.startsWith('zh') ? 'zh' : 'en';
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: detectUserLanguage(),
    fallbackLng: 'zh', // 默认回退语言为中文
    interpolation: {
      escapeValue: false // 不转义HTML内容
    },
    react: {
      useSuspense: false, // 禁用Suspense
      bindI18n: 'languageChanged loaded', // 监听这些事件触发重新渲染
      bindI18nStore: 'added removed', // 监听这些事件触发重新渲染
      transEmptyNodeValue: '', // 空值的翻译
      transSupportBasicHtmlNodes: true, // 支持基本的HTML节点
      transKeepBasicHtmlNodesFor: ['br', 'strong', 'i', 'p'], // 保留的HTML节点
      skipTransRenderEmpty: false // 不跳过空翻译的渲染
    }
  });

// 添加语言改变事件监听器
window.addEventListener('languageChanged', () => {
  i18n.reloadResources(i18n.language).then(() => {
    // 强制刷新翻译
    document.dispatchEvent(new Event('i18nextLoaded'));
  });
});

export default i18n; 