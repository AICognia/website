import React, { useState, useRef, useEffect } from 'react';
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
  FaPause,
  FaBolt,
  FaPlug,
  FaGlobe,
  FaShieldAlt,
  FaClock,
  FaQuestionCircle
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
  const [showStickyCTA, setShowStickyCTA] = useState(false);
  const [stickyDismissed, setStickyDismissed] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | undefined>(undefined);

  // Sticky CTA scroll listener
  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = window.innerHeight * 0.8;
      // Only show sticky if user hasn't manually dismissed it
      if (!stickyDismissed) {
        setShowStickyCTA(window.scrollY > heroHeight);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [stickyDismissed]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  // Canvas waveform animation - static wave animation only
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const bars = 60;

    const draw = () => {
      animationRef.current = requestAnimationFrame(draw);

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const centerY = canvas.height / 2;
      const barWidth = canvas.width / bars;

      for (let i = 0; i < bars; i++) {
        const time = Date.now() / 1000;

        // Static wave animation - always the same
        const wave = Math.sin(i * 0.1 + time * 2) * 0.3 + 0.3;
        const barHeight = wave * (canvas.height / 4) + 10;

        const x = i * barWidth;

        // Mirror effect - draw from center (top half + bottom half)
        ctx.fillStyle = '#06B6D4';
        // Top half
        ctx.fillRect(x, centerY - barHeight, barWidth - 1, barHeight);
        // Bottom half (mirror)
        ctx.fillRect(x, centerY, barWidth - 1, barHeight);
      }
    };

    draw();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [showAudioModal]); // Only restart when modal opens/closes

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
        // Track Meta Pixel Lead event
        if ((window as any).fbq) {
          (window as any).fbq('track', 'Lead', {
            content_name: 'Dentist Free Trial Request',
            content_category: 'dental_landing_page',
            value: formData.email,
            currency: 'USD'
          });
        }

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
      </Helmet>

      <div className="min-h-screen relative bg-black text-white">
        {/* Dynamic Tech Background */}
        <div className="fixed inset-0 z-0">
          <DynamicTechBackground />
        </div>

        {/* Content */}
        <div className="relative z-10">
          {/* Hero Section - Mobile Optimized */}
          <section className="relative overflow-hidden py-14 lg:py-22">
            <div className="absolute inset-0 bg-black/40" />

            <div className="relative container mx-auto px-4 sm:px-6 lg:px-12 max-w-6xl">
              {/* Mobile: Compact, Form-First Layout */}
              <div className="lg:hidden space-y-8">
                {/* Free Trial Badge */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-center"
                >
                  <div className="inline-block px-3 py-1.5 bg-cyan-500/10 border border-cyan-500/30 rounded-full">
                    <span className="text-xs font-semibold text-cyan-400">
                      7-Day Free Trial • No Credit Card • HIPAA-Compliant
                    </span>
                  </div>
                </motion.div>

                {/* Headline */}
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="text-5xl font-thin leading-tight text-center"
                >
                  Never Miss a{' '}
                  <span className="text-cyan-400">Patient Call</span>
                </motion.h1>

                {/* Subheadline */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.13 }}
                  className="text-base text-gray-300 text-center leading-snug max-w-2xl mx-auto"
                >
                  AI receptionist that books every patient—24/7.
                </motion.p>

                {/* CTA - Centered */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.17 }}
                  className="flex flex-col items-center"
                >
                  <a
                    href="#trial-form"
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById('trial-form')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="flex items-center justify-center gap-2 w-full max-w-[70%] px-6 py-3.5 bg-white hover:bg-neutral-100 text-black text-base font-semibold rounded-xl transition-all shadow-lg hover:shadow-xl hover:shadow-cyan-400/30 hover:scale-105"
                  >
                    Start Free Trial
                    <FaArrowRight className="text-sm" />
                  </a>
                </motion.div>

                {/* Pricing */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-base text-center text-white font-bold"
                >
                  From $199/month • 1-Week Free Trial
                </motion.p>

                {/* Mobile 3 Value Props */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="grid grid-cols-3 gap-3 pb-2"
                >
                  {[
                    { icon: FaPhone, title: '24/7 Scheduling', subtitle: 'Never miss a patient' },
                    { icon: FaCalendarCheck, title: '20% More Bookings', subtitle: 'AI books automatically' },
                    { icon: FaCheckCircle, title: '66% Less No-Shows', subtitle: 'Auto confirmations' },
                  ].map((item, i) => (
                    <div key={i} className="flex flex-col items-center gap-2.5 bg-black/30 border border-white/5 rounded-xl p-4">
                      <item.icon className="text-cyan-400 text-2xl" />
                      <p className="text-white text-sm font-semibold text-center leading-tight">{item.title}</p>
                      <p className="text-gray-200/85 text-xs text-center leading-snug">{item.subtitle}</p>
                    </div>
                  ))}
                </motion.div>

                {/* Trust badge - Polished */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="py-6 border-t border-b border-white/10 mb-4"
                >
                  <p className="text-sm text-gray-200 text-center font-bold tracking-wide italic drop-shadow-[0_0_6px_rgba(6,182,212,0.25)]">
                    Trusted by 50+ U.S. Dental Practices
                  </p>
                </motion.div>

                {/* Mobile Audio Demo Section - Elevated */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.35 }}
                  className="pt-8"
                >
                  <button
                    onClick={() => setShowAudioModal(true)}
                    className="relative w-full bg-black/30 rounded-xl p-8 hover:bg-black/35 transition-all duration-150 ease-out group shadow-lg shadow-cyan-500/15 hover:shadow-xl hover:shadow-cyan-500/25 overflow-hidden border border-cyan-400/30"
                  >
                    {/* Neon gradient border */}
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-400/25 via-transparent to-cyan-400/25 p-[1.5px]">
                      <div className="h-full w-full bg-black/30 rounded-xl"></div>
                    </div>

                    <div className="relative flex items-center justify-center gap-3">
                      {/* Play Icon - High visibility */}
                      <div className="w-16 h-16 bg-cyan-400/20 border-2 border-cyan-400/50 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-cyan-400/30 group-hover:scale-110 group-hover:shadow-xl group-hover:shadow-cyan-400/50 transition-all duration-150 ease-out">
                        <svg className="w-7 h-7 text-cyan-400 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>

                      {/* Text Content - Centered */}
                      <div className="text-center">
                        <h3 className="text-base font-bold text-white mb-0.5">
                          Hear the AI (30 sec)
                        </h3>
                        <p className="text-xs text-gray-400">
                          Real example of Cognia AI answering a patient call.
                        </p>
                      </div>
                    </div>
                  </button>
                </motion.div>

                {/* Feature Cards - Optimized */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="grid grid-cols-1 gap-6 pt-10"
                >
                  {[
                    { icon: FaPlug, text: 'Seamless PMS Integration', subtext: 'Syncs with every dental PMS.', badge: true },
                    { icon: FaGlobe, text: 'English & Spanish', subtext: 'Bilingual support included.', badge: true },
                    { icon: FaBolt, text: 'Plug-and-Play Setup', subtext: 'No training, no hardware.', badge: true },
                  ].map((item, i) => (
                    <div key={i} className={`flex flex-col items-center gap-4 bg-black/20 border rounded-lg p-6 text-center hover:scale-[1.015] hover:shadow-lg transition-all duration-150 ease-out cursor-pointer ${item.badge ? 'border-cyan-400/30 shadow-cyan-400/10 hover:shadow-cyan-400/20 hover:border-cyan-400/40' : 'border-white/5 hover:shadow-cyan-400/15 hover:border-cyan-400/20'}`}>
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${item.badge ? 'bg-cyan-400/15 border-2 border-cyan-400/40 shadow-lg shadow-cyan-400/30' : 'bg-cyan-400/10 border border-cyan-400/30 shadow-md shadow-cyan-400/28'}`}>
                        <item.icon className="text-xl text-cyan-400" />
                      </div>
                      <div>
                        <p className="text-base font-semibold text-white leading-tight mb-2">{item.text}</p>
                        <p className="text-sm text-gray-300/80 leading-relaxed">{item.subtext}</p>
                      </div>
                    </div>
                  ))}
                </motion.div>
              </div>

              {/* Desktop: Optimized Layout */}
              <div className="hidden lg:block text-center max-w-4xl mx-auto space-y-7">
                {/* Free Trial Badge */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="inline-block px-5 py-2.5 bg-cyan-500/10 border border-cyan-500/30 rounded-full">
                    <span className="text-base font-semibold text-cyan-400">
                      7-Day Free Trial • No Credit Card • HIPAA-Compliant
                    </span>
                  </div>
                </motion.div>

                {/* Headline */}
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="text-6xl sm:text-7xl lg:text-8xl font-thin leading-tight"
                >
                  Never Miss a
                  <br />
                  <span className="text-cyan-400">Patient Call</span>
                </motion.h1>

                {/* Subheadline */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.13 }}
                  className="text-2xl text-gray-300 leading-relaxed max-w-3xl mx-auto"
                >
                  Your AI receptionist that answers every call & books every patient — 24/7.
                </motion.p>

                {/* Primary CTA - Centered between subheadline and pricing */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.17 }}
                  className="flex flex-col items-center"
                >
                  <a
                    href="#trial-form"
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById('trial-form')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white hover:bg-neutral-100 text-black text-lg font-semibold rounded-xl transition-all shadow-lg hover:shadow-2xl hover:shadow-cyan-400/30 hover:scale-105 max-w-xs"
                  >
                    Start Free Trial
                    <FaArrowRight className="text-sm" />
                  </a>
                </motion.div>

                {/* Pricing */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-base text-gray-200 font-bold"
                >
                  From $199/month • 1-Week Free Trial
                </motion.p>

                {/* 3 Value Props */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto"
                >
                  {[
                    { icon: FaPhone, title: '24/7 Patient Scheduling', subtitle: 'Never miss a new patient again.' },
                    { icon: FaCalendarCheck, title: '20% More Bookings', subtitle: 'AI books directly into your calendar.' },
                    { icon: FaCheckCircle, title: '66% Fewer No-Shows', subtitle: 'Automatic confirmation calls.' },
                  ].map((item, i) => (
                    <div key={i} className="flex flex-col items-center gap-4">
                      <div className="w-16 h-16 bg-cyan-400/10 border border-cyan-400/30 rounded-full flex items-center justify-center">
                        <item.icon className="text-cyan-400 text-2xl" />
                      </div>
                      <div className="text-center">
                        <p className="text-white font-semibold text-lg mb-2">{item.title}</p>
                        <p className="text-gray-200/90 text-base leading-loose max-w-[200px]">{item.subtitle}</p>
                      </div>
                    </div>
                  ))}
                </motion.div>


                {/* Audio Demo - Elevated */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="max-w-2xl mx-auto pt-10"
                >
                  <button
                    onClick={() => setShowAudioModal(true)}
                    className="relative w-full bg-black/30 rounded-2xl px-10 py-8 hover:bg-black/35 transition-all duration-150 ease-out group shadow-xl shadow-cyan-500/20 hover:shadow-2xl hover:shadow-cyan-500/30 overflow-hidden border border-cyan-400/30"
                  >
                    {/* Neon gradient border */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-400/25 via-transparent to-cyan-400/25 p-[1.5px]">
                      <div className="h-full w-full bg-black/30 rounded-2xl"></div>
                    </div>

                    <div className="relative flex items-center justify-between gap-4">
                      <div className="text-left">
                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors duration-150">
                          Hear the AI (30 sec)
                        </h3>
                        <p className="text-base text-gray-400">
                          Real example of Cognia AI answering a patient call.
                        </p>
                      </div>
                      <div className="flex-shrink-0">
                        <div className="w-24 h-24 bg-cyan-400/20 border-2 border-cyan-400/50 rounded-full flex items-center justify-center group-hover:bg-cyan-400/30 group-hover:scale-110 group-hover:shadow-2xl group-hover:shadow-cyan-400/60 transition-all duration-150 ease-out">
                          <FaPlay className="text-cyan-400 text-3xl ml-1" />
                        </div>
                      </div>
                    </div>

                    {/* Minimal Waveform Visualization */}
                    <div className="relative flex items-center justify-center gap-1 mt-6 h-10">
                      {[3, 8, 5, 12, 7, 10, 4, 11, 6, 9, 5, 8, 4, 10, 7, 12, 5, 9, 6, 11].map((height, i) => (
                        <div
                          key={i}
                          className="w-1 bg-cyan-400/25 rounded-full transition-all"
                          style={{ height: `${height * 2.5}px` }}
                        />
                      ))}
                    </div>
                  </button>
                </motion.div>

                {/* Feature Cards - Optimized */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.35 }}
                  className="grid grid-cols-3 gap-6 max-w-3xl mx-auto pt-10"
                >
                  {[
                    { icon: FaPlug, text: 'Seamless PMS Integration', subtext: 'Syncs with every dental PMS.', badge: true },
                    { icon: FaGlobe, text: 'English & Spanish', subtext: 'Bilingual support included.', badge: true },
                    { icon: FaBolt, text: 'Plug-and-Play Setup', subtext: 'No training, no hardware.', badge: true },
                  ].map((item, i) => (
                    <div key={i} className={`flex flex-col items-center gap-3 bg-black/20 border rounded-xl p-5 text-center hover:scale-[1.015] hover:shadow-lg transition-all duration-150 ease-out cursor-pointer ${item.badge ? 'border-cyan-400/30 shadow-cyan-400/10 hover:shadow-cyan-400/20 hover:border-cyan-400/40' : 'border-white/5 hover:shadow-cyan-400/15 hover:border-cyan-400/20'}`}>
                      <div className={`w-14 h-14 rounded-full flex items-center justify-center ${item.badge ? 'bg-cyan-400/15 border-2 border-cyan-400/40 shadow-lg shadow-cyan-400/30' : 'bg-cyan-400/10 border border-cyan-400/30 shadow-md shadow-cyan-400/28'}`}>
                        <item.icon className="text-xl text-cyan-400" />
                      </div>
                      <div>
                        <p className="text-base font-semibold text-white leading-tight mb-1">{item.text}</p>
                        <p className="text-sm text-gray-400 leading-tight">{item.subtext}</p>
                      </div>
                    </div>
                  ))}
                </motion.div>
              </div>
            </div>
          </section>

          {/* 3-Step Infographic - Desktop Only - Polished */}
          <section className="relative py-20 lg:py-28 border-y border-white/5 hidden lg:block">
            <div className="absolute inset-0 bg-black/40" />
            <div className="relative container mx-auto px-6 lg:px-12 max-w-6xl">
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    step: '1',
                    title: 'We Set Up Your AI Receptionist',
                    description: 'Fully customized to your practice workflow.'
                  },
                  {
                    step: '2',
                    title: 'Connect Your Phone',
                    description: 'Takes 10 minutes. No training required.'
                  },
                  {
                    step: '3',
                    title: 'AI Answers 24/7',
                    description: 'More appointments, zero missed calls.'
                  }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="relative bg-black/30 border border-white/5 rounded-2xl p-8 text-center hover:bg-black/40 hover:border-cyan-400/20 transition-all duration-200 group"
                  >
                    {/* Step Number - Solid clean design */}
                    <div className="mb-6">
                      <div className="relative w-24 h-24 mx-auto flex items-center justify-center">
                        <div className="relative w-24 h-24 bg-cyan-400/10 border-2 border-cyan-400/40 rounded-full flex items-center justify-center group-hover:border-cyan-400/60 group-hover:bg-cyan-400/15 transition-all duration-200">
                          <span className="relative text-4xl font-bold text-cyan-400">{item.step}</span>
                        </div>
                      </div>
                    </div>

                    {/* Title - Better hierarchy */}
                    <h3 className="text-2xl font-semibold text-white mb-4 group-hover:text-cyan-400 transition-colors duration-200">{item.title}</h3>

                    {/* Description - More readable */}
                    <p className="text-lg text-gray-300/85 leading-loose max-w-xs mx-auto">{item.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Single Testimonial - Polished */}
          <section className="relative py-16 lg:py-22">
            <div className="absolute inset-0 bg-black/20" />
            <div className="relative container mx-auto px-4 sm:px-6 lg:px-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="max-w-3xl mx-auto"
              >
                {/* Gradient accent line top */}
                <div className="h-0.5 bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent mb-0"></div>

                <div className="bg-black/50 border border-white/10 rounded-2xl p-8 lg:p-14 text-center shadow-2xl shadow-black/60">
                  {/* Star Rating - 10% Larger */}
                  <div className="flex items-center justify-center gap-2.5 mb-4 lg:mb-8">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className="text-cyan-400 text-xl lg:text-2xl" />
                    ))}
                  </div>

                  {/* Quote - Better line-height */}
                  <p className="text-base lg:text-xl text-gray-300 leading-relaxed lg:leading-loose mb-5 lg:mb-10">
                    <span className="lg:hidden">
                      "Cognia schedules weekend appointments automatically. No backlog, no delays."
                    </span>
                    <span className="hidden lg:block">
                      "Working with Cognia has been a game-changer for our office. If a patient requests an appointment over the weekend, Cognia schedules it for us — no backlog, no delays."
                    </span>
                  </p>

                  {/* Author */}
                  <div className="flex flex-col lg:flex-row items-center justify-center gap-2 lg:gap-4 mb-4 lg:mb-6">
                    <div className="w-10 h-10 lg:w-12 lg:h-12 bg-cyan-400/10 rounded-full flex items-center justify-center">
                      <span className="text-cyan-400 font-bold text-base lg:text-lg">JO</span>
                    </div>
                    <div>
                      <div className="font-medium text-white text-sm lg:text-base">Jacob Ojalvo</div>
                      <div className="text-xs lg:text-sm text-gray-400">My Smile Miami</div>
                    </div>
                  </div>

                  {/* Trust Line */}
                  <p className="text-xs lg:text-sm text-gray-400 italic">
                    Serving 50+ dental practices across the U.S.
                  </p>
                </div>

                {/* Gradient accent line bottom */}
                <div className="h-0.5 bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent mt-0"></div>
              </motion.div>

              {/* CTA Button After Testimonial - Mobile Only */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="flex justify-center mt-10 lg:hidden"
              >
                <a
                  href="#trial-form"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('trial-form')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white hover:bg-neutral-100 text-black text-base font-semibold rounded-xl transition-all shadow-lg hover:shadow-xl hover:shadow-cyan-400/30 hover:scale-105"
                >
                  Start Free Trial
                  <FaArrowRight className="text-sm" />
                </a>
              </motion.div>
            </div>
          </section>

          {/* 3-Step Infographic - Mobile Version - Final Polish */}
          <section className="relative py-16 border-y border-white/5 lg:hidden">
            <div className="absolute inset-0 bg-black/40" />
            <div className="relative container mx-auto px-4 sm:px-6">
              <div className="space-y-6">
                {[
                  {
                    step: '1',
                    title: 'We Set Up Your AI Receptionist',
                    description: 'Fully customized to your practice workflow.'
                  },
                  {
                    step: '2',
                    title: 'Connect Your Phone',
                    description: 'Takes 10 minutes. No training required.'
                  },
                  {
                    step: '3',
                    title: 'AI Answers 24/7',
                    description: 'More appointments, zero missed calls.'
                  }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="relative bg-black/30 border border-white/[0.03] rounded-2xl p-8 text-center flex flex-col items-center justify-center"
                  >
                    {/* Step Number Badge - Solid clean design */}
                    <div className="relative w-20 h-20 mb-6 flex items-center justify-center">
                      <div className="relative w-20 h-20 bg-cyan-400/10 border-2 border-cyan-400/40 rounded-full flex items-center justify-center">
                        <span className="relative text-4xl font-bold text-cyan-400">{item.step}</span>
                      </div>
                    </div>

                    {/* Title - Larger for clarity */}
                    <h3 className="text-2xl font-semibold text-white mb-3">{item.title}</h3>

                    {/* Description - Centered */}
                    <p className="text-base text-gray-300/80 leading-relaxed">{item.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* FAQ Section - Compact & High Impact */}
          <section className="relative py-20 lg:py-24">
            <div className="absolute inset-0 bg-black/30" />
            <div className="relative container mx-auto px-4 sm:px-6 lg:px-12">
              <div className="max-w-3xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="text-center mb-16 lg:mb-20"
                >
                  <h2 className="text-3xl lg:text-5xl font-thin text-white mb-3">
                    Common <span className="text-cyan-400">Questions</span>
                  </h2>
                </motion.div>

                <div className="space-y-5 lg:space-y-6">
                  {[
                    {
                      q: 'Does this replace my receptionist?',
                      a: 'No. It handles overflow, after-hours, and routine calls so your team can focus on in-office care.'
                    },
                    {
                      q: 'Will this interrupt our phone line or patients calling normally?',
                      a: 'No. Your phone line stays fully functional — we simply add a parallel AI line.'
                    },
                    {
                      q: 'Do you integrate with our PMS?',
                      a: 'Yes — real-time syncing with OpenDental, Dentrix, EagleSoft and more.'
                    }
                  ].map((faq, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                      viewport={{ once: true }}
                      className="bg-black/30 border border-white/10 rounded-xl p-6 lg:p-8"
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-9 h-9 bg-cyan-400/10 border border-cyan-400/30 rounded-full flex items-center justify-center">
                          <FaQuestionCircle className="text-cyan-400 text-base" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg lg:text-xl font-semibold text-white mb-3">
                            {faq.q}
                          </h3>
                          <p className="text-base lg:text-lg text-gray-300/85 leading-relaxed">
                            {faq.a}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Trial Form - Mobile Optimized */}
          <section id="trial-form" className="relative py-12 lg:py-16 border-t border-white/5 lg:border-t-0">
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/60" />
            <div className="relative container mx-auto px-4 sm:px-6 lg:px-12">
              <div className="max-w-xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="text-center mb-8 lg:mb-10"
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

                            <div className="space-y-1">
                              <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="Phone Number"
                                className="w-full px-5 py-4 bg-black/50 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-all"
                                autoComplete="tel"
                              />
                              <p className="text-xs text-gray-500/70 leading-relaxed pl-1">
                                We contact you to activate your 7-day free trial. No credit card required.
                              </p>
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

                            {/* Submit - Final polish */}
                            <button
                              type="submit"
                              disabled={isSubmitting}
                              className="w-full py-4 bg-white hover:bg-neutral-100 text-black font-semibold rounded-xl transition-all duration-150 ease-out disabled:opacity-50 disabled:cursor-not-allowed text-base flex items-center justify-center gap-2 shadow-lg shadow-black/25 hover:shadow-2xl hover:shadow-cyan-400/30 hover:scale-[1.02]"
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

        {/* Mobile Sticky CTA - High Impact */}
        <AnimatePresence>
          {showStickyCTA && (
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed bottom-0 left-0 right-0 z-40 lg:hidden"
            >
              <div className="bg-black/95 backdrop-blur-xl border-t border-cyan-400/30 shadow-2xl shadow-cyan-400/20">
                <div className="container mx-auto px-4 py-4">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex-1">
                      <p className="text-xs text-gray-300 leading-tight">HIPAA-compliant</p>
                      <p className="text-xs text-gray-300 leading-tight">1-Week Free Trial</p>
                    </div>
                    <a
                      href="#trial-form"
                      onClick={(e) => {
                        e.preventDefault();
                        document.getElementById('trial-form')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="flex items-center gap-2 px-6 py-3 bg-white hover:bg-neutral-100 text-black font-semibold rounded-xl transition-all shadow-lg shadow-cyan-400/20 hover:shadow-xl hover:shadow-cyan-400/30"
                    >
                      Start Free Trial
                      <FaArrowRight className="text-sm" />
                    </a>
                    <button
                      onClick={() => {
                        setShowStickyCTA(false);
                        setStickyDismissed(true);
                      }}
                      className="flex-shrink-0 w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                      aria-label="Close"
                    >
                      <FaTimes className="text-lg" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

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
                    audioRef.current.currentTime = 0;
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
                          audioRef.current.currentTime = 0;
                        }
                      }}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      <FaTimes className="text-xl" />
                    </button>
                  </div>

                  {/* Audio Player */}
                  <div className="space-y-6">
                    {/* Waveform Visualization - Static Animation */}
                    <div className="relative h-24 bg-black/50 rounded-2xl overflow-hidden flex items-center justify-center">
                      <canvas
                        ref={canvasRef}
                        width={800}
                        height={96}
                        className="max-w-full"
                      />
                    </div>

                    {/* Audio Controls */}
                    <div className="flex items-center gap-4">
                      <div className="flex-1">
                        <audio
                          ref={audioRef}
                          src="https://yhmbki8wsvse0fwd.public.blob.vercel-storage.com/DENTIST%20MP3.mp3"
                          className="w-full"
                          controls
                          controlsList="nodownload"
                          crossOrigin="anonymous"
                          onPlay={() => conversionTracker.trackButtonClick('Demo Audio Played', 'dentists_page')}
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
