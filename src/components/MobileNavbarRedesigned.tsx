import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaBars, FaTimes, FaPhone, FaCalendarCheck, FaHome, FaBuilding, FaEnvelope,
  FaHospital, FaGavel, FaStore, FaHotel, FaCar, FaCalendar, FaLanguage,
  FaCog, FaRobot, FaChartLine, FaUsers, FaFileAlt, FaHeadset, FaClock,
  FaShieldAlt, FaShoppingCart, FaArrowRight, FaStar
} from 'react-icons/fa';

// Quick access items - most popular destinations
const quickLinks = [
  { icon: FaHospital, title: 'Healthcare', path: '/industries/healthcare', badge: 'Popular' },
  { icon: FaGavel, title: 'Legal', path: '/industries/legal' },
  { icon: FaHeadset, title: '24/7 Support', path: '/features/call-handling' },
  { icon: FaCalendar, title: 'Scheduling', path: '/features/smart-scheduling' },
];

// All solutions in a flat grid
const allSolutions = [
  // Industries
  { icon: FaHospital, title: 'Healthcare', path: '/industries/healthcare', category: 'industry' },
  { icon: FaGavel, title: 'Legal', path: '/industries/legal', category: 'industry' },
  { icon: FaStore, title: 'Retail', path: '/industries/retail', category: 'industry' },
  { icon: FaBuilding, title: 'Enterprise', path: '/industries/enterprise', category: 'industry' },
  { icon: FaHotel, title: 'Hospitality', path: '/industries/hospitality', category: 'industry' },
  { icon: FaCar, title: 'Automotive', path: '/industries/automotive', category: 'industry' },
  { icon: FaHome, title: 'Home Services', path: '/industries/home-services', category: 'industry' },
  // Features
  { icon: FaPhone, title: 'Call Handling', path: '/features/call-handling', category: 'feature' },
  { icon: FaCalendar, title: 'Scheduling', path: '/features/smart-scheduling', category: 'feature' },
  { icon: FaLanguage, title: 'Multi-Language', path: '/features/multi-language', category: 'feature' },
  { icon: FaCog, title: 'CRM Integration', path: '/features/crm-integration', category: 'feature' },
  { icon: FaRobot, title: 'Natural AI', path: '/features/natural-conversations', category: 'feature' },
  { icon: FaChartLine, title: 'Analytics', path: '/features/analytics-dashboard', category: 'feature' },
  // Use Cases
  { icon: FaUsers, title: 'Patient Scheduling', path: '/usecases/patient-scheduling', category: 'usecase' },
  { icon: FaFileAlt, title: 'Client Intake', path: '/usecases/client-intake', category: 'usecase' },
  { icon: FaHeadset, title: 'Customer Support', path: '/usecases/customer-support', category: 'usecase' },
  { icon: FaClock, title: 'After-Hours', path: '/usecases/after-hours-service', category: 'usecase' },
  { icon: FaShieldAlt, title: 'Lead Qualification', path: '/usecases/lead-qualification', category: 'usecase' },
  { icon: FaShoppingCart, title: 'Order Processing', path: '/usecases/order-processing', category: 'usecase' },
];

