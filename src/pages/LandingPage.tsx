import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import {
  FaPhone,
  FaArrowRight,
  FaCheckCircle,
  FaSpinner,
  FaPhoneSlash,
  FaDollarSign,
  FaStar,
  FaQuoteLeft,
  FaPlay,
  FaPause
} from 'react-icons/fa';
import conversionTracker from '../utils/conversionTracking';

const rotatingWords = ['deals', 'patients', 'jobs', 'clients', 'customers'];

// Pain points - condensed
const painPoints = [
  { icon: FaPhoneSlash, stat: '62%', label: 'calls go unanswered' },
  { icon: FaDollarSign, stat: '$1,200', label: 'lost per missed call' },
];

// Single powerful testimonial
const testimonial = {
  quote: "Cognia completely transformed our Monday mornings. Before, I spent 45 minutes going through voicemails. Now we get clear email summaries and patients get scheduled automatically.",
  author: "Jacob Ojalvo",
  role: "My Smile Miami",
  rating: 5,
};

// Simple 3-step process
const steps = [
  { number: '1', title: 'Quick Setup Call', description: '15-min consultation' },
  { number: '2', title: 'We Configure AI', description: 'Trained on your business' },
  { number: '3', title: 'Go Live in 1 Week', description: '24/7 call handling' },
];

