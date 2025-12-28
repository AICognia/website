import React from 'react';
import { Link } from 'react-router-dom';
import { FaLinkedin, FaInstagram } from 'react-icons/fa';
import { useLanguage } from '../contexts/LanguageContext';
import { trackSocialClick } from '../utils/metaPixel';

const Footer: React.FC = () => {
  const { t, language } = useLanguage();

  return (
    <footer className="relative bg-black text-gray-300 border-t border-white/10">
      <div className="relative container mx-auto px-6 lg:px-12 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div className="col-span-1">
            <div className="mb-4 mt-2 -ml-2">
              <img
                src="/cognia-icon-only.png"
                alt="Cognia AI"
                className="h-40 w-auto"
                style={{ filter: 'brightness(0) invert(1)' }}
              />
            </div>
            <p className="text-sm text-gray-400 mb-4">
              {language === 'tr' ? 'Gelen ve giden aramalarla tam donanımlı AI çağrı merkezi çözümü.' : 'Complete AI call center solution with inbound and outbound capabilities.'}
            </p>
            <div className="flex space-x-3">
              <a
                href="https://www.linkedin.com/company/cognia-ai-usa/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackSocialClick('linkedin', 'footer')}
                className="p-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 text-white transition-colors"
              >
                <FaLinkedin size={18} />
              </a>
              <a
                href="https://www.instagram.com/cognia.ai/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackSocialClick('instagram', 'footer')}
                className="p-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 text-white transition-colors"
              >
                <FaInstagram size={18} />
              </a>
            </div>
          </div>

          {/* Industries We Serve */}
          <div>
            <h3 className="text-white font-medium mb-4 text-sm uppercase tracking-wider">
              Industries We Serve
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/industries/healthcare" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Healthcare
                </Link>
              </li>
              <li>
                <Link to="/industries/legal" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Legal Services
                </Link>
              </li>
              <li>
                <Link to="/industries/retail" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Retail
                </Link>
              </li>
              <li>
                <Link to="/industries/enterprise" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Enterprise
                </Link>
              </li>
              <li>
                <Link to="/industries/hospitality" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Hospitality
                </Link>
              </li>
              <li>
                <Link to="/industries/automotive" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Automotive
                </Link>
              </li>
              <li>
                <Link to="/industries/home-services" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Home Services
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-medium mb-4 text-sm uppercase tracking-wider">
              {t('footer.company')}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/company" className="text-sm text-gray-400 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-xs text-gray-500">
              © 2024 Cognia AI. {t('footer.rights')}
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link
                to="/privacy-policy"
                className="text-xs text-gray-500 hover:text-white transition-colors"
              >
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
