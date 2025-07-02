import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFont, faBold, faItalic, faAlignLeft, faAlignCenter, faAlignRight, faTextHeight, faPalette } from '@fortawesome/free-solid-svg-icons';
import { HexColorPicker } from 'react-colorful';
import { useTranslation } from 'react-i18next';

// 字体预设
const FONT_PRESETS = [
  { name: '默认', nameEn: 'Default', value: 'font-sans' },
  { name: '无衬线', nameEn: 'Sans-serif', value: 'font-sans' },
  { name: '衬线', nameEn: 'Serif', value: 'font-serif' },
  { name: '等宽', nameEn: 'Monospace', value: 'font-mono' },
  { name: '圆润', nameEn: 'Rounded', value: 'font-rounded' },
  { name: '现代', nameEn: 'Modern', value: 'font-modern' }
];

// 字体大小预设
const SIZE_PRESETS = [
  { name: '小', nameEn: 'Small', value: 'text-sm' },
  { name: '默认', nameEn: 'Default', value: 'text-base' },
  { name: '中', nameEn: 'Medium', value: 'text-lg' },
  { name: '大', nameEn: 'Large', value: 'text-xl' },
  { name: '超大', nameEn: 'Extra Large', value: 'text-2xl' }
];

// 文字颜色预设
const COLOR_PRESETS = [
  { name: '黑色', nameEn: 'Black', value: 'text-gray-900' },
  { name: '深灰', nameEn: 'Dark Gray', value: 'text-gray-700' },
  { name: '灰色', nameEn: 'Gray', value: 'text-gray-500' },
  { name: '浅灰', nameEn: 'Light Gray', value: 'text-gray-300' },
  { name: '白色', nameEn: 'White', value: 'text-white' },
  { name: '主题色', nameEn: 'Theme Color', value: 'text-ph-orange' },
  { name: '蓝色', nameEn: 'Blue', value: 'text-blue-600' },
  { name: '绿色', nameEn: 'Green', value: 'text-green-600' },
  { name: '红色', nameEn: 'Red', value: 'text-red-600' },
  { name: '紫色', nameEn: 'Purple', value: 'text-purple-600' }
];

