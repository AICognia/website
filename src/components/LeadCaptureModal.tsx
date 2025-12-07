import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaSpinner } from 'react-icons/fa';
import conversionTracker from '../utils/conversionTracking';

interface LeadCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
  source?: string;
}

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

const LeadCaptureModal: React.FC<LeadCaptureModalProps> = ({ isOpen, onClose, source = 'unknown' }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    industry: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

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
          source: source,
          submitted_at: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        conversionTracker.trackDemoBooking(source);
        conversionTracker.trackButtonClick('Lead Form Submitted', source);
        onClose();
        setTimeout(() => {
          window.open('https://calendly.com/emrebenian-cogniaai/30min', '_blank');
        }, 300);
        setFormData({ name: '', email: '', company: '', industry: '' });
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
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100]"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 10 }}
            transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
            className="fixed inset-0 z-[101] flex items-center justify-center p-4"
          >
            <div className="relative w-full max-w-md">
              {/* Modal Content */}
              <div className="relative bg-[#0a0a0a] border border-neutral-800 rounded-2xl overflow-hidden">
                {/* Close button */}
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-neutral-500 hover:text-neutral-300 rounded-lg hover:bg-neutral-800/50 transition-colors z-10"
                  aria-label="Close"
                >
                  <FaTimes className="text-sm" />
                </button>

                {/* Form Container */}
                <div className="p-8 md:p-10">
                  {/* Header */}
                  <div className="mb-8">
                    <h2 className="text-2xl font-medium text-white tracking-tight">
                      Schedule a demo
                    </h2>
                    <p className="mt-2 text-neutral-400 text-sm leading-relaxed">
                      See how AI can transform your customer communications.
                    </p>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Name */}
                    <div>
                      <label className="block text-sm text-neutral-300 mb-2">
                        Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Jane Smith"
                        className="w-full px-4 py-3 bg-neutral-900 border border-neutral-800 rounded-lg text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-600 focus:ring-1 focus:ring-neutral-600 transition-colors text-sm"
                        autoComplete="name"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-sm text-neutral-300 mb-2">
                        Work email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="jane@company.com"
                        className="w-full px-4 py-3 bg-neutral-900 border border-neutral-800 rounded-lg text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-600 focus:ring-1 focus:ring-neutral-600 transition-colors text-sm"
                        autoComplete="email"
                      />
                    </div>

                    {/* Company */}
                    <div>
                      <label className="block text-sm text-neutral-300 mb-2">
                        Company
                        <span className="text-neutral-600 ml-1">(optional)</span>
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Acme Inc."
                        className="w-full px-4 py-3 bg-neutral-900 border border-neutral-800 rounded-lg text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-600 focus:ring-1 focus:ring-neutral-600 transition-colors text-sm"
                        autoComplete="organization"
                      />
                    </div>

                    {/* Industry */}
                    <div>
                      <label className="block text-sm text-neutral-300 mb-2">
                        Industry
                        <span className="text-neutral-600 ml-1">(optional)</span>
                      </label>
                      <div className="relative">
                        <select
                          name="industry"
                          value={formData.industry}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-neutral-900 border border-neutral-800 rounded-lg text-white focus:outline-none focus:border-neutral-600 focus:ring-1 focus:ring-neutral-600 transition-colors appearance-none cursor-pointer text-sm"
                        >
                          <option value="" className="bg-neutral-900 text-neutral-500">Select industry</option>
                          {industries.map((industry) => (
                            <option key={industry} value={industry} className="bg-neutral-900 text-white">
                              {industry}
                            </option>
                          ))}
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                      className="w-full py-3 bg-white hover:bg-neutral-100 text-black font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm mt-2"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center justify-center gap-2">
                          <FaSpinner className="animate-spin text-xs" />
                          <span>Submitting...</span>
                        </span>
                      ) : (
                        'Continue to scheduling'
                      )}
                    </button>
                  </form>

                  {/* Footer */}
                  <p className="mt-6 text-center text-xs text-neutral-600">
                    By submitting, you agree to our{' '}
                    <a href="/privacy" className="text-neutral-400 hover:text-neutral-300 underline underline-offset-2">
                      Privacy Policy
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default LeadCaptureModal;
