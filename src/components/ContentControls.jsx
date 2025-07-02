import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faImage, faFont, faThumbsUp, faComment, faSave, faUndo } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';

const ContentControls = ({ productData, onProductDataChange }) => {
  const [editedData, setEditedData] = useState({ ...productData });
  const [activeTab, setActiveTab] = useState('basic');
  const [isEditing, setIsEditing] = useState(false);
  const { i18n } = useTranslation();

  // 开始编辑
  const handleStartEdit = () => {
    setEditedData({ ...productData });
    setIsEditing(true);
  };

  // 保存编辑
  const handleSaveEdit = () => {
    onProductDataChange(editedData);
    setIsEditing(false);
  };

  // 取消编辑
  const handleCancelEdit = () => {
    setEditedData({ ...productData });
    setIsEditing(false);
  };

  // 处理输入变化
  const handleInputChange = (field, value) => {
    setEditedData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="space-y-5">
      {/* 编辑控制按钮 */}
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 flex justify-between items-center">
        <h3 className="text-base font-medium text-gray-700">{i18n.language === 'zh' ? '内容编辑' : 'Content Edit'}</h3>
        {!isEditing ? (
          <button 
            className="btn btn-primary btn-sm"
            onClick={handleStartEdit}
          >
            <FontAwesomeIcon icon={faEdit} className="mr-2" />
            {i18n.language === 'zh' ? '编辑内容' : 'Edit Content'}
          </button>
        ) : (
          <div className="flex gap-2">
            <button 
              className="btn btn-outline btn-sm"
              onClick={handleCancelEdit}
            >
              <FontAwesomeIcon icon={faUndo} className="mr-1" />
              {i18n.language === 'zh' ? '取消' : 'Cancel'}
            </button>
            <button 
              className="btn btn-primary btn-sm"
              onClick={handleSaveEdit}
            >
              <FontAwesomeIcon icon={faSave} className="mr-1" />
              {i18n.language === 'zh' ? '保存' : 'Save'}
            </button>
          </div>
        )}
      </div>

      {/* 选项卡 */}
      {isEditing && (
        <>
          <div className="grid grid-cols-3 gap-3 mb-4">
            <button 
              className={`flex flex-col items-center justify-center p-3 rounded-lg transition-all ${
                activeTab === 'basic' 
                  ? 'bg-gradient-to-br from-primary/20 to-primary/10 shadow-md border border-primary/20' 
                  : 'bg-gray-100 hover:bg-gray-200 border border-gray-200'
              }`}
              onClick={() => setActiveTab('basic')}
            >
              <FontAwesomeIcon 
                icon={faFont} 
                className={`text-xl mb-2 ${activeTab === 'basic' ? 'text-primary' : 'text-gray-600'}`} 
              />
              <span className={`text-sm font-medium ${activeTab === 'basic' ? 'text-primary' : 'text-gray-700'}`}>
                {i18n.language === 'zh' ? '基本信息' : 'Basic Info'}
              </span>
            </button>
            <button 
              className={`flex flex-col items-center justify-center p-3 rounded-lg transition-all ${
                activeTab === 'media' 
                  ? 'bg-gradient-to-br from-primary/20 to-primary/10 shadow-md border border-primary/20' 
                  : 'bg-gray-100 hover:bg-gray-200 border border-gray-200'
              }`}
              onClick={() => setActiveTab('media')}
            >
              <FontAwesomeIcon 
                icon={faImage} 
                className={`text-xl mb-2 ${activeTab === 'media' ? 'text-primary' : 'text-gray-600'}`} 
              />
              <span className={`text-sm font-medium ${activeTab === 'media' ? 'text-primary' : 'text-gray-700'}`}>
                {i18n.language === 'zh' ? '媒体' : 'Media'}
              </span>
            </button>
            <button 
              className={`flex flex-col items-center justify-center p-3 rounded-lg transition-all ${
                activeTab === 'stats' 
                  ? 'bg-gradient-to-br from-primary/20 to-primary/10 shadow-md border border-primary/20' 
                  : 'bg-gray-100 hover:bg-gray-200 border border-gray-200'
              }`}
              onClick={() => setActiveTab('stats')}
            >
              <FontAwesomeIcon 
                icon={faThumbsUp} 
                className={`text-xl mb-2 ${activeTab === 'stats' ? 'text-primary' : 'text-gray-600'}`} 
              />
              <span className={`text-sm font-medium ${activeTab === 'stats' ? 'text-primary' : 'text-gray-700'}`}>
                {i18n.language === 'zh' ? '数据' : 'Stats'}
              </span>
            </button>
          </div>

          <div className="space-y-4">
            {/* 基本信息 */}
            {activeTab === 'basic' && (
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 space-y-4">
                <h3 className="text-sm font-medium text-gray-700 mb-3">
                  {i18n.language === 'zh' ? '基本产品信息' : 'Basic Product Information'}
                </h3>
                <div>
                  <label className="block text-sm font-medium mb-2">{i18n.language === 'zh' ? '产品名称' : 'Product Name'}</label>
                  <input 
                    type="text" 
                    value={editedData.name || ''}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="input input-bordered w-full"
                    placeholder={i18n.language === 'zh' ? "输入产品名称" : "Enter product name"}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">{i18n.language === 'zh' ? '产品标语' : 'Product Tagline'}</label>
                  <input 
                    type="text" 
                    value={editedData.tagline || ''}
                    onChange={(e) => handleInputChange('tagline', e.target.value)}
                    className="input input-bordered w-full"
                    placeholder={i18n.language === 'zh' ? "输入产品标语" : "Enter product tagline"}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">{i18n.language === 'zh' ? '产品描述' : 'Product Description'}</label>
                  <textarea 
                    value={editedData.description || ''}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    className="textarea textarea-bordered w-full h-24"
                    placeholder={i18n.language === 'zh' ? "输入产品描述" : "Enter product description"}
                  ></textarea>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">{i18n.language === 'zh' ? '产品链接' : 'Product Link'}</label>
                  <input 
                    type="text" 
                    value={editedData.url || ''}
                    onChange={(e) => handleInputChange('url', e.target.value)}
                    className="input input-bordered w-full"
                    placeholder={i18n.language === 'zh' ? "输入产品链接" : "Enter product link"}
                  />
                </div>
              </div>
            )}

            {/* 媒体 */}
            {activeTab === 'media' && (
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 space-y-4">
                <h3 className="text-sm font-medium text-gray-700 mb-3">
                  {i18n.language === 'zh' ? '媒体资源' : 'Media Resources'}
                </h3>
                <div>
                  <label className="block text-sm font-medium mb-2">Logo URL</label>
                  <input 
                    type="text" 
                    value={editedData.logoUrl || ''}
                    onChange={(e) => handleInputChange('logoUrl', e.target.value)}
                    className="input input-bordered w-full"
                    placeholder={i18n.language === 'zh' ? "输入Logo图片URL" : "Enter Logo image URL"}
                  />
                  {editedData.logoUrl && (
                    <div className="mt-3 p-3 rounded-md bg-white border border-gray-200 shadow-sm">
                      <p className="text-xs text-gray-500 mb-2">{i18n.language === 'zh' ? "预览:" : "Preview:"}</p>
                      <img 
                        src={editedData.logoUrl} 
                        alt={i18n.language === 'zh' ? "Logo预览" : "Logo preview"}
                        className="h-12 w-12 object-contain"
                        onError={(e) => e.target.src = 'https://via.placeholder.com/100?text=Logo'}
                      />
                    </div>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">{i18n.language === 'zh' ? "媒体图片URL" : "Media Image URL"}</label>
                  <input 
                    type="text" 
                    value={editedData.media && editedData.media[0] ? editedData.media[0] : ''}
                    onChange={(e) => {
                      const newMedia = e.target.value ? [e.target.value] : [];
                      handleInputChange('media', newMedia);
                    }}
                    className="input input-bordered w-full"
                    placeholder={i18n.language === 'zh' ? "输入媒体图片URL" : "Enter media image URL"}
                  />
                  {editedData.media && editedData.media[0] && (
                    <div className="mt-3 p-3 rounded-md bg-white border border-gray-200 shadow-sm">
                      <p className="text-xs text-gray-500 mb-2">{i18n.language === 'zh' ? "预览:" : "Preview:"}</p>
                      <img 
                        src={editedData.media[0]} 
                        alt={i18n.language === 'zh' ? "媒体预览" : "Media preview"}
                        className="max-h-32 object-contain"
                        onError={(e) => e.target.src = 'https://via.placeholder.com/300x200?text=Media'}
                      />
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* 数据 */}
            {activeTab === 'stats' && (
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 space-y-4">
                <h3 className="text-sm font-medium text-gray-700 mb-3">
                  {i18n.language === 'zh' ? '产品数据统计' : 'Product Statistics'}
                </h3>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    <FontAwesomeIcon icon={faThumbsUp} className="mr-1" />
                    {i18n.language === 'zh' ? "点赞数" : "Votes"}
                  </label>
                  <input 
                    type="number" 
                    value={editedData.votesCount || 0}
                    onChange={(e) => handleInputChange('votesCount', parseInt(e.target.value) || 0)}
                    className="input input-bordered w-full"
                    min="0"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">
                    <FontAwesomeIcon icon={faComment} className="mr-1" />
                    {i18n.language === 'zh' ? "评论数" : "Comments"}
                  </label>
                  <input 
                    type="number" 
                    value={editedData.commentsCount || 0}
                    onChange={(e) => handleInputChange('commentsCount', parseInt(e.target.value) || 0)}
                    className="input input-bordered w-full"
                    min="0"
                  />
                </div>
              </div>
            )}
          </div>
        </>
      )}

      {/* 非编辑状态下的内容预览 */}
      {!isEditing && (
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 space-y-4">
          <h3 className="text-sm font-medium text-gray-700 mb-1">
            {i18n.language === 'zh' ? '产品信息预览' : 'Product Information Preview'}
          </h3>
          <div className="flex items-start gap-3">
            {productData.logoUrl && (
              <img 
                src={productData.logoUrl} 
                alt={`${productData.name} logo`}
                className="w-12 h-12 rounded-lg object-contain bg-white p-1 border border-gray-200 shadow-sm"
                onError={(e) => e.target.src = 'https://via.placeholder.com/48?text=Logo'}
              />
            )}
            <div>
              <h4 className="font-semibold">{productData.name}</h4>
              <p className="text-sm text-gray-600">{productData.tagline}</p>
            </div>
          </div>
          
          <div className="flex gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <FontAwesomeIcon icon={faThumbsUp} />
              <span>{productData.votesCount || 0}</span>
            </div>
            <div className="flex items-center gap-1">
              <FontAwesomeIcon icon={faComment} />
              <span>{productData.commentsCount || 0}</span>
            </div>
          </div>
          
          {productData.description && (
            <div className="pt-2 border-t border-gray-200">
              <p className="text-sm text-gray-600 line-clamp-3">{productData.description}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ContentControls; 