const TextStyleControls = ({ textSettings, onTextSettingsChange }) => {
  const [activeTab, setActiveTab] = useState('font');
  const [showTitleColorPicker, setShowTitleColorPicker] = useState(false);
  const [showTaglineColorPicker, setShowTaglineColorPicker] = useState(false);
  const [customTitleColor, setCustomTitleColor] = useState('#000000');
  const [customTaglineColor, setCustomTaglineColor] = useState('#666666');
  const { i18n } = useTranslation();

  const handleChange = (name, value) => {
    onTextSettingsChange(name, value);
  };

  const toggleSetting = (name) => {
    onTextSettingsChange(name, !textSettings[name]);
  };

  // 处理自定义颜色
  const handleCustomTitleColorChange = (color) => {
    setCustomTitleColor(color);
    onTextSettingsChange('customTitleColor', color);
    onTextSettingsChange('titleColor', '');
  };

  const handleCustomTaglineColorChange = (color) => {
    setCustomTaglineColor(color);
    onTextSettingsChange('customTaglineColor', color);
    onTextSettingsChange('taglineColor', '');
  };

  return (
    <div className="space-y-5">
      {/* 选项卡 */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        <button 
          className={`flex flex-col items-center justify-center p-3 rounded-lg transition-all ${
            activeTab === 'font' 
              ? 'bg-gradient-to-br from-primary/20 to-primary/10 shadow-md border border-primary/20' 
              : 'bg-gray-100 hover:bg-gray-200 border border-gray-200'
          }`}
          onClick={() => setActiveTab('font')}
        >
          <FontAwesomeIcon 
            icon={faFont} 
            className={`text-xl mb-2 ${activeTab === 'font' ? 'text-primary' : 'text-gray-600'}`} 
          />
          <span className={`text-sm font-medium ${activeTab === 'font' ? 'text-primary' : 'text-gray-700'}`}>
            {i18n.language === 'zh' ? '字体' : 'Font'}
          </span>
        </button>
        <button 
          className={`flex flex-col items-center justify-center p-3 rounded-lg transition-all ${
            activeTab === 'size' 
              ? 'bg-gradient-to-br from-primary/20 to-primary/10 shadow-md border border-primary/20' 
              : 'bg-gray-100 hover:bg-gray-200 border border-gray-200'
          }`}
          onClick={() => setActiveTab('size')}
        >
          <FontAwesomeIcon 
            icon={faTextHeight} 
            className={`text-xl mb-2 ${activeTab === 'size' ? 'text-primary' : 'text-gray-600'}`} 
          />
          <span className={`text-sm font-medium ${activeTab === 'size' ? 'text-primary' : 'text-gray-700'}`}>
            {i18n.language === 'zh' ? '大小' : 'Size'}
          </span>
        </button>
        <button 
          className={`flex flex-col items-center justify-center p-3 rounded-lg transition-all ${
            activeTab === 'color' 
              ? 'bg-gradient-to-br from-primary/20 to-primary/10 shadow-md border border-primary/20' 
              : 'bg-gray-100 hover:bg-gray-200 border border-gray-200'
          }`}
          onClick={() => setActiveTab('color')}
        >
          <FontAwesomeIcon 
            icon={faPalette} 
            className={`text-xl mb-2 ${activeTab === 'color' ? 'text-primary' : 'text-gray-600'}`} 
          />
          <span className={`text-sm font-medium ${activeTab === 'color' ? 'text-primary' : 'text-gray-700'}`}>
            {i18n.language === 'zh' ? '颜色' : 'Color'}
          </span>
        </button>
      </div>

      {/* 字体选项 */}
      {activeTab === 'font' && (
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h3 className="text-sm font-medium text-gray-700 mb-3">
              {i18n.language === 'zh' ? '字体类型' : 'Font Type'}
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {FONT_PRESETS.map(font => (
                <button
                  key={font.value}
                  className={`px-3 py-2.5 rounded-lg flex items-center justify-center transition-all ${
                    textSettings.fontFamily === font.value 
                      ? 'bg-primary text-white shadow-sm' 
                      : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                  }`}
                  onClick={() => handleChange('fontFamily', font.value)}
                >
                  {i18n.language === 'zh' ? font.name : font.nameEn}
                </button>
              ))}
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h3 className="text-sm font-medium text-gray-700 mb-3">
              {i18n.language === 'zh' ? '文字样式' : 'Text Style'}
            </h3>
            <div className="flex gap-3">
              <button
                className={`flex-1 py-2.5 rounded-lg flex items-center justify-center transition-all ${
                  textSettings.bold 
                    ? 'bg-primary text-white shadow-sm' 
                    : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                }`}
                onClick={() => toggleSetting('bold')}
              >
                <FontAwesomeIcon icon={faBold} className="mr-2" />
                <span>{i18n.language === 'zh' ? '粗体' : 'Bold'}</span>
              </button>
              <button
                className={`flex-1 py-2.5 rounded-lg flex items-center justify-center transition-all ${
                  textSettings.italic 
                    ? 'bg-primary text-white shadow-sm' 
                    : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                }`}
                onClick={() => toggleSetting('italic')}
              >
                <FontAwesomeIcon icon={faItalic} className="mr-2" />
                <span>{i18n.language === 'zh' ? '斜体' : 'Italic'}</span>
              </button>
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h3 className="text-sm font-medium text-gray-700 mb-3">
              {i18n.language === 'zh' ? '文本对齐' : 'Text Alignment'}
            </h3>
            <div className="grid grid-cols-3 gap-3">
              <button
                className={`py-2.5 rounded-lg flex items-center justify-center transition-all ${
                  textSettings.align === 'text-left' 
                    ? 'bg-primary text-white shadow-sm' 
                    : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                }`}
                onClick={() => handleChange('align', 'text-left')}
              >
                <FontAwesomeIcon icon={faAlignLeft} className="mr-2" />
                <span>{i18n.language === 'zh' ? '左' : 'Left'}</span>
              </button>
              <button
                className={`py-2.5 rounded-lg flex items-center justify-center transition-all ${
                  textSettings.align === 'text-center' 
                    ? 'bg-primary text-white shadow-sm' 
                    : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                }`}
                onClick={() => handleChange('align', 'text-center')}
              >
                <FontAwesomeIcon icon={faAlignCenter} className="mr-2" />
                <span>{i18n.language === 'zh' ? '中' : 'Center'}</span>
              </button>
              <button
                className={`py-2.5 rounded-lg flex items-center justify-center transition-all ${
                  textSettings.align === 'text-right' 
                    ? 'bg-primary text-white shadow-sm' 
                    : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                }`}
                onClick={() => handleChange('align', 'text-right')}
              >
                <FontAwesomeIcon icon={faAlignRight} className="mr-2" />
                <span>{i18n.language === 'zh' ? '右' : 'Right'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 大小选项 */}
      {activeTab === 'size' && (
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h3 className="text-sm font-medium text-gray-700 mb-3">
              {i18n.language === 'zh' ? '标题大小' : 'Title Size'}
            </h3>
            <div className="grid grid-cols-3 gap-2">
              {SIZE_PRESETS.map(size => (
                <button
                  key={size.value}
                  className={`px-3 py-2.5 rounded-lg flex items-center justify-center transition-all ${
                    textSettings.titleSize === size.value 
                      ? 'bg-primary text-white shadow-sm' 
                      : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                  }`}
                  onClick={() => handleChange('titleSize', size.value)}
                >
                  {i18n.language === 'zh' ? size.name : size.nameEn}
                </button>
              ))}
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h3 className="text-sm font-medium text-gray-700 mb-3">
              {i18n.language === 'zh' ? '标语大小' : 'Tagline Size'}
            </h3>
            <div className="grid grid-cols-3 gap-2">
              {SIZE_PRESETS.map(size => (
                <button
                  key={size.value}
                  className={`px-3 py-2.5 rounded-lg flex items-center justify-center transition-all ${
                    textSettings.taglineSize === size.value 
                      ? 'bg-primary text-white shadow-sm' 
                      : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                  }`}
                  onClick={() => handleChange('taglineSize', size.value)}
                >
                  {i18n.language === 'zh' ? size.name : size.nameEn}
                </button>
              ))}
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h3 className="text-sm font-medium text-gray-700 mb-3">
              {i18n.language === 'zh' ? '字间距' : 'Letter Spacing'}
            </h3>
            <input 
              type="range" 
              min="0" 
              max="4" 
              step="1"
              value={textSettings.letterSpacing || 2}
              onChange={(e) => handleChange('letterSpacing', parseInt(e.target.value))}
              className="range range-sm range-primary w-full"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-2">
              <span>{i18n.language === 'zh' ? '紧凑' : 'Tight'}</span>
              <span>{i18n.language === 'zh' ? '正常' : 'Normal'}</span>
              <span>{i18n.language === 'zh' ? '宽松' : 'Wide'}</span>
            </div>
          </div>
        </div>
      )}

      {/* 颜色选项 */}
      {activeTab === 'color' && (
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h3 className="text-sm font-medium text-gray-700 mb-3">
              {i18n.language === 'zh' ? '标题颜色' : 'Title Color'}
            </h3>
            <div className="grid grid-cols-5 gap-2">
              {COLOR_PRESETS.map(color => (
                <button
                  key={color.value}
                  className={`h-10 rounded-lg border transition-all ${
                    textSettings.titleColor === color.value 
                      ? 'ring-2 ring-primary shadow-sm scale-105' 
                      : 'border-gray-300 hover:shadow-sm'
                  }`}
                  onClick={() => {
                    handleChange('titleColor', color.value);
                    handleChange('customTitleColor', '');
                  }}
                >
                  <div className={`w-full h-full flex items-center justify-center ${color.value}`}>
                    <span className="text-sm font-medium">A</span>
                  </div>
                </button>
              ))}
            </div>
            
            {/* 自定义颜色按钮 */}
            <div className="mt-3 flex items-center gap-2">
              <button
                className={`h-10 w-10 rounded-lg border flex items-center justify-center transition-all ${
                  !textSettings.titleColor 
                    ? 'ring-2 ring-primary shadow-sm' 
                    : 'border-gray-300'
                }`}
                style={{ backgroundColor: textSettings.customTitleColor || customTitleColor }}
                onClick={() => setShowTitleColorPicker(!showTitleColorPicker)}
              >
                <span className="text-sm font-medium" style={{ color: getContrastColor(textSettings.customTitleColor || customTitleColor) }}>A</span>
              </button>
              <span className="text-sm">{i18n.language === 'zh' ? '自定义颜色' : 'Custom Color'}</span>
            </div>
            
            {/* 颜色选择器 */}
            {showTitleColorPicker && (
              <div className="mt-3 p-3 rounded-lg bg-white shadow-md border border-gray-200">
                <HexColorPicker 
                  color={textSettings.customTitleColor || customTitleColor} 
                  onChange={handleCustomTitleColorChange}
                />
                <div className="mt-3 flex justify-between items-center">
                  <input 
                    type="text" 
                    value={textSettings.customTitleColor || customTitleColor}
                    onChange={(e) => handleCustomTitleColorChange(e.target.value)}
                    className="input input-bordered input-sm w-24"
                  />
                  <button 
                    className="btn btn-sm btn-outline"
                    onClick={() => setShowTitleColorPicker(false)}
                  >
                    {i18n.language === 'zh' ? '关闭' : 'Close'}
                  </button>
                </div>
              </div>
            )}
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h3 className="text-sm font-medium text-gray-700 mb-3">
              {i18n.language === 'zh' ? '标语颜色' : 'Tagline Color'}
            </h3>
            <div className="grid grid-cols-5 gap-2">
              {COLOR_PRESETS.map(color => (
                <button
                  key={color.value}
                  className={`h-10 rounded-lg border transition-all ${
                    textSettings.taglineColor === color.value 
                      ? 'ring-2 ring-primary shadow-sm scale-105' 
                      : 'border-gray-300 hover:shadow-sm'
                  }`}
                  onClick={() => {
                    handleChange('taglineColor', color.value);
                    handleChange('customTaglineColor', '');
                  }}
                >
                  <div className={`w-full h-full flex items-center justify-center ${color.value}`}>
                    <span className="text-sm font-medium">A</span>
                  </div>
                </button>
              ))}
            </div>
            
            {/* 自定义颜色按钮 */}
            <div className="mt-3 flex items-center gap-2">
              <button
                className={`h-10 w-10 rounded-lg border flex items-center justify-center transition-all ${
                  !textSettings.taglineColor 
                    ? 'ring-2 ring-primary shadow-sm' 
                    : 'border-gray-300'
                }`}
                style={{ backgroundColor: textSettings.customTaglineColor || customTaglineColor }}
                onClick={() => setShowTaglineColorPicker(!showTaglineColorPicker)}
              >
                <span className="text-sm font-medium" style={{ color: getContrastColor(textSettings.customTaglineColor || customTaglineColor) }}>A</span>
              </button>
              <span className="text-sm">{i18n.language === 'zh' ? '自定义颜色' : 'Custom Color'}</span>
            </div>
            
            {/* 颜色选择器 */}
            {showTaglineColorPicker && (
              <div className="mt-3 p-3 rounded-lg bg-white shadow-md border border-gray-200">
                <HexColorPicker 
                  color={textSettings.customTaglineColor || customTaglineColor} 
                  onChange={handleCustomTaglineColorChange}
                />
                <div className="mt-3 flex justify-between items-center">
                  <input 
                    type="text" 
                    value={textSettings.customTaglineColor || customTaglineColor}
                    onChange={(e) => handleCustomTaglineColorChange(e.target.value)}
                    className="input input-bordered input-sm w-24"
                  />
                  <button 
                    className="btn btn-sm btn-outline"
                    onClick={() => setShowTaglineColorPicker(false)}
                  >
                    {i18n.language === 'zh' ? '关闭' : 'Close'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// 辅助函数：根据背景色计算对比色（黑或白）
function getContrastColor(hexColor) {
  // 确保颜色格式正确
  if (!hexColor || hexColor.length < 7) return '#000000';
  
  // 将十六进制颜色转换为RGB
  const r = parseInt(hexColor.slice(1, 3), 16);
  const g = parseInt(hexColor.slice(3, 5), 16);
  const b = parseInt(hexColor.slice(5, 7), 16);
  
  // 计算亮度
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  
  // 如果亮度高于阈值，返回黑色，否则返回白色
  return brightness > 128 ? '#000000' : '#ffffff';
}

export default TextStyleControls; 