import React from 'react';
import { motion } from 'framer-motion';
import { FaArrowRight, FaPhone } from 'react-icons/fa';
import conversionTracker from '../utils/conversionTracking';

const OptimizedHero: React.FC = () => {
  return (
    <section className="relative min-h-screen bg-black text-white overflow-hidden flex items-center">
      {/* Tech Background Layers */}
      <div className="absolute inset-0">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950/20 to-slate-950" />

        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2306B6D4' fill-opacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        {/* Animated Tech Lines */}
        <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
          <motion.line
            x1="0" y1="20%" x2="100%" y2="20%"
            stroke="url(#gradient1)"
            strokeWidth="1"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
          <motion.line
            x1="0" y1="80%" x2="100%" y2="80%"
            stroke="url(#gradient2)"
            strokeWidth="1"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeInOut", delay: 0.5 }}
          />
          <defs>
            <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#06B6D4" stopOpacity="0" />
              <stop offset="50%" stopColor="#06B6D4" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#06B6D4" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0" />
              <stop offset="50%" stopColor="#3B82F6" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>

        {/* Floating Tech Particles */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-cyan-400 rounded-full animate-pulse opacity-50" />
          <div className="absolute top-3/4 right-1/4 w-2 h-2 bg-blue-400 rounded-full animate-pulse opacity-50 animation-delay-2000" />
          <div className="absolute bottom-1/4 left-1/2 w-2 h-2 bg-purple-400 rounded-full animate-pulse opacity-50 animation-delay-4000" />
        </div>

        {/* Gradient Overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/50" />
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-12 py-12 z-10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center"
          >
            {/* Tech Badge with Line */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="inline-block mb-8"
            >
              <div className="flex items-center gap-4">
                <div className="h-[1px] w-12 sm:w-24 bg-gradient-to-r from-transparent to-cyan-500" />
                <div className="px-4 py-1.5 bg-cyan-500/10 border border-cyan-500/30 rounded-full">
                  <span className="text-xs font-semibold text-cyan-400 uppercase tracking-widest">
                    AI-Powered Solution
                  </span>
                </div>
                <div className="h-[1px] w-12 sm:w-24 bg-gradient-to-l from-transparent to-cyan-500" />
              </div>
            </motion.div>

            {/* Main Headline with Tech Style */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-thin mb-2">
              <span className="block">
                <span className="font-extralight text-gray-400">Next Gen</span>
              </span>
              <span className="block font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                AI Call Center
              </span>
            </h1>

            {/* Subheadline with Line Accent */}
            <div className="flex items-center justify-center gap-3 mt-6 mb-8">
              <div className="h-[1px] w-8 bg-gradient-to-r from-transparent to-gray-600" />
              <p className="text-sm sm:text-base md:text-lg text-gray-400 font-light max-w-2xl">
                Handles every call. Books every appointment. Never sleeps.
              </p>
              <div className="h-[1px] w-8 bg-gradient-to-l from-transparent to-gray-600" />
            </div>

            {/* Tech Stats Grid - Ultra Thin */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto mb-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-transparent rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative bg-black/50 backdrop-blur-sm border border-cyan-500/20 rounded-lg p-3 sm:p-4">
                  <div className="text-2xl sm:text-3xl font-bold text-cyan-400">24/7</div>
                  <div className="text-[9px] sm:text-[10px] text-gray-500 uppercase tracking-wider">Available</div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-transparent rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative bg-black/50 backdrop-blur-sm border border-blue-500/20 rounded-lg p-3 sm:p-4">
                  <div className="text-2xl sm:text-3xl font-bold text-blue-400">0.5s</div>
                  <div className="text-[9px] sm:text-[10px] text-gray-500 uppercase tracking-wider">Response</div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-transparent rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative bg-black/50 backdrop-blur-sm border border-purple-500/20 rounded-lg p-3 sm:p-4">
                  <div className="text-2xl sm:text-3xl font-bold text-purple-400">76%</div>
                  <div className="text-[9px] sm:text-[10px] text-gray-500 uppercase tracking-wider">Cost Less</div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-transparent rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative bg-black/50 backdrop-blur-sm border border-green-500/20 rounded-lg p-3 sm:p-4">
                  <div className="text-2xl sm:text-3xl font-bold text-green-400">10-20%</div>
                  <div className="text-[9px] sm:text-[10px] text-gray-500 uppercase tracking-wider">More Sales</div>
                </div>
              </motion.div>
            </div>

            {/* CTAs with Tech Style */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              {/* Primary CTA - Gradient Tech Button */}
              <motion.a
                href="https://calendly.com/emrebenian-cogniaai/30min"
                onClick={() => {
                  conversionTracker.trackDemoBooking('hero_cta');
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group relative w-full sm:w-auto"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg blur opacity-60 group-hover:opacity-100 transition duration-200"></div>
                <div className="relative flex items-center justify-center gap-3 px-8 py-4 bg-black rounded-lg leading-none">
                  <span className="text-base font-semibold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                    Start Free Trial
                  </span>
                  <FaArrowRight className="text-cyan-400 text-sm group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.a>

              {/* Secondary CTA - Ghost Tech Button */}
              <motion.a
                href="tel:+16163263328"
                onClick={() => {
                  conversionTracker.trackPhoneCall('+16163263328');
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="relative group w-full sm:w-auto"
              >
                <div className="relative flex items-center justify-center gap-3 px-8 py-4 bg-black/50 backdrop-blur-sm border border-gray-700 hover:border-cyan-500/50 rounded-lg transition-all duration-200">
                  <FaPhone className="text-cyan-400 text-sm" />
                  <span className="text-base font-medium text-gray-300 group-hover:text-cyan-400 transition-colors">
                    Call Live Demo
                  </span>
                </div>
              </motion.a>
            </div>

            {/* Bottom Tech Line with Features */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-10 flex flex-col items-center gap-4"
            >
              <div className="flex items-center gap-6 text-[10px] sm:text-xs text-gray-500 font-light">
                <span className="flex items-center gap-1">
                  <div className="w-1 h-1 bg-cyan-400 rounded-full" />
                  HIPAA Compliant
                </span>
                <span className="hidden sm:flex items-center gap-1">
                  <div className="w-1 h-1 bg-blue-400 rounded-full" />
                  SOC 2 Certified
                </span>
                <span className="flex items-center gap-1">
                  <div className="w-1 h-1 bg-purple-400 rounded-full" />
                  48hr Setup
                </span>
                <span className="hidden sm:flex items-center gap-1">
                  <div className="w-1 h-1 bg-green-400 rounded-full" />
                  No Card Required
                </span>
              </div>
              <div className="h-[1px] w-32 bg-gradient-to-r from-transparent via-gray-700 to-transparent" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default OptimizedHero;