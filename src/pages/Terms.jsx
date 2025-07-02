import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileContract, faHandshake, faExclamationTriangle, faCopyright, faGavel } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';

const Terms = () => {
  const lastUpdated = "2025年7月2日";
  const { t, i18n } = useTranslation();

  useEffect(() => {
    // 设置页面特定的SEO元标签
    document.title = t('terms.pageTitle', "使用条款 - Product Latest");
    
    // 更新meta描述
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', t('terms.metaDescription',
        'Product Latest使用条款 - 了解使用我们服务的规则和条件，包括用户责任、知识产权和免责声明等重要信息'));
    }
  }, [t, i18n.language]);

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
        <div className="flex items-center gap-2 mb-6">
          <FontAwesomeIcon icon={faFileContract} className="text-ph-orange text-2xl" />
          <h1 className="text-3xl font-bold text-gray-800">
            {t('terms.title')}
          </h1>
        </div>
        
        <div className="text-sm text-gray-500 mb-6 pb-4 border-b border-gray-200">
          {t('terms.lastUpdated')}：{lastUpdated}
        </div>
        
        <div className="space-y-6 text-gray-600">
          <section>
            <p className="mb-4 leading-relaxed">
              {t('terms.welcome', "欢迎使用 Product Latest！在使用我的服务之前，请仔细阅读以下条款和条件。通过访问或使用我的网站，你同意受这些条款的约束。如果你不同意这些条款的任何部分，请不要使用我的服务。")}
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <FontAwesomeIcon icon={faHandshake} className="text-ph-orange" />
              <span>{t('terms.serviceDesc')}</span>
            </h2>
            <div className="ml-6">
              <p className="mb-3">
                {t('terms.serviceDescP1', "Product Latest 是一个在线工具，允许用户通过输入 Product Hunt 产品链接来创建和自定义产品展示卡片，并将其导出为图片格式。我的目标是为产品爱好者提供一种简单的方式来分享他们喜爱的产品。")}
              </p>
              <p>
                {t('terms.serviceDescP2', "请注意，Product Latest 不隶属于 Product Hunt，我只是使用他们的公开 API 来获取产品信息。")}
              </p>
            </div>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <FontAwesomeIcon icon={faExclamationTriangle} className="text-ph-orange" />
              <span>{t('terms.usageLimitations')}</span>
            </h2>
            <div className="ml-6">
              <p className="mb-3">
                {t('terms.usageLimitationsIntro', "在使用我的服务时，你同意不会：")}
              </p>
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li>
                  {t('terms.limitation1', "以任何可能损害、禁用或过度负担我的服务器的方式使用本服务")}
                </li>
                <li>
                  {t('terms.limitation2', "使用自动化工具或机器人大量访问我的网站")}
                </li>
                <li>
                  {t('terms.limitation3', "尝试未经授权访问我的系统或网络")}
                </li>
                <li>
                  {t('terms.limitation4', "使用我的服务创建虚假、误导性或欺诈性内容")}
                </li>
                <li>
                  {t('terms.limitation5', "侵犯他人的知识产权或其他权利")}
                </li>
              </ul>
              <div className="bg-gray-50 p-3 rounded-md text-sm mt-3 border border-gray-200">
                <strong>{t('terms.friendlyReminder')}: </strong> 
                {t('terms.limitationNote', "我保留对违反这些条款的用户限制或终止服务访问的权利。")}
              </div>
            </div>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <FontAwesomeIcon icon={faCopyright} className="text-ph-orange" />
              <span>{t('terms.intellectualProperty')}</span>
            </h2>
            <div className="ml-6">
              <p className="mb-3">
                {t('terms.intellectualPropertyP1', "我的网站内容，包括但不限于文本、图像、代码、设计和功能，均为 Product Latest 或其许可方所有。")}
              </p>
              <p className="mb-3">
                {t('terms.intellectualPropertyP2', "对于你使用我的工具创建的卡片：")}
              </p>
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li>
                  {t('terms.ipRule1', "你可以自由地将它们用于个人或商业目的")}
                </li>
                <li>
                  {t('terms.ipRule2', "你不得声称这些卡片的设计是你的原创作品")}
                </li>
                <li>
                  {t('terms.ipRule3', "你应当尊重卡片中显示的产品的原始版权和商标")}
                </li>
              </ul>
            </div>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <FontAwesomeIcon icon={faGavel} className="text-ph-orange" />
              <span>{t('terms.disclaimer')}</span>
            </h2>
            <div className="ml-6">
              <p className="mb-3">
                {t('terms.disclaimerP1', "我的服务按\"现状\"提供，不提供任何形式的保证。我不保证服务将不间断、及时、安全或无错误，也不保证服务中的任何错误都会被纠正。")}
              </p>
              <p className="mb-3">
                {t('terms.disclaimerP2', "在法律允许的最大范围内，我不对因使用或无法使用我的服务而导致的任何直接、间接、附带、特殊、后果性或惩罚性损害承担责任。")}
              </p>
              <p>
                {t('terms.disclaimerP3', "我不对通过我的服务获取的任何产品信息的准确性负责，因为这些信息来自 Product Hunt 的 API。")}
              </p>
            </div>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <FontAwesomeIcon icon={faHandshake} className="text-ph-orange" />
              <span>{t('terms.changes')}</span>
            </h2>
            <div className="ml-6">
              <p>
                {t('terms.changesDesc', "我保留随时修改这些条款的权利。当我进行重大更改时，我会在网站上发布通知。继续使用我的服务即表示你同意最新版本的使用条款。")}
              </p>
            </div>
          </section>
          
          <div className="bg-gray-50 p-5 rounded-lg border border-gray-200 mt-8">
            <p className="mb-2">
              {t('terms.contactIntro', "如果你对这些条款有任何疑问或建议，欢迎随时联系我：")}
            </p>
            <a href="mailto:support@productlatest.com" className="text-ph-orange hover:underline">
              support@productlatest.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms; 