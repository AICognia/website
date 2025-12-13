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
  FaPhoneSlash,
  FaDollarSign,
  FaShieldAlt,
  FaQuestionCircle,
  FaHeadphones
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
  const audioPlayedTracked = useRef(false);
  const audioCompletedTracked = useRef(false);

  // Track Meta Pixel events on component mount
  useEffect(() => {
    if ((window as any).fbq) {
      (window as any).fbq('track', 'PageView');
      (window as any).fbq('track', 'LandingPageView');
      (window as any).fbq('track', 'ViewContent', {
        content_category: 'dentist'
      });
    }
  }, []);

  const trackHearAIClick = () => {
    if ((window as any).fbq && !sessionStorage.getItem('hearAIClicked')) {
      (window as any).fbq('trackCustom', 'Hear_AI_Click');
      sessionStorage.setItem('hearAIClicked', 'true');
    }
  };

  const trackStartTrialClick = () => {
    if ((window as any).fbq) {
      (window as any).fbq('trackCustom', 'Start_Trial_Click');
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = window.innerHeight * 0.8;
      if (!stickyDismissed) {
        setShowStickyCTA(window.scrollY > heroHeight);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [stickyDismissed]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (showAudioModal) {
      audioPlayedTracked.current = false;
      audioCompletedTracked.current = false;
    }

    const handlePlaying = () => {
      if ((window as any).fbq && !audioPlayedTracked.current) {
        (window as any).fbq('trackCustom', 'Audio_Played', {
          content_category: 'dentist',
          source: 'hear_ai_demo'
        });
        audioPlayedTracked.current = true;
      }
    };

    const handleEnded = () => {
      if ((window as any).fbq && !audioCompletedTracked.current) {
        (window as any).fbq('trackCustom', 'Audio_Completed', {
          content_category: 'dentist',
          source: 'hear_ai_demo'
        });
        audioCompletedTracked.current = true;
      }
    };

    audio.addEventListener('playing', handlePlaying);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('playing', handlePlaying);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [showAudioModal]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const bars = 60;

    const draw = () => {
      animationRef.current = requestAnimationFrame(draw);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const centerY = canvas.height / 2;
      const barWidth = canvas.width / bars;

      for (let i = 0; i < bars; i++) {
        const time = Date.now() / 1000;
        const wave = Math.sin(i * 0.1 + time * 2) * 0.3 + 0.3;
        const barHeight = wave * (canvas.height / 4) + 10;

        const x = i * barWidth;

        ctx.fillStyle = '#06B6D4';
        ctx.fillRect(x, centerY - barHeight, barWidth - 1, barHeight);
        ctx.fillRect(x, centerY, barWidth - 1, barHeight);
      }
    };

    draw();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [showAudioModal]);

  useEffect(() => {
    const handleCalendlyMessage = (e: MessageEvent) => {
      if (e.data?.event && e.data.event === 'calendly.event_scheduled') {
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
        <title>Stop Losing $50K/Year to Missed Calls | Cognia AI for Dentists</title>
        <meta name="description" content="Your front desk misses 30% of calls. Each missed call costs you $500+. Hear a real patient call answered by AI. 7-day free trial." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen relative bg-black text-white">
        {/* Dynamic Tech Background */}
        <div className="fixed inset-0 z-0">
          <DynamicTechBackground />
        </div>

        {/* Content */}
        <div className="relative z-10">
          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 1: HERO - Lead with Pain + Primary Demo CTA
          ═══════════════════════════════════════════════════════════════════ */}
          <section className="relative overflow-hidden py-12 lg:py-20">
            <div className="absolute inset-0 bg-black/40" />

            <div className="relative container mx-auto px-4 sm:px-6 lg:px-12 max-w-5xl">
              {/* Mobile Layout */}
              <div className="lg:hidden space-y-6">
                {/* Pain-Focused Headline */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-center"
                >
                  <h1 className="text-4xl font-bold leading-tight mb-4">
                    Your Front Desk Misses<br />
                    <span className="text-red-400">30% of Calls.</span>
                  </h1>
                  <p className="text-lg text-gray-300 leading-relaxed">
                    That's <span className="text-white font-semibold">$50,000+/year</span> walking out the door.
                  </p>
                </motion.div>

                {/* What This Is - No Fluff */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="text-base text-gray-400 text-center"
                >
                  We answer your overflow calls, book appointments into your calendar, and confirm them automatically.
                </motion.p>

                {/* PRIMARY CTA: Demo First */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.15 }}
                >
                  <button
                    onClick={() => {
                      trackHearAIClick();
                      setShowAudioModal(true);
                    }}
                    className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-cyan-500 hover:bg-cyan-400 text-black font-bold rounded-xl transition-all shadow-lg shadow-cyan-500/30"
                  >
                    <FaHeadphones className="text-xl" />
                    Hear a Real Patient Call (30 sec)
                  </button>
                </motion.div>

                {/* Secondary CTA */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <a
                    href="#trial-form"
                    onClick={(e) => {
                      e.preventDefault();
                      trackStartTrialClick();
                      document.getElementById('trial-form')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold rounded-xl transition-all"
                  >
                    Start 7-Day Free Trial
                    <FaArrowRight className="text-sm" />
                  </a>
                  <p className="text-xs text-gray-500 text-center mt-2">
                    No credit card. No contracts. We set it up for you.
                  </p>
                </motion.div>

                {/* Trust Line */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.25 }}
                  className="pt-4 border-t border-white/10"
                >
                  <p className="text-sm text-gray-400 text-center">
                    Used by <span className="text-white font-medium">50+ dental practices</span> across the U.S.
                  </p>
                </motion.div>
              </div>

              {/* Desktop Layout */}
              <div className="hidden lg:block text-center max-w-4xl mx-auto space-y-8">
                {/* Pain-Focused Headline */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h1 className="text-6xl font-bold leading-tight mb-6">
                    Your Front Desk Misses <span className="text-red-400">30% of Calls.</span>
                  </h1>
                  <p className="text-2xl text-gray-300">
                    That's <span className="text-white font-semibold">$50,000+/year</span> walking out the door.
                  </p>
                </motion.div>

                {/* What This Is */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="text-xl text-gray-400 max-w-2xl mx-auto"
                >
                  We answer your overflow calls, book appointments directly into your calendar, and confirm them automatically. You keep every patient.
                </motion.p>

                {/* CTAs */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.15 }}
                  className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                  <button
                    onClick={() => {
                      trackHearAIClick();
                      setShowAudioModal(true);
                    }}
                    className="flex items-center justify-center gap-3 px-8 py-4 bg-cyan-500 hover:bg-cyan-400 text-black font-bold rounded-xl transition-all shadow-lg shadow-cyan-500/30 hover:scale-105"
                  >
                    <FaHeadphones className="text-xl" />
                    Hear a Real Patient Call (30 sec)
                  </button>

                  <a
                    href="#trial-form"
                    onClick={(e) => {
                      e.preventDefault();
                      trackStartTrialClick();
                      document.getElementById('trial-form')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="flex items-center justify-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold rounded-xl transition-all"
                  >
                    Start 7-Day Free Trial
                    <FaArrowRight className="text-sm" />
                  </a>
                </motion.div>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-sm text-gray-500"
                >
                  No credit card. No contracts. We set it up for you.
                </motion.p>

                {/* Trust Line */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.25 }}
                  className="pt-6 border-t border-white/10 inline-block"
                >
                  <p className="text-base text-gray-400">
                    Used by <span className="text-white font-medium">50+ dental practices</span> across the U.S.
                  </p>
                </motion.div>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 2: PROBLEM AGITATION - Make It Uncomfortable
          ═══════════════════════════════════════════════════════════════════ */}
          <section className="relative py-16 lg:py-24 border-t border-white/5">
            <div className="absolute inset-0 bg-black/30" />
            <div className="relative container mx-auto px-4 sm:px-6 lg:px-12 max-w-4xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                  Where Your Calls Go to Die
                </h2>
                <p className="text-lg text-gray-400">
                  Every missed call is a patient choosing someone else.
                </p>
              </motion.div>

              <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
                {[
                  {
                    icon: FaPhoneSlash,
                    title: 'Lunch Hour',
                    stat: '12pm–1pm',
                    description: 'Your busiest call time. Your staff is eating.',
                    color: 'red'
                  },
                  {
                    icon: FaPhone,
                    title: 'Hold Overflow',
                    stat: '23% abandon',
                    description: 'Patients on hold for 90+ seconds hang up.',
                    color: 'red'
                  },
                  {
                    icon: FaDollarSign,
                    title: 'After Hours',
                    stat: '$500/call',
                    description: 'Evening callers book elsewhere by morning.',
                    color: 'red'
                  }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-black/40 border border-red-500/20 rounded-xl p-6 text-center"
                  >
                    <div className="w-14 h-14 bg-red-500/10 border border-red-500/30 rounded-full flex items-center justify-center mx-auto mb-4">
                      <item.icon className="text-red-400 text-xl" />
                    </div>
                    <p className="text-2xl font-bold text-red-400 mb-1">{item.stat}</p>
                    <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-400">{item.description}</p>
                  </motion.div>
                ))}
              </div>

              {/* Revenue Calculator */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="mt-12 bg-black/50 border border-white/10 rounded-2xl p-6 lg:p-8 text-center"
              >
                <p className="text-lg text-gray-300 mb-2">The math is simple:</p>
                <p className="text-2xl lg:text-3xl font-bold text-white">
                  <span className="text-red-400">5 missed calls/week</span> × <span className="text-white">$500 value</span> × <span className="text-white">52 weeks</span> = <span className="text-red-400">$130,000 lost</span>
                </p>
                <p className="text-gray-500 mt-3 text-sm">
                  Even capturing 2 extra patients/week pays for this 10x over.
                </p>
              </motion.div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 3: HOW IT WORKS - Simple Steps, No Jargon
          ═══════════════════════════════════════════════════════════════════ */}
          <section className="relative py-16 lg:py-24 border-t border-white/5">
            <div className="absolute inset-0 bg-black/40" />
            <div className="relative container mx-auto px-4 sm:px-6 lg:px-12 max-w-5xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                  How It Works
                </h2>
                <p className="text-lg text-gray-400">
                  No hardware. No training. No disruption to your current phone system.
                </p>
              </motion.div>

              <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
                {[
                  {
                    step: '1',
                    title: 'We Build Your AI Receptionist',
                    description: 'Tell us your hours, services, and booking rules. We configure everything. Takes 24 hours.',
                    highlight: '24-hour setup'
                  },
                  {
                    step: '2',
                    title: 'Connect in 10 Minutes',
                    description: 'We add a parallel phone line. Your current number keeps working exactly as before.',
                    highlight: 'Zero disruption'
                  },
                  {
                    step: '3',
                    title: 'Never Miss a Call Again',
                    description: 'Overflow, after-hours, lunch breaks—every call gets answered and booked.',
                    highlight: '24/7 coverage'
                  }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-black/30 border border-white/10 rounded-xl p-6 lg:p-8 text-center hover:border-cyan-400/30 transition-all"
                  >
                    <div className="w-16 h-16 bg-cyan-400/10 border-2 border-cyan-400/40 rounded-full flex items-center justify-center mx-auto mb-5">
                      <span className="text-3xl font-bold text-cyan-400">{item.step}</span>
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-3">{item.title}</h3>
                    <p className="text-gray-400 mb-4">{item.description}</p>
                    <span className="inline-block px-3 py-1 bg-cyan-400/10 border border-cyan-400/30 rounded-full text-xs text-cyan-400 font-medium">
                      {item.highlight}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* Key Differentiator */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="mt-10 text-center"
              >
                <p className="text-gray-400">
                  <span className="text-white font-medium">Works with every practice management system:</span>{' '}
                  Open Dental, Dentrix, Eaglesoft, and more.
                </p>
              </motion.div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 4: DEMO EMPHASIS - Make Them Listen
          ═══════════════════════════════════════════════════════════════════ */}
          <section className="relative py-16 lg:py-24 border-t border-white/5">
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-cyan-950/20" />
            <div className="relative container mx-auto px-4 sm:px-6 lg:px-12 max-w-3xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                  Don't Take Our Word For It.
                </h2>
                <p className="text-lg text-gray-400 mb-8">
                  Listen to a real patient call. Unscripted. 30 seconds.
                </p>

                <button
                  onClick={() => {
                    trackHearAIClick();
                    setShowAudioModal(true);
                  }}
                  className="relative w-full max-w-xl mx-auto bg-black/50 rounded-2xl p-8 lg:p-10 hover:bg-black/60 transition-all group border border-cyan-400/30 shadow-xl shadow-cyan-500/10"
                >
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-20 h-20 bg-cyan-400/20 border-2 border-cyan-400/50 rounded-full flex items-center justify-center group-hover:bg-cyan-400/30 group-hover:scale-110 transition-all">
                      <FaPlay className="text-cyan-400 text-2xl ml-1" />
                    </div>
                    <div className="text-center">
                      <h3 className="text-xl font-bold text-white mb-2">
                        Play Demo Call
                      </h3>
                      <p className="text-gray-400 text-sm">
                        A new patient calls to book a cleaning. Hear how the AI handles it.
                      </p>
                    </div>
                  </div>

                  {/* Waveform */}
                  <div className="flex items-center justify-center gap-1 mt-6 h-8">
                    {[3, 8, 5, 12, 7, 10, 4, 11, 6, 9, 5, 8, 4, 10, 7, 12, 5, 9, 6, 11].map((height, i) => (
                      <div
                        key={i}
                        className="w-1 bg-cyan-400/30 rounded-full group-hover:bg-cyan-400/50 transition-all"
                        style={{ height: `${height * 2}px` }}
                      />
                    ))}
                  </div>
                </button>

                <p className="text-gray-500 text-sm mt-6">
                  This is exactly what your patients will experience.
                </p>
              </motion.div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 5: REAL PROOF - Specific, Grounded Testimonial
          ═══════════════════════════════════════════════════════════════════ */}
          <section className="relative py-16 lg:py-24 border-t border-white/5">
            <div className="absolute inset-0 bg-black/30" />
            <div className="relative container mx-auto px-4 sm:px-6 lg:px-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="max-w-3xl mx-auto"
              >
                <div className="bg-black/50 border border-white/10 rounded-2xl p-8 lg:p-12">
                  {/* Stars */}
                  <div className="flex items-center justify-center gap-1 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className="text-yellow-400 text-lg" />
                    ))}
                  </div>

                  {/* Quote */}
                  <blockquote className="text-lg lg:text-xl text-gray-300 text-center leading-relaxed mb-8">
                    "We used to come in Monday morning to 15+ voicemails from the weekend. Now, those are all booked appointments. Last month alone, that was <span className="text-white font-semibold">12 new patients</span> we would have lost."
                  </blockquote>

                  {/* Attribution */}
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-cyan-400/10 rounded-full flex items-center justify-center mb-3">
                      <span className="text-cyan-400 font-bold">JO</span>
                    </div>
                    <p className="text-white font-medium">Dr. Jacob Ojalvo</p>
                    <p className="text-gray-400 text-sm">My Smile Miami — General Dentistry</p>
                    <p className="text-gray-500 text-xs mt-1">Using Cognia since March 2024</p>
                  </div>
                </div>

                {/* Secondary Proof Points */}
                <div className="grid grid-cols-3 gap-4 mt-8">
                  {[
                    { stat: '50+', label: 'Dental practices' },
                    { stat: '24/7', label: 'Call coverage' },
                    { stat: '98%', label: 'Booking accuracy' }
                  ].map((item, i) => (
                    <div key={i} className="text-center">
                      <p className="text-2xl lg:text-3xl font-bold text-cyan-400">{item.stat}</p>
                      <p className="text-gray-400 text-sm">{item.label}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 6: OBJECTION HANDLING - Direct Answers
          ═══════════════════════════════════════════════════════════════════ */}
          <section className="relative py-16 lg:py-24 border-t border-white/5">
            <div className="absolute inset-0 bg-black/40" />
            <div className="relative container mx-auto px-4 sm:px-6 lg:px-12 max-w-3xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                  Your Questions, Answered.
                </h2>
              </motion.div>

              <div className="space-y-4">
                {[
                  {
                    q: '"Will patients know it\'s AI?"',
                    a: 'Some will, some won\'t. More importantly: patients who reach a booking get scheduled. Patients who reach voicemail call your competitor. We\'ve tested this extensively—patients care about getting help, not who\'s helping.'
                  },
                  {
                    q: '"Will it mess up my schedule?"',
                    a: 'No. It books directly into your existing calendar based on rules YOU set. Appointment types, durations, buffer times—all configured exactly how you want. If there\'s a conflict, it offers the next available slot.'
                  },
                  {
                    q: '"What if it makes a mistake?"',
                    a: 'Every call is recorded and transcribed. You can review any conversation. If the AI is unsure, it takes a message and your staff follows up. It never guesses.'
                  },
                  {
                    q: '"Does this replace my front desk?"',
                    a: 'No. It handles overflow, after-hours, and lunch breaks so your staff can focus on patients in the office. Think of it as your front desk\'s backup, not replacement.'
                  },
                  {
                    q: '"Is this HIPAA compliant?"',
                    a: 'Yes. BAA included. All data encrypted. We\'ve been through compliance review with DSOs and hospital-affiliated practices. We\'ll send documentation before you sign anything.'
                  }
                ].map((faq, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.05 }}
                    viewport={{ once: true }}
                    className="bg-black/30 border border-white/10 rounded-xl p-5 lg:p-6"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-cyan-400/10 border border-cyan-400/30 rounded-full flex items-center justify-center mt-0.5">
                        <FaQuestionCircle className="text-cyan-400 text-sm" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-2">{faq.q}</h3>
                        <p className="text-gray-400 leading-relaxed">{faq.a}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 7: PRICING FRAME - Cost vs. Value
          ═══════════════════════════════════════════════════════════════════ */}
          <section className="relative py-16 lg:py-24 border-t border-white/5">
            <div className="absolute inset-0 bg-black/30" />
            <div className="relative container mx-auto px-4 sm:px-6 lg:px-12 max-w-3xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                  The Cost of One Missed Call
                </h2>

                <div className="bg-black/50 border border-white/10 rounded-2xl p-8 lg:p-10 mb-8">
                  <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div className="text-left">
                      <p className="text-gray-400 mb-2">Average new patient value:</p>
                      <p className="text-3xl font-bold text-white mb-4">$500–$1,200</p>
                      <p className="text-gray-400 mb-2">Cognia starts at:</p>
                      <p className="text-3xl font-bold text-cyan-400">$199/month</p>
                    </div>
                    <div className="bg-cyan-400/5 border border-cyan-400/20 rounded-xl p-6">
                      <p className="text-gray-400 text-sm mb-2">Break-even point:</p>
                      <p className="text-4xl font-bold text-cyan-400 mb-2">1 patient</p>
                      <p className="text-gray-400 text-sm">per month</p>
                    </div>
                  </div>
                </div>

                <p className="text-gray-400">
                  If we save you <span className="text-white font-medium">one patient per month</span>, you're ahead.<br />
                  Most practices capture <span className="text-white font-medium">8–12 additional patients</span> in their first month.
                </p>
              </motion.div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════════
              SECTION 8: FINAL CTA - Aggressive Reassurance
          ═══════════════════════════════════════════════════════════════════ */}
          <section id="trial-form" className="relative py-16 lg:py-24 border-t border-white/5">
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-cyan-950/20" />
            <div className="relative container mx-auto px-4 sm:px-6 lg:px-12">
              <div className="max-w-xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="text-center mb-8"
                >
                  <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                    Try It Free for 7 Days
                  </h2>
                  <p className="text-gray-400 mb-6">
                    See exactly how many calls you're missing. No risk.
                  </p>

                  {/* Trust Badges */}
                  <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
                    {[
                      { icon: FaCheckCircle, text: 'No credit card' },
                      { icon: FaCheckCircle, text: 'Cancel anytime' },
                      { icon: FaCheckCircle, text: 'We set it up for you' },
                      { icon: FaShieldAlt, text: 'HIPAA compliant' }
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-gray-300">
                        <item.icon className="text-cyan-400 text-xs" />
                        <span>{item.text}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="bg-black/50 border border-white/10 rounded-2xl p-6 lg:p-8">
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
                                placeholder="Your Name *"
                                className="w-full px-4 py-3.5 bg-black/50 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-all"
                                autoComplete="name"
                              />
                            </div>

                            <div>
                              <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Work Email *"
                                className="w-full px-4 py-3.5 bg-black/50 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-all"
                                autoComplete="email"
                              />
                            </div>

                            <div>
                              <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="Practice Phone (optional)"
                                className="w-full px-4 py-3.5 bg-black/50 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-all"
                                autoComplete="tel"
                              />
                            </div>

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

                            <button
                              type="submit"
                              disabled={isSubmitting}
                              className="w-full py-4 bg-cyan-500 hover:bg-cyan-400 text-black font-bold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/30"
                            >
                              {isSubmitting ? (
                                <>
                                  <FaSpinner className="animate-spin" />
                                  <span>Starting Trial...</span>
                                </>
                              ) : (
                                <>
                                  <span>Start Free 7-Day Trial</span>
                                  <FaArrowRight className="text-sm" />
                                </>
                              )}
                            </button>

                            <p className="text-xs text-gray-500 text-center">
                              We'll call within 24 hours to get you set up. Your practice keeps running normally.
                            </p>
                          </form>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="success"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="py-10 text-center"
                        >
                          <div className="w-16 h-16 bg-cyan-400/10 rounded-full flex items-center justify-center mx-auto mb-6">
                            <FaCheckCircle className="text-3xl text-cyan-400" />
                          </div>
                          <h3 className="text-2xl font-bold text-white mb-2">
                            You're In.
                          </h3>
                          <p className="text-gray-400 mb-6">
                            We're setting up your trial now. Book a quick call to finish setup:
                          </p>
                          <a
                            href="https://calendly.com/emrebenian-cogniaai/30min"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-black font-bold rounded-xl transition-all"
                          >
                            <FaCalendarCheck />
                            Schedule Setup Call (15 min)
                          </a>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>

                {/* Final Reassurance */}
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="text-center text-gray-500 text-sm mt-6"
                >
                  Still unsure? <button onClick={() => { trackHearAIClick(); setShowAudioModal(true); }} className="text-cyan-400 hover:underline">Listen to the demo first</button> — takes 30 seconds.
                </motion.p>
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
              transition={{ duration: 0.3 }}
              className="fixed bottom-0 left-0 right-0 z-40 lg:hidden"
            >
              <div className="bg-black/95 backdrop-blur-xl border-t border-cyan-400/30">
                <div className="container mx-auto px-4 py-3">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-400 truncate">7-day free trial</p>
                      <p className="text-sm text-white font-medium truncate">No credit card required</p>
                    </div>
                    <a
                      href="#trial-form"
                      onClick={(e) => {
                        e.preventDefault();
                        trackStartTrialClick();
                        document.getElementById('trial-form')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="flex-shrink-0 flex items-center gap-2 px-5 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-black font-bold rounded-lg transition-all text-sm"
                    >
                      Start Trial
                      <FaArrowRight className="text-xs" />
                    </a>
                    <button
                      onClick={() => {
                        setShowStickyCTA(false);
                        setStickyDismissed(true);
                      }}
                      className="flex-shrink-0 w-8 h-8 flex items-center justify-center text-gray-500 hover:text-white transition-colors"
                      aria-label="Close"
                    >
                      <FaTimes />
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

              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="bg-black/95 border border-white/20 rounded-2xl p-6 lg:p-10 max-w-xl w-full">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">
                        Real Patient Call
                      </h3>
                      <p className="text-sm text-gray-400">
                        New patient booking a cleaning appointment
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

                  {/* Waveform */}
                  <div className="relative h-20 bg-black/50 rounded-xl overflow-hidden flex items-center justify-center mb-6">
                    <canvas
                      ref={canvasRef}
                      width={600}
                      height={80}
                      className="max-w-full"
                    />
                  </div>

                  {/* Audio Player */}
                  <div className="mb-6">
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

                  {/* What They'll Hear */}
                  <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-6">
                    <p className="text-sm text-gray-400 mb-2">What you'll hear:</p>
                    <ul className="text-sm text-gray-300 space-y-1">
                      <li>• Patient calls to schedule a cleaning</li>
                      <li>• AI checks availability and books the appointment</li>
                      <li>• Confirmation sent automatically</li>
                    </ul>
                  </div>

                  {/* CTA in Modal */}
                  <a
                    href="#trial-form"
                    onClick={(e) => {
                      e.preventDefault();
                      setShowAudioModal(false);
                      trackStartTrialClick();
                      document.getElementById('trial-form')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-cyan-500 hover:bg-cyan-400 text-black font-bold rounded-xl transition-all"
                  >
                    Start Free Trial
                    <FaArrowRight className="text-sm" />
                  </a>
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
