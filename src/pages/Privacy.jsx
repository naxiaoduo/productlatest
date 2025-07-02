import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShieldAlt, faUserSecret, faCookieBite, faServer, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';

const Privacy = () => {
  const lastUpdated = "2025年7月2日";
  const { t, i18n } = useTranslation();

  useEffect(() => {
    // 设置页面特定的SEO元标签
    document.title = t('privacy.pageTitle', "隐私政策 - Product Latest");
    
    // 更新meta描述
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', t('privacy.metaDescription',
        'Product Latest隐私政策 - 了解我们如何收集、使用和保护您的个人信息，以及您在使用我们服务时的隐私权利'));
    }
  }, [t, i18n.language]);

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
        <div className="flex items-center gap-2 mb-6">
          <FontAwesomeIcon icon={faShieldAlt} className="text-ph-orange text-2xl" />
          <h1 className="text-3xl font-bold text-gray-800">
            {t('privacy.title')}
          </h1>
        </div>
        
        <div className="text-sm text-gray-500 mb-6 pb-4 border-b border-gray-200">
          {t('privacy.lastUpdated')}：{lastUpdated}
        </div>
        
        <div className="space-y-6 text-gray-600">
          <section>
            <p className="mb-4 leading-relaxed">
              {t('privacy.intro', "感谢你使用 Product Latest！这份隐私政策旨在以简单明了的方式告诉你我们如何处理你的信息。我们重视你的隐私，并致力于保护你在使用我们服务时提供的个人信息。")}
            </p>
            <p className="leading-relaxed">
              {t('privacy.introFollowup', "请花几分钟时间仔细阅读，了解我们的做法。如果你不同意本政策的任何部分，请停止使用我们的服务。")}
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <FontAwesomeIcon icon={faUserSecret} className="text-ph-orange" />
              <span>{t('privacy.infoCollect')}</span>
            </h2>
            <div className="ml-6">
              <p className="mb-3">
                {t('privacy.infoCollectIntro', "我们收集的信息非常有限，主要包括：")}
              </p>
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li>
                  <strong>{t('privacy.usageData')}</strong>：
                  {t('privacy.usageDataDesc', "我们会收集有关你如何使用我们网站的基本信息，例如你访问的页面、你在网站上停留的时间以及你的点击行为。")}
                </li>
                <li>
                  <strong>{t('privacy.deviceInfo')}</strong>：
                  {t('privacy.deviceInfoDesc', "我们会收集有关你使用的设备的基本信息，如设备类型、操作系统和浏览器类型。")}
                </li>
                <li>
                  <strong>{t('privacy.productLinks')}</strong>：
                  {t('privacy.productLinksDesc', "当你在我们的网站上输入 Product Hunt 产品链接时，我们会记录这些链接，以便改进我们的服务。")}
                </li>
              </ul>
              <div className="bg-gray-50 p-3 rounded-md text-sm mt-3 border border-gray-200">
                <strong>{t('privacy.specialNote')}: </strong> 
                {t('privacy.personalInfoNote', "我们不会收集你的姓名、电子邮件地址或其他个人身份信息，除非你主动提供给我们（例如通过联系我们）。")}
              </div>
            </div>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <FontAwesomeIcon icon={faCookieBite} className="text-ph-orange" />
              <span>{t('privacy.cookies')}</span>
            </h2>
            <div className="ml-6">
              <p className="mb-3">
                {t('privacy.cookiesDesc', "我们使用 Cookie 和类似技术来提供、改进和保护我们的服务。Cookie 是存储在你设备上的小型文本文件，可以帮助网站记住你的偏好和设置。")}
              </p>
              <p className="mb-3">
                {t('privacy.cookiesPurpose', "我们使用的 Cookie 主要用于以下目的：")}
              </p>
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li>{t('privacy.cookiesPurpose1', "记住你的偏好设置")}</li>
                <li>{t('privacy.cookiesPurpose2', "分析网站流量和使用情况")}</li>
                <li>{t('privacy.cookiesPurpose3', "改进网站性能和用户体验")}</li>
              </ul>
              <p className="mt-3">
                {t('privacy.cookiesControl', "你可以通过浏览器设置随时控制或删除 Cookie。但请注意，禁用 Cookie 可能会影响我们网站的某些功能。")}
              </p>
            </div>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <FontAwesomeIcon icon={faServer} className="text-ph-orange" />
              <span>{t('privacy.infoUse')}</span>
            </h2>
            <div className="ml-6">
              <p className="mb-3">
                {t('privacy.infoUseIntro', "我们使用收集到的信息主要是为了：")}
              </p>
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li>{t('privacy.infoUse1', "提供、维护和改进我们的服务")}</li>
                <li>{t('privacy.infoUse2', "了解用户如何使用我们的网站")}</li>
                <li>{t('privacy.infoUse3', "开发新功能和服务")}</li>
                <li>{t('privacy.infoUse4', "防止欺诈和滥用行为")}</li>
              </ul>
              <p className="mt-3 mb-3">
                {t('privacy.infoSharing', "我们不会出售你的个人信息。我们可能会在以下情况下共享你的信息：")}
              </p>
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li>
                  <strong>{t('privacy.serviceProviders')}</strong>：
                  {t('privacy.serviceProvidersDesc', "我们可能会与帮助我们提供服务的第三方共享信息（如托管服务提供商）。")}
                </li>
                <li>
                  <strong>{t('privacy.legalRequirements')}</strong>：
                  {t('privacy.legalRequirementsDesc', "如果法律要求或为了保护我们的权利，我们可能会共享你的信息。")}
                </li>
                <li>
                  <strong>{t('privacy.statisticalData')}</strong>：
                  {t('privacy.statisticalDataDesc', "我们可能会共享匿名的、汇总的统计数据，这些数据不包含可识别个人身份的信息。")}
                </li>
              </ul>
            </div>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <FontAwesomeIcon icon={faEnvelope} className="text-ph-orange" />
              <span>{t('privacy.contactMe')}</span>
            </h2>
            <div className="ml-6">
              <p>
                {t('privacy.contactDesc', "如果你对我的隐私政策有任何疑问或建议，欢迎随时联系我：")}
                <a href="mailto:support@productlatest.com" className="text-ph-orange hover:underline ml-1">
                  support@productlatest.com
                </a>
              </p>
            </div>
          </section>
          
          <div className="bg-gray-50 p-5 rounded-lg border border-gray-200 mt-8">
            <p className="text-sm text-gray-500">
              {t('privacy.updates', "请注意，我可能会不时更新本隐私政策。当我进行重大更改时，我会在网站上发布通知。继续使用我们的服务即表示你同意最新版本的隐私政策。")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy; 