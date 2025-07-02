import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faWandMagicSparkles, faInfoCircle, faMagic, faPalette, faShareAlt } from '@fortawesome/free-solid-svg-icons';
import { fetchProductData } from '../services/productHuntApi';
import { useTranslation } from 'react-i18next';

// 示例产品
const EXAMPLE_PRODUCT = 'voltops-llm-observability-platform';

const HomePage = () => {
  const [productUrl, setProductUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    // 设置页面特定的SEO元标签
    document.title = t('common.title');
    
    // 更新meta描述
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', t('common.description'));
    }
  }, [t, i18n.language]);

  const handleInputChange = (e) => {
    setProductUrl(e.target.value);
  };

  const extractSlugFromUrl = (url) => {
    let slug = url.trim();
    
    // 如果已经是简单的slug，直接返回
    if (!slug.includes('/') && !slug.includes('.')) {
      console.log('输入是单纯的slug:', slug);
      return slug;
    }

    try {
      // 尝试将输入解析为URL
      const urlObj = new URL(slug);
      
      // 如果是producthunt.com域名
      if (urlObj.hostname.includes('producthunt.com')) {
        // 移除末尾的斜杠
        const pathname = urlObj.pathname.endsWith('/') 
          ? urlObj.pathname.slice(0, -1) 
          : urlObj.pathname;
        
        // 通过/分割路径
        const parts = pathname.split('/').filter(part => part);
        
        // 检查URL格式
        if (parts.length >= 2 && (parts[0] === 'posts' || parts[0] === 'products')) {
          console.log('从URL提取的slug:', parts[1]);
          return parts[1];
        }
      }
    } catch (e) {
      console.log('URL解析失败，尝试简单提取');
    }
    
    // 如果上述方法失败，尝试简单地从路径中提取最后一部分
    if (slug.includes('/')) {
      // 移除末尾的斜杠
      if (slug.endsWith('/')) {
        slug = slug.slice(0, -1);
      }
      const parts = slug.split('/');
      const potentialSlug = parts[parts.length - 1];
      console.log('从路径提取的slug:', potentialSlug);
      return potentialSlug;
    }
    
    console.log('使用原始输入作为slug:', slug);
    return slug;
  };

  const handleFetchProduct = async () => {
    if (!productUrl) {
      setError(i18n.language === 'zh' ? '请输入 Product Hunt URL' : 'Please enter a Product Hunt URL');
      return;
    }
    
    try {
      setLoading(true);
      setError('');
      
      // 提取 Product Hunt 产品 slug
      const slug = extractSlugFromUrl(productUrl);
      console.log('最终使用的slug:', slug);
      
      const data = await fetchProductData(slug, true); // 强制跳过缓存
      console.log('获取到的产品数据:', data);
      
      // 将数据存储在 sessionStorage 中
      sessionStorage.setItem('productData', JSON.stringify(data));
      
      // 跳转到编辑页面
      navigate('/editor');
    } catch (err) {
      console.error('获取产品失败:', err);
      setError(i18n.language === 'zh' 
        ? `无法获取产品信息: ${err.message}` 
        : `Failed to fetch product: ${err.message}`);
      setLoading(false);
    }
  };

  const loadExampleProduct = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await fetchProductData(EXAMPLE_PRODUCT, true); // 强制跳过缓存
      
      // 将数据存储在 sessionStorage 中
      sessionStorage.setItem('productData', JSON.stringify(data));
      
      // 跳转到编辑页面
      navigate('/editor');
    } catch (err) {
      console.error('加载示例产品失败:', err);
      setError(i18n.language === 'zh' 
        ? `加载示例失败: ${err.message}` 
        : `Failed to load example: ${err.message}`);
      setLoading(false);
    }
  };

  return (
    <div className="max-w-screen-2xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          {t('home.title').split('Product Hunt').map((part, index, array) => 
            index === 0 ? (
              <span key={index}>
                {part}<span className="text-ph-orange">Product Hunt</span>
              </span>
            ) : (
              <span key={index}>{part}</span>
            )
          )}
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          {t('home.subtitle')}
        </p>
      </div>
      
      <div className="bg-gradient-to-br from-white to-orange-50 rounded-2xl shadow-lg p-8 mb-10">
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-col gap-8">
            <div className="relative">
              <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-ph-orange text-white rounded-full p-3 shadow-lg">
                <FontAwesomeIcon icon={faSearch} className="text-xl" />
              </div>
              <label className="block text-center text-lg font-medium text-gray-700 mb-4">
                {i18n.language === 'zh' ? '输入 Product Hunt 产品链接' : 'Enter Product Hunt Product Link'}
              </label>
              <div className="relative">
                <input 
                  type="text" 
                  value={productUrl}
                  onChange={handleInputChange}
                  placeholder={t('home.inputPlaceholder')}
                  className="input input-bordered w-full py-4 px-6 text-lg pr-36 focus:border-ph-orange shadow-sm"
                />
                <div className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-[120px] flex items-center justify-center">
                  <button 
                    className="btn btn-primary w-full h-full px-2 flex items-center justify-center gap-1"
                    onClick={handleFetchProduct}
                    disabled={loading}
                  >
                    {loading ? (
                      <span className="loading loading-spinner"></span>
                    ) : (
                      <>
                        <FontAwesomeIcon icon={faWandMagicSparkles} className="text-sm" />
                        <span className="text-sm">{t('home.generateButton')}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
              <div className="text-center mt-3">
                <button 
                  className="text-ph-orange hover:underline flex items-center gap-1 mx-auto"
                  onClick={loadExampleProduct}
                >
                  <FontAwesomeIcon icon={faInfoCircle} />
                  <span>{t('home.loadExample')} (voltops-llm-observability-platform)</span>
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="bg-white p-6 rounded-xl shadow-md flex flex-col items-center text-center">
                <div className="bg-blue-100 p-3 rounded-full mb-4">
                  <FontAwesomeIcon icon={faMagic} className="text-blue-600 text-xl" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{i18n.language === 'zh' ? '多种预设模板' : 'Multiple Templates'}</h3>
                <p className="text-gray-600">{i18n.language === 'zh' ? '简约、专业、创意等多种风格，一键应用' : 'Simple, professional, creative styles with one-click apply'}</p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-md flex flex-col items-center text-center">
                <div className="bg-green-100 p-3 rounded-full mb-4">
                  <FontAwesomeIcon icon={faPalette} className="text-green-600 text-xl" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{t('home.features.customize')}</h3>
                <p className="text-gray-600">{i18n.language === 'zh' ? '丰富的颜色、背景和样式选项，打造独特卡片' : 'Rich color, background and style options for unique cards'}</p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-md flex flex-col items-center text-center">
                <div className="bg-purple-100 p-3 rounded-full mb-4">
                  <FontAwesomeIcon icon={faShareAlt} className="text-purple-600 text-xl" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{t('home.features.export')}</h3>
                <p className="text-gray-600">{i18n.language === 'zh' ? '多种格式和分辨率，完美适配各种社交平台' : 'Multiple formats and resolutions, perfect for social platforms'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage; 