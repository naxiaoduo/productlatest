import React, { createContext, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const { i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language || 'zh');

  // 切换语言
  const toggleLanguage = () => {
    const newLanguage = currentLanguage === 'zh' ? 'en' : 'zh';
    setLanguage(newLanguage);
  };

  // 直接设置语言
  const setLanguage = (lang) => {
    if (lang !== currentLanguage) {
      setCurrentLanguage(lang);
      i18n.changeLanguage(lang);
      localStorage.setItem('language', lang);
      
      // 强制刷新应用程序状态以确保所有组件重新渲染
      document.documentElement.lang = lang;
      
      // 如果当前URL包含语言路径，则更新URL
      const currentPath = window.location.pathname;
      const pathWithoutLang = currentPath.replace(/^\/(zh|en)/, '');
      const newPath = `/${lang}${pathWithoutLang}`;
      
      // 仅在路径实际需要更改时才更新
      if (currentPath !== newPath && (currentPath.startsWith('/zh') || currentPath.startsWith('/en'))) {
        window.history.replaceState(null, '', newPath);
      }
    }
  };

  // 获取当前语言对应的README文件名
  const getReadmeFileName = () => {
    return currentLanguage === 'zh' ? 'README_ZH.md' : 'README.md';
  };

  // 初始化语言
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage && savedLanguage !== currentLanguage) {
      setCurrentLanguage(savedLanguage);
      i18n.changeLanguage(savedLanguage);
      document.documentElement.lang = savedLanguage;
    }
    
    // 检查是否在GitHub页面上，如果是则根据URL自动切换语言
    const isGitHubPage = window.location.hostname.includes('github.io') || 
                         window.location.hostname === 'github.com';
    if (isGitHubPage) {
      const path = window.location.pathname;
      if (path.includes('README_ZH.md')) {
        setLanguage('zh');
      } else if (path.includes('README.md')) {
        setLanguage('en');
      }
    }
  }, [i18n, currentLanguage]);

  return (
    <LanguageContext.Provider value={{ 
      currentLanguage, 
      toggleLanguage, 
      setLanguage,
      getReadmeFileName
    }}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageProvider; 