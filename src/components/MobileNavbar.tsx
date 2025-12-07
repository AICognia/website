import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes, FaPhone, FaCalendarCheck, FaHome, FaBrain, FaBuilding, FaEnvelope, FaChevronDown, FaHospital, FaGavel, FaStore, FaHotel, FaCar, FaCalendar, FaLanguage, FaCog, FaRobot, FaChartLine, FaUsers, FaFileAlt, FaHeadset, FaClock, FaShieldAlt, FaShoppingCart } from 'react-icons/fa';
import { useLeadCapture } from '../contexts/LeadCaptureContext';

const MobileNavbar: React.FC = () => {
  const { openLeadCapture } = useLeadCapture();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showSolutions, setShowSolutions] = useState(false);
  const [showIndustries, setShowIndustries] = useState(false);
  const [showFeatures, setShowFeatures] = useState(false);
  const [showUseCases, setShowUseCases] = useState(false);
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
    { name: 'Company', path: '/company', icon: FaBuilding },
    { name: 'Contact', path: '/contact', icon: FaEnvelope }
  ];

  const solutionsData = {
    industries: [
      { icon: FaHospital, title: 'Healthcare', path: '/industries/healthcare' },
      { icon: FaGavel, title: 'Legal Services', path: '/industries/legal' },
      { icon: FaStore, title: 'Retail', path: '/industries/retail' },
      { icon: FaBuilding, title: 'Enterprise', path: '/industries/enterprise' },
      { icon: FaHotel, title: 'Hospitality', path: '/industries/hospitality' },
      { icon: FaCar, title: 'Automotive', path: '/industries/automotive' }
    ],
    features: [
      { icon: FaPhone, title: '24/7 Call Handling', path: '/features/call-handling' },
      { icon: FaCalendar, title: 'Smart Scheduling', path: '/features/smart-scheduling' },
      { icon: FaLanguage, title: 'Multi-Language', path: '/features/multi-language' },
      { icon: FaCog, title: 'CRM Integration', path: '/features/crm-integration' },
      { icon: FaRobot, title: 'Natural Conversations', path: '/features/natural-conversations' },
      { icon: FaChartLine, title: 'Analytics Dashboard', path: '/features/analytics-dashboard' }
    ],
    useCases: [
      { icon: FaUsers, title: 'Patient Scheduling', path: '/usecases/patient-scheduling' },
      { icon: FaFileAlt, title: 'Client Intake', path: '/usecases/client-intake' },
      { icon: FaHeadset, title: 'Customer Support', path: '/usecases/customer-support' },
      { icon: FaClock, title: 'After-Hours Service', path: '/usecases/after-hours-service' },
      { icon: FaShieldAlt, title: 'Lead Qualification', path: '/usecases/lead-qualification' },
      { icon: FaShoppingCart, title: 'Order Processing', path: '/usecases/order-processing' }
    ]
  };

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
            <Link to="/" className="flex items-center gap-2 mt-2 -ml-4">
              <img
                src="/cognia-c-icon.png"
                alt="Cognia"
                className="h-12 w-auto"
                style={{
                  filter: 'drop-shadow(0 0 8px rgba(168, 139, 250, 0.9)) drop-shadow(0 0 15px rgba(96, 165, 250, 0.7))'
                }}
              />
              <span
                className="text-2xl font-medium text-white tracking-tight"
                style={{
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                  textShadow: '0 0 12px rgba(168, 139, 250, 0.6), 0 0 25px rgba(96, 165, 250, 0.4)'
                }}
              >
                Cognia
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
              <div className="p-6 space-y-2 overflow-y-auto max-h-[calc(100vh-280px)]">
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

                {/* Solutions Dropdown */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navItems.length * 0.05 }}
                >
                  <button
                    onClick={() => setShowSolutions(!showSolutions)}
                    className="flex items-center justify-between w-full px-4 py-3 rounded-xl text-gray-300 hover:bg-white/5 hover:text-white transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <FaBrain className="text-lg" />
                      <span className="text-base font-medium">Solutions</span>
                    </div>
                    <motion.div
                      animate={{ rotate: showSolutions ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <FaChevronDown />
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {showSolutions && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden ml-4 mt-2 space-y-2"
                      >
                        {/* Industries */}
                        <button
                          onClick={() => setShowIndustries(!showIndustries)}
                          className="flex items-center justify-between w-full px-3 py-2 rounded-lg text-gray-400 hover:bg-white/5 hover:text-white transition-all text-sm"
                        >
                          <span>By Industry</span>
                          <FaChevronDown className={`transform transition-transform ${showIndustries ? 'rotate-180' : ''}`} />
                        </button>
                        {showIndustries && (
                          <div className="ml-3 space-y-1">
                            {solutionsData.industries.map((item, idx) => {
                              const Icon = item.icon;
                              return (
                                <Link
                                  key={idx}
                                  to={item.path}
                                  onClick={() => setIsOpen(false)}
                                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-400 hover:bg-white/5 hover:text-white transition-all text-sm"
                                >
                                  <Icon className="text-xs" />
                                  <span>{item.title}</span>
                                </Link>
                              );
                            })}
                          </div>
                        )}

                        {/* Features */}
                        <button
                          onClick={() => setShowFeatures(!showFeatures)}
                          className="flex items-center justify-between w-full px-3 py-2 rounded-lg text-gray-400 hover:bg-white/5 hover:text-white transition-all text-sm"
                        >
                          <span>By Feature</span>
                          <FaChevronDown className={`transform transition-transform ${showFeatures ? 'rotate-180' : ''}`} />
                        </button>
                        {showFeatures && (
                          <div className="ml-3 space-y-1">
                            {solutionsData.features.map((item, idx) => {
                              const Icon = item.icon;
                              return (
                                <Link
                                  key={idx}
                                  to={item.path}
                                  onClick={() => setIsOpen(false)}
                                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-400 hover:bg-white/5 hover:text-white transition-all text-sm"
                                >
                                  <Icon className="text-xs" />
                                  <span>{item.title}</span>
                                </Link>
                              );
                            })}
                          </div>
                        )}

                        {/* Use Cases */}
                        <button
                          onClick={() => setShowUseCases(!showUseCases)}
                          className="flex items-center justify-between w-full px-3 py-2 rounded-lg text-gray-400 hover:bg-white/5 hover:text-white transition-all text-sm"
                        >
                          <span>By Use Case</span>
                          <FaChevronDown className={`transform transition-transform ${showUseCases ? 'rotate-180' : ''}`} />
                        </button>
                        {showUseCases && (
                          <div className="ml-3 space-y-1">
                            {solutionsData.useCases.map((item, idx) => {
                              const Icon = item.icon;
                              return (
                                <Link
                                  key={idx}
                                  to={item.path}
                                  onClick={() => setIsOpen(false)}
                                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-400 hover:bg-white/5 hover:text-white transition-all text-sm"
                                >
                                  <Icon className="text-xs" />
                                  <span>{item.title}</span>
                                </Link>
                              );
                            })}
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
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
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      openLeadCapture('mobile_nav_legacy');
                    }}
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
                  </button>
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