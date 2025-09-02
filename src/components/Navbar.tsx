import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';
import LanguageSelector from './LanguageSelector';
import { useLanguage } from '../contexts/LanguageContext';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { t, language } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: t('nav.home'), path: '/' },
    { name: language === 'tr' ? 'Çözümler' : 'Solutions', path: '/solutions' },
    { name: language === 'tr' ? 'Platform' : 'Platform', path: '/platform' },
    { name: t('nav.about'), path: '/company' },
    { name: t('nav.contact'), path: '/contact' }
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-white shadow-lg' : 'bg-white/95 backdrop-blur-md'
    }`}>
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span 
              className="text-2xl md:text-3xl text-[#162B4D] transition-all duration-300"
              style={{
                fontFamily: '"Playfair Display", Georgia, serif',
                fontWeight: '600',
                letterSpacing: '0.02em',
                textShadow: '0 0 10px rgba(22, 43, 77, 0.3), 0 0 20px rgba(22, 43, 77, 0.2)'
              }}
            >
              Cognia AI
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-lg font-medium transition-colors hover:text-[#162B4D] ${
                  location.pathname === item.path
                    ? 'text-[#162B4D]'
                    : 'text-gray-700'
                  }`}
                >
                  {item.name}
              </Link>
              ))}
              <LanguageSelector />
            <Link
              to="/contact"
              className="ml-4 px-6 py-2.5 bg-gradient-to-r from-[#162B4D] to-[#0A1628] text-white font-semibold rounded-lg hover:shadow-lg transition-all transform hover:scale-105"
            >
              {t('nav.freeDemo')}
            </Link>
          </div>

          {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-700 hover:text-[#162B4D] transition-colors"
            >
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
      </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
      {isOpen && (
        <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden"
            >
              <div className="py-4 space-y-2">
            {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`block px-4 py-3 rounded-lg text-lg font-medium transition-colors ${
                      location.pathname === item.path
                        ? 'bg-gray-100 text-[#162B4D]'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-[#162B4D]'
                    }`}
              >
                {item.name}
                  </Link>
                ))}
                <Link
                  to="/contact"
                  onClick={() => setIsOpen(false)}
                  className="block mx-4 mt-4 px-6 py-3 bg-gradient-to-r from-[#162B4D] to-[#0A1628] text-white text-center font-semibold rounded-lg hover:shadow-lg transition-all"
                >
                  Request Demo
                </Link>
          </div>
        </motion.div>
      )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar; 