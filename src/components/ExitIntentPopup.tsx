import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaGift, FaArrowRight, FaClock } from 'react-icons/fa';
import CountdownTimer from './CountdownTimer';

const ExitIntentPopup: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    // Check if popup was already shown this session
    const popupShown = sessionStorage.getItem('exitPopupShown');
    if (popupShown) {
      setHasShown(true);
      return;
    }

    const handleMouseLeave = (e: MouseEvent) => {
      // Only trigger on desktop and when mouse leaves from top
      if (e.clientY <= 0 && !hasShown && window.innerWidth > 768) {
        setIsVisible(true);
        setHasShown(true);
        sessionStorage.setItem('exitPopupShown', 'true');
      }
    };

    // Add delay before enabling exit intent
    const timer = setTimeout(() => {
      document.addEventListener('mouseleave', handleMouseLeave);
    }, 5000); // Wait 5 seconds before enabling

    return () => {
      clearTimeout(timer);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [hasShown]);

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleClaim = () => {
    window.open('https://calendly.com/emrebenian-cogniaai/30min', '_blank');
    handleClose();
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100]"
            onClick={handleClose}
          />

          {/* Popup */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl z-[101]"
          >
            <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl shadow-2xl border border-cyan-500/30 overflow-hidden">
              {/* Close button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-lg"
                aria-label="Close"
              >
                <FaTimes className="text-xl" />
              </button>

              {/* Header with gradient */}
              <div className="bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 px-8 pt-8 pb-4">
                <div className="flex items-center justify-center mb-4">
                  <div className="bg-gradient-to-r from-yellow-500 to-orange-500 p-3 rounded-full animate-pulse">
                    <FaGift className="text-3xl text-white" />
                  </div>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-2">
                  Wait! Don't Leave Empty-Handed
                </h2>
                <p className="text-center text-cyan-400 text-lg font-semibold">
                  Exclusive Offer for New Customers Only
                </p>
              </div>

              {/* Content */}
              <div className="px-8 py-6">
                {/* Offer Box */}
                <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border-2 border-green-500/30 rounded-2xl p-6 mb-6">
                  <div className="text-center mb-4">
                    <p className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400 mb-2">
                      $3,000
                    </p>
                    <p className="text-xl text-white font-semibold">
                      In Free AI Credits
                    </p>
                    <p className="text-gray-400 text-sm mt-2">
                      Plus 50% off your first 3 months
                    </p>
                  </div>

                  {/* Benefits list */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-gray-300">
                      <span className="text-green-400">✓</span>
                      <span>Free setup & onboarding (worth $2,000)</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                      <span className="text-green-400">✓</span>
                      <span>24/7 priority support for 90 days</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                      <span className="text-green-400">✓</span>
                      <span>Custom AI voice & personality training</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                      <span className="text-green-400">✓</span>
                      <span>30-day money-back guarantee</span>
                    </div>
                  </div>

                  {/* Countdown */}
                  <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-3 mb-4">
                    <div className="flex items-center justify-center gap-2">
                      <FaClock className="text-red-400 animate-pulse" />
                      <CountdownTimer label="Offer expires in:" />
                    </div>
                  </div>

                  {/* CTA Button */}
                  <motion.button
                    onClick={handleClaim}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-500 text-white font-bold text-lg py-4 rounded-xl flex items-center justify-center gap-3 hover:shadow-2xl hover:shadow-cyan-500/30 transition-all duration-300"
                  >
                    <span>Claim Your $3,000 Credit</span>
                    <FaArrowRight className="animate-pulse" />
                  </motion.button>
                </div>

                {/* Urgency text */}
                <p className="text-center text-gray-400 text-sm">
                  <span className="text-orange-400 font-semibold">⚠️ Important:</span> This one-time offer won't be shown again
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ExitIntentPopup;