const LandingPage: React.FC = () => {
  const [wordIndex, setWordIndex] = useState(0);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  // Audio state
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | undefined>(undefined);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  // Meta Pixel tracking on mount
  useEffect(() => {
    // Track landing page view
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'PageView');
      (window as any).fbq('trackCustom', 'LandingPageView');
    }
  }, []);

  // Rotate words
  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  // Audio visualization
  const handleAudioClick = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      try {
        if (!audioContextRef.current) {
          const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
          const analyser = audioContext.createAnalyser();
          analyser.fftSize = 512;
          analyser.smoothingTimeConstant = 0.7;
          const source = audioContext.createMediaElementSource(audio);
          source.connect(analyser);
          analyser.connect(audioContext.destination);
          audioContextRef.current = audioContext;
          analyserRef.current = analyser;
        }
        if (audioContextRef.current?.state === 'suspended') {
          await audioContextRef.current.resume();
        }
        await audio.play();
        setIsPlaying(true);
        conversionTracker.trackButtonClick('Audio Demo Played', 'landing_page');
      } catch (error) {
        console.error('Audio playback failed:', error);
      }
    }
  };

  // Canvas animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const bars = 40;
    const bufferLength = analyserRef.current?.frequencyBinCount || 128;
    const dataArray = new Uint8Array(bufferLength);

    const draw = () => {
      animationRef.current = requestAnimationFrame(draw);
      if (analyserRef.current && isPlaying) {
        analyserRef.current.getByteFrequencyData(dataArray);
      }
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const centerY = canvas.height / 2;
      const barWidth = canvas.width / bars;

      for (let i = 0; i < bars; i++) {
        const time = Date.now() / 1000;
        let barHeight;
        if (analyserRef.current && isPlaying) {
          const halfBars = bars / 2;
          const mirrorIndex = i < halfBars ? i : (bars - 1 - i);
          const dataIndex = Math.floor(mirrorIndex * (50 / halfBars));
          const rawFrequency = dataArray[dataIndex];
          const normalizedValue = rawFrequency / 255;
          const scaledValue = Math.pow(normalizedValue, 0.9);
          barHeight = scaledValue * (canvas.height * 0.4);
        } else {
          const wave = Math.sin(i * 0.1 + time * 2) * 0.3 + 0.3;
          barHeight = wave * (canvas.height / 4) + 8;
        }
        const x = i * barWidth;
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(x, centerY - barHeight, barWidth - 1, barHeight);
        ctx.fillRect(x, centerY, barWidth - 1, barHeight);
      }
    };
    draw();
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [isPlaying]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          _subject: `LP Lead: ${formData.name}`,
          form_type: 'landing_page_lead',
          source: 'meta_ads_lp',
          submitted_at: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        // Track conversion
        conversionTracker.trackDemoBooking('landing_page');
        if (typeof window !== 'undefined' && (window as any).fbq) {
          (window as any).fbq('track', 'Lead');
        }
        setIsSubmitted(true);
        setTimeout(() => {
          window.open('https://calendly.com/emrebenian-cogniaai/30min', '_blank');
        }, 1000);
      } else {
        setError('Something went wrong. Please try again.');
      }
    } catch {
      setError('Connection error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>AI Receptionist - Never Miss a Call | Cognia</title>
        <meta name="description" content="AI handles every call 24/7. You close more deals. 10-20% more revenue. 76% less cost. Start your free trial." />
        <meta name="robots" content="noindex" />
      </Helmet>

      {/* Hidden audio */}
      <audio ref={audioRef} loop crossOrigin="anonymous" preload="auto">
        <source src="https://kd1hbax1fjerwnrt.public.blob.vercel-storage.com/Sequence%2005.mp3" type="audio/mpeg" />
      </audio>

      <div className="min-h-screen bg-black text-white">
        {/* Hero Section */}
        <section className="relative min-h-[100dvh] flex flex-col">
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-b from-cyan-950/20 via-black to-black" />

          <div className="relative z-10 flex-1 flex flex-col justify-center px-6 py-12 lg:py-16">
            <div className="max-w-6xl mx-auto w-full">
              <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                {/* Left - Content */}
                <div className="text-center lg:text-left">
                  {/* Headline */}
                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl sm:text-5xl lg:text-6xl font-light mb-4 leading-tight"
                  >
                    Your AI
                    <br />
                    <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                      Receptionist
                    </span>
                  </motion.h1>

                  {/* Subheadline */}
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="text-lg text-gray-400 mb-6"
                  >
                    Never miss a call. Close more{' '}
                    <span className="relative inline-block h-7 align-bottom overflow-hidden" style={{ minWidth: '5.5rem' }}>
                      <AnimatePresence mode="wait">
                        <motion.span
                          key={wordIndex}
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={{ y: -20, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="absolute left-0 text-cyan-400 font-medium"
                        >
                          {rotatingWords[wordIndex]}.
                        </motion.span>
                      </AnimatePresence>
                    </span>
                    <span className="block mt-2 text-white font-medium">
                      10-20% more revenue. 76% less cost.
                    </span>
                  </motion.p>

                  {/* Audio Demo - Desktop */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.15 }}
                    className="hidden lg:block mb-8"
                  >
                    <p className="text-xs text-gray-500 mb-3 uppercase tracking-wider">Hear our AI in action</p>
                    <div
                      onClick={handleAudioClick}
                      className="relative cursor-pointer inline-flex items-center justify-center"
                    >
                      <div
                        className="absolute w-48 h-48 rounded-full blur-3xl opacity-20"
                        style={{ background: 'radial-gradient(circle, rgba(96, 165, 250, 0.5) 0%, transparent 70%)' }}
                      />
                      <canvas ref={canvasRef} width={200} height={60} className="relative z-10" style={{ filter: 'drop-shadow(0 0 15px rgba(255,255,255,0.4))' }} />
                      <div className="absolute inset-0 flex items-center justify-center z-20">
                        <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/30 flex items-center justify-center hover:bg-white/20 transition-all">
                          {isPlaying ? <FaPause className="text-white text-sm" /> : <FaPlay className="text-white text-sm ml-0.5" />}
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Stats - Desktop */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="hidden lg:flex gap-8"
                  >
                    {[
                      { value: '24/7', label: 'Available' },
                      { value: '0.5s', label: 'Response' },
                      { value: '95%', label: 'Satisfaction' },
                    ].map((stat, i) => (
                      <div key={i} className="text-center">
                        <div className="text-2xl font-bold text-cyan-400">{stat.value}</div>
                        <div className="text-xs text-gray-500 uppercase tracking-wider">{stat.label}</div>
                      </div>
                    ))}
                  </motion.div>
                </div>

                {/* Right - Form */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 lg:p-8">
                    <AnimatePresence mode="wait">
                      {!isSubmitted ? (
                        <motion.div key="form" exit={{ opacity: 0 }}>
                          <h2 className="text-xl font-medium text-white mb-1">Start Your Free Trial</h2>
                          <p className="text-sm text-gray-500 mb-6">No credit card required. Live in 1 week.</p>

                          <form onSubmit={handleSubmit} className="space-y-4">
                            <input
                              type="text"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              placeholder="Your name"
                              className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 transition-all"
                              autoComplete="name"
                            />
                            <input
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              placeholder="Work email"
                              className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 transition-all"
                              autoComplete="email"
                            />
                            <input
                              type="tel"
                              name="phone"
                              value={formData.phone}
                              onChange={handleChange}
                              placeholder="Phone (optional)"
                              className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 transition-all"
                              autoComplete="tel"
                            />

                            {error && <p className="text-red-400 text-sm">{error}</p>}

                            <button
                              type="submit"
                              disabled={isSubmitting}
                              className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-semibold rounded-xl transition-all shadow-lg shadow-cyan-500/25 disabled:opacity-50 flex items-center justify-center gap-2"
                            >
                              {isSubmitting ? (
                                <><FaSpinner className="animate-spin" /> Submitting...</>
                              ) : (
                                <>Get Started <FaArrowRight className="text-sm" /></>
                              )}
                            </button>
                          </form>

                          <div className="flex items-center justify-center gap-4 mt-4 text-[11px] text-gray-500">
                            <span className="flex items-center gap-1">
                              <FaCheckCircle className="text-green-400 text-[10px]" />
                              1 Week Free
                            </span>
                            <span className="flex items-center gap-1">
                              <FaCheckCircle className="text-green-400 text-[10px]" />
                              HIPAA Compliant
                            </span>
                          </div>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="success"
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="py-8 text-center"
                        >
                          <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                            <FaCheckCircle className="text-3xl text-green-500" />
                          </div>
                          <h3 className="text-xl font-medium text-white mb-2">You're all set!</h3>
                          <p className="text-gray-400 text-sm mb-4">Opening calendar to book your demo...</p>
                          <a
                            href="https://calendly.com/emrebenian-cogniaai/30min"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 text-sm"
                          >
                            Open Calendly <FaArrowRight className="text-xs" />
                          </a>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Mobile: Talk to AI CTA */}
                  <a
                    href="tel:+16163263328"
                    onClick={() => conversionTracker.trackPhoneCall('+16163263328')}
                    className="lg:hidden block mt-4 w-full"
                  >
                    <div className="border border-white/20 text-white py-4 rounded-xl flex items-center justify-center gap-2 font-medium">
                      <FaPhone className="text-sm" />
                      <span>Talk to AI Now</span>
                    </div>
                  </a>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Pain Points - Ultra Compact */}
        <section className="py-12 lg:py-16 border-t border-white/5">
          <div className="max-w-4xl mx-auto px-6">
            <div className="grid grid-cols-2 gap-6">
              {painPoints.map((point, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center p-6 bg-red-500/5 border border-red-500/10 rounded-2xl"
                >
                  <point.icon className="text-2xl text-red-400 mx-auto mb-3" />
                  <div className="text-3xl font-bold text-white mb-1">{point.stat}</div>
                  <div className="text-sm text-red-400">{point.label}</div>
                </motion.div>
              ))}
            </div>
            <p className="text-center text-gray-500 mt-6 text-sm">
              <span className="text-white font-medium">You don't have a phone problem.</span> You have a capacity problem. AI solves it.
            </p>
          </div>
        </section>

        {/* Single Testimonial */}
        <section className="py-12 lg:py-16 border-t border-white/5">
          <div className="max-w-3xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative bg-gradient-to-b from-white/5 to-transparent border border-white/10 rounded-2xl p-8"
            >
              <FaQuoteLeft className="text-cyan-500/30 text-2xl mb-4" />
              <p className="text-gray-300 text-lg leading-relaxed mb-6">"{testimonial.quote}"</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">JO</span>
                </div>
                <div>
                  <div className="flex gap-1 mb-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <FaStar key={i} className="text-yellow-400 text-xs" />
                    ))}
                  </div>
                  <div className="font-medium text-white">{testimonial.author}</div>
                  <div className="text-xs text-gray-500">{testimonial.role}</div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* How It Works - 3 Steps */}
        <section className="py-12 lg:py-16 border-t border-white/5">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-2xl lg:text-3xl font-light text-white text-center mb-10">
              Live in <span className="text-cyan-400">1 Week</span>
            </h2>
            <div className="grid grid-cols-3 gap-4 lg:gap-8">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-cyan-500/20 to-blue-500/10 border border-cyan-500/40 rounded-full flex items-center justify-center shadow-lg shadow-cyan-500/10">
                    <span className="text-sm font-bold text-cyan-400">{step.number}</span>
                  </div>
                  <h3 className="text-sm lg:text-base font-medium text-white mb-1">{step.title}</h3>
                  <p className="text-xs text-gray-500">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 lg:py-20 border-t border-white/5 bg-gradient-to-b from-cyan-950/10 to-black">
          <div className="max-w-2xl mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl lg:text-4xl font-light text-white mb-4">
                Stop Losing Calls.
                <span className="block bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  Start Closing More.
                </span>
              </h2>
              <p className="text-gray-400 mb-8">
                Join 50+ businesses that never miss a call.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-stretch">
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-semibold rounded-xl transition-all shadow-lg shadow-cyan-500/25"
                >
                  Start Your Free Trial
                  <FaArrowRight className="text-sm" />
                </a>
                <a
                  href="tel:+16163263328"
                  onClick={() => conversionTracker.trackPhoneCall('+16163263328')}
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 border border-white/20 hover:bg-white/5 text-white font-medium rounded-xl transition-colors"
                >
                  <FaPhone className="text-sm" />
                  Talk to AI
                </a>
              </div>

              <div className="flex flex-wrap justify-center gap-6 mt-8 text-xs text-gray-500">
                <span className="flex items-center gap-2">
                  <FaCheckCircle className="text-green-400" />
                  1 Week Free Trial
                </span>
                <span className="flex items-center gap-2">
                  <FaCheckCircle className="text-green-400" />
                  No Credit Card
                </span>
                <span className="flex items-center gap-2">
                  <FaCheckCircle className="text-green-400" />
                  HIPAA Compliant
                </span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Sticky Mobile CTA */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 p-4 bg-black/90 backdrop-blur-lg border-t border-white/10">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="block w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-xl text-center shadow-lg shadow-cyan-500/25"
          >
            Start Free Trial
          </a>
        </div>

        {/* Bottom padding for sticky CTA on mobile */}
        <div className="lg:hidden h-24" />
      </div>
    </>
  );
};

export default LandingPage;
