import React, { useState, useEffect } from 'react';
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
  FaLanguage,
  FaRobot,
  FaHeadset
} from 'react-icons/fa';
import conversionTracker from '../utils/conversionTracking';
import DynamicTechBackground from '../components/DynamicTechBackground';
import TechSection from '../components/TechSection';
import TechCard from '../components/TechCard';

const lossNumbers = ['$8,333', '$7,250', '$9,100', '$8,750'];

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
  const [lossIndex, setLossIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setLossIndex((prev) => (prev + 1) % lossNumbers.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

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
        <title>AI Receptionist for Dentists | Stop Losing $8,333/Month | Cognia AI</title>
        <meta name="description" content="Each missed call costs $850. Your practice is losing $42,500-$85,000 monthly. Cognia AI answers every call 24/7, confirms appointments with AI outbound calls, and reduces no-shows by 66%. HIPAA compliant." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen relative bg-black text-white">
        {/* Dynamic Tech Background - Fixed position for entire page */}
        <div className="fixed inset-0 z-0">
          <DynamicTechBackground />
        </div>

        {/* Content */}
        <div className="relative z-10">
          {/* Hero Section */}
          <section className="relative overflow-hidden">
            <div className="absolute inset-0 bg-black/30" />

            <div className="relative container mx-auto px-6 lg:px-12 pt-8 lg:pt-12 pb-12 lg:pb-16">
              {/* Trust Badge Strip */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-center justify-center gap-6 md:gap-8 py-4 border-b border-white/5 mb-8"
              >
                <div className="flex items-center gap-2 text-xs md:text-sm text-gray-400">
                  <FaShieldAlt className="text-green-400" />
                  <span>HIPAA Compliant</span>
                </div>
                <div className="flex items-center gap-2 text-xs md:text-sm text-gray-400">
                  <FaClock className="text-green-400" />
                  <span>24-48hr Setup</span>
                </div>
                <div className="flex items-center gap-2 text-xs md:text-sm text-gray-400">
                  <FaHeadset className="text-green-400" />
                  <span>24/7 Support</span>
                </div>
              </motion.div>

              <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                {/* Left Column - Value Proposition */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="space-y-8"
                >
                  {/* Urgent Badge */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="inline-flex items-center gap-2 px-3 py-1.5 bg-red-500/10 border border-red-500/20 rounded-full text-xs text-red-400"
                  >
                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
                    You're losing money right now
                  </motion.div>

                  {/* Headline */}
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-thin leading-tight">
                    Your Practice Lost{' '}
                    <span className="relative inline-block">
                      <AnimatePresence mode="wait">
                        <motion.span
                          key={lossIndex}
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={{ y: -20, opacity: 0 }}
                          transition={{ duration: 0.4 }}
                          className="inline-block font-bold bg-gradient-to-r from-red-400 via-orange-400 to-red-400 bg-clip-text text-transparent"
                        >
                          {lossNumbers[lossIndex]}
                        </motion.span>
                      </AnimatePresence>
                    </span>
                    {' '}Last Month
                  </h1>

                  {/* Sub-headline */}
                  <p className="text-lg sm:text-xl text-gray-400 max-w-xl leading-relaxed">
                    Your AI receptionist that <span className="text-white font-medium">answers every patient call 24/7</span>, books appointments instantly, and{' '}
                    <span className="text-white font-medium">automatically confirms appointments</span> to eliminate no-shows.
                  </p>

                  {/* Value Callout */}
                  <div className="bg-black/50 border border-cyan-500/20 rounded-2xl p-5">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-cyan-500/10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
                        <FaChartLine className="text-cyan-400 text-lg" />
                      </div>
                      <div>
                        <p className="text-gray-300 text-sm leading-relaxed">
                          <span className="text-white font-semibold">Each missed call = $850 lost</span> (immediate) + <span className="text-white font-semibold">$8,000 lifetime value.</span> With 50-100 missed calls/month, you're losing <span className="text-cyan-400 font-semibold">$42,500-$85,000 monthly.</span>
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Stats Row */}
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { value: '100%', label: 'Calls Answered', suffix: '' },
                      { value: '10-20%', label: 'More Patients', suffix: '+' },
                      { value: '66%', label: 'Fewer No-Shows*', suffix: '↓' },
                      { value: '24-48hr', label: 'Setup Time', suffix: '' },
                    ].map((stat, i) => (
                      <div key={i} className="bg-black/50 border border-white/10 rounded-xl p-4 text-center hover:border-white/20 transition-colors">
                        <div className="text-2xl font-bold text-transparent bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text">
                          {stat.value}
                          {stat.suffix && <span className="text-lg ml-1">{stat.suffix}</span>}
                        </div>
                        <div className="text-xs text-gray-400 mt-1">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-gray-600">
                    *With AI outbound calling to confirm appointments
                  </p>

                  {/* Trust Indicators */}
                  <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500">
                    <span className="flex items-center gap-1.5">
                      <FaCheckCircle className="text-green-400" />
                      OpenDental, EagleSoft, Dentrix
                    </span>
                    <span className="flex items-center gap-1.5">
                      <FaCheckCircle className="text-green-400" />
                      No credit card required
                    </span>
                    <span className="flex items-center gap-1.5">
                      <FaCheckCircle className="text-green-400" />
                      90-day ROI guarantee
                    </span>
                  </div>
                </motion.div>

                {/* Right Column - Premium Form */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  <div className="bg-black/50 border border-white/10 rounded-3xl p-8 lg:p-10 backdrop-blur-sm">
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
                            <h2 className="text-2xl lg:text-3xl font-thin mb-2">
                              <span className="font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                                See How Much You're Losing
                              </span>
                            </h2>
                            <p className="text-sm text-gray-400">
                              Book a personalized demo and get a free analysis of your missed calls.
                            </p>
                          </div>

                          {/* Form */}
                          <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                              <label className="block text-sm text-gray-400 mb-2">
                                Your Name *
                              </label>
                              <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Dr. Smith"
                                className="w-full px-4 py-3.5 bg-black/50 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500 transition-all text-sm"
                                autoComplete="name"
                              />
                            </div>

                            <div>
                              <label className="block text-sm text-gray-400 mb-2">
                                Email Address *
                              </label>
                              <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="drsmith@dentalpractice.com"
                                className="w-full px-4 py-3.5 bg-black/50 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500 transition-all text-sm"
                                autoComplete="email"
                              />
                            </div>

                            <div>
                              <label className="block text-sm text-gray-400 mb-2">
                                Practice Name
                              </label>
                              <input
                                type="text"
                                name="practiceName"
                                value={formData.practiceName}
                                onChange={handleChange}
                                placeholder="Smile Dental Care"
                                className="w-full px-4 py-3.5 bg-black/50 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500 transition-all text-sm"
                                autoComplete="organization"
                              />
                            </div>

                            <div>
                              <label className="block text-sm text-gray-400 mb-2">
                                Phone Number
                              </label>
                              <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="(555) 123-4567"
                                className="w-full px-4 py-3.5 bg-black/50 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500 transition-all text-sm"
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
                                  className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-xl"
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
                              className="w-full py-4 bg-white hover:bg-neutral-100 text-black font-medium rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm group flex items-center justify-center gap-2"
                            >
                              {isSubmitting ? (
                                <>
                                  <FaSpinner className="animate-spin text-sm" />
                                  <span>Submitting...</span>
                                </>
                              ) : (
                                <>
                                  <span>Get Free Demo + ROI Analysis</span>
                                  <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
                                </>
                              )}
                            </button>

                            <p className="text-center text-xs text-gray-600 mt-4">
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
                          <p className="text-gray-400 text-sm mb-6 max-w-sm mx-auto">
                            Opening Calendly to schedule your personalized demo.
                          </p>
                          <a
                            href="https://calendly.com/emrebenian-cogniaai/30min"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-neutral-100 text-black font-medium rounded-xl transition-all text-sm"
                          >
                            Open Calendly
                            <FaArrowRight className="text-xs" />
                          </a>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Guarantee Badge */}
                  <div className="mt-6 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-black/50 border border-white/10 rounded-full text-xs text-gray-400">
                      <FaShieldAlt className="text-green-500" />
                      <span>90-day ROI guarantee or money back</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Problem Section */}
          <TechSection
            badge="The Problem"
            title="Here's What You're Losing Every Month"
            subtitle="These aren't estimates. This is what dental practices are losing right now."
          >
            <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {[
                {
                  icon: FaPhone,
                  value: '$850',
                  label: 'per missed new patient call',
                  desc: 'Immediate revenue loss, not counting $8,000 lifetime value'
                },
                {
                  icon: FaChartLine,
                  value: '50-100',
                  label: 'calls missed per month',
                  desc: '= $42,500 to $85,000 lost revenue monthly'
                },
                {
                  icon: FaClock,
                  value: '78%',
                  label: 'book with first responder',
                  desc: 'Miss the call = they book with your competitor in minutes'
                }
              ].map((item, index) => (
                <TechCard key={index}>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                      <item.icon className="text-3xl text-red-400" />
                    </div>
                    <div className="text-4xl font-bold text-white mb-2">{item.value}</div>
                    <div className="text-gray-400 mb-4">{item.label}</div>
                    <div className="text-sm text-gray-500">{item.desc}</div>
                  </div>
                </TechCard>
              ))}
            </div>

            <div className="text-center mt-12 max-w-2xl mx-auto">
              <p className="text-lg text-gray-300 mb-2">
                <span className="text-red-400 font-semibold">63% of dental emergencies</span> happen after hours.
              </p>
              <p className="text-gray-400">
                While you're closed, your competitors with 24/7 AI are booking your patients.
              </p>
            </div>
          </TechSection>

          {/* Solution Section */}
          <TechSection
            badge="The Solution"
            title="How Cognia AI Captures Every Patient"
            subtitle="Your complete AI receptionist system. Setup in 24-48 hours."
          >
            <div className="grid lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {[
                {
                  icon: FaPhone,
                  title: '24/7 Intelligent Call Answering',
                  features: [
                    'Answers 100% of calls instantly',
                    'Natural conversations - patients can\'t tell it\'s AI',
                    'Bilingual: English & Spanish',
                    'Emergency call triage & routing'
                  ]
                },
                {
                  icon: FaBell,
                  title: 'AI Outbound Confirmation Calls',
                  features: [
                    'Calls patients 24-48hrs before appointment',
                    'Reduces no-shows from 20% → 7%',
                    '65-75% confirmation rate',
                    'Multi-channel: Calls + SMS reminders'
                  ]
                },
                {
                  icon: FaCalendarCheck,
                  title: 'Seamless PMS Integration',
                  features: [
                    'OpenDental, EagleSoft, Dentrix, Denticon',
                    'Real-time calendar sync',
                    'HIPAA compliant data handling',
                    'Setup in 24-48 hours'
                  ]
                }
              ].map((feature, index) => (
                <TechCard key={index}>
                  <div className="text-center">
                    <div className="w-14 h-14 mx-auto mb-4 bg-white/5 border border-white/10 rounded-full flex items-center justify-center">
                      <feature.icon className="text-cyan-400 text-xl" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-4">{feature.title}</h3>
                    <ul className="space-y-2 text-left">
                      {feature.features.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-gray-400">
                          <FaCheckCircle className="text-cyan-400 mt-0.5 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </TechCard>
              ))}
            </div>
          </TechSection>

          {/* Results Section */}
          <TechSection
            badge="Results"
            title="Real Results from Dental Practices"
            subtitle="These practices stopped losing money to missed calls"
          >
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-12">
              {[
                { stat: '3-5x', label: 'ROI in First Year' },
                { stat: '10-20%', label: 'More New Patients' },
                { stat: '66%', label: 'Fewer No-Shows' },
                { stat: '93%', label: 'Reduction in Missed Calls' }
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl sm:text-5xl font-bold text-transparent bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text mb-2">
                    {item.stat}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-400">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>

            <TechCard className="max-w-3xl mx-auto">
              <div className="text-center">
                <p className="text-xl sm:text-2xl text-white font-medium mb-4">
                  "Most practices achieve <span className="text-transparent bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text">full ROI in 90 days</span> from captured calls alone."
                </p>
                <p className="text-gray-400 mb-8">
                  That doesn't include savings from reduced no-shows (66% fewer), eliminated staff overtime, and zero missed emergency calls generating $8,000+ lifetime value each.
                </p>
                <a
                  href="#top"
                  onClick={(e) => {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white hover:bg-neutral-100 text-black font-medium rounded-xl transition-colors"
                >
                  Calculate Your ROI - Free Demo
                  <FaArrowRight className="text-sm" />
                </a>
              </div>
            </TechCard>
          </TechSection>

          {/* Social Proof */}
          <TechSection
            badge="Testimonials"
            title="Trusted by Dental Practices Nationwide"
            subtitle="Real dentists. Real results. Real revenue recovered."
          >
            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
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
                  stat: "$34,000+ emergencies/month"
                }
              ].map((testimonial, index) => (
                <TechCard key={index}>
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-300 leading-relaxed mb-6 italic">"{testimonial.quote}"</p>
                  <div className="flex items-center justify-between pt-6 border-t border-white/10">
                    <div>
                      <div className="font-semibold text-white">{testimonial.author}</div>
                      <div className="text-sm text-gray-500">{testimonial.role}</div>
                      <div className="text-xs text-gray-600">{testimonial.location}</div>
                    </div>
                    <div className="text-right">
                      <div className="px-3 py-1.5 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-sm text-cyan-400 font-medium mb-1">
                        {testimonial.metric}
                      </div>
                      <div className="text-xs text-gray-500">{testimonial.stat}</div>
                    </div>
                  </div>
                </TechCard>
              ))}
            </div>
          </TechSection>

          {/* FAQ Section */}
          <TechSection
            badge="FAQ"
            title="Common Questions"
            subtitle="Everything you need to know"
          >
            <div className="max-w-4xl mx-auto space-y-4">
              {[
                {
                  question: 'Is this HIPAA compliant?',
                  answer: 'Absolutely. Cognia AI is fully HIPAA compliant. All patient data is encrypted end-to-end and handled according to strict healthcare privacy regulations.'
                },
                {
                  question: 'Will it integrate with my practice management software?',
                  answer: 'Yes. Cognia AI integrates seamlessly with all major dental PMS including OpenDental, EagleSoft, Denticon, Dentrix, and many others. Real-time calendar sync means no double bookings. Setup takes 24-48 hours.'
                },
                {
                  question: 'How does the AI confirmation calling work?',
                  answer: '24-48 hours before each appointment, our AI automatically calls the patient to confirm. It can reschedule if needed, cancel and open the slot, or add them to a waitlist. This reduces no-shows from ~20% to ~7% (66% reduction).'
                },
                {
                  question: 'What if it doesn\'t work for my practice?',
                  answer: 'We guarantee ROI within 90 days or your money back. If you\'re not capturing more revenue from answered calls and reduced no-shows, we\'ll refund 100%. Plus, you get a 7-day free trial to test risk-free.'
                }
              ].map((faq, index) => (
                <TechCard key={index}>
                  <h3 className="text-lg font-semibold text-white mb-3">{faq.question}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{faq.answer}</p>
                </TechCard>
              ))}
            </div>
          </TechSection>

          {/* Final CTA */}
          <TechSection
            badge="Get Started"
            title="Stop Losing $8,333/Month to Missed Calls"
            subtitle="Join dental practices capturing 100% of patient calls"
          >
            <div className="max-w-4xl mx-auto text-center">
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                <a
                  href="#top"
                  onClick={(e) => {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white hover:bg-neutral-100 text-black font-medium rounded-xl transition-colors"
                >
                  Get Your Free Demo + ROI Analysis
                  <FaArrowRight />
                </a>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-gray-500">
                {[
                  { icon: FaCheckCircle, text: '7-day free trial' },
                  { icon: FaCheckCircle, text: '90-day ROI guarantee' },
                  { icon: FaCheckCircle, text: 'Setup in 24-48 hours' },
                  { icon: FaCheckCircle, text: 'No credit card required' }
                ].map((item, i) => (
                  <span key={i} className="flex items-center gap-2">
                    <item.icon className="text-green-400" />
                    {item.text}
                  </span>
                ))}
              </div>
            </div>
          </TechSection>
        </div>
      </div>
    </>
  );
};

export default Dentists;
