import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaComments, FaTimes, FaWhatsapp, FaPhone, FaEnvelope, FaCalendarCheck } from 'react-icons/fa';
import conversionTracker from '../utils/conversionTracking';
import { useLeadCapture } from '../contexts/LeadCaptureContext';

const FloatingQuickContact: React.FC = () => {
  const { openLeadCapture } = useLeadCapture();
  const [isOpen, setIsOpen] = useState(false);
  const [showCallbackForm, setShowCallbackForm] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [callbackSent, setCallbackSent] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Show after user has been on page for 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleCallbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber) return;

    conversionTracker.trackFormSubmission('instant_callback');
    conversionTracker.trackButtonClick('Request Callback', 'floating_contact');

    // In a real implementation, this would send to your backend
    console.log('Callback requested:', phoneNumber);

    setCallbackSent(true);
    setTimeout(() => {
      setCallbackSent(false);
      setShowCallbackForm(false);
      setPhoneNumber('');
      setIsOpen(false);
    }, 3000);
  };

  const contactOptions = [
    {
      icon: FaPhone,
      label: 'Talk to AI',
      sublabel: 'Instant AI conversation',
      href: 'tel:+16163263328',
      color: 'from-green-500 to-emerald-500',
      onClick: () => {
        conversionTracker.trackPhoneCall('+16163263328');
        conversionTracker.trackButtonClick('Talk to AI', 'floating_contact');
      },
    },
    {
      icon: FaWhatsapp,
      label: 'WhatsApp',
      sublabel: 'Quick message',
      href: 'https://wa.me/16163263328?text=Hi,%20I%27m%20interested%20in%20Cognia%20AI',
      color: 'from-green-600 to-green-500',
      target: '_blank',
      onClick: () => {
        conversionTracker.trackButtonClick('WhatsApp', 'floating_contact');
      },
    },
    {
      icon: FaCalendarCheck,
      label: 'Book Demo',
      sublabel: 'Schedule 30 mins',
      color: 'from-cyan-500 to-blue-500',
      isButton: true,
      onClick: () => {
        conversionTracker.trackDemoBooking('floating_contact');
        conversionTracker.trackButtonClick('Book Demo', 'floating_contact');
        openLeadCapture('floating_contact');
      },
    },
    {
      icon: FaEnvelope,
      label: 'Email',
      sublabel: 'Get a response in 24h',
      href: 'mailto:emrebenian@cogniaai.com?subject=Interest%20in%20Cognia%20AI',
      color: 'from-purple-500 to-pink-500',
      onClick: () => {
        conversionTracker.trackButtonClick('Email', 'floating_contact');
      },
    },
  ];

  if (!isVisible) return null;

  return (
    <>
      {/* CSS for desktop positioning */}
      <style>{`
        .floating-contact {
          bottom: 24px;
          right: 24px;
        }
        @media (max-width: 1023px) {
          .floating-contact {
            bottom: 100px; /* Above sticky CTA */
            right: 16px;
          }
        }
      `}</style>

      <div className="floating-contact fixed z-40">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="absolute bottom-16 right-0 w-72 bg-gray-950 border border-white/10 rounded-2xl shadow-2xl shadow-black/50 overflow-hidden"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 px-4 py-3 border-b border-white/10">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-semibold text-white">Quick Contact</div>
                    <div className="text-xs text-gray-400">Choose your preferred way</div>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
                  >
                    <FaTimes className="text-gray-400" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-3">
                {!showCallbackForm ? (
                  <div className="space-y-2">
                    {contactOptions.map((option, index) => {
                      const Icon = option.icon;
                      const Component = option.isButton ? motion.button : motion.a;
                      const componentProps = option.isButton
                        ? { onClick: option.onClick }
                        : {
                            href: option.href,
                            target: option.target,
                            rel: option.target ? 'noopener noreferrer' : undefined,
                            onClick: option.onClick
                          };

                      return (
                        <Component
                          key={index}
                          {...componentProps}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="flex items-center gap-3 p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all group w-full text-left"
                        >
                          <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${option.color} flex items-center justify-center`}>
                            <Icon className="text-white" />
                          </div>
                          <div className="flex-1">
                            <div className="text-sm font-medium text-white group-hover:text-cyan-400 transition-colors">
                              {option.label}
                            </div>
                            <div className="text-xs text-gray-500">{option.sublabel}</div>
                          </div>
                        </Component>
                      );
                    })}

                    {/* Request Callback Option */}
                    <button
                      onClick={() => setShowCallbackForm(true)}
                      className="w-full flex items-center gap-3 p-3 bg-white/5 hover:bg-white/10 border border-dashed border-white/20 rounded-xl transition-all group"
                    >
                      <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                        <FaPhone className="text-gray-400" />
                      </div>
                      <div className="flex-1 text-left">
                        <div className="text-sm font-medium text-gray-300">
                          Request Callback
                        </div>
                        <div className="text-xs text-gray-500">We'll call you back</div>
                      </div>
                    </button>
                  </div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    {!callbackSent ? (
                      <form onSubmit={handleCallbackSubmit} className="space-y-3">
                        <div>
                          <label className="block text-xs text-gray-400 mb-1">Your Phone Number</label>
                          <input
                            type="tel"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            placeholder="+1 (555) 123-4567"
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50"
                            required
                          />
                        </div>
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => setShowCallbackForm(false)}
                            className="flex-1 py-2.5 bg-white/5 border border-white/10 rounded-xl text-gray-400 text-sm"
                          >
                            Back
                          </button>
                          <button
                            type="submit"
                            className="flex-1 py-2.5 bg-cyan-500 text-white font-semibold rounded-xl text-sm"
                          >
                            Call Me
                          </button>
                        </div>
                        <p className="text-[10px] text-gray-500 text-center">
                          We'll call within 5 minutes during business hours
                        </p>
                      </form>
                    ) : (
                      <div className="text-center py-4">
                        <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                          <FaPhone className="text-green-400 text-xl" />
                        </div>
                        <div className="text-white font-medium">We'll call you soon!</div>
                        <div className="text-xs text-gray-400 mt-1">Expect a call within 5 minutes</div>
                      </div>
                    )}
                  </motion.div>
                )}
              </div>

              {/* Footer */}
              <div className="px-4 py-2 bg-white/5 border-t border-white/10">
                <p className="text-[10px] text-gray-500 text-center">
                  Average response time: &lt;5 min
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Toggle Button */}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative w-14 h-14 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full shadow-lg shadow-cyan-500/30 flex items-center justify-center"
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <FaTimes className="text-white text-xl" />
              </motion.div>
            ) : (
              <motion.div
                key="open"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <FaComments className="text-white text-xl" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Notification dot */}
          {!isOpen && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-gray-950 flex items-center justify-center"
            >
              <span className="text-[8px] text-white font-bold">1</span>
            </motion.div>
          )}
        </motion.button>
      </div>
    </>
  );
};

export default FloatingQuickContact;
