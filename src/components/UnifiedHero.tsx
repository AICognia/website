'use client'

import React, { useState, useRef, useEffect, lazy, Suspense } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useThemeWithoutFlash } from '@/src/hooks/useThemeWithoutFlash'
import { ArrowRight } from 'lucide-react'

// Lazy load heavy background components
const HeroBackgroundGrid = lazy(() => import('./HeroBackgroundGrid'))
const MobileHeroBackground = lazy(() => import('./MobileHeroBackground'))

// Simple placeholder that matches background colors for instant paint
const BackgroundPlaceholder = ({ isDark }: { isDark: boolean }) => (
  <div
    className="absolute inset-0 transition-colors duration-300"
    style={{ backgroundColor: isDark ? '#111827' : '#ffffff' }}
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
  const { isDark, mounted } = useThemeWithoutFlash()

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

  const glassOpacity = isDark ? 0.20 : 0.18
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
  }

  const stats = [
    { value: '60', label: 'Days to Transform' },
    { value: '95%', label: 'AI Projects Fail' },
    { value: '20+', label: 'Transformations' },
  ]

  return (
    <section
      className={`lg:min-h-screen flex flex-col items-center overflow-hidden relative mb-0 pt-0 select-none transition-colors duration-300 ${isDark ? 'bg-gray-900' : 'bg-white'}`}
      style={{ contain: 'layout style paint' }}
    >
      {/* Desktop Background - Hidden on mobile via CSS */}
      <div className="hidden lg:block absolute inset-0">
        {backgroundReady ? (
          <Suspense fallback={<BackgroundPlaceholder isDark={isDark} />}>
            <HeroBackgroundGrid isPlaying={isPlaying} />
          </Suspense>
        ) : (
          <BackgroundPlaceholder isDark={isDark} />
        )}
      </div>

      {/* Mobile Background - Hidden on desktop via CSS */}
      <div className="lg:hidden absolute inset-0">
        {backgroundReady ? (
          <Suspense fallback={<BackgroundPlaceholder isDark={isDark} />}>
            <MobileHeroBackground />
          </Suspense>
        ) : (
          <BackgroundPlaceholder isDark={isDark} />
        )}
      </div>

      <audio ref={audioRef} loop src="https://kd1hbax1fjerwnrt.public.blob.vercel-storage.com/Sequence%2005.mp3" />

      {/* Desktop Gradient Overlays */}
      <div className={`hidden lg:block absolute inset-0 bg-gradient-to-b via-transparent pointer-events-none ${isDark ? 'from-gray-900/10 to-gray-900' : 'from-white/10 to-white'}`} />
      <div className={`hidden lg:block absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t to-transparent pointer-events-none ${isDark ? 'from-gray-900 via-gray-900/40' : 'from-white via-white/40'}`} />

      {/* Desktop Radial gradient for text readability */}
      <div
        className="hidden lg:block absolute inset-y-0 left-0 w-[65%] pointer-events-none z-[5]"
        style={{
          background: isDark
            ? 'radial-gradient(ellipse 100% 90% at 20% 50%, rgba(17,24,39,0.95) 0%, rgba(17,24,39,0.85) 30%, rgba(17,24,39,0.6) 50%, rgba(17,24,39,0.3) 70%, rgba(17,24,39,0) 90%)'
            : 'radial-gradient(ellipse 80% 60% at 25% 45%, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.35) 40%, rgba(255,255,255,0.1) 60%, rgba(255,255,255,0) 75%)',
        }}
      />

      {/* Mobile Gradient overlay - stronger for better text readability */}
      <div
        className="lg:hidden absolute inset-0 pointer-events-none"
        style={{
          background: isDark
            ? 'linear-gradient(to bottom, rgba(17,24,39,0.9) 0%, rgba(17,24,39,0.8) 50%, rgba(17,24,39,0.6) 100%)'
            : 'linear-gradient(to bottom, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.85) 50%, rgba(255,255,255,0.6) 100%)'
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
          <div
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${
              isDark
                ? 'bg-blue-500/20 border border-blue-400/30'
                : 'bg-blue-50 border border-blue-200'
            }`}
          >
            <div className={`w-2 h-2 rounded-full ${isDark ? 'bg-blue-400' : 'bg-blue-500'}`} />
            <span className={`text-xs font-semibold tracking-wide ${isDark ? 'text-blue-300' : 'text-blue-700'}`}>
              AI Transformation Agency
            </span>
          </div>
        </motion.div>

        {/* Single H1 - visible on all screens with responsive styling */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.05 }}
          className={`text-[2rem] leading-[1.15] font-serif font-light tracking-tight mb-5 ${isDark ? 'text-white drop-shadow-sm' : 'text-slate-900'}`}
        >
          AI Strategy to<br />
          <span className={`${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
            Transformed Ops in 60 Days
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className={`text-base leading-relaxed mb-8 ${isDark ? 'text-gray-300' : 'text-slate-600'}`}
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
              <div className={`text-2xl font-serif font-medium ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {stat.value}
              </div>
              <div className={`text-[10px] uppercase tracking-wider font-medium mt-1 ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
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
            className={`flex items-center justify-center gap-2 w-full h-12 rounded-2xl text-sm font-medium transition-colors ${
              isDark
                ? 'bg-white/10 text-white border border-white/20 active:bg-white/15'
                : 'bg-slate-900/5 text-slate-700 border border-slate-200 active:bg-slate-100'
            }`}
          >
            <span>See What We Do</span>
          </Link>
        </motion.div>
      </div>

      {/* ==================== DESKTOP LAYOUT ==================== */}
      <div className="hidden lg:flex w-full max-w-[1200px] xl:max-w-[1320px] 2xl:max-w-[1440px] 3xl:max-w-[1584px] mx-auto px-6 lg:px-10 xl:px-12 2xl:px-16 relative z-10 flex-1 items-center pt-8 lg:pt-12 pb-24 -mt-8 lg:-mt-12">
        <div className="grid grid-cols-12 gap-6 lg:gap-6 xl:gap-8 2xl:gap-10 items-stretch w-full">

          {/* Left Column - Value Proposition (7 cols) */}
          <motion.div
            className={`col-span-12 lg:col-span-7 relative rounded-2xl border p-5 lg:p-6 xl:p-8 h-full ${isDark ? 'border-blue-500/30' : 'border-[#e2e8f0]'}`}
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
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 lg:mb-8 ${
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
                <div className={`w-2 h-2 rounded-full border-[1.5px] ${isDark ? 'border-blue-400' : 'border-blue-500'}`} />
                <span className={`text-xs font-semibold tracking-wide ${isDark ? 'text-blue-400' : 'text-blue-700'}`}>
                  AI Transformation Agency
                </span>
              </motion.div>

              {/* Desktop H1 - uses aria-hidden since mobile H1 is the canonical one */}
              <p className={`text-3xl md:text-4xl lg:text-4xl xl:text-5xl 2xl:text-6xl 3xl:text-7xl font-serif font-light leading-[1.08] mb-4 lg:mb-6 ${isDark ? 'text-gray-100' : 'text-slate-900'}`} aria-hidden="true">
                From AI Strategy to<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-500">
                  Transformed Operations
                </span>
              </p>

              <p className={`text-base lg:text-lg 2xl:text-xl max-w-xl lg:max-w-2xl mb-6 lg:mb-8 leading-relaxed ${isDark ? 'text-gray-500' : 'text-slate-500'}`}>
                Find the highest-ROI AI opportunities. Then build only what pays back. Consultants advise. Engineers build. We do both.
              </p>

              {/* Stats Row */}
              <div className="flex flex-wrap items-stretch gap-3 lg:gap-4">
                {stats.map((item, i) => (
                  <motion.div
                    key={i}
                    className={`flex-1 min-w-[110px] rounded-xl border px-4 py-3 ${isDark ? 'border-gray-700 bg-gray-800/50' : 'border-slate-200/80 bg-white/50'}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                  >
                    <div className={`text-2xl lg:text-3xl 2xl:text-4xl font-serif font-normal ${isDark ? 'text-white' : 'text-slate-800'}`}>
                      {item.value}
                    </div>
                    <div className={`text-[9px] 2xl:text-[10px] uppercase tracking-[0.12em] font-medium mt-1 ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
                      {item.label}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Audio Demo */}
              <motion.div
                className={`mt-6 lg:mt-8 rounded-xl border p-3 ${isDark ? 'border-gray-700 bg-gray-800/50' : 'border-slate-200/80 bg-white/50'}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <div className="flex items-center gap-3">
                  <button
                    onClick={toggleAudio}
                    className="btn-primary w-9 h-9 flex-shrink-0 rounded-lg flex items-center justify-center p-0"
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

                  <span className={`text-xs font-mono tabular-nums flex-shrink-0 min-w-[40px] text-right ${isDark ? 'text-gray-500' : 'text-slate-400'}`}>
                    {formatTime(currentTime)}
                  </span>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right Column - Contact Form (5 cols) */}
          <motion.div
            className={`col-span-12 lg:col-span-5 rounded-2xl border p-5 lg:p-6 xl:p-8 h-full pointer-events-auto ${isDark ? 'border-gray-700' : 'border-[#e2e8f0]'}`}
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
              <h2 className={`text-xl lg:text-2xl font-serif font-normal mb-1 ${isDark ? 'text-gray-100' : 'text-slate-900'}`}>
                Get Started
              </h2>
              <p className={`text-sm mb-6 ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
                Schedule a free consultation with our team.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="hero-name" className={`block text-xs font-semibold mb-1.5 ${isDark ? 'text-gray-300' : 'text-slate-700'}`}>
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="hero-name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={`w-full px-3 py-2.5 text-sm rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${isDark ? 'border-gray-600 bg-gray-800/80 text-gray-100 placeholder-gray-500' : 'border-slate-200 bg-white/80 text-slate-900 placeholder-slate-400'}`}
                    placeholder="John Smith"
                  />
                </div>

                <div>
                  <label htmlFor="hero-email" className={`block text-xs font-semibold mb-1.5 ${isDark ? 'text-gray-300' : 'text-slate-700'}`}>
                    Work Email
                  </label>
                  <input
                    type="email"
                    id="hero-email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`w-full px-3 py-2.5 text-sm rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${isDark ? 'border-gray-600 bg-gray-800/80 text-gray-100 placeholder-gray-500' : 'border-slate-200 bg-white/80 text-slate-900 placeholder-slate-400'}`}
                    placeholder="john@company.com"
                  />
                </div>

                <div>
                  <label htmlFor="hero-company" className={`block text-xs font-semibold mb-1.5 ${isDark ? 'text-gray-300' : 'text-slate-700'}`}>
                    Company
                  </label>
                  <input
                    type="text"
                    id="hero-company"
                    name="company"
                    required
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className={`w-full px-3 py-2.5 text-sm rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${isDark ? 'border-gray-600 bg-gray-800/80 text-gray-100 placeholder-gray-500' : 'border-slate-200 bg-white/80 text-slate-900 placeholder-slate-400'}`}
                    placeholder="Acme Corp"
                  />
                </div>

                <div>
                  <label htmlFor="hero-message" className={`block text-xs font-semibold mb-1.5 ${isDark ? 'text-gray-300' : 'text-slate-700'}`}>
                    How can we help?
                  </label>
                  <textarea
                    id="hero-message"
                    name="message"
                    rows={2}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className={`w-full px-3 py-2.5 text-sm rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none ${isDark ? 'border-gray-600 bg-gray-800/80 text-gray-100 placeholder-gray-500' : 'border-slate-200 bg-white/80 text-slate-900 placeholder-slate-400'}`}
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
  )
}

export default UnifiedHero
