import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMessageCircle, FiX } from 'react-icons/fi';

const StickyChat: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsVisible(scrollTop > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToContact = () => {
    const contactCTA = document.querySelector('.contact-cta-section');
    if (contactCTA) {
      contactCTA.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen(!isOpen)}
              className="bg-gradient-primary text-white p-4 rounded-full shadow-2xl hover:shadow-secondary/30 relative group"
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90 }}
                    animate={{ rotate: 0 }}
                    exit={{ rotate: 90 }}
                  >
                    <FiX size={24} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="open"
                    initial={{ rotate: 90 }}
                    animate={{ rotate: 0 }}
                    exit={{ rotate: -90 }}
                  >
                    <FiMessageCircle size={24} />
                  </motion.div>
                )}
              </AnimatePresence>
              
              {/* Pulse effect */}
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-secondary"></span>
              </span>
            </motion.button>

            {/* Chat popup */}
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute bottom-20 right-0 w-80 bg-white rounded-2xl shadow-2xl overflow-hidden"
                >
                  <div className="bg-gradient-primary p-4">
                    <h4 className="text-white font-semibold">Hemen İletişime Geçin!</h4>
                    <p className="text-white/90 text-sm mt-1">Size nasıl yardımcı olabiliriz?</p>
                  </div>
                  
                  <div className="p-4 space-y-3">
                    <button
                      onClick={scrollToContact}
                      className="w-full bg-secondary/10 hover:bg-secondary/20 text-darkBlue font-medium py-3 px-4 rounded-lg transition-colors text-left"
                    >
                      💬 WhatsApp'tan Yazın
                    </button>
                    <button
                      onClick={scrollToContact}
                      className="w-full bg-primary/10 hover:bg-primary/20 text-darkBlue font-medium py-3 px-4 rounded-lg transition-colors text-left"
                    >
                      📞 Hemen Arayın
                    </button>
                    <button
                      onClick={scrollToContact}
                      className="w-full bg-gradient-primary text-white font-medium py-3 px-4 rounded-lg hover:opacity-90 transition-opacity"
                    >
                      🚀 Ücretsiz Demo İsteyin
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default StickyChat; 