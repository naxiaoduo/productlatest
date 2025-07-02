import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPalette, faCrop, faImage, faLayerGroup, faWindowMaximize, faSquare, faAdjust, faThLarge, faShadowAlt } from '@fortawesome/free-solid-svg-icons';
import { HexColorPicker } from 'react-colorful';
import { useTranslation } from 'react-i18next';

// 预设颜色
const COLOR_PRESETS = [
  { name: '白色', nameEn: 'White', value: '#ffffff' },
  { name: '浅灰', nameEn: 'Light Gray', value: '#f5f5f5' },
  { name: '卡其', nameEn: 'Khaki', value: '#f0e6d2' },
  { name: '薄荷', nameEn: 'Mint', value: '#e0f5e9' },
  { name: '天蓝', nameEn: 'Sky Blue', value: '#e3f2fd' },
  { name: '淡紫', nameEn: 'Lavender', value: '#f3e5f5' },
  { name: '粉红', nameEn: 'Pink', value: '#fce4ec' },
  { name: '米黄', nameEn: 'Beige', value: '#fff8e1' },
  { name: '浅青', nameEn: 'Light Cyan', value: '#e0f7fa' },
  { name: '浅绿', nameEn: 'Light Green', value: '#e8f5e9' },
  { name: '浅橙', nameEn: 'Light Orange', value: '#fff3e0' },
  { name: '浅蓝', nameEn: 'Light Blue', value: '#e1f5fe' }
];

// 渐变预设
const GRADIENT_PRESETS = [
  { name: '灰白', nameEn: 'Gray-White', value: 'bg-gradient-to-br from-white to-gray-200' },
  { name: '蓝紫', nameEn: 'Blue-Purple', value: 'bg-gradient-to-r from-blue-100 to-purple-100' },
  { name: '粉橙', nameEn: 'Pink-Orange', value: 'bg-gradient-to-r from-pink-100 to-orange-100' },
  { name: '绿青', nameEn: 'Green-Teal', value: 'bg-gradient-to-r from-green-100 to-teal-100' },
  { name: '暖橙', nameEn: 'Warm Orange', value: 'bg-gradient-to-r from-yellow-100 to-orange-100' },
  { name: 'PH橙', nameEn: 'PH Orange', value: 'bg-gradient-to-r from-white to-ph-orange/10' },
  { name: '青蓝', nameEn: 'Cyan-Blue', value: 'bg-gradient-to-br from-cyan-100 to-blue-100' },
  { name: '紫粉', nameEn: 'Violet-Pink', value: 'bg-gradient-to-br from-violet-100 to-pink-100' },
  { name: '绿黄', nameEn: 'Green-Yellow', value: 'bg-gradient-to-br from-lime-100 to-yellow-100' },
  { name: '蓝绿', nameEn: 'Blue-Green', value: 'bg-gradient-to-br from-blue-100 to-emerald-100' },
  { name: '粉红渐变', nameEn: 'Pink Gradient', value: 'bg-gradient-to-r from-pink-300 to-red-200' },
  { name: '紫蓝', nameEn: 'Purple-Blue', value: 'bg-gradient-to-r from-indigo-200 to-blue-300' },
  { name: '薄荷绿', nameEn: 'Mint Green', value: 'bg-gradient-to-r from-green-200 to-teal-300' },
  { name: '日落橙', nameEn: 'Sunset Orange', value: 'bg-gradient-to-r from-yellow-200 to-orange-300' },
  { name: '海洋蓝', nameEn: 'Ocean Blue', value: 'bg-gradient-to-r from-blue-200 to-cyan-300' },
  { name: '浅紫粉', nameEn: 'Light Purple-Pink', value: 'bg-gradient-to-br from-purple-100 to-pink-200' }
];

