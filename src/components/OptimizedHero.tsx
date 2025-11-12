import React from 'react';
import { motion } from 'framer-motion';
import { FaArrowRight, FaPhone, FaPlay } from 'react-icons/fa';
import conversionTracker from '../utils/conversionTracking';

const OptimizedHero: React.FC = () => {
  return (
    <section className="relative min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-white overflow-hidden flex items-center">
      {/* Static WebP Background with fixed dimensions for CLS */}
      <div className="absolute inset-0">
        <picture>
          <source
            srcSet="/hero-bg.webp"
            type="image/webp"
          />
          <img
            src="/hero-bg.webp"
            alt="AI Technology Background"
            className="absolute inset-0 w-full h-full object-cover opacity-20"
            width="1920"
            height="1080"
            loading="eager"
            decoding="async"
            style={{ aspectRatio: '1920/1080' }}
          />
        </picture>

        {/* Play Demo Overlay for Video */}
        <button
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 group cursor-pointer hidden lg:flex items-center gap-3 bg-white/10 backdrop-blur-xl px-6 py-4 rounded-2xl border border-white/20 hover:bg-white/20 transition-all"
          onClick={() => {
            // Load video on demand
            console.log('Load demo video');
          }}
          aria-label="Play demo video"
        >
          <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
            <FaPlay className="text-white ml-1" />
          </div>
          <span className="text-white font-semibold">Play Demo</span>
        </button>
      </div>

      {/* Simplified gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-950/50 via-transparent to-gray-950/50" />

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-12 py-12">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center"
          >
            {/* Mobile Hero - Simplified */}
            <div className="lg:hidden">
              <h1 className="text-4xl sm:text-5xl font-bold mb-4">
                <span className="block text-white">Never Miss</span>
                <span className="block bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  Another Call
                </span>
              </h1>

              <p className="text-gray-300 mb-6 px-4">
                AI-powered call center that handles every customer 24/7.
              </p>

              {/* Mobile Stats - 3 chips only */}
              <div className="flex justify-center gap-2 mb-6 px-4">
                {[
                  { value: '24/7', label: 'Available' },
                  { value: '0.5s', label: 'Response' },
                  { value: '76%', label: 'Cost Less' }
                ].map((stat, i) => (
                  <div
                    key={i}
                    className="px-4 py-2 bg-white/5 backdrop-blur-xl rounded-lg border border-white/10"
                  >
                    <div className="text-lg font-bold text-cyan-400">{stat.value}</div>
                    <div className="text-[10px] text-gray-400 uppercase">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Mobile CTA */}
              <div className="space-y-3 px-4">
                <a
                  href="https://calendly.com/emrebenian-cogniaai/30min"
                  className="block w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold py-4 px-6 rounded-xl"
                >
                  Start Free Trial
                </a>
              </div>
            </div>

            {/* Desktop Hero */}
            <div className="hidden lg:block">
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 relative">
                <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                  AI Call Center
                </span>
              </h1>

              <p className="text-lg md:text-xl text-gray-300 max-w-4xl mx-auto mb-8 leading-relaxed">
                Complete call center replacement with{" "}
                <span className="text-cyan-400 font-semibold">inbound & outbound calls</span>,{" "}
                <span className="text-blue-400 font-semibold">lead qualification</span>, and{" "}
                <span className="text-purple-400 font-semibold">appointment automation</span>.
              </p>

              {/* Desktop Stats */}
              <div className="grid grid-cols-3 gap-4 max-w-3xl mx-auto mb-8">
                <div className="bg-gradient-to-br from-cyan-500/10 to-teal-500/10 rounded-xl p-4 border border-cyan-500/20">
                  <div className="text-2xl md:text-3xl font-bold text-cyan-400">10-20%</div>
                  <div className="text-xs font-medium text-gray-400 uppercase">More Bookings</div>
                </div>
                <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl p-4 border border-purple-500/20">
                  <div className="text-2xl md:text-3xl font-bold text-purple-400">24/7</div>
                  <div className="text-xs font-medium text-gray-400 uppercase">Availability</div>
                </div>
                <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-xl p-4 border border-green-500/20">
                  <div className="text-2xl md:text-3xl font-bold text-green-400">76%</div>
                  <div className="text-xs font-medium text-gray-400 uppercase">Cost Reduction</div>
                </div>
              </div>

              {/* Desktop CTAs */}
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <a
                  href="https://calendly.com/emrebenian-cogniaai/30min"
                  onClick={() => {
                    conversionTracker.trackDemoBooking('hero_cta');
                  }}
                  className="group inline-flex items-center justify-center gap-3 px-10 py-5 min-w-[280px] bg-gradient-to-r from-cyan-500 to-cyan-400 text-white font-bold text-lg rounded-2xl hover:shadow-lg hover:shadow-cyan-500/20 transition-all duration-300 hover:scale-105"
                >
                  <span className="flex flex-col items-center">
                    <span className="text-lg">Book Free Demo</span>
                    <span className="text-xs opacity-90 font-medium">1 Week Free Trial</span>
                  </span>
                  <FaArrowRight className="group-hover:translate-x-1 transition-transform text-lg" />
                </a>

                <a
                  href="tel:+16163263328"
                  onClick={() => {
                    conversionTracker.trackPhoneCall('+16163263328');
                  }}
                  className="group inline-flex items-center justify-center gap-4 px-10 py-5 min-w-[280px] bg-gradient-to-r from-slate-800/80 to-slate-700/80 backdrop-blur-xl border-2 border-cyan-500/30 text-white font-bold text-lg rounded-2xl hover:bg-gradient-to-r hover:from-cyan-500/20 hover:to-blue-500/20 hover:border-cyan-400/50 transition-all duration-300 hover:scale-105"
                >
                  <FaPhone className="text-cyan-400 text-lg" />
                  <span className="flex flex-col items-start gap-1">
                    <span className="text-lg">Experience AI Call Center</span>
                    <span className="text-xs text-cyan-400 font-medium">Live Demo: +1 616-326-3328</span>
                  </span>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default OptimizedHero;