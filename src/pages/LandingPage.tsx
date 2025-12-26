import React, { useState, useEffect, useRef } from 'react';
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
  FaShieldAlt,
  FaClock,
  FaHeadset,
  FaQuoteLeft
} from 'react-icons/fa';
import DynamicTechBackground from '../components/DynamicTechBackground';

const LandingPage: React.FC = () => {
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
  const audioRef = useRef<HTMLAudioElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | undefined>(undefined);

  // Track Meta Pixel events on component mount
  useEffect(() => {
    if ((window as any).fbq) {
      (window as any).fbq('track', 'PageView');
      (window as any).fbq('track', 'LandingPageView');
      (window as any).fbq('track', 'ViewContent', {
        content_category: 'general_landing_page'
      });
    }
  }, []);

  // Sticky CTA scroll listener
  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = window.innerHeight * 0.6;
      setShowStickyCTA(window.scrollY > heroHeight);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Canvas waveform animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !showAudioModal) return;

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

  // Listen for Calendly booking completion
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  const trackCTAClick = () => {
    if ((window as any).fbq) {
      (window as any).fbq('trackCustom', 'Start_Trial_Click');
    }
  };

  const trackHearAIClick = () => {
    if ((window as any).fbq && !sessionStorage.getItem('hearAIClicked')) {
      (window as any).fbq('trackCustom', 'Hear_AI_Click');
      sessionStorage.setItem('hearAIClicked', 'true');
    }
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
          _subject: `Meta Ads Lead: ${formData.name}`,
          form_type: 'meta_landing_page',
          source: 'meta_ads_lp',
          submitted_at: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        // Fire Meta Pixel Lead event
        if ((window as any).fbq) {
          (window as any).fbq('track', 'Lead', {
            value: 2000.00,
            currency: 'USD',
            content_name: 'meta_landing_page_lead'
          });
        }
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
        <title>AI Receptionist - Never Miss a Call | Cognia AI</title>
        <meta name="description" content="AI receptionist that answers every call 24/7. 7-day free trial. No credit card required." />
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
          <section className="relative overflow-hidden py-12 lg:py-20">
            <div className="absolute inset-0 bg-black/40" />

            <div className="relative container mx-auto px-4 sm:px-6 lg:px-12 max-w-6xl">
              {/* Trust Strip */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex flex-wrap items-center justify-center gap-4 lg:gap-8 mb-8 lg:mb-12"
              >
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <FaShieldAlt className="text-green-400" />
                  <span>HIPAA Compliant</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <FaHeadset className="text-green-400" />
                  <span>24/7 Support</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <FaClock className="text-green-400" />
                  <span>1 Week Setup</span>
                </div>
              </motion.div>

              <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
                {/* Left Column - Content */}
                <div className="text-center lg:text-left space-y-6">
                  {/* Badge */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="inline-block px-3 py-1.5 bg-cyan-500/10 border border-cyan-500/30 rounded-full">
                      <span className="text-xs font-semibold text-cyan-400">
                        7-Day Free Trial • No Credit Card Required
                      </span>
                    </div>
                  </motion.div>

                  {/* Headline */}
                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="text-4xl sm:text-5xl lg:text-6xl font-thin leading-tight"
                  >
                    Never Miss Another{' '}
                    <span className="text-cyan-400">Customer Call</span>
                  </motion.h1>

                  {/* Subheadline */}
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.15 }}
                    className="text-lg lg:text-xl text-gray-300 max-w-xl mx-auto lg:mx-0"
                  >
                    AI receptionist that answers 24/7, books appointments, and handles calls like a human.
                    <span className="block mt-2 text-white font-medium">
                      10-20% more revenue. 76% less cost.
                    </span>
                  </motion.p>

                  {/* Value Props */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="grid grid-cols-3 gap-4 pt-4"
                  >
                    {[
                      { icon: FaPhone, title: '24/7', subtitle: 'Always On' },
                      { icon: FaCalendarCheck, title: '20%+', subtitle: 'More Bookings' },
                      { icon: FaCheckCircle, title: '0.5s', subtitle: 'Response Time' },
                    ].map((item, i) => (
                      <div key={i} className="text-center">
                        <item.icon className="text-cyan-400 text-2xl mx-auto mb-2" />
                        <p className="text-white text-lg font-bold">{item.title}</p>
                        <p className="text-gray-400 text-xs">{item.subtitle}</p>
                      </div>
                    ))}
                  </motion.div>

                  {/* Audio Demo Button */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.25 }}
                    className="pt-4"
                  >
                    <button
                      onClick={() => {
                        trackHearAIClick();
                        setShowAudioModal(true);
                      }}
                      className="inline-flex items-center gap-3 px-6 py-3 bg-white/5 border border-white/20 hover:border-cyan-400/50 rounded-xl transition-all group"
                    >
                      <div className="w-10 h-10 bg-cyan-400/20 border border-cyan-400/50 rounded-full flex items-center justify-center group-hover:bg-cyan-400/30 transition-colors">
                        <FaPlay className="text-cyan-400 text-sm ml-0.5" />
                      </div>
                      <div className="text-left">
                        <p className="text-white font-medium text-sm">Hear the AI</p>
                        <p className="text-gray-400 text-xs">30 second demo</p>
                      </div>
                    </button>
                  </motion.div>

                  {/* Testimonial */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="pt-6 border-t border-white/10"
                  >
                    <div className="flex items-start gap-3">
                      <FaQuoteLeft className="text-cyan-400/50 text-lg flex-shrink-0 mt-1" />
                      <div>
                        <p className="text-gray-300 text-sm italic">
                          "Game-changer for our office. No more missed calls, no more Monday morning voicemail chaos."
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <div className="flex gap-0.5">
                            {[...Array(5)].map((_, i) => (
                              <FaStar key={i} className="text-yellow-400 text-xs" />
                            ))}
                          </div>
                          <span className="text-gray-500 text-xs">— Jacob O., Healthcare</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Right Column - Form */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  id="trial-form"
                >
                  <div className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl p-6 lg:p-8">
                    <AnimatePresence mode="wait">
                      {!isSubmitted ? (
                        <motion.div
                          key="form"
                          initial={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          <div className="text-center mb-6">
                            <h2 className="text-xl lg:text-2xl font-medium text-white mb-2">
                              Start Your Free Trial
                            </h2>
                            <p className="text-sm text-gray-400">
                              No credit card • Setup in 1 week
                            </p>
                          </div>

                          <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                              <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Full Name *"
                                className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400/50 transition-all text-sm"
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
                                className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400/50 transition-all text-sm"
                                autoComplete="email"
                              />
                            </div>

                            <div>
                              <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="Phone Number (Optional)"
                                className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400/50 transition-all text-sm"
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
                              onClick={trackCTAClick}
                              className="w-full py-4 bg-white hover:bg-neutral-100 text-black font-semibold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed text-base flex items-center justify-center gap-2"
                            >
                              {isSubmitting ? (
                                <>
                                  <FaSpinner className="animate-spin" />
                                  <span>Starting Trial...</span>
                                </>
                              ) : (
                                <>
                                  <span>Start Free Trial</span>
                                  <FaArrowRight className="text-sm" />
                                </>
                              )}
                            </button>
                          </form>

                          <p className="mt-4 text-center text-xs text-gray-500">
                            By submitting, you agree to our{' '}
                            <a href="/privacy-policy" className="text-gray-400 hover:text-gray-300 underline">
                              Privacy Policy
                            </a>
                          </p>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="success"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="py-8 text-center"
                        >
                          <div className="w-16 h-16 bg-cyan-400/10 rounded-full flex items-center justify-center mx-auto mb-4">
                            <FaCheckCircle className="text-3xl text-cyan-400" />
                          </div>
                          <h3 className="text-xl font-medium text-white mb-2">
                            You're In!
                          </h3>
                          <p className="text-gray-400 text-sm mb-6">
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

                  {/* Trust indicators below form */}
                  <div className="flex items-center justify-center gap-6 mt-4 text-xs text-gray-500">
                    <span className="flex items-center gap-1.5">
                      <FaShieldAlt className="text-green-400" />
                      HIPAA Compliant
                    </span>
                    <span className="flex items-center gap-1.5">
                      <FaCheckCircle className="text-green-400" />
                      50+ Businesses
                    </span>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* How It Works - Compact */}
          <section className="relative py-16 lg:py-20 border-t border-white/5">
            <div className="absolute inset-0 bg-black/40" />
            <div className="relative container mx-auto px-4 sm:px-6 lg:px-12 max-w-5xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <h2 className="text-2xl lg:text-3xl font-thin text-white">
                  Live in <span className="text-cyan-400">1 Week</span>
                </h2>
              </motion.div>

              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { step: '1', title: 'We Configure Your AI', desc: 'Customized to your business' },
                  { step: '2', title: 'Connect Your Phone', desc: '10 minutes, no hardware' },
                  { step: '3', title: 'AI Answers 24/7', desc: 'Never miss a call again' },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    viewport={{ once: true }}
                    className="text-center p-6 bg-white/5 border border-white/10 rounded-xl"
                  >
                    <div className="w-12 h-12 mx-auto mb-4 bg-cyan-400/10 border border-cyan-400/30 rounded-full flex items-center justify-center">
                      <span className="text-cyan-400 font-bold text-lg">{item.step}</span>
                    </div>
                    <h3 className="text-white font-medium mb-2">{item.title}</h3>
                    <p className="text-gray-400 text-sm">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Final CTA */}
          <section className="relative py-16 lg:py-20 border-t border-white/5">
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/60" />
            <div className="relative container mx-auto px-4 sm:px-6 lg:px-12 max-w-3xl text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="text-2xl lg:text-4xl font-thin text-white mb-4">
                  Ready to Never Miss a Call?
                </h2>
                <p className="text-gray-400 mb-8">
                  Join 50+ businesses already using AI receptionists
                </p>
                <a
                  href="#trial-form"
                  onClick={(e) => {
                    e.preventDefault();
                    trackCTAClick();
                    document.getElementById('trial-form')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white hover:bg-neutral-100 text-black font-semibold rounded-xl transition-all"
                >
                  Start Free Trial
                  <FaArrowRight className="text-sm" />
                </a>
              </motion.div>
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
              <div className="bg-black/95 backdrop-blur-xl border-t border-cyan-400/30 shadow-2xl">
                <div className="container mx-auto px-4 py-3">
                  <a
                    href="#trial-form"
                    onClick={(e) => {
                      e.preventDefault();
                      trackCTAClick();
                      document.getElementById('trial-form')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="flex items-center justify-center gap-2 w-full py-3.5 bg-white text-black font-semibold rounded-xl"
                  >
                    Start Free Trial
                    <FaArrowRight className="text-sm" />
                  </a>
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
                <div className="bg-black/90 border border-white/20 rounded-2xl p-6 lg:p-10 max-w-lg w-full backdrop-blur-xl">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h3 className="text-xl font-medium text-white mb-1">
                        Hear Our AI in Action
                      </h3>
                      <p className="text-sm text-gray-400">
                        30 second demo call
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

                  <div className="space-y-4">
                    <div className="relative h-20 bg-black/50 rounded-xl overflow-hidden flex items-center justify-center">
                      <canvas
                        ref={canvasRef}
                        width={500}
                        height={80}
                        className="max-w-full"
                      />
                    </div>

                    <audio
                      ref={audioRef}
                      src="https://yhmbki8wsvse0fwd.public.blob.vercel-storage.com/DENTIST%20MP3.mp3"
                      className="w-full"
                      controls
                      controlsList="nodownload"
                    />

                    <p className="text-center text-xs text-gray-500">
                      Real example of AI handling a customer call
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

export default LandingPage;
