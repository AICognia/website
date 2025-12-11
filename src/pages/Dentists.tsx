import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import {
  FaPhone,
  FaCalendarCheck,
  FaCheckCircle,
  FaArrowRight,
  FaSpinner,
  FaTimes,
  FaStar,
  FaPlay,
  FaPause
} from 'react-icons/fa';
import conversionTracker from '../utils/conversionTracking';
import DynamicTechBackground from '../components/DynamicTechBackground';

const Dentists: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showAudioModal, setShowAudioModal] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const toggleAudioPlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
        conversionTracker.trackButtonClick('Demo Audio Played', 'dentists_page');
      }
      setIsPlaying(!isPlaying);
    }
  };

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
          _subject: `Dentist Free Trial Request from ${formData.name}`,
          form_type: 'dentist_landing_page_trial',
          source: 'dentists_page_meta_ads',
          industry: 'dental',
          submitted_at: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        conversionTracker.trackDemoBooking('dentists_page');
        conversionTracker.trackButtonClick('Dentist Free Trial Submitted', 'dentists_page');
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
        <meta name="description" content="Never miss a patient call again. 7-day free trial. No credit card required." />
        <meta name="robots" content="noindex, nofollow" />
        <style>{`
          @keyframes wave-height {
            0%, 100% { height: 30%; }
            50% { height: 100%; }
          }
          @keyframes wave-slide {
            0% { transform: translateX(0); }
            100% { transform: translateX(-100%); }
          }
        `}</style>
      </Helmet>

      <div className="min-h-screen relative bg-black text-white">
        {/* Dynamic Tech Background */}
        <div className="fixed inset-0 z-0">
          <DynamicTechBackground />
        </div>

        {/* Content */}
        <div className="relative z-10">
          {/* Hero Section - Mobile Optimized */}
          <section className="relative overflow-hidden py-8 lg:py-20">
            <div className="absolute inset-0 bg-black/40" />

            <div className="relative container mx-auto px-4 sm:px-6 lg:px-12 max-w-6xl">
              {/* Mobile: Ultra-Optimized for Conversion */}
              <div className="lg:hidden space-y-5">
                {/* Compact Headline - Bigger Impact */}
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="text-[2.5rem] font-bold leading-[1.1] text-center tracking-tight"
                >
                  Never Miss a{' '}
                  <span className="text-cyan-400">Patient Call</span>
                </motion.h1>

                {/* Subheadline - Clear Value */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="text-base text-gray-300 text-center leading-relaxed px-2"
                >
                  AI answers 24/7. You get 20% more bookings.
                  <br />
                  <span className="text-cyan-400 font-medium">No credit card. Free for 7 days.</span>
                </motion.p>

                {/* Primary CTA - Above the Fold */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <a
                    href="#trial"
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById('trial-form')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="flex items-center justify-center gap-2 w-full px-8 py-5 bg-cyan-400 hover:bg-cyan-300 text-black text-lg font-bold rounded-2xl transition-all shadow-xl shadow-cyan-400/20"
                  >
                    Start Free Trial
                    <FaArrowRight className="text-base" />
                  </a>
                </motion.div>

                {/* Trust Signals - Compact */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="flex items-center justify-center gap-4 text-xs text-gray-400"
                >
                  <div className="flex items-center gap-1.5">
                    <FaCheckCircle className="text-cyan-400 text-sm" />
                    <span>No card needed</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <FaCheckCircle className="text-cyan-400 text-sm" />
                    <span>Setup in 48hrs</span>
                  </div>
                </motion.div>

                {/* Social Proof */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="text-xs text-gray-500 text-center pt-2"
                >
                  Join 50+ dental practices using Cognia AI
                </motion.p>
              </div>

              {/* Desktop: Original Layout */}
              <div className="hidden lg:block text-center max-w-4xl mx-auto">
                {/* Free Trial Badge */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="inline-block mb-8"
                >
                  <div className="px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full">
                    <span className="text-sm font-semibold text-cyan-400">
                      7-Day Free Trial • No Credit Card Required
                    </span>
                  </div>
                </motion.div>

                {/* Main Headline */}
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="text-5xl sm:text-6xl lg:text-7xl font-thin leading-tight mb-6"
                >
                  Never Miss a
                  <br />
                  <span className="text-cyan-400">Patient Call Again</span>
                </motion.h1>

                {/* Trust Badge */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-sm text-gray-400 mb-12"
                >
                  Trusted by 50+ U.S. Dental Practices
                </motion.p>

                {/* Primary CTA */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="mb-16"
                >
                  <a
                    href="#trial"
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById('trial-form')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white hover:bg-neutral-100 text-black text-lg font-medium rounded-xl transition-colors"
                  >
                    Try Now
                    <FaArrowRight className="text-sm" />
                  </a>
                </motion.div>

                {/* 3 Bullet Values */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="grid md:grid-cols-3 gap-8 max-w-3xl mx-auto"
                >
                  {[
                    { icon: FaPhone, text: '24/7 AI Receptionist' },
                    { icon: FaCalendarCheck, text: '10–20% More Bookings' },
                    { icon: FaCheckCircle, text: '66% Fewer No-Shows' },
                  ].map((item, i) => (
                    <div key={i} className="flex flex-col items-center gap-3">
                      <div className="w-12 h-12 bg-cyan-400/10 border border-cyan-400/30 rounded-full flex items-center justify-center">
                        <item.icon className="text-cyan-400 text-lg" />
                      </div>
                      <p className="text-white font-medium">{item.text}</p>
                    </div>
                  ))}
                </motion.div>
              </div>
            </div>
          </section>

          {/* Audio Demo Card - Premium Minimal - Desktop Only */}
          <section className="relative py-8 hidden lg:block">
            <div className="absolute inset-0 bg-black/20" />
            <div className="relative container mx-auto px-6 lg:px-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="max-w-2xl mx-auto"
              >
                <button
                  onClick={() => setShowAudioModal(true)}
                  className="w-full bg-black/50 border border-white/10 hover:border-cyan-400/30 rounded-2xl p-6 transition-all group"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="text-left">
                      <h3 className="text-lg font-medium text-white mb-1 group-hover:text-cyan-400 transition-colors">
                        Hear It in Action <span className="text-gray-500 text-sm">(30 Seconds)</span>
                      </h3>
                      <p className="text-sm text-gray-400">
                        A real example of Cognia AI answering a patient call
                      </p>
                    </div>
                    <div className="flex-shrink-0">
                      <div className="w-14 h-14 bg-cyan-400/10 border border-cyan-400/30 rounded-full flex items-center justify-center group-hover:bg-cyan-400/20 transition-all">
                        <FaPlay className="text-cyan-400 text-lg ml-1" />
                      </div>
                    </div>
                  </div>

                  {/* Minimal Waveform Visualization */}
                  <div className="flex items-center justify-center gap-1 mt-4 h-8">
                    {[3, 8, 5, 12, 7, 10, 4, 11, 6, 9, 5, 8, 4, 10, 7, 12, 5, 9, 6, 11].map((height, i) => (
                      <div
                        key={i}
                        className="w-1 bg-cyan-400/20 rounded-full transition-all"
                        style={{ height: `${height * 2}px` }}
                      />
                    ))}
                  </div>
                </button>
              </motion.div>
            </div>
          </section>

          {/* 3-Step Infographic - Desktop Only */}
          <section className="relative py-16 lg:py-24 border-y border-white/5 hidden lg:block">
            <div className="absolute inset-0 bg-black/30" />
            <div className="relative container mx-auto px-6 lg:px-12 max-w-5xl">
              <div className="grid md:grid-cols-3 gap-12">
                {[
                  {
                    step: '1',
                    title: 'We connect your phone line',
                    description: 'Simple 24-hour setup. No hardware needed.'
                  },
                  {
                    step: '2',
                    title: 'AI answers & books patients',
                    description: 'Every call answered instantly, 24/7/365.'
                  },
                  {
                    step: '3',
                    title: 'More Revenue Instantly',
                    description: '10-20% increase in booked appointments.'
                  }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="text-center"
                  >
                    {/* Step Number */}
                    <div className="w-16 h-16 bg-cyan-400/10 border-2 border-cyan-400/30 rounded-full flex items-center justify-center mx-auto mb-6">
                      <span className="text-2xl font-bold text-cyan-400">{item.step}</span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-medium text-white mb-3">{item.title}</h3>

                    {/* Description */}
                    <p className="text-sm text-gray-400">{item.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Single Testimonial - Mobile Optimized */}
          <section className="relative py-10 lg:py-24">
            <div className="absolute inset-0 bg-black/20" />
            <div className="relative container mx-auto px-4 sm:px-6 lg:px-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="max-w-3xl mx-auto"
              >
                <div className="bg-black/50 border border-white/10 rounded-2xl p-6 lg:p-12">
                  {/* Star Rating */}
                  <div className="flex items-center gap-1 mb-4 lg:mb-6">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className="text-cyan-400 text-base lg:text-lg" />
                    ))}
                  </div>

                  {/* Quote - Shorter on Mobile */}
                  <p className="text-base lg:text-lg text-gray-300 leading-relaxed mb-6 lg:mb-8">
                    <span className="lg:hidden">
                      "Cognia schedules weekend appointments automatically — no backlog, no delays. It's been a game-changer."
                    </span>
                    <span className="hidden lg:block">
                      "Working with Cognia has been a game-changer for our office. If a patient requests an appointment over the weekend, Cognia schedules it for us — no backlog, no delays."
                    </span>
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-3 lg:gap-4">
                    <div className="w-10 h-10 lg:w-12 lg:h-12 bg-cyan-400/10 rounded-full flex items-center justify-center">
                      <span className="text-cyan-400 font-bold text-base lg:text-lg">JO</span>
                    </div>
                    <div>
                      <div className="font-medium text-white text-sm lg:text-base">Jacob Ojalvo</div>
                      <div className="text-xs lg:text-sm text-gray-400">My Smile Miami</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Trial Form - Mobile Optimized */}
          <section id="trial-form" className="relative py-12 lg:py-24 border-t border-white/5">
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/60" />
            <div className="relative container mx-auto px-4 sm:px-6 lg:px-12">
              <div className="max-w-xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="text-center mb-8 lg:mb-12"
                >
                  <h2 className="text-3xl lg:text-5xl font-thin text-white mb-3 lg:mb-4">
                    Start Your <span className="text-cyan-400">Free Trial</span>
                  </h2>
                  <p className="text-sm lg:text-base text-gray-400">No credit card required • 7-day free trial</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="bg-black/50 border border-white/10 rounded-2xl p-6 lg:p-10 backdrop-blur-sm">
                    <AnimatePresence mode="wait">
                      {!isSubmitted ? (
                        <motion.div
                          key="form"
                          initial={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                              <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Full Name *"
                                className="w-full px-5 py-4 bg-black/50 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-all"
                                autoComplete="name"
                              />
                            </div>

                            <div>
                              <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Email Address *"
                                className="w-full px-5 py-4 bg-black/50 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-all"
                                autoComplete="email"
                              />
                            </div>

                            <div>
                              <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="Phone Number"
                                className="w-full px-5 py-4 bg-black/50 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-all"
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
                              className="w-full py-4 bg-white hover:bg-neutral-100 text-black font-semibold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed text-base flex items-center justify-center gap-2"
                            >
                              {isSubmitting ? (
                                <>
                                  <FaSpinner className="animate-spin" />
                                  <span>Starting Your Trial...</span>
                                </>
                              ) : (
                                <span>Start Free Trial</span>
                              )}
                            </button>

                            <p className="text-center text-xs text-gray-500 mt-4">
                              7-day free trial • No credit card required • HIPAA compliant
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
                          <div className="w-20 h-20 bg-cyan-400/10 rounded-full flex items-center justify-center mx-auto mb-6">
                            <FaCheckCircle className="text-4xl text-cyan-400" />
                          </div>
                          <h3 className="text-2xl font-medium text-white mb-3">
                            Trial Started!
                          </h3>
                          <p className="text-gray-400 text-sm mb-8">
                            Opening scheduling to set up your AI receptionist
                          </p>
                          <a
                            href="https://calendly.com/emrebenian-cogniaai/30min"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-neutral-100 text-black font-medium rounded-xl transition-all"
                          >
                            Schedule Setup Call
                            <FaArrowRight className="text-sm" />
                          </a>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>
        </div>

        {/* Audio Modal */}
        <AnimatePresence>
          {showAudioModal && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => {
                  setShowAudioModal(false);
                  if (audioRef.current) {
                    audioRef.current.pause();
                    setIsPlaying(false);
                  }
                }}
                className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
              />

              {/* Modal */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="bg-black/90 border border-white/20 rounded-3xl p-8 lg:p-12 max-w-2xl w-full backdrop-blur-xl">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-8">
                    <div>
                      <h3 className="text-2xl font-medium text-white mb-2">
                        AI Receptionist Demo — 30 Seconds
                      </h3>
                      <p className="text-sm text-gray-400">
                        Real patient call simulation
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setShowAudioModal(false);
                        if (audioRef.current) {
                          audioRef.current.pause();
                          setIsPlaying(false);
                        }
                      }}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      <FaTimes className="text-xl" />
                    </button>
                  </div>

                  {/* Audio Player */}
                  <div className="space-y-6">
                    {/* Waveform Visualization */}
                    <div className="relative h-24 bg-black/50 rounded-2xl overflow-hidden">
                      <div className="absolute inset-0 flex items-center px-6">
                        <div className="flex items-center gap-1 h-full">
                          {/* Create double set for seamless loop */}
                          {[...Array(2)].map((_, setIndex) => (
                            <div
                              key={setIndex}
                              className="flex items-center gap-1 h-full"
                              style={{
                                animation: isPlaying ? 'wave-slide 3s linear infinite' : 'none'
                              }}
                            >
                              {[8, 16, 12, 20, 10, 18, 14, 22, 16, 12, 18, 10, 20, 14, 16, 12, 22, 18, 14, 20].map((heightPercent, i) => (
                                <div
                                  key={i}
                                  className={`w-1.5 rounded-full transition-all self-center ${
                                    isPlaying ? 'bg-cyan-400' : 'bg-cyan-400/30'
                                  }`}
                                  style={{
                                    animation: isPlaying ? `wave-height ${0.8 + (i % 4) * 0.2}s ease-in-out infinite` : 'none',
                                    animationDelay: `${i * 0.08}s`,
                                    height: `${heightPercent}%`
                                  }}
                                />
                              ))}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Controls */}
                    <div className="flex items-center gap-4">
                      <button
                        onClick={toggleAudioPlay}
                        className="w-16 h-16 bg-cyan-400 hover:bg-cyan-300 rounded-full flex items-center justify-center transition-all group"
                      >
                        {isPlaying ? (
                          <FaPause className="text-black text-xl" />
                        ) : (
                          <FaPlay className="text-black text-xl ml-1" />
                        )}
                      </button>

                      <div className="flex-1">
                        <audio
                          ref={audioRef}
                          src="https://yhmbki8wsvse0fwd.public.blob.vercel-storage.com/DENTIST%20MP3.mp3"
                          onEnded={() => setIsPlaying(false)}
                          onPause={() => setIsPlaying(false)}
                          onPlay={() => setIsPlaying(true)}
                          className="w-full"
                          controls
                          controlsList="nodownload"
                        />
                      </div>
                    </div>

                    {/* Info */}
                    <div className="text-center pt-4 border-t border-white/10">
                      <p className="text-xs text-gray-500">
                        This is a real example of how Cognia AI handles patient calls 24/7
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default Dentists;
