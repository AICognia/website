'use client'
import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import HeroBackgroundGrid from './HeroBackgroundGrid';
import { useTheme } from 'next-themes';

const Hero: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mounted, setMounted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  // Default to dark to prevent flash (dark is the default theme)
  const isDark = !mounted || resolvedTheme === 'dark';

  const formatTime = (time: number) => {
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleAudio = async () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
      } catch {
        // Playback blocked by browser
      }
    }
  };

  const glassOpacity = isDark ? 0.30 : 0.30;
  const glassBlur = 22;

  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('https://formspree.io/f/mqarlrwl', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          _subject: `Consultation Request from ${formData.name}${formData.company ? ` at ${formData.company}` : ''}`,
          form_type: 'consultation_request',
          source: 'hero_section',
          submitted_at: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', company: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const glassStyle = {
    borderWidth: '0.5px',
    background: isDark
      ? `rgba(31, 41, 55, ${glassOpacity})`
      : `rgba(255, 255, 255, ${glassOpacity})`,
    backdropFilter: `blur(${glassBlur}px)`,
    WebkitBackdropFilter: `blur(${glassBlur}px)`,
    boxShadow: isDark
      ? 'inset 0 3px 6px rgba(120, 184, 255, 0.2), inset 0 1px 3px rgba(255, 255, 255, 0.15), inset 0 -3px 6px rgba(120, 184, 255, 0.12), inset 3px 0 6px rgba(120, 184, 255, 0.08), inset -3px 0 6px rgba(120, 184, 255, 0.08), 0 4px 12px rgba(0, 0, 0, 0.3)'
      : 'inset 0 1px 2px rgba(14, 165, 233, 0.15), inset 0 -1px 2px rgba(14, 165, 233, 0.08), inset 1px 0 2px rgba(14, 165, 233, 0.12), inset -1px 0 2px rgba(14, 165, 233, 0.05), 0 2px 4px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.03)',
  };

  return (
    <section className={`min-h-screen flex flex-col items-center overflow-hidden hidden lg:flex relative mb-0 pt-0 select-none transition-colors duration-300 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
      {/* Dynamic Background Grid */}
      <HeroBackgroundGrid isPlaying={isPlaying} />

      <audio ref={audioRef} loop src="https://kd1hbax1fjerwnrt.public.blob.vercel-storage.com/Sequence%2005.mp3" />

      {/* Large Gradient Overlay for depth & bottom fade */}
      <div className={`absolute inset-0 bg-gradient-to-b via-transparent pointer-events-none ${isDark ? 'from-gray-900/10 to-gray-900' : 'from-white/10 to-white'}`} />
      <div className={`absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t to-transparent pointer-events-none ${isDark ? 'from-gray-900 via-gray-900/40' : 'from-white via-white/40'}`} />

      {/* Radial gradient for text readability */}
      <div
        className="absolute inset-y-0 left-0 w-[65%] pointer-events-none z-[5]"
        style={{
          background: isDark
            ? 'radial-gradient(ellipse 100% 90% at 20% 50%, rgba(17,24,39,0.95) 0%, rgba(17,24,39,0.85) 30%, rgba(17,24,39,0.6) 50%, rgba(17,24,39,0.3) 70%, rgba(17,24,39,0) 90%)'
            : 'radial-gradient(ellipse 80% 60% at 25% 45%, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.35) 40%, rgba(255,255,255,0.1) 60%, rgba(255,255,255,0) 75%)',
        }}
      />

      {/* Main container - centered on all screens, slightly higher on very large displays */}
      <div className="w-full max-w-[1400px] 2xl:max-w-[1600px] 3xl:max-w-[1800px] mx-auto px-6 lg:px-12 xl:px-16 2xl:px-20 relative z-10 flex-1 flex items-center pt-16 lg:pt-20 pb-24 3xl:-mt-16">
        <div className="grid grid-cols-12 gap-6 lg:gap-6 xl:gap-8 2xl:gap-10 items-stretch w-full">

          {/* Left Column - Value Proposition (7 cols) */}
          <motion.div
            className={`col-span-12 lg:col-span-7 relative rounded-[2rem] border p-8 lg:p-10 xl:p-12 h-full ${isDark ? 'border-blue-500/30' : 'border-[#e2e8f0]'}`}
            style={glassStyle}
            initial={{ x: -20 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <motion.div
              className="h-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className={`inline-flex items-center gap-3 px-5 py-2.5 rounded-full mb-8 lg:mb-10 ${
                  isDark
                    ? 'bg-blue-900/40 border border-blue-500/30'
                    : 'bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/60'
                }`}
                style={{
                  boxShadow: isDark
                    ? 'inset 0 1px 2px rgba(120, 184, 255, 0.1), inset 0 1px 2px rgba(255, 255, 255, 0.05)'
                    : '0 2px 12px rgba(59, 130, 246, 0.1), inset 0 1px 0 rgba(255,255,255,0.8)',
                }}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <div className={`w-2.5 h-2.5 rounded-full border-2 ${isDark ? 'border-blue-400' : 'border-blue-500'}`} />
                <span className={`text-sm font-semibold tracking-wide ${isDark ? 'text-blue-400' : 'text-blue-700'}`}>
                  AI Transformation Agency
                </span>
              </motion.div>

              <h1 className={`text-4xl md:text-5xl lg:text-5xl xl:text-6xl 2xl:text-7xl 3xl:text-8xl font-serif font-light leading-[1.08] mb-6 lg:mb-8 ${isDark ? 'text-gray-100' : 'text-slate-900'}`}>
                From Data Chaos to{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-500">
                  Strategic Clarity
                </span>
              </h1>

              <p className={`text-lg lg:text-xl 2xl:text-2xl max-w-xl lg:max-w-2xl mb-8 lg:mb-10 leading-relaxed ${isDark ? 'text-gray-500' : 'text-slate-500'}`}>
                We design and deploy AI solutions that automate your workflows, empower your teams, and accelerate your business.
              </p>

              {/* Stats Row */}
              <div className="flex flex-wrap items-stretch gap-4 lg:gap-5">
                {[
                  { val: '99.9%', label: 'Uptime SLA' },
                  { val: '3x', label: 'Faster Decisions' },
                  { val: '500+', label: 'Integrations' },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    className={`flex-1 min-w-[140px] rounded-2xl border px-5 py-4 ${isDark ? 'border-gray-700 bg-gray-800/50' : 'border-slate-200/80 bg-white/50'}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                  >
                    <div className={`text-3xl lg:text-4xl 2xl:text-5xl font-serif font-normal ${isDark ? 'text-white' : 'text-slate-800'}`}>
                      {item.val}
                    </div>
                    <div className={`text-[10px] 2xl:text-xs uppercase tracking-[0.12em] font-medium mt-1 ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
                      {item.label}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Audio Demo */}
              <motion.div
                className={`mt-8 lg:mt-10 rounded-2xl border p-4 ${isDark ? 'border-gray-700 bg-gray-800/50' : 'border-slate-200/80 bg-white/50'}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <div className="flex items-center gap-4">
                  {/* Play button - matching btn-primary style */}
                  <button
                    onClick={toggleAudio}
                    className="btn-primary w-11 h-11 flex-shrink-0 rounded-xl flex items-center justify-center p-0"
                  >
                    {isPlaying ? (
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <rect x="6" y="5" width="4" height="14" rx="1" />
                        <rect x="14" y="5" width="4" height="14" rx="1" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5.14v13.72c0 .66.75 1.04 1.28.65l9.57-6.86c.46-.33.46-1 0-1.32L9.28 4.5C8.75 4.1 8 4.48 8 5.14z" />
                      </svg>
                    )}
                  </button>

                  {/* Waveform visualization - improved design */}
                  <div className="flex-1 flex items-center justify-center gap-[3px] h-10 px-1">
                    {Array.from({ length: 32 }).map((_, i) => {
                      // Create a more natural waveform pattern
                      const position = i / 31;
                      const wave1 = Math.sin(position * Math.PI * 3) * 0.4;
                      const wave2 = Math.sin(position * Math.PI * 5 + 0.5) * 0.25;
                      const wave3 = Math.cos(position * Math.PI * 2) * 0.2;
                      const baseHeight = 12 + (wave1 + wave2 + wave3) * 20;
                      const minHeight = 6;
                      const height = Math.max(minHeight, baseHeight);

                      return (
                        <motion.div
                          key={i}
                          className="w-[3px] rounded-full"
                          style={{ minWidth: '3px' }}
                          initial={false}
                          animate={{
                            height: isPlaying
                              ? [height * 0.7, height * 1.3, height * 0.85, height * 1.15, height * 0.7]
                              : height * 0.5,
                            backgroundColor: isPlaying
                              ? isDark ? '#60a5fa' : '#3b82f6'
                              : isDark ? '#4b5563' : '#cbd5e1',
                          }}
                          transition={isPlaying ? {
                            height: {
                              duration: 0.6 + (i % 4) * 0.15,
                              repeat: Infinity,
                              ease: "easeInOut",
                              delay: i * 0.03,
                            },
                            backgroundColor: { duration: 0.3, ease: "easeOut" },
                          } : {
                            height: { duration: 0.4, ease: "easeOut" },
                            backgroundColor: { duration: 0.3, ease: "easeOut" },
                          }}
                        />
                      );
                    })}
                  </div>

                  <span className={`text-xs font-mono tabular-nums flex-shrink-0 min-w-[40px] text-right ${isDark ? 'text-gray-500' : 'text-slate-400'}`}>
                    {formatTime(currentTime)}
                  </span>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right Column - Contact Form (5 cols) */}
          <motion.div
            className={`col-span-12 lg:col-span-5 rounded-[2rem] border p-8 lg:p-10 xl:p-12 h-full pointer-events-auto ${isDark ? 'border-gray-700' : 'border-[#e2e8f0]'}`}
            style={glassStyle}
            initial={{ x: 20 }}
            animate={{ x: 0 }}
            transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.3 }}
            >
              <h2 className={`text-2xl lg:text-3xl font-serif font-normal mb-2 ${isDark ? 'text-gray-100' : 'text-slate-900'}`}>
                Get Started
              </h2>
              <p className={`mb-8 ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
                Schedule a free consultation with our team.
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="name" className={`block text-sm font-semibold mb-2 ${isDark ? 'text-gray-300' : 'text-slate-700'}`}>
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${isDark ? 'border-gray-600 bg-gray-800/80 text-gray-100 placeholder-gray-500' : 'border-slate-200 bg-white/80 text-slate-900 placeholder-slate-400'}`}
                    placeholder="John Smith"
                  />
                </div>

                <div>
                  <label htmlFor="email" className={`block text-sm font-semibold mb-2 ${isDark ? 'text-gray-300' : 'text-slate-700'}`}>
                    Work Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${isDark ? 'border-gray-600 bg-gray-800/80 text-gray-100 placeholder-gray-500' : 'border-slate-200 bg-white/80 text-slate-900 placeholder-slate-400'}`}
                    placeholder="john@company.com"
                  />
                </div>

                <div>
                  <label htmlFor="company" className={`block text-sm font-semibold mb-2 ${isDark ? 'text-gray-300' : 'text-slate-700'}`}>
                    Company
                  </label>
                  <input
                    type="text"
                    id="company"
                    required
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${isDark ? 'border-gray-600 bg-gray-800/80 text-gray-100 placeholder-gray-500' : 'border-slate-200 bg-white/80 text-slate-900 placeholder-slate-400'}`}
                    placeholder="Acme Corp"
                  />
                </div>

                <div>
                  <label htmlFor="message" className={`block text-sm font-semibold mb-2 ${isDark ? 'text-gray-300' : 'text-slate-700'}`}>
                    How can we help?
                  </label>
                  <textarea
                    id="message"
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none ${isDark ? 'border-gray-600 bg-gray-800/80 text-gray-100 placeholder-gray-500' : 'border-slate-200 bg-white/80 text-slate-900 placeholder-slate-400'}`}
                    placeholder="Tell us about your data challenges..."
                  />
                </div>

                {/* btn-primary style button matching navbar */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full h-14 rounded-xl disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <span>Schedule Free Consultation</span>
                  )}
                </button>

                {submitStatus !== 'idle' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 rounded-xl text-center text-sm font-medium ${
                      submitStatus === 'success'
                        ? isDark ? 'bg-green-900/30 text-green-400 border border-green-500/30' : 'bg-green-50 text-green-700 border border-green-200'
                        : isDark ? 'bg-red-900/30 text-red-400 border border-red-500/30' : 'bg-red-50 text-red-700 border border-red-200'
                    }`}
                  >
                    {submitStatus === 'success'
                      ? 'Thank you! We\'ll be in touch soon.'
                      : 'Something went wrong. Please try again.'}
                  </motion.div>
                )}
              </form>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
