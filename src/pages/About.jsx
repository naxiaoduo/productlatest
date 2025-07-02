import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLightbulb, faCode, faRocket, faHeart } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';

const About = () => {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    // 设置页面特定的SEO元标签
    document.title = t('about.pageTitle', "关于 - Product Latest");
    
    // 更新meta描述
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', t('about.metaDescription', 
        '了解Product Latest的故事、开发初衷和使命，我们致力于为产品爱好者提供最好的产品展示卡片生成工具'));
    }
  }, [t, i18n.language]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="bg-gradient-to-br from-white to-orange-50 rounded-2xl shadow-lg p-8 mb-10">
        <h1 className="text-3xl font-bold mb-8 text-center">{t('about.title')} <span className="text-ph-orange">Product Latest</span></h1>
        
        <div className="space-y-12">
          {/* 开发故事 */}
          <section>
            <h2 className="text-2xl font-semibold mb-6 flex items-center">
              <FontAwesomeIcon icon={faLightbulb} className="text-ph-orange mr-3" />
              {t('about.story')}
            </h2>
            
            <div className="prose max-w-none leading-relaxed">
              <p className="mb-5">{t('about.storyP1', "嗨，我是一名独立开发者，Product Latest 的创建源于我自己的一个需求和观察。")}</p>
              
              <p className="mb-5">{t('about.storyP2', "作为 Product Hunt 的忠实用户，我经常想要在社交媒体、博客中分享我发现的优秀产品。然而，简单的链接缺乏视觉吸引力，而普通的截图又无法突出产品的关键信息和美感。")}</p>
              
              <p className="mb-5">{t('about.storyP3', "我注意到 Twitter 上有 TwitterShots 这样的工具可以创建精美的推文卡片，Mastodon 上也有 Mastopoet 可以生成美观的嘟文截图。这让我思考：为什么 Product Hunt 上的精彩内容不能有类似的展示方式？")}</p>
              
              <p className="mb-5">{t('about.storyP4', "在研究了 Product Hunt API 后，我意识到完全可以构建一个工具，让用户轻松创建专业、美观的产品展示卡片。这就是 Product Latest 诞生的契机 — 一个能够将 Product Hunt 上的产品信息转化为精美卡片的工具，帮助创作者、产品经理和科技爱好者更好地分享他们喜爱的产品。")}</p>
              
              <p className="mb-5">{t('about.storyP5', "从最初的概念到实现，我专注于用户体验和设计美感，希望每一张通过 Product Latest 生成的卡片都能准确传达产品价值，同时具有视觉吸引力。")}</p>
            </div>
          </section>
          
          {/* 使命 */}
          <section>
            <h2 className="text-2xl font-semibold mb-6 flex items-center">
              <FontAwesomeIcon icon={faRocket} className="text-ph-orange mr-3" />
              {t('about.mission')}
            </h2>
            
            <div className="prose max-w-none leading-relaxed">
              <p className="mb-5">{t('about.missionP1', "Product Latest 的使命很简单：让优秀产品的分享变得更加美观、便捷和专业。")}</p>
              
              <p className="mb-5">{t('about.missionP2', "我相信，伟大的产品应该被更多人看到，而展示方式会影响其传播的速度和广度。通过提供多样化的模板和自定义选项，我希望帮助每个用户找到最适合他们需求的展示方式。")}</p>
              
              <p className="mb-5">{t('about.missionP3', "随着社交媒体和内容创作的发展，跨平台内容分享的需求日益增长。Product Latest 正是填补了这一空白，让用户能够轻松地将 Product Hunt 上的精彩内容分享到各种平台。")}</p>
            </div>
          </section>
          
          {/* 联系方式 */}
          <section>
            <h2 className="text-2xl font-semibold mb-6 flex items-center">
              <FontAwesomeIcon icon={faHeart} className="text-ph-orange mr-3" />
              {t('about.contact')}
            </h2>
            
            <div className="prose max-w-none leading-relaxed">
              <p className="mb-5">{t('about.contactP1', "我重视每一位用户的反馈和建议。如果你有任何问题、想法或合作意向，欢迎联系我：")}</p>
              
              <p className="font-medium text-lg mb-5">📧 {t('about.email')}<a href="mailto:support@productlatest.com" className="text-ph-orange hover:underline">support@productlatest.com</a></p>
              
              <p className="mb-5">{t('about.contactP2', "感谢你使用 Product Latest！我将持续改进，为你提供更好的产品展示体验。")}</p>
            </div>
          </section>
          
          {/* 致谢 */}
          <section>
            <h2 className="text-2xl font-semibold mb-6 flex items-center">
              <FontAwesomeIcon icon={faCode} className="text-ph-orange mr-3" />
              {t('about.inspiration')}
            </h2>
            
            <div className="prose max-w-none leading-relaxed">
              <p className="mb-5">{t('about.inspirationP1', "Product Latest 的开发受到了以下优秀项目的启发：")}</p>
              
              <ul className="list-disc pl-6 space-y-3 mb-5">
                <li><a href="https://twittershots.com/" target="_blank" rel="noopener noreferrer" className="text-ph-orange hover:underline">TwitterShots</a> - {t('about.twittershots', "创建精美推文截图的工具")}</li>
                <li><a href="https://github.com/raikasdev/mastopoet" target="_blank" rel="noopener noreferrer" className="text-ph-orange hover:underline">Mastopoet</a> - {t('about.mastopoet', "Mastodon 嘟文美化工具")}</li>
                <li><a href="https://vividshare.io/" target="_blank" rel="noopener noreferrer" className="text-ph-orange hover:underline">VividShare</a> - {t('about.vividshare', "社交媒体内容可视化工具")}</li>
              </ul>
              
              <p className="mb-5">{t('about.thanks', "特别感谢 Product Hunt 提供的 API，使得我能够获取丰富的产品数据。")}</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default About; 