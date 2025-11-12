import React from 'react';
import { motion } from 'framer-motion';
import { FaArrowRight, FaPhone } from 'react-icons/fa';
import conversionTracker from '../utils/conversionTracking';

const OptimizedHero: React.FC = () => {
  return (
    <section className="relative min-h-screen bg-black text-white overflow-hidden flex items-center">
      {/* Premium Dark Gradient Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-slate-900 to-gray-950" />

        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}
        />

        {/* Premium Gradient Orbs - Very Subtle */}
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-cyan-500 rounded-full mix-blend-screen filter blur-3xl opacity-[0.03] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-blue-500 rounded-full mix-blend-screen filter blur-3xl opacity-[0.03] animate-pulse animation-delay-2000" />

        {/* Top Gradient Fade */}
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/50 to-transparent" />
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-12 py-12 z-10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center"
          >
            {/* Ultra-Thin Professional Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full border border-cyan-500/20"
            >
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
              <span className="text-xs font-medium text-cyan-400 uppercase tracking-wider">
                Enterprise AI Solution
              </span>
            </motion.div>

            {/* Main Headline - Professional & Bold */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-6 tracking-tight">
              <span className="block bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent pb-2">
                AI Call Center
              </span>
              <span className="block text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-gray-400 mt-2">
                That Never Sleeps
              </span>
            </h1>

            {/* Professional Subheadline */}
            <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mb-8 leading-relaxed font-light">
              Complete call center replacement with{" "}
              <span className="text-white font-medium">inbound & outbound calls</span>,{" "}
              <span className="text-white font-medium">lead qualification</span>, and{" "}
              <span className="text-white font-medium">appointment automation</span>.
            </p>

            {/* Ultra-Thin Stats Bar */}
            <div className="flex flex-wrap justify-center gap-3 sm:gap-6 mb-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0 }}
                className="text-center"
              >
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-cyan-300 bg-clip-text text-transparent">
                  24/7
                </div>
                <div className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-wider font-medium">
                  Availability
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-center"
              >
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent">
                  0.5s
                </div>
                <div className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-wider font-medium">
                  Response Time
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-center"
              >
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-purple-300 bg-clip-text text-transparent">
                  76%
                </div>
                <div className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-wider font-medium">
                  Cost Reduction
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-center"
              >
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-green-400 to-green-300 bg-clip-text text-transparent">
                  95%
                </div>
                <div className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-wider font-medium">
                  Satisfaction
                </div>
              </motion.div>
            </div>

            {/* Professional CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              {/* Primary CTA */}
              <motion.a
                href="https://calendly.com/emrebenian-cogniaai/30min"
                onClick={() => {
                  conversionTracker.trackDemoBooking('hero_cta');
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group relative inline-flex items-center justify-center gap-3 px-8 sm:px-10 py-4 sm:py-5 min-w-[200px] sm:min-w-[250px] overflow-hidden rounded-xl font-medium transition-all duration-300"
              >
                {/* Button Background */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-300 group-hover:scale-105" />

                {/* Button Glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-400 blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />

                {/* Button Content */}
                <div className="relative flex items-center gap-3 text-white">
                  <span className="text-base sm:text-lg font-semibold">Book Free Demo</span>
                  <FaArrowRight className="text-sm group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.a>

              {/* Secondary CTA */}
              <motion.a
                href="tel:+16163263328"
                onClick={() => {
                  conversionTracker.trackPhoneCall('+16163263328');
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group inline-flex items-center justify-center gap-3 px-8 sm:px-10 py-4 sm:py-5 min-w-[200px] sm:min-w-[250px] bg-white/5 backdrop-blur-sm border border-white/10 text-white font-medium text-base sm:text-lg rounded-xl hover:bg-white/10 hover:border-white/20 transition-all duration-300"
              >
                <FaPhone className="text-cyan-400 text-sm" />
                <span>Call AI Demo</span>
              </motion.a>
            </div>

            {/* Trust Indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-8 flex flex-wrap justify-center items-center gap-4 text-xs text-gray-500"
            >
              <span className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                HIPAA Compliant
              </span>
              <span className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                Setup in 48 Hours
              </span>
              <span className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                No Credit Card Required
              </span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default OptimizedHero;