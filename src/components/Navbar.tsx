import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes, FaPhone, FaRobot, FaChartBar, FaCogs, FaSearchDollar, FaComments, FaArrowRight } from 'react-icons/fa';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showSolutionsMenu, setShowSolutionsMenu] = useState(false);
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
  }, [location]);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Solutions', path: '/solutions', hasDropdown: true },
    { name: 'Company', path: '/company' },
    { name: 'Contact', path: '/contact' }
  ];

  const products = [
    { icon: FaComments, title: 'AI Chatbot', description: 'Convert visitors 24/7 on any channel', path: '/chatbot' },
    { icon: FaPhone, title: 'AI Receptionist', description: 'Never miss a call, book appointments', path: '/solutions/ai-receptionist' },
    { icon: FaCogs, title: 'Workflow Automation', description: 'Connect tools, eliminate manual work', path: '/solutions/workflow-automation' },
    { icon: FaSearchDollar, title: 'AI Audit', description: 'Discover AI opportunities in your business', path: '/solutions/ai-audit' },
    { icon: FaChartBar, title: 'Business Intelligence', description: 'Data-driven decisions with AI insights', path: '/solutions/business-intelligence' },
    { icon: FaRobot, title: 'Custom AI', description: 'Bespoke solutions for unique challenges', path: '/solutions/custom-ai' }
  ];

  return (
    <>
      <nav
        className={`fixed w-full top-[48px] z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-black/80 backdrop-blur-md border-b border-white/10'
            : 'bg-black/60 backdrop-blur-sm'
        }`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-2 -ml-6"
              aria-label="Cognia AI Home"
            >
              <img
                src="/cognia-c-icon.png"
                alt="Cognia"
                className="h-16 w-auto"
                style={{
                  filter: 'drop-shadow(0 0 10px rgba(168, 139, 250, 0.9)) drop-shadow(0 0 20px rgba(96, 165, 250, 0.7))'
                }}
              />
              <span
                className="text-3xl font-medium text-white tracking-tight"
                style={{
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                  textShadow: '0 0 15px rgba(168, 139, 250, 0.6), 0 0 30px rgba(96, 165, 250, 0.4)'
                }}
              >
                Cognia
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navItems.map((item) => (
                <div
                  key={item.path}
                  className="relative"
                  onMouseEnter={() => item.hasDropdown && setShowSolutionsMenu(true)}
                  onMouseLeave={() => item.hasDropdown && setShowSolutionsMenu(false)}
                >
                  <Link
                    to={item.path}
                    className={`text-sm font-medium transition-colors duration-200 ${
                      location.pathname === item.path
                        ? 'text-white'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {item.name}
                  </Link>

                  {/* Mega Menu Dropdown - Solutions */}
                  {item.hasDropdown && showSolutionsMenu && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 w-screen max-w-3xl">
                      <div className="bg-black/95 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl">
                        <h3 className="text-xs uppercase tracking-widest text-gray-500 mb-4">
                          Our Products
                        </h3>
                        <div className="grid grid-cols-2 gap-3">
                          {products.map((product, idx) => (
                            <Link
                              key={idx}
                              to={product.path}
                              className="flex items-start gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors group"
                            >
                              <div className="w-10 h-10 bg-cyan-500/10 border border-cyan-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                                <product.icon className="text-cyan-400 text-sm" />
                              </div>
                              <div>
                                <div className="text-sm font-medium text-white group-hover:text-cyan-400 transition-colors">
                                  {product.title}
                                </div>
                                <div className="text-xs text-gray-400 mt-0.5">
                                  {product.description}
                                </div>
                              </div>
                            </Link>
                          ))}
                        </div>
                        <div className="mt-4 pt-4 border-t border-white/10">
                          <Link
                            to="/solutions"
                            className="flex items-center gap-2 text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
                          >
                            View all solutions
                            <FaArrowRight className="text-xs" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {/* Desktop CTA Buttons */}
              <div className="flex items-center gap-3 ml-4">
                <Link
                  to="/demo"
                  className="flex items-center gap-2 px-5 py-2.5 bg-white hover:bg-neutral-100 text-black text-sm font-medium rounded-lg transition-colors"
                >
                  Book a Demo
                  <FaArrowRight className="text-[10px]" />
                </Link>

                <a
                  href="tel:+16163263328"
                  className="flex items-center gap-2 px-4 py-2.5 border border-neutral-700 hover:border-neutral-600 hover:bg-neutral-900 text-white text-sm font-medium rounded-lg transition-colors"
                >
                  <FaPhone className="text-xs" />
                  Talk to AI
                </a>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 text-gray-400 hover:text-white transition-colors"
              aria-label="Toggle mobile menu"
              aria-expanded={isOpen}
            >
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation - Clean */}
        {isOpen && (
          <div className="lg:hidden bg-black/95 backdrop-blur-md border-t border-white/10">
            <div className="container mx-auto px-4 py-4 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    location.pathname === item.path
                      ? 'bg-white/10 text-white'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {item.name}
                </Link>
              ))}

              {/* Mobile CTAs */}
              <div className="pt-3 border-t border-white/10 space-y-2">
                <Link
                  to="/demo"
                  onClick={() => setIsOpen(false)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white text-black text-sm font-medium rounded-lg"
                >
                  Book a Demo
                  <FaArrowRight className="text-[10px]" />
                </Link>

                <a
                  href="tel:+16163263328"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center gap-2 py-2.5 text-sm text-white hover:text-gray-300 transition-colors"
                >
                  <FaPhone className="text-xs" />
                  Talk to AI
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Spacer to prevent content from being hidden under fixed navbar + announcement banner */}
      <div className="h-[128px]" />
    </>
  );
};

export default Navbar;