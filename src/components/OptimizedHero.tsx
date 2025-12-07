import React, { useState, useEffect } from 'react';
import { FaShieldAlt, FaCheckCircle, FaHeadset, FaClock, FaArrowRight } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import conversionTracker from '../utils/conversionTracking';
import SoundVisualizer from './SoundVisualizer';

const rotatingWords = ['deals', 'patients', 'jobs', 'clients', 'customers'];

const OptimizedHero: React.FC = () => {
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Desktop Hero - Hidden on mobile (mobile uses MobileHeroRedesigned) */}
      <section className="relative bg-black text-white overflow-hidden hidden lg:block">
        {/* Background - Pure black */}
        <div className="absolute inset-0 bg-black" />

        <div className="relative container mx-auto px-6 lg:px-12 z-10 pt-2">
          {/* Trust Badge Strip - Above the fold */}
          <div className="flex items-center justify-center gap-8 py-4 border-b border-white/5">
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <FaShieldAlt className="text-green-400" />
              <span>HIPAA Compliant</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <FaHeadset className="text-green-400" />
              <span>24/7 Support</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <FaClock className="text-green-400" />
              <span>1 Week Setup</span>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center py-12 lg:py-16">
            {/* Left Side - Content */}
            <div className="space-y-8">
              {/* Main Headline - Clear Value Proposition with AI */}
              <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-thin leading-tight text-white">
                Your AI
                <br />
                <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  Receptionist
                </span>
              </h1>

              {/* Subheadline - Benefit focused with rotating word */}
              <p className="text-lg sm:text-xl text-gray-400 max-w-lg">
                <span className="whitespace-nowrap">AI handles every call 24/7. You close more </span>
                <span className="relative inline-block w-28 h-7 align-bottom overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={wordIndex}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -20, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="absolute left-0 text-cyan-400 font-medium"
                    >
                      {rotatingWords[wordIndex]}.
                    </motion.span>
                  </AnimatePresence>
                </span>
                <span className="block mt-2 text-white font-medium">
                  10-20% more revenue. 76% less cost.
                </span>
              </p>

              {/* Stats Row */}
              <div className="flex gap-8">
                {[
                  { value: '24/7', label: 'Available' },
                  { value: '0.5s', label: 'Response' },
                  { value: '95%', label: 'Satisfaction' },
                ].map((stat, i) => (
                  <div key={i} className="text-center">
                    <div className="text-2xl font-bold text-cyan-400">{stat.value}</div>
                    <div className="text-xs text-gray-500 uppercase tracking-wider">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Primary CTA - Book a Demo */}
                <Link
                  to="/demo"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white hover:bg-neutral-100 text-black text-sm font-medium rounded-lg transition-colors"
                >
                  Book a Demo
                  <FaArrowRight className="text-[10px]" />
                </Link>

                {/* Secondary CTA - Talk to AI */}
                <a
                  href="tel:+16163263328"
                  onClick={() => {
                    conversionTracker.trackPhoneCall('+16163263328');
                    conversionTracker.trackButtonClick('Talk to AI', 'hero_secondary');
                  }}
                  className="inline-flex items-center justify-center gap-3 px-6 py-3 border border-neutral-700 hover:border-neutral-600 hover:bg-neutral-900 text-white text-sm font-medium rounded-lg transition-colors"
                >
                  Talk to AI
                  <span className="text-neutral-500">+1 616-326-3328</span>
                </a>
              </div>

              {/* Micro-trust */}
              <p className="text-xs text-gray-500 flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <FaCheckCircle className="text-green-400" />
                  Free 1-week trial
                </span>
                <span className="flex items-center gap-1">
                  <FaCheckCircle className="text-green-400" />
                  No credit card required
                </span>
              </p>
            </div>

            {/* Right Side - Sound Visualizer */}
            <div className="relative flex items-center justify-center">
              <SoundVisualizer />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default OptimizedHero;
