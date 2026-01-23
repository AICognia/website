'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { FaHome, FaEnvelope, FaSearch } from 'react-icons/fa'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center px-6">
      <div className="max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative mb-8">
            <span className="text-[180px] md:text-[240px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600 leading-none select-none">
              404
            </span>
            <div className="absolute inset-0 text-[180px] md:text-[240px] font-bold text-blue-500/10 blur-2xl leading-none select-none">
              404
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl font-serif font-light text-slate-900 dark:text-gray-100 mb-4">
            Page Not Found
          </h1>

          <p className="text-lg text-slate-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
            Sorry, we couldn&apos;t find the page you&apos;re looking for. It might have been moved or no longer exists.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all shadow-lg shadow-blue-500/25"
            >
              <FaHome className="text-sm" />
              Back to Home
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-slate-200 dark:border-gray-700 text-slate-700 dark:text-gray-300 font-semibold rounded-xl hover:bg-slate-50 dark:hover:bg-gray-800 transition-all"
            >
              <FaEnvelope className="text-sm" />
              Contact Support
            </Link>
          </div>

          <div className="mt-12 pt-8 border-t border-slate-200 dark:border-gray-700">
            <p className="text-sm text-slate-500 dark:text-gray-500 mb-4">
              Looking for something specific?
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <Link href="/solutions" className="text-blue-600 dark:text-blue-400 hover:underline">
                Solutions
              </Link>
              <span className="text-slate-300 dark:text-gray-600">|</span>
              <Link href="/about" className="text-blue-600 dark:text-blue-400 hover:underline">
                About Us
              </Link>
              <span className="text-slate-300 dark:text-gray-600">|</span>
              <Link href="/demo" className="text-blue-600 dark:text-blue-400 hover:underline">
                Schedule Demo
              </Link>
              <span className="text-slate-300 dark:text-gray-600">|</span>
              <Link href="/products/ai-receptionist" className="text-blue-600 dark:text-blue-400 hover:underline">
                AI Receptionist
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
