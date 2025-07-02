import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink, faEdit, faDownload, faShareAlt, faMagic, faPalette, faFont, faLayerGroup } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';

const Guide = () => {
  const lastUpdated = "2025年7月2日";
  const { t, i18n } = useTranslation();

  useEffect(() => {
    // 设置页面特定的SEO元标签
    document.title = t('guide.pageTitle', "使用指南 - Product Latest");
    
    // 更新meta描述
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', t('guide.metaDescription',
        'Product Latest使用指南 - 学习如何使用我们的工具创建精美的Product Hunt产品展示卡片，包括输入产品链接、自定义内容和样式、导出图片等详细步骤'));
    }
  }, [t, i18n.language]);

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 border-b border-gray-200 pb-4">
          {t('guide.title')}
        </h1>
        
        <div className="text-sm text-gray-500 mb-6">
          {t('guide.lastUpdated')}：{lastUpdated}
        </div>
        
        <div className="space-y-8">
          {/* 介绍 */}
          <section>
            <p className="text-gray-600 leading-relaxed mb-4">
              {t('guide.intro', "欢迎使用 Product Latest，这是一款专为产品爱好者设计的 Product Hunt 卡片生成工具。无论你是产品经理、创业者还是科技爱好者，都可以用它来创建精美的产品卡片，并分享到社交媒体。")}
            </p>
            <p className="text-gray-600 leading-relaxed">
              {t('guide.introFollowup', "下面我们来一步步了解如何使用这个工具。")}
            </p>
          </section>
          
          {/* 步骤 1 */}
          <section className="border-l-4 border-ph-orange pl-4 py-1">
            <h2 className="text-xl font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <FontAwesomeIcon icon={faLink} className="text-ph-orange" />
              <span>{t('guide.step1')}</span>
            </h2>
            <div className="ml-6 space-y-3">
              <p className="text-gray-600">
                {t('guide.step1Desc', "在首页的输入框中粘贴 Product Hunt 产品链接。")}
              </p>
              <p className="text-gray-600">
                {t('guide.example')}: https://www.producthunt.com/products/voltops-llm-observability-platform
              </p>
              <div className="bg-gray-50 p-3 rounded-md text-sm text-gray-500 border border-gray-200">
                <strong>{t('guide.tip')}: </strong> 
                {t('guide.step1Tip', "你也可以直接输入产品的 slug（链接中最后的部分），如 \"voltops-llm-observability-platform\"。")}
              </div>
            </div>
          </section>
          
          {/* 步骤 2 */}
          <section className="border-l-4 border-ph-orange pl-4 py-1">
            <h2 className="text-xl font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <FontAwesomeIcon icon={faEdit} className="text-ph-orange" />
              <span>{t('guide.step2')}</span>
            </h2>
            <div className="ml-6 space-y-3">
              <p className="text-gray-600">
                {t('guide.step2Desc', "输入产品链接后，系统会自动跳转到编辑器页面，这里你可以看到生成的产品卡片。")}
              </p>
              <p className="text-gray-600">
                {t('guide.step2Adjust', "在编辑器中，你可以调整以下内容：")}
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600 ml-2">
                <li className="flex items-start">
                  <FontAwesomeIcon icon={faEdit} className="text-ph-orange mt-1 mr-2 w-4" />
                  <span><strong>{t('guide.contentEditing')}</strong> - {t('guide.contentEditingDesc', "修改产品名称、标语、描述、链接、Logo等")}</span>
                </li>
                <li className="flex items-start">
                  <FontAwesomeIcon icon={faFont} className="text-ph-orange mt-1 mr-2 w-4" />
                  <span><strong>{t('guide.textStyle')}</strong> - {t('guide.textStyleDesc', "修改字体大小、颜色、粗细、对齐方式等")}</span>
                </li>
                <li className="flex items-start">
                  <FontAwesomeIcon icon={faPalette} className="text-ph-orange mt-1 mr-2 w-4" />
                  <span><strong>{t('guide.cardDesign')}</strong> - {t('guide.cardDesignDesc', "调整卡片的背景色、圆角、阴影、比例等")}</span>
                </li>
                <li className="flex items-start">
                  <FontAwesomeIcon icon={faLayerGroup} className="text-ph-orange mt-1 mr-2 w-4" />
                  <span><strong>{t('guide.displayOptions')}</strong> - {t('guide.displayOptionsDesc', "选择显示或隐藏Logo、标语、点赞数、评论数等元素")}</span>
                </li>
              </ul>
            </div>
          </section>
          
          {/* 步骤 3 */}
          <section className="border-l-4 border-ph-orange pl-4 py-1">
            <h2 className="text-xl font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <FontAwesomeIcon icon={faDownload} className="text-ph-orange" />
              <span>{t('guide.step3')}</span>
            </h2>
            <div className="ml-6 space-y-3">
              <p className="text-gray-600">
                {t('guide.step3Desc', "当你对卡片满意后，点击\"导出图片\"按钮，即可将卡片保存为图片文件。")}
              </p>
              <p className="text-gray-600">
                {t('guide.step3Options', "你可以通过\"导出设置\"按钮调整以下导出选项：")}
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600 ml-2">
                <li><strong>{t('guide.imageFormat')}</strong> - {t('guide.imageFormatDesc', "可选择 PNG、JPEG 或 WebP 格式")}</li>
                <li><strong>{t('guide.resolution')}</strong> - {t('guide.resolutionDesc', "可选择标准(1x)、高清(2x)、超高清(3x)或4K(4x)分辨率")}</li>
              </ul>
            </div>
          </section>
          
          {/* 常见问题 */}
          <section className="mt-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b border-gray-200 pb-2">
              {t('guide.faq')}
            </h2>
            
            <div className="space-y-4 mt-4">
              <div>
                <h3 className="font-semibold text-gray-800 mb-1">
                  {t('guide.faq1Q', "Q: 为什么我输入的产品链接无法获取数据？")}
                </h3>
                <p className="text-gray-600 ml-4">
                  {t('guide.faq1A', "A: 请确保你输入的是有效的 Product Hunt 产品链接，格式通常为 https://www.producthunt.com/products/[产品名称]。如果仍然无法获取，可能是该产品在 Product Hunt 上的信息有误或API暂时不可用。")}
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-800 mb-1">
                  {t('guide.faq2Q', "Q: 我可以自定义卡片上的内容吗？")}
                </h3>
                <p className="text-gray-600 ml-4">
                  {t('guide.faq2A', "A: 是的，在编辑器的\"内容\"选项卡中，你可以修改产品名称、标语、描述、链接和Logo等信息。这些修改只会影响你生成的卡片，不会改变 Product Hunt 上的原始数据。")}
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-800 mb-1">
                  {t('guide.faq3Q', "Q: 导出的图片质量如何？")}
                </h3>
                <p className="text-gray-600 ml-4">
                  {t('guide.faq3A', "A: 你可以根据需要选择不同的分辨率，从标准(1x)到4K(4x)不等。高分辨率选项可以确保图片在各种场景下都保持清晰，特别适合用于高分辨率显示器或打印材料。")}
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-800 mb-1">
                  {t('guide.faq4Q', "Q: 使用这个工具需要付费吗？")}
                </h3>
                <p className="text-gray-600 ml-4">
                  {t('guide.faq4A', "A: 目前所有功能都是免费提供的。我们希望帮助产品爱好者更好地分享和推广他们喜爱的产品。")}
                </p>
              </div>
            </div>
          </section>
          
          {/* 联系我们 */}
          <section className="bg-gray-50 p-5 rounded-lg border border-gray-200 mt-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              {t('guide.moreQuestions')}
            </h2>
            <p className="text-gray-600">
              {t('guide.contactMessage')}:
              <a href="mailto:support@productlatest.com" className="text-ph-orange hover:underline ml-1">
                support@productlatest.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Guide;