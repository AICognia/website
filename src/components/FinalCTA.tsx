import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowRight, FaCheckCircle, FaSpinner, FaCheck } from 'react-icons/fa';
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

const FinalCTA: React.FC = () => {
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
          source: 'final_cta',
          submitted_at: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        conversionTracker.trackDemoBooking('final_cta');
        conversionTracker.trackButtonClick('Lead Form Submitted', 'final_cta');
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
    <section className="relative bg-black py-20 lg:py-28 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-cyan-950/20 via-black to-black" />

      <div className="relative container mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center"
        >
          {/* Urgency Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 bg-cyan-500/10 border border-cyan-500/20 rounded-full">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
            </span>
            <span className="text-sm text-cyan-400 font-medium">Limited spots available this month</span>
          </div>

          {/* Headline */}
          <h2 className="text-3xl lg:text-5xl font-light text-white mb-4">
            Stop Losing Calls.
            <br />
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Start Closing More.
            </span>
          </h2>

          {/* Subheadline */}
          <p className="text-lg text-gray-400 mb-10 max-w-xl mx-auto">
            Join 50+ businesses that never miss a call.
            Get your AI receptionist live in 1 week.
          </p>

          {/* Form */}
          <div className="max-w-md mx-auto">
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name & Email Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Full name"
                        className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 focus:bg-white/[0.07] transition-all text-sm"
                        autoComplete="name"
                      />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Work email"
                        className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 focus:bg-white/[0.07] transition-all text-sm"
                        autoComplete="email"
                      />
                    </div>

                    {/* Company & Industry Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Company (optional)"
                        className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 focus:bg-white/[0.07] transition-all text-sm"
                        autoComplete="organization"
                      />
                      <div className="relative">
                        <select
                          name="industry"
                          value={formData.industry}
                          onChange={handleChange}
                          className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-500/50 focus:bg-white/[0.07] transition-all appearance-none cursor-pointer text-sm"
                        >
                          <option value="" className="bg-neutral-900 text-gray-500">Industry (optional)</option>
                          {industries.map((industry) => (
                            <option key={industry} value={industry} className="bg-neutral-900 text-white">
                              {industry}
                            </option>
                          ))}
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                            <path d="M2.5 4.5L6 8L9.5 4.5" stroke="#6b7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
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
                          className="text-red-400 text-sm text-left"
                        >
                          {error}
                        </motion.p>
                      )}
                    </AnimatePresence>

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-semibold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm group flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40"
                    >
                      {isSubmitting ? (
                        <>
                          <FaSpinner className="animate-spin text-xs" />
                          <span>Submitting...</span>
                        </>
                      ) : (
                        <>
                          <span>Get Your AI Receptionist</span>
                          <FaArrowRight className="text-xs group-hover:translate-x-0.5 transition-transform" />
                        </>
                      )}
                    </button>
                  </form>

                  {/* Privacy note */}
                  <p className="mt-4 text-center text-xs text-gray-600">
                    By submitting, you agree to our{' '}
                    <Link to="/privacy-policy" className="text-gray-500 hover:text-gray-400 underline underline-offset-2 transition-colors">
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
                  <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <FaCheck className="text-2xl text-green-500" />
                  </div>
                  <h3 className="text-xl font-medium text-white mb-3">
                    You're all set
                  </h3>
                  <p className="text-gray-400 text-sm mb-6 max-w-sm mx-auto">
                    Opening Calendly to schedule your demo. If it doesn't open automatically, click below.
                  </p>
                  <a
                    href="https://calendly.com/emrebenian-cogniaai/30min"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-medium rounded-xl transition-all text-sm shadow-lg shadow-cyan-500/25"
                  >
                    Open Calendly
                    <FaArrowRight className="text-xs" />
                  </a>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap justify-center items-center gap-6 text-xs text-gray-500 mt-8">
            <span className="flex items-center gap-2">
              <FaCheckCircle className="text-green-400" />
              1 Week Free Trial
            </span>
            <span className="flex items-center gap-2">
              <FaCheckCircle className="text-green-400" />
              No Credit Card Required
            </span>
            <span className="flex items-center gap-2">
              <FaCheckCircle className="text-green-400" />
              HIPAA Compliant
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTA;
