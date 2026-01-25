'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSignIn } from '@clerk/nextjs'
import { isClerkConfigured } from '@/src/hooks/useClerkSafe'
import { useRouter } from 'next/navigation'
import { useTheme } from 'next-themes'
import { motion } from 'framer-motion'
import { Mail, Lock, Eye, EyeOff, ArrowRight, ArrowLeft } from 'lucide-react'
import { FaBrain, FaRocket, FaShieldAlt, FaChartLine } from 'react-icons/fa'
import HeroBackgroundGrid from '@/src/components/HeroBackgroundGrid'
import MobileHeroBackground from '@/src/components/MobileHeroBackground'

export default function SignInClient() {
  const clerkSignIn = isClerkConfigured ? useSignIn() : { isLoaded: true, signIn: null, setActive: async () => {} }
  const { isLoaded, signIn, setActive } = clerkSignIn
  const router = useRouter()
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    setMounted(true)
    document.body.classList.add('auth-page')
    return () => {
      document.body.classList.remove('auth-page')
    }
  }, [])

  // Default to dark to prevent flash (dark is the default theme)
  const isDark = !mounted || resolvedTheme === 'dark'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isLoaded || !signIn) {
      setError('Authentication is not configured. Please contact support.')
      return
    }

    setIsLoading(true)
    setError('')

    try {
      const result = await signIn.create({
        identifier: email,
        password,
      })

      if (result.status === 'complete') {
        await setActive({ session: result.createdSessionId })
        router.push('/')
      }
    } catch (err) {
      const clerkError = err as { errors?: Array<{ message?: string }> }
      setError(clerkError.errors?.[0]?.message || 'An error occurred during sign in')
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    if (!isLoaded || !signIn) {
      setError('Authentication is not configured. Please contact support.')
      return
    }

    try {
      await signIn.authenticateWithRedirect({
        strategy: 'oauth_google',
        redirectUrl: '/sso-callback',
        redirectUrlComplete: '/',
      })
    } catch (err) {
      const clerkError = err as { errors?: Array<{ message?: string }> }
      setError(clerkError.errors?.[0]?.message || 'An error occurred with Google sign in')
    }
  }

  return (
    <div className="min-h-screen flex transition-colors duration-300 bg-gray-900 dark:bg-gray-900 light:bg-white" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="w-full lg:w-1/2 flex flex-col px-8 sm:px-12 lg:px-16 xl:px-24 py-8">
        <Link
          href="/"
          className={`hidden md:inline-flex items-center gap-2 text-sm font-medium mb-8 w-fit transition-colors ${
            isDark ? 'text-gray-400 hover:text-gray-200' : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          Back to home
        </Link>

        <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full">
          <Link href="/" className="hidden md:flex items-center gap-2 mb-8">
            <img
              src="/cognia-c-icon.png"
              alt="Cognia AI Logo"
              width={32}
              height={32}
              className="h-8 w-auto"
              style={{
                filter: isDark
                  ? 'brightness(0) saturate(100%) invert(70%) sepia(50%) saturate(500%) hue-rotate(187deg) brightness(100%) contrast(90%)'
                  : 'brightness(0) saturate(100%) invert(37%) sepia(89%) saturate(925%) hue-rotate(187deg) brightness(91%) contrast(88%)'
              }}
            />
            <span className={`font-bold text-xl ${isDark ? 'text-gray-100' : 'text-slate-900'}`}>
              Cognia
            </span>
          </Link>

          <div className="mb-8">
            <h1 className={`text-3xl font-serif font-normal mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Welcome back
            </h1>
            <p className={`${isDark ? 'text-gray-400' : 'text-slate-600'}`}>
              Sign in to your account to continue
            </p>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm"
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-slate-700'}`}>
                Email address
              </label>
              <div
                className="relative rounded-xl border transition-all duration-200 focus-within:ring-2 focus-within:ring-blue-500/50"
                style={{
                  background: isDark ? 'rgba(31, 41, 55, 0.5)' : 'rgba(248, 250, 252, 0.8)',
                  borderColor: isDark ? 'rgba(75, 85, 99, 0.5)' : 'rgba(226, 232, 240, 1)',
                }}
              >
                <div className="absolute left-4 top-1/2 -translate-y-1/2">
                  <Mail className={`w-5 h-5 ${isDark ? 'text-gray-500' : 'text-slate-400'}`} aria-hidden="true" />
                </div>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  autoComplete="email"
                  className={`w-full pl-12 pr-4 py-3.5 rounded-xl bg-transparent outline-none text-sm ${
                    isDark ? 'text-white placeholder:text-gray-500' : 'text-slate-900 placeholder:text-slate-400'
                  }`}
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-slate-700'}`}>
                Password
              </label>
              <div
                className="relative rounded-xl border transition-all duration-200 focus-within:ring-2 focus-within:ring-blue-500/50"
                style={{
                  background: isDark ? 'rgba(31, 41, 55, 0.5)' : 'rgba(248, 250, 252, 0.8)',
                  borderColor: isDark ? 'rgba(75, 85, 99, 0.5)' : 'rgba(226, 232, 240, 1)',
                }}
              >
                <div className="absolute left-4 top-1/2 -translate-y-1/2">
                  <Lock className={`w-5 h-5 ${isDark ? 'text-gray-500' : 'text-slate-400'}`} aria-hidden="true" />
                </div>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  autoComplete="current-password"
                  className={`w-full pl-12 pr-12 py-3.5 rounded-xl bg-transparent outline-none text-sm ${
                    isDark ? 'text-white placeholder:text-gray-500' : 'text-slate-900 placeholder:text-slate-400'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <EyeOff className={`w-5 h-5 ${isDark ? 'text-gray-500' : 'text-slate-400'}`} aria-hidden="true" />
                  ) : (
                    <Eye className={`w-5 h-5 ${isDark ? 'text-gray-500' : 'text-slate-400'}`} aria-hidden="true" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="relative flex items-center justify-center">
                  <input
                    type="checkbox"
                    className={`
                      appearance-none w-5 h-5 rounded-md border-2 transition-all duration-200 cursor-pointer
                      checked:bg-blue-500 checked:border-blue-500
                      focus-visible:ring-2 focus-visible:ring-blue-500/50 focus-visible:ring-offset-2
                      ${isDark
                        ? 'border-gray-600 bg-gray-800/50 focus-visible:ring-offset-gray-900'
                        : 'border-slate-300 bg-white focus-visible:ring-offset-white'
                      }
                    `}
                  />
                  <svg
                    className="absolute w-3 h-3 text-white pointer-events-none opacity-0 [input:checked+&]:opacity-100 transition-opacity duration-200"
                    viewBox="0 0 12 12"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M2 6l3 3 5-6" />
                  </svg>
                </div>
                <span className={`text-sm select-none ${isDark ? 'text-gray-400 group-hover:text-gray-300' : 'text-slate-600 group-hover:text-slate-700'} transition-colors`}>
                  Remember me
                </span>
              </label>
              <Link
                href="/forgot-password"
                className="text-sm text-blue-500 hover:text-blue-600 font-medium"
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary w-full h-12 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Sign in
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </>
              )}
            </button>
          </form>

          <div className="relative my-8">
            <div className={`absolute inset-0 flex items-center`}>
              <div className={`w-full border-t ${isDark ? 'border-gray-700' : 'border-slate-200'}`} />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className={`px-4 ${isDark ? 'bg-gray-900 text-gray-500' : 'bg-white text-slate-500'}`}>
                Or continue with
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleGoogleSignIn}
            className={`w-full h-12 rounded-xl border flex items-center justify-center gap-3 font-medium text-sm transition-all duration-200 hover:shadow-md ${
              isDark
                ? 'bg-gray-800 border-gray-700 text-gray-200 hover:bg-gray-750'
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" aria-hidden="true">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Continue with Google
          </button>

          <p className={`mt-8 text-center text-sm ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>
            Don't have an account?{' '}
            <Link href="/sign-up" className="text-blue-500 hover:text-blue-600 font-semibold">
              Create one
            </Link>
          </p>
        </div>
      </div>

      <div className="hidden lg:flex lg:w-1/2 relative p-6 xl:p-10 items-center justify-center">
        <div
          className="relative w-full h-full rounded-[2rem] overflow-hidden border"
          style={{
            borderColor: isDark ? 'rgba(59, 130, 246, 0.3)' : 'rgba(226, 232, 240, 1)',
            boxShadow: isDark
              ? 'inset 0 2px 4px rgba(120, 184, 255, 0.18), inset 0 1px 2px rgba(255, 255, 255, 0.12), inset 0 -2px 4px rgba(120, 184, 255, 0.1), 0 4px 24px rgba(0, 0, 0, 0.4)'
              : '0 4px 24px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.9)',
          }}
        >
          <HeroBackgroundGrid isPlaying={false} />

          <div className="absolute inset-0 flex items-center justify-center p-8 z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="w-full max-w-sm rounded-2xl border p-6"
              style={{
                borderColor: isDark ? 'rgba(59, 130, 246, 0.3)' : 'rgba(226, 232, 240, 1)',
                background: isDark
                  ? 'rgba(31, 41, 55, 0.7)'
                  : 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                boxShadow: isDark
                  ? 'inset 0 2px 4px rgba(120, 184, 255, 0.12), inset 0 1px 2px rgba(255, 255, 255, 0.08), 0 8px 32px rgba(0, 0, 0, 0.3)'
                  : '0 8px 32px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.9)',
              }}
            >
              <h2 className={`text-xl font-serif font-normal mb-2 ${isDark ? 'text-gray-100' : 'text-slate-900'}`}>
                Our Approach
              </h2>

              <p className={`text-xs mb-5 leading-relaxed ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>
                Deep industry expertise meets cutting-edge AI.
              </p>

              <div className="relative">
                <div className={`absolute left-[15px] top-3 bottom-3 w-0.5 ${isDark ? 'bg-gradient-to-b from-blue-500 via-blue-400 to-blue-300' : 'bg-gradient-to-b from-blue-500 via-blue-400 to-blue-200'}`} />

                <div className="space-y-4">
                  {[
                    { num: '01', title: 'Discover', desc: 'Identify high-impact AI opportunities', icon: FaBrain },
                    { num: '02', title: 'Design', desc: 'Architect custom solutions', icon: FaRocket },
                    { num: '03', title: 'Deploy', desc: 'Implement with measurable KPIs', icon: FaShieldAlt },
                    { num: '04', title: 'Evolve', desc: 'Optimize and scale continuously', icon: FaChartLine }
                  ].map((step, index) => {
                    const Icon = step.icon
                    return (
                      <motion.div
                        key={index}
                        className="flex items-start gap-3 relative"
                        initial={{ opacity: 0, x: 15 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 + index * 0.08 }}
                      >
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 relative z-10 ${isDark ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30' : 'bg-blue-500 text-white shadow-md shadow-blue-500/25'}`}>
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-0.5">
                            <span className={`text-[10px] font-bold tracking-wider ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
                              {step.num}
                            </span>
                            <h3 className={`text-sm font-semibold ${isDark ? 'text-gray-100' : 'text-slate-900'}`}>
                              {step.title}
                            </h3>
                          </div>
                          <p className={`text-[11px] leading-relaxed ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
                            {step.desc}
                          </p>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              </div>

              <motion.div
                className="mt-5 pt-4 border-t"
                style={{ borderColor: isDark ? 'rgba(75, 85, 99, 0.4)' : 'rgba(203, 213, 225, 0.6)' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <Link
                  href="/about"
                  className={`inline-flex items-center gap-1.5 text-xs font-semibold ${isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'} transition-colors`}
                >
                  <span>Learn more about us</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
