'use client'

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes, FaArrowRight } from 'react-icons/fa';
import { useTheme } from 'next-themes';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showSolutionsMenu, setShowSolutionsMenu] = useState(false);
  const [showIndustriesMenu, setShowIndustriesMenu] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Default to dark to prevent flash (dark is the default theme)
  const isDark = !mounted || resolvedTheme === 'dark';

  // Glass effect settings - different for light/dark
  const glassOpacity = isDark ? 0.55 : 0.30;
  const glassBlur = 12; // Reduced from 22px for better mobile performance

  // Hide on scroll functionality - using ref to avoid re-attaching listener
  useEffect(() => {
    let lastScrollYRef = 0;
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;

          // Show navbar if at top or scrolling up
          if (currentScrollY <= 0 || currentScrollY < lastScrollYRef) {
            setIsVisible(true);
          }
          // Hide navbar if scrolling down and past threshold
          else if (currentScrollY > lastScrollYRef && currentScrollY > 100) {
            setIsVisible(false);
          }

          lastScrollYRef = currentScrollY;
          setLastScrollY(currentScrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
    setShowSolutionsMenu(false);
    setShowIndustriesMenu(false);
  }, [pathname]);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'What We Do', path: '/what-we-do', hasDropdown: 'solutions' },
    { name: 'Industries', path: '/industries', hasDropdown: 'industries' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const solutions = [
    { name: 'Business Intelligence', path: '/business-intelligence', description: 'AI-powered data insights' },
    { name: 'Workflow Automation', path: '/solutions/workflow-automation', description: 'Eliminate repetitive tasks' },
    { name: 'Custom AI', path: '/solutions/custom-ai', description: 'AI built for your needs' },
    { name: 'AI Receptionist', path: '/products/ai-receptionist', description: '24/7 intelligent call handling' },
    { name: 'AI Chatbot', path: '/solutions/chatbot', description: 'Convert visitors into customers' },
    { name: 'AI Audit', path: '/ai-audit', description: 'Assess your AI readiness' },
  ];

  const industries = [
    { name: 'Healthcare', path: '/industries/healthcare' },
    { name: 'Legal Services', path: '/industries/legal' },
    { name: 'Hospitality', path: '/industries/hospitality' },
    { name: 'Retail / eCommerce', path: '/industries/retail' },
    { name: 'Automotive', path: '/industries/automotive' },
    { name: 'Manufacturing', path: '/industries/manufacturing' },
    { name: 'Service Businesses', path: '/industries/service-businesses' },
    { name: 'Real Estate', path: '/industries/real-estate' },
    { name: 'Construction', path: '/industries/construction' },
  ];

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 px-3 sm:px-6 md:px-16 lg:px-24 transition-transform duration-300 ease-in-out ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
        {/* Navbar Container */}
        <nav
          className={`
            mt-2 sm:mt-3 max-w-5xl h-12 sm:h-14 rounded-[1rem] sm:rounded-[1.25rem] border shadow-lg
            mx-auto flex items-center justify-between pl-3 sm:pl-6 pr-1.5 sm:pr-2.5
            transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
            overflow-hidden
            ${isDark
              ? 'border-blue-500/30 shadow-black/20'
              : 'border-[#e2e8f0] shadow-black/[0.03]'
            }
          `}
          style={{
            background: isDark
              ? `rgba(17, 24, 39, ${glassOpacity})`
              : `rgba(255, 255, 255, ${glassOpacity})`,
            backdropFilter: `blur(${glassBlur}px)`,
            WebkitBackdropFilter: `blur(${glassBlur}px)`,
            boxShadow: isDark
              ? 'inset 0 2px 4px rgba(120, 184, 255, 0.18), inset 0 1px 2px rgba(255, 255, 255, 0.12), inset 0 -2px 4px rgba(120, 184, 255, 0.1), 0 4px 12px rgba(0, 0, 0, 0.3)'
              : undefined,
          }}
        >
          {/* Logo */}
          <Link
            href="/"
            className="
              flex items-center gap-1.5 sm:gap-2 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] flex-shrink-0 -ml-1 sm:-ml-2 min-h-[44px] min-w-[44px]
            "
          >
            <img
              src="/cognia-c-icon.png"
              alt="Cognia AI - AI Receptionist & Voice Agents"
              width={24}
              height={24}
              className="h-5 w-5 sm:h-6 sm:w-6 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
              style={{
                filter: isDark
                  ? 'brightness(0) saturate(100%) invert(70%) sepia(50%) saturate(500%) hue-rotate(187deg) brightness(100%) contrast(90%)'
                  : 'brightness(0) saturate(100%) invert(37%) sepia(89%) saturate(925%) hue-rotate(187deg) brightness(91%) contrast(88%)'
              }}
            />
            <span className={`font-serif font-light tracking-tight text-base sm:text-lg transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${isDark ? 'text-gray-100' : 'text-slate-900'}`}>
              Cognia AI
            </span>
          </Link>

          {/* Desktop Nav Links - Center */}
          <div className="hidden md:flex items-center justify-center flex-1 gap-1 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]">
            {navItems.map((item) => {
              const isActive = pathname === item.path || (item.path !== '/' && pathname.startsWith(item.path));
              const isHighlighted = isActive ||
                (item.hasDropdown === 'solutions' && showSolutionsMenu) ||
                (item.hasDropdown === 'industries' && showIndustriesMenu);

              return (
                <div
                  key={item.name}
                  className="relative"
                >
                  {item.hasDropdown ? (
                    <div
                      className="dropdown-container"
                      onMouseEnter={() => {
                        if (item.hasDropdown === 'solutions') {
                          setShowSolutionsMenu(true);
                          setShowIndustriesMenu(false);
                        } else if (item.hasDropdown === 'industries') {
                          setShowIndustriesMenu(true);
                          setShowSolutionsMenu(false);
                        }
                      }}
                      onMouseLeave={() => {
                        if (item.hasDropdown === 'solutions') {
                          setShowSolutionsMenu(false);
                        } else if (item.hasDropdown === 'industries') {
                          setShowIndustriesMenu(false);
                        }
                      }}
                    >
                      <Link
                        href={item.path}
                        className={`
                          px-4 py-2 text-sm font-medium transition-all duration-150 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] inline-block min-w-[80px] text-center
                          ${isHighlighted
                            ? 'text-blue-600 dark:text-sky-300'
                            : 'text-slate-600 dark:text-gray-300 hover:text-slate-900 dark:hover:text-sky-300'
                          }
                        `}
                      >
                        {item.name}
                      </Link>
                    </div>
                  ) : (
                    <Link
                      href={item.path}
                      className={`
                        px-4 py-2 text-sm font-medium transition-all duration-150 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] inline-block min-w-[80px] text-center
                        ${isActive
                          ? 'text-blue-600 dark:text-sky-300'
                          : 'text-slate-600 dark:text-gray-300 hover:text-slate-900 dark:hover:text-sky-300'
                        }
                      `}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              );
            })}
          </div>

          {/* Desktop CTA */}
          <Link
            href="/demo"
            className="hidden md:flex btn-primary rounded-xl h-9 px-5 text-sm"
          >
            <span>Schedule a Consultation</span>
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2.5 rounded-lg transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center text-slate-700 dark:text-gray-300 hover:bg-slate-100 dark:hover:bg-gray-700"
            aria-label="Toggle menu"
          >
            {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
        </nav>

        {/* Solutions Dropdown */}
        <AnimatePresence>
          {showSolutionsMenu && (
            <div
              className="dropdown-container absolute z-40"
              style={{
                left: '50%',
                transform: 'translateX(-50%)',
                top: '100%'
              }}
              onMouseEnter={() => setShowSolutionsMenu(true)}
              onMouseLeave={() => setShowSolutionsMenu(false)}
            >
              <motion.div
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 4 }}
                transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                {/* Invisible bridge to connect navbar to dropdown */}
                <div
                  className="absolute bg-transparent"
                  style={{
                    top: '-12px',
                    left: '-40px',
                    right: '-40px',
                    height: '16px',
                    pointerEvents: 'auto'
                  }}
                />

                <div
                  className={`w-[420px] rounded-2xl border overflow-hidden ${isDark ? 'border-blue-500/30' : 'border-[#e2e8f0]'}`}
                  style={{
                    background: isDark
                      ? `rgba(17, 24, 39, 0.85)`
                      : `rgba(255, 255, 255, 0.85)`,
                    backdropFilter: `blur(${glassBlur}px)`,
                    WebkitBackdropFilter: `blur(${glassBlur}px)`,
                    boxShadow: isDark
                      ? 'inset 0 1px 2px rgba(120, 184, 255, 0.12), 0 8px 32px rgba(0, 0, 0, 0.4)'
                      : '0 8px 32px rgba(0, 0, 0, 0.08)',
                  }}
                >
                  {/* 2-Column Solutions Grid */}
                  <div className="p-4">
                    <div className="grid grid-cols-2 gap-1">
                      {solutions.map((item) => (
                        <Link
                          key={item.name}
                          href={item.path}
                          className={`px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${isDark ? 'hover:bg-white/5' : 'hover:bg-slate-50'}`}
                        >
                          <div className={isDark ? 'text-gray-200' : 'text-slate-700'}>{item.name}</div>
                          <div className={`text-[11px] font-normal mt-0.5 ${isDark ? 'text-gray-500' : 'text-slate-400'}`}>{item.description}</div>
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* All Solutions CTA Bar */}
                  <Link
                    href="/what-we-do"
                    className={`flex items-center justify-between px-5 py-3 border-t transition-colors ${isDark ? 'border-blue-500/20 hover:bg-blue-500/10' : 'border-slate-100 hover:bg-slate-50'}`}
                  >
                    <div>
                      <div className={`text-sm font-semibold ${isDark ? 'text-gray-200' : 'text-slate-700'}`}>View All Solutions</div>
                      <div className={`text-xs ${isDark ? 'text-gray-500' : 'text-slate-400'}`}>Explore our complete AI suite</div>
                    </div>
                    <div className={`p-2 rounded-lg ${isDark ? 'bg-blue-500/20 text-blue-400' : 'bg-primary/10 text-primary'}`}>
                      <FaArrowRight size={12} />
                    </div>
                  </Link>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Industries Dropdown */}
        <AnimatePresence>
          {showIndustriesMenu && (
            <div
              className="dropdown-container absolute z-40"
              style={{
                left: '50%',
                transform: 'translateX(-50%)',
                top: '100%'
              }}
              onMouseEnter={() => setShowIndustriesMenu(true)}
              onMouseLeave={() => setShowIndustriesMenu(false)}
            >
              <motion.div
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 4 }}
                transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                {/* Invisible bridge */}
                <div
                  className="absolute bg-transparent"
                  style={{
                    top: '-12px',
                    left: '-40px',
                    right: '-40px',
                    height: '16px',
                    pointerEvents: 'auto'
                  }}
                />

                <div
                  className={`w-[380px] rounded-2xl border overflow-hidden ${isDark ? 'border-blue-500/30' : 'border-[#e2e8f0]'}`}
                  style={{
                    background: isDark
                      ? `rgba(17, 24, 39, 0.85)`
                      : `rgba(255, 255, 255, 0.85)`,
                    backdropFilter: `blur(${glassBlur}px)`,
                    WebkitBackdropFilter: `blur(${glassBlur}px)`,
                    boxShadow: isDark
                      ? 'inset 0 1px 2px rgba(120, 184, 255, 0.12), 0 8px 32px rgba(0, 0, 0, 0.4)'
                      : '0 8px 32px rgba(0, 0, 0, 0.08)',
                  }}
                >
                  <div className="p-4">
                    <div className="grid grid-cols-2 gap-1">
                      {industries.map((item) => (
                        <Link
                          key={item.name}
                          href={item.path}
                          className={`block px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${isDark ? 'text-gray-200 hover:bg-white/5' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </header>

      {/* Mobile Navigation Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: "spring", damping: 35, stiffness: 350, mass: 0.8 }}
            className={`fixed inset-0 z-[60] md:hidden shadow-xl border ${isDark ? 'border-gray-700' : 'border-[#e2e8f0]'}`}
            style={{
              background: isDark
                ? `rgba(17, 24, 39, ${glassOpacity})`
                : `rgba(255, 255, 255, ${glassOpacity})`,
              backdropFilter: `blur(${glassBlur}px)`,
              WebkitBackdropFilter: `blur(${glassBlur}px)`,
            }}
          >
            <div className="flex flex-col h-full">
              <div className={`flex items-center justify-between px-4 sm:px-6 h-14 sm:h-16 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                <span className={`text-lg sm:text-xl font-semibold font-inter ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>Menu</span>
                <button onClick={() => setIsOpen(false)} className={`p-2.5 rounded-lg transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center ${isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-slate-50 hover:bg-slate-100'}`}>
                  <FaTimes size={20} className={isDark ? 'text-gray-300' : 'text-slate-600'} />
                </button>
              </div>
              <div className="flex flex-col p-4 sm:p-6 space-y-1 sm:space-y-2 overflow-y-auto">
                {navItems.filter(item => !item.hasDropdown).map((item) => (
                  <Link
                    key={item.name}
                    href={item.path}
                    onClick={() => setIsOpen(false)}
                    className="text-base sm:text-lg font-medium font-inter flex items-center justify-between px-3 sm:px-4 py-3 sm:py-4 rounded-xl transition-all duration-150 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] min-h-[44px] text-slate-700 dark:text-gray-200 hover:bg-slate-50 dark:hover:bg-gray-700 hover:text-slate-900 dark:hover:text-white"
                  >
                    {item.name}
                    <FaArrowRight size={14} className="text-slate-400 dark:text-gray-500" />
                  </Link>
                ))}

                {/* What We Do / Solutions Section */}
                <div className={`h-px w-full my-3 sm:my-4 ${isDark ? 'bg-gray-700' : 'bg-slate-100'}`} />
                <div className="space-y-1 sm:space-y-2 pt-1 sm:pt-2">
                  <div className={`inline-flex items-center gap-2 px-2.5 sm:px-3 py-1 rounded-lg mb-3 sm:mb-4 ml-3 sm:ml-4 ${isDark ? 'bg-blue-900/30 border border-blue-800/50' : 'bg-primary/5 border border-primary/10'}`}>
                    <span className={`text-[10px] sm:text-[11px] uppercase tracking-wider font-semibold font-inter ${isDark ? 'text-blue-400' : 'text-primary'}`}>
                      What We Do
                    </span>
                  </div>
                  <div className="grid grid-cols-1 gap-0.5 sm:gap-1">
                    {solutions.map(sol => (
                      <Link
                        key={sol.name}
                        href={sol.path}
                        onClick={() => setIsOpen(false)}
                        className="text-sm sm:text-[15px] font-medium font-inter px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg transition-all duration-150 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] min-h-[44px] flex items-center text-slate-600 dark:text-gray-300 hover:bg-slate-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100"
                      >
                        {sol.name}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Industries Section */}
                <div className={`h-px w-full my-3 sm:my-4 ${isDark ? 'bg-gray-700' : 'bg-slate-100'}`} />
                <div className="space-y-1 sm:space-y-2 pt-1 sm:pt-2">
                  <div className={`inline-flex items-center gap-2 px-2.5 sm:px-3 py-1 rounded-lg mb-3 sm:mb-4 ml-3 sm:ml-4 ${isDark ? 'bg-blue-900/30 border border-blue-800/50' : 'bg-primary/5 border border-primary/10'}`}>
                    <span className={`text-[10px] sm:text-[11px] uppercase tracking-wider font-semibold font-inter ${isDark ? 'text-blue-400' : 'text-primary'}`}>
                      Industries
                    </span>
                  </div>
                  <div className="grid grid-cols-1 gap-0.5 sm:gap-1">
                    {industries.map(ind => (
                      <Link
                        key={ind.name}
                        href={ind.path}
                        onClick={() => setIsOpen(false)}
                        className="text-sm sm:text-[15px] font-medium font-inter px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg transition-all duration-150 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] min-h-[44px] flex items-center text-slate-600 dark:text-gray-300 hover:bg-slate-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100"
                      >
                        {ind.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div className={`mt-auto p-4 sm:p-6 border-t ${isDark ? 'bg-gray-800/50 border-gray-700/80' : 'bg-slate-50/50 border-slate-100/80'}`}>
                <Link
                  href="/demo"
                  onClick={() => setIsOpen(false)}
                  className="btn-primary flex items-center justify-center gap-2 w-full h-12 sm:h-14 rounded-xl text-sm sm:text-[15px] min-h-[44px]"
                >
                  <span>Schedule a Consultation</span>
                  <FaArrowRight size={14} />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer removed to allow hero background to extend under navbar */}
      {/* <div className="h-16 sm:h-20" /> */}
    </>
  );
};

export default Navbar;
