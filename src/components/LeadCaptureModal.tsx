import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaCalendarCheck, FaSpinner } from 'react-icons/fa';
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

    // Basic validation
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
        // Track conversion
        conversionTracker.trackDemoBooking(source);
        conversionTracker.trackButtonClick('Lead Form Submitted', source);

        // Close modal and redirect to Calendly
        onClose();

        // Small delay to let modal close animation complete
        setTimeout(() => {
          window.open('https://calendly.com/emrebenian-cogniaai/30min', '_blank');
        }, 300);

        // Reset form
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
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100]"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-[101] flex items-center justify-center p-4"
          >
            <div className="relative w-full max-w-md bg-gray-950 border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white transition-colors z-10"
                aria-label="Close"
              >
                <FaTimes />
              </button>

              {/* Header */}
              <div className="bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-cyan-500/20 px-6 py-5 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
                    <FaCalendarCheck className="text-black text-lg" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-white">Book Your Demo</h2>
                    <p className="text-sm text-gray-400">Quick form, then pick your time</p>
                  </div>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                {/* Name */}
                <div>
                  <label className="block text-xs text-gray-400 uppercase tracking-wider mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Smith"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 transition-colors"
                    required
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs text-gray-400 uppercase tracking-wider mb-2">
                    Work Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@company.com"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 transition-colors"
                    required
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-xs text-gray-400 uppercase tracking-wider mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 123-4567"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 transition-colors"
                    required
                  />
                </div>

                {/* Industry */}
                <div>
                  <label className="block text-xs text-gray-400 uppercase tracking-wider mb-2">
                    Industry *
                  </label>
                  <select
                    name="industry"
                    value={formData.industry}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-500/50 transition-colors appearance-none cursor-pointer"
                    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%239CA3AF'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundPosition: 'right 12px center', backgroundSize: '20px', backgroundRepeat: 'no-repeat' }}
                    required
                  >
                    <option value="" disabled className="bg-gray-900">Select your industry</option>
                    {industries.map((industry) => (
                      <option key={industry} value={industry} className="bg-gray-900">
                        {industry}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Error message */}
                {error && (
                  <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm text-center">
                    {error}
                  </div>
                )}

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-white hover:bg-gray-100 text-black font-semibold rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <FaSpinner className="animate-spin" />
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <span>Continue to Schedule</span>
                      <span>→</span>
                    </>
                  )}
                </button>

                {/* Trust indicators */}
                <div className="flex items-center justify-center gap-4 pt-2 text-[10px] text-gray-500">
                  <span>✓ No spam</span>
                  <span>✓ 1-week free trial</span>
                  <span>✓ Cancel anytime</span>
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
