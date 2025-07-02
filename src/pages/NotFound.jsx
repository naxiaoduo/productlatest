import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faSearch } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';

const NotFound = () => {
  const { t, i18n } = useTranslation();
  
  useEffect(() => {
    // 设置页面特定的SEO元标签
    document.title = t('notFound.pageTitle', "页面未找到 - Product Latest");
    
    // 更新meta描述
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', t('notFound.metaDescription', 
        '很抱歉，您访问的页面不存在。请返回首页继续使用Product Latest创建精美的Product Hunt产品展示卡片。'));
    }
  }, [t, i18n.language]);

  return (
    <div className="max-w-lg mx-auto text-center py-12">
      <h1 className="text-5xl font-bold text-ph-orange mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white">{t('notFound.title')}</h2>
      <p className="text-gray-600 dark:text-gray-300 mb-8">
        {t('notFound.message')}
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link to="/" className="btn btn-primary">
          <FontAwesomeIcon icon={faHome} className="mr-2" />
          {t('notFound.backToHome')}
        </Link>
        <Link to="/about" className="btn btn-outline">
          <FontAwesomeIcon icon={faSearch} className="mr-2" />
          {t('notFound.learnMore', "了解更多")}
        </Link>
      </div>
    </div>
  );
};

export default NotFound; 