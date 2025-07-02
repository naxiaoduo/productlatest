import React, { useContext, useEffect, useState } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Header from './components/Header';
import Footer from './components/Footer';
import CardCreator from './pages/CardCreator';
import About from './pages/About';
import NotFound from './pages/NotFound';
import HomePage from './pages/HomePage';
import Guide from './pages/Guide';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import PromoCard from './components/PromoCard';
import { LanguageContext } from './contexts/LanguageContext';

function App() {
  const { currentLanguage, setLanguage } = useContext(LanguageContext);
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const [isRouteReady, setIsRouteReady] = useState(false);

  // 监听语言变化事件
  useEffect(() => {
    const handleLanguageChanged = () => {
      // 强制重新渲染整个应用
      setIsRouteReady(false);
      setTimeout(() => setIsRouteReady(true), 0);
    };
    
    window.addEventListener('languageChanged', handleLanguageChanged);
    document.addEventListener('i18nextLoaded', handleLanguageChanged);
    
    return () => {
      window.removeEventListener('languageChanged', handleLanguageChanged);
      document.removeEventListener('i18nextLoaded', handleLanguageChanged);
    };
  }, []);

  // 初始化路由状态
  useEffect(() => {
    setIsRouteReady(true);
  }, []);

  // 检查URL路径中的语言前缀
  useEffect(() => {
    const path = location.pathname;
    
    // 如果路径以/zh或/en开头，则设置对应的语言
    if (path.startsWith('/zh/') || path === '/zh') {
      if (currentLanguage !== 'zh') {
        setLanguage('zh');
      }
    } else if (path.startsWith('/en/') || path === '/en') {
      if (currentLanguage !== 'en') {
        setLanguage('en');
      }
    } else if (path !== '/') {
      // 如果没有语言前缀，则添加当前语言前缀并重定向
      const newPath = `/${currentLanguage}${path}`;
      navigate(newPath, { replace: true });
    } else if (path === '/') {
      // 根路径重定向到当前语言路径
      navigate(`/${currentLanguage}`, { replace: true });
    }
  }, [location.pathname, currentLanguage, setLanguage, navigate]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        {isRouteReady && (
          <Routes>
            {/* 根路径 - 重定向到当前语言首页 */}
            <Route path="/" element={<HomePage />} />
            
            {/* 中文路由 */}
            <Route path="/zh" element={<HomePage />} />
            <Route path="/zh/editor" element={<CardCreator />} />
            <Route path="/zh/about" element={<About />} />
            <Route path="/zh/guide" element={<Guide />} />
            <Route path="/zh/privacy" element={<Privacy />} />
            <Route path="/zh/terms" element={<Terms />} />
            
            {/* 英文路由 */}
            <Route path="/en" element={<HomePage />} />
            <Route path="/en/editor" element={<CardCreator />} />
            <Route path="/en/about" element={<About />} />
            <Route path="/en/guide" element={<Guide />} />
            <Route path="/en/privacy" element={<Privacy />} />
            <Route path="/en/terms" element={<Terms />} />
            
            {/* 无语言前缀路由 - 向后兼容 */}
            <Route path="/editor" element={<CardCreator />} />
            <Route path="/about" element={<About />} />
            <Route path="/guide" element={<Guide />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        )}
      </main>
      <Footer />
      <PromoCard />
    </div>
  );
}

export default App; 