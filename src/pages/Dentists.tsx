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
  FaBolt,
  FaPlug,
  FaGlobe
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
  // Refs to prevent duplicate audio tracking events
  const audioPlayedTracked = useRef(false);
  const audioCompletedTracked = useRef(false);

  // Track Meta Pixel events on component mount
  useEffect(() => {
    if ((window as any).fbq) {
      // Standard PageView
      (window as any).fbq('track', 'PageView');

      // LandingPageView - specific to dentist landing page
      (window as any).fbq('track', 'LandingPageView');

      // ViewContent with category
      (window as any).fbq('track', 'ViewContent', {
        content_category: 'dentist'
      });
    }
  }, []);

  // Track Hear AI Click (once per session)
  const trackHearAIClick = () => {
    if ((window as any).fbq && !sessionStorage.getItem('hearAIClicked')) {
      (window as any).fbq('trackCustom', 'Hear_AI_Click');
      sessionStorage.setItem('hearAIClicked', 'true');
    }
  };

  // Track Start Trial CTA clicks
  const trackStartTrialClick = () => {
    if ((window as any).fbq) {
      (window as any).fbq('trackCustom', 'Start_Trial_Click');
    }
  };

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

  // Track audio playback events for Meta Pixel
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Reset tracking flags when modal opens (new play session)
    if (showAudioModal) {
      audioPlayedTracked.current = false;
      audioCompletedTracked.current = false;
    }

    // Handler for when audio actually starts playing (more reliable than "play")
    const handlePlaying = () => {
      // Fire Audio_Played only once per play session
      if ((window as any).fbq && !audioPlayedTracked.current) {
        (window as any).fbq('trackCustom', 'Audio_Played', {
          content_category: 'dentist',
          source: 'hear_ai_demo'
        });
        audioPlayedTracked.current = true;
      }
    };

    // Handler for when audio finishes
    const handleEnded = () => {
      // Fire Audio_Completed only once per completion session
      if ((window as any).fbq && !audioCompletedTracked.current) {
        (window as any).fbq('trackCustom', 'Audio_Completed', {
          content_category: 'dentist',
          source: 'hear_ai_demo'
        });
        audioCompletedTracked.current = true;
      }
    };

    // Attach event listeners
    audio.addEventListener('playing', handlePlaying);
    audio.addEventListener('ended', handleEnded);

    // Cleanup listeners on unmount or when modal closes
    return () => {
      audio.removeEventListener('playing', handlePlaying);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [showAudioModal]); // Re-run when modal opens/closes

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
        ctx.fillStyle = '#5EEAD4'; // teal-300
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

  // Listen for Calendly booking completion to track Schedule event
  useEffect(() => {
    const handleCalendlyMessage = (e: MessageEvent) => {
      // Verify message is from Calendly
      if (e.data?.event && e.data.event === 'calendly.event_scheduled') {
        // Fire Meta Pixel Schedule custom event
        if ((window as any).fbq) {
          (window as any).fbq('trackCustom', 'Schedule');
        }
      }
    };

    window.addEventListener('message', handleCalendlyMessage);
    return () => window.removeEventListener('message', handleCalendlyMessage);
  }, []);

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
        // Fire Meta Pixel Lead event on successful form submission
        if ((window as any).fbq) {
          (window as any).fbq('track', 'Lead');
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

      <div className="min-h-screen relative bg-[#0A0A0B] text-white">
        {/* Dynamic Tech Background - Reduced opacity for calmer feel */}
        <div className="fixed inset-0 z-0 opacity-30">
          <DynamicTechBackground />
        </div>

        {/* Content */}
        <div className="relative z-10">
          {/* Hero Section - Mobile Optimized */}
          <section className="relative overflow-hidden pt-6 pb-8 lg:py-20">
            <div className="absolute inset-0 bg-[#111113]" />

            <div className="relative container mx-auto px-4 sm:px-6 lg:px-12 max-w-6xl">
              {/* Mobile: Compact, CTA-First Layout */}
              <div className="lg:hidden space-y-4">
                {/* Trust Chip */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="text-center"
                >
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-teal-400/8 border border-teal-400/15 rounded-full">
                    <span className="text-teal-300 text-xs font-medium tracking-wide">
                      7-Day Free Trial • No Credit Card
                    </span>
                  </div>
                </motion.div>

                {/* Headline - Tighter */}
                <motion.h1
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="text-4xl font-semibold leading-[1.1] text-center tracking-tight"
                >
                  Never Miss a<br />
                  <span className="text-teal-300">Patient Call</span>
                </motion.h1>

                {/* Subheadline - Closer */}
                <motion.p
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.15 }}
                  className="text-base text-zinc-300 text-center leading-snug"
                >
                  AI receptionist that books every patient—24/7.
                </motion.p>

                {/* Primary CTA - BLUE */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="pt-1"
                >
                  <a
                    href="#trial-form"
                    onClick={(e) => {
                      e.preventDefault();
                      trackStartTrialClick();
                      document.getElementById('trial-form')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="flex items-center justify-center gap-2 w-full py-3.5 bg-blue-500 hover:bg-blue-600 text-white text-base font-semibold rounded-xl shadow-[0_4px_14px_rgba(59,130,246,0.25)] hover:shadow-[0_6px_20px_rgba(59,130,246,0.35)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-150"
                  >
                    Start Free Trial
                    <FaArrowRight className="text-sm" />
                  </a>
                </motion.div>

                {/* Price - Understated */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.25 }}
                  className="text-sm text-zinc-400 text-center font-medium"
                >
                  From $199/month
                </motion.p>

                {/* Mobile 3 Value Props - Compact */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="grid grid-cols-3 gap-2 pt-2"
                >
                  {[
                    { icon: FaPhone, title: '24/7', subtitle: 'Scheduling' },
                    { icon: FaCalendarCheck, title: '+20%', subtitle: 'Bookings' },
                    { icon: FaCheckCircle, title: '-66%', subtitle: 'No-Shows' },
                  ].map((item, i) => (
                    <div key={i} className="flex flex-col items-center gap-1.5 bg-[#18181B] border border-white/6 rounded-xl p-3">
                      <item.icon className="text-teal-300 text-lg" />
                      <p className="text-white text-sm font-semibold">{item.title}</p>
                      <p className="text-zinc-400 text-xs">{item.subtitle}</p>
                    </div>
                  ))}
                </motion.div>

                {/* Trust Line - Simple */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.35 }}
                  className="text-sm text-zinc-400 text-center font-medium pt-2"
                >
                  Trusted by <span className="text-teal-300">50+</span> U.S. Dental Practices
                </motion.p>

                {/* Mobile Audio Demo - Clean */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="pt-4"
                >
                  <button
                    onClick={() => {
                      trackHearAIClick();
                      setShowAudioModal(true);
                    }}
                    className="w-full bg-[#18181B] border border-white/6 rounded-xl p-5 hover:bg-[#1F1F23] hover:border-white/10 transition-all duration-200 group"
                  >
                    <div className="flex items-center gap-4">
                      {/* Play Icon */}
                      <div className="w-12 h-12 bg-teal-400/10 border border-teal-400/20 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-teal-400/15 transition-all duration-200">
                        <FaPlay className="text-teal-300 text-sm ml-0.5" />
                      </div>
                      {/* Text */}
                      <div className="text-left">
                        <h3 className="text-base font-medium text-white mb-0.5">
                          Hear the AI
                        </h3>
                        <p className="text-xs text-zinc-400">
                          30-sec real patient call demo
                        </p>
                      </div>
                    </div>
                  </button>
                </motion.div>

                {/* Feature Cards - Clean */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.45 }}
                  className="grid grid-cols-1 gap-3 pt-6"
                >
                  {[
                    { icon: FaPlug, text: 'Seamless PMS Integration', subtext: 'Syncs with every dental PMS.' },
                    { icon: FaGlobe, text: 'English & Spanish', subtext: 'Bilingual support included.' },
                    { icon: FaBolt, text: 'Plug-and-Play Setup', subtext: 'No training, no hardware.' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-4 bg-[#18181B] border border-white/6 rounded-xl p-4 hover:bg-[#1F1F23] transition-all duration-200">
                      <div className="w-10 h-10 bg-teal-400/8 rounded-lg flex items-center justify-center flex-shrink-0">
                        <item.icon className="text-teal-300 text-base" />
                      </div>
                      <div>
                        <p className="text-white font-medium text-sm mb-0.5">{item.text}</p>
                        <p className="text-zinc-400 text-xs">{item.subtext}</p>
                      </div>
                    </div>
                  ))}
                </motion.div>
              </div>

              {/* Desktop: Clean, Conversion-Focused Layout */}
              <div className="hidden lg:block text-center max-w-4xl mx-auto space-y-6">
                {/* Trust Chip */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal-400/8 border border-teal-400/15 rounded-full">
                    <span className="text-teal-300 text-sm font-medium tracking-wide">
                      7-Day Free Trial • No Credit Card • HIPAA-Compliant
                    </span>
                  </div>
                </motion.div>

                {/* Headline */}
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="text-6xl font-semibold leading-[1.1] tracking-tight"
                >
                  Never Miss a<br />
                  <span className="text-teal-300">Patient Call</span>
                </motion.h1>

                {/* Subheadline */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.15 }}
                  className="text-xl text-zinc-300 leading-relaxed max-w-2xl mx-auto"
                >
                  Your AI receptionist that answers every call & books every patient — 24/7.
                </motion.p>

                {/* Primary CTA - BLUE */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="flex flex-col items-center pt-2"
                >
                  <a
                    href="#trial-form"
                    onClick={(e) => {
                      e.preventDefault();
                      trackStartTrialClick();
                      document.getElementById('trial-form')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-blue-500 hover:bg-blue-600 text-white text-lg font-semibold rounded-xl shadow-[0_4px_14px_rgba(59,130,246,0.25)] hover:shadow-[0_6px_20px_rgba(59,130,246,0.35)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-150"
                  >
                    Start Free Trial
                    <FaArrowRight className="text-sm" />
                  </a>
                </motion.div>

                {/* Price - Understated */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.25 }}
                  className="text-base text-zinc-400 font-medium"
                >
                  From $199/month
                </motion.p>

                {/* 3 Value Props - Cleaner */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="grid grid-cols-3 gap-8 max-w-3xl mx-auto pt-6"
                >
                  {[
                    { icon: FaPhone, title: '24/7 Scheduling', subtitle: 'Never miss a new patient again.' },
                    { icon: FaCalendarCheck, title: '+20% Bookings', subtitle: 'AI books directly into your calendar.' },
                    { icon: FaCheckCircle, title: '-66% No-Shows', subtitle: 'Automatic confirmation calls.' },
                  ].map((item, i) => (
                    <div key={i} className="flex flex-col items-center gap-3">
                      <div className="w-14 h-14 bg-teal-400/8 border border-teal-400/15 rounded-xl flex items-center justify-center">
                        <item.icon className="text-teal-300 text-xl" />
                      </div>
                      <div className="text-center">
                        <p className="text-white font-medium text-base mb-1">{item.title}</p>
                        <p className="text-zinc-400 text-sm leading-relaxed">{item.subtitle}</p>
                      </div>
                    </div>
                  ))}
                </motion.div>

                {/* Trust Line */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.35 }}
                  className="text-sm text-zinc-400 font-medium pt-4"
                >
                  Trusted by <span className="text-teal-300">50+</span> U.S. Dental Practices
                </motion.p>

                {/* Audio Demo - Clean Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="max-w-xl mx-auto pt-8"
                >
                  <button
                    onClick={() => {
                      trackHearAIClick();
                      setShowAudioModal(true);
                    }}
                    className="w-full bg-[#18181B] border border-white/6 rounded-2xl px-8 py-6 hover:bg-[#1F1F23] hover:border-white/10 transition-all duration-200 group"
                  >
                    <div className="flex items-center justify-between gap-6">
                      <div className="text-left">
                        <h3 className="text-lg font-medium text-white mb-1 group-hover:text-teal-300 transition-colors duration-200">
                          Hear the AI in Action
                        </h3>
                        <p className="text-sm text-zinc-400">
                          30-second real patient call demo
                        </p>
                      </div>
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 bg-teal-400/10 border border-teal-400/20 rounded-full flex items-center justify-center group-hover:bg-teal-400/15 transition-all duration-200">
                          <FaPlay className="text-teal-300 text-xl ml-1" />
                        </div>
                      </div>
                    </div>

                    {/* Subtle Waveform */}
                    <div className="flex items-center justify-center gap-1 mt-5 h-8">
                      {[3, 6, 4, 8, 5, 7, 3, 9, 5, 6, 4, 7, 3, 8, 5, 6, 4, 7, 5, 6].map((height, i) => (
                        <div
                          key={i}
                          className="w-1 bg-teal-400/20 rounded-full"
                          style={{ height: `${height * 2}px` }}
                        />
                      ))}
                    </div>
                  </button>
                </motion.div>

                {/* Feature Cards - Clean Grid */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.45 }}
                  className="grid grid-cols-3 gap-4 max-w-3xl mx-auto pt-8"
                >
                  {[
                    { icon: FaPlug, text: 'PMS Integration', subtext: 'Syncs with every dental PMS.' },
                    { icon: FaGlobe, text: 'English & Spanish', subtext: 'Bilingual support included.' },
                    { icon: FaBolt, text: 'Plug-and-Play', subtext: 'No training, no hardware.' },
                  ].map((item, i) => (
                    <div key={i} className="bg-[#18181B] border border-white/6 rounded-xl p-5 text-center hover:bg-[#1F1F23] transition-all duration-200">
                      <div className="w-11 h-11 bg-teal-400/8 rounded-lg flex items-center justify-center mx-auto mb-3">
                        <item.icon className="text-teal-300 text-lg" />
                      </div>
                      <p className="text-white font-medium text-sm mb-1">{item.text}</p>
                      <p className="text-zinc-400 text-xs">{item.subtext}</p>
                    </div>
                  ))}
                </motion.div>
              </div>
            </div>
          </section>

          {/* 3-Step Infographic - Desktop Only */}
          <section className="relative py-16 lg:py-20 hidden lg:block">
            <div className="absolute inset-0 bg-[#18181B]" />
            <div className="relative container mx-auto px-6 lg:px-12 max-w-5xl">
              {/* Section Header */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl font-semibold text-white mb-3">
                  How It <span className="text-teal-300">Works</span>
                </h2>
                <p className="text-zinc-400 text-base">Get started in under 10 minutes</p>
              </motion.div>

              <div className="grid grid-cols-3 gap-6">
                {[
                  {
                    step: '1',
                    title: 'We Set Up Your AI',
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
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-[#111113] border border-white/6 rounded-2xl p-6 text-center hover:border-white/10 transition-all duration-200"
                  >
                    {/* Step Number */}
                    <div className="w-12 h-12 bg-teal-400/10 border border-teal-400/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-xl font-semibold text-teal-300">{item.step}</span>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-medium text-white mb-2">{item.title}</h3>

                    {/* Description */}
                    <p className="text-sm text-zinc-400 leading-relaxed">{item.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Testimonial Section */}
          <section className="relative py-12 lg:py-16">
            <div className="absolute inset-0 bg-[#111113]" />
            <div className="relative container mx-auto px-4 sm:px-6 lg:px-12">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="max-w-2xl mx-auto"
              >
                <div className="bg-[#18181B] border border-white/6 rounded-2xl p-6 lg:p-10 text-center">
                  {/* Star Rating */}
                  <div className="flex items-center justify-center gap-1.5 mb-4 lg:mb-6">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className="text-amber-400 text-base lg:text-lg" />
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="text-base lg:text-lg text-zinc-200 leading-relaxed mb-5 lg:mb-8">
                    <span className="lg:hidden">
                      "Cognia schedules weekend appointments automatically. No backlog, no delays."
                    </span>
                    <span className="hidden lg:block">
                      "Working with Cognia has been a game-changer for our office. If a patient requests an appointment over the weekend, Cognia schedules it for us — no backlog, no delays."
                    </span>
                  </p>

                  {/* Author */}
                  <div className="flex items-center justify-center gap-3">
                    <div className="w-10 h-10 bg-teal-400/10 rounded-full flex items-center justify-center">
                      <span className="text-teal-300 font-semibold text-sm">JO</span>
                    </div>
                    <div className="text-left">
                      <div className="font-medium text-white text-sm">Jacob Ojalvo</div>
                      <div className="text-xs text-zinc-400">My Smile Miami</div>
                    </div>
                  </div>
                </div>

                {/* Trust Line - Below card */}
                <p className="text-xs text-zinc-500 text-center mt-4">
                  Serving 50+ dental practices across the U.S.
                </p>
              </motion.div>

              {/* CTA Button After Testimonial - Mobile Only */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="flex justify-center mt-8 lg:hidden"
              >
                <a
                  href="#trial-form"
                  onClick={(e) => {
                    e.preventDefault();
                    trackStartTrialClick();
                    document.getElementById('trial-form')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-blue-500 hover:bg-blue-600 text-white text-base font-semibold rounded-xl shadow-[0_4px_14px_rgba(59,130,246,0.25)] hover:shadow-[0_6px_20px_rgba(59,130,246,0.35)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-150"
                >
                  Start Free Trial
                  <FaArrowRight className="text-sm" />
                </a>
              </motion.div>
            </div>
          </section>

          {/* 3-Step Infographic - Mobile Version */}
          <section className="relative py-10 lg:hidden">
            <div className="absolute inset-0 bg-[#18181B]" />
            <div className="relative container mx-auto px-4 sm:px-6">
              {/* Section Header */}
              <div className="text-center mb-6">
                <h2 className="text-2xl font-semibold text-white mb-2">
                  How It <span className="text-teal-300">Works</span>
                </h2>
                <p className="text-zinc-400 text-sm">Get started in under 10 minutes</p>
              </div>

              <div className="space-y-3">
                {[
                  {
                    step: '1',
                    title: 'We Set Up Your AI',
                    description: 'Fully customized to your practice.'
                  },
                  {
                    step: '2',
                    title: 'Connect Your Phone',
                    description: '10 minutes. No training required.'
                  },
                  {
                    step: '3',
                    title: 'AI Answers 24/7',
                    description: 'More appointments, zero missed calls.'
                  }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.08 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-4 bg-[#111113] border border-white/6 rounded-xl p-4"
                  >
                    {/* Step Number */}
                    <div className="w-10 h-10 bg-teal-400/10 border border-teal-400/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-lg font-semibold text-teal-300">{item.step}</span>
                    </div>

                    {/* Content */}
                    <div>
                      <h3 className="text-white font-medium text-sm mb-0.5">{item.title}</h3>
                      <p className="text-zinc-400 text-xs">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="relative py-12 lg:py-16">
            <div className="absolute inset-0 bg-[#18181B]" />
            <div className="relative container mx-auto px-4 sm:px-6 lg:px-12">
              <div className="max-w-2xl mx-auto">
                {/* Section Header */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="text-center mb-8 lg:mb-10"
                >
                  <h2 className="text-2xl lg:text-3xl font-semibold text-white">
                    Common <span className="text-teal-300">Questions</span>
                  </h2>
                </motion.div>

                <div className="space-y-3">
                  {[
                    {
                      q: 'Does this replace my receptionist?',
                      a: 'No. It handles overflow, after-hours, and routine calls so your team can focus on in-office care.'
                    },
                    {
                      q: 'Will this interrupt our phone line?',
                      a: 'No. Your phone line stays fully functional — we simply add a parallel AI line.'
                    },
                    {
                      q: 'Do you integrate with our PMS?',
                      a: 'Yes — real-time syncing with OpenDental, Dentrix, EagleSoft and more.'
                    }
                  ].map((faq, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: i * 0.08 }}
                      viewport={{ once: true }}
                      className="bg-[#111113] border border-white/6 rounded-xl p-5 lg:p-6"
                    >
                      <h3 className="text-white font-medium text-sm lg:text-base mb-2">
                        {faq.q}
                      </h3>
                      <p className="text-zinc-400 text-sm leading-relaxed">
                        {faq.a}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Trial Form Section */}
          <section id="trial-form" className="relative py-12 lg:py-16">
            <div className="absolute inset-0 bg-[#111113]" />
            <div className="relative container mx-auto px-4 sm:px-6 lg:px-12">
              <div className="max-w-md mx-auto">
                {/* Section Header */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="text-center mb-6 lg:mb-8"
                >
                  <h2 className="text-2xl lg:text-3xl font-semibold text-white mb-2">
                    Start Your <span className="text-teal-300">Free Trial</span>
                  </h2>
                  <p className="text-sm text-zinc-400">No credit card required • 7-day free trial</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="bg-[#18181B] border border-white/6 rounded-2xl p-5 lg:p-8">
                    <AnimatePresence mode="wait">
                      {!isSubmitted ? (
                        <motion.div
                          key="form"
                          initial={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                              <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Full Name *"
                                className="w-full h-12 px-4 bg-[#111113] border border-white/10 rounded-xl text-white placeholder:text-zinc-500 focus:outline-none focus:border-teal-400/50 focus:ring-1 focus:ring-teal-400/20 transition-all"
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
                                className="w-full h-12 px-4 bg-[#111113] border border-white/10 rounded-xl text-white placeholder:text-zinc-500 focus:outline-none focus:border-teal-400/50 focus:ring-1 focus:ring-teal-400/20 transition-all"
                                autoComplete="email"
                              />
                            </div>

                            <div>
                              <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="Phone Number (optional)"
                                className="w-full h-12 px-4 bg-[#111113] border border-white/10 rounded-xl text-white placeholder:text-zinc-500 focus:outline-none focus:border-teal-400/50 focus:ring-1 focus:ring-teal-400/20 transition-all"
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
                                  className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-xl"
                                >
                                  <FaTimes className="text-red-400 text-sm flex-shrink-0" />
                                  <p className="text-red-400 text-sm">{error}</p>
                                </motion.div>
                              )}
                            </AnimatePresence>

                            {/* Submit - BLUE CTA */}
                            <button
                              type="submit"
                              disabled={isSubmitting}
                              className="w-full h-12 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl shadow-[0_4px_14px_rgba(59,130,246,0.25)] hover:shadow-[0_6px_20px_rgba(59,130,246,0.35)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 flex items-center justify-center gap-2"
                            >
                              {isSubmitting ? (
                                <>
                                  <FaSpinner className="animate-spin" />
                                  <span>Starting Trial...</span>
                                </>
                              ) : (
                                <span>Start Free Trial</span>
                              )}
                            </button>

                            {/* Helper text */}
                            <p className="text-xs text-zinc-500 text-center pt-1">
                              We'll contact you to activate your trial. No credit card required.
                            </p>
                          </form>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="success"
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="py-8 text-center"
                        >
                          <div className="w-16 h-16 bg-teal-400/10 rounded-full flex items-center justify-center mx-auto mb-4">
                            <FaCheckCircle className="text-3xl text-teal-300" />
                          </div>
                          <h3 className="text-xl font-medium text-white mb-2">
                            You're In!
                          </h3>
                          <p className="text-zinc-400 text-sm mb-6">
                            Schedule a quick call to set up your AI receptionist
                          </p>
                          <a
                            href="https://calendly.com/emrebenian-cogniaai/30min"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl shadow-[0_4px_14px_rgba(59,130,246,0.25)] transition-all"
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

        {/* Mobile Sticky CTA */}
        <AnimatePresence>
          {showStickyCTA && (
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed bottom-0 left-0 right-0 z-40 lg:hidden"
            >
              <div className="bg-[#0A0A0B]/98 backdrop-blur-lg border-t border-white/10">
                <div className="container mx-auto px-4 py-3">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-zinc-400 leading-tight truncate">7-day free trial</p>
                    </div>
                    <a
                      href="#trial-form"
                      onClick={(e) => {
                        e.preventDefault();
                        trackStartTrialClick();
                        document.getElementById('trial-form')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="flex items-center gap-2 px-5 py-2.5 bg-blue-500 hover:bg-blue-600 text-white font-semibold text-sm rounded-xl shadow-[0_4px_14px_rgba(59,130,246,0.25)] transition-all"
                    >
                      Start Free Trial
                      <FaArrowRight className="text-xs" />
                    </a>
                    <button
                      onClick={() => {
                        setShowStickyCTA(false);
                        setStickyDismissed(true);
                      }}
                      className="flex-shrink-0 w-8 h-8 flex items-center justify-center text-zinc-500 hover:text-white transition-colors"
                      aria-label="Close"
                    >
                      <FaTimes className="text-base" />
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
                className="fixed inset-0 bg-black/85 backdrop-blur-sm z-50"
              />

              {/* Modal */}
              <motion.div
                initial={{ opacity: 0, scale: 0.96, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: 10 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="bg-[#18181B] border border-white/10 rounded-2xl p-6 lg:p-8 max-w-lg w-full">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h3 className="text-lg font-medium text-white mb-1">
                        AI Receptionist Demo
                      </h3>
                      <p className="text-sm text-zinc-400">
                        30-second real patient call
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
                      className="text-zinc-500 hover:text-white transition-colors p-1"
                    >
                      <FaTimes className="text-lg" />
                    </button>
                  </div>

                  {/* Audio Player */}
                  <div className="space-y-5">
                    {/* Waveform Visualization */}
                    <div className="relative h-20 bg-[#111113] rounded-xl overflow-hidden flex items-center justify-center">
                      <canvas
                        ref={canvasRef}
                        width={600}
                        height={80}
                        className="max-w-full"
                      />
                    </div>

                    {/* Audio Controls */}
                    <div>
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

                    {/* CTA in Modal */}
                    <div className="pt-2">
                      <a
                        href="#trial-form"
                        onClick={(e) => {
                          e.preventDefault();
                          setShowAudioModal(false);
                          if (audioRef.current) {
                            audioRef.current.pause();
                          }
                          trackStartTrialClick();
                          document.getElementById('trial-form')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="flex items-center justify-center gap-2 w-full py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl shadow-[0_4px_14px_rgba(59,130,246,0.25)] transition-all"
                      >
                        Start Free Trial
                        <FaArrowRight className="text-sm" />
                      </a>
                    </div>

                    {/* Info */}
                    <p className="text-xs text-zinc-500 text-center">
                      Real example of Cognia AI handling patient calls 24/7
                    </p>
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
