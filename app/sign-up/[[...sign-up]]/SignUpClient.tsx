'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSignUp } from '@clerk/nextjs'
import { isClerkConfigured } from '@/src/hooks/useClerkSafe'
import { useRouter } from 'next/navigation'
import { useTheme } from 'next-themes'
import { motion } from 'framer-motion'
import { Mail, Lock, Eye, EyeOff, ArrowRight, ArrowLeft, User, Building2 } from 'lucide-react'
import HeroBackgroundGrid from '@/src/components/HeroBackgroundGrid'
import DatabaseWithRestApi from '@/src/components/ui/database-with-rest-api'

export default function SignUpClient() {
  const clerkSignUp = isClerkConfigured ? useSignUp() : { isLoaded: true, signUp: null, setActive: async () => {} }
  const { isLoaded, signUp, setActive } = clerkSignUp
  const router = useRouter()
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [company, setCompany] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [pendingVerification, setPendingVerification] = useState(false)
  const [verificationCode, setVerificationCode] = useState('')

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
    if (!isLoaded || !signUp) {
      setError('Authentication is not configured. Please contact support.')
      return
    }

    setIsLoading(true)
    setError('')

    try {
      await signUp.create({
        firstName,
        lastName,
        emailAddress: email,
        password,
      })

      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })
      setPendingVerification(true)
    } catch (err) {
      const clerkError = err as { errors?: Array<{ message?: string }> }
      setError(clerkError.errors?.[0]?.message || 'An error occurred during sign up')
    } finally {
      setIsLoading(false)
    }
  }

  const handleVerification = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isLoaded || !signUp) {
      setError('Authentication is not configured. Please contact support.')
      return
    }

    setIsLoading(true)
    setError('')

    try {
      const result = await signUp.attemptEmailAddressVerification({
        code: verificationCode,
      })

      if (result.status === 'complete') {
        await setActive({ session: result.createdSessionId })
        router.push('/')
      }
    } catch (err) {
      const clerkError = err as { errors?: Array<{ message?: string }> }
      setError(clerkError.errors?.[0]?.message || 'Invalid verification code')
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignUp = async () => {
    if (!isLoaded || !signUp) {
      setError('Authentication is not configured. Please contact support.')
      return
    }

    try {
      await signUp.authenticateWithRedirect({
        strategy: 'oauth_google',
        redirectUrl: '/sso-callback',
        redirectUrlComplete: '/',
      })
    } catch (err) {
      const clerkError = err as { errors?: Array<{ message?: string }> }
      setError(clerkError.errors?.[0]?.message || 'An error occurred with Google sign up')
    }
  }

  return (
    <div className="min-h-screen flex transition-colors duration-300 bg-gray-900 dark:bg-gray-900 light:bg-white" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="w-full lg:w-1/2 flex flex-col px-8 sm:px-12 lg:px-16 xl:px-24 py-8">
        <Link
          href="/"
          className={`inline-flex items-center gap-2 text-sm font-medium mb-8 w-fit transition-colors ${
            isDark ? 'text-gray-400 hover:text-gray-200' : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          Back to home
        </Link>

        <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full">
          <Link href="/" className="flex items-center gap-2 mb-8">
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
            <h1 className={`text-3xl font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {pendingVerification ? 'Verify your email' : 'Create your account'}
            </h1>
            <p className={`${isDark ? 'text-gray-400' : 'text-slate-600'}`}>
              {pendingVerification
                ? 'Enter the verification code sent to your email'
                : 'Start your AI journey with Cognia'}
            </p>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm"
              role="alert"
            >
              {error}
            </motion.div>
          )}

          {pendingVerification ? (
            <form onSubmit={handleVerification} className="space-y-5">
              <div>
                <label htmlFor="verification-code" className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-slate-700'}`}>
                  Verification Code
                </label>
                <div
                  className="relative rounded-xl border transition-all duration-200 focus-within:ring-2 focus-within:ring-blue-500/50"
                  style={{
                    background: isDark ? 'rgba(31, 41, 55, 0.5)' : 'rgba(248, 250, 252, 0.8)',
                    borderColor: isDark ? 'rgba(75, 85, 99, 0.5)' : 'rgba(226, 232, 240, 1)',
                  }}
                >
                  <input
                    id="verification-code"
                    type="text"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    placeholder="Enter 6-digit code"
                    required
                    autoComplete="one-time-code"
                    className={`w-full px-4 py-3.5 rounded-xl bg-transparent outline-none text-sm text-center tracking-widest font-mono ${
                      isDark ? 'text-white placeholder:text-gray-500' : 'text-slate-900 placeholder:text-slate-400'
                    }`}
                  />
                </div>
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
                    Verify Email
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => setPendingVerification(false)}
                className={`w-full text-sm font-medium ${isDark ? 'text-gray-400 hover:text-gray-300' : 'text-slate-600 hover:text-slate-800'}`}
              >
                Back to sign up
              </button>
            </form>
          ) : (
            <>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="first-name" className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-slate-700'}`}>
                      First name
                    </label>
                    <div
                      className="relative rounded-xl border transition-all duration-200 focus-within:ring-2 focus-within:ring-blue-500/50"
                      style={{
                        background: isDark ? 'rgba(31, 41, 55, 0.5)' : 'rgba(248, 250, 252, 0.8)',
                        borderColor: isDark ? 'rgba(75, 85, 99, 0.5)' : 'rgba(226, 232, 240, 1)',
                      }}
                    >
                      <div className="absolute left-4 top-1/2 -translate-y-1/2">
                        <User className={`w-5 h-5 ${isDark ? 'text-gray-500' : 'text-slate-400'}`} aria-hidden="true" />
                      </div>
                      <input
                        id="first-name"
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="John"
                        required
                        autoComplete="given-name"
                        className={`w-full pl-12 pr-4 py-3.5 rounded-xl bg-transparent outline-none text-sm ${
                          isDark ? 'text-white placeholder:text-gray-500' : 'text-slate-900 placeholder:text-slate-400'
                        }`}
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="last-name" className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-slate-700'}`}>
                      Last name
                    </label>
                    <div
                      className="relative rounded-xl border transition-all duration-200 focus-within:ring-2 focus-within:ring-blue-500/50"
                      style={{
                        background: isDark ? 'rgba(31, 41, 55, 0.5)' : 'rgba(248, 250, 252, 0.8)',
                        borderColor: isDark ? 'rgba(75, 85, 99, 0.5)' : 'rgba(226, 232, 240, 1)',
                      }}
                    >
                      <input
                        id="last-name"
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Doe"
                        required
                        autoComplete="family-name"
                        className={`w-full px-4 py-3.5 rounded-xl bg-transparent outline-none text-sm ${
                          isDark ? 'text-white placeholder:text-gray-500' : 'text-slate-900 placeholder:text-slate-400'
                        }`}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-slate-700'}`}>
                    Work email
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
                      placeholder="john@company.com"
                      required
                      autoComplete="email"
                      className={`w-full pl-12 pr-4 py-3.5 rounded-xl bg-transparent outline-none text-sm ${
                        isDark ? 'text-white placeholder:text-gray-500' : 'text-slate-900 placeholder:text-slate-400'
                      }`}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="company" className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-slate-700'}`}>
                    Company <span className={isDark ? 'text-gray-500' : 'text-slate-400'}>(optional)</span>
                  </label>
                  <div
                    className="relative rounded-xl border transition-all duration-200 focus-within:ring-2 focus-within:ring-blue-500/50"
                    style={{
                      background: isDark ? 'rgba(31, 41, 55, 0.5)' : 'rgba(248, 250, 252, 0.8)',
                      borderColor: isDark ? 'rgba(75, 85, 99, 0.5)' : 'rgba(226, 232, 240, 1)',
                    }}
                  >
                    <div className="absolute left-4 top-1/2 -translate-y-1/2">
                      <Building2 className={`w-5 h-5 ${isDark ? 'text-gray-500' : 'text-slate-400'}`} aria-hidden="true" />
                    </div>
                    <input
                      id="company"
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="Your company name"
                      autoComplete="organization"
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
                      placeholder="Create a strong password"
                      required
                      autoComplete="new-password"
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
                  <p className={`mt-2 text-xs ${isDark ? 'text-gray-500' : 'text-slate-500'}`}>
                    Must be at least 8 characters
                  </p>
                </div>

                <div className="flex items-start gap-2">
                  <input
                    id="terms"
                    type="checkbox"
                    required
                    className="mt-1 w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor="terms" className={`text-sm ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>
                    I agree to the{' '}
                    <Link href="/terms" className="text-blue-500 hover:text-blue-600 font-medium">
                      Terms of Service
                    </Link>{' '}
                    and{' '}
                    <Link href="/privacy" className="text-blue-500 hover:text-blue-600 font-medium">
                      Privacy Policy
                    </Link>
                  </label>
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
                      Create account
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
                onClick={handleGoogleSignUp}
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
                Already have an account?{' '}
                <Link href="/sign-in" className="text-blue-500 hover:text-blue-600 font-semibold">
                  Sign in
                </Link>
              </p>
            </>
          )}
        </div>
      </div>

      <div className="hidden lg:block lg:w-1/2 relative p-6 xl:p-10">
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

          <div className="absolute inset-0 flex flex-col items-center justify-center p-8 z-10">
            <DatabaseWithRestApi
              isDark={isDark}
              circleText="AI"
              title="Start your AI journey"
              badgeTexts={{
                first: "Voice",
                second: "Chat",
                third: "Data",
                fourth: "API"
              }}
              buttonTexts={{
                first: "Get Started",
                second: "Enterprise Ready"
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
