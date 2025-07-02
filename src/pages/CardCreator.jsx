import { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faWandMagicSparkles, faImage, faPalette, faLayerGroup, faDownload, faCog, faFileExport, faInfoCircle, faMagic, faShareAlt, faRocket, faFont, faEdit, faEye, faToggleOn } from '@fortawesome/free-solid-svg-icons';
import { toPng, toJpeg, toBlob } from 'html-to-image';
import ProductCard from '../components/ProductCard';
import CardControls from '../components/CardControls';
import TextStyleControls from '../components/TextStyleControls';
import ContentControls from '../components/ContentControls';
import { fetchProductData } from '../services/productHuntApi';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// Export resolution presets
const EXPORT_PRESETS = [
  { label: '标准 (1x)', labelEn: 'Standard (1x)', scale: 1 },
  { label: '高清 (2x)', labelEn: 'HD (2x)', scale: 2 },
  { label: '超高清 (3x)', labelEn: 'Ultra HD (3x)', scale: 3 },
  { label: '4K (4x)', labelEn: '4K (4x)', scale: 4 }
];

// Example product
const EXAMPLE_PRODUCT = 'voltops-llm-observability-platform';

const CardCreator = () => {
  const [productUrl, setProductUrl] = useState('');
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showExportOptions, setShowExportOptions] = useState(false);
  const [activeTab, setActiveTab] = useState('content'); // Default active tab: content
  const [exportSettings, setExportSettings] = useState({
    format: 'png',
    quality: 0.95,
    scale: 2
  });
  const [cardSettings, setCardSettings] = useState({
    theme: 'light',
    backgroundColor: '#ffffff',
    backgroundType: 'solid', // solid, gradient, dotted, striped
    gradientValue: 'bg-gradient-to-br from-white to-gray-100', // 渐变预设值
    frameStyle: 'clean', // clean, window, retro, minimal, shadow, rounded, glassmorphic
    showLogo: true,
    showTagline: true,
    shadow: 'md', // none, sm, md, lg, inner
    aspectRatio: '16:9', // 16:9, 4:3, 1:1, 3:4, 9:16, 2:1
    watermark: true,
    showVotes: true, // 添加点赞数显示控制
    showComments: true, // 添加评论数显示控制
    // 添加文字样式设置
    textSettings: {
      fontFamily: 'font-sans',
      titleSize: 'text-2xl',
      taglineSize: 'text-base',
      titleColor: 'text-gray-900',
      taglineColor: 'text-gray-600',
      bold: true,
      italic: false,
      align: 'text-left',
      letterSpacing: 2, // 0-4: tighter, tight, normal, wide, wider
      customTitleColor: '',
      customTaglineColor: ''
    }
  });
  
  const cardRef = useRef(null);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  // 从 sessionStorage 中加载产品数据
  useEffect(() => {
    // 设置页面特定的SEO元标签
    document.title = t('editor.title', "编辑器 - Product Latest");
    
    // 更新meta描述
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', t('editor.description', 'Product Latest编辑器 - 自定义您的Product Hunt产品卡片，调整内容、样式、布局，并导出高质量图片用于社交媒体分享'));
    }
    
    const storedProductData = sessionStorage.getItem('productData');
    if (storedProductData) {
      try {
        const data = JSON.parse(storedProductData);
        setProductData(data);
        if (data.url) {
          setProductUrl(data.url);
        }
      } catch (err) {
        console.error(i18n.language === 'zh' ? '解析存储的产品数据失败:' : 'Failed to parse stored product data:', err);
      }
    }
  }, [t, i18n.language]);

  const loadExampleProduct = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await fetchProductData(EXAMPLE_PRODUCT, true);
      setProductData(data);
      setProductUrl(`https://www.producthunt.com/products/${EXAMPLE_PRODUCT}`);
      setLoading(false);
    } catch (err) {
      console.error(i18n.language === 'zh' ? '加载示例产品失败:' : 'Failed to load example product:', err);
      setError(i18n.language === 'zh' 
        ? `加载示例失败: ${err.message}` 
        : `Failed to load example: ${err.message}`);
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setProductUrl(e.target.value);
  };

  const extractSlugFromUrl = (url) => {
    let slug = url.trim();
    
    // 如果已经是单纯的slug，直接返回
    if (!slug.includes('/') && !slug.includes('.')) {
      console.log(i18n.language === 'zh' ? '输入是单纯的slug:' : 'Input is a pure slug:', slug);
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
          console.log(i18n.language === 'zh' ? '从URL提取的slug:' : 'Slug extracted from URL:', parts[1]);
          return parts[1];
        }
      }
    } catch (e) {
      console.log(i18n.language === 'zh' ? 'URL解析失败，尝试简单提取' : 'URL parsing failed, attempting simple extraction');
    }
    
    // 如果上述方法失败，尝试简单地从路径中提取最后一部分
    if (slug.includes('/')) {
      // 移除末尾的斜杠
      if (slug.endsWith('/')) {
        slug = slug.slice(0, -1);
      }
      const parts = slug.split('/');
      const potentialSlug = parts[parts.length - 1];
      console.log(i18n.language === 'zh' ? '从路径提取的slug:' : 'Slug extracted from path:', potentialSlug);
      return potentialSlug;
    }
    
    console.log(i18n.language === 'zh' ? '使用原始输入作为slug:' : 'Using original input as slug:', slug);
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
      console.log(i18n.language === 'zh' ? '最终使用的slug:' : 'Final slug used:', slug);
      
      const data = await fetchProductData(slug, true);
      console.log(i18n.language === 'zh' ? '获取到的产品数据:' : 'Product data retrieved:', data);
      setProductData(data);
      setLoading(false);
    } catch (err) {
      console.error(i18n.language === 'zh' ? '获取产品失败:' : 'Failed to fetch product:', err);
      setError(i18n.language === 'zh' 
        ? `无法获取产品信息: ${err.message}` 
        : `Failed to fetch product: ${err.message}`);
      setLoading(false);
    }
  };

  const handleSettingsChange = (name, value) => {
    setCardSettings(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTextSettingsChange = (name, value) => {
    setCardSettings(prev => ({
      ...prev,
      textSettings: {
        ...prev.textSettings,
        [name]: value
      }
    }));
  };

  const handleProductDataChange = (newProductData) => {
    setProductData(newProductData);
  };

  const handleExportSettingChange = (name, value) => {
    setExportSettings(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleExport = async () => {
    if (!cardRef.current) return;
    
    try {
      const { format, quality, scale } = exportSettings;
      let dataUrl;
      
      const options = {
        quality,
        pixelRatio: scale,
        backgroundColor: cardSettings.backgroundType === 'solid' ? cardSettings.backgroundColor : null
      };
      
      switch (format) {
        case 'png':
          dataUrl = await toPng(cardRef.current, options);
          break;
        case 'jpeg':
        case 'jpg':
          dataUrl = await toJpeg(cardRef.current, options);
          break;
        case 'webp':
          // html-to-image currently doesn't directly support webp, so we convert to blob and then use canvas
          const blob = await toBlob(cardRef.current, options);
          if (blob) {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const img = new Image();
            
            return new Promise((resolve) => {
              img.onload = () => {
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);
                
                canvas.toBlob((webpBlob) => {
                  const url = URL.createObjectURL(webpBlob);
                  const link = document.createElement('a');
                  link.download = `product-hunt-card-${productData?.name || 'card'}.webp`;
                  link.href = url;
                  link.click();
                  
                  // Cleanup
                  setTimeout(() => URL.revokeObjectURL(url), 5000);
                  resolve();
                }, 'image/webp', quality);
              };
              img.src = URL.createObjectURL(blob);
            });
          }
          return;
        default:
          dataUrl = await toPng(cardRef.current, options);
      }
      
      const link = document.createElement('a');
      link.download = `product-hunt-card-${productData?.name || 'card'}.${format}`;
      link.href = dataUrl;
      link.click();

      // Close options panel after export
      setShowExportOptions(false);
    } catch (err) {
      console.error(i18n.language === 'zh' ? "导出图片失败" : "Failed to export image", err);
    }
  };

  // 显示选项组件
  const DisplayOptions = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold flex items-center gap-2">
        <FontAwesomeIcon icon={faEye} />
        <span>{t('editor.display')}</span>
      </h3>
      <div className="space-y-2">
        <div className="form-control">
          <label className="label cursor-pointer justify-start gap-2">
            <input 
              type="checkbox" 
              className="toggle toggle-primary toggle-sm" 
              checked={cardSettings.showLogo} 
              onChange={e => handleSettingsChange('showLogo', e.target.checked)}
            />
            <span className="label-text">{i18n.language === 'zh' ? '显示 Logo' : 'Show Logo'}</span>
          </label>
        </div>
        <div className="form-control">
          <label className="label cursor-pointer justify-start gap-2">
            <input 
              type="checkbox" 
              className="toggle toggle-primary toggle-sm" 
              checked={cardSettings.showTagline} 
              onChange={e => handleSettingsChange('showTagline', e.target.checked)}
            />
            <span className="label-text">{i18n.language === 'zh' ? '显示标语' : 'Show Tagline'}</span>
          </label>
        </div>
        <div className="form-control">
          <label className="label cursor-pointer justify-start gap-2">
            <input 
              type="checkbox" 
              className="toggle toggle-primary toggle-sm" 
              checked={cardSettings.showVotes} 
              onChange={e => handleSettingsChange('showVotes', e.target.checked)}
            />
            <span className="label-text">{i18n.language === 'zh' ? '显示点赞数' : 'Show Upvotes'}</span>
          </label>
        </div>
        <div className="form-control">
          <label className="label cursor-pointer justify-start gap-2">
            <input 
              type="checkbox" 
              className="toggle toggle-primary toggle-sm" 
              checked={cardSettings.showComments} 
              onChange={e => handleSettingsChange('showComments', e.target.checked)}
            />
            <span className="label-text">{i18n.language === 'zh' ? '显示评论数' : 'Show Comments'}</span>
          </label>
        </div>
        <div className="form-control">
          <label className="label cursor-pointer justify-start gap-2">
            <input 
              type="checkbox" 
              className="toggle toggle-primary toggle-sm" 
              checked={cardSettings.watermark} 
              onChange={e => handleSettingsChange('watermark', e.target.checked)}
            />
            <span className="label-text">{i18n.language === 'zh' ? '显示水印' : 'Show Watermark'}</span>
          </label>
        </div>
      </div>
    </div>
  );

  // 返回首页
  const goToHomePage = () => {
    navigate('/');
  };

  return (
    <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {!productData && (
        <div className="flex flex-col items-center justify-center h-64">
          <h2 className="text-2xl font-bold mb-4">{t('editor.noProductData')}</h2>
          <p className="text-gray-600 mb-6">{t('editor.noProductDataDesc')}</p>
          <button 
            className="btn btn-primary"
            onClick={goToHomePage}
          >
            {t('editor.backToHome')}
          </button>
        </div>
      )}
      
      {productData && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Left sidebar - Content editing, text style and display options */}
          <div className="lg:col-span-3 order-3 lg:order-1">
            {/* Left sidebar tabs */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col h-full">
              <div className="grid grid-cols-3 gap-3 p-4 bg-white">
                <button 
                  className={`flex flex-col items-center justify-center p-3 rounded-lg transition-all ${
                    activeTab === 'content' 
                      ? 'bg-gradient-to-br from-primary/20 to-primary/10 shadow-md border border-primary/20' 
                      : 'bg-gray-100 hover:bg-gray-200 border border-gray-200'
                  }`}
                  onClick={() => setActiveTab('content')}
                >
                  <FontAwesomeIcon 
                    icon={faEdit} 
                    className={`text-xl mb-2 ${activeTab === 'content' ? 'text-primary' : 'text-gray-600'}`} 
                  />
                  <span className={`text-sm font-medium ${activeTab === 'content' ? 'text-primary' : 'text-gray-700'}`}>
                    {t('editor.content')}
                  </span>
                </button>
                <button 
                  className={`flex flex-col items-center justify-center p-3 rounded-lg transition-all ${
                    activeTab === 'text' 
                      ? 'bg-gradient-to-br from-primary/20 to-primary/10 shadow-md border border-primary/20' 
                      : 'bg-gray-100 hover:bg-gray-200 border border-gray-200'
                  }`}
                  onClick={() => setActiveTab('text')}
                >
                  <FontAwesomeIcon 
                    icon={faFont} 
                    className={`text-xl mb-2 ${activeTab === 'text' ? 'text-primary' : 'text-gray-600'}`} 
                  />
                  <span className={`text-sm font-medium ${activeTab === 'text' ? 'text-primary' : 'text-gray-700'}`}>
                    {t('editor.text')}
                  </span>
                </button>
                <button 
                  className={`flex flex-col items-center justify-center p-3 rounded-lg transition-all ${
                    activeTab === 'display' 
                      ? 'bg-gradient-to-br from-primary/20 to-primary/10 shadow-md border border-primary/20' 
                      : 'bg-gray-100 hover:bg-gray-200 border border-gray-200'
                  }`}
                  onClick={() => setActiveTab('display')}
                >
                  <FontAwesomeIcon 
                    icon={faEye} 
                    className={`text-xl mb-2 ${activeTab === 'display' ? 'text-primary' : 'text-gray-600'}`} 
                  />
                  <span className={`text-sm font-medium ${activeTab === 'display' ? 'text-primary' : 'text-gray-700'}`}>
                    {t('editor.display')}
                  </span>
                </button>
              </div>
              
              <div className="p-4 flex-grow overflow-y-auto">
                {activeTab === 'content' && (
                  <ContentControls 
                    productData={productData}
                    onProductDataChange={handleProductDataChange}
                  />
                )}
                
                {activeTab === 'text' && (
                  <TextStyleControls 
                    textSettings={cardSettings.textSettings}
                    onTextSettingsChange={handleTextSettingsChange}
                  />
                )}
                
                {activeTab === 'display' && (
                  <DisplayOptions />
                )}
              </div>
            </div>
          </div>
          
          {/* Middle area - Card preview */}
          <div className="lg:col-span-6 order-1 lg:order-2 flex flex-col">
            <div className="bg-gray-100 p-6 rounded-xl flex items-center justify-center flex-1">
              <div ref={cardRef} className="max-w-full">
                <ProductCard 
                  productData={productData} 
                  settings={cardSettings}
                />
              </div>
            </div>
            
            <div className="mt-4 flex flex-col gap-3 items-center">
              <div className="flex flex-wrap gap-3 justify-center">
                <button 
                  className="btn btn-outline"
                  onClick={() => setShowExportOptions(!showExportOptions)}
                >
                  <FontAwesomeIcon icon={faCog} />
                  {t('editor.exportSettings')}
                </button>
                <button 
                  className="btn btn-primary" 
                  onClick={handleExport}
                >
                  <FontAwesomeIcon icon={faDownload} />
                  {t('editor.exportImage')}
                </button>
                <button 
                  className="btn btn-outline"
                  onClick={goToHomePage}
                >
                  {t('editor.backToHome')}
                </button>
              </div>
              
              {showExportOptions && (
                <div className="card bg-white shadow-md p-4 mt-2 w-full max-w-md">
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <FontAwesomeIcon icon={faFileExport} />
                    {t('editor.exportSettings')}
                  </h3>
                  <div className="space-y-4">
                    {/* Image format */}
                    <div>
                      <label className="block text-sm font-medium mb-2">{i18n.language === 'zh' ? '图片格式' : 'Image Format'}</label>
                      <div className="flex gap-2">
                        {['png', 'jpeg', 'webp'].map((format) => (
                          <label 
                            key={format} 
                            className={`btn btn-sm ${exportSettings.format === format ? 'btn-primary' : 'btn-outline'}`}
                          >
                            <input 
                              type="radio" 
                              name="format" 
                              value={format}
                              checked={exportSettings.format === format}
                              onChange={() => handleExportSettingChange('format', format)}
                              className="hidden"
                            />
                            {format.toUpperCase()}
                          </label>
                        ))}
                      </div>
                    </div>
                    
                    {/* Image quality */}
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        {i18n.language === 'zh' ? `图片质量: ${Math.round(exportSettings.quality * 100)}%` : `Image Quality: ${Math.round(exportSettings.quality * 100)}%`}
                      </label>
                      <input 
                        type="range" 
                        min="0.5" 
                        max="1" 
                        step="0.05"
                        value={exportSettings.quality}
                        onChange={(e) => handleExportSettingChange('quality', parseFloat(e.target.value))}
                        className="range range-sm range-primary"
                      />
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>50%</span>
                        <span>75%</span>
                        <span>100%</span>
                      </div>
                    </div>
                    
                    {/* Resolution multiplier */}
                    <div>
                      <label className="block text-sm font-medium mb-2">{i18n.language === 'zh' ? '分辨率' : 'Resolution'}</label>
                      <div className="flex flex-wrap gap-2">
                        {EXPORT_PRESETS.map((preset) => (
                          <label 
                            key={preset.scale} 
                            className={`btn btn-sm ${exportSettings.scale === preset.scale ? 'btn-primary' : 'btn-outline'}`}
                          >
                            <input 
                              type="radio" 
                              name="scale" 
                              value={preset.scale}
                              checked={exportSettings.scale === preset.scale}
                              onChange={() => handleExportSettingChange('scale', preset.scale)}
                              className="hidden"
                            />
                            <span className="truncate">{i18n.language === 'zh' ? preset.label : preset.labelEn}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Right sidebar - Card design controls */}
          <div className="lg:col-span-3 order-2 lg:order-3">
            <div className="bg-white rounded-xl shadow-md p-5 h-full">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <FontAwesomeIcon icon={faPalette} />
                <span>{t('editor.design')}</span>
              </h3>
              
              <div className="h-[calc(100%-3rem)]">
                <CardControls 
                  settings={cardSettings}
                  onSettingsChange={handleSettingsChange}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CardCreator; 