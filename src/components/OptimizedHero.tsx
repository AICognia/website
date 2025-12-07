import React from 'react';
import { FaShieldAlt, FaCheckCircle, FaHeadset, FaClock } from 'react-icons/fa';
import conversionTracker from '../utils/conversionTracking';
import SoundVisualizer from './SoundVisualizer';

const OptimizedHero: React.FC = () => {
  return (
    <>
      {/* Desktop Hero - Hidden on mobile (mobile uses MobileHeroRedesigned) */}
      <section className="relative bg-black text-white overflow-hidden hidden lg:block">
        {/* Background - Pure black */}
        <div className="absolute inset-0 bg-black" />

        <div className="relative container mx-auto px-6 lg:px-12 z-10">
          {/* Trust Badge Strip - Above the fold */}
          <div className="flex items-center justify-center gap-8 py-4 border-b border-white/5">
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <FaShieldAlt className="text-green-400" />
              <span>HIPAA Compliant</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <FaCheckCircle className="text-green-400" />
              <span>SOC 2 Certified</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <FaHeadset className="text-green-400" />
              <span>24/7 Support</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <FaClock className="text-green-400" />
              <span>48hr Setup</span>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center py-20 lg:py-28">
            {/* Left Side - Content */}
            <div className="space-y-8">
              {/* Main Headline - Clear Value Proposition */}
              <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-thin leading-tight text-white">
                Never Miss
                <br />
                <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  Another Call
                </span>
              </h1>

              {/* Subheadline - Benefit focused */}
              <p className="text-lg sm:text-xl text-gray-400 max-w-lg">
                AI handles every customer call 24/7. You close more deals.
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
                {/* Primary CTA - Try AI Now */}
                <a
                  href="tel:+16163263328"
                  onClick={() => {
                    conversionTracker.trackPhoneCall('+16163263328');
                    conversionTracker.trackButtonClick('Try AI Now', 'hero_primary');
                  }}
                  className="inline-flex items-center justify-center gap-3 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white text-sm font-semibold rounded-lg transition-all shadow-lg shadow-green-500/25"
                >
                  <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                  Try Our AI Now
                  <span className="text-white/70">+1 616-326-3328</span>
                </a>

                {/* Secondary CTA - Book Demo */}
                <a
                  href="https://calendly.com/emrebenian-cogniaai/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    conversionTracker.trackDemoBooking('hero_cta');
                  }}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white hover:bg-gray-100 text-black text-sm font-medium rounded-lg transition-colors"
                >
                  Book a Demo
                  <span>→</span>
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
