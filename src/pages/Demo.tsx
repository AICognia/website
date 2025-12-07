import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { FaSpinner, FaCheck, FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import conversionTracker from '../utils/conversionTracking';

const industries = [
  'Healthcare',
  'Legal Services',
  'Retail & E-commerce',
  'Hospitality',
  'Automotive',
  'Home Services',
  'Real Estate',
  'Insurance',
  'Financial Services',
  'Other',
];

const features = [
  'AI-powered call handling 24/7',
  'Seamless calendar integration',
  'Natural, human-like conversations',
  'Custom training for your business',
];

const logos = [
  { name: 'Company 1', opacity: 0.4 },
  { name: 'Company 2', opacity: 0.3 },
  { name: 'Company 3', opacity: 0.5 },
  { name: 'Company 4', opacity: 0.35 },
  { name: 'Company 5', opacity: 0.45 },
];

const Demo: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    industry: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email) {
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
    } catch (err) {
      console.error('Form submission error:', err);
      setError('Connection error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Schedule a Demo | Cognia AI</title>
        <meta name="description" content="Schedule a personalized demo to see how Cognia AI can transform your customer communications with AI-powered call handling." />
      </Helmet>

      <div className="min-h-screen bg-black">
        {/* Subtle gradient background */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            {/* Left Column - Value Proposition */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:sticky lg:top-24"
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-neutral-900 border border-neutral-800 rounded-full text-xs text-neutral-400 mb-8">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                Free 7-day trial included
              </div>

              {/* Headline */}
              <h1 className="text-4xl lg:text-5xl font-medium text-white tracking-tight leading-tight mb-6">
                See Cognia AI
                <span className="block text-neutral-500">in action</span>
              </h1>

              {/* Description */}
              <p className="text-lg text-neutral-400 leading-relaxed mb-10 max-w-lg">
                Schedule a personalized demo with our team. We'll show you exactly how AI can handle your calls, book appointments, and never let a customer slip through the cracks.
              </p>

              {/* Features */}
              <div className="space-y-4 mb-12">
                {features.map((feature, index) => (
                  <motion.div
                    key={feature}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 * index }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-5 h-5 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center flex-shrink-0">
                      <FaCheck className="text-[10px] text-neutral-500" />
                    </div>
                    <span className="text-neutral-300 text-sm">{feature}</span>
                  </motion.div>
                ))}
              </div>

              {/* Social Proof - Subtle */}
              <div className="pt-8 border-t border-neutral-900">
                <p className="text-xs text-neutral-600 uppercase tracking-wider mb-4">
                  Trusted by businesses across industries
                </p>
                <div className="flex items-center gap-6">
                  {logos.map((logo, index) => (
                    <div
                      key={index}
                      className="h-6 w-16 bg-neutral-800 rounded"
                      style={{ opacity: logo.opacity }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right Column - Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="bg-neutral-950 border border-neutral-900 rounded-2xl p-8 lg:p-10">
                <AnimatePresence mode="wait">
                  {!isSubmitted ? (
                    <motion.div
                      key="form"
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0, y: -20 }}
                    >
                      {/* Form Header */}
                      <div className="mb-8">
                        <h2 className="text-xl font-medium text-white mb-2">
                          Request a demo
                        </h2>
                        <p className="text-sm text-neutral-500">
                          Fill in your details below and we'll be in touch.
                        </p>
                      </div>

                      {/* Form */}
                      <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Name */}
                        <div>
                          <label className="block text-sm text-neutral-400 mb-2">
                            Full name
                          </label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Jane Smith"
                            className="w-full px-4 py-3.5 bg-neutral-900/50 border border-neutral-800 rounded-xl text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-700 focus:bg-neutral-900 transition-all text-sm"
                            autoComplete="name"
                          />
                        </div>

                        {/* Email */}
                        <div>
                          <label className="block text-sm text-neutral-400 mb-2">
                            Work email
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="jane@company.com"
                            className="w-full px-4 py-3.5 bg-neutral-900/50 border border-neutral-800 rounded-xl text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-700 focus:bg-neutral-900 transition-all text-sm"
                            autoComplete="email"
                          />
                        </div>

                        {/* Company */}
                        <div>
                          <label className="block text-sm text-neutral-400 mb-2">
                            Company name
                            <span className="text-neutral-700 ml-1">— optional</span>
                          </label>
                          <input
                            type="text"
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                            placeholder="Acme Inc."
                            className="w-full px-4 py-3.5 bg-neutral-900/50 border border-neutral-800 rounded-xl text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-700 focus:bg-neutral-900 transition-all text-sm"
                            autoComplete="organization"
                          />
                        </div>

                        {/* Industry */}
                        <div>
                          <label className="block text-sm text-neutral-400 mb-2">
                            Industry
                            <span className="text-neutral-700 ml-1">— optional</span>
                          </label>
                          <div className="relative">
                            <select
                              name="industry"
                              value={formData.industry}
                              onChange={handleChange}
                              className="w-full px-4 py-3.5 bg-neutral-900/50 border border-neutral-800 rounded-xl text-white focus:outline-none focus:border-neutral-700 focus:bg-neutral-900 transition-all appearance-none cursor-pointer text-sm"
                            >
                              <option value="" className="bg-neutral-900 text-neutral-500">Select your industry</option>
                              {industries.map((industry) => (
                                <option key={industry} value={industry} className="bg-neutral-900 text-white">
                                  {industry}
                                </option>
                              ))}
                            </select>
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                <path d="M2.5 4.5L6 8L9.5 4.5" stroke="#525252" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </div>
                          </div>
                        </div>

                        {/* Error */}
                        <AnimatePresence>
                          {error && (
                            <motion.p
                              initial={{ opacity: 0, y: -5 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -5 }}
                              className="text-red-400 text-sm"
                            >
                              {error}
                            </motion.p>
                          )}
                        </AnimatePresence>

                        {/* Submit */}
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full py-3.5 bg-white hover:bg-neutral-100 text-black font-medium rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm group flex items-center justify-center gap-2"
                        >
                          {isSubmitting ? (
                            <>
                              <FaSpinner className="animate-spin text-xs" />
                              <span>Submitting...</span>
                            </>
                          ) : (
                            <>
                              <span>Continue to scheduling</span>
                              <FaArrowRight className="text-xs group-hover:translate-x-0.5 transition-transform" />
                            </>
                          )}
                        </button>
                      </form>

                      {/* Footer */}
                      <p className="mt-6 text-center text-xs text-neutral-600">
                        By submitting, you agree to our{' '}
                        <Link to="/privacy-policy" className="text-neutral-500 hover:text-neutral-400 underline underline-offset-2 transition-colors">
                          Privacy Policy
                        </Link>
                      </p>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="py-12 text-center"
                    >
                      <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                        <FaCheck className="text-2xl text-green-500" />
                      </div>
                      <h3 className="text-xl font-medium text-white mb-3">
                        You're all set
                      </h3>
                      <p className="text-neutral-400 text-sm mb-6 max-w-sm mx-auto">
                        Opening Calendly to schedule your demo. If it doesn't open automatically, click below.
                      </p>
                      <a
                        href="https://calendly.com/emrebenian-cogniaai/30min"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-neutral-100 text-black font-medium rounded-xl transition-colors text-sm"
                      >
                        Open Calendly
                        <FaArrowRight className="text-xs" />
                      </a>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Additional Info */}
              <div className="mt-6 flex items-center justify-center gap-6 text-xs text-neutral-600">
                <span className="flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  HIPAA Compliant
                </span>
                <span className="flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  SOC 2 Type II
                </span>
                <span className="flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  No credit card required
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Demo;
