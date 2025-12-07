import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPhone, FaCalendarCheck, FaShieldAlt, FaClock, FaHeadset, FaCheckCircle } from 'react-icons/fa';
import MobileSoundVisualizer from './MobileSoundVisualizer';
import conversionTracker from '../utils/conversionTracking';

const rotatingWords = ['deals', 'patients', 'jobs', 'clients', 'customers'];

const MobileHeroRedesigned: React.FC = () => {
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="lg:hidden">
      {/* Mobile-optimized Hero Section */}
      <div className="relative min-h-[100vh] flex flex-col px-4 pt-6 pb-8 overflow-hidden bg-black">
        {/* Subtle gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-950/20 via-black to-black" />

        {/* Trust Badge Strip - Above the fold */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="relative z-10 flex items-center justify-center gap-4 py-2 mb-4"
        >
          <div className="flex items-center gap-1.5 text-xs text-gray-400">
            <FaShieldAlt className="text-green-400 text-[10px]" />
            <span>HIPAA</span>
          </div>
          <div className="w-1 h-1 bg-gray-600 rounded-full" />
          <div className="flex items-center gap-1.5 text-xs text-gray-400">
            <FaHeadset className="text-green-400 text-[10px]" />
            <span>24/7</span>
          </div>
          <div className="w-1 h-1 bg-gray-600 rounded-full" />
          <div className="flex items-center gap-1.5 text-xs text-gray-400">
            <FaClock className="text-green-400 text-[10px]" />
            <span>1 Week Setup</span>
          </div>
        </motion.div>

        {/* Content Container */}
        <div className="relative z-10 flex-1 flex flex-col justify-center">
          {/* Main Headline - Clear Value Proposition with AI */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-center mb-4"
          >
            <h1 className="text-[2.5rem] leading-[1.1] font-bold text-white mb-3">
              Your AI
              <br />
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Receptionist
              </span>
            </h1>
            <p className="text-base text-gray-400 leading-relaxed max-w-[300px] mx-auto">
              AI handles every call 24/7. You close more{' '}
              <span className="relative inline-block w-20 h-5 align-bottom overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={wordIndex}
                    initial={{ y: 15, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -15, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute left-0 text-cyan-400 font-medium"
                  >
                    {rotatingWords[wordIndex]}.
                  </motion.span>
                </AnimatePresence>
              </span>
            </p>
          </motion.div>

          {/* Stats Row - Immediate Social Proof */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-4 gap-2 mb-6"
          >
            {[
              { value: '24/7', label: 'Available' },
              { value: '0.5s', label: 'Response' },
              { value: '76%', label: 'Cost Less' },
              { value: '95%', label: 'Satisfied' },
            ].map((stat, i) => (
              <div key={i} className="text-center py-2 px-1 bg-white/5 rounded-lg border border-white/10">
                <div className="text-lg font-bold text-cyan-400">{stat.value}</div>
                <div className="text-[10px] text-gray-500 uppercase">{stat.label}</div>
              </div>
            ))}
          </motion.div>

          {/* Sound Visualizer Demo */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-6"
          >
            <MobileSoundVisualizer />
          </motion.div>

          {/* Primary CTA - Phone Call (Lowest Friction) */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="space-y-3"
          >
            {/* Primary: Talk to AI */}
            <a
              href="tel:+16163263328"
              onClick={() => {
                conversionTracker.trackPhoneCall('+16163263328');
                conversionTracker.trackButtonClick('Talk to AI', 'mobile_hero_primary');
              }}
              className="block w-full"
            >
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl blur opacity-40" />
                <div className="relative bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold py-4 px-6 rounded-xl flex items-center justify-center gap-3 shadow-lg shadow-green-500/25">
                  <div className="bg-white/20 p-2 rounded-lg">
                    <FaPhone className="text-lg animate-pulse" />
                  </div>
                  <div className="text-left">
                    <div className="text-lg">Talk to AI</div>
                    <div className="text-xs text-white/80 font-normal">+1 616-326-3328</div>
                  </div>
                </div>
              </div>
            </a>

            {/* Secondary: Book Demo */}
            <a
              href="https://calendly.com/emrebenian-cogniaai/30min"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                conversionTracker.trackDemoBooking('mobile_hero_secondary');
                conversionTracker.trackButtonClick('Book Demo', 'mobile_hero_secondary');
              }}
              className="block w-full"
            >
              <div className="bg-white/5 backdrop-blur border border-white/20 text-white font-semibold py-3.5 px-6 rounded-xl flex items-center justify-center gap-3 hover:bg-white/10 transition-colors">
                <FaCalendarCheck className="text-cyan-400" />
                <span>Schedule Free Demo</span>
              </div>
            </a>
          </motion.div>

          {/* Micro-trust below CTAs */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex items-center justify-center gap-4 mt-4 text-xs text-gray-500"
          >
            <span className="flex items-center gap-1">
              <FaClock className="text-cyan-400" />
              1 Week Setup
            </span>
            <span className="flex items-center gap-1">
              <FaCheckCircle className="text-cyan-400" />
              Free Trial
            </span>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="absolute bottom-4 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center pt-2"
          >
            <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full" />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default MobileHeroRedesigned;
