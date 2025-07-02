import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faBook, faShieldAlt, faFileContract, faHome, faPencilAlt, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { t } = useTranslation();
  
  return (
    <footer className="bg-gradient-to-r from-gray-50 to-orange-50 py-8 mt-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & 简介 */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="h-6 w-6">
                <img src="/favicon.svg" alt="Product Latest Logo" className="h-full w-full" />
              </div>
              <h2 className="text-lg font-bold text-gray-800">Product Latest</h2>
            </Link>
            <p className="text-gray-600 mb-4">
              {t('common.description')}
            </p>
            <p className="text-sm text-gray-500 flex items-center gap-1">
              <span>{t('footer.madeWith')}</span>
              <FontAwesomeIcon icon={faHeart} className="text-ph-orange" />
            </p>
          </div>
          
          {/* 链接 */}
          <div className="col-span-1">
            <h3 className="text-gray-800 font-semibold mb-4">{t('footer.product')}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-ph-orange flex items-center gap-1">
                  <FontAwesomeIcon icon={faHome} className="text-xs" />
                  <span>{t('header.home')}</span>
                </Link>
              </li>
              <li>
                <Link to="/editor" className="text-gray-600 hover:text-ph-orange flex items-center gap-1">
                  <FontAwesomeIcon icon={faPencilAlt} className="text-xs" />
                  <span>{t('header.editor')}</span>
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-600 hover:text-ph-orange flex items-center gap-1">
                  <FontAwesomeIcon icon={faInfoCircle} className="text-xs" />
                  <span>{t('header.about')}</span>
                </Link>
              </li>
            </ul>
          </div>
          
          {/* 帮助 */}
          <div className="col-span-1">
            <h3 className="text-gray-800 font-semibold mb-4">{t('footer.help')}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/guide" className="text-gray-600 hover:text-ph-orange flex items-center gap-1">
                  <FontAwesomeIcon icon={faBook} className="text-xs" />
                  <span>{t('footer.guide')}</span>
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-600 hover:text-ph-orange flex items-center gap-1">
                  <FontAwesomeIcon icon={faShieldAlt} className="text-xs" />
                  <span>{t('footer.privacy')}</span>
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-600 hover:text-ph-orange flex items-center gap-1">
                  <FontAwesomeIcon icon={faFileContract} className="text-xs" />
                  <span>{t('footer.terms')}</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500 mb-4 md:mb-0">
            © {currentYear} Product Latest. {t('footer.rights')}
          </p>
          <div className="flex items-center">
            <a 
              href="mailto:support@productlatest.com"
              className="text-sm text-gray-500 hover:text-ph-orange"
            >
              support@productlatest.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 