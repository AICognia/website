"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSpinner, FaCheck, FaArrowRight, FaCalendarCheck, FaCheckCircle } from 'react-icons/fa';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import conversionTracker from '../utils/conversionTracking';
import HeroBackgroundGrid from '../components/HeroBackgroundGrid';

const industries = [
  'Healthcare',
  'Financial Services',
  'Technology',
  'Retail & E-commerce',
  'Energy & Utilities',
  'Manufacturing',
  'Legal Services',
  'Public Sector',
  'Hospitality',
  'Other',
];

const features = [
  '24/7 AI call answering & booking',
  'Natural, human-like conversations',
  'Seamless CRM integration',
  'Enterprise-grade security',
];

const stats = [
  { value: '99.9%', label: 'Uptime SLA' },
  { value: '3x', label: 'Faster Decisions' },
  { value: '500+', label: 'Integrations' },
];

const Demo: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    industry: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Default to dark to prevent flash
  const isDark = !mounted || resolvedTheme === 'dark';

  // Glass style matching site design
  const glassOpacity = isDark ? 0.30 : 0.30;
  const glassBlur = 22;

  const glassStyle = {
    borderWidth: '0.5px',
    background: isDark
      ? `rgba(31, 41, 55, ${glassOpacity})`
      : `rgba(255, 255, 255, ${glassOpacity})`,
    backdropFilter: `blur(${glassBlur}px)`,
    WebkitBackdropFilter: `blur(${glassBlur}px)`,
    boxShadow: isDark
      ? 'inset 0 3px 6px rgba(120, 184, 255, 0.2), inset 0 1px 3px rgba(255, 255, 255, 0.15), inset 0 -3px 6px rgba(120, 184, 255, 0.12), inset 3px 0 6px rgba(120, 184, 255, 0.08), inset -3px 0 6px rgba(120, 184, 255, 0.08), 0 4px 12px rgba(0, 0, 0, 0.3)'
      : 'inset 0 1px 2px rgba(14, 165, 233, 0.15), inset 0 -1px 2px rgba(14, 165, 233, 0.08), inset 1px 0 2px rgba(14, 165, 233, 0.12), inset -1px 0 2px rgba(14, 165, 233, 0.05), 0 2px 4px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.03)',
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.company || !formData.industry) {
      setError('Please fill in all required fields');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('https://formspree.io/f/mqarlrwl', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          _subject: `Demo Request from ${formData.name}${formData.company ? ` at ${formData.company}` : ''}`,
          form_type: 'demo_booking',
          source: 'demo_page',
          submitted_at: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        conversionTracker.trackDemoBooking('demo_page');
        conversionTracker.trackButtonClick('Lead Form Submitted', 'demo_page');
        setIsSubmitted(true);
        setTimeout(() => {
          window.open('https://calendly.com/emrebenian-cogniaai/30min', '_blank');
        }, 1000);
      } else {
        setError('Something went wrong. Please try again.');
      }
    } catch {
      setError('Connection error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen transition-colors duration-300 bg-gray-900 dark:bg-gray-900" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <section className="min-h-screen flex flex-col items-center overflow-hidden relative pt-0 select-none transition-colors duration-300">
        {/* Dynamic Background Grid */}
        <HeroBackgroundGrid isPlaying={false} />

        {/* Gradient Overlays */}
        <div className={`absolute inset-0 bg-gradient-to-b via-transparent pointer-events-none ${isDark ? 'from-gray-900/10 to-gray-900' : 'from-white/10 to-white'}`} />
        <div className={`absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t to-transparent pointer-events-none ${isDark ? 'from-gray-900 via-gray-900/40' : 'from-white via-white/40'}`} />

        {/* Radial gradient for text readability */}
        <div
          className="hidden sm:block absolute inset-y-0 left-0 w-[65%] pointer-events-none z-[5]"
          style={{
            background: isDark
              ? 'radial-gradient(ellipse 100% 90% at 20% 50%, rgba(17,24,39,0.95) 0%, rgba(17,24,39,0.85) 30%, rgba(17,24,39,0.6) 50%, rgba(17,24,39,0.3) 70%, rgba(17,24,39,0) 90%)'
              : 'radial-gradient(ellipse 80% 60% at 25% 45%, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.35) 40%, rgba(255,255,255,0.1) 60%, rgba(255,255,255,0) 75%)',
          }}
        />

        {/* Main container */}
        <div className="w-full max-w-[1400px] 2xl:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 relative z-10 flex-1 flex items-center pt-20 sm:pt-16 lg:pt-20 pb-12 sm:pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-6 xl:gap-8 items-stretch w-full">

            {/* Left Column - Value Proposition */}
            <motion.div
              className={`lg:col-span-7 relative rounded-2xl sm:rounded-[2rem] border p-5 sm:p-8 lg:p-10 xl:p-12 h-full ${isDark ? 'border-blue-500/30' : 'border-[#e2e8f0]'}`}
              style={glassStyle}
              initial={{ x: -20 }}
              animate={{ x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className={`inline-flex items-center gap-2 sm:gap-3 px-3 sm:px-5 py-2 sm:py-2.5 rounded-full mb-6 sm:mb-8 lg:mb-10 ${
                    isDark
                      ? 'bg-blue-900/40 border border-blue-500/30'
                      : 'bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/60'
                  }`}
                  style={{
                    boxShadow: isDark
                      ? 'inset 0 1px 2px rgba(120, 184, 255, 0.1), inset 0 1px 2px rgba(255, 255, 255, 0.05)'
                      : '0 2px 12px rgba(59, 130, 246, 0.1), inset 0 1px 0 rgba(255,255,255,0.8)',
                  }}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <div className={`w-2.5 h-2.5 rounded-full border-2 ${isDark ? 'border-blue-400' : 'border-blue-500'}`} />
                  <span className={`text-sm font-semibold tracking-wide ${isDark ? 'text-blue-400' : 'text-blue-700'}`}>
                    AI Transformation Agency
                  </span>
                  <FaCalendarCheck className={`w-3.5 h-3.5 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
                </motion.div>

                <h1 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-serif font-light leading-[1.12] sm:leading-[1.08] mb-4 sm:mb-6 lg:mb-8 ${isDark ? 'text-gray-100' : 'text-slate-900'}`}>
                  Transform Your Data Into{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-500">
                    Strategic Insights
                  </span>
                </h1>

                <p className={`text-base sm:text-lg lg:text-xl max-w-xl lg:max-w-2xl mb-6 sm:mb-8 lg:mb-10 leading-relaxed ${isDark ? 'text-gray-500' : 'text-slate-500'}`}>
                  Schedule a free consultation with our team. We'll show you how AI can answer every call, book more appointments, and grow your business.
                </p>

                {/* Features List */}
                <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                  {features.map((feature, index) => (
                    <motion.div
                      key={feature}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
                      className="flex items-center gap-2 sm:gap-3"
                    >
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                        isDark ? 'bg-blue-900/40 border border-blue-500/30' : 'bg-blue-50 border border-blue-200'
                      }`}>
                        <FaCheck className={`text-[8px] ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
                      </div>
                      <span className={`text-sm sm:text-base ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>{feature}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Stats Row */}
                <div className="flex flex-wrap items-stretch gap-2 sm:gap-4 lg:gap-5">
                  {stats.map((item, i) => (
                    <motion.div
                      key={i}
                      className={`flex-1 min-w-[90px] sm:min-w-[120px] rounded-xl sm:rounded-2xl border px-3 sm:px-5 py-3 sm:py-4 ${isDark ? 'border-gray-700 bg-gray-800/50' : 'border-slate-200/80 bg-white/50'}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + i * 0.1 }}
                    >
                      <div className={`text-xl sm:text-3xl lg:text-4xl font-serif font-normal ${isDark ? 'text-white' : 'text-slate-800'}`}>
                        {item.value}
                      </div>
                      <div className={`text-[9px] sm:text-[10px] uppercase tracking-[0.12em] font-medium mt-1 ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
                        {item.label}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            {/* Right Column - Form */}
            <motion.div
              className={`lg:col-span-5 rounded-2xl sm:rounded-[2rem] border p-5 sm:p-8 lg:p-10 xl:p-12 h-full pointer-events-auto ${isDark ? 'border-gray-700' : 'border-[#e2e8f0]'}`}
              style={glassStyle}
              initial={{ x: 20 }}
              animate={{ x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.3 }}
              >
                <AnimatePresence mode="wait">
                  {!isSubmitted ? (
                    <motion.div
                      key="form"
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0, y: -20 }}
                    >
                      <h2 className={`text-xl sm:text-2xl lg:text-3xl font-serif font-normal mb-1 sm:mb-2 ${isDark ? 'text-gray-100' : 'text-slate-900'}`}>
                        Get Started
                      </h2>
                      <p className={`text-sm sm:text-base mb-6 sm:mb-8 ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
                        Schedule a free consultation with our team.
                      </p>

                      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                        <div>
                          <label className={`block text-xs sm:text-sm font-semibold mb-1.5 sm:mb-2 ${isDark ? 'text-gray-300' : 'text-slate-700'}`}>
                            Full Name
                          </label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Jane Smith"
                            className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl border text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${isDark ? 'border-gray-600 bg-gray-800/80 text-gray-100 placeholder-gray-500' : 'border-slate-200 bg-white/80 text-slate-900 placeholder-slate-400'}`}
                            autoComplete="name"
                          />
                        </div>

                        <div>
                          <label className={`block text-xs sm:text-sm font-semibold mb-1.5 sm:mb-2 ${isDark ? 'text-gray-300' : 'text-slate-700'}`}>
                            Work Email
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="jane@company.com"
                            className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl border text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${isDark ? 'border-gray-600 bg-gray-800/80 text-gray-100 placeholder-gray-500' : 'border-slate-200 bg-white/80 text-slate-900 placeholder-slate-400'}`}
                            autoComplete="email"
                          />
                        </div>

                        <div>
                          <label className={`block text-xs sm:text-sm font-semibold mb-1.5 sm:mb-2 ${isDark ? 'text-gray-300' : 'text-slate-700'}`}>
                            Company
                          </label>
                          <input
                            type="text"
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                            placeholder="Acme Inc."
                            className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl border text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${isDark ? 'border-gray-600 bg-gray-800/80 text-gray-100 placeholder-gray-500' : 'border-slate-200 bg-white/80 text-slate-900 placeholder-slate-400'}`}
                            autoComplete="organization"
                          />
                        </div>

                        <div>
                          <label className={`block text-xs sm:text-sm font-semibold mb-1.5 sm:mb-2 ${isDark ? 'text-gray-300' : 'text-slate-700'}`}>
                            Industry
                          </label>
                          <div className="relative">
                            <select
                              name="industry"
                              value={formData.industry}
                              onChange={handleChange}
                              className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl border text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none cursor-pointer ${isDark ? 'border-gray-600 bg-gray-800/80 text-gray-100' : 'border-slate-200 bg-white/80 text-slate-900'}`}
                            >
                              <option value="" className={isDark ? 'bg-gray-800' : 'bg-white'}>Select your industry</option>
                              {industries.map((industry) => (
                                <option key={industry} value={industry} className={isDark ? 'bg-gray-800' : 'bg-white'}>
                                  {industry}
                                </option>
                              ))}
                            </select>
                            <div className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                <path d="M2.5 4.5L6 8L9.5 4.5" stroke={isDark ? '#6B7280' : '#9CA3AF'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            </div>
                          </div>
                        </div>

                        <AnimatePresence>
                          {error && (
                            <motion.p
                              initial={{ opacity: 0, y: -5 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -5 }}
                              className={`text-sm ${isDark ? 'text-red-400' : 'text-red-500'}`}
                            >
                              {error}
                            </motion.p>
                          )}
                        </AnimatePresence>

                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="btn-primary w-full h-12 sm:h-14 rounded-lg sm:rounded-xl disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                          {isSubmitting ? (
                            <>
                              <FaSpinner className="animate-spin text-sm" />
                              <span>Submitting...</span>
                            </>
                          ) : (
                            <>
                              <span>Schedule Consultation</span>
                              <FaArrowRight className="text-sm group-hover:translate-x-0.5 transition-transform" />
                            </>
                          )}
                        </button>
                      </form>

                      <p className={`mt-4 sm:mt-6 text-center text-xs ${isDark ? 'text-gray-500' : 'text-slate-500'}`}>
                        By submitting, you agree to our{' '}
                        <Link href="/privacy-policy" className={`underline underline-offset-2 transition-colors ${isDark ? 'text-gray-400 hover:text-gray-300' : 'text-slate-600 hover:text-slate-800'}`}>
                          Privacy Policy
                        </Link>
                      </p>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="py-8 sm:py-12 text-center"
                    >
                      <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 ${isDark ? 'bg-green-900/30 border border-green-500/30' : 'bg-green-50 border border-green-200'}`}>
                        <FaCheck className={`text-2xl sm:text-3xl ${isDark ? 'text-green-400' : 'text-green-500'}`} />
                      </div>
                      <h3 className={`text-xl sm:text-2xl font-serif font-normal mb-2 sm:mb-3 ${isDark ? 'text-gray-100' : 'text-slate-900'}`}>
                        You're All Set
                      </h3>
                      <p className={`text-sm sm:text-base mb-6 sm:mb-8 max-w-sm mx-auto ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
                        Opening Calendly to schedule your consultation. If it doesn't open automatically, click below.
                      </p>
                      <a
                        href="https://calendly.com/emrebenian-cogniaai/30min"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary h-12 sm:h-14 px-6 sm:px-8 rounded-xl inline-flex items-center justify-center gap-2"
                      >
                        <span>Open Calendly</span>
                        <FaArrowRight className="text-sm" />
                      </a>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Trust indicators below form */}
              <div className="mt-4 sm:mt-6 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs">
                {['Free Consultation', 'No Commitment', 'Expert Team'].map((item, i) => (
                  <span key={i} className={`flex items-center gap-1.5 ${isDark ? 'text-gray-500' : 'text-slate-500'}`}>
                    <FaCheckCircle className={`text-xs ${isDark ? 'text-blue-400' : 'text-blue-500'}`} />
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default Demo;
