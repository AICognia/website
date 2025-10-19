import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar: React.FC = () => {
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

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Solutions', path: '/solutions' },
    { name: 'About', path: '/company' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-gray-950/95 backdrop-blur-lg border-b border-gray-800' : 'bg-gray-950/80 backdrop-blur-md'
    }`}>
      <div className="container mx-auto pl-3 pr-6">
        <div className="flex justify-between items-center h-20">
          {/* Logo Text */}
          <Link to="/" className="flex items-center">
            <span className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">
              Cognia AI
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-lg font-medium transition-colors hover:text-cyan-400 ${
                  location.pathname === item.path
                    ? 'text-cyan-400'
                    : 'text-gray-300'
                }`}
              >
                {item.name}
              </Link>
            ))}
            <a
              href="https://calendly.com/emrebenian-cogniaai/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-4 px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-teal-500 text-white font-bold rounded-lg hover:shadow-xl hover:shadow-cyan-500/25 transition-all transform hover:scale-105"
            >
              Book a Call
            </a>
          </div>

          {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-300 hover:text-cyan-400 transition-colors"
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
              <div className="py-4 space-y-2 bg-gray-900/95">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`block px-4 py-3 rounded-lg text-lg font-medium transition-colors ${
                      location.pathname === item.path
                        ? 'bg-gray-800 text-cyan-400'
                        : 'text-gray-300 hover:bg-gray-800 hover:text-cyan-400'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
                <a
                  href="https://calendly.com/emrebenian-cogniaai/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsOpen(false)}
                  className="block mx-4 mt-4 px-6 py-3 bg-gradient-to-r from-cyan-500 to-teal-500 text-white text-center font-semibold rounded-lg hover:shadow-lg hover:shadow-cyan-500/25 transition-all"
                >
                  Book a Call
                </a>
              </div>
        </motion.div>
      )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar; 