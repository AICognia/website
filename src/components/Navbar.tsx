import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMenu, FiX } from 'react-icons/fi';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const scrolled = false;

  const navItems = [
    { name: 'Ana Sayfa', href: '#home' },
    { name: 'Voice Agent', href: '#voice-agent' },
    { name: 'Demo Videolar', href: '#demo-videos' },
    { name: 'Hizmetlerimiz', href: '#services' },
    { name: 'Özellikler', href: '#features' },
    { name: 'Hakkımızda', href: '#about' },
    { name: 'İletişim', href: '.contact-cta-section' },
  ];

  return (
    <nav className="fixed w-full top-0 z-50 bg-darkBlue/95 backdrop-blur-lg shadow-lg border-b border-secondary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center"
          >
            <span className="text-2xl font-bold text-white text-glow">Cognia AI</span>
          </motion.div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => {
                    if (item.href.startsWith('#') || item.href.startsWith('.')) {
                      e.preventDefault();
                      const element = document.querySelector(item.href);
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                      }
                    }
                  }}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:scale-105 ${
                    item.href === '#home' && scrolled === false
                      ? 'text-secondary bg-secondary/10'
                      : 'text-white hover:text-secondary hover:bg-secondary/10'
                  }`}
                >
                  {item.name}
                </motion.a>
              ))}
              <motion.button
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navItems.length * 0.1 }}
                className="bg-gradient-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-secondary/25"
                onClick={() => {
                  const contactCTA = document.querySelector('.contact-cta-section');
                  if (contactCTA) {
                    contactCTA.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                Ücretsiz Demo
              </motion.button>
            </div>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-gray-200 focus:outline-none"
            >
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-darkBlue/95 backdrop-blur-lg border-t border-secondary/20"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-white hover:text-gray-200 block px-3 py-2 rounded-md text-base font-medium"
                onClick={(e) => {
                  if (item.href.startsWith('#') || item.href.startsWith('.')) {
                    e.preventDefault();
                    const element = document.querySelector(item.href);
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }
                  setIsOpen(false);
                }}
              >
                {item.name}
              </a>
            ))}
            <button 
              className="w-full bg-gradient-primary text-white px-4 py-2 rounded-md text-sm font-medium hover:opacity-90 transition-opacity"
              onClick={() => {
                setIsOpen(false);
                const contactCTA = document.querySelector('.contact-cta-section');
                if (contactCTA) {
                  contactCTA.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              Ücretsiz Demo
            </button>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar; 