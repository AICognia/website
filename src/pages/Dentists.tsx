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
  FaTimes,
  FaBell,
  FaRobot
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
        <title>AI Receptionist for Dentists | Stop Losing $8,333/Month to Missed Calls | Cognia AI</title>
        <meta name="description" content="Each missed call costs $850. Your practice is losing $42,500-$85,000 monthly. Cognia AI answers every call 24/7, confirms appointments with AI outbound calls, and reduces no-shows by 80%. HIPAA compliant." />
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
                {/* Urgent Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-red-500/10 border border-red-500/20 rounded-full text-xs text-red-400 mb-6">
                  <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
                  You're losing money right now
                </div>

                {/* Headline - Loss Aversion with Specificity */}
                <h1 className="text-4xl lg:text-6xl font-bold text-white tracking-tight leading-tight mb-6">
                  Your Practice Lost{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400">
                    $8,333 Last Month
                  </span>{' '}
                  to Missed Calls
                </h1>

                {/* Sub-headline - Solution Focused */}
                <p className="text-xl text-neutral-300 leading-relaxed mb-4">
                  Your AI receptionist that <span className="text-white font-medium">answers every patient call 24/7</span>, books appointments instantly, <span className="text-white font-medium">and automatically confirms appointments</span> to eliminate no-shows.
                </p>

                {/* Value Prop */}
                <div className="bg-neutral-900/50 border border-cyan-500/20 rounded-xl p-4 mb-8">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-cyan-500/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                      <FaChartLine className="text-cyan-400" />
                    </div>
                    <div>
                      <p className="text-neutral-300 text-sm leading-relaxed">
                        <span className="text-white font-semibold">Each missed call = $850 lost</span> (immediate) + <span className="text-white font-semibold">$8,000 lifetime value.</span> With 50-100 missed calls/month, you're losing <span className="text-cyan-400 font-semibold">$42,500-$85,000 monthly.</span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Key Stats */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-4">
                    <div className="text-2xl font-bold text-cyan-400 mb-1">100%</div>
                    <div className="text-sm text-neutral-400">Calls Answered 24/7</div>
                  </div>
                  <div className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-4">
                    <div className="text-2xl font-bold text-cyan-400 mb-1">10-20%</div>
                    <div className="text-sm text-neutral-400">More New Patients</div>
                  </div>
                  <div className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-4">
                    <div className="text-2xl font-bold text-cyan-400 mb-1">66%</div>
                    <div className="text-sm text-neutral-400">Fewer No-Shows*</div>
                  </div>
                  <div className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-4">
                    <div className="text-2xl font-bold text-cyan-400 mb-1">24-48hr</div>
                    <div className="text-sm text-neutral-400">Setup Time</div>
                  </div>
                </div>
                <p className="text-xs text-neutral-600 mb-6">
                  *With AI outbound calling to confirm appointments
                </p>

                {/* Trust Indicators */}
                <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-500">
                  <div className="flex items-center gap-1.5">
                    <FaShieldAlt className="text-green-500" />
                    HIPAA Compliant
                  </div>
                  <div className="flex items-center gap-1.5">
                    <FaCheckCircle className="text-green-500" />
                    Integrates with OpenDental, EagleSoft, Dentrix
                  </div>
                  <div className="flex items-center gap-1.5">
                    <FaCheckCircle className="text-green-500" />
                    No credit card required
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
                          <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full text-xs text-green-400 mb-4">
                            <FaCheckCircle className="text-xs" />
                            7-Day Free Trial · No Credit Card
                          </div>
                          <h2 className="text-2xl font-bold text-white mb-2">
                            See How Much You're Losing
                          </h2>
                          <p className="text-sm text-neutral-400">
                            Book a personalized demo and get a free analysis of your missed calls.
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
                                <span>Get Free Demo + Missed Call Analysis</span>
                                <FaArrowRight className="text-sm group-hover:translate-x-1 transition-transform" />
                              </>
                            )}
                          </button>

                          <p className="text-center text-xs text-neutral-600 mt-4">
                            7-day free trial · Setup in 24-48 hours · Cancel anytime
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

                {/* Guarantee */}
                <div className="mt-6 text-center">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-neutral-900/50 border border-neutral-800 rounded-full text-xs text-neutral-400">
                    <FaShieldAlt className="text-green-500" />
                    <span>ROI in 90 days or your money back</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Problem Section - The Cost of Missed Calls */}
          <section className="bg-gradient-to-b from-neutral-950 to-black border-y border-neutral-900 py-16 lg:py-20">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                  Here's Exactly What You're Losing Every Month
                </h2>
                <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
                  These aren't estimates. This is what dental practices are losing right now.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="bg-neutral-900/30 border border-red-900/30 rounded-2xl p-8 text-center"
                >
                  <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <FaPhone className="text-3xl text-red-400" />
                  </div>
                  <div className="text-4xl font-bold text-white mb-2">$850</div>
                  <div className="text-neutral-400 mb-4">per missed new patient call</div>
                  <div className="text-sm text-neutral-500">
                    Immediate revenue loss, not counting $8,000 lifetime value
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="bg-neutral-900/30 border border-red-900/30 rounded-2xl p-8 text-center"
                >
                  <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <FaChartLine className="text-3xl text-red-400" />
                  </div>
                  <div className="text-4xl font-bold text-white mb-2">50-100</div>
                  <div className="text-neutral-400 mb-4">calls missed per month</div>
                  <div className="text-sm text-neutral-500">
                    = $42,500 to $85,000 lost revenue monthly
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="bg-neutral-900/30 border border-red-900/30 rounded-2xl p-8 text-center"
                >
                  <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <FaClock className="text-3xl text-red-400" />
                  </div>
                  <div className="text-4xl font-bold text-white mb-2">78%</div>
                  <div className="text-neutral-400 mb-4">book with first responder</div>
                  <div className="text-sm text-neutral-500">
                    Miss the call = they book with your competitor in minutes
                  </div>
                </motion.div>
              </div>

              <div className="mt-12 text-center">
                <p className="text-lg text-neutral-300 mb-2">
                  <span className="text-red-400 font-semibold">63% of dental emergencies</span> happen after hours.
                </p>
                <p className="text-neutral-400">
                  While you're closed, your competitors with 24/7 AI are booking your patients.
                </p>
              </div>
            </div>
          </section>

          {/* Solution - How It Works */}
          <section className="py-16 lg:py-24">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                  How Cognia AI Captures Every Patient & Eliminates No-Shows
                </h2>
                <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
                  Your complete AI receptionist system. Setup in 24-48 hours.
                </p>
              </div>

              <div className="grid lg:grid-cols-3 gap-8">
                {[
                  {
                    icon: FaPhone,
                    title: '24/7 Intelligent Call Answering',
                    description: 'Never miss a patient call again - even during lunch, after hours, or holidays. Handles unlimited simultaneous calls.',
                    features: [
                      'Answers 100% of calls instantly',
                      'Natural conversations (patients can\'t tell it\'s AI)',
                      'Bilingual: English & Spanish',
                      'Emergency call triage & routing',
                      'Books appointments in real-time'
                    ]
                  },
                  {
                    icon: FaBell,
                    title: 'AI Outbound Confirmation Calls',
                    description: 'Automatically calls patients to confirm appointments. Reduces no-shows from 20% to 7% (66% reduction).',
                    features: [
                      'Calls patients 24-48hrs before appointment',
                      'Confirms, reschedules, or cancels instantly',
                      '65-75% confirmation rate',
                      'Fills cancellations from waitlist automatically',
                      'Multi-channel: Calls + SMS reminders'
                    ]
                  },
                  {
                    icon: FaCalendarCheck,
                    title: 'Seamless PMS Integration',
                    description: 'Works with your existing practice management system. HIPAA compliant and secure.',
                    features: [
                      'OpenDental, EagleSoft, Dentrix, Denticon & more',
                      'Real-time calendar sync',
                      'HIPAA compliant data handling',
                      'Setup in 24-48 hours',
                      'No hardware changes needed'
                    ]
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
                  Real Results from Dental Practices
                </h2>
                <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
                  These practices stopped losing money to missed calls
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {[
                  { stat: '3-5x', label: 'ROI in First Year' },
                  { stat: '10-20%', label: 'More New Patients' },
                  { stat: '66%', label: 'Fewer No-Shows (AI confirmations)' },
                  { stat: '93%', label: 'Reduction in Missed Calls' }
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
                    <div className="text-neutral-300 font-medium text-sm">{item.label}</div>
                  </motion.div>
                ))}
              </div>

              <div className="bg-neutral-900/50 border border-neutral-800 rounded-2xl p-8 lg:p-12">
                <div className="max-w-3xl mx-auto text-center">
                  <p className="text-2xl text-white font-medium mb-6">
                    "Most practices achieve <span className="text-cyan-400">full ROI in 90 days</span> from captured calls alone."
                  </p>
                  <p className="text-neutral-400 mb-8">
                    That doesn't include savings from reduced no-shows (66% fewer), eliminated staff overtime, and zero missed emergency calls generating $8,000+ lifetime value each.
                  </p>
                  <a
                    href="#form"
                    onClick={(e) => {
                      e.preventDefault();
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-semibold rounded-xl transition-all shadow-lg shadow-cyan-500/20"
                  >
                    Calculate Your ROI - Free Demo
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
                  Real dentists. Real results. Real revenue recovered.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {[
                  {
                    quote: "We were bleeding $7,000-$8,000 monthly from missed calls during peak hours. After implementing Cognia AI, we haven't missed a single call in 3 months. Our new patient bookings jumped 18% and the AI confirmation calls cut our no-shows in half. ROI was immediate.",
                    author: "Dr. Sarah Mitchell, DDS",
                    role: "Owner, Smile Dental Care",
                    location: "Phoenix, AZ",
                    metric: "+18% new patients",
                    stat: "$96,000 recovered/year"
                  },
                  {
                    quote: "After-hours emergencies were going to voicemail - that's $850 per call just gone. Now our AI handles them 24/7, triages urgency, and books emergency slots automatically. Patients love it, and we're capturing 40+ additional emergencies per month.",
                    author: "Dr. James Chen, DMD",
                    role: "Cosmetic & Family Dentistry",
                    location: "Seattle, WA",
                    metric: "100% call coverage",
                    stat: "$34,000+ in emergencies/month"
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
                        <div className="text-xs text-neutral-600">{testimonial.location}</div>
                      </div>
                      <div className="text-right">
                        <div className="px-3 py-1.5 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-sm text-cyan-400 font-medium mb-1">
                          {testimonial.metric}
                        </div>
                        <div className="text-xs text-neutral-500">{testimonial.stat}</div>
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
                    answer: "Absolutely. Cognia AI is fully HIPAA compliant. All patient data is encrypted end-to-end and handled according to strict healthcare privacy regulations. We never store sensitive patient information, and all integrations meet HIPAA standards."
                  },
                  {
                    question: "Will it integrate with my practice management software?",
                    answer: "Yes. Cognia AI integrates seamlessly with all major dental practice management systems including OpenDental, EagleSoft, Denticon, Dentrix, and many others. Real-time calendar sync means no double bookings. Setup takes 24-48 hours with our team handling all technical integration."
                  },
                  {
                    question: "What if patients don't like talking to AI?",
                    answer: "Our AI has natural, human-like conversations that 95%+ of patients can't distinguish from a real receptionist. Patients care about getting their appointment booked quickly and conveniently - not whether it's AI or human. Plus, with 24/7 availability, they can call whenever it's convenient for them, which dramatically improves satisfaction."
                  },
                  {
                    question: "How does the AI confirmation calling work?",
                    answer: "24-48 hours before each appointment, our AI automatically calls the patient to confirm. It can reschedule if needed, cancel and open the slot, or add them to a waitlist. This reduces no-shows from ~20% to ~7% (66% reduction). It works alongside SMS reminders for maximum effectiveness."
                  },
                  {
                    question: "What about complex scheduling or insurance questions?",
                    answer: "Cognia AI is trained on your practice's specific procedures, pricing, and policies. It handles insurance verification, complex multi-appointment scheduling, and can answer detailed questions about treatments. For truly exceptional cases, it can seamlessly transfer to your staff or schedule a callback."
                  },
                  {
                    question: "How long to see results?",
                    answer: "Most practices see immediate results. You'll capture 100% of calls from day one. New patient bookings typically increase 10-20% within the first month. No-show reduction (with AI confirmations) shows results within 2-3 weeks. Full ROI typically achieved in 90 days."
                  },
                  {
                    question: "What if it doesn't work for my practice?",
                    answer: "We guarantee ROI within 90 days or your money back. If you're not capturing more revenue from answered calls and reduced no-shows, we'll refund 100%. Plus, you get a 7-day free trial to test it risk-free before committing."
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
                  Stop Losing $8,333/Month to Missed Calls
                </h2>
                <p className="text-xl text-neutral-300 mb-8 max-w-2xl mx-auto">
                  Join dental practices capturing 100% of patient calls, eliminating no-shows with AI confirmations, and growing revenue by 10-20%.
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
                    Get Your Free Demo + ROI Analysis
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
                    90-day ROI guarantee
                  </div>
                  <div className="flex items-center gap-2">
                    <FaCheckCircle className="text-green-500" />
                    Setup in 24-48 hours
                  </div>
                  <div className="flex items-center gap-2">
                    <FaCheckCircle className="text-green-500" />
                    No credit card required
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
