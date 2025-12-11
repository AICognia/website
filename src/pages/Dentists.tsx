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
  FaHeadset
} from 'react-icons/fa';
import conversionTracker from '../utils/conversionTracking';
import DynamicTechBackground from '../components/DynamicTechBackground';
import TechCard from '../components/TechCard';

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
        <title>AI Receptionist for Dental Practices | Cognia AI</title>
        <meta name="description" content="Answer every patient call 24/7. Reduce no-shows by 66% with AI confirmation calls. Integrates with OpenDental, EagleSoft, Dentrix. HIPAA compliant." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen relative bg-black text-white">
        {/* Dynamic Tech Background */}
        <div className="fixed inset-0 z-0">
          <DynamicTechBackground />
        </div>

        {/* Content */}
        <div className="relative z-10">
          {/* Hero Section */}
          <section className="relative overflow-hidden">
            <div className="absolute inset-0 bg-black/30" />

            <div className="relative container mx-auto px-6 lg:px-12 pt-8 pb-20 lg:pb-32">
              {/* Trust Badge Strip */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-center justify-center gap-6 md:gap-8 py-4 border-b border-white/5 mb-12"
              >
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <FaShieldAlt className="text-cyan-400" />
                  <span>HIPAA Compliant</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <FaClock className="text-cyan-400" />
                  <span>24-48hr Setup</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <FaHeadset className="text-cyan-400" />
                  <span>24/7 Support</span>
                </div>
              </motion.div>

              <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center max-w-7xl mx-auto">
                {/* Left Column - Clean Value Proposition */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="space-y-8"
                >
                  {/* Headline - Clean, Professional */}
                  <h1 className="text-5xl sm:text-6xl lg:text-7xl font-thin leading-tight tracking-tight">
                    Never Miss a
                    <br />
                    <span className="text-cyan-400">Patient Call</span>
                  </h1>

                  {/* Sub-headline - Concise */}
                  <p className="text-xl text-gray-400 leading-relaxed max-w-lg">
                    AI receptionist that answers every call, books appointments, and confirms them automatically. Reduce no-shows by 66%.
                  </p>

                  {/* Stats - Clean Grid */}
                  <div className="grid grid-cols-3 gap-6 pt-4">
                    {[
                      { value: '100%', label: 'Calls Answered' },
                      { value: '66%', label: 'Fewer No-Shows' },
                      { value: '24/7', label: 'Available' },
                    ].map((stat, i) => (
                      <div key={i} className="text-center">
                        <div className="text-3xl font-bold text-cyan-400 mb-1">{stat.value}</div>
                        <div className="text-xs text-gray-500 uppercase tracking-wider">{stat.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* CTAs - Simple */}
                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <a
                      href="#form"
                      onClick={(e) => {
                        e.preventDefault();
                        document.querySelector('form')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                      }}
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white hover:bg-neutral-100 text-black text-sm font-medium rounded-lg transition-colors"
                    >
                      Book a Demo
                      <FaArrowRight className="text-xs" />
                    </a>
                    <a
                      href="tel:+16163263328"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-white/10 hover:border-white/20 hover:bg-white/5 text-white text-sm font-medium rounded-lg transition-colors"
                    >
                      <FaPhone className="text-xs" />
                      Talk to AI
                    </a>
                  </div>

                  {/* Micro-trust */}
                  <p className="text-xs text-gray-600 flex items-center gap-4 pt-2">
                    <span className="flex items-center gap-1.5">
                      <FaCheckCircle className="text-cyan-400" />
                      7-day free trial
                    </span>
                    <span className="flex items-center gap-1.5">
                      <FaCheckCircle className="text-cyan-400" />
                      No credit card
                    </span>
                  </p>
                </motion.div>

                {/* Right Column - Clean Form */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <div className="bg-black/50 border border-white/10 rounded-3xl p-10 backdrop-blur-sm">
                    <AnimatePresence mode="wait">
                      {!isSubmitted ? (
                        <motion.div
                          key="form"
                          initial={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          {/* Form Header */}
                          <div className="mb-8">
                            <h2 className="text-2xl font-thin text-white mb-2">
                              Get Started
                            </h2>
                            <p className="text-sm text-gray-500">
                              Free analysis of your missed calls
                            </p>
                          </div>

                          {/* Form */}
                          <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                              <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Name *"
                                className="w-full px-4 py-3.5 bg-black/50 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-cyan-400 transition-all text-sm"
                                autoComplete="name"
                              />
                            </div>

                            <div>
                              <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Email *"
                                className="w-full px-4 py-3.5 bg-black/50 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-cyan-400 transition-all text-sm"
                                autoComplete="email"
                              />
                            </div>

                            <div>
                              <input
                                type="text"
                                name="practiceName"
                                value={formData.practiceName}
                                onChange={handleChange}
                                placeholder="Practice Name"
                                className="w-full px-4 py-3.5 bg-black/50 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-cyan-400 transition-all text-sm"
                                autoComplete="organization"
                              />
                            </div>

                            <div>
                              <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="Phone"
                                className="w-full px-4 py-3.5 bg-black/50 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-cyan-400 transition-all text-sm"
                                autoComplete="tel"
                              />
                            </div>

                            {/* Error */}
                            <AnimatePresence>
                              {error && (
                                <motion.div
                                  initial={{ opacity: 0, y: -5 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0 }}
                                  className="flex items-center gap-2 p-3 bg-white/5 border border-white/10 rounded-xl"
                                >
                                  <FaTimes className="text-gray-400 text-sm flex-shrink-0" />
                                  <p className="text-gray-400 text-sm">{error}</p>
                                </motion.div>
                              )}
                            </AnimatePresence>

                            {/* Submit */}
                            <button
                              type="submit"
                              disabled={isSubmitting}
                              className="w-full py-4 bg-white hover:bg-neutral-100 text-black font-medium rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm flex items-center justify-center gap-2 mt-6"
                            >
                              {isSubmitting ? (
                                <>
                                  <FaSpinner className="animate-spin text-sm" />
                                  <span>Submitting...</span>
                                </>
                              ) : (
                                <span>Get Free Demo</span>
                              )}
                            </button>

                            <p className="text-center text-xs text-gray-600 mt-4">
                              No credit card required
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
                          <div className="w-16 h-16 bg-cyan-400/10 rounded-full flex items-center justify-center mx-auto mb-6">
                            <FaCheckCircle className="text-3xl text-cyan-400" />
                          </div>
                          <h3 className="text-2xl font-thin text-white mb-3">
                            Success
                          </h3>
                          <p className="text-gray-500 text-sm mb-6">
                            Opening Calendly to schedule your demo
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
                </motion.div>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="relative py-16 lg:py-24">
            <div className="absolute inset-0 bg-black/30" />
            <div className="relative container mx-auto px-6 lg:px-12">
              <div className="text-center mb-12">
                <div className="inline-block mb-4">
                  <div className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-full">
                    <span className="text-[10px] font-semibold text-cyan-400 uppercase tracking-widest">Features</span>
                  </div>
                </div>
                <h2 className="text-3xl lg:text-4xl font-thin text-white mb-3">
                  Complete AI Receptionist
                </h2>
                <p className="text-sm text-gray-400">Everything you need to handle patient calls 24/7</p>
              </div>
            <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[
                {
                  icon: FaPhone,
                  title: 'Answer Every Call',
                  features: [
                    '100% call coverage 24/7',
                    'Natural AI conversations',
                    'Bilingual support',
                    'Emergency triage'
                  ]
                },
                {
                  icon: FaBell,
                  title: 'Confirm Appointments',
                  features: [
                    'AI outbound confirmation calls',
                    'Reduces no-shows 20% → 7%',
                    'Automatic rescheduling',
                    'SMS + call reminders'
                  ]
                },
                {
                  icon: FaCalendarCheck,
                  title: 'Seamless Integration',
                  features: [
                    'OpenDental, EagleSoft, Dentrix',
                    'Real-time calendar sync',
                    'HIPAA compliant',
                    '24-48hr setup'
                  ]
                }
              ].map((feature, index) => (
                <TechCard key={index}>
                  <div className="text-center">
                    <div className="w-12 h-12 mx-auto mb-6 bg-white/5 border border-white/10 rounded-full flex items-center justify-center">
                      <feature.icon className="text-cyan-400 text-lg" />
                    </div>
                    <h3 className="text-lg font-medium text-white mb-6">{feature.title}</h3>
                    <ul className="space-y-3 text-left">
                      {feature.features.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-gray-400">
                          <FaCheckCircle className="text-cyan-400 mt-0.5 flex-shrink-0 text-xs" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </TechCard>
              ))}
            </div>
            </div>
          </section>

          {/* Results Section */}
          <section className="relative py-16 lg:py-24">
            <div className="absolute inset-0 bg-black/30" />
            <div className="relative container mx-auto px-6 lg:px-12">
              <div className="text-center mb-12">
                <div className="inline-block mb-4">
                  <div className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-full">
                    <span className="text-[10px] font-semibold text-cyan-400 uppercase tracking-widest">Results</span>
                  </div>
                </div>
                <h2 className="text-3xl lg:text-4xl font-thin text-white mb-3">
                  Proven Impact
                </h2>
                <p className="text-sm text-gray-400">Real results from dental practices</p>
              </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto mb-16">
              {[
                { value: '3-5x', label: 'ROI in Year 1' },
                { value: '10-20%', label: 'More Patients' },
                { value: '66%', label: 'Fewer No-Shows' },
                { value: '93%', label: 'Fewer Missed Calls' }
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl sm:text-5xl font-thin text-cyan-400 mb-2">
                    {item.value}
                  </div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>

            <TechCard className="max-w-3xl mx-auto">
              <div className="text-center py-4">
                <p className="text-xl text-white font-thin mb-6">
                  Most practices achieve full ROI within 90 days
                </p>
                <p className="text-sm text-gray-500 mb-8">
                  From increased bookings, reduced no-shows, and eliminated missed calls
                </p>
                <a
                  href="#form"
                  onClick={(e) => {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white hover:bg-neutral-100 text-black font-medium rounded-xl transition-colors"
                >
                  Get Free Demo
                  <FaArrowRight className="text-sm" />
                </a>
              </div>
            </TechCard>
            </div>
          </section>

          {/* Social Proof */}
          <section className="relative py-16 lg:py-24">
            <div className="absolute inset-0 bg-black/30" />
            <div className="relative container mx-auto px-6 lg:px-12">
              <div className="text-center mb-12">
                <div className="inline-block mb-4">
                  <div className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-full">
                    <span className="text-[10px] font-semibold text-cyan-400 uppercase tracking-widest">Client Review</span>
                  </div>
                </div>
                <h2 className="text-3xl lg:text-4xl font-thin text-white mb-3">
                  What Our Clients Say
                </h2>
                <p className="text-sm text-gray-400">Real feedback from dental practices</p>
              </div>
            <div className="max-w-4xl mx-auto">
              <TechCard>
                <div className="py-4">
                  <p className="text-gray-300 leading-relaxed mb-8 whitespace-pre-line">
                    "Working with Cognia has been a game-changer for our office.

What I appreciate the most is how they completely transformed our Monday mornings. Before Cognia, I would spend 45 minutes just waiting for the voicemail system to run so I could go through every message. It was slow, inefficient, and honestly a stressful way to start the week.

Now, with Cognia, we receive a clear email summary along with call transcripts first thing in the morning. This lets us immediately prioritize call-backs without wasting time. And if a patient requests an appointment over the weekend, Cognia schedules it for us — no backlog, no delays.

It has made our workflow faster, more organized, and much more efficient."
                  </p>
                  <div className="pt-6 border-t border-white/10">
                    <div className="font-medium text-white">Jacob Ojalvo</div>
                    <div className="text-sm text-gray-400 mt-1">My Smile Miami</div>
                  </div>
                </div>
              </TechCard>
            </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="relative py-16 lg:py-24">
            <div className="absolute inset-0 bg-black/30" />
            <div className="relative container mx-auto px-6 lg:px-12">
              <div className="text-center mb-12">
                <div className="inline-block mb-4">
                  <div className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-full">
                    <span className="text-[10px] font-semibold text-cyan-400 uppercase tracking-widest">FAQ</span>
                  </div>
                </div>
                <h2 className="text-3xl lg:text-4xl font-thin text-white mb-3">
                  Common Questions
                </h2>
                <p className="text-sm text-gray-400">Everything you need to know</p>
              </div>
            <div className="max-w-3xl mx-auto space-y-4">
              {[
                {
                  question: 'Is this HIPAA compliant?',
                  answer: 'Yes. Fully HIPAA compliant with encrypted data handling and strict healthcare privacy protocols.'
                },
                {
                  question: 'Which practice management systems integrate?',
                  answer: 'OpenDental, EagleSoft, Denticon, Dentrix, and most major dental PMS platforms. Real-time calendar sync.'
                },
                {
                  question: 'How does AI confirmation calling work?',
                  answer: '24-48 hours before appointments, our AI calls patients to confirm. Can reschedule, cancel, or add to waitlist. Reduces no-shows from 20% to 7%.'
                },
                {
                  question: 'What if it doesn\'t work?',
                  answer: '90-day ROI guarantee. If you\'re not capturing more revenue, we refund 100%. 7-day free trial to test risk-free.'
                }
              ].map((faq, index) => (
                <TechCard key={index}>
                  <div className="py-2">
                    <h3 className="text-base font-medium text-white mb-3">{faq.question}</h3>
                    <p className="text-sm text-gray-400 leading-relaxed">{faq.answer}</p>
                  </div>
                </TechCard>
              ))}
            </div>
            </div>
          </section>

          {/* Final CTA */}
          <section className="relative py-16 lg:py-24">
            <div className="absolute inset-0 bg-black/30" />
            <div className="relative container mx-auto px-6 lg:px-12">
              <div className="text-center mb-12">
                <div className="inline-block mb-4">
                  <div className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-full">
                    <span className="text-[10px] font-semibold text-cyan-400 uppercase tracking-widest">Get Started</span>
                  </div>
                </div>
                <h2 className="text-3xl lg:text-4xl font-thin text-white mb-3">
                  Start Your Free Trial
                </h2>
                <p className="text-sm text-gray-400">No credit card required</p>
              </div>
            <div className="max-w-2xl mx-auto text-center">
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                <a
                  href="#form"
                  onClick={(e) => {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white hover:bg-neutral-100 text-black font-medium rounded-xl transition-colors"
                >
                  Book a Demo
                  <FaArrowRight />
                </a>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-gray-600">
                <span className="flex items-center gap-2">
                  <FaCheckCircle className="text-cyan-400" />
                  7-day free trial
                </span>
                <span className="flex items-center gap-2">
                  <FaCheckCircle className="text-cyan-400" />
                  No credit card
                </span>
                <span className="flex items-center gap-2">
                  <FaCheckCircle className="text-cyan-400" />
                  Setup in 24-48 hours
                </span>
              </div>
            </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default Dentists;
