import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPhone, FaCalendar, FaTimes } from 'react-icons/fa';
import BookDemoModal from './BookDemoModal';

const StickyMobileCTA: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    <>
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-50 lg:hidden"
          style={{ minHeight: '110px' }}
        >
          {/* Background with gradient */}
          <div className="relative bg-gradient-to-t from-gray-950 via-gray-900 to-gray-900/95 backdrop-blur-2xl border-t border-cyan-500/30 shadow-2xl shadow-cyan-500/20">
            {/* Dismiss button - larger touch target and higher z-index */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDismiss();
              }}
              className="absolute top-1 right-1 z-50 text-gray-400 hover:text-white active:text-white p-3 touch-manipulation"
              aria-label="Dismiss"
              type="button"
            >
              <FaTimes className="text-base" />
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
                <motion.button
                  onClick={() => setIsModalOpen(true)}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 bg-gradient-to-r from-cyan-500 to-cyan-400 text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                >
                  <FaCalendar />
                  <span>Book Demo</span>
                </motion.button>

                <motion.a
                  href="tel:+16163263328"
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-lg"
                >
                  <FaPhone className="animate-pulse" />
                  <span>Call Now</span>
                </motion.a>
              </div>

              {/* Trust text */}
              <p className="text-center text-xs text-gray-400 mt-2">
                ✓ HIPAA Compliant • ✓ Setup in 48hrs
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>

    {/* Book Demo Modal */}
    <BookDemoModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default StickyMobileCTA;