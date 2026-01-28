'use client'
import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import HeroBackgroundGrid from './HeroBackgroundGrid';
import { useThemeWithoutFlash } from '@/src/hooks/useThemeWithoutFlash';

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
  const audioRef = useRef<HTMLAudioElement>(null);
  const { isDark } = useThemeWithoutFlash();

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

  // Glass effect matching Contact page
  const glassOpacity = 0.30;
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

  // Glass style - uses CSS custom properties to avoid theme flash
  const glassStyle = {
    borderWidth: '0.5px',
    background: 'var(--hero-glass-bg)',
    backdropFilter: `blur(${glassBlur}px)`,
    WebkitBackdropFilter: `blur(${glassBlur}px)`,
    boxShadow: 'var(--hero-glass-shadow)',
  };

  return (
    <section className="h-screen max-h-[960px] min-h-[700px] flex flex-col items-center justify-center overflow-hidden hidden lg:flex relative mb-0 pt-0 select-none transition-colors duration-300 bg-white dark:bg-gray-900">
      {/* Dynamic Background Grid */}
      <HeroBackgroundGrid isPlaying={isPlaying} />

      <audio ref={audioRef} loop src="https://kd1hbax1fjerwnrt.public.blob.vercel-storage.com/Sequence%2005.mp3" />

      {/* Large Gradient Overlay for depth & bottom fade */}
      <div className="absolute inset-0 bg-gradient-to-b via-transparent pointer-events-none from-white/10 to-white dark:from-gray-900/10 dark:to-gray-900" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t to-transparent pointer-events-none from-white via-white/40 dark:from-gray-900 dark:via-gray-900/40" />

      {/* Radial gradient for text readability - reduced opacity to show more background */}
      <div
        className="absolute inset-y-0 left-0 w-[55%] pointer-events-none z-[5]"
        style={{
          background: 'var(--hero-radial-desktop)',
        }}
      />

      {/* Main container - compact max-width, cards don't stretch full height */}
      <div className="w-full max-w-[845px] xl:max-w-[915px] 2xl:max-w-[986px] mx-auto px-6 lg:px-8 xl:px-10 relative z-10 flex items-start pb-0" style={{ paddingTop: '10rem' }}>
        <div className="grid grid-cols-12 gap-4 lg:gap-5 items-stretch w-full">

          {/* Left Column - Value Proposition (7 cols) */}
          <motion.div
            className="col-span-12 lg:col-span-7 relative rounded-2xl sm:rounded-[2rem] border p-5 lg:p-6 border-slate-200/50 dark:border-blue-500/30"
            style={glassStyle}
            initial={{ x: -20 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full mb-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/40 dark:bg-none dark:bg-blue-900/30 dark:border-blue-500/20"
                style={{
                  boxShadow: 'var(--hero-badge-shadow)',
                }}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <div className="w-1.5 h-1.5 rounded-full border-[1.5px] border-blue-500 dark:border-blue-400" />
                <span className="text-[10px] font-semibold tracking-wide text-blue-700 dark:text-blue-400">
                  AI Transformation Agency
                </span>
              </motion.div>

              <h1 className="text-xl md:text-2xl lg:text-2xl xl:text-3xl font-serif font-light leading-[1.2] mb-3 text-slate-900 dark:text-gray-100">
                From Data Chaos to{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-500">
                  Strategic Clarity
                </span>
              </h1>

              <p className="text-xs lg:text-sm max-w-md mb-4 leading-relaxed text-slate-500 dark:text-gray-400">
                We design and deploy AI solutions that automate your workflows, empower your teams, and accelerate your business.
              </p>

              {/* Stats Row - inline compact */}
              <div className="flex items-center gap-2 mb-4">
                {[
                  { val: '99.9%', label: 'Uptime' },
                  { val: '3x', label: 'Faster' },
                  { val: '500+', label: 'Integrations' },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md border border-slate-200/50 bg-white/20 dark:border-gray-700/50 dark:bg-gray-800/20"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                  >
                    <span className="text-sm lg:text-base font-serif font-medium text-slate-800 dark:text-white">
                      {item.val}
                    </span>
                    <span className="text-[9px] uppercase tracking-wider font-medium text-slate-400 dark:text-gray-500">
                      {item.label}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* Audio Demo - slim inline */}
              <motion.div
                className="rounded-md border p-2 border-slate-200/50 bg-white/20 dark:border-gray-700/50 dark:bg-gray-800/20"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <div className="flex items-center gap-2.5">
                  {/* Play button */}
                  <button
                    onClick={toggleAudio}
                    className="btn-primary w-8 h-8 flex-shrink-0 rounded-md flex items-center justify-center p-0"
                  >
                    {isPlaying ? (
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                        <rect x="6" y="5" width="4" height="14" rx="1" />
                        <rect x="14" y="5" width="4" height="14" rx="1" />
                      </svg>
                    ) : (
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5.14v13.72c0 .66.75 1.04 1.28.65l9.57-6.86c.46-.33.46-1 0-1.32L9.28 4.5C8.75 4.1 8 4.48 8 5.14z" />
                      </svg>
                    )}
                  </button>

                  {/* Waveform visualization */}
                  <div className="flex-1 flex items-center justify-center gap-[2px] h-6">
                    {Array.from({ length: 24 }).map((_, i) => {
                      const position = i / 23;
                      const wave1 = Math.sin(position * Math.PI * 3) * 0.4;
                      const wave2 = Math.sin(position * Math.PI * 5 + 0.5) * 0.25;
                      const baseHeight = 8 + (wave1 + wave2) * 12;
                      const height = Math.max(4, baseHeight);

                      return (
                        <motion.div
                          key={i}
                          className="w-[2px] rounded-full"
                          style={{ minWidth: '2px' }}
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

                  <span className="text-[10px] font-mono tabular-nums flex-shrink-0 text-slate-400 dark:text-gray-500">
                    {formatTime(currentTime)}
                  </span>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right Column - Contact Form (5 cols) */}
          <motion.div
            className="col-span-12 lg:col-span-5 rounded-2xl sm:rounded-[2rem] border p-5 lg:p-6 pointer-events-auto border-slate-200/50 dark:border-gray-700"
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
              <h2 className="text-xl lg:text-2xl font-serif font-normal mb-1.5 text-slate-900 dark:text-gray-100">
                Get Started
              </h2>
              <p className="text-sm mb-5 text-slate-500 dark:text-gray-400">
                Schedule a free consultation with our team.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold mb-2 text-slate-700 dark:text-gray-300">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 text-base rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all border-slate-200 bg-white/80 text-slate-900 placeholder-slate-400 dark:border-gray-600 dark:bg-gray-800/80 dark:text-gray-100 dark:placeholder-gray-500"
                    placeholder="John Smith"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold mb-2 text-slate-700 dark:text-gray-300">
                    Work Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 text-base rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all border-slate-200 bg-white/80 text-slate-900 placeholder-slate-400 dark:border-gray-600 dark:bg-gray-800/80 dark:text-gray-100 dark:placeholder-gray-500"
                    placeholder="john@company.com"
                  />
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-semibold mb-2 text-slate-700 dark:text-gray-300">
                    Company
                  </label>
                  <input
                    type="text"
                    id="company"
                    required
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-4 py-3 text-base rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all border-slate-200 bg-white/80 text-slate-900 placeholder-slate-400 dark:border-gray-600 dark:bg-gray-800/80 dark:text-gray-100 dark:placeholder-gray-500"
                    placeholder="Acme Corp"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full h-12 rounded-xl disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-1"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <span>Schedule Consultation</span>
                  )}
                </button>

                {submitStatus !== 'idle' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 rounded-xl text-center text-sm font-medium ${
                      submitStatus === 'success'
                        ? 'bg-green-50 text-green-700 border border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-500/30'
                        : 'bg-red-50 text-red-700 border border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-500/30'
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
