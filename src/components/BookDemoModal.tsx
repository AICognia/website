import React, { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaCalendarAlt, FaCheckCircle, FaClock, FaShieldAlt } from 'react-icons/fa';

interface BookDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BookDemoModal: React.FC<BookDemoModalProps> = ({ isOpen, onClose }) => {
  // Handle escape key
  const handleEscape = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, handleEscape]);

  // Load Calendly widget script
  useEffect(() => {
    if (isOpen) {
      const script = document.createElement('script');
      script.src = 'https://assets.calendly.com/assets/external/widget.js';
      script.async = true;
      document.body.appendChild(script);

      return () => {
        // Clean up script if modal closes
        const existingScript = document.querySelector('script[src="https://assets.calendly.com/assets/external/widget.js"]');
        if (existingScript) {
          existingScript.remove();
        }
      };
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-4xl mx-4 max-h-[90vh] overflow-hidden"
          >
            {/* Modal Content */}
            <div className="bg-gradient-to-br from-gray-900 via-gray-900 to-gray-950 rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
              {/* Header */}
              <div className="relative px-6 py-5 border-b border-white/10 bg-black/30">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                      <FaCalendarAlt className="text-white text-lg" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-white">Schedule Your Demo</h2>
                      <p className="text-sm text-gray-400">30-minute consultation with our team</p>
                    </div>
                  </div>

                  {/* Close Button */}
                  <button
                    onClick={onClose}
                    className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 flex items-center justify-center text-gray-400 hover:text-white transition-all"
                    aria-label="Close modal"
                  >
                    <FaTimes className="text-lg" />
                  </button>
                </div>

                {/* Trust Indicators */}
                <div className="flex flex-wrap gap-4 mt-4 text-xs text-gray-500">
                  <span className="flex items-center gap-1.5">
                    <FaCheckCircle className="text-green-500" />
                    Free consultation
                  </span>
                  <span className="flex items-center gap-1.5">
                    <FaClock className="text-cyan-500" />
                    30 minutes
                  </span>
                  <span className="flex items-center gap-1.5">
                    <FaShieldAlt className="text-blue-500" />
                    No commitment
                  </span>
                </div>
              </div>

              {/* Calendly Embed */}
              <div className="relative bg-white" style={{ minHeight: '650px' }}>
                <div
                  className="calendly-inline-widget"
                  data-url="https://calendly.com/emrebenian-cogniaai/30min?hide_gdpr_banner=1&background_color=ffffff&text_color=1a1a1a&primary_color=0891b2"
                  style={{ minWidth: '320px', height: '650px' }}
                />
              </div>

              {/* Footer */}
              <div className="px-6 py-4 border-t border-white/10 bg-black/30">
                <p className="text-center text-xs text-gray-500">
                  By scheduling, you agree to our{' '}
                  <a href="/privacy-policy" className="text-cyan-500 hover:text-cyan-400 underline">
                    Privacy Policy
                  </a>
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default BookDemoModal;
