'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { KeyRound, ChevronRight, Plus, Minus, ArrowRight } from 'lucide-react'
import { useTheme } from 'next-themes'

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'What We Do', path: '/what-we-do', hasSubmenu: 'solutions' },
  { name: 'Industries', path: '/industries', hasSubmenu: 'industries' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
]

const solutions = [
  { name: 'AI Receptionist', path: '/products/ai-receptionist' },
  { name: 'AI Chatbot', path: '/solutions/chatbot' },
  { name: 'Business Intelligence', path: '/business-intelligence' },
  { name: 'Workflow Automation', path: '/solutions/workflow-automation' },
  { name: 'Custom AI', path: '/solutions/custom-ai' },
  { name: 'AI Audit', path: '/ai-audit' },
]

const industries = [
  { name: 'Healthcare', path: '/industries/healthcare' },
  { name: 'Legal Services', path: '/industries/legal' },
  { name: 'Hospitality', path: '/industries/hospitality' },
  { name: 'Retail', path: '/industries/retail' },
  { name: 'Automotive', path: '/industries/automotive' },
]

// Sun icon SVG matching desktop DarkModeToggle
const SunIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2" />
    <path d="M12 20v2" />
    <path d="m4.93 4.93 1.41 1.41" />
    <path d="m17.66 17.66 1.41 1.41" />
    <path d="M2 12h2" />
    <path d="M20 12h2" />
    <path d="m6.34 17.66-1.41 1.41" />
    <path d="m19.07 4.93-1.41 1.41" />
  </svg>
)

// Moon icon SVG matching desktop DarkModeToggle
const MoonIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
  </svg>
)

// Close icon (X)
const CloseIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
)

// Hamburger menu icon
const MenuIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <line x1="4" x2="20" y1="12" y2="12" />
    <line x1="4" x2="20" y1="6" y2="6" />
    <line x1="4" x2="20" y1="18" y2="18" />
  </svg>
)

const MobileNavbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [showSolutions, setShowSolutions] = useState(false)
  const [showIndustries, setShowIndustries] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()
  const { resolvedTheme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  // Default to dark to prevent flash (dark is the default theme)
  const isDark = !mounted || resolvedTheme === 'dark'

  // Glass effect settings - matching desktop navbar
  const glassOpacity = isDark ? 0.55 : 0.30
  const glassBlur = 22

  // Hide on scroll functionality - using ref to avoid re-attaching listener
  useEffect(() => {
    let lastScrollYRef = 0
    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        // Throttle scroll handling using requestAnimationFrame
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY

          if (currentScrollY <= 0 || currentScrollY < lastScrollYRef) {
            setIsVisible(true)
          } else if (currentScrollY > lastScrollYRef && currentScrollY > 100) {
            setIsVisible(false)
            setIsOpen(false)
          }

          lastScrollYRef = currentScrollY
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false)
    setShowSolutions(false)
    setShowIndustries(false)
  }, [pathname])

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const toggleTheme = () => {
    setTheme(isDark ? 'light' : 'dark')
  }

  // Shared glass style for header elements (matching desktop navbar)
  const glassStyle = {
    background: isDark
      ? `rgba(17, 24, 39, ${glassOpacity})`
      : `rgba(255, 255, 255, ${glassOpacity})`,
    backdropFilter: `blur(${glassBlur}px)`,
    WebkitBackdropFilter: `blur(${glassBlur}px)`,
    boxShadow: isDark
      ? 'inset 0 2px 4px rgba(120, 184, 255, 0.18), inset 0 1px 2px rgba(255, 255, 255, 0.12), inset 0 -2px 4px rgba(120, 184, 255, 0.1), 0 4px 12px rgba(0, 0, 0, 0.3)'
      : '0 4px 12px rgba(0, 0, 0, 0.08)',
  }

  return (
    <div className="lg:hidden mobile-navbar">
      {/* Fixed Header Bar */}
      <div
        className={`fixed top-0 left-0 right-0 z-50 px-3 py-3 transition-all duration-300 ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="flex items-center justify-between">
          {/* Left: Logo pill - always shows full logo with name */}
          <Link
            href="/"
            className={`flex items-center gap-2.5 h-14 rounded-full border shadow-lg transition-all px-5 ${
              isDark
                ? 'border-blue-500/30'
                : 'border-[#e2e8f0]'
            }`}
            style={glassStyle}
          >
            <img
              src="/cognia-c-icon.png"
              alt="Cognia AI - AI Receptionist & Voice Agents"
              width={28}
              height={28}
              className="h-7 w-7 flex-shrink-0"
              style={{
                filter: isDark
                  ? 'brightness(0) saturate(100%) invert(70%) sepia(50%) saturate(500%) hue-rotate(187deg) brightness(100%) contrast(90%)'
                  : 'brightness(0) saturate(100%) invert(37%) sepia(89%) saturate(925%) hue-rotate(187deg) brightness(91%) contrast(88%)'
              }}
            />
            <span className={`font-serif font-light text-xl tracking-tight ${isDark ? 'text-gray-100' : 'text-slate-900'}`}>
              Cognia AI
            </span>
          </Link>

          {/* Right: Pill-shaped control group - matching desktop navbar glass style */}
          <div
            className={`flex items-center rounded-full border shadow-lg transition-all ${
              isDark
                ? 'border-blue-500/30'
                : 'border-[#e2e8f0]'
            }`}
            style={glassStyle}
          >
            {/* Theme Toggle Button - with proper left padding */}
            <button
              onClick={toggleTheme}
              className="flex items-center justify-center w-12 h-14 ml-1 transition-colors text-slate-600 dark:text-gray-100 hover:text-slate-900 dark:hover:text-white"
              aria-label="Toggle theme"
            >
              <AnimatePresence mode="wait" initial={false}>
                {mounted && isDark ? (
                  <motion.div
                    key="sun"
                    initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                  >
                    <SunIcon className="w-6 h-6" />
                  </motion.div>
                ) : mounted ? (
                  <motion.div
                    key="moon"
                    initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                  >
                    <MoonIcon className="w-6 h-6" />
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </button>

            {/* Menu Toggle Button - Using btn-primary blue gradient style */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center justify-center w-12 h-12 rounded-full mr-1 transition-all text-white"
              style={{
                background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 30%, #1d4ed8 50%, #2563eb 70%, #3b82f6 100%)',
                boxShadow: '0 4px 8px rgba(30, 64, 175, 0.3), 0 2px 4px rgba(30, 64, 175, 0.2), inset 0 2px 4px rgba(147, 197, 253, 0.25), inset 0 1px 2px rgba(255, 255, 255, 0.2), inset 0 -2px 4px rgba(30, 64, 175, 0.3)',
              }}
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <CloseIcon className="w-6 h-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <MenuIcon className="w-6 h-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </div>

      {/* Blurred Background Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 backdrop-blur-lg bg-black/10 dark:bg-black/20"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Dropdown Menu Card - Using same glass style as header pills */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            className="fixed top-20 left-3 right-3 z-50 max-h-[calc(100vh-6rem)] overflow-y-auto"
          >
            {/* Using same glass style as header pills */}
            <div
              className={`rounded-[1.5rem] border shadow-2xl ${
                isDark ? 'border-blue-500/30' : 'border-[#e2e8f0]'
              }`}
              style={glassStyle}
            >
              {/* Navigation Links */}
              <div className="relative z-10 px-6 pt-8 pb-4">
                {navItems.map((item) => {
                  const isActive = pathname === item.path || (item.path !== '/' && pathname.startsWith(item.path))

                  if (item.hasSubmenu === 'solutions') {
                    return (
                      <div key={item.name}>
                        <button
                          onClick={() => setShowSolutions(!showSolutions)}
                          className="w-full flex items-center justify-between py-4 text-xl font-medium transition-colors text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-sky-300"
                        >
                          <span>{item.name}</span>
                          <AnimatePresence mode="wait" initial={false}>
                            {showSolutions ? (
                              <motion.div
                                key="minus"
                                initial={{ rotate: -90, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                                exit={{ rotate: 90, opacity: 0 }}
                                transition={{ duration: 0.15 }}
                              >
                                <Minus className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                              </motion.div>
                            ) : (
                              <motion.div
                                key="plus"
                                initial={{ rotate: 90, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                                exit={{ rotate: -90, opacity: 0 }}
                                transition={{ duration: 0.15 }}
                              >
                                <Plus className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </button>

                        <AnimatePresence>
                          {showSolutions && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden"
                            >
                              <div className={`pl-4 pb-2 border-l-2 ml-2 ${isDark ? 'border-gray-600' : 'border-gray-200'}`}>
                                {solutions.map((solution) => (
                                  <Link
                                    key={solution.name}
                                    href={solution.path}
                                    onClick={() => setIsOpen(false)}
                                    className="block py-3 text-base font-medium transition-colors text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                                  >
                                    {solution.name}
                                  </Link>
                                ))}
                                <Link
                                  href="/what-we-do"
                                  onClick={() => setIsOpen(false)}
                                  className="block py-3 text-base font-medium transition-colors text-blue-600 dark:text-sky-400 hover:text-blue-700 dark:hover:text-sky-300"
                                >
                                  View All Solutions →
                                </Link>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    )
                  }

                  if (item.hasSubmenu === 'industries') {
                    return (
                      <div key={item.name}>
                        <button
                          onClick={() => setShowIndustries(!showIndustries)}
                          className="w-full flex items-center justify-between py-4 text-xl font-medium transition-colors text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-sky-300"
                        >
                          <span>{item.name}</span>
                          <AnimatePresence mode="wait" initial={false}>
                            {showIndustries ? (
                              <motion.div
                                key="minus"
                                initial={{ rotate: -90, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                                exit={{ rotate: 90, opacity: 0 }}
                                transition={{ duration: 0.15 }}
                              >
                                <Minus className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                              </motion.div>
                            ) : (
                              <motion.div
                                key="plus"
                                initial={{ rotate: 90, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                                exit={{ rotate: -90, opacity: 0 }}
                                transition={{ duration: 0.15 }}
                              >
                                <Plus className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </button>

                        <AnimatePresence>
                          {showIndustries && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden"
                            >
                              <div className={`pl-4 pb-2 border-l-2 ml-2 ${isDark ? 'border-gray-600' : 'border-gray-200'}`}>
                                {industries.map((industry) => (
                                  <Link
                                    key={industry.name}
                                    href={industry.path}
                                    onClick={() => setIsOpen(false)}
                                    className="block py-3 text-base font-medium transition-colors text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                                  >
                                    {industry.name}
                                  </Link>
                                ))}
                                <Link
                                  href="/industries"
                                  onClick={() => setIsOpen(false)}
                                  className="block py-3 text-base font-medium transition-colors text-blue-600 dark:text-sky-400 hover:text-blue-700 dark:hover:text-sky-300"
                                >
                                  View All Industries →
                                </Link>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    )
                  }

                  return (
                    <Link
                      key={item.name}
                      href={item.path}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center justify-between py-4 text-xl font-medium transition-colors ${
                        isActive
                          ? 'text-blue-600 dark:text-sky-300'
                          : 'text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-sky-300'
                      }`}
                    >
                      <span>{item.name}</span>
                      <ChevronRight className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                    </Link>
                  )
                })}
              </div>

              {/* CTA Button - Matching hero button exactly */}
              <div className="relative z-10 px-6 pb-6">
                <Link
                  href="/demo"
                  onClick={() => setIsOpen(false)}
                  className="btn-primary flex items-center justify-center gap-2 w-full h-14 rounded-2xl text-base font-semibold !shadow-[0_4px_8px_rgba(30,64,175,0.3),0_2px_4px_rgba(30,64,175,0.2)]"
                >
                  <span>Schedule Consultation</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Sign In Link */}
              <div className={`relative z-10 px-6 py-4 border-t ${isDark ? 'border-gray-700/30' : 'border-gray-200/50'}`}>
                <Link
                  href="/sign-in"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center gap-2 py-3 text-base font-medium transition-colors text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                >
                  <KeyRound className="w-5 h-5" />
                  <span>Sign in to your account</span>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default MobileNavbar
