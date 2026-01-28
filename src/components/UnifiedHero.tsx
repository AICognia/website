'use client'

import React, { useState, useRef, useEffect, lazy, Suspense } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useThemeWithoutFlash } from '@/src/hooks/useThemeWithoutFlash'
import { ArrowRight } from 'lucide-react'

// Lazy load heavy background components
const HeroBackgroundGrid = lazy(() => import('./HeroBackgroundGrid'))
const MobileHeroBackground = lazy(() => import('./MobileHeroBackground'))

// Simple placeholder that matches background colors for instant paint - uses CSS dark: variant
const BackgroundPlaceholder = () => (
  <div
    className="absolute inset-0 transition-colors duration-300 bg-white dark:bg-gray-900"
  />
)

const UnifiedHero: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [backgroundReady, setBackgroundReady] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const audioRef = useRef<HTMLAudioElement>(null)
  const { isDark } = useThemeWithoutFlash()

  useEffect(() => {
    // Defer background loading to after initial paint
    const timer = requestAnimationFrame(() => {
      setBackgroundReady(true)
    })
    return () => cancelAnimationFrame(timer)
  }, [])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime)
    const handleEnded = () => {
      setIsPlaying(false)
      setCurrentTime(0)
    }

    audio.addEventListener('timeupdate', handleTimeUpdate)
    audio.addEventListener('ended', handleEnded)

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate)
      audio.removeEventListener('ended', handleEnded)
    }
  }, [])

  const formatTime = (time: number) => {
    const mins = Math.floor(time / 60)
    const secs = Math.floor(time % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const toggleAudio = async () => {
    if (!audioRef.current) return

    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      try {
        await audioRef.current.play()
        setIsPlaying(true)
      } catch {
        // Playback blocked by browser
      }
    }
  }

  const restartAudio = async () => {
    if (!audioRef.current) return
    audioRef.current.currentTime = 0
    setCurrentTime(0)
    try {
      await audioRef.current.play()
      setIsPlaying(true)
    } catch {
      // Playback blocked by browser
    }
  }

  const glassBlur = 10

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

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
      })

      if (response.ok) {
        setSubmitStatus('success')
        setFormData({ name: '', email: '', company: '', message: '' })
      } else {
        setSubmitStatus('error')
      }
    } catch {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Use CSS custom properties so the blocking script's class controls the look before JS hydrates
  const glassStyle = {
    borderWidth: '0.5px',
    background: 'var(--hero-glass-bg)',
    backdropFilter: `blur(${glassBlur}px)`,
    WebkitBackdropFilter: `blur(${glassBlur}px)`,
    boxShadow: 'var(--hero-glass-shadow)',
  }

  const stats = [
    { value: '60', label: 'Days to Launch' },
    { value: '3x', label: 'Faster Decisions' },
    { value: '20+', label: 'Clients Served' },
  ]

  return (
    <section
      className="lg:h-screen lg:max-h-[960px] lg:min-h-[700px] flex flex-col items-center overflow-hidden relative mb-0 pt-0 select-none transition-colors duration-300 bg-white dark:bg-gray-900"
      style={{ contain: 'layout style paint' }}
    >
      {/* Desktop Background - Hidden on mobile via CSS */}
      <div className="hidden lg:block absolute inset-0">
        {backgroundReady ? (
          <Suspense fallback={<BackgroundPlaceholder />}>
            <HeroBackgroundGrid isPlaying={isPlaying} />
          </Suspense>
        ) : (
          <BackgroundPlaceholder />
        )}
      </div>

      {/* Mobile Background - Hidden on desktop via CSS */}
      <div className="lg:hidden absolute inset-0">
        {backgroundReady ? (
          <Suspense fallback={<BackgroundPlaceholder />}>
            <MobileHeroBackground />
          </Suspense>
        ) : (
          <BackgroundPlaceholder />
        )}
      </div>

      <audio ref={audioRef} loop src="https://kd1hbax1fjerwnrt.public.blob.vercel-storage.com/Sequence%2005.mp3" />

      {/* Desktop Gradient Overlays */}
      <div className="hidden lg:block absolute inset-0 bg-gradient-to-b via-transparent pointer-events-none from-white/10 to-white dark:from-gray-900/10 dark:to-gray-900" />
      <div className="hidden lg:block absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t to-transparent pointer-events-none from-white via-white/40 dark:from-gray-900 dark:via-gray-900/40" />

      {/* Desktop Radial gradient for text readability - uses CSS var for no-flash */}
      <div
        className="hidden lg:block absolute inset-y-0 left-0 w-[65%] pointer-events-none z-[5]"
        style={{
          background: 'var(--hero-radial-desktop)',
        }}
      />

      {/* Mobile Gradient overlay - uses CSS var for no-flash */}
      <div
        className="lg:hidden absolute inset-0 pointer-events-none"
        style={{
          background: 'var(--hero-gradient-mobile)',
        }}
      />

      {/* ==================== MOBILE LAYOUT ==================== */}
      <div className="lg:hidden relative z-10 px-5 pt-24 pb-12 w-full">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-6"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-500/20 border border-blue-200 dark:border-blue-400/30">
            <div className="w-2 h-2 rounded-full bg-blue-500 dark:bg-blue-400" />
            <span className="text-xs font-semibold tracking-wide text-blue-700 dark:text-blue-300">
              AI Transformation Agency
            </span>
          </div>
        </motion.div>

        {/* Single H1 - visible on all screens with responsive styling */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.05 }}
          className="text-[1.75rem] leading-[1.2] font-serif font-light tracking-tight mb-5 text-slate-900 dark:text-white dark:drop-shadow-sm"
        >
          From AI Strategy to{' '}
          <span className="text-blue-600 dark:text-blue-400">
            Transformed Operations
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="text-base leading-relaxed mb-8 text-slate-600 dark:text-gray-300"
        >
          Find the highest-ROI AI opportunities. Then build only what pays back.
        </motion.p>

        {/* Mobile Stats */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="flex justify-between mb-8 px-2"
        >
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-2xl font-serif font-medium text-slate-900 dark:text-white">
                {stat.value}
              </div>
              <div className="text-[10px] uppercase tracking-wider font-medium mt-1 text-slate-500 dark:text-gray-400">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Mobile CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="space-y-3"
        >
          <Link
            href="/demo"
            className="btn-primary flex items-center justify-center gap-2 w-full h-14 rounded-2xl text-base font-semibold"
          >
            <span>Schedule Consultation</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            href="/what-we-do"
            className="flex items-center justify-center gap-2 w-full h-12 rounded-2xl text-sm font-medium transition-colors bg-slate-900/5 dark:bg-white/10 text-slate-700 dark:text-white border border-slate-200 dark:border-white/20 active:bg-slate-100 dark:active:bg-white/15"
          >
            <span>See What We Do</span>
          </Link>
        </motion.div>
      </div>

      {/* ==================== DESKTOP LAYOUT ==================== */}
      <div className="hidden lg:flex w-full max-w-[1200px] xl:max-w-[1320px] 2xl:max-w-[1440px] 3xl:max-w-[1584px] mx-auto px-6 lg:px-10 xl:px-12 2xl:px-16 relative z-10 flex-1 items-start pb-32 xl:pb-24" style={{ paddingTop: '10rem' }}>
        <div className="grid grid-cols-12 gap-6 lg:gap-6 xl:gap-8 2xl:gap-10 items-stretch w-full">

          {/* Left Column - Value Proposition (7 cols) */}
          <motion.div
            className="col-span-12 lg:col-span-7 relative rounded-2xl sm:rounded-[2rem] border p-5 lg:p-6 xl:p-8 h-full border-[#e2e8f0] dark:border-blue-500/30"
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
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 lg:mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-transparent dark:to-transparent dark:bg-blue-900/40 border border-blue-200/60 dark:border-blue-500/30"
                style={{
                  boxShadow: 'var(--hero-badge-shadow)',
                }}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <div className="w-2 h-2 rounded-full border-[1.5px] border-blue-500 dark:border-blue-400" />
                <span className="text-xs font-semibold tracking-wide text-blue-700 dark:text-blue-400">
                  AI Transformation Agency
                </span>
              </motion.div>

              {/* Desktop H1 - uses aria-hidden since mobile H1 is the canonical one */}
              <p className="text-3xl md:text-4xl lg:text-4xl xl:text-5xl 2xl:text-6xl 3xl:text-7xl font-serif font-light leading-[1.08] mb-4 lg:mb-6 text-slate-900 dark:text-gray-100" aria-hidden="true">
                From AI Strategy to<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-500">
                  Transformed Operations
                </span>
              </p>

              <p className="text-base lg:text-lg 2xl:text-xl max-w-xl lg:max-w-2xl mb-6 lg:mb-8 leading-relaxed text-slate-500 dark:text-gray-500">
                Find the highest-ROI AI opportunities. Then build only what pays back. Consultants advise. Engineers build. We do both.
              </p>

              {/* Stats Row */}
              <div className="flex flex-wrap items-stretch gap-3 lg:gap-4">
                {stats.map((item, i) => (
                  <motion.div
                    key={i}
                    className="flex-1 min-w-[110px] rounded-xl border px-4 py-3 border-slate-200/80 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                  >
                    <div className="text-2xl lg:text-3xl 2xl:text-4xl font-serif font-normal text-slate-800 dark:text-white">
                      {item.value}
                    </div>
                    <div className="text-[9px] 2xl:text-[10px] uppercase tracking-[0.12em] font-medium mt-1 text-slate-500 dark:text-gray-400">
                      {item.label}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Audio Demo */}
              <motion.div
                className="mt-6 lg:mt-8 rounded-xl border p-3 border-slate-200/80 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    <button
                      onClick={toggleAudio}
                      className="btn-primary w-9 h-9 rounded-lg flex items-center justify-center p-0"
                      aria-label={isPlaying ? 'Pause audio demo' : 'Play audio demo'}
                    >
                      {isPlaying ? (
                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                          <rect x="6" y="5" width="4" height="14" rx="1" />
                          <rect x="14" y="5" width="4" height="14" rx="1" />
                        </svg>
                      ) : (
                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5.14v13.72c0 .66.75 1.04 1.28.65l9.57-6.86c.46-.33.46-1 0-1.32L9.28 4.5C8.75 4.1 8 4.48 8 5.14z" />
                        </svg>
                      )}
                    </button>
                    {(isPlaying || currentTime > 0) && (
                      <button
                        onClick={restartAudio}
                        className="w-9 h-9 rounded-lg flex items-center justify-center p-0 transition-colors bg-slate-100 dark:bg-gray-700 hover:bg-slate-200 dark:hover:bg-gray-600 text-slate-500 dark:text-gray-400"
                        aria-label="Restart audio"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h5M20 20v-5h-5M4 9a9 9 0 0115.36-5.36M20 15a9 9 0 01-15.36 5.36" />
                        </svg>
                      </button>
                    )}
                  </div>

                  <div className="flex-1 flex items-center justify-center gap-[2px] h-8 px-1">
                    {Array.from({ length: 28 }).map((_, i) => {
                      const position = i / 27
                      const wave1 = Math.sin(position * Math.PI * 3) * 0.4
                      const wave2 = Math.sin(position * Math.PI * 5 + 0.5) * 0.25
                      const wave3 = Math.cos(position * Math.PI * 2) * 0.2
                      const baseHeight = 10 + (wave1 + wave2 + wave3) * 16
                      const minHeight = 5
                      const height = Math.max(minHeight, baseHeight)

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
                      )
                    })}
                  </div>

                  <span className="text-xs font-mono tabular-nums flex-shrink-0 min-w-[40px] text-right text-slate-400 dark:text-gray-500">
                    {formatTime(currentTime)}
                  </span>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right Column - Contact Form (5 cols) */}
          <motion.div
            className="col-span-12 lg:col-span-5 rounded-2xl sm:rounded-[2rem] border p-5 lg:p-6 xl:p-8 h-full pointer-events-auto border-[#e2e8f0] dark:border-gray-700 flex flex-col"
            style={glassStyle}
            initial={{ x: 20 }}
            animate={{ x: 0 }}
            transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
          >
            <motion.div
              className="flex flex-col h-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.3 }}
            >
              <h2 className="text-xl lg:text-2xl font-serif font-normal mb-1 text-slate-900 dark:text-gray-100">
                Get Started
              </h2>
              <p className="text-sm mb-6 text-slate-500 dark:text-gray-400">
                Schedule a free consultation with our team.
              </p>

              <form onSubmit={handleSubmit} className="flex flex-col flex-1 space-y-4">
                <div>
                  <label htmlFor="hero-name" className="block text-xs font-semibold mb-1.5 text-slate-700 dark:text-gray-300">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="hero-name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2.5 text-sm rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all border-slate-200 dark:border-gray-600 bg-white/80 dark:bg-gray-800/80 text-slate-900 dark:text-gray-100 placeholder-slate-400 dark:placeholder-gray-500"
                    placeholder="John Smith"
                  />
                </div>

                <div>
                  <label htmlFor="hero-email" className="block text-xs font-semibold mb-1.5 text-slate-700 dark:text-gray-300">
                    Work Email
                  </label>
                  <input
                    type="email"
                    id="hero-email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2.5 text-sm rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all border-slate-200 dark:border-gray-600 bg-white/80 dark:bg-gray-800/80 text-slate-900 dark:text-gray-100 placeholder-slate-400 dark:placeholder-gray-500"
                    placeholder="john@company.com"
                  />
                </div>

                <div>
                  <label htmlFor="hero-company" className="block text-xs font-semibold mb-1.5 text-slate-700 dark:text-gray-300">
                    Company
                  </label>
                  <input
                    type="text"
                    id="hero-company"
                    name="company"
                    required
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-3 py-2.5 text-sm rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all border-slate-200 dark:border-gray-600 bg-white/80 dark:bg-gray-800/80 text-slate-900 dark:text-gray-100 placeholder-slate-400 dark:placeholder-gray-500"
                    placeholder="Acme Corp"
                  />
                </div>

                <div className="flex-1 flex flex-col">
                  <label htmlFor="hero-message" className="block text-xs font-semibold mb-1.5 text-slate-700 dark:text-gray-300">
                    How can we help?
                  </label>
                  <textarea
                    id="hero-message"
                    name="message"
                    rows={2}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full flex-1 min-h-[60px] px-3 py-2.5 text-sm rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none border-slate-200 dark:border-gray-600 bg-white/80 dark:bg-gray-800/80 text-slate-900 dark:text-gray-100 placeholder-slate-400 dark:placeholder-gray-500"
                    placeholder="Tell us about your data challenges..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full h-11 rounded-lg text-sm disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2"
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
                        ? 'bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-500/30'
                        : 'bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-500/30'
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
  )
}

export default UnifiedHero
