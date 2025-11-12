import React from 'react';
import { Link } from 'react-router-dom';
import { FaLinkedin, FaInstagram } from 'react-icons/fa';
import { useLanguage } from '../contexts/LanguageContext';

const Footer: React.FC = () => {
  const { t, language } = useLanguage();
  
  return (
    <footer className="relative bg-black text-gray-300 border-t border-gray-800/50">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-950 to-black opacity-50" />
      <div className="relative container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div className="col-span-1">
            <div className="flex items-center mb-4">
              <span
                className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent"
                style={{
                  fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
                  letterSpacing: '-0.02em'
                }}
              >
                Cognia AI
              </span>
            </div>
            <p className="text-sm text-gray-400 font-light mb-4">
              {language === 'tr' ? 'Gelen ve giden aramalarla tam donanımlı AI çağrı merkezi çözümü.' : 'Complete AI call center solution with inbound and outbound capabilities.'}
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.linkedin.com/company/cognia-ai-usa/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-blue-500/10 rounded-lg border border-blue-500/20 hover:border-blue-400/40 text-blue-400 transition-all"
              >
                <FaLinkedin size={18} />
              </a>
              <a
                href="https://www.instagram.com/cognia.ai/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-pink-500/10 rounded-lg border border-pink-500/20 hover:border-pink-400/40 text-pink-400 transition-all"
              >
                <FaInstagram size={18} />
              </a>
            </div>
          </div>

          {/* Solutions */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              <span className="text-cyan-400">{t('footer.services')}</span>
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/solutions" className="text-sm text-gray-400 hover:text-cyan-400 transition-colors font-light">
                  Inbound Call Center
                </Link>
              </li>
              <li>
                <Link to="/solutions" className="text-sm text-gray-400 hover:text-cyan-400 transition-colors font-light">
                  Outbound Call Center
                </Link>
              </li>
              <li>
                <Link to="/solutions" className="text-sm text-gray-400 hover:text-cyan-400 transition-colors font-light">
                  Lead Qualification
                </Link>
              </li>
              <li>
                <Link to="/solutions" className="text-sm text-gray-400 hover:text-cyan-400 transition-colors font-light">
                  Appointment Automation
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              <span className="text-purple-400">{t('footer.company')}</span>
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/company" className="text-sm text-gray-400 hover:text-purple-400 transition-colors font-light">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-gray-400 hover:text-purple-400 transition-colors font-light">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800/50 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-xs text-gray-500 font-light">
              © 2024 Cognia AI. {t('footer.rights')}
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link
                to="/privacy-policy"
                className="text-xs text-gray-500 hover:text-cyan-400 transition-colors font-light"
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