'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { FaHome, FaRedo, FaExclamationTriangle } from 'react-icons/fa'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {}, [error])

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center px-6">
      <div className="max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-8 flex justify-center">
            <div className="w-24 h-24 rounded-full bg-red-50 dark:bg-red-900/20 flex items-center justify-center">
              <FaExclamationTriangle className="text-4xl text-red-500 dark:text-red-400" />
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl font-serif font-light text-slate-900 dark:text-gray-100 mb-4">
            Something Went Wrong
          </h1>

          <p className="text-lg text-slate-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
            We encountered an unexpected error. Please try again, or contact our support team if the problem persists.
          </p>

          {error.digest && (
            <p className="text-xs text-slate-400 dark:text-gray-600 mb-6 font-mono">
              Error ID: {error.digest}
            </p>
          )}

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={reset}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all shadow-lg shadow-blue-500/25"
            >
              <FaRedo className="text-sm" />
              Try Again
            </button>
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-slate-200 dark:border-gray-700 text-slate-700 dark:text-gray-300 font-semibold rounded-xl hover:bg-slate-50 dark:hover:bg-gray-800 transition-all"
            >
              <FaHome className="text-sm" />
              Go Home
            </Link>
          </div>

          <div className="mt-8">
            <p className="text-sm text-slate-500 dark:text-gray-500">
              Need help?{' '}
              <Link href="/contact" className="text-blue-600 dark:text-blue-400 hover:underline">
                Contact Support
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
