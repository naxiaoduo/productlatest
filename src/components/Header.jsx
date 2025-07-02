import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faInfoCircle, faGlobe, faBook } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';
import { useContext } from 'react';
import { LanguageContext } from '../contexts/LanguageContext';

const Header = () => {
  const { t, i18n } = useTranslation();
  const { currentLanguage, setLanguage, getReadmeFileName } = useContext(LanguageContext);
  const location = useLocation();
  const navigate = useNavigate();
  
  // 切换到指定语言
  const changeLanguage = (lang) => {
    if (currentLanguage !== lang) {
      // 更新当前URL的语言前缀
      const currentPath = location.pathname;
      const pathWithoutLang = currentPath.replace(/^\/(zh|en)/, '');
      const newPath = `/${lang}${pathWithoutLang || ''}`;
      
      // 先设置语言
      setLanguage(lang);
      
      // 然后导航到新路径
      if (currentPath !== newPath) {
        navigate(newPath, { replace: true });
      }
      
      // 强制重新渲染
      setTimeout(() => {
        window.dispatchEvent(new Event('languageChanged'));
      }, 0);
    }
  };
  
  // 带语言前缀的路径
  const getPathWithLang = (path) => {
    return `/${currentLanguage}${path === '/' ? '' : path}`;
  };
  
  // 打开对应语言的README文件
  const openReadme = () => {
    const readmeFileName = getReadmeFileName();
    window.open(`https://github.com/naxiaoduo/productlatest/blob/main/${readmeFileName}`, '_blank');
  };
  
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to={getPathWithLang('/')} className="flex items-center gap-2">
          <div className="h-8 w-8">
            <img src="/favicon.svg" alt="Product Latest Logo" className="h-full w-full" />
          </div>
          <h1 className="text-xl font-bold text-gray-800">Product Latest</h1>
        </Link>
        <div className="flex items-center gap-4">
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-sm btn-outline border-gray-300 hover:bg-gray-100 hover:border-gray-400 px-3 flex items-center gap-1.5 rounded-full">
              <FontAwesomeIcon icon={faGlobe} className="text-gray-600" />
              <span className="text-sm font-medium">{currentLanguage === 'zh' ? '中文' : 'English'}</span>
            </label>
            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow-lg bg-white rounded-box w-32 mt-1">
              <li>
                <button 
                  onClick={() => changeLanguage('en')}
                  className={`${currentLanguage === 'en' ? 'bg-gray-100 font-medium' : ''}`}
                >
                  English
                </button>
              </li>
              <li>
                <button 
                  onClick={() => changeLanguage('zh')}
                  className={`${currentLanguage === 'zh' ? 'bg-gray-100 font-medium' : ''}`}
                >
                  中文
                </button>
              </li>
            </ul>
          </div>
          <nav className="hidden md:block">
            <ul className="flex gap-4">
              <li>
                <Link to={getPathWithLang('/')} className="text-gray-600 hover:text-ph-orange">
                  {t('header.home')}
                </Link>
              </li>
              <li>
                <Link to={getPathWithLang('/editor')} className="text-gray-600 hover:text-ph-orange">
                  <FontAwesomeIcon icon={faEdit} className="mr-1" />
                  {t('header.editor')}
                </Link>
              </li>
              <li>
                <Link to={getPathWithLang('/about')} className="text-gray-600 hover:text-ph-orange">
                  <FontAwesomeIcon icon={faInfoCircle} className="mr-1" />
                  {t('header.about')}
                </Link>
              </li>
              <li>
                <button onClick={openReadme} className="text-gray-600 hover:text-ph-orange">
                  <FontAwesomeIcon icon={faBook} className="mr-1" />
                  {t('header.docs')}
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header; 