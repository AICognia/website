import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaBars, FaTimes, FaPhone, FaHome, FaBuilding, FaEnvelope,
  FaComments, FaCogs, FaSearchDollar, FaChartBar, FaRobot, FaArrowRight
} from 'react-icons/fa';
import conversionTracker from '../utils/conversionTracking';
import { trackTalkToAI, trackBookDemo } from '../utils/metaPixel';

// Product solutions
const products = [
  { icon: FaComments, title: 'AI Chatbot', description: 'Convert visitors 24/7', path: '/chatbot' },
  { icon: FaPhone, title: 'AI Receptionist', description: 'Never miss a call', path: '/solutions/ai-receptionist' },
  { icon: FaCogs, title: 'Workflow Automation', description: 'Eliminate manual work', path: '/solutions/workflow-automation' },
  { icon: FaSearchDollar, title: 'AI Audit', description: 'Find AI opportunities', path: '/solutions/ai-audit' },
  { icon: FaChartBar, title: 'Business Intelligence', description: 'Data-driven decisions', path: '/solutions/business-intelligence' },
  { icon: FaRobot, title: 'Custom AI', description: 'Bespoke solutions', path: '/solutions/custom-ai' }
];

const MobileNavbarRedesigned: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Track "Talk to AI" click
  const handleTalkToAIClick = () => {
    trackTalkToAI('mobile_navbar');
    conversionTracker.trackPhoneCall('+16163263328');
    conversionTracker.trackButtonClick('Talk to AI', 'mobile_navbar');
  };

  // Track "Book Demo" click
  const handleBookDemoClick = () => {
    trackBookDemo('mobile_navbar');
  };

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

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <div className="lg:hidden">
      {/* Mobile Navbar - Fixed */}
      <nav
        className={`fixed w-full z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-black/95 backdrop-blur-xl border-b border-white/10 shadow-lg'
            : 'bg-black/80 backdrop-blur-lg'
        }`}
      >
        <div className="px-4 py-3">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <img
                src="/cognia-c-icon.png"
                alt="Cognia"
                className="h-10 w-auto"
                style={{
                  filter: 'drop-shadow(0 0 6px rgba(34, 211, 238, 0.5))'
                }}
              />
              <span className="text-xl font-semibold text-white">
                Cognia
              </span>
            </Link>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              {/* Call Button - Always Visible */}
              <a
                href="tel:+16163263328"
                onClick={handleTalkToAIClick}
                className="flex items-center gap-2 px-3 py-2 bg-green-500/20 border border-green-500/30 rounded-lg text-green-400"
              >
                <FaPhone className="text-sm" />
                <span className="text-xs font-medium">Talk to AI</span>
              </a>

              {/* Menu Toggle */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2.5 bg-white/5 rounded-lg border border-white/10 text-white"
                aria-label={isOpen ? 'Close menu' : 'Open menu'}
              >
                <AnimatePresence mode="wait">
                  {isOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      <FaTimes size={18} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.15 }}
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
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/90 backdrop-blur-xl"
              onClick={() => setIsOpen(false)}
            />

            {/* Menu Content */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="absolute bottom-0 left-0 right-0 bg-gray-950 border-t border-white/10 rounded-t-3xl max-h-[85vh] overflow-hidden"
            >
              {/* Handle bar */}
              <div className="flex justify-center py-3">
                <div className="w-10 h-1 bg-gray-700 rounded-full" />
              </div>

              {/* Content */}
              <div className="px-4 pb-6 overflow-y-auto max-h-[60vh]">
                {/* Main Navigation */}
                <div className="grid grid-cols-3 gap-2 mb-6">
                  <Link
                    to="/"
                    onClick={() => setIsOpen(false)}
                    className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all ${
                      location.pathname === '/'
                        ? 'bg-cyan-500/20 border-cyan-500/30 text-cyan-400'
                        : 'bg-white/5 border-white/10 text-gray-400'
                    }`}
                  >
                    <FaHome className="text-lg mb-1" />
                    <span className="text-xs">Home</span>
                  </Link>
                  <Link
                    to="/company"
                    onClick={() => setIsOpen(false)}
                    className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all ${
                      location.pathname === '/company'
                        ? 'bg-cyan-500/20 border-cyan-500/30 text-cyan-400'
                        : 'bg-white/5 border-white/10 text-gray-400'
                    }`}
                  >
                    <FaBuilding className="text-lg mb-1" />
                    <span className="text-xs">About</span>
                  </Link>
                  <Link
                    to="/contact"
                    onClick={() => setIsOpen(false)}
                    className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all ${
                      location.pathname === '/contact'
                        ? 'bg-cyan-500/20 border-cyan-500/30 text-cyan-400'
                        : 'bg-white/5 border-white/10 text-gray-400'
                    }`}
                  >
                    <FaEnvelope className="text-lg mb-1" />
                    <span className="text-xs">Contact</span>
                  </Link>
                </div>

                {/* Products */}
                <div className="mb-4">
                  <h3 className="text-xs text-gray-500 uppercase tracking-wider mb-3">Our Products</h3>
                  <div className="space-y-2">
                    {products.map((product, index) => {
                      const Icon = product.icon;
                      return (
                        <Link
                          key={index}
                          to={product.path}
                          onClick={() => setIsOpen(false)}
                          className="flex items-center justify-between p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                              <Icon className="text-cyan-400" />
                            </div>
                            <div>
                              <span className="text-white font-medium text-sm">{product.title}</span>
                              <p className="text-xs text-gray-500">{product.description}</p>
                            </div>
                          </div>
                          <FaArrowRight className="text-gray-500 text-sm" />
                        </Link>
                      );
                    })}
                  </div>
                </div>

                {/* View All Solutions */}
                <Link
                  to="/solutions"
                  onClick={() => setIsOpen(false)}
                  className="block w-full py-3 text-center text-cyan-400 text-sm font-medium border border-cyan-500/30 rounded-xl"
                >
                  View All Solutions →
                </Link>
              </div>

              {/* Bottom CTA - Always Visible */}
              <div className="px-4 py-4 border-t border-white/10 bg-gray-950">
                <div className="flex gap-2">
                  <a
                    href="tel:+16163263328"
                    onClick={handleTalkToAIClick}
                    className="flex-1 flex items-center justify-center gap-2 py-3 bg-white/10 border border-white/20 text-white font-medium rounded-xl"
                  >
                    <FaPhone />
                    <span>Talk to AI</span>
                  </a>
                  <Link
                    to="/demo"
                    onClick={() => { handleBookDemoClick(); setIsOpen(false); }}
                    className="flex-1 flex items-center justify-center gap-2 py-3 bg-white text-black font-medium rounded-xl"
                  >
                    <span>Book Demo</span>
                    <FaArrowRight className="text-[10px]" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer */}
      <div className="h-[60px]" />
    </div>
  );
};

export default MobileNavbarRedesigned;
