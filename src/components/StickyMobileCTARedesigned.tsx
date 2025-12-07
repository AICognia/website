import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPhone, FaCalendar, FaTimes, FaWhatsapp, FaChevronUp } from 'react-icons/fa';
import conversionTracker from '../utils/conversionTracking';

// Urgency messages that rotate
const urgencyMessages = [
  { text: '1 Week Free Trial', highlight: 'Free' },
  { text: '48hr Setup Guarantee', highlight: '48hr' },
  { text: 'No Credit Card Required', highlight: 'Free' },
  { text: 'Join 50+ Businesses', highlight: '50+' },
];

const StickyMobileCTARedesigned: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [dismissCount, setDismissCount] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);

  // Rotate urgency messages
  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % urgencyMessages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Smart visibility based on scroll
  const handleScroll = useCallback(() => {
    const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;

    // Show after 15% scroll
    if (scrollPercentage > 15 && !isDismissed) {
      setIsVisible(true);
    }

    // Hide near bottom (footer area)
    if (scrollPercentage > 90) {
      setIsVisible(false);
    }

    // Re-show after dismissal if user scrolls significantly (re-engagement)
    if (isDismissed && dismissCount < 2) {
      const scrollDelta = Math.abs(window.scrollY - (window as any).lastScrollY || 0);
      if (scrollDelta > 500) {
        setIsDismissed(false);
        (window as any).lastScrollY = window.scrollY;
      }
    }
  }, [isDismissed, dismissCount]);

  useEffect(() => {
    (window as any).lastScrollY = window.scrollY;
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const handleDismiss = () => {
    setIsDismissed(true);
    setDismissCount((prev) => prev + 1);
    setIsExpanded(false);
  };

  const currentMessage = urgencyMessages[messageIndex];

  return (
    <>
      {/* CSS-based mobile detection - only shows on screens < 1024px */}
      <style>{`
        .sticky-mobile-cta {
          display: block;
        }
        @media (min-width: 1024px) {
          .sticky-mobile-cta {
            display: none !important;
          }
        }
      `}</style>

      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="sticky-mobile-cta fixed bottom-0 left-0 right-0 z-50"
          >
            {/* Main Container */}
            <div className="bg-gray-950 border-t border-cyan-500/30 shadow-2xl shadow-cyan-500/10">
              {/* Dismiss button */}
              <button
                onClick={handleDismiss}
                className="absolute -top-3 right-3 w-6 h-6 bg-gray-800 border border-gray-700 rounded-full flex items-center justify-center text-gray-400 hover:text-white transition-colors z-10"
                aria-label="Dismiss"
              >
                <FaTimes className="text-xs" />
              </button>

              {/* Urgency Banner */}
              <div className="bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-cyan-500/20 py-1.5 px-4">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={messageIndex}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.2 }}
                    className="text-center text-xs text-gray-300"
                  >
                    <span className="text-cyan-400 font-semibold">{currentMessage.highlight}</span>
                    {' '}{currentMessage.text.replace(currentMessage.highlight, '').trim()}
                  </motion.p>
                </AnimatePresence>
              </div>

              {/* Expandable section */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 py-3 bg-gray-900/50 border-b border-white/5">
                      <div className="grid grid-cols-2 gap-2">
                        {/* WhatsApp */}
                        <a
                          href="https://wa.me/16163263328?text=Hi,%20I'm%20interested%20in%20Cognia%20AI"
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => conversionTracker.trackButtonClick('WhatsApp', 'sticky_cta')}
                          className="flex items-center justify-center gap-2 py-2.5 bg-green-600 text-white text-sm font-medium rounded-lg"
                        >
                          <FaWhatsapp />
                          <span>WhatsApp</span>
                        </a>

                        {/* Email */}
                        <a
                          href="mailto:emrebenian@cogniaai.com?subject=Interest%20in%20Cognia%20AI"
                          onClick={() => conversionTracker.trackButtonClick('Email', 'sticky_cta')}
                          className="flex items-center justify-center gap-2 py-2.5 bg-white/10 text-white text-sm font-medium rounded-lg border border-white/10"
                        >
                          <span>Email Us</span>
                        </a>
                      </div>

                      {/* Trust indicators */}
                      <div className="flex items-center justify-center gap-4 mt-3 text-[10px] text-gray-500">
                        <span>✓ HIPAA Compliant</span>
                        <span>✓ SOC2 Certified</span>
                        <span>✓ 24/7 Support</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Main CTA Buttons */}
              <div className="p-3">
                <div className="flex gap-2">
                  {/* Call Now - Primary */}
                  <motion.a
                    href="tel:+16163263328"
                    whileTap={{ scale: 0.97 }}
                    onClick={() => {
                      conversionTracker.trackPhoneCall('+16163263328');
                      conversionTracker.trackButtonClick('Call Now', 'sticky_cta');
                    }}
                    className="flex-1 flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold rounded-xl shadow-lg shadow-green-500/25"
                  >
                    <FaPhone className="animate-pulse" />
                    <span>Call Now</span>
                  </motion.a>

                  {/* Book Demo - Secondary */}
                  <motion.a
                    href="https://calendly.com/emrebenian-cogniaai/30min"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileTap={{ scale: 0.97 }}
                    onClick={() => {
                      conversionTracker.trackDemoBooking('sticky_cta');
                      conversionTracker.trackButtonClick('Book Demo', 'sticky_cta');
                    }}
                    className="flex-1 flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold rounded-xl shadow-lg shadow-cyan-500/25"
                  >
                    <FaCalendar />
                    <span>Book Demo</span>
                  </motion.a>

                  {/* Expand Button */}
                  <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="w-12 flex items-center justify-center bg-white/5 border border-white/10 rounded-xl"
                    aria-label={isExpanded ? 'Show less options' : 'Show more options'}
                  >
                    <motion.div
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <FaChevronUp className="text-gray-400" />
                    </motion.div>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Safe area spacer for iOS */}
      <div className="sticky-mobile-cta h-[env(safe-area-inset-bottom,0px)]" />
    </>
  );
};

export default StickyMobileCTARedesigned;
