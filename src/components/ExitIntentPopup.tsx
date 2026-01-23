'use client'
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaGift, FaEnvelope, FaCheckCircle, FaPhone, FaChartLine } from 'react-icons/fa';
import conversionTracker from '../utils/conversionTracking';

interface ExitIntentPopupProps {
  onEmailCapture?: (email: string) => void;
}

const ExitIntentPopup: React.FC<ExitIntentPopupProps> = ({ onEmailCapture }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasShown, setHasShown] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState<'roi' | 'guide' | null>(null);

  // Check if popup has been shown before in this session
  useEffect(() => {
    const exitPopupShown = sessionStorage.getItem('exitPopupShown');
    if (exitPopupShown) {
      setHasShown(true);
    }
  }, []);

  // Desktop: Mouse leave detection
  const handleMouseLeave = useCallback((e: MouseEvent) => {
    if (e.clientY <= 0 && !hasShown && !isVisible) {
      setIsVisible(true);
      setHasShown(true);
      sessionStorage.setItem('exitPopupShown', 'true');
      conversionTracker.trackButtonClick('Exit Intent Triggered', 'exit_popup');
    }
  }, [hasShown, isVisible]);

  // Mobile: Back button / visibility change detection
  const handleVisibilityChange = useCallback(() => {
    if (document.visibilityState === 'hidden' && !hasShown) {
      // Store that we should show popup when they come back
      sessionStorage.setItem('showExitOnReturn', 'true');
    } else if (document.visibilityState === 'visible') {
      const shouldShow = sessionStorage.getItem('showExitOnReturn');
      if (shouldShow && !hasShown && !isVisible) {
        sessionStorage.removeItem('showExitOnReturn');
        setIsVisible(true);
        setHasShown(true);
        sessionStorage.setItem('exitPopupShown', 'true');
        conversionTracker.trackButtonClick('Exit Intent Mobile', 'exit_popup');
      }
    }
  }, [hasShown, isVisible]);

  // Idle detection (show after 60 seconds of no interaction)
  useEffect(() => {
    let idleTimer: NodeJS.Timeout;

    const resetIdleTimer = () => {
      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => {
        if (!hasShown && !isVisible) {
          setIsVisible(true);
          setHasShown(true);
          sessionStorage.setItem('exitPopupShown', 'true');
          conversionTracker.trackButtonClick('Idle Intent', 'exit_popup');
        }
      }, 60000); // 60 seconds
    };

    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
    events.forEach(event => {
      document.addEventListener(event, resetIdleTimer, { passive: true });
    });

    resetIdleTimer();

    return () => {
      clearTimeout(idleTimer);
      events.forEach(event => {
        document.removeEventListener(event, resetIdleTimer);
      });
    };
  }, [hasShown, isVisible]);

  useEffect(() => {
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [handleMouseLeave, handleVisibilityChange]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !selectedOffer) return;

    conversionTracker.trackFormSubmission('exit_popup_' + selectedOffer);

    onEmailCapture?.(email);

    setIsSubmitted(true);
  };

  const handleClose = () => {
    setIsVisible(false);
    conversionTracker.trackButtonClick('Exit Popup Closed', 'exit_popup');
  };

  const offers = [
    {
      id: 'roi' as const,
      icon: FaChartLine,
      title: 'Free ROI Analysis',
      description: 'Get a personalized revenue impact report for your business',
      color: 'cyan',
    },
    {
      id: 'guide' as const,
      icon: FaGift,
      title: 'AI Call Center Guide',
      description: 'Complete guide to implementing AI for your call center',
      color: 'purple',
    },
  ];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={handleClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="relative w-full max-w-md bg-gray-950 border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 p-2 hover:bg-transparent/10 rounded-lg transition-colors z-10"
            >
              <FaTimes className="text-gray-400" />
            </button>

            {!isSubmitted ? (
              <>
                <div className="bg-gradient-to-r from-primary/20 via-purple-500/20 to-primary/20 px-6 py-8 text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: 'spring' }}
                    className="w-16 h-16 bg-gradient-to-r from-primary to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4"
                  >
                    <FaGift className="text-white text-2xl" />
                  </motion.div>
                  <h2 className="text-2xl font-serif font-normal text-white mb-2">
                    Wait! Don't Leave Empty-Handed
                  </h2>
                  <p className="text-gray-400 text-sm">
                    Get a free resource to help transform your customer calls
                  </p>
                </div>

                <div className="p-6">
                  {/* Offer Selection */}
                  <div className="space-y-3 mb-6">
                    {offers.map((offer) => {
                      const Icon = offer.icon;
                      const isSelected = selectedOffer === offer.id;
                      return (
                        <button
                          key={offer.id}
                          onClick={() => setSelectedOffer(offer.id)}
                          className={`w-full flex items-start gap-4 p-4 rounded-xl border transition-all text-left ${
                            isSelected
                              ? `bg-${offer.color}-500/10 border-${offer.color}-500/30`
                              : 'bg-white/5 border-white/10 hover:border-white/20'
                          }`}
                        >
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                            isSelected ? `bg-${offer.color}-500/20` : 'bg-transparent/10'
                          }`}>
                            <Icon className={isSelected ? `text-${offer.color}-400` : 'text-gray-400'} />
                          </div>
                          <div className="flex-1">
                            <div className={`font-medium ${isSelected ? 'text-white' : 'text-gray-300'}`}>
                              {offer.title}
                            </div>
                            <div className="text-xs text-gray-500 mt-0.5">
                              {offer.description}
                            </div>
                          </div>
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                            isSelected ? 'border-primary-light bg-primary-light' : 'border-gray-600'
                          }`}>
                            {isSelected && <FaCheckCircle className="text-black text-xs" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Email Form */}
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="relative">
                      <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-primary/50"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={!selectedOffer}
                      className={`w-full py-4 rounded-xl font-bold transition-all ${
                        selectedOffer
                          ? 'bg-gradient-to-r from-primary to-primary-dark text-white'
                          : 'bg-gray-800 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      Send Me The Free Resource
                    </button>
                  </form>

                  {/* Alternative CTA */}
                  <div className="mt-4 text-center">
                    <p className="text-xs text-gray-500 mb-2">Or talk to us directly</p>
                    <a
                      href="tel:+16163263328"
                      onClick={() => {
                        conversionTracker.trackPhoneCall('+16163263328');
                        handleClose();
                      }}
                      className="inline-flex items-center gap-2 text-primary text-sm hover:text-primary-light"
                    >
                      <FaPhone />
                      <span>+1 616-326-3328</span>
                    </a>
                  </div>

                  <p className="text-[10px] text-gray-600 text-center mt-4">
                    No spam, ever. Unsubscribe anytime.
                  </p>
                </div>
              </>
            ) : (
              /* Success State */
              <div className="p-8 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6"
                >
                  <FaCheckCircle className="text-green-400 text-4xl" />
                </motion.div>
                <h3 className="text-2xl font-serif font-normal text-white mb-2">
                  Check Your Email!
                </h3>
                <p className="text-gray-400 mb-6">
                  We've sent your {selectedOffer === 'roi' ? 'ROI Analysis' : 'AI Guide'} to {email}
                </p>
                <button
                  onClick={handleClose}
                  className="px-6 py-3 bg-transparent/10 hover:bg-transparent/20 text-white rounded-xl transition-colors"
                >
                  Continue Browsing
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ExitIntentPopup;
