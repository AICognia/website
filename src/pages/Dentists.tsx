import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import {
  FaPhone,
  FaCalendarCheck,
  FaClock,
  FaChartLine,
  FaShieldAlt,
  FaCheckCircle,
  FaArrowRight,
  FaSpinner,
  FaTimes
} from 'react-icons/fa';
import conversionTracker from '../utils/conversionTracking';

const Dentists: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    practiceName: '',
    phone: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
          _subject: `Dentist Demo Request from ${formData.name}${formData.practiceName ? ` at ${formData.practiceName}` : ''}`,
          form_type: 'dentist_landing_page',
          source: 'dentists_page',
          industry: 'dental',
          submitted_at: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        conversionTracker.trackDemoBooking('dentists_page');
        conversionTracker.trackButtonClick('Dentist Lead Form Submitted', 'dentists_page');
        setIsSubmitted(true);
        // Open Calendly immediately for better UX
        window.open('https://calendly.com/emrebenian-cogniaai/30min', '_blank');
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
        <title>AI Receptionist for Dentists | Never Miss Another Patient Call | Cognia AI</title>
        <meta name="description" content="Stop losing $100,000+ annually from missed calls. Cognia AI answers every patient call 24/7, books appointments automatically, and integrates with your practice management system. HIPAA compliant." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen bg-black">
        {/* Subtle gradient background */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        </div>

        <div className="relative">
          {/* Hero Section */}
          <section className="max-w-7xl mx-auto px-6 lg:px-8 pt-12 lg:pt-20 pb-16 lg:pb-24">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Left Column - Value Proposition */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-500/10 border border-green-500/20 rounded-full text-xs text-green-400 mb-6">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                  HIPAA Compliant · 7-Day Free Trial
                </div>

                {/* Headline */}
                <h1 className="text-4xl lg:text-6xl font-bold text-white tracking-tight leading-tight mb-6">
                  Stop Losing <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">$100,000+</span> Annually From Missed Calls
                </h1>

                {/* Sub-headline */}
                <p className="text-xl text-neutral-300 leading-relaxed mb-8">
                  Your AI receptionist that answers <span className="text-white font-medium">every patient call 24/7</span>, books appointments automatically, and never takes a sick day.
                </p>

                {/* Key Stats */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-4">
                    <div className="text-2xl font-bold text-cyan-400 mb-1">100%</div>
                    <div className="text-sm text-neutral-400">Call Answer Rate</div>
                  </div>
                  <div className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-4">
                    <div className="text-2xl font-bold text-cyan-400 mb-1">24/7</div>
                    <div className="text-sm text-neutral-400">Always Available</div>
                  </div>
                  <div className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-4">
                    <div className="text-2xl font-bold text-cyan-400 mb-1">80%</div>
                    <div className="text-sm text-neutral-400">Fewer No-Shows</div>
                  </div>
                  <div className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-4">
                    <div className="text-2xl font-bold text-cyan-400 mb-1">40%</div>
                    <div className="text-sm text-neutral-400">More New Patients</div>
                  </div>
                </div>

                {/* Trust Indicators */}
                <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-500">
                  <div className="flex items-center gap-1.5">
                    <FaShieldAlt className="text-green-500" />
                    HIPAA Compliant
                  </div>
                  <div className="flex items-center gap-1.5">
                    <FaCheckCircle className="text-green-500" />
                    Integrates with OpenDental, EagleSoft, Denticon
                  </div>
                  <div className="flex items-center gap-1.5">
                    <FaCheckCircle className="text-green-500" />
                    Setup in 24-48 hours
                  </div>
                </div>
              </motion.div>

              {/* Right Column - Form */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="bg-gradient-to-br from-neutral-900 to-neutral-950 border border-neutral-800 rounded-2xl p-8 lg:p-10 shadow-2xl">
                  <AnimatePresence mode="wait">
                    {!isSubmitted ? (
                      <motion.div
                        key="form"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0, y: -20 }}
                      >
                        {/* Form Header */}
                        <div className="mb-6">
                          <h2 className="text-2xl font-bold text-white mb-2">
                            Get Your Free Demo
                          </h2>
                          <p className="text-sm text-neutral-400">
                            See how you can capture every patient call and grow your practice.
                          </p>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-4">
                          <div>
                            <label className="block text-sm text-neutral-400 mb-2">
                              Your Name *
                            </label>
                            <input
                              type="text"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              placeholder="Dr. Smith"
                              className="w-full px-4 py-3.5 bg-neutral-900/50 border border-neutral-700 rounded-xl text-white placeholder-neutral-600 focus:outline-none focus:border-cyan-500 focus:bg-neutral-900 transition-all text-sm"
                              autoComplete="name"
                            />
                          </div>

                          <div>
                            <label className="block text-sm text-neutral-400 mb-2">
                              Email Address *
                            </label>
                            <input
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              placeholder="drsmith@dentalpractice.com"
                              className="w-full px-4 py-3.5 bg-neutral-900/50 border border-neutral-700 rounded-xl text-white placeholder-neutral-600 focus:outline-none focus:border-cyan-500 focus:bg-neutral-900 transition-all text-sm"
                              autoComplete="email"
                            />
                          </div>

                          <div>
                            <label className="block text-sm text-neutral-400 mb-2">
                              Practice Name
                            </label>
                            <input
                              type="text"
                              name="practiceName"
                              value={formData.practiceName}
                              onChange={handleChange}
                              placeholder="Smile Dental Care"
                              className="w-full px-4 py-3.5 bg-neutral-900/50 border border-neutral-700 rounded-xl text-white placeholder-neutral-600 focus:outline-none focus:border-cyan-500 focus:bg-neutral-900 transition-all text-sm"
                              autoComplete="organization"
                            />
                          </div>

                          <div>
                            <label className="block text-sm text-neutral-400 mb-2">
                              Phone Number
                            </label>
                            <input
                              type="tel"
                              name="phone"
                              value={formData.phone}
                              onChange={handleChange}
                              placeholder="(555) 123-4567"
                              className="w-full px-4 py-3.5 bg-neutral-900/50 border border-neutral-700 rounded-xl text-white placeholder-neutral-600 focus:outline-none focus:border-cyan-500 focus:bg-neutral-900 transition-all text-sm"
                              autoComplete="tel"
                            />
                          </div>

                          {/* Error */}
                          <AnimatePresence>
                            {error && (
                              <motion.div
                                initial={{ opacity: 0, y: -5 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -5 }}
                                className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-lg"
                              >
                                <FaTimes className="text-red-400 text-sm flex-shrink-0" />
                                <p className="text-red-400 text-sm">{error}</p>
                              </motion.div>
                            )}
                          </AnimatePresence>

                          {/* Submit */}
                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-semibold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm shadow-lg shadow-cyan-500/20 group flex items-center justify-center gap-2"
                          >
                            {isSubmitting ? (
                              <>
                                <FaSpinner className="animate-spin text-sm" />
                                <span>Submitting...</span>
                              </>
                            ) : (
                              <>
                                <span>Get Free Demo Now</span>
                                <FaArrowRight className="text-sm group-hover:translate-x-1 transition-transform" />
                              </>
                            )}
                          </button>

                          <p className="text-center text-xs text-neutral-600 mt-4">
                            No credit card required · 7-day free trial · Cancel anytime
                          </p>
                        </form>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="success"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="py-12 text-center"
                      >
                        <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                          <FaCheckCircle className="text-3xl text-green-500" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-3">
                          You're All Set!
                        </h3>
                        <p className="text-neutral-400 text-sm mb-6 max-w-sm mx-auto">
                          Opening Calendly to schedule your personalized demo. If it doesn't open automatically, click below.
                        </p>
                        <a
                          href="https://calendly.com/emrebenian-cogniaai/30min"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-semibold rounded-xl transition-all text-sm shadow-lg"
                        >
                          Open Calendly
                          <FaArrowRight className="text-xs" />
                        </a>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Problem Section - The Cost of Missed Calls */}
          <section className="bg-gradient-to-b from-neutral-950 to-black border-y border-neutral-900 py-16 lg:py-20">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                  Your Practice Is Bleeding Money Right Now
                </h2>
                <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
                  Every missed call is a lost patient. Here's what it's costing you:
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="bg-neutral-900/30 border border-neutral-800 rounded-2xl p-8 text-center"
                >
                  <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <FaPhone className="text-3xl text-red-400" />
                  </div>
                  <div className="text-4xl font-bold text-white mb-2">30-35%</div>
                  <div className="text-neutral-400 mb-4">of calls go unanswered</div>
                  <div className="text-sm text-neutral-500">
                    That's 50-100 missed calls per month = lost revenue
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="bg-neutral-900/30 border border-neutral-800 rounded-2xl p-8 text-center"
                >
                  <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <FaChartLine className="text-3xl text-red-400" />
                  </div>
                  <div className="text-4xl font-bold text-white mb-2">$100k+</div>
                  <div className="text-neutral-400 mb-4">lost annually</div>
                  <div className="text-sm text-neutral-500">
                    Average revenue loss from missed patient calls alone
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="bg-neutral-900/30 border border-neutral-800 rounded-2xl p-8 text-center"
                >
                  <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <FaClock className="text-3xl text-red-400" />
                  </div>
                  <div className="text-4xl font-bold text-white mb-2">78%</div>
                  <div className="text-neutral-400 mb-4">book with first responder</div>
                  <div className="text-sm text-neutral-500">
                    If you don't answer, they're booking with your competitor
                  </div>
                </motion.div>
              </div>

              <div className="mt-12 text-center">
                <p className="text-lg text-neutral-300 mb-6">
                  <span className="text-red-400 font-semibold">63% of dental emergencies</span> happen after hours when your office is closed.
                </p>
                <p className="text-neutral-400">
                  Can you afford to keep losing patients?
                </p>
              </div>
            </div>
          </section>

          {/* Solution - How It Works */}
          <section className="py-16 lg:py-24">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                  How Cognia AI Captures Every Patient Call
                </h2>
                <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
                  Set up in 24-48 hours. Integrates seamlessly with your existing systems.
                </p>
              </div>

              <div className="grid lg:grid-cols-3 gap-8">
                {[
                  {
                    icon: FaPhone,
                    title: '24/7 Call Answering',
                    description: 'Never miss a patient call again - even during lunch, after hours, or on holidays. Our AI answers instantly, every time.',
                    features: ['Handles unlimited calls simultaneously', 'Natural, human-like conversations', 'Bilingual support (English & Spanish)', 'Emergency call triage']
                  },
                  {
                    icon: FaCalendarCheck,
                    title: 'Automatic Appointment Booking',
                    description: 'Patients book appointments directly during the call. No more phone tag or scheduling delays.',
                    features: ['Real-time calendar integration', 'Automated reminders = 80% fewer no-shows', 'Waitlist management', 'Reschedule & cancellations handled']
                  },
                  {
                    icon: FaShieldAlt,
                    title: 'Seamless Integration',
                    description: 'Works with your existing practice management software. HIPAA compliant and secure.',
                    features: ['OpenDental, EagleSoft, Denticon & more', 'HIPAA compliant data handling', 'Setup in 24-48 hours', 'No hardware changes needed']
                  }
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-neutral-900/30 border border-neutral-800 rounded-2xl p-8 hover:border-cyan-500/30 transition-colors"
                  >
                    <div className="w-14 h-14 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-xl flex items-center justify-center mb-6">
                      <feature.icon className="text-2xl text-cyan-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                    <p className="text-neutral-400 mb-6 leading-relaxed">{feature.description}</p>
                    <ul className="space-y-2">
                      {feature.features.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-neutral-300">
                          <FaCheckCircle className="text-cyan-400 mt-0.5 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* ROI Section */}
          <section className="bg-gradient-to-b from-black to-neutral-950 border-y border-neutral-900 py-16 lg:py-20">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                  The Numbers Don't Lie
                </h2>
                <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
                  Practices using Cognia AI see measurable results within the first month
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {[
                  { stat: '3-5x', label: 'ROI in First Year' },
                  { stat: '+40%', label: 'New Patient Acquisition' },
                  { stat: '-80%', label: 'Missed Appointments' },
                  { stat: '-30%', label: 'Staff Workload' }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-2xl p-6 text-center"
                  >
                    <div className="text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 mb-2">
                      {item.stat}
                    </div>
                    <div className="text-neutral-300 font-medium">{item.label}</div>
                  </motion.div>
                ))}
              </div>

              <div className="bg-neutral-900/50 border border-neutral-800 rounded-2xl p-8 lg:p-12">
                <div className="max-w-3xl mx-auto text-center">
                  <p className="text-2xl text-white font-medium mb-6">
                    "Most practices achieve <span className="text-cyan-400">full ROI within 3 months</span> from increased bookings alone."
                  </p>
                  <p className="text-neutral-400 mb-8">
                    That doesn't even count the savings from reduced staff overhead, fewer no-shows, and zero missed emergency calls.
                  </p>
                  <a
                    href="#form"
                    onClick={(e) => {
                      e.preventDefault();
                      document.querySelector('form')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }}
                    className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-semibold rounded-xl transition-all shadow-lg shadow-cyan-500/20"
                  >
                    Start Your Free Trial
                    <FaArrowRight className="text-sm" />
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* Social Proof */}
          <section className="py-16 lg:py-20">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                  Trusted by Dental Practices Nationwide
                </h2>
                <p className="text-lg text-neutral-400">
                  See what dentists are saying about Cognia AI
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {[
                  {
                    quote: "We were losing at least 30 calls a week during peak hours. Since implementing Cognia AI, we haven't missed a single call and our new patient bookings are up 45%. The ROI was immediate.",
                    author: "Dr. Sarah Mitchell",
                    role: "Practice Owner, Smile Dental Care",
                    metric: "+45% new patients"
                  },
                  {
                    quote: "After-hours emergencies used to go straight to voicemail. Now our AI handles them 24/7, triages urgency, and books emergency appointments automatically. Our patients love it.",
                    author: "Dr. James Chen",
                    role: "Cosmetic & Family Dentistry",
                    metric: "100% call coverage"
                  }
                ].map((testimonial, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-neutral-900/30 border border-neutral-800 rounded-2xl p-8"
                  >
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-neutral-300 leading-relaxed mb-6 italic">"{testimonial.quote}"</p>
                    <div className="flex items-center justify-between pt-6 border-t border-neutral-800">
                      <div>
                        <div className="font-semibold text-white">{testimonial.author}</div>
                        <div className="text-sm text-neutral-500">{testimonial.role}</div>
                      </div>
                      <div className="px-3 py-1.5 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-sm text-cyan-400 font-medium">
                        {testimonial.metric}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* FAQ / Objection Handling */}
          <section className="bg-neutral-950 border-y border-neutral-900 py-16 lg:py-20">
            <div className="max-w-4xl mx-auto px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                  Common Questions
                </h2>
              </div>

              <div className="space-y-4">
                {[
                  {
                    question: "Is this HIPAA compliant?",
                    answer: "Absolutely. Cognia AI is fully HIPAA compliant. All patient data is encrypted and handled according to strict healthcare privacy regulations."
                  },
                  {
                    question: "Will it integrate with my practice management software?",
                    answer: "Yes. Cognia AI integrates seamlessly with all major dental practice management systems including OpenDental, EagleSoft, Denticon, Dentrix, and many others. Setup takes 24-48 hours."
                  },
                  {
                    question: "What if patients don't like talking to AI?",
                    answer: "Our AI has natural, human-like conversations that patients can't tell apart from a real receptionist. In fact, 95%+ of patients rate their experience as excellent. They care about getting their appointment booked quickly - not whether it's AI or human."
                  },
                  {
                    question: "How long does it take to set up?",
                    answer: "Most practices are up and running within 24-48 hours. We handle all the technical integration with your phone system and practice management software."
                  },
                  {
                    question: "What about bilingual patients?",
                    answer: "Cognia AI is fluent in English and Spanish, automatically detecting and responding in the patient's preferred language."
                  },
                  {
                    question: "Can I try it before committing?",
                    answer: "Yes! We offer a 7-day free trial with no credit card required. See the results for yourself before making any commitment."
                  }
                ].map((faq, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="bg-neutral-900/30 border border-neutral-800 rounded-xl p-6 hover:border-neutral-700 transition-colors"
                  >
                    <h3 className="text-lg font-semibold text-white mb-3">{faq.question}</h3>
                    <p className="text-neutral-400 leading-relaxed">{faq.answer}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Final CTA */}
          <section className="py-16 lg:py-24">
            <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-3xl p-12 lg:p-16"
              >
                <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">
                  Stop Losing Patients to Missed Calls
                </h2>
                <p className="text-xl text-neutral-300 mb-8 max-w-2xl mx-auto">
                  Join hundreds of dental practices using AI to capture every patient call, book more appointments, and grow their revenue.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
                  <a
                    href="#form"
                    onClick={(e) => {
                      e.preventDefault();
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-semibold rounded-xl transition-all shadow-lg shadow-cyan-500/20 inline-flex items-center gap-2"
                  >
                    Get Your Free Demo
                    <FaArrowRight />
                  </a>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-neutral-400">
                  <div className="flex items-center gap-2">
                    <FaCheckCircle className="text-green-500" />
                    7-day free trial
                  </div>
                  <div className="flex items-center gap-2">
                    <FaCheckCircle className="text-green-500" />
                    No credit card required
                  </div>
                  <div className="flex items-center gap-2">
                    <FaCheckCircle className="text-green-500" />
                    Setup in 24-48 hours
                  </div>
                </div>
              </motion.div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default Dentists;
