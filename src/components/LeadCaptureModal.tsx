import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaCalendarCheck, FaSpinner, FaShieldAlt, FaHeadset, FaClock, FaCheckCircle } from 'react-icons/fa';
import conversionTracker from '../utils/conversionTracking';

interface LeadCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
  source?: string;
}

const industries = [
  'Healthcare',
  'Legal Services',
  'Retail',
  'Enterprise',
  'Hospitality',
  'Automotive',
  'Home Services',
  'Real Estate',
  'Insurance',
  'Other',
];

const LeadCaptureModal: React.FC<LeadCaptureModalProps> = ({ isOpen, onClose, source = 'unknown' }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
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
    setIsSubmitting(true);
    setError('');

    if (!formData.name || !formData.email || !formData.phone || !formData.industry) {
      setError('Please fill in all fields');
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('https://formspree.io/f/mqarlrwl', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          _subject: `Demo Request from ${formData.name} - ${formData.industry}`,
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
        setFormData({ name: '', email: '', phone: '', industry: '' });
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
            onClick={onClose}
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-[100]"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 40 }}
            transition={{ type: 'spring', damping: 30, stiffness: 400 }}
            className="fixed inset-0 z-[101] flex items-center justify-center p-4"
          >
            <div className="relative w-full max-w-lg bg-gradient-to-b from-gray-900 to-black border border-white/10 rounded-3xl shadow-2xl shadow-cyan-500/10 overflow-hidden">
              {/* Decorative gradient line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-blue-500" />

              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-5 right-5 w-10 h-10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 rounded-xl transition-all z-10"
                aria-label="Close"
              >
                <FaTimes />
              </button>

              {/* Header */}
              <div className="px-8 pt-8 pb-6">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-cyan-500/30">
                    <FaCalendarCheck className="text-white text-xl" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-1">Schedule Your Demo</h2>
                    <p className="text-gray-400 text-sm">See how AI can transform your business</p>
                  </div>
                </div>

                {/* Trust badges */}
                <div className="flex items-center gap-4 mt-6 pt-6 border-t border-white/5">
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <FaShieldAlt className="text-green-400" />
                    <span>HIPAA Compliant</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <FaHeadset className="text-cyan-400" />
                    <span>24/7 Support</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <FaClock className="text-purple-400" />
                    <span>1-Week Setup</span>
                  </div>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="px-8 pb-8">
                <div className="space-y-4">
                  {/* Name */}
                  <div>
                    <label className="block text-xs text-gray-400 uppercase tracking-wider mb-2 font-medium">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Smith"
                      className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 focus:bg-white/10 transition-all"
                      required
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs text-gray-400 uppercase tracking-wider mb-2 font-medium">
                      Work Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@company.com"
                      className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 focus:bg-white/10 transition-all"
                      required
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-xs text-gray-400 uppercase tracking-wider mb-2 font-medium">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+1 (555) 123-4567"
                      className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 focus:bg-white/10 transition-all"
                      required
                    />
                  </div>

                  {/* Industry */}
                  <div>
                    <label className="block text-xs text-gray-400 uppercase tracking-wider mb-2 font-medium">
                      Industry
                    </label>
                    <select
                      name="industry"
                      value={formData.industry}
                      onChange={handleChange}
                      className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-500/50 focus:bg-white/10 transition-all appearance-none cursor-pointer"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236B7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                        backgroundPosition: 'right 16px center',
                        backgroundSize: '20px',
                        backgroundRepeat: 'no-repeat'
                      }}
                      required
                    >
                      <option value="" disabled className="bg-gray-900 text-gray-400">Select your industry</option>
                      {industries.map((industry) => (
                        <option key={industry} value={industry} className="bg-gray-900 text-white">
                          {industry}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Error message */}
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm text-center"
                  >
                    {error}
                  </motion.div>
                )}

                {/* Submit button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className="w-full mt-6 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40"
                >
                  {isSubmitting ? (
                    <>
                      <FaSpinner className="animate-spin" />
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <span>Continue to Schedule</span>
                      <span className="text-lg">→</span>
                    </>
                  )}
                </motion.button>

                {/* Benefits list */}
                <div className="mt-6 grid grid-cols-2 gap-2">
                  {[
                    '1-Week Free Trial',
                    'No Credit Card',
                    'Cancel Anytime',
                    '24/7 Support',
                  ].map((benefit, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-gray-400">
                      <FaCheckCircle className="text-green-400 flex-shrink-0" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default LeadCaptureModal;
