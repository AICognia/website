"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSpinner, FaCheck, FaArrowRight, FaCheckCircle } from 'react-icons/fa';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import conversionTracker from '../utils/conversionTracking';
import HeroBackgroundGrid from '../components/HeroBackgroundGrid';
import MobileHeroBackground from '../components/MobileHeroBackground';

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

const Demo: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    industry: '',
    message: '',
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
  const glassOpacity = isDark ? 0.25 : 0.25;
  const glassBlur = 16;

  const glassStyle = {
    borderWidth: '0.5px',
    background: isDark
      ? `rgba(31, 41, 55, ${glassOpacity})`
      : `rgba(255, 255, 255, ${glassOpacity})`,
    backdropFilter: `blur(${glassBlur}px)`,
    WebkitBackdropFilter: `blur(${glassBlur}px)`,
    boxShadow: isDark
      ? 'inset 0 3px 6px rgba(120, 184, 255, 0.15), inset 0 1px 3px rgba(255, 255, 255, 0.1), 0 4px 12px rgba(0, 0, 0, 0.3)'
      : 'inset 0 1px 2px rgba(14, 165, 233, 0.12), 0 2px 4px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.03)',
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.company) {
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
          _subject: `Consultation Request from ${formData.name}${formData.company ? ` at ${formData.company}` : ''}`,
          form_type: 'consultation_booking',
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
      <section className="min-h-screen flex flex-col items-center justify-center overflow-hidden relative pt-0 select-none transition-colors duration-300">
        {/* Desktop Background */}
        <div className="hidden lg:block absolute inset-0">
          <HeroBackgroundGrid isPlaying={false} />
        </div>

        {/* Mobile Background */}
        <div className="lg:hidden absolute inset-0">
          <MobileHeroBackground />
        </div>

        {/* Gradient Overlays */}
        <div className={`absolute inset-0 bg-gradient-to-b via-transparent pointer-events-none ${isDark ? 'from-gray-900/20 to-gray-900' : 'from-white/20 to-white'}`} />

        {/* Centered radial gradient */}
        <div
          className="absolute inset-0 pointer-events-none z-[5]"
          style={{
            background: isDark
              ? 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(17,24,39,0.9) 0%, rgba(17,24,39,0.7) 40%, rgba(17,24,39,0.4) 70%, rgba(17,24,39,0) 100%)'
              : 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.5) 40%, rgba(255,255,255,0.2) 70%, rgba(255,255,255,0) 100%)',
          }}
        />

        {/* Centered Form Container */}
        <div className="w-full max-w-lg mx-auto px-4 sm:px-6 relative z-10 py-20 sm:py-24">
          <motion.div
            className={`rounded-2xl border p-6 sm:p-8 ${isDark ? 'border-gray-700' : 'border-[#e2e8f0]'}`}
            style={glassStyle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <div className="text-center mb-6">
                    <h1 className={`text-2xl sm:text-3xl font-serif font-normal mb-2 ${isDark ? 'text-gray-100' : 'text-slate-900'}`}>
                      Schedule a Consultation
                    </h1>
                    <p className={`text-sm sm:text-base ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
                      Let's discuss how AI can transform your business.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className={`block text-xs sm:text-sm font-semibold mb-1.5 ${isDark ? 'text-gray-300' : 'text-slate-700'}`}>
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Jane Smith"
                        className={`w-full px-4 py-3 rounded-xl border text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${isDark ? 'border-gray-600 bg-gray-800/80 text-gray-100 placeholder-gray-500' : 'border-slate-200 bg-white/80 text-slate-900 placeholder-slate-400'}`}
                        autoComplete="name"
                      />
                    </div>

                    <div>
                      <label className={`block text-xs sm:text-sm font-semibold mb-1.5 ${isDark ? 'text-gray-300' : 'text-slate-700'}`}>
                        Work Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="jane@company.com"
                        className={`w-full px-4 py-3 rounded-xl border text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${isDark ? 'border-gray-600 bg-gray-800/80 text-gray-100 placeholder-gray-500' : 'border-slate-200 bg-white/80 text-slate-900 placeholder-slate-400'}`}
                        autoComplete="email"
                      />
                    </div>

                    <div>
                      <label className={`block text-xs sm:text-sm font-semibold mb-1.5 ${isDark ? 'text-gray-300' : 'text-slate-700'}`}>
                        Company *
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Acme Inc."
                        className={`w-full px-4 py-3 rounded-xl border text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${isDark ? 'border-gray-600 bg-gray-800/80 text-gray-100 placeholder-gray-500' : 'border-slate-200 bg-white/80 text-slate-900 placeholder-slate-400'}`}
                        autoComplete="organization"
                      />
                    </div>

                    <div>
                      <label className={`block text-xs sm:text-sm font-semibold mb-1.5 ${isDark ? 'text-gray-300' : 'text-slate-700'}`}>
                        Industry
                      </label>
                      <div className="relative">
                        <select
                          name="industry"
                          value={formData.industry}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 rounded-xl border text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none cursor-pointer ${isDark ? 'border-gray-600 bg-gray-800/80 text-gray-100' : 'border-slate-200 bg-white/80 text-slate-900'}`}
                        >
                          <option value="" className={isDark ? 'bg-gray-800' : 'bg-white'}>Select your industry</option>
                          {industries.map((industry) => (
                            <option key={industry} value={industry} className={isDark ? 'bg-gray-800' : 'bg-white'}>
                              {industry}
                            </option>
                          ))}
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                            <path d="M2.5 4.5L6 8L9.5 4.5" stroke={isDark ? '#6B7280' : '#9CA3AF'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className={`block text-xs sm:text-sm font-semibold mb-1.5 ${isDark ? 'text-gray-300' : 'text-slate-700'}`}>
                        How can we help?
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us about your challenges..."
                        rows={3}
                        className={`w-full px-4 py-3 rounded-xl border text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none ${isDark ? 'border-gray-600 bg-gray-800/80 text-gray-100 placeholder-gray-500' : 'border-slate-200 bg-white/80 text-slate-900 placeholder-slate-400'}`}
                      />
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
                      className="btn-primary w-full h-12 sm:h-14 rounded-xl disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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

                  <p className={`mt-4 text-center text-xs ${isDark ? 'text-gray-500' : 'text-slate-500'}`}>
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
                  className="py-8 text-center"
                >
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${isDark ? 'bg-green-900/30 border border-green-500/30' : 'bg-green-50 border border-green-200'}`}>
                    <FaCheck className={`text-2xl ${isDark ? 'text-green-400' : 'text-green-500'}`} />
                  </div>
                  <h3 className={`text-xl sm:text-2xl font-serif font-normal mb-2 ${isDark ? 'text-gray-100' : 'text-slate-900'}`}>
                    You're All Set
                  </h3>
                  <p className={`text-sm sm:text-base mb-6 max-w-sm mx-auto ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
                    Opening Calendly to schedule your consultation. If it doesn't open automatically, click below.
                  </p>
                  <a
                    href="https://calendly.com/emrebenian-cogniaai/30min"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary h-12 px-6 rounded-xl inline-flex items-center justify-center gap-2"
                  >
                    <span>Open Calendly</span>
                    <FaArrowRight className="text-sm" />
                  </a>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Trust indicators below form */}
            {!isSubmitted && (
              <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-xs">
                {['Free Consultation', 'No Commitment', 'Expert Team'].map((item, i) => (
                  <span key={i} className={`flex items-center gap-1.5 ${isDark ? 'text-gray-500' : 'text-slate-500'}`}>
                    <FaCheckCircle className={`text-xs ${isDark ? 'text-blue-400' : 'text-blue-500'}`} />
                    {item}
                  </span>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Demo;
