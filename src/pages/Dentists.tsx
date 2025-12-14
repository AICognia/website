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
  FaPlug,
  FaGlobe,
  FaClock,
  FaShieldAlt,
  FaCalendarAlt,
  FaComments,
  FaBell,
  FaChevronDown,
  FaChevronUp,
  FaHeadphones,
  FaVolumeUp
} from 'react-icons/fa';
import conversionTracker from '../utils/conversionTracking';
import DynamicTechBackground from '../components/DynamicTechBackground';

const Dentists: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    practiceName: '',
    email: '',
    phone: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showAudioModal, setShowAudioModal] = useState(false);
  const [audioEnded, setAudioEnded] = useState(false);
  const [showStickyCTA, setShowStickyCTA] = useState(false);
  const [stickyDismissed, setStickyDismissed] = useState(false);
  const [stickyDismissTime, setStickyDismissTime] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | undefined>(undefined);
  const audioPlayedTracked = useRef(false);
  const audioCompletedTracked = useRef(false);
  const formRef = useRef<HTMLDivElement>(null);
  const finalFormRef = useRef<HTMLDivElement>(null);

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

  // Sticky CTA scroll listener with re-show after dismiss
  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = window.innerHeight * 0.8;
      const currentTime = Date.now();

      if (stickyDismissed && currentTime - stickyDismissTime > 20000) {
        setStickyDismissed(false);
      }

      if (!stickyDismissed) {
        setShowStickyCTA(window.scrollY > heroHeight);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [stickyDismissed, stickyDismissTime]);

  // Track audio playback events for Meta Pixel
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (showAudioModal) {
      audioPlayedTracked.current = false;
      audioCompletedTracked.current = false;
      setAudioEnded(false);
    }

    const handlePlaying = () => {
      setIsPlaying(true);
      if ((window as any).fbq && !audioPlayedTracked.current) {
        (window as any).fbq('trackCustom', 'Audio_Played', {
          content_category: 'dentist',
          source: 'hear_ai_demo'
        });
        audioPlayedTracked.current = true;
      }
    };

    const handlePause = () => {
      setIsPlaying(false);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      if ((window as any).fbq && !audioCompletedTracked.current) {
        (window as any).fbq('trackCustom', 'Audio_Completed', {
          content_category: 'dentist',
          source: 'hear_ai_demo'
        });
        audioCompletedTracked.current = true;
      }
      setAudioEnded(true);
    };

    audio.addEventListener('playing', handlePlaying);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('playing', handlePlaying);
      audio.removeEventListener('pause', handlePause);
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

  // Canvas waveform animation
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.phone) {
      setError('Please fill in all required fields');
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
          _subject: `Dentist Free Trial Request from ${formData.name}${formData.practiceName ? ` - ${formData.practiceName}` : ''}`,
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

  const scrollToForm = () => {
    trackStartTrialClick();
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToFinalForm = () => {
    trackStartTrialClick();
    finalFormRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Reusable Form Component
  const TrialForm = ({ variant = 'default' }: { variant?: 'default' | 'hero' | 'final' }) => {
    const isHero = variant === 'hero';

    return (
      <div className={`${isHero ? 'bg-white/[0.03] border-white/10' : 'bg-black/50 border-white/10'} border rounded-2xl ${isHero ? 'p-6 lg:p-10' : 'p-6 lg:p-10'} backdrop-blur-sm`}>
        <AnimatePresence mode="wait">
          {!isSubmitted ? (
            <motion.div
              key="form"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {isHero && (
                <div className="text-center mb-8">
                  <h3 className="text-xl lg:text-2xl font-semibold text-white mb-2">
                    Start Your Free Trial
                  </h3>
                  <p className="text-sm text-gray-400">No credit card required</p>
                </div>
              )}
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Full Name *"
                  className="w-full px-4 py-4 bg-black/50 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-all text-sm"
                  autoComplete="name"
                />
                <input
                  type="text"
                  name="practiceName"
                  value={formData.practiceName}
                  onChange={handleChange}
                  placeholder="Practice Name"
                  className="w-full px-4 py-4 bg-black/50 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-all text-sm"
                  autoComplete="organization"
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email Address *"
                  className="w-full px-4 py-4 bg-black/50 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-all text-sm"
                  autoComplete="email"
                />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone Number *"
                  className="w-full px-4 py-4 bg-black/50 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-all text-sm"
                  autoComplete="tel"
                />

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
                  className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-base flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/25 hover:shadow-xl hover:shadow-cyan-500/30 hover:scale-[1.02]"
                >
                  {isSubmitting ? (
                    <>
                      <FaSpinner className="animate-spin" />
                      <span>Starting Trial...</span>
                    </>
                  ) : (
                    <>
                      <span>Start 7-Day Free Trial</span>
                      <FaArrowRight className="text-sm" />
                    </>
                  )}
                </button>

                <p className="text-xs text-gray-500 text-center leading-relaxed">
                  Setup takes ~1 week • No credit card required
                </p>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="w-12 h-12 bg-cyan-400/10 rounded-full flex items-center justify-center">
                  <FaCheckCircle className="text-2xl text-cyan-400" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                You're In!
              </h3>
              <p className="text-gray-400 text-sm mb-6">
                Pick a time for your setup call below
              </p>
              <div className="rounded-xl overflow-hidden bg-white">
                <iframe
                  src={`https://calendly.com/emrebenian-cogniaai/30min?hide_gdpr_banner=1&background_color=000000&text_color=ffffff&primary_color=06b6d4&name=${encodeURIComponent(formData.name)}&email=${encodeURIComponent(formData.email)}`}
                  width="100%"
                  height="600"
                  frameBorder="0"
                  title="Schedule Setup Call"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  const faqs = [
    {
      q: 'Does this replace my receptionist?',
      a: 'No. Cognia handles overflow calls, after-hours inquiries, and routine scheduling so your front desk team can focus on in-office patient care. Think of it as a 24/7 extension of your team.'
    },
    {
      q: 'Will this interrupt our phone line?',
      a: 'Not at all. Your existing phone line stays fully functional. We add a parallel AI line that handles calls seamlessly — patients won\'t notice any difference except faster service.'
    },
    {
      q: 'Which practice management systems do you integrate with?',
      a: 'We integrate with all major dental PMS including OpenDental, Dentrix, Eaglesoft, Curve Dental, and Denticon. Real-time syncing means appointments appear in your calendar instantly.'
    },
    {
      q: 'What happens if the AI can\'t answer a question?',
      a: 'The AI is trained to recognize when a question requires human attention. It will collect the patient\'s information and flag it for your team to follow up, ensuring nothing falls through the cracks.'
    },
    {
      q: 'How long does setup take?',
      a: 'Full setup takes about 1 week. We customize the AI to your practice — your services, schedule, insurance policies, and communication style. Once configured, going live takes just 10 minutes.'
    },
    {
      q: 'What\'s included in the $199/month?',
      a: 'Everything: 24/7 call handling, appointment scheduling, PMS integration, bilingual support (English & Spanish), confirmation calls, and a dashboard to monitor all activity. No hidden fees.'
    }
  ];

  return (
    <>
      <Helmet>
        <title>AI Receptionist for Dental Practices | Cognia AI</title>
        <meta name="description" content="Your patients are calling. Right now. AI receptionist that books appointments 24/7. 7-day free trial, no credit card required. HIPAA compliant." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen relative bg-black text-white">
        {/* Dynamic Tech Background */}
        <div className="fixed inset-0 z-0">
          <DynamicTechBackground />
        </div>

        {/* Content */}
        <div className="relative z-10">

          {/* ==================== HERO SECTION ==================== */}
          <section className="relative overflow-hidden pt-8 pb-16 lg:pt-16 lg:pb-24">
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />

            <div className="relative container mx-auto px-4 sm:px-6 lg:px-12 max-w-7xl">

              {/* DESKTOP: Split Layout */}
              <div className="hidden lg:grid lg:grid-cols-2 lg:gap-16 lg:items-stretch lg:min-h-[calc(100vh-8rem)]">

                {/* Left Column - Messaging */}
                <div className="space-y-8 flex flex-col justify-center">
                  {/* Badge */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full">
                      <FaShieldAlt className="text-cyan-400 text-sm" />
                      <span className="text-sm font-medium text-cyan-400">
                        HIPAA Compliant • 7-Day Free Trial
                      </span>
                    </div>
                  </motion.div>

                  {/* Headline - With tension and personality */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                  >
                    <h1 className="text-5xl lg:text-6xl xl:text-7xl font-light leading-[1.1] tracking-tight">
                      Your Patients Are
                      <br />
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                        Calling Right Now
                      </span>
                    </h1>
                    <p className="text-lg text-gray-400 mt-4 italic">
                      Who's answering?
                    </p>
                  </motion.div>

                  {/* Subheadline */}
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.15 }}
                    className="text-xl text-gray-300 leading-relaxed max-w-xl"
                  >
                    Cognia picks up every call, books appointments into your PMS,
                    and sounds so human — patients will never know the difference.
                  </motion.p>

                  {/* Benefit Checklist */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="space-y-3"
                  >
                    {[
                      'Zero hold time. Zero voicemail. Zero missed revenue.',
                      'Books directly into OpenDental, Dentrix, Eaglesoft & more',
                      'Fluent in English and Spanish — naturally'
                    ].map((benefit, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full bg-cyan-400/20 flex items-center justify-center flex-shrink-0">
                          <FaCheckCircle className="text-cyan-400 text-xs" />
                        </div>
                        <p className="text-gray-300">{benefit}</p>
                      </div>
                    ))}
                  </motion.div>

                  {/* Audio Demo - ELEVATED as centerpiece */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.25 }}
                  >
                    <button
                      onClick={() => {
                        trackHearAIClick();
                        setShowAudioModal(true);
                      }}
                      className="group relative w-full max-w-md"
                    >
                      {/* Glow effect */}
                      <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/30 to-blue-500/30 rounded-2xl blur-lg opacity-60 group-hover:opacity-100 transition-opacity" />

                      <div className="relative flex items-center gap-4 px-6 py-5 bg-gradient-to-r from-cyan-950/80 to-blue-950/80 border border-cyan-400/40 rounded-2xl transition-all duration-300 group-hover:border-cyan-400/60">
                        <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg shadow-cyan-500/30">
                          <FaHeadphones className="text-black text-2xl" />
                        </div>
                        <div className="text-left flex-1">
                          <p className="font-bold text-white text-lg group-hover:text-cyan-300 transition-colors">
                            Before you decide — hear this
                          </p>
                          <p className="text-sm text-cyan-400/80">
                            Real patient call • 30 seconds
                          </p>
                        </div>
                        <FaPlay className="text-cyan-400 text-xl group-hover:translate-x-1 transition-transform" />
                      </div>
                    </button>
                  </motion.div>

                  {/* Trust Line - Made tangible */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="flex items-center gap-3"
                  >
                    <div className="flex -space-x-2">
                      {['MS', 'DG', 'AB', 'JO'].map((initials, i) => (
                        <div
                          key={i}
                          className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400/30 to-blue-500/30 border-2 border-black flex items-center justify-center"
                        >
                          <span className="text-[10px] font-bold text-cyan-400">{initials}</span>
                        </div>
                      ))}
                    </div>
                    <p className="text-sm text-gray-400">
                      <span className="text-white font-medium">50+ practices</span> already live across the U.S.
                    </p>
                  </motion.div>
                </div>

                {/* Right Column - Form */}
                <motion.div
                  ref={formRef}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="flex flex-col justify-center"
                >
                  <TrialForm variant="hero" />
                </motion.div>
              </div>

              {/* MOBILE: Stacked Layout */}
              <div className="lg:hidden space-y-8">
                {/* Badge */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-center"
                >
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-cyan-500/10 border border-cyan-500/30 rounded-full">
                    <FaShieldAlt className="text-cyan-400 text-xs" />
                    <span className="text-xs font-medium text-cyan-400">
                      HIPAA Compliant • 7-Day Free Trial
                    </span>
                  </div>
                </motion.div>

                {/* Headline */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="text-center"
                >
                  <h1 className="text-4xl sm:text-5xl font-light leading-[1.1]">
                    Your Patients Are
                    <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                      Calling Right Now
                    </span>
                  </h1>
                  <p className="text-base text-gray-400 mt-3 italic">
                    Who's answering?
                  </p>
                </motion.div>

                {/* Subheadline */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.15 }}
                  className="text-base text-gray-300 text-center leading-relaxed"
                >
                  Cognia picks up every call & books appointments — 24/7.
                </motion.p>

                {/* Mobile Form */}
                <motion.div
                  ref={formRef}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <TrialForm variant="hero" />
                </motion.div>

                {/* Audio Demo Button - Mobile - ELEVATED */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.25 }}
                >
                  <button
                    onClick={() => {
                      trackHearAIClick();
                      setShowAudioModal(true);
                    }}
                    className="w-full relative group"
                  >
                    <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-xl blur-lg opacity-60 group-hover:opacity-100 transition-opacity" />
                    <div className="relative flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-cyan-950/80 to-blue-950/80 border border-cyan-400/40 rounded-xl">
                      <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center">
                        <FaHeadphones className="text-black text-lg" />
                      </div>
                      <div className="text-left">
                        <p className="font-bold text-white text-sm">Before you decide — hear this</p>
                        <p className="text-xs text-cyan-400/80">Real call • 30 sec</p>
                      </div>
                    </div>
                  </button>
                </motion.div>

                {/* Mobile Value Props */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="grid grid-cols-3 gap-3"
                >
                  {[
                    { icon: FaPhone, title: '24/7', subtitle: 'Always On' },
                    { icon: FaCalendarCheck, title: '+20%', subtitle: 'Bookings' },
                    { icon: FaCheckCircle, title: '-66%', subtitle: 'No-Shows' },
                  ].map((item, i) => (
                    <div key={i} className="flex flex-col items-center gap-2 p-4 bg-white/5 border border-white/5 rounded-xl">
                      <item.icon className="text-cyan-400 text-xl" />
                      <p className="text-white text-lg font-bold">{item.title}</p>
                      <p className="text-gray-400 text-xs">{item.subtitle}</p>
                    </div>
                  ))}
                </motion.div>
              </div>
            </div>
          </section>

          {/* ==================== VISUAL BREAK - Audio Demo Section ==================== */}
          <section className="relative py-20 lg:py-32 overflow-hidden">
            {/* Dramatic background */}
            <div className="absolute inset-0 bg-gradient-to-b from-black via-cyan-950/20 to-black" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-900/20 via-transparent to-transparent" />

            <div className="relative container mx-auto px-4 sm:px-6 lg:px-12 max-w-4xl text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <p className="text-cyan-400 text-sm font-semibold tracking-wider uppercase mb-4">
                  Hear the difference
                </p>
                <h2 className="text-3xl lg:text-5xl font-light text-white mb-6">
                  This Is What Your Patients
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                    Will Experience
                  </span>
                </h2>
                <p className="text-lg text-gray-400 max-w-xl mx-auto mb-10">
                  Not a robot. Not a script. A conversation that feels natural —
                  and ends with an appointment on your calendar.
                </p>

                {/* Large Audio Demo Button */}
                <button
                  onClick={() => {
                    trackHearAIClick();
                    setShowAudioModal(true);
                  }}
                  className="group relative inline-flex"
                >
                  <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500/40 to-blue-500/40 rounded-full blur-xl opacity-60 group-hover:opacity-100 transition-opacity animate-pulse" />
                  <div className="relative flex items-center gap-4 px-10 py-6 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full transition-all duration-300 group-hover:scale-105 shadow-2xl shadow-cyan-500/30">
                    <FaVolumeUp className="text-white text-2xl" />
                    <span className="text-white font-bold text-lg">Play Demo Call</span>
                  </div>
                </button>

                <p className="text-gray-500 text-sm mt-6">
                  30 seconds that could change how your practice runs
                </p>
              </motion.div>
            </div>
          </section>

          {/* ==================== THE PROBLEM SECTION ==================== */}
          <section className="relative py-16 lg:py-24 border-y border-white/5">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-950/5 to-transparent" />
            <div className="relative container mx-auto px-4 sm:px-6 lg:px-12 max-w-5xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl lg:text-5xl font-light text-white mb-4">
                  Here's What's <span className="text-red-400">Actually</span> Happening
                </h2>
                <p className="text-lg text-gray-400">
                  While you're with patients, your phone keeps ringing.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="grid md:grid-cols-3 gap-6 mb-12"
              >
                {[
                  { stat: '35%', label: 'of calls hit voicemail', sublabel: 'during busy hours' },
                  { stat: '85%', label: 'never call back', sublabel: 'if they reach voicemail' },
                  { stat: '$4,000+', label: 'lost revenue', sublabel: 'per month, minimum' },
                ].map((item, i) => (
                  <div key={i} className="flex flex-col items-center justify-center text-center p-8 bg-gradient-to-b from-red-950/10 to-transparent border border-red-500/10 rounded-2xl">
                    <p className="text-4xl lg:text-5xl font-bold text-white mb-2">{item.stat}</p>
                    <p className="text-gray-300 font-medium">{item.label}</p>
                    <p className="text-gray-500 text-sm">{item.sublabel}</p>
                  </div>
                ))}
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-center text-xl text-gray-300 max-w-2xl mx-auto"
              >
                They're not leaving voicemails. They're <span className="text-white font-medium">calling the next dentist on Google.</span>
              </motion.p>
            </div>
          </section>

          {/* ==================== HOW IT WORKS ==================== */}
          <section className="relative py-16 lg:py-24">
            <div className="absolute inset-0 bg-black/40" />
            <div className="relative container mx-auto px-4 sm:px-6 lg:px-12 max-w-6xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <h2 className="text-3xl lg:text-5xl font-light text-white mb-4">
                  Live in <span className="text-cyan-400">1 Week</span>
                </h2>
                <p className="text-gray-400 text-lg">We handle everything. You just approve.</p>
              </motion.div>

              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    step: '1',
                    title: 'We Learn Your Practice',
                    description: 'Your services, schedule, insurance policies, even how you like to greet patients. We build an AI that sounds like your team.',
                    timeline: 'Days 1-5'
                  },
                  {
                    step: '2',
                    title: '10-Minute Phone Setup',
                    description: 'Simple call forwarding. No new hardware. No IT headaches. Works with your existing phone system.',
                    timeline: 'Day 6'
                  },
                  {
                    step: '3',
                    title: 'Calls Start Booking',
                    description: 'Patients call. Cognia answers. Appointments appear in your calendar. Every conversation logged.',
                    timeline: 'Day 7'
                  }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="relative bg-white/5 border border-white/10 rounded-2xl p-8 text-center hover:border-cyan-400/30 transition-all group"
                  >
                    <div className="mx-auto mb-6 flex justify-center">
                      <div className="w-20 h-20 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 border-2 border-cyan-400/40 rounded-full flex items-center justify-center group-hover:border-cyan-400/60 transition-colors">
                        <span className="text-4xl font-bold text-cyan-400">{item.step}</span>
                      </div>
                    </div>

                    <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed mb-4">
                      {item.description}
                    </p>
                    <span className="inline-block px-3 py-1 bg-cyan-400/10 text-cyan-400 text-xs font-medium rounded-full">
                      {item.timeline}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                className="text-center mt-12"
              >
                <button
                  onClick={scrollToFinalForm}
                  className="inline-flex items-center gap-2 px-10 py-5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-lg rounded-xl transition-all duration-200 shadow-lg shadow-cyan-500/25 hover:shadow-xl hover:shadow-cyan-500/30 hover:scale-[1.02]"
                >
                  Get Started This Week
                  <FaArrowRight />
                </button>
              </motion.div>
            </div>
          </section>

          {/* ==================== FEATURES SECTION ==================== */}
          <section className="relative py-16 lg:py-24 border-y border-white/5">
            <div className="absolute inset-0 bg-gradient-to-b from-cyan-950/10 via-transparent to-transparent" />
            <div className="relative container mx-auto px-4 sm:px-6 lg:px-12 max-w-6xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <h2 className="text-3xl lg:text-5xl font-light text-white mb-4">
                  Not a Chatbot.
                  <br />
                  <span className="text-cyan-400">A Real AI Receptionist.</span>
                </h2>
                <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                  Cognia doesn't just answer calls. It handles them the way your best front desk person would.
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    icon: FaCalendarAlt,
                    title: 'Smart Scheduling',
                    description: 'New patients, existing patients, cancellations, reschedules. Booked directly into your calendar.'
                  },
                  {
                    icon: FaPlug,
                    title: 'Deep PMS Integration',
                    description: 'OpenDental, Dentrix, Eaglesoft, Curve, Denticon. Real-time sync. Appointments appear instantly.'
                  },
                  {
                    icon: FaGlobe,
                    title: 'Bilingual, Naturally',
                    description: 'English and Spanish. Not translated — truly fluent. Patients feel comfortable from the first word.'
                  },
                  {
                    icon: FaClock,
                    title: '24/7. No Exceptions.',
                    description: 'Nights. Weekends. Holidays. Overflow during lunch rush. Your AI never takes a day off.'
                  },
                  {
                    icon: FaComments,
                    title: 'Intelligent Routing',
                    description: 'Emergency? Routed immediately. Non-urgent? Scheduled properly. Nothing falls through.'
                  },
                  {
                    icon: FaBell,
                    title: 'No-Show Prevention',
                    description: 'Automated confirmations. Smart reminders. Easy rescheduling. 66% fewer empty chairs.'
                  }
                ].map((feature, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.05 }}
                    viewport={{ once: true }}
                    className="p-6 rounded-2xl border transition-all hover:border-cyan-400/30 bg-gradient-to-br from-cyan-500/10 to-blue-500/5 border-cyan-400/20 text-center"
                  >
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-cyan-400/20 mx-auto">
                      <feature.icon className="text-xl text-cyan-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* ==================== TESTIMONIAL + STATS ==================== */}
          <section className="relative py-16 lg:py-24">
            <div className="absolute inset-0 bg-black/40" />
            <div className="relative container mx-auto px-4 sm:px-6 lg:px-12 max-w-5xl">
              {/* Testimonial */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="mb-16"
              >
                <div className="relative bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-3xl p-8 lg:p-12 text-center">
                  {/* Stars */}
                  <div className="flex items-center justify-center gap-1 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className="text-cyan-400 text-lg" />
                    ))}
                  </div>

                  {/* Quote */}
                  <blockquote className="text-xl lg:text-2xl text-white leading-relaxed mb-8 max-w-3xl mx-auto">
                    Cognia has been a game-changer. Patients request appointments over the weekend, and Cognia schedules them — no backlog, no delays. It's like having a receptionist who never takes a day off.
                  </blockquote>

                  {/* Author */}
                  <div className="flex items-center justify-center gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-full flex items-center justify-center border border-cyan-400/30">
                      <span className="text-cyan-400 font-bold text-lg">JO</span>
                    </div>
                    <div className="text-left">
                      <p className="font-semibold text-white">Jacob Ojalvo</p>
                      <p className="text-gray-400 text-sm">Office Manager, My Smile Miami</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Stats Row */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="grid grid-cols-3 gap-4 lg:gap-8"
              >
                {[
                  { stat: '20%', label: 'More Bookings', sublabel: 'Average increase' },
                  { stat: '66%', label: 'Fewer No-Shows', sublabel: 'With auto-confirmations' },
                  { stat: '0', label: 'Missed Calls', sublabel: 'With 24/7 coverage' },
                ].map((item, i) => (
                  <div key={i} className="text-center p-4 lg:p-6 bg-white/5 border border-white/10 rounded-2xl">
                    <p className="text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                      {item.stat}
                    </p>
                    <p className="text-white font-medium mt-1">{item.label}</p>
                    <p className="text-gray-500 text-xs mt-0.5">{item.sublabel}</p>
                  </div>
                ))}
              </motion.div>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-center mt-12"
              >
                <button
                  onClick={scrollToFinalForm}
                  className="inline-flex items-center gap-2 px-10 py-5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-lg rounded-xl transition-all duration-200 shadow-lg shadow-cyan-500/25 hover:shadow-xl hover:shadow-cyan-500/30 hover:scale-[1.02]"
                >
                  Start Free Trial
                  <FaArrowRight />
                </button>
              </motion.div>
            </div>
          </section>

          {/* ==================== FAQ SECTION ==================== */}
          <section className="relative py-16 lg:py-24 border-y border-white/5">
            <div className="absolute inset-0 bg-black/30" />
            <div className="relative container mx-auto px-4 sm:px-6 lg:px-12 max-w-3xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl lg:text-4xl font-light text-white">
                  Questions? We've Got Answers.
                </h2>
              </motion.div>

              <div className="space-y-3">
                {faqs.map((faq, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.05 }}
                    viewport={{ once: true }}
                  >
                    <button
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className={`w-full text-left p-5 rounded-xl border transition-all ${
                        openFaq === i
                          ? 'bg-white/10 border-cyan-400/30'
                          : 'bg-white/5 border-white/10 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-4">
                        <h3 className="font-semibold text-white">{faq.q}</h3>
                        {openFaq === i ? (
                          <FaChevronUp className="text-cyan-400 flex-shrink-0" />
                        ) : (
                          <FaChevronDown className="text-gray-400 flex-shrink-0" />
                        )}
                      </div>
                      <AnimatePresence>
                        {openFaq === i && (
                          <motion.p
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="text-gray-400 mt-3 leading-relaxed"
                          >
                            {faq.a}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* ==================== FINAL CTA SECTION ==================== */}
          <section className="relative py-20 lg:py-32">
            <div className="absolute inset-0 bg-gradient-to-t from-cyan-950/30 via-transparent to-transparent" />
            <div className="relative container mx-auto px-4 sm:px-6 lg:px-12 max-w-2xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center mb-10"
              >
                <h2 className="text-3xl lg:text-5xl font-light text-white mb-4">
                  Ready to Stop
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                    Losing Patients to Voicemail?
                  </span>
                </h2>
                <p className="text-gray-400 text-lg">
                  Start your 7-day free trial. We'll handle the rest.
                </p>
              </motion.div>

              <motion.div
                ref={finalFormRef}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <TrialForm variant="final" />
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-center text-sm text-gray-500 mt-6"
              >
                $199/month after trial • Cancel anytime • No contracts
              </motion.p>
            </div>
          </section>

          {/* Footer spacing for sticky CTA */}
          <div className="h-20 lg:h-0" />
        </div>

        {/* ==================== MOBILE STICKY CTA ==================== */}
        <AnimatePresence>
          {showStickyCTA && (
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed bottom-0 left-0 right-0 z-40 lg:hidden"
            >
              <div className="bg-black/95 backdrop-blur-xl border-t border-cyan-400/30 shadow-2xl shadow-cyan-400/20 px-4 py-3">
                <div className="flex items-center gap-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-medium text-sm truncate">Start your free trial</p>
                    <p className="text-gray-400 text-xs">HIPAA compliant • No credit card</p>
                  </div>
                  <button
                    onClick={scrollToFinalForm}
                    className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl text-sm whitespace-nowrap"
                  >
                    Get Started
                    <FaArrowRight className="text-xs" />
                  </button>
                  <button
                    onClick={() => {
                      setShowStickyCTA(false);
                      setStickyDismissed(true);
                      setStickyDismissTime(Date.now());
                    }}
                    className="p-2 text-gray-500 hover:text-white"
                    aria-label="Dismiss"
                  >
                    <FaTimes />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ==================== AUDIO MODAL ==================== */}
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
                className="fixed inset-0 bg-black/90 backdrop-blur-md z-50"
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="bg-gradient-to-b from-gray-900 to-black border border-cyan-400/30 rounded-3xl p-6 lg:p-10 max-w-lg w-full shadow-2xl shadow-cyan-500/20">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <p className="text-cyan-400 text-sm font-semibold uppercase tracking-wider mb-1">
                        Live Demo
                      </p>
                      <h3 className="text-2xl font-bold text-white">
                        Real Patient Call
                      </h3>
                    </div>
                    <button
                      onClick={() => {
                        setShowAudioModal(false);
                        if (audioRef.current) {
                          audioRef.current.pause();
                          audioRef.current.currentTime = 0;
                        }
                      }}
                      className="p-2 text-gray-400 hover:text-white transition-colors"
                    >
                      <FaTimes className="text-lg" />
                    </button>
                  </div>

                  {/* Visual indicator */}
                  <div className={`relative h-24 bg-black/50 rounded-xl overflow-hidden mb-6 border ${isPlaying ? 'border-cyan-400/50' : 'border-white/10'}`}>
                    <canvas
                      ref={canvasRef}
                      width={800}
                      height={96}
                      className="w-full h-full"
                    />
                    {!isPlaying && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <p className="text-gray-500 text-sm">Press play to hear Cognia in action</p>
                      </div>
                    )}
                  </div>

                  {/* Audio Player */}
                  <audio
                    ref={audioRef}
                    src="https://yhmbki8wsvse0fwd.public.blob.vercel-storage.com/DENTIST%20MP3.mp3"
                    className="w-full mb-6"
                    controls
                    controlsList="nodownload"
                    crossOrigin="anonymous"
                    onPlay={() => conversionTracker.trackButtonClick('Demo Audio Played', 'dentists_page')}
                  />

                  {/* Post-Audio CTA */}
                  <AnimatePresence>
                    {audioEnded && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="pt-6 border-t border-white/10"
                      >
                        <p className="text-center text-white text-lg font-medium mb-4">
                          Ready to have this for your practice?
                        </p>
                        <button
                          onClick={() => {
                            setShowAudioModal(false);
                            if (audioRef.current) {
                              audioRef.current.pause();
                              audioRef.current.currentTime = 0;
                            }
                            setTimeout(() => scrollToFinalForm(), 100);
                          }}
                          className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-lg rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/30 hover:scale-[1.02] transition-transform"
                        >
                          Start 7-Day Free Trial
                          <FaArrowRight />
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {!audioEnded && (
                    <p className="text-gray-500 text-sm text-center">
                      This is exactly how Cognia handles patient calls for 50+ dental practices
                    </p>
                  )}
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
