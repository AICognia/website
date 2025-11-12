import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes, FaPhone, FaCalendarCheck, FaHome, FaBrain, FaBuilding, FaEnvelope } from 'react-icons/fa';

const MobileNavbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navItems = [
    { name: 'Home', path: '/', icon: FaHome },
    { name: 'Solutions', path: '/solutions', icon: FaBrain },
    { name: 'Company', path: '/company', icon: FaBuilding },
    { name: 'Contact', path: '/contact', icon: FaEnvelope }
  ];

  return (
    <div className="lg:hidden">
      {/* Mobile Navbar */}
      <nav
        className={`fixed w-full z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-slate-900/95 backdrop-blur-2xl border-b border-slate-800/50 shadow-2xl'
            : 'bg-slate-900/80 backdrop-blur-xl'
        }`}
      >
        <div className="px-4 py-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Cognia AI
              </span>
            </Link>

            {/* Right Actions */}
            <div className="flex items-center gap-3">
              {/* Call Button */}
              <a
                href="tel:+16163263328"
                className="p-2.5 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-xl border border-cyan-500/30 text-cyan-400"
              >
                <FaPhone className="text-sm" />
              </a>

              {/* Menu Toggle */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2.5 bg-white/5 rounded-xl border border-white/10 text-white"
              >
                <AnimatePresence mode="wait">
                  {isOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <FaTimes size={18} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <FaBars size={18} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Full Screen Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-slate-900/95 backdrop-blur-2xl"
              onClick={() => setIsOpen(false)}
            />

            {/* Menu Content */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="absolute right-0 top-0 h-full w-full sm:w-96 bg-slate-900/98 backdrop-blur-3xl border-l border-slate-800/50"
            >
              {/* Menu Header */}
              <div className="p-6 border-b border-slate-800/50">
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-white">Menu</span>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 bg-white/5 rounded-xl text-gray-400 hover:text-white transition-colors"
                  >
                    <FaTimes size={20} />
                  </button>
                </div>
              </div>

              {/* Navigation Items */}
              <div className="p-6 space-y-2">
                {navItems.map((item, index) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path;

                  return (
                    <motion.div
                      key={item.path}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link
                        to={item.path}
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                          isActive
                            ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-400 border border-cyan-500/30'
                            : 'text-gray-300 hover:bg-white/5 hover:text-white'
                        }`}
                      >
                        <Icon className="text-lg" />
                        <span className="text-base font-medium">{item.name}</span>
                        {isActive && (
                          <motion.div
                            layoutId="activeIndicator"
                            className="ml-auto w-1.5 h-1.5 bg-cyan-400 rounded-full"
                          />
                        )}
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              {/* CTA Section */}
              <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-slate-800/50 bg-slate-900/98">
                <div className="space-y-3">
                  {/* Phone CTA */}
                  <a
                    href="tel:+16163263328"
                    className="flex items-center justify-between px-4 py-3 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <FaPhone className="text-cyan-400" />
                      <div>
                        <div className="text-sm font-semibold text-white">Call AI Demo</div>
                        <div className="text-xs text-gray-400">+1 616-326-3328</div>
                      </div>
                    </div>
                    <span className="text-xs text-cyan-400 font-medium">24/7</span>
                  </a>

                  {/* Book Demo CTA */}
                  <a
                    href="https://calendly.com/emrebenian-cogniaai/30min"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full"
                  >
                    <div className="relative group">
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl blur opacity-50 group-hover:opacity-75 transition-opacity" />
                      <div className="relative bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold py-3 px-4 rounded-xl flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <FaCalendarCheck />
                          <span>Book Free Demo</span>
                        </div>
                        <div className="text-xs bg-white/20 px-2 py-1 rounded">Free Trial</div>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer */}
      <div className="h-[72px]" />
    </div>
  );
};

export default MobileNavbar;