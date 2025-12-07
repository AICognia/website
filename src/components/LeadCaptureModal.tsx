import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaCalendarCheck, FaSpinner, FaShieldAlt, FaCheckCircle, FaArrowRight, FaArrowLeft, FaPhone, FaStar, FaPlay, FaBuilding, FaUsers, FaRocket } from 'react-icons/fa';
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

const companySizes = [
  '1-10 employees',
  '11-50 employees',
  '51-200 employees',
  '201-500 employees',
  '500+ employees',
];

const testimonials = [
  {
    quote: "Cognia AI reduced our missed calls by 95% and increased bookings by 40%.",
    author: "Dr. Sarah Chen",
    role: "Medical Director",
    company: "Wellness Medical Group"
  },
  {
    quote: "Setup took 3 days. Now our AI handles 500+ calls daily with 98% satisfaction.",
    author: "Michael Torres",
    role: "Operations Manager",
    company: "AutoMax Dealership"
  }
];

const LeadCaptureModal: React.FC<LeadCaptureModalProps> = ({ isOpen, onClose, source = 'unknown' }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    industry: '',
    companySize: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [testimonialIndex] = useState(Math.floor(Math.random() * testimonials.length));

  const totalSteps = 2;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  const handleNext = () => {
    if (step === 1) {
      if (!formData.name || !formData.email) {
        setError('Please fill in your name and email');
        return;
      }
      // Basic email validation
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        setError('Please enter a valid email address');
        return;
      }
      setStep(2);
      setError('');
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
      setError('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.industry) {
      setError('Please select your industry');
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
        setFormData({ name: '', email: '', phone: '', industry: '', companySize: '' });
        setStep(1);
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

  const currentTestimonial = testimonials[testimonialIndex];

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
            className="fixed inset-0 bg-black/95 backdrop-blur-xl z-[100]"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: 'spring', damping: 30, stiffness: 400 }}
            className="fixed inset-0 z-[101] flex items-center justify-center p-4 overflow-y-auto"
          >
            <div className="relative w-full max-w-5xl my-8">
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute -top-12 right-0 md:top-4 md:right-4 w-10 h-10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 rounded-xl transition-all z-20"
                aria-label="Close"
              >
                <FaTimes className="text-lg" />
              </button>

              <div className="bg-gradient-to-br from-gray-900 via-gray-900 to-black border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
                <div className="grid lg:grid-cols-2">
                  {/* Left Side - Value Proposition */}
                  <div className="hidden lg:flex flex-col justify-between p-10 bg-gradient-to-br from-cyan-950/50 via-blue-950/30 to-purple-950/50 border-r border-white/5">
                    {/* Header */}
                    <div>
                      <div className="flex items-center gap-2 mb-6">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                          <FaRocket className="text-white" />
                        </div>
                        <span className="text-white font-semibold text-lg">Cognia AI</span>
                      </div>

                      <h2 className="text-3xl font-light text-white mb-4 leading-tight">
                        Transform your business with
                        <span className="block font-medium bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                          AI-powered calls
                        </span>
                      </h2>

                      <p className="text-gray-400 mb-8">
                        Join 50+ businesses already using AI receptionists to capture more leads, book more appointments, and never miss a call.
                      </p>

                      {/* Stats */}
                      <div className="grid grid-cols-3 gap-4 mb-8">
                        {[
                          { value: '95%', label: 'Call Capture' },
                          { value: '40%', label: 'More Bookings' },
                          { value: '1 Week', label: 'Setup Time' },
                        ].map((stat, i) => (
                          <div key={i} className="text-center p-3 bg-white/5 rounded-xl border border-white/5">
                            <div className="text-xl font-bold text-cyan-400">{stat.value}</div>
                            <div className="text-xs text-gray-500">{stat.label}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Testimonial */}
                    <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                      <div className="flex gap-1 mb-3">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <FaStar key={i} className="text-yellow-400 text-sm" />
                        ))}
                      </div>
                      <p className="text-gray-300 text-sm mb-4 italic">
                        "{currentTestimonial.quote}"
                      </p>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center text-white font-bold">
                          {currentTestimonial.author.charAt(0)}
                        </div>
                        <div>
                          <div className="text-white text-sm font-medium">{currentTestimonial.author}</div>
                          <div className="text-gray-500 text-xs">{currentTestimonial.role}, {currentTestimonial.company}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Side - Form */}
                  <div className="p-6 md:p-10">
                    {/* Mobile Header */}
                    <div className="lg:hidden mb-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
                          <FaCalendarCheck className="text-white text-xl" />
                        </div>
                        <div>
                          <h2 className="text-xl font-bold text-white">Book Your Demo</h2>
                          <p className="text-gray-400 text-sm">See AI in action</p>
                        </div>
                      </div>
                    </div>

                    {/* Desktop Header */}
                    <div className="hidden lg:block mb-8">
                      <h2 className="text-2xl font-bold text-white mb-2">Book Your Demo</h2>
                      <p className="text-gray-400">Fill in your details to schedule a personalized demo</p>
                    </div>

                    {/* Progress Indicator */}
                    <div className="mb-8">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-gray-500">Step {step} of {totalSteps}</span>
                        <span className="text-xs text-cyan-400">{step === 1 ? 'Contact Info' : 'Business Details'}</span>
                      </div>
                      <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
                          initial={{ width: '0%' }}
                          animate={{ width: `${(step / totalSteps) * 100}%` }}
                          transition={{ duration: 0.3 }}
                        />
                      </div>
                    </div>

                    <form onSubmit={handleSubmit}>
                      <AnimatePresence mode="wait">
                        {step === 1 && (
                          <motion.div
                            key="step1"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.2 }}
                            className="space-y-5"
                          >
                            {/* Name */}
                            <div>
                              <label className="block text-sm text-gray-300 mb-2 font-medium">
                                Full Name <span className="text-red-400">*</span>
                              </label>
                              <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="John Smith"
                                className="w-full px-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all text-base"
                                required
                              />
                            </div>

                            {/* Email */}
                            <div>
                              <label className="block text-sm text-gray-300 mb-2 font-medium">
                                Work Email <span className="text-red-400">*</span>
                              </label>
                              <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="john@company.com"
                                className="w-full px-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all text-base"
                                required
                              />
                            </div>

                            {/* Phone - Optional */}
                            <div>
                              <label className="block text-sm text-gray-300 mb-2 font-medium">
                                Phone Number <span className="text-gray-500">(optional)</span>
                              </label>
                              <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="+1 (555) 123-4567"
                                className="w-full px-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all text-base"
                              />
                            </div>
                          </motion.div>
                        )}

                        {step === 2 && (
                          <motion.div
                            key="step2"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.2 }}
                            className="space-y-5"
                          >
                            {/* Industry */}
                            <div>
                              <label className="block text-sm text-gray-300 mb-2 font-medium">
                                Industry <span className="text-red-400">*</span>
                              </label>
                              <div className="relative">
                                <FaBuilding className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                                <select
                                  name="industry"
                                  value={formData.industry}
                                  onChange={handleChange}
                                  className="w-full pl-11 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all appearance-none cursor-pointer text-base"
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

                            {/* Company Size */}
                            <div>
                              <label className="block text-sm text-gray-300 mb-2 font-medium">
                                Company Size <span className="text-gray-500">(optional)</span>
                              </label>
                              <div className="relative">
                                <FaUsers className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                                <select
                                  name="companySize"
                                  value={formData.companySize}
                                  onChange={handleChange}
                                  className="w-full pl-11 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all appearance-none cursor-pointer text-base"
                                  style={{
                                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236B7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                                    backgroundPosition: 'right 16px center',
                                    backgroundSize: '20px',
                                    backgroundRepeat: 'no-repeat'
                                  }}
                                >
                                  <option value="" className="bg-gray-900 text-gray-400">Select company size</option>
                                  {companySizes.map((size) => (
                                    <option key={size} value={size} className="bg-gray-900 text-white">
                                      {size}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>

                            {/* Quick info */}
                            <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-xl p-4">
                              <div className="flex items-start gap-3">
                                <div className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
                                  <FaPlay className="text-cyan-400 text-xs" />
                                </div>
                                <div>
                                  <p className="text-white text-sm font-medium mb-1">What happens next?</p>
                                  <p className="text-gray-400 text-xs">You'll pick a time for a personalized 30-minute demo where we'll show you exactly how Cognia AI can work for your business.</p>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Error message */}
                      <AnimatePresence>
                        {error && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm text-center"
                          >
                            {error}
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Buttons */}
                      <div className="flex gap-3 mt-6">
                        {step > 1 && (
                          <motion.button
                            type="button"
                            onClick={handleBack}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex items-center justify-center gap-2 px-5 py-4 border border-white/10 hover:border-white/20 hover:bg-white/5 text-white font-medium rounded-xl transition-all"
                          >
                            <FaArrowLeft className="text-xs" />
                            Back
                          </motion.button>
                        )}

                        {step < totalSteps ? (
                          <motion.button
                            type="button"
                            onClick={handleNext}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            className="flex-1 flex items-center justify-center gap-2 py-4 bg-white hover:bg-gray-100 text-black font-bold rounded-xl transition-all"
                          >
                            Continue
                            <FaArrowRight className="text-xs" />
                          </motion.button>
                        ) : (
                          <motion.button
                            type="submit"
                            disabled={isSubmitting}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            className="flex-1 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/25"
                          >
                            {isSubmitting ? (
                              <>
                                <FaSpinner className="animate-spin" />
                                <span>Submitting...</span>
                              </>
                            ) : (
                              <>
                                <FaCalendarCheck />
                                <span>Book My Demo</span>
                                <FaArrowRight className="text-xs" />
                              </>
                            )}
                          </motion.button>
                        )}
                      </div>

                      {/* Trust & Benefits */}
                      <div className="mt-6 pt-6 border-t border-white/5">
                        <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2 text-xs text-gray-500">
                          <span className="flex items-center gap-1.5">
                            <FaCheckCircle className="text-green-400" />
                            1 Week Free Trial
                          </span>
                          <span className="flex items-center gap-1.5">
                            <FaCheckCircle className="text-green-400" />
                            No Credit Card
                          </span>
                          <span className="flex items-center gap-1.5">
                            <FaShieldAlt className="text-cyan-400" />
                            HIPAA Compliant
                          </span>
                        </div>
                      </div>
                    </form>
                  </div>
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