const MobileNavbarRedesigned: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState<'quick' | 'all'>('quick');
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
    setActiveTab('quick');
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

              {/* Tab Navigation */}
              <div className="flex gap-2 px-4 mb-4">
                <button
                  onClick={() => setActiveTab('quick')}
                  className={`flex-1 py-2.5 px-4 rounded-xl text-sm font-medium transition-all ${
                    activeTab === 'quick'
                      ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                      : 'bg-white/5 text-gray-400 border border-white/10'
                  }`}
                >
                  Quick Access
                </button>
                <button
                  onClick={() => setActiveTab('all')}
                  className={`flex-1 py-2.5 px-4 rounded-xl text-sm font-medium transition-all ${
                    activeTab === 'all'
                      ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                      : 'bg-white/5 text-gray-400 border border-white/10'
                  }`}
                >
                  All Solutions
                </button>
              </div>

              {/* Content */}
              <div className="px-4 pb-6 overflow-y-auto max-h-[55vh]">
                <AnimatePresence mode="wait">
                  {activeTab === 'quick' ? (
                    <motion.div
                      key="quick"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-3"
                    >
                      {/* Main Navigation */}
                      <div className="grid grid-cols-3 gap-2 mb-4">
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

                      {/* Popular Solutions */}
                      <div className="mb-2">
                        <h3 className="text-xs text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-2">
                          <FaStar className="text-yellow-500" /> Popular
                        </h3>
                      </div>

                      {quickLinks.map((item, index) => {
                        const Icon = item.icon;
                        return (
                          <Link
                            key={index}
                            to={item.path}
                            onClick={() => setIsOpen(false)}
                            className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                                <Icon className="text-cyan-400" />
                              </div>
                              <span className="text-white font-medium">{item.title}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              {item.badge && (
                                <span className="text-[10px] px-2 py-0.5 bg-cyan-500/20 text-cyan-400 rounded-full">
                                  {item.badge}
                                </span>
                              )}
                              <FaArrowRight className="text-gray-500 text-sm" />
                            </div>
                          </Link>
                        );
                      })}

                      {/* View All Button */}
                      <button
                        onClick={() => setActiveTab('all')}
                        className="w-full py-3 text-center text-cyan-400 text-sm font-medium"
                      >
                        View All Solutions →
                      </button>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="all"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.2 }}
                    >
                      {/* Industries */}
                      <div className="mb-4">
                        <h3 className="text-xs text-gray-500 uppercase tracking-wider mb-2">Industries</h3>
                        <div className="grid grid-cols-3 gap-2">
                          {allSolutions.filter(s => s.category === 'industry').map((item, index) => {
                            const Icon = item.icon;
                            return (
                              <Link
                                key={index}
                                to={item.path}
                                onClick={() => setIsOpen(false)}
                                className="flex flex-col items-center p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all"
                              >
                                <Icon className="text-cyan-400 mb-1" />
                                <span className="text-xs text-gray-300 text-center">{item.title}</span>
                              </Link>
                            );
                          })}
                        </div>
                      </div>

                      {/* Features */}
                      <div className="mb-4">
                        <h3 className="text-xs text-gray-500 uppercase tracking-wider mb-2">Features</h3>
                        <div className="grid grid-cols-3 gap-2">
                          {allSolutions.filter(s => s.category === 'feature').map((item, index) => {
                            const Icon = item.icon;
                            return (
                              <Link
                                key={index}
                                to={item.path}
                                onClick={() => setIsOpen(false)}
                                className="flex flex-col items-center p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all"
                              >
                                <Icon className="text-purple-400 mb-1" />
                                <span className="text-xs text-gray-300 text-center">{item.title}</span>
                              </Link>
                            );
                          })}
                        </div>
                      </div>

                      {/* Use Cases */}
                      <div>
                        <h3 className="text-xs text-gray-500 uppercase tracking-wider mb-2">Use Cases</h3>
                        <div className="grid grid-cols-3 gap-2">
                          {allSolutions.filter(s => s.category === 'usecase').map((item, index) => {
                            const Icon = item.icon;
                            return (
                              <Link
                                key={index}
                                to={item.path}
                                onClick={() => setIsOpen(false)}
                                className="flex flex-col items-center p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all"
                              >
                                <Icon className="text-green-400 mb-1" />
                                <span className="text-xs text-gray-300 text-center">{item.title}</span>
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Bottom CTA - Always Visible */}
              <div className="px-4 py-4 border-t border-white/10 bg-gray-950">
                <div className="flex gap-2">
                  <a
                    href="tel:+16163263328"
                    className="flex-1 flex items-center justify-center gap-2 py-3 bg-green-500 text-white font-semibold rounded-xl"
                  >
                    <FaPhone />
                    <span>Talk to AI</span>
                  </a>
                  <a
                    href="https://calendly.com/emrebenian-cogniaai/30min"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 py-3 bg-cyan-500 text-white font-semibold rounded-xl"
                  >
                    <FaCalendarCheck />
                    <span>Book Demo</span>
                  </a>
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