// 预设模板
const TEMPLATE_PRESETS = [
  { 
    name: '简约', 
    nameEn: 'Minimal',
    icon: 'minimal',
    settings: {
      theme: 'light',
      backgroundColor: '#ffffff',
      backgroundType: 'solid',
      gradientValue: 'bg-gradient-to-br from-white to-gray-100',
      frameStyle: 'clean',
      showLogo: true,
      showTagline: true,
      shadow: 'none',
      aspectRatio: '16:9',
      watermark: true,
      showVotes: true,
      showComments: true,
      textSettings: {
        titleColor: 'text-gray-900',
        taglineColor: 'text-gray-600',
        fontFamily: 'font-sans',
        titleSize: 'text-2xl',
        taglineSize: 'text-base',
        bold: true,
        italic: false,
        align: 'text-left'
      }
    }
  },
  { 
    name: '专业', 
    nameEn: 'Professional',
    icon: 'professional',
    settings: {
      theme: 'light',
      backgroundColor: '#f0f4f8',
      backgroundType: 'gradient',
      gradientValue: 'bg-gradient-to-br from-blue-50 to-gray-100',
      frameStyle: 'minimal',
      showLogo: true,
      showTagline: true,
      shadow: 'md',
      aspectRatio: '16:9',
      watermark: true,
      showVotes: true,
      showComments: true,
      textSettings: {
        titleColor: 'text-blue-900',
        taglineColor: 'text-blue-700',
        fontFamily: 'font-serif',
        titleSize: 'text-2xl',
        taglineSize: 'text-base',
        bold: true,
        italic: false,
        align: 'text-left'
      }
    }
  },
  { 
    name: '创意', 
    nameEn: 'Creative',
    icon: 'creative',
    settings: {
      theme: 'light',
      backgroundColor: '#ffffff',
      backgroundType: 'gradient',
      gradientValue: 'bg-gradient-to-r from-pink-100 to-orange-100',
      frameStyle: 'rounded',
      showLogo: true,
      showTagline: true,
      shadow: 'lg',
      aspectRatio: '4:3',
      watermark: true,
      showVotes: true,
      showComments: true,
      textSettings: {
        titleColor: 'text-pink-800',
        taglineColor: 'text-orange-700',
        fontFamily: 'font-sans',
        titleSize: 'text-2xl',
        taglineSize: 'text-base',
        bold: true,
        italic: false,
        align: 'text-left'
      }
    }
  },
  { 
    name: '现代', 
    nameEn: 'Modern',
    icon: 'modern',
    settings: {
      theme: 'light',
      backgroundColor: '#ffffff',
      backgroundType: 'gradient',
      gradientValue: 'bg-gradient-to-br from-cyan-100 to-blue-100',
      frameStyle: 'glassmorphic',
      showLogo: true,
      showTagline: true,
      shadow: 'sm',
      aspectRatio: '16:9',
      watermark: true,
      showVotes: true,
      showComments: true,
      textSettings: {
        titleColor: 'text-cyan-900',
        taglineColor: 'text-blue-700',
        fontFamily: 'font-sans',
        titleSize: 'text-2xl',
        taglineSize: 'text-base',
        bold: true,
        italic: false,
        align: 'text-left'
      }
    }
  },
  { 
    name: '复古', 
    nameEn: 'Retro',
    icon: 'retro',
    settings: {
      theme: 'light',
      backgroundColor: '#fff8e1',
      backgroundType: 'solid',
      gradientValue: 'bg-gradient-to-br from-amber-50 to-amber-100',
      frameStyle: 'retro',
      showLogo: true,
      showTagline: true,
      shadow: 'md',
      aspectRatio: '4:3',
      watermark: true,
      showVotes: true,
      showComments: true,
      textSettings: {
        titleColor: 'text-amber-900',
        taglineColor: 'text-amber-800',
        fontFamily: 'font-serif',
        titleSize: 'text-2xl',
        taglineSize: 'text-base',
        bold: true,
        italic: false,
        align: 'text-left'
      }
    }
  },
  { 
    name: '暗黑', 
    nameEn: 'Dark',
    icon: 'dark',
    settings: {
      theme: 'dark',
      backgroundColor: '#1f2937',
      backgroundType: 'gradient',
      gradientValue: 'bg-gradient-to-br from-gray-800 to-gray-700',
      frameStyle: 'minimal',
      showLogo: true,
      showTagline: true,
      shadow: 'lg',
      aspectRatio: '16:9',
      watermark: true,
      showVotes: true,
      showComments: true,
      textSettings: {
        titleColor: 'text-white',
        taglineColor: 'text-white',
        fontFamily: 'font-sans',
        titleSize: 'text-2xl',
        taglineSize: 'text-base',
        bold: true,
        italic: false,
        align: 'text-left'
      }
    }
  },
  { 
    name: '极简粉橙', 
    nameEn: 'Pink Minimal',
    icon: 'minimal-gradient',
    settings: {
      theme: 'light',
      backgroundColor: '#ffffff',
      backgroundType: 'gradient',
      gradientValue: 'bg-gradient-to-r from-pink-100 to-orange-100',
      frameStyle: 'minimal',
      showLogo: true,
      showTagline: true,
      shadow: 'lg',
      aspectRatio: '16:9',
      watermark: true,
      showVotes: true,
      showComments: true,
      textSettings: {
        titleColor: 'text-pink-900',
        taglineColor: 'text-orange-800',
        fontFamily: 'font-sans',
        titleSize: 'text-2xl',
        taglineSize: 'text-base',
        bold: true,
        italic: false,
        align: 'text-left'
      }
    }
  },
  { 
    name: '科技蓝', 
    nameEn: 'Tech Blue',
    icon: 'tech-blue',
    settings: {
      theme: 'light',
      backgroundColor: '#f0f9ff',
      backgroundType: 'gradient',
      gradientValue: 'bg-gradient-to-r from-blue-200 to-cyan-300',
      frameStyle: 'glassmorphic',
      showLogo: true,
      showTagline: true,
      shadow: 'md',
      aspectRatio: '16:9',
      watermark: true,
      showVotes: true,
      showComments: true,
      textSettings: {
        titleColor: 'text-blue-900',
        taglineColor: 'text-blue-800',
        fontFamily: 'font-sans',
        titleSize: 'text-2xl',
        taglineSize: 'text-base',
        bold: true,
        italic: false,
        align: 'text-left'
      }
    }
  },
  { 
    name: '自然绿', 
    nameEn: 'Natural Green',
    icon: 'nature-green',
    settings: {
      theme: 'light',
      backgroundColor: '#f0fdf4',
      backgroundType: 'gradient',
      gradientValue: 'bg-gradient-to-r from-green-200 to-teal-300',
      frameStyle: 'minimal',
      showLogo: true,
      showTagline: true,
      shadow: 'sm',
      aspectRatio: '16:9',
      watermark: true,
      showVotes: true,
      showComments: true,
      textSettings: {
        titleColor: 'text-green-900',
        taglineColor: 'text-green-800',
        fontFamily: 'font-sans',
        titleSize: 'text-2xl',
        taglineSize: 'text-base',
        bold: true,
        italic: false,
        align: 'text-left'
      }
    }
  },
  { 
    name: '紫罗兰', 
    nameEn: 'Violet',
    icon: 'violet',
    settings: {
      theme: 'light',
      backgroundColor: '#faf5ff',
      backgroundType: 'gradient',
      gradientValue: 'bg-gradient-to-br from-purple-100 to-pink-200',
      frameStyle: 'rounded',
      showLogo: true,
      showTagline: true,
      shadow: 'md',
      aspectRatio: '16:9',
      watermark: true,
      showVotes: true,
      showComments: true,
      textSettings: {
        titleColor: 'text-purple-900',
        taglineColor: 'text-purple-700',
        fontFamily: 'font-sans',
        titleSize: 'text-2xl',
        taglineSize: 'text-base',
        bold: true,
        italic: false,
        align: 'text-left'
      }
    }
  },
  { 
    name: '商务灰', 
    nameEn: 'Business Gray',
    icon: 'business-gray',
    settings: {
      theme: 'light',
      backgroundColor: '#f9fafb',
      backgroundType: 'solid',
      gradientValue: 'bg-gradient-to-br from-gray-50 to-gray-200',
      frameStyle: 'shadow',
      showLogo: true,
      showTagline: true,
      shadow: 'md',
      aspectRatio: '16:9',
      watermark: true,
      showVotes: true,
      showComments: true,
      textSettings: {
        titleColor: 'text-gray-800',
        taglineColor: 'text-gray-600',
        fontFamily: 'font-serif',
        titleSize: 'text-2xl',
        taglineSize: 'text-base',
        bold: true,
        italic: false,
        align: 'text-left'
      }
    }
  },
  { 
    name: '日落橙', 
    nameEn: 'Sunset Orange',
    icon: 'sunset-orange',
    settings: {
      theme: 'light',
      backgroundColor: '#fff7ed',
      backgroundType: 'gradient',
      gradientValue: 'bg-gradient-to-r from-yellow-200 to-orange-300',
      frameStyle: 'clean',
      showLogo: true,
      showTagline: true,
      shadow: 'lg',
      aspectRatio: '16:9',
      watermark: true,
      showVotes: true,
      showComments: true,
      textSettings: {
        titleColor: 'text-orange-900',
        taglineColor: 'text-orange-800',
        fontFamily: 'font-sans',
        titleSize: 'text-2xl',
        taglineSize: 'text-base',
        bold: true,
        italic: false,
        align: 'text-left'
      }
    }
  }
];

