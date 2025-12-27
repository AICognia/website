import React, { useState, useEffect } from 'react';
import { FaShieldAlt, FaCheckCircle, FaHeadset, FaClock, FaArrowRight, FaPhone, FaSpinner } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import conversionTracker from '../utils/conversionTracking';
import SoundVisualizer from './SoundVisualizer';

const rotatingWords = ['deals', 'patients', 'jobs', 'clients', 'customers'];

const OptimizedHero: React.FC = () => {
  const [wordIndex, setWordIndex] = useState(0);
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.name) {
      setError('Please fill in your name and email');
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
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          _subject: `Demo Request from ${formData.name}`,
          form_type: 'hero_form',
          source: 'homepage_hero',
          submitted_at: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        conversionTracker.trackButtonClick('Hero Lead Form Submit', 'hero_form');
        conversionTracker.trackDemoBooking('hero_form');

        // Track Meta Pixel Lead event
        if (typeof window !== 'undefined' && (window as any).fbq) {
          (window as any).fbq('track', 'Lead', {
            content_name: 'Hero Form Submission',
            content_category: 'Lead Capture'
          });
        }

        setIsSubmitted(true);
        setTimeout(() => {
          window.open('https://calendly.com/emrebenian-cogniaai/30min', '_blank');
        }, 1000);
      } else {
        setError('Something went wrong. Please try again.');
      }
    } catch (err) {
      console.error('Form submission error:', err);
      setError('Connection error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

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

              {/* Lead Capture Form */}
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-3 max-w-md">
                  <div className="flex gap-3">
                    <input
                      type="text"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 transition-colors"
                      required
                    />
                    <input
                      type="email"
                      placeholder="Work email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 transition-colors"
                      required
                    />
                  </div>
                  {error && <p className="text-red-400 text-sm">{error}</p>}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white text-sm font-semibold rounded-lg transition-all shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <FaSpinner className="animate-spin text-xs" />
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <>
                        <span>Start Free Trial</span>
                        <FaArrowRight className="text-[10px]" />
                      </>
                    )}
                  </button>
                </form>
              ) : (
                <div className="max-w-md p-6 bg-green-500/10 border border-green-500/20 rounded-xl text-center">
                  <FaCheckCircle className="text-green-400 text-2xl mx-auto mb-3" />
                  <p className="text-white font-medium mb-2">You're all set!</p>
                  <p className="text-gray-400 text-sm">Opening Calendly to schedule your demo...</p>
                </div>
              )}

              {/* Secondary CTA - Talk to AI */}
              <a
                href="tel:+16163263328"
                onClick={() => {
                  conversionTracker.trackPhoneCall('+16163263328');
                  conversionTracker.trackButtonClick('Talk to AI', 'hero_secondary');
                }}
                className="inline-flex items-center justify-center gap-3 px-6 py-3 border border-neutral-700 hover:border-neutral-600 hover:bg-neutral-900 text-white text-sm font-medium rounded-lg transition-colors w-fit"
              >
                <FaPhone className="text-sm" />
                Talk to AI
                <span className="text-neutral-500">+1 616-326-3328</span>
              </a>

              {/* Micro-trust */}
              <p className="text-xs text-gray-500 flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <FaCheckCircle className="text-green-400" />
                  1 Week Free Trial
                </span>
                <span className="flex items-center gap-1">
                  <FaCheckCircle className="text-green-400" />
                  No credit card required
                </span>
                <span className="flex items-center gap-1">
                  <FaCheckCircle className="text-green-400" />
                  Setup in 1 week
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
