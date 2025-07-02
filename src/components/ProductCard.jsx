import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpLong, faComment } from '@fortawesome/free-solid-svg-icons';

const ProductCard = ({ productData, settings }) => {
  if (!productData) return null;

  const {
    theme,
    backgroundColor,
    backgroundType,
    gradientValue,
    frameStyle,
    showLogo,
    showTagline,
    shadow,
    aspectRatio,
    watermark,
    showVotes = true, // 默认显示点赞数
    showComments = true, // 默认显示评论数
    textSettings = {} // 文字样式设置
  } = settings;
  
  // 卡片背景样式
  const getBgStyle = () => {
    switch (backgroundType) {
      case 'gradient':
        // 如果有选择预设渐变，则使用预设
        if (gradientValue) {
          return gradientValue;
        }
        return 'bg-gradient-to-br from-white to-gray-100 dark:from-gray-800 dark:to-gray-900';
      case 'dotted':
        return 'bg-dotted bg-dotted-sm';
      case 'striped':
        return 'bg-striped bg-striped-sm';
      default:
        return backgroundColor ? `bg-[${backgroundColor}]` : 'bg-white dark:bg-gray-800';
    }
  };
  
  // 卡片阴影样式
  const getShadowStyle = () => {
    switch (shadow) {
      case 'sm': return 'shadow-sm';
      case 'md': return 'shadow-md';
      case 'lg': return 'shadow-lg';
      case 'inner': return 'shadow-inner';
      default: return '';
    }
  };
  
  // 卡片比例样式
  const getAspectRatioStyle = () => {
    switch (aspectRatio) {
      case '4:3': return 'aspect-[4/3]';
      case '1:1': return 'aspect-square';
      case '3:4': return 'aspect-[3/4]';
      case '9:16': return 'aspect-[9/16]';
      case '2:1': return 'aspect-[2/1]';
      default: return 'aspect-video'; // 16:9
    }
  };
  
  // 卡片框架样式
  const getFrameStyle = () => {
    switch (frameStyle) {
      case 'window':
        return (
          <div className="absolute top-0 left-0 w-full h-8 bg-gray-100 dark:bg-gray-700 flex items-center px-3 rounded-t-lg border-b border-gray-200 dark:border-gray-600">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
          </div>
        );
      case 'retro':
        return (
          <div className="absolute inset-0 border-4 border-gray-800 dark:border-gray-400 rounded-lg"></div>
        );
      case 'minimal':
        return (
          <div className="absolute inset-0 border border-gray-200 dark:border-gray-600 rounded-lg"></div>
        );
      case 'shadow':
        return (
          <div className="absolute inset-0 shadow-[inset_0_0_30px_rgba(0,0,0,0.1)] dark:shadow-[inset_0_0_30px_rgba(255,255,255,0.05)] rounded-lg"></div>
        );
      case 'rounded':
        return (
          <div className="absolute inset-0 border-2 border-gray-200 dark:border-gray-600 rounded-2xl"></div>
        );
      case 'glassmorphic':
        return (
          <div className="absolute inset-0 backdrop-blur-sm bg-white/30 dark:bg-gray-800/40 rounded-lg border border-white/40 dark:border-gray-600/40"></div>
        );
      default:
        return null;
    }
  };

  // 获取基于比例的宽度
  const getCardWidth = () => {
    switch (aspectRatio) {
      case '1:1': return '500px';
      case '3:4':
      case '9:16': return '400px';
      case '2:1': return '800px';
      default: return '700px'; // 16:9, 4:3 等
    }
  };

  // 获取文字样式
  const getTitleClasses = () => {
    const classes = ['text-gray-900 dark:text-gray-100'];
    
    if (textSettings.titleSize) classes.push(textSettings.titleSize);
    else classes.push('text-2xl');
    
    if (textSettings.titleColor) classes.push(textSettings.titleColor);
    
    if (textSettings.fontFamily) classes.push(textSettings.fontFamily);
    
    if (textSettings.bold) classes.push('font-bold');
    else classes.push('font-semibold');
    
    if (textSettings.italic) classes.push('italic');
    
    if (textSettings.align) classes.push(textSettings.align);
    
    return classes.join(' ');
  };
  
  const getTaglineClasses = () => {
    const classes = ['mt-1'];
    
    if (textSettings.taglineSize) classes.push(textSettings.taglineSize);
    else classes.push('text-base');
    
    if (textSettings.taglineColor) classes.push(textSettings.taglineColor);
    else classes.push('text-gray-600 dark:text-gray-300');
    
    if (textSettings.italic) classes.push('italic');
    
    if (textSettings.align) classes.push(textSettings.align);
    
    return classes.join(' ');
  };
  
  // 获取字间距样式
  const getLetterSpacingStyle = () => {
    if (textSettings.letterSpacing === undefined) return {};
    
    const spacingValues = ['tracking-tighter', 'tracking-tight', 'tracking-normal', 'tracking-wide', 'tracking-wider'];
    return { letterSpacing: spacingValues[textSettings.letterSpacing] || 'tracking-normal' };
  };

  // 获取自定义颜色样式
  const getTitleStyle = () => {
    if (textSettings.customTitleColor) {
      return { color: textSettings.customTitleColor };
    }
    return {};
  };
  
  const getTaglineStyle = () => {
    if (textSettings.customTaglineColor) {
      return { color: textSettings.customTaglineColor };
    }
    return {};
  };

  const cardClassNames = `relative overflow-hidden rounded-xl ${getShadowStyle()} ${getAspectRatioStyle()} max-w-full`;
  const cardStyle = { maxWidth: '100%', width: getCardWidth() };
  const letterSpacingClass = textSettings.letterSpacing !== undefined ? 
    ['tracking-tighter', 'tracking-tight', 'tracking-normal', 'tracking-wide', 'tracking-wider'][textSettings.letterSpacing] : 
    'tracking-normal';

  return (
    <div className={cardClassNames} style={cardStyle}>
      <div className={`relative h-full w-full p-6`} style={backgroundType === 'solid' ? { backgroundColor } : {}}>
        {/* 应用背景类 */}
        <div className={`absolute inset-0 ${getBgStyle()}`}></div>
        
        {getFrameStyle()}
        
        <div className={`relative ${frameStyle === 'window' ? 'pt-6' : ''} h-full flex flex-col z-10 ${letterSpacingClass}`}>
          <div className="flex items-start">
            {showLogo && productData.logoUrl && (
              <div className="mr-4 flex-shrink-0">
                <img 
                  src={productData.logoUrl} 
                  alt={`${productData.name} logo`} 
                  className="w-16 h-16 rounded-xl object-contain bg-white p-1"
                  onError={(e) => e.target.src = 'https://via.placeholder.com/100?text=Logo'}
                />
              </div>
            )}
            
            <div className="flex-1 overflow-hidden">
              <h2 className={getTitleClasses()} style={getTitleStyle()}>
                {productData.name}
              </h2>
              {showTagline && productData.tagline && (
                <p className={getTaglineClasses()} style={getTaglineStyle()}>
                  {productData.tagline}
                </p>
              )}
              
              {(showVotes || showComments) && (
                <div className="flex items-center mt-2 text-sm text-gray-500 dark:text-gray-400">
                  {showVotes && (
                    <div className="flex items-center mr-4">
                      <FontAwesomeIcon icon={faUpLong} className="mr-1 text-ph-orange" />
                      <span>{productData.votesCount || 0}</span>
                    </div>
                  )}
                  {showComments && (
                    <div className="flex items-center">
                      <FontAwesomeIcon icon={faComment} className="mr-1" />
                      <span>{productData.commentsCount || 0}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          
          {productData.media && productData.media.length > 0 && (
            <div className="mt-4 flex-1 flex items-center justify-center overflow-hidden">
              <img 
                src={productData.media[0]} 
                alt={productData.name} 
                className="rounded-lg object-contain max-h-full"
                onError={(e) => e.target.src = 'https://via.placeholder.com/600x400?text=No+Image'}
              />
            </div>
          )}
          
          {watermark && (
            <div className="absolute bottom-2 right-2 text-xs text-gray-400 flex items-center">
              <span className="mr-1">via</span>
              <span className="font-bold text-ph-orange">Product Hunt</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard; 