const CardControls = ({ settings, onSettingsChange }) => {
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [activeSection, setActiveSection] = useState('templates');
  const { i18n } = useTranslation();
  
  const handleChange = (name, value) => {
    onSettingsChange(name, value);
  };

  const applyTemplate = (template) => {
    // 应用模板中的所有设置
    Object.entries(template.settings).forEach(([key, value]) => {
      onSettingsChange(key, value);
    });
  };
  
  const frameOptions = [
    { value: 'clean', label: '简洁', labelEn: 'Clean' },
    { value: 'window', label: '窗口', labelEn: 'Window' },
    { value: 'retro', label: '复古', labelEn: 'Retro' },
    { value: 'minimal', label: '极简', labelEn: 'Minimal' },
    { value: 'shadow', label: '阴影', labelEn: 'Shadow' },
    { value: 'rounded', label: '圆角', labelEn: 'Rounded' },
    { value: 'glassmorphic', label: '玻璃态', labelEn: 'Glassmorphic' }
  ];
  
  const backgroundOptions = [
    { value: 'solid', label: '纯色', labelEn: 'Solid' },
    { value: 'gradient', label: '渐变', labelEn: 'Gradient' },
    { value: 'dotted', label: '点状', labelEn: 'Dotted' },
    { value: 'striped', label: '条纹', labelEn: 'Striped' }
  ];
  
  const aspectRatioOptions = [
    { value: '16:9', label: '16:9', labelEn: '16:9', icon: faWindowMaximize },
    { value: '4:3', label: '4:3', labelEn: '4:3', icon: faWindowMaximize },
    { value: '1:1', label: '1:1', labelEn: '1:1', icon: faSquare },
    { value: '3:4', label: '3:4', labelEn: '3:4', icon: faWindowMaximize },
    { value: '9:16', label: '9:16', labelEn: '9:16', icon: faWindowMaximize },
    { value: '2:1', label: '2:1', labelEn: '2:1', icon: faWindowMaximize }
  ];
  
  const shadowOptions = [
    { value: 'none', label: '无', labelEn: 'None' },
    { value: 'sm', label: '小', labelEn: 'Small' },
    { value: 'md', label: '中', labelEn: 'Medium' },
    { value: 'lg', label: '大', labelEn: 'Large' },
    { value: 'inner', label: '内阴影', labelEn: 'Inner' }
  ];

  // 渲染选项卡
  const renderTabs = () => (
    <div className="grid grid-cols-3 gap-3 mb-6">
      <button 
        className={`flex flex-col items-center justify-center p-3 rounded-lg transition-all ${
          activeSection === 'templates' 
            ? 'bg-gradient-to-br from-primary/20 to-primary/10 shadow-md border border-primary/20' 
            : 'bg-gray-100 hover:bg-gray-200 border border-gray-200'
        }`}
        onClick={() => setActiveSection('templates')}
      >
        <FontAwesomeIcon 
          icon={faThLarge} 
          className={`text-xl mb-2 ${activeSection === 'templates' ? 'text-primary' : 'text-gray-600'}`} 
        />
        <span className={`text-sm font-medium ${activeSection === 'templates' ? 'text-primary' : 'text-gray-700'}`}>
          {i18n.language === 'zh' ? '模板' : 'Templates'}
        </span>
      </button>
      <button 
        className={`flex flex-col items-center justify-center p-3 rounded-lg transition-all ${
          activeSection === 'background' 
            ? 'bg-gradient-to-br from-primary/20 to-primary/10 shadow-md border border-primary/20' 
            : 'bg-gray-100 hover:bg-gray-200 border border-gray-200'
        }`}
        onClick={() => setActiveSection('background')}
      >
        <FontAwesomeIcon 
          icon={faPalette} 
          className={`text-xl mb-2 ${activeSection === 'background' ? 'text-primary' : 'text-gray-600'}`} 
        />
        <span className={`text-sm font-medium ${activeSection === 'background' ? 'text-primary' : 'text-gray-700'}`}>
          {i18n.language === 'zh' ? '背景' : 'Background'}
        </span>
      </button>
      <button 
        className={`flex flex-col items-center justify-center p-3 rounded-lg transition-all ${
          activeSection === 'frame' 
            ? 'bg-gradient-to-br from-primary/20 to-primary/10 shadow-md border border-primary/20' 
            : 'bg-gray-100 hover:bg-gray-200 border border-gray-200'
        }`}
        onClick={() => setActiveSection('frame')}
      >
        <FontAwesomeIcon 
          icon={faLayerGroup} 
          className={`text-xl mb-2 ${activeSection === 'frame' ? 'text-primary' : 'text-gray-600'}`} 
        />
        <span className={`text-sm font-medium ${activeSection === 'frame' ? 'text-primary' : 'text-gray-700'}`}>
          {i18n.language === 'zh' ? '框架' : 'Frame'}
        </span>
      </button>
    </div>
  );

  // 渲染预设模板
  const renderTemplates = () => (
    <div className="space-y-5">
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
        <h3 className="text-sm font-medium text-gray-700 mb-3">
          {i18n.language === 'zh' ? '预设模板' : 'Template Presets'}
        </h3>
        <div className="grid grid-cols-2 gap-3 max-h-96 overflow-y-auto pr-1">
          {TEMPLATE_PRESETS.map(template => (
            <button
              key={template.name}
              className="group relative bg-white rounded-lg shadow-sm border border-gray-200 hover:border-primary hover:shadow-md transition-all overflow-hidden"
              onClick={() => applyTemplate(template)}
            >
              <div 
                className={`w-full h-24 ${template.settings.backgroundType === 'gradient' ? template.settings.gradientValue : ''}`}
                style={{backgroundColor: template.settings.backgroundType === 'solid' ? template.settings.backgroundColor : undefined}}
              >
              </div>
              <div className="w-full p-2 bg-white text-center border-t border-gray-100">
                <span className="text-sm font-medium group-hover:text-primary transition-colors">
                  {i18n.language === 'zh' ? template.name : template.nameEn}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  // 渲染背景设置
  const renderBackgroundSettings = () => (
    <div className="space-y-5">
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
        <h3 className="text-sm font-medium text-gray-700 mb-3">
          {i18n.language === 'zh' ? '背景类型' : 'Background Type'}
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {backgroundOptions.map(option => (
            <button
              key={option.value}
              className={`px-3 py-2.5 rounded-lg flex items-center justify-center transition-all ${
                settings.backgroundType === option.value 
                  ? 'bg-primary text-white shadow-sm' 
                  : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
              }`}
              onClick={() => handleChange('backgroundType', option.value)}
            >
              {i18n.language === 'zh' ? option.label : option.labelEn}
            </button>
          ))}
        </div>
      </div>
      
      {/* 背景颜色 - 仅在纯色模式下显示 */}
      {settings.backgroundType === 'solid' && (
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <h3 className="text-sm font-medium text-gray-700 mb-3">
            {i18n.language === 'zh' ? '背景颜色' : 'Background Color'}
          </h3>
          <div className="relative">
            <button 
              className="w-full h-12 rounded-lg border border-gray-300 flex items-center justify-center shadow-sm"
              style={{ backgroundColor: settings.backgroundColor }}
              onClick={() => setShowColorPicker(!showColorPicker)}
            >
              <span className="text-sm font-medium" style={{ color: getContrastColor(settings.backgroundColor) }}>
                {settings.backgroundColor}
              </span>
            </button>
            {showColorPicker && (
              <div className="absolute z-10 mt-2 bg-white p-3 rounded-lg shadow-lg border border-gray-200">
                <HexColorPicker 
                  color={settings.backgroundColor} 
                  onChange={color => handleChange('backgroundColor', color)} 
                />
                <div className="mt-3 flex justify-between items-center">
                  <input 
                    type="text" 
                    value={settings.backgroundColor}
                    onChange={(e) => handleChange('backgroundColor', e.target.value)}
                    className="input input-bordered input-sm w-24"
                  />
                  <button 
                    className="btn btn-sm btn-outline"
                    onClick={() => setShowColorPicker(false)}
                  >
                    {i18n.language === 'zh' ? '关闭' : 'Close'}
                  </button>
                </div>
              </div>
            )}
          </div>
          
          {/* 颜色预设 */}
          <div className="mt-4">
            <h4 className="text-xs font-medium text-gray-600 mb-2">
              {i18n.language === 'zh' ? '预设颜色' : 'Preset Colors'}
            </h4>
            <div className="grid grid-cols-4 gap-2">
              {COLOR_PRESETS.map(color => (
                <button
                  key={color.value}
                  className={`w-full h-10 rounded-md transition-all ${
                    settings.backgroundColor === color.value 
                      ? 'ring-2 ring-primary shadow-sm scale-105' 
                      : 'border border-gray-300 hover:shadow-sm'
                  }`}
                  style={{ backgroundColor: color.value }}
                  onClick={() => handleChange('backgroundColor', color.value)}
                  title={i18n.language === 'zh' ? color.name : color.nameEn}
                ></button>
              ))}
            </div>
          </div>
        </div>
      )}
      
      {/* 渐变预设 - 仅在渐变模式下显示 */}
      {settings.backgroundType === 'gradient' && (
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <h3 className="text-sm font-medium text-gray-700 mb-3">
            {i18n.language === 'zh' ? '渐变预设' : 'Gradient Presets'}
          </h3>
          <div className="grid grid-cols-1 gap-3 max-h-80 overflow-y-auto pr-1">
            {GRADIENT_PRESETS.map(gradient => (
              <button
                key={gradient.value}
                className={`h-12 rounded-lg border flex items-center justify-center transition-all ${
                  settings.gradientValue === gradient.value 
                    ? 'ring-2 ring-primary shadow-sm' 
                    : 'border-gray-300 hover:shadow-sm'
                } ${gradient.value}`}
                onClick={() => handleChange('gradientValue', gradient.value)}
                title={i18n.language === 'zh' ? gradient.name : gradient.nameEn}
              >
                <span className="text-sm font-medium">{i18n.language === 'zh' ? gradient.name : gradient.nameEn}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  // 渲染框架设置
  const renderFrameSettings = () => (
    <div className="space-y-6">
      {/* 框架样式 */}
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
        <h3 className="text-sm font-medium text-gray-700 mb-3">
          {i18n.language === 'zh' ? '框架样式' : 'Frame Style'}
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {frameOptions.map(option => (
            <button
              key={option.value}
              className={`px-3 py-2.5 rounded-lg flex items-center justify-center transition-all ${
                settings.frameStyle === option.value 
                  ? 'bg-primary text-white shadow-sm' 
                  : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
              }`}
              onClick={() => handleChange('frameStyle', option.value)}
            >
              <span className="text-sm">{i18n.language === 'zh' ? option.label : option.labelEn}</span>
            </button>
          ))}
        </div>
      </div>
      
      {/* 阴影效果 */}
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
        <h3 className="text-sm font-medium text-gray-700 mb-3">
          {i18n.language === 'zh' ? '阴影效果' : 'Shadow Effect'}
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {shadowOptions.map(option => (
            <button
              key={option.value}
              className={`px-3 py-2.5 rounded-lg flex items-center justify-center transition-all ${
                settings.shadow === option.value 
                  ? 'bg-primary text-white shadow-sm' 
                  : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
              }`}
              onClick={() => handleChange('shadow', option.value)}
            >
              <span className="text-sm">{i18n.language === 'zh' ? option.label : option.labelEn}</span>
            </button>
          ))}
        </div>
      </div>
      
      {/* 比例 */}
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
        <h3 className="text-sm font-medium text-gray-700 mb-3">
          {i18n.language === 'zh' ? '比例' : 'Aspect Ratio'}
        </h3>
        <div className="grid grid-cols-3 gap-3">
          {aspectRatioOptions.map(option => (
            <button
              key={option.value}
              className={`flex flex-col items-center justify-center p-3 rounded-lg transition-all ${
                settings.aspectRatio === option.value 
                  ? 'bg-primary text-white shadow-sm' 
                  : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
              }`}
              onClick={() => handleChange('aspectRatio', option.value)}
            >
              <FontAwesomeIcon 
                icon={option.icon} 
                className={`text-2xl mb-2 ${option.value === '9:16' || option.value === '3:4' ? 'transform rotate-90' : ''}`} 
              />
              <span className="text-sm">{option.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-5">
      {renderTabs()}
      
      <div className="overflow-y-auto pr-2 pb-4" style={{ maxHeight: 'calc(100vh - 240px)' }}>
        {activeSection === 'templates' && renderTemplates()}
        {activeSection === 'background' && renderBackgroundSettings()}
        {activeSection === 'frame' && renderFrameSettings()}
      </div>
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

export default CardControls; 