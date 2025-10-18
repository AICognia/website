import React from 'react';
import { Link } from 'react-router-dom';
import { FaLinkedin, FaInstagram } from 'react-icons/fa';
import { useLanguage } from '../contexts/LanguageContext';

const Footer: React.FC = () => {
  const { t, language } = useLanguage();
  
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div className="col-span-1">
            <div className="flex items-center mb-4">
              <span 
                className="text-2xl font-semibold text-[#162B4D]"
                style={{
                  fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
                  letterSpacing: '-0.02em'
                }}
              >
                Cognia AI
              </span>
            </div>
            <p className="text-sm text-gray-400 mb-4">
              {language === 'tr' ? 'Sınırsız ölçeklenebilir kurumsal konuşma AI platformu.' : 'Enterprise conversational AI that scales infinitely.'}
            </p>
            <div className="flex space-x-4">
              <a href="https://www.linkedin.com/company/cognia-ai-usa/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#162B4D] transition-colors">
                <FaLinkedin size={20} />
              </a>
              <a href="https://www.instagram.com/cognia.ai/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#162B4D] transition-colors">
                <FaInstagram size={20} />
              </a>
            </div>
          </div>

          {/* Solutions */}
          <div>
            <h3 className="text-white font-semibold mb-4">{t('footer.services')}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/solutions" className="text-sm hover:text-[#162B4D] transition-colors">
                  Voice Agents
                </Link>
              </li>
              <li>
                <Link to="/solutions" className="text-sm hover:text-[#162B4D] transition-colors">
                  Chatbots
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold mb-4">{t('footer.company')}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/company" className="text-sm hover:text-[#162B4D] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm hover:text-[#162B4D] transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400">
              © 2024 Cognia AI. {t('footer.rights')}
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link 
                to="/privacy-policy"
                className="text-sm text-gray-400 hover:text-[#162B4D] transition-colors"
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