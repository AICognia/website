import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes, FaPhone, FaChevronDown } from 'react-icons/fa';
import PremiumButton from './PremiumButton';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showSolutionsDropdown, setShowSolutionsDropdown] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
    setShowSolutionsDropdown(false);
  }, [location]);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Solutions', path: '/solutions' },
    { name: 'Company', path: '/company' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <>
      <nav
        className={`fixed w-full z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-slate-900/95 backdrop-blur-2xl border-b border-slate-800/50 shadow-2xl'
            : 'bg-slate-900/80 backdrop-blur-xl'
        }`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex justify-between items-center h-20">
            {/* Logo with shine effect */}
            <Link
              to="/"
              className="flex items-center group"
              aria-label="Cognia AI Home"
            >
              <motion.span
                className="text-3xl md:text-4xl font-bold gradient-text relative"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                Cognia AI
                <span className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300" />
              </motion.span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navItems.map((item) => (
                <div key={item.path} className="relative">
                  {item.dropdown ? (
                    <div
                      className="relative"
                      onMouseEnter={() => setShowSolutionsDropdown(true)}
                      onMouseLeave={() => setShowSolutionsDropdown(false)}
                    >
                      <Link
                        to={item.path}
                        className={`flex items-center gap-1 text-lg font-medium transition-all duration-300 hover:text-cyan-400 ${
                          location.pathname === item.path ||
                          item.dropdown?.some(sub => location.pathname === sub.path)
                            ? 'text-cyan-400 text-glow'
                            : 'text-gray-300'
                        }`}
                      >
                        {item.name}
                        <FaChevronDown className="text-xs" />
                      </Link>

                      {/* Dropdown Menu */}
                      <AnimatePresence>
                        {showSolutionsDropdown && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="absolute top-full left-0 mt-2 w-48 glass-effect-strong rounded-xl shadow-xl overflow-hidden"
                          >
                            {item.dropdown.map((subItem) => (
                              <Link
                                key={subItem.path}
                                to={subItem.path}
                                className={`block px-4 py-3 text-sm font-medium transition-all duration-200 ${
                                  location.pathname === subItem.path
                                    ? 'bg-cyan-500/20 text-cyan-400'
                                    : 'text-gray-300 hover:bg-slate-800/50 hover:text-cyan-400'
                                }`}
                              >
                                {subItem.name}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      to={item.path}
                      className={`text-lg font-medium transition-all duration-300 hover:text-cyan-400 ${
                        location.pathname === item.path
                          ? 'text-cyan-400 text-glow'
                          : 'text-gray-300'
                      }`}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}

              {/* Desktop CTA Buttons */}
              <div className="flex items-center gap-3 ml-4">
                <a
                  href="tel:+16163263328"
                  className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors"
                  aria-label="Call us"
                >
                  <FaPhone className="text-sm" />
                  <span className="font-medium">+1 616 326-3328</span>
                </a>

                <PremiumButton
                  variant="cta"
                  size="md"
                  showArrow
                  urgency
                  href="https://calendly.com/emrebenian-cogniaai/30min"
                  className="ml-2"
                >
                  Book Demo
                </PremiumButton>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden relative p-2 text-gray-300 hover:text-cyan-400 transition-colors"
              whileTap={{ scale: 0.95 }}
              aria-label="Toggle mobile menu"
              aria-expanded={isOpen}
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90 }}
                    animate={{ rotate: 0 }}
                    exit={{ rotate: 90 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FaTimes size={24} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90 }}
                    animate={{ rotate: 0 }}
                    exit={{ rotate: -90 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FaBars size={24} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation - Improved */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="lg:hidden overflow-hidden bg-slate-900/98 backdrop-blur-2xl border-t border-slate-800/50"
            >
              <div className="container mx-auto px-6 py-6 space-y-3">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                      className={`block px-4 py-3 rounded-xl text-lg font-medium transition-all duration-300 ${
                        location.pathname === item.path
                          ? 'bg-cyan-500/20 text-cyan-400 shadow-inner-glow'
                          : 'text-gray-300 hover:bg-slate-800/50 hover:text-cyan-400'
                      }`}
                    >
                      {item.name}
                    </Link>

                    {/* Mobile dropdown items */}
                    {item.dropdown && (
                      <div className="ml-8 mt-2 space-y-2">
                        {item.dropdown.map((subItem) => (
                          <Link
                            key={subItem.path}
                            to={subItem.path}
                            onClick={() => setIsOpen(false)}
                            className={`block px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                              location.pathname === subItem.path
                                ? 'bg-cyan-500/20 text-cyan-400'
                                : 'text-gray-400 hover:bg-slate-800/50 hover:text-cyan-400'
                            }`}
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </motion.div>
                ))}

                {/* Mobile CTAs */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: navItems.length * 0.1 }}
                  className="pt-4 border-t border-slate-800/50 space-y-3"
                >
                  <a
                    href="tel:+16163263328"
                    className="flex items-center justify-center gap-2 py-3 text-cyan-400 hover:text-cyan-300 transition-colors"
                  >
                    <FaPhone />
                    <span className="font-medium">+1 616 326-3328</span>
                  </a>

                  <PremiumButton
                    variant="cta"
                    size="lg"
                    fullWidth
                    showArrow
                    urgency
                    href="https://calendly.com/emrebenian-cogniaai/30min"
                    onClick={() => setIsOpen(false)}
                  >
                    Book Your Demo
                  </PremiumButton>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Spacer to prevent content from being hidden under fixed navbar */}
      <div className="h-20" />
    </>
  );
};

export default Navbar;