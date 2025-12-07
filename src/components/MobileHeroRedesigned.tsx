import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPhone, FaCalendarCheck, FaShieldAlt, FaClock, FaHeadset, FaCheckCircle, FaPlay, FaStar, FaArrowRight } from 'react-icons/fa';
import MobileSoundVisualizer from './MobileSoundVisualizer';
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
      {/* Mobile-optimized Hero Section */}
      <div className="relative min-h-[100dvh] flex flex-col px-5 pt-3 pb-6 overflow-hidden bg-black">
        {/* Premium gradient background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-cyan-950/30 via-black to-black" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-3xl" />
        </div>

        {/* Trust Badge Strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="relative z-10 flex items-center justify-center gap-3 py-2 mb-2"
        >
          <div className="flex items-center gap-1.5 text-[11px] text-gray-400">
            <FaShieldAlt className="text-green-400 text-[9px]" />
            <span>HIPAA Compliant</span>
          </div>
          <div className="w-px h-3 bg-gray-700" />
          <div className="flex items-center gap-1.5 text-[11px] text-gray-400">
            <FaHeadset className="text-green-400 text-[9px]" />
            <span>24/7 Live</span>
          </div>
          <div className="w-px h-3 bg-gray-700" />
          <div className="flex items-center gap-1.5 text-[11px] text-gray-400">
            <FaClock className="text-green-400 text-[9px]" />
            <span>1 Week Setup</span>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="relative z-10 flex-1 flex flex-col">
          {/* Headline Section */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-center mb-5"
          >
            <h1 className="text-[2.75rem] leading-[1.05] font-bold text-white mb-3 tracking-tight">
              Your AI
              <br />
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Receptionist
              </span>
            </h1>
            <p className="text-[15px] text-gray-400 leading-relaxed max-w-[280px] mx-auto">
              Never miss a call. Close more{' '}
              <span className="relative inline-block w-[72px] h-[18px] align-bottom overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={wordIndex}
                    initial={{ y: 12, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -12, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="absolute left-0 text-cyan-400 font-semibold"
                  >
                    {rotatingWords[wordIndex]}.
                  </motion.span>
                </AnimatePresence>
              </span>
            </p>
          </motion.div>

          {/* Value Proposition Cards */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="grid grid-cols-2 gap-2.5 mb-5"
          >
            <div className="bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-sm rounded-xl p-3 border border-white/10">
              <div className="text-2xl font-bold text-white mb-0.5">10-20%</div>
              <div className="text-[11px] text-gray-400">More Revenue</div>
            </div>
            <div className="bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-sm rounded-xl p-3 border border-white/10">
              <div className="text-2xl font-bold text-white mb-0.5">76%</div>
              <div className="text-[11px] text-gray-400">Cost Reduction</div>
            </div>
          </motion.div>

          {/* Sound Visualizer - Compact */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="mb-5"
          >
            <MobileSoundVisualizer />
          </motion.div>

          {/* Primary CTA - Talk to AI */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.25 }}
            className="space-y-2.5"
          >
            <a
              href="tel:+16163263328"
              onClick={() => {
                conversionTracker.trackPhoneCall('+16163263328');
                conversionTracker.trackButtonClick('Talk to AI Now', 'mobile_hero_primary');
              }}
              className="block w-full"
            >
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl blur-lg opacity-50" />
                <div className="relative bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 px-5 rounded-2xl flex items-center justify-between shadow-2xl shadow-green-500/20">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 bg-white/20 rounded-xl flex items-center justify-center">
                      <FaPhone className="text-lg" />
                    </div>
                    <div>
                      <div className="text-[17px] font-bold">Talk to AI Now</div>
                      <div className="text-xs text-white/70">+1 616-326-3328</div>
                    </div>
                  </div>
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <FaPlay className="text-xs ml-0.5" />
                  </div>
                </div>
              </div>
            </a>

            {/* Secondary CTA - Book Demo */}
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
              <div className="bg-white text-black py-3.5 px-5 rounded-2xl flex items-center justify-center gap-2 font-semibold text-[15px]">
                <FaCalendarCheck className="text-black/70" />
                <span>Schedule Free Demo</span>
                <FaArrowRight className="text-xs text-black/50" />
              </div>
            </a>
          </motion.div>

          {/* Social Proof Row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="mt-5 pt-4 border-t border-white/5"
          >
            <div className="flex items-center justify-center gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} className="text-yellow-400 text-xs" />
              ))}
              <span className="text-xs text-gray-400 ml-1">4.9/5</span>
            </div>
            <div className="flex items-center justify-center gap-4 text-[11px] text-gray-500">
              <span className="flex items-center gap-1">
                <FaCheckCircle className="text-green-400" />
                Free Trial
              </span>
              <span className="flex items-center gap-1">
                <FaCheckCircle className="text-green-400" />
                No Credit Card
              </span>
              <span className="flex items-center gap-1">
                <FaCheckCircle className="text-green-400" />
                Cancel Anytime
              </span>
            </div>
          </motion.div>

          {/* Stats Row - Bottom */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.35 }}
            className="mt-auto pt-4"
          >
            <div className="grid grid-cols-3 gap-3">
              {[
                { value: '100K+', label: 'Calls Handled' },
                { value: '50+', label: 'Businesses' },
                { value: '95%', label: 'Satisfaction' },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-lg font-bold text-cyan-400">{stat.value}</div>
                  <div className="text-[10px] text-gray-500 uppercase tracking-wide">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator - Subtle */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          className="absolute bottom-2 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 4, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="w-5 h-8 border border-white/20 rounded-full flex justify-center pt-1.5"
          >
            <div className="w-1 h-1 bg-cyan-400/60 rounded-full" />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default MobileHeroRedesigned;
