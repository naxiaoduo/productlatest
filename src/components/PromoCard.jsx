import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faHeart, faCoffee, faImage, faCode } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';

const PromoCard = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const { i18n } = useTranslation();

  // 检查本地存储，确定是否应该显示广告
  useEffect(() => {
    const hasClosedPromo = localStorage.getItem('hasClosedPromo') === 'true';
    if (!hasClosedPromo) {
      // 延迟显示广告，让用户先浏览页面
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  // 关闭广告并记住选择
  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem('hasClosedPromo', 'true');
  };

  // 最小化广告
  const handleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end">
      {/* 最小化状态 */}
      {isMinimized ? (
        <button 
          onClick={handleMinimize}
          className="bg-gradient-to-br from-primary to-primary/80 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all"
        >
          <FontAwesomeIcon icon={faCoffee} className="text-lg" />
        </button>
      ) : (
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden w-72 transition-all animate-fade-in-up">
          {/* 卡片头部 */}
          <div className="bg-gradient-to-r from-primary/20 to-primary/5 p-3 flex justify-between items-center border-b border-gray-200">
            <div className="flex items-center gap-2">
              <FontAwesomeIcon icon={faCoffee} className="text-primary" />
              <h3 className="font-medium text-gray-800">
                {i18n.language === 'zh' ? '来自开发者的话' : 'From the Developer'}
              </h3>
            </div>
            <div className="flex items-center gap-1">
              <button 
                onClick={handleMinimize} 
                className="text-gray-500 hover:text-gray-700 p-1"
                title={i18n.language === 'zh' ? '最小化' : 'Minimize'}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
              </button>
              <button 
                onClick={handleClose} 
                className="text-gray-500 hover:text-gray-700 p-1"
                title={i18n.language === 'zh' ? '关闭' : 'Close'}
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
          </div>
          
          {/* 卡片内容 */}
          <div className="p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-gradient-to-br from-primary/30 to-primary/10 rounded-full flex items-center justify-center">
                <span className="text-primary font-bold text-lg">N</span>
              </div>
              <div>
                <h4 className="font-medium">Nayol</h4>
                <p className="text-sm text-gray-600">{i18n.language === 'zh' ? '独立开发者' : 'Indie Developer'}</p>
              </div>
            </div>
            
            <p className="text-sm text-gray-700 mb-4">
              {i18n.language === 'zh' 
                ? '喜欢这个工具吗？支持我继续创造更多免费实用的应用！' 
                : 'Enjoy this tool? Support me to create more free and useful apps!'}
            </p>
            
            {/* 链接区域 */}
            <div className="space-y-2">
              <a 
                href="https://ko-fi.com/naxol" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-2 bg-[#FF5E5B]/10 text-[#FF5E5B] rounded-md hover:bg-[#FF5E5B]/20 transition-colors"
              >
                <FontAwesomeIcon icon={faCoffee} />
                <span className="text-sm font-medium">Ko-fi.com/naxol</span>
              </a>
              
              <a 
                href="https://pixzens.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-2 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition-colors"
              >
                <FontAwesomeIcon icon={faImage} />
                <span className="text-sm font-medium">Pixzens.com</span>
                <span className="text-xs bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded">
                  {i18n.language === 'zh' ? '图像工具' : 'Image Tool'}
                </span>
              </a>
              
              <a 
                href="https://github.com/naxiaoduo" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
              >
                <FontAwesomeIcon icon={faCode} />
                <span className="text-sm font-medium">GitHub</span>
              </a>
            </div>
          </div>
          
          {/* 卡片底部 */}
          <div className="bg-gray-50 p-2 border-t border-gray-200 flex justify-between items-center">
            <span className="text-xs text-gray-500">
              {i18n.language === 'zh' ? '感谢您的支持 ❤️' : 'Thanks for your support ❤️'}
            </span>
            <button 
              onClick={handleClose}
              className="text-xs text-gray-500 hover:text-gray-700"
            >
              {i18n.language === 'zh' ? '不再显示' : 'Don\'t show again'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PromoCard; 