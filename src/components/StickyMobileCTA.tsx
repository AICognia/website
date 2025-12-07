import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPhone, FaCalendar, FaTimes } from 'react-icons/fa';

const StickyMobileCTA: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Show after user scrolls down 20%
    const handleScroll = () => {
      if (isDismissed) return;

      const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      setIsVisible(scrollPercentage > 20);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial scroll position

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isDismissed]);

  const handleDismiss = () => {
    setIsDismissed(true);
    setIsVisible(false);
  };

  // Only show on mobile devices
  if (typeof window !== 'undefined' && window.innerWidth > 768) {
    return null;
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-50 lg:hidden"
          style={{ minHeight: '110px', contain: 'layout' }}
        >
          {/* Background with gradient */}
          <div className="bg-gradient-to-t from-gray-950 via-gray-900 to-gray-900/95 backdrop-blur-2xl border-t border-cyan-500/30 shadow-2xl shadow-cyan-500/20">
            {/* Dismiss button */}
            <button
              onClick={handleDismiss}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-200 p-2"
              aria-label="Dismiss"
            >
              <FaTimes className="text-sm" />
            </button>

            {/* Free Trial Badge */}
            <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 py-1">
              <p className="text-center text-xs text-cyan-400 font-semibold">
                1 Week Free Trial Available
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="p-3">
              <div className="flex gap-2">
                <motion.a
                  href="https://calendly.com/emrebenian-cogniaai/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 bg-gradient-to-r from-cyan-500 to-cyan-400 text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-lg"
                >
                  <FaCalendar />
                  <span>Book Demo</span>
                </motion.a>

                <motion.a
                  href="tel:+16163263328"
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-lg"
                >
                  <FaPhone className="animate-pulse" />
                  <span>Talk to AI</span>
                </motion.a>
              </div>

              {/* Trust text */}
              <p className="text-center text-xs text-gray-400 mt-2">
                ✓ HIPAA Compliant • ✓ 1 Week Setup
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default StickyMobileCTA;