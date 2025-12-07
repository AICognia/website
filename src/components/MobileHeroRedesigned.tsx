import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPhone, FaCalendarCheck, FaArrowRight } from 'react-icons/fa';
import conversionTracker from '../utils/conversionTracking';

const rotatingWords = ['deals', 'patients', 'jobs', 'clients', 'customers'];

const MobileHeroRedesigned: React.FC = () => {
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="lg:hidden">
      {/* Mobile Hero */}
      <div className="relative min-h-[100dvh] flex flex-col bg-black overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-950/20 via-black to-black" />

        {/* Content container */}
        <div className="relative z-10 flex-1 flex flex-col justify-center px-6 py-16">
          {/* Main headline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-6"
          >
            <h1 className="text-5xl font-light text-white mb-3 leading-tight">
              Your AI
              <br />
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Receptionist
              </span>
            </h1>
          </motion.div>

          {/* Subheadline with rotating word */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-center text-gray-400 text-lg mb-10"
          >
            Never miss a call. Close more{' '}
            <span className="inline-block w-24 text-left">
              <AnimatePresence mode="wait">
                <motion.span
                  key={wordIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="text-cyan-400 font-medium"
                >
                  {rotatingWords[wordIndex]}.
                </motion.span>
              </AnimatePresence>
            </span>
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-3"
          >
            {/* Primary CTA - Book a Demo */}
            <a
              href="https://calendly.com/emrebenian-cogniaai/30min"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                conversionTracker.trackDemoBooking('mobile_hero_primary');
                conversionTracker.trackButtonClick('Book a Demo', 'mobile_hero_primary');
              }}
              className="block w-full"
            >
              <div className="bg-white text-black py-4 rounded-xl flex items-center justify-center gap-2 font-semibold text-lg">
                <FaCalendarCheck />
                <span>Book a Demo</span>
                <FaArrowRight className="text-sm" />
              </div>
            </a>

            {/* Secondary CTA - Talk to AI */}
            <a
              href="tel:+16163263328"
              onClick={() => {
                conversionTracker.trackPhoneCall('+16163263328');
                conversionTracker.trackButtonClick('Talk to AI', 'mobile_hero_secondary');
              }}
              className="block w-full"
            >
              <div className="border border-white/20 text-white py-4 rounded-xl flex items-center justify-center gap-2 font-medium">
                <FaPhone className="text-sm" />
                <span>Talk to AI</span>
                <span className="text-gray-500 text-sm">+1 616-326-3328</span>
              </div>
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="grid grid-cols-3 gap-4 mt-12"
          >
            {[
              { value: '24/7', label: 'Available' },
              { value: '95%', label: 'Satisfaction' },
              { value: '1 Week', label: 'Setup' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-2xl font-bold text-cyan-400">{stat.value}</div>
                <div className="text-xs text-gray-500 uppercase tracking-wide">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="w-6 h-10 border border-white/30 rounded-full flex justify-center pt-2"
          >
            <div className="w-1 h-1 bg-white/50 rounded-full" />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default MobileHeroRedesigned;
