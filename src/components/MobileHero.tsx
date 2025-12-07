import React from 'react';
import { motion } from 'framer-motion';
import { FaArrowRight, FaPhone, FaCalendarCheck } from 'react-icons/fa';
import conversionTracker from '../utils/conversionTracking';
import { useLeadCapture } from '../contexts/LeadCaptureContext';

const MobileHero: React.FC = () => {
  const { openLeadCapture } = useLeadCapture();
  return (
    <div className="lg:hidden">
      {/* Mobile-optimized Hero Section */}
      <div className="relative min-h-[100vh] flex flex-col justify-center px-4 py-12 overflow-hidden">
        {/* Gradient Background with Mesh */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900" />

        {/* Animated Gradient Mesh */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob" />
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000" />
          <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000" />
        </div>

        {/* Content Container */}
        <div className="relative z-10">
          {/* Main Headline - Mobile Optimized */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-center mb-4"
          >
            <h1 className="text-4xl font-bold leading-tight mb-2">
              <span className="block text-white">Never Miss</span>
              <span className="block bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                Another Call
              </span>
            </h1>
          </motion.div>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-300 text-center mb-8 px-4 text-sm leading-relaxed"
          >
            AI-powered call center that handles every customer 24/7.
            <span className="block mt-1 text-cyan-400 font-semibold">
              10-20% more bookings guaranteed.
            </span>
          </motion.p>

          {/* Value Props - Horizontal Scroll */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex gap-3 overflow-x-auto pb-4 mb-8 scrollbar-hide px-2"
          >
            {[
              { value: '24/7', label: 'Available' },
              { value: '0.5s', label: 'Response' },
              { value: '76%', label: 'Cost Less' },
              { value: '95%', label: 'Satisfaction' }
            ].map((stat, i) => (
              <div
                key={i}
                className="flex-shrink-0 px-4 py-3 bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 min-w-[100px]"
              >
                <div className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-[10px] text-gray-400 uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>

          {/* CTAs - Stacked for Mobile */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-3 mb-8"
          >
            {/* Primary CTA - Book Demo */}
            <button
              onClick={() => {
                conversionTracker.trackDemoBooking('mobile_hero_cta');
                conversionTracker.trackButtonClick('Book Free Demo', 'mobile_hero');
                openLeadCapture('mobile_hero_legacy');
              }}
              className="block w-full"
            >
              <div className="relative group">
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity" />

                {/* Button */}
                <div className="relative bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold py-4 px-6 rounded-2xl flex items-center justify-between group-hover:scale-[1.02] transition-transform">
                  <div className="flex items-center gap-2 text-left">
                    <FaCalendarCheck />
                    <div className="text-lg">Start Free Trial</div>
                  </div>
                  <div className="bg-white/20 p-3 rounded-xl">
                    <FaArrowRight className="text-lg" />
                  </div>
                </div>
              </div>
            </button>

            {/* Secondary CTA - Live Demo */}
            <a
              href="tel:+16163263328"
              onClick={() => {
                conversionTracker.trackPhoneCall('+16163263328');
                conversionTracker.trackButtonClick('Call AI Demo', 'mobile_hero');
              }}
              className="block w-full"
            >
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 text-white font-bold py-4 px-6 rounded-2xl flex items-center justify-between hover:bg-white/10 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="bg-gradient-to-r from-cyan-400 to-blue-400 p-2.5 rounded-xl">
                    <FaPhone className="text-sm" />
                  </div>
                  <div className="text-left">
                    <div className="text-base">Experience Live Demo</div>
                    <div className="text-xs text-gray-400">Call our AI now</div>
                  </div>
                </div>
              </div>
            </a>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default MobileHero;