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
  const [showAllFeatures, setShowAllFeatures] = useState(false);
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
    const isFinal = variant === 'final';

    return (
      <div className={`${isHero ? 'bg-white/[0.03] border-white/10' : 'bg-black/50 border-white/10'} border rounded-2xl ${isHero ? 'p-6 lg:p-8' : 'p-6 lg:p-8'} backdrop-blur-sm`}>
        <AnimatePresence mode="wait">
          {!isSubmitted ? (
            <motion.div
              key="form"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {isHero && (
                <div className="text-center mb-6">
                  <h3 className="text-xl lg:text-2xl font-semibold text-white mb-1">
                    Start Your Free Trial
                  </h3>
                  <p className="text-sm text-gray-400">7 days free • No credit card</p>
                </div>
              )}
              <form onSubmit={handleSubmit} className="space-y-3">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Full Name *"
                  className="w-full px-4 py-3.5 bg-black/50 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-all text-sm"
                  autoComplete="name"
                />
                <input
                  type="text"
                  name="practiceName"
                  value={formData.practiceName}
                  onChange={handleChange}
                  placeholder="Practice Name"
                  className="w-full px-4 py-3.5 bg-black/50 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-all text-sm"
                  autoComplete="organization"
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email Address *"
                  className="w-full px-4 py-3.5 bg-black/50 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-all text-sm"
                  autoComplete="email"
                />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone Number *"
                  className="w-full px-4 py-3.5 bg-black/50 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-all text-sm"
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
                      <span>Start Free Trial</span>
                      <FaArrowRight className="text-sm" />
                    </>
                  )}
                </button>

                {/* Micro-reassurance - reduces fear */}
                <p className="text-xs text-gray-500 text-center">
                  No disruption to your phone line • Patients think it's human
                </p>
              </form>

              {/* What happens next - builds trust */}
              {(isHero || isFinal) && (
                <div className="mt-6 pt-5 border-t border-white/5">
                  <p className="text-xs text-gray-600 uppercase tracking-wider mb-3">After you sign up:</p>
                  <div className="space-y-2">
                    {[
                      'We review your practice info',
                      'We connect to your PMS',
                      'You go live in ~7 days'
                    ].map((step, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-gray-500">
                        <div className="w-4 h-4 rounded-full bg-cyan-400/10 flex items-center justify-center flex-shrink-0">
                          <span className="text-[10px] text-cyan-400 font-medium">{i + 1}</span>
                        </div>
                        <span>{step}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-[11px] text-gray-600 mt-3">No obligation. Cancel anytime.</p>
                </div>
              )}
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

          {/* ==================== HERO SECTION - DOMINANT ==================== */}
          <section className="relative overflow-hidden pt-6 pb-12 lg:pt-12 lg:pb-20">
            {/* Sharper gradient - more contrast */}
            <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black" />
            <div className="absolute top-0 right-1/4 w-[500px] h-[350px] bg-cyan-500/20 blur-[120px] rounded-full" />

            <div className="relative container mx-auto px-4 sm:px-6 lg:px-16 xl:px-20 max-w-[1380px]">

              {/* DESKTOP: Split Layout */}
              <div className="hidden lg:grid lg:grid-cols-[1fr_480px] xl:grid-cols-[1fr_520px] lg:gap-12 xl:gap-16 lg:items-center lg:min-h-[calc(100vh-6rem)]">

                {/* Left Column - Messaging */}
                <div className="space-y-7 flex flex-col justify-center max-w-[560px]">
                  {/* Dentist qualifier */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                  >
                    {/* FOR DENTISTS badge - explicit qualifier */}
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-cyan-500/10 border border-cyan-500/30 rounded-full">
                      <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">
                        For Dental Practices
                      </span>
                    </div>
                  </motion.div>

                  {/* Headline */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                  >
                    <h1 className="text-5xl lg:text-6xl xl:text-[4.25rem] font-light leading-[1.08] tracking-tight">
                      Your Patients Are
                      <br />
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-cyan-300 to-blue-500 font-normal">
                        Calling Right Now
                      </span>
                    </h1>
                    <p className="text-xl text-white/60 mt-3">
                      Who's answering?
                    </p>
                  </motion.div>

                  {/* Value proposition */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.15 }}
                    className="space-y-4"
                  >
                    <p className="text-xl lg:text-2xl text-white font-medium leading-snug">
                      AI receptionist that books appointments 24/7.
                    </p>
                    <div className="flex items-center gap-5 text-sm">
                      <span className="flex items-center gap-2 text-gray-400">
                        <FaCheckCircle className="text-cyan-400 text-xs" />
                        Syncs to your PMS
                      </span>
                      <span className="flex items-center gap-2 text-gray-400">
                        <FaCheckCircle className="text-cyan-400 text-xs" />
                        English & Spanish
                      </span>
                      <span className="flex items-center gap-2 text-gray-400">
                        <FaCheckCircle className="text-cyan-400 text-xs" />
                        Sounds human
                      </span>
                    </div>
                  </motion.div>

                  {/* Audio Demo - Framed as PROOF */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                  >
                    <button
                      onClick={() => {
                        trackHearAIClick();
                        setShowAudioModal(true);
                      }}
                      className="group flex items-center gap-3 px-5 py-3 bg-white/[0.03] border border-white/10 rounded-xl hover:border-cyan-400/30 hover:bg-cyan-400/5 transition-all"
                    >
                      <div className="w-10 h-10 rounded-full bg-cyan-400/20 flex items-center justify-center group-hover:bg-cyan-400/30 transition-colors">
                        <FaPlay className="text-cyan-400 text-sm ml-0.5" />
                      </div>
                      <div className="text-left">
                        <p className="text-sm font-medium text-white group-hover:text-cyan-400 transition-colors">
                          Hear a real patient call handled by Cognia
                        </p>
                        <p className="text-xs text-gray-500">30 seconds • Actual recording</p>
                      </div>
                    </button>
                  </motion.div>

                  {/* Trust signals row */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.25 }}
                    className="flex items-center gap-4"
                  >
                    <div className="flex items-center gap-2">
                      <div className="flex -space-x-1.5">
                        {['M', 'D', 'A', 'J'].map((initial, i) => (
                          <div
                            key={i}
                            className="w-6 h-6 rounded-full bg-white/10 border border-white/20 flex items-center justify-center"
                          >
                            <span className="text-[9px] font-medium text-white/60">{initial}</span>
                          </div>
                        ))}
                      </div>
                      <span className="text-xs text-gray-500">50+ practices live</span>
                    </div>
                    <div className="w-px h-4 bg-gray-700" />
                    <div className="flex items-center gap-1.5 text-xs text-gray-500">
                      <FaShieldAlt className="text-green-500" />
                      <span>HIPAA Compliant</span>
                    </div>
                  </motion.div>
                </div>

                {/* Right Column - Form */}
                <motion.div
                  ref={formRef}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="flex flex-col justify-center w-full"
                >
                  <TrialForm variant="hero" />
                </motion.div>
              </div>

              {/* MOBILE: Tighter layout - reduce scroll depth */}
              <div className="lg:hidden space-y-6">
                {/* Badge + Headline combined */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-center space-y-4"
                >
                  {/* FOR DENTISTS badge - explicit qualifier */}
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-cyan-500/10 border border-cyan-500/30 rounded-full">
                    <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">
                      For Dental Practices
                    </span>
                  </div>

                  <h1 className="text-3xl sm:text-4xl font-light leading-[1.15]">
                    Your Patients Are
                    <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                      Calling Right Now
                    </span>
                  </h1>
                  <p className="text-sm text-gray-500 italic">
                    Who's answering?
                  </p>
                </motion.div>

                {/* Mobile Form - Primary CTA */}
                <motion.div
                  ref={formRef}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  <TrialForm variant="hero" />
                </motion.div>

                {/* Compact stats row */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="flex items-center justify-center gap-6 text-center"
                >
                  {[
                    { value: '24/7', label: 'Always On' },
                    { value: '+20%', label: 'Bookings' },
                    { value: '-66%', label: 'No-Shows' },
                  ].map((item, i) => (
                    <div key={i}>
                      <p className="text-lg font-bold text-white">{item.value}</p>
                      <p className="text-xs text-gray-600">{item.label}</p>
                    </div>
                  ))}
                </motion.div>

                {/* Audio Demo - Framed as PROOF */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.25 }}
                  className="text-center"
                >
                  <button
                    onClick={() => {
                      trackHearAIClick();
                      setShowAudioModal(true);
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-white/[0.03] border border-white/10 rounded-xl text-gray-400 hover:text-cyan-400 hover:border-cyan-400/30 transition-all"
                  >
                    <div className="w-7 h-7 rounded-full bg-cyan-400/20 flex items-center justify-center flex-shrink-0">
                      <FaPlay className="text-cyan-400 text-[10px] ml-0.5" />
                    </div>
                    <span className="text-sm">Hear a real patient call</span>
                    <span className="text-xs text-gray-600">30s</span>
                  </button>
                </motion.div>
              </div>
            </div>
          </section>

          {/* ==================== THE PROBLEM SECTION - ALARMING ==================== */}
          <section className="relative py-20 lg:py-28 overflow-hidden">
            {/* Darker, more ominous background */}
            <div className="absolute inset-0 bg-[#050505]" />
            <div className="absolute inset-0 bg-gradient-to-b from-red-950/5 via-transparent to-transparent" />

            <div className="relative container mx-auto px-4 sm:px-6 lg:px-12 max-w-5xl">
              {/* Left-aligned header for visual variety */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="lg:text-left text-center mb-12 lg:mb-16"
              >
                <h2 className="text-3xl lg:text-5xl font-light text-white mb-4 leading-tight">
                  While you're with a patient,<br className="hidden lg:block" />{' '}
                  <span className="text-red-400">your next one is calling someone else.</span>
                </h2>
              </motion.div>

              {/* Stats - Horizontal layout on desktop, feels more like data */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-12"
              >
                {[
                  { stat: '35%', label: 'of calls hit voicemail', context: 'during busy hours' },
                  { stat: '85%', label: 'never call back', context: 'they call your competitor' },
                  { stat: '$4,000+', label: 'lost per month', context: 'minimum estimate' },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
                    viewport={{ once: true }}
                    className="text-center lg:text-left"
                  >
                    <p className="text-5xl lg:text-6xl font-bold text-red-400 mb-2 tracking-tight">{item.stat}</p>
                    <p className="text-white font-medium text-base mb-1">{item.label}</p>
                    <p className="text-gray-600 text-sm">{item.context}</p>
                  </motion.div>
                ))}
              </motion.div>

              {/* The punch line */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="pt-8 border-t border-white/5"
              >
                <p className="text-xl lg:text-2xl text-gray-400 text-center lg:text-left">
                  Every missed call is a patient you'll <span className="text-white">never meet</span>.
                </p>
              </motion.div>
            </div>
          </section>

          {/* ==================== THE SOLUTION - REASSURING ==================== */}
          <section className="relative py-20 lg:py-28 overflow-hidden">
            {/* Slightly lifted background - feels like relief */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-black to-black" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-cyan-500/5 blur-[150px] rounded-full" />

            <div className="relative container mx-auto px-4 sm:px-6 lg:px-12 max-w-6xl">
              {/* Two-column layout on desktop */}
              <div className="lg:grid lg:grid-cols-2 lg:gap-16 lg:items-center">
                {/* Left: The promise */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="mb-12 lg:mb-0"
                >
                  <h2 className="text-3xl lg:text-4xl font-light text-white mb-6 leading-tight">
                    What if every call<br />
                    <span className="text-cyan-400">was answered perfectly?</span>
                  </h2>
                  <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                    Cognia answers your phone 24/7. Books appointments directly into your PMS.
                    Speaks English and Spanish fluently. Never puts a patient on hold.
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <FaShieldAlt className="text-green-500" />
                      <span>HIPAA Compliant</span>
                    </div>
                    <div className="w-px h-4 bg-gray-700" />
                    <div className="text-sm text-gray-500">
                      Live in 1 week
                    </div>
                  </div>
                </motion.div>

                {/* Right: The steps - Compact vertical list */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  viewport={{ once: true }}
                  className="space-y-4"
                >
                  {[
                    { step: '1', title: 'We learn your practice', time: 'Days 1-5' },
                    { step: '2', title: '10-minute phone setup', time: 'Day 6' },
                    { step: '3', title: 'Calls start booking', time: 'Day 7' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-4 p-4 bg-white/[0.02] border border-white/10 rounded-xl">
                      <div className="w-10 h-10 bg-cyan-400/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-lg font-bold text-cyan-400">{item.step}</span>
                      </div>
                      <div className="flex-1">
                        <p className="text-white font-medium">{item.title}</p>
                      </div>
                      <span className="text-xs text-gray-500 bg-white/5 px-2 py-1 rounded">{item.time}</span>
                    </div>
                  ))}
                </motion.div>
              </div>
            </div>
          </section>

          {/* ==================== FEATURES SECTION - WITH WOW MOMENT ==================== */}
          <section className="relative py-20 lg:py-28">
            {/* Slightly different background for rhythm */}
            <div className="absolute inset-0 bg-[#070707]" />
            <div className="relative container mx-auto px-4 sm:px-6 lg:px-12 max-w-6xl">
              {/* Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <h2 className="text-3xl lg:text-4xl font-light text-white mb-4">
                  This isn't a chatbot.<br className="lg:hidden" />
                  <span className="text-cyan-400"> It's your new receptionist.</span>
                </h2>
                <p className="text-gray-500 max-w-2xl mx-auto">
                  The one who never takes lunch, never calls in sick, and actually books appointments instead of taking messages.
                </p>
              </motion.div>

              {/* WOW MOMENT - Featured integration card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="hidden lg:block mb-12"
              >
                <div className="relative bg-gradient-to-r from-cyan-950/30 via-cyan-950/20 to-transparent border border-cyan-500/20 rounded-2xl p-8 overflow-hidden">
                  <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-cyan-500/5 to-transparent" />
                  <div className="relative flex items-center justify-between">
                    <div className="max-w-xl">
                      <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-400/10 rounded-full text-cyan-400 text-xs font-medium mb-4">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
                        </span>
                        Real-time sync
                      </div>
                      <h3 className="text-2xl font-medium text-white mb-2">
                        Appointments appear in your calendar. Instantly.
                      </h3>
                      <p className="text-gray-400">
                        OpenDental, Dentrix, Eaglesoft, Curve Dental — Cognia writes directly to your PMS.
                        No copy-paste. No double-booking. No manual entry ever.
                      </p>
                    </div>
                    <div className="flex items-center gap-6">
                      {['OpenDental', 'Dentrix', 'Eaglesoft'].map((pms, i) => (
                        <div key={i} className="text-center">
                          <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center mb-2">
                            <FaPlug className="text-xl text-white/40" />
                          </div>
                          <span className="text-xs text-gray-600">{pms}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Features list */}
              {(() => {
                const features = [
                  {
                    icon: FaCalendarAlt,
                    title: 'Smart Scheduling',
                    description: 'New patients, reschedules, cancellations. Booked directly into your calendar.'
                  },
                  {
                    icon: FaPlug,
                    title: 'Deep PMS Integration',
                    description: 'OpenDental, Dentrix, Eaglesoft, Curve. Sync instantly.'
                  },
                  {
                    icon: FaGlobe,
                    title: 'Bilingual, Naturally',
                    description: 'English and Spanish. Truly fluent.'
                  },
                  {
                    icon: FaClock,
                    title: '24/7. No Exceptions.',
                    description: 'Nights. Weekends. Holidays. Always on.'
                  },
                  {
                    icon: FaComments,
                    title: 'Intelligent Routing',
                    description: 'Emergencies routed. Non-urgent scheduled.'
                  },
                  {
                    icon: FaBell,
                    title: 'No-Show Prevention',
                    description: 'Auto confirmations. 66% fewer empty chairs.'
                  }
                ];

                // Mobile: show 3 by default, toggle to show all
                const mobileFeatures = showAllFeatures ? features : features.slice(0, 3);

                return (
                  <>
                    {/* Desktop: All 6 features */}
                    <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                      {features.map((feature, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: i * 0.05 }}
                          viewport={{ once: true }}
                          className="p-6 rounded-2xl border transition-all hover:border-cyan-400/30 bg-white/[0.02] border-white/10 text-center"
                        >
                          <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-white/5 mx-auto">
                            <feature.icon className="text-xl text-cyan-400" />
                          </div>
                          <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                          <p className="text-gray-500 text-sm leading-relaxed">{feature.description}</p>
                        </motion.div>
                      ))}
                    </div>

                    {/* Mobile: 3 features + See all toggle */}
                    <div className="md:hidden">
                      <div className="grid gap-4">
                        {mobileFeatures.map((feature, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: i * 0.05 }}
                            viewport={{ once: true }}
                            className="p-5 rounded-xl border bg-white/[0.02] border-white/10 flex items-center gap-4"
                          >
                            <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-white/5 flex-shrink-0">
                              <feature.icon className="text-lg text-cyan-400" />
                            </div>
                            <div>
                              <h3 className="text-base font-semibold text-white">{feature.title}</h3>
                              <p className="text-gray-500 text-sm">{feature.description}</p>
                            </div>
                          </motion.div>
                        ))}
                      </div>

                      {/* See all / Show less toggle */}
                      <button
                        onClick={() => setShowAllFeatures(!showAllFeatures)}
                        className="mt-5 w-full py-3 text-center text-cyan-400 text-sm font-medium border border-cyan-400/20 rounded-xl hover:bg-cyan-400/5 transition-colors flex items-center justify-center gap-2"
                      >
                        {showAllFeatures ? (
                          <>
                            Show less
                            <FaChevronUp className="text-xs" />
                          </>
                        ) : (
                          <>
                            See all 6 features
                            <FaChevronDown className="text-xs" />
                          </>
                        )}
                      </button>
                    </div>
                  </>
                );
              })()}
            </div>
          </section>

          {/* ==================== SOCIAL PROOF - PREMIUM ==================== */}
          <section className="relative py-20 lg:py-28 overflow-hidden">
            {/* Warmer background */}
            <div className="absolute inset-0 bg-[#0a0a0a]" />
            <div className="relative container mx-auto px-4 sm:px-6 lg:px-12 max-w-5xl">

              {/* Stats First - Establishes credibility */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <p className="text-gray-500 text-sm uppercase tracking-wider mb-8">Results from 50+ dental practices</p>
                <div className="flex flex-wrap justify-center gap-8 lg:gap-16">
                  {[
                    { stat: '+20%', label: 'more bookings' },
                    { stat: '-66%', label: 'fewer no-shows' },
                    { stat: '0', label: 'missed calls' },
                  ].map((item, i) => (
                    <div key={i} className="text-center">
                      <p className="text-4xl lg:text-5xl font-bold text-white mb-1">{item.stat}</p>
                      <p className="text-gray-500 text-sm">{item.label}</p>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Featured Testimonial - More premium */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <div className="relative lg:grid lg:grid-cols-5 lg:gap-8 lg:items-center">
                  {/* Quote marks - Signature visual */}
                  <div className="hidden lg:block lg:col-span-1">
                    <span className="text-[120px] font-serif text-cyan-400/20 leading-none">"</span>
                  </div>

                  {/* Testimonial content */}
                  <div className="lg:col-span-4">
                    <blockquote className="text-base lg:text-2xl text-white leading-relaxed mb-6 lg:mb-8">
                      Patients book on weekends — Cognia schedules them, <span className="text-cyan-400">no backlog</span>. Like a receptionist who never takes a day off.
                    </blockquote>

                    {/* Author - More prominent */}
                    <div className="flex items-center gap-3 lg:gap-4">
                      <div className="w-12 h-12 lg:w-14 lg:h-14 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-full flex items-center justify-center border border-cyan-400/20">
                        <span className="text-cyan-400 font-bold text-base lg:text-lg">JO</span>
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-white text-sm lg:text-base">Jacob Ojalvo</p>
                        <p className="text-gray-500 text-xs lg:text-sm">Office Manager • My Smile Miami</p>
                      </div>
                      <div className="flex items-center gap-0.5 lg:gap-1">
                        {[...Array(5)].map((_, i) => (
                          <FaStar key={i} className="text-yellow-400 text-xs lg:text-sm" />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* ==================== FAQ SECTION ==================== */}
          <section className="relative py-16 lg:py-24">
            {/* Slight lift for visual break */}
            <div className="absolute inset-0 bg-[#070707]" />
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

          {/* ==================== FINAL CTA SECTION - THE CLOSE ==================== */}
          <section className="relative py-24 lg:py-32 overflow-hidden">
            {/* Premium glow - only CTA gets the glow treatment */}
            <div className="absolute inset-0 bg-gradient-to-t from-cyan-950/30 via-black to-black" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-cyan-500/15 blur-[120px] rounded-full" />
            <div className="relative container mx-auto px-4 sm:px-6 lg:px-12 max-w-2xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center mb-10"
              >
                {/* Loss framing - re-activate the pain */}
                <p className="text-red-400/90 text-sm font-medium mb-6">
                  Every missed call today is a patient you'll never meet.
                </p>

                <h2 className="text-3xl lg:text-5xl font-light text-white mb-4 leading-tight">
                  Stop losing patients<br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-cyan-300 to-blue-500">
                    to your voicemail.
                  </span>
                </h2>
                <p className="text-gray-400 text-lg max-w-md mx-auto">
                  7-day free trial. Live in 1 week. No credit card required.
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

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-center mt-8 space-y-3"
              >
                <p className="text-sm text-gray-500">
                  $199/month after trial • Cancel anytime
                </p>
                <div className="flex items-center justify-center gap-4 text-xs text-gray-600">
                  <span className="flex items-center gap-1">
                    <FaShieldAlt className="text-green-500" />
                    HIPAA Compliant
                  </span>
                  <span>•</span>
                  <span>50+ practices live</span>
                </div>
              </motion.div>
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
                    <p className="text-white font-medium text-sm truncate">Start 7-Day Free Trial</p>
                    <p className="text-gray-400 text-xs">HIPAA compliant • No credit card</p>
                  </div>
                  <button
                    onClick={scrollToFinalForm}
                    className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl text-sm whitespace-nowrap"
                  >
                    Start Trial
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
