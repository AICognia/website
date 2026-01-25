'use client'

import React, { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { FaArrowRight, FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { useTheme } from 'next-themes'

const industries = [
  { name: 'Healthcare', image: '/images/industries/healthcare.webp', href: '/industries/healthcare' },
  { name: 'Manufacturing', image: '/images/industries/manufacturing.webp', href: '/industries/manufacturing' },
  { name: 'Financial Services', image: '/images/industries/financial_services.webp', href: '/industries/financial-services' },
  { name: 'Technology', image: '/images/industries/technology.webp', href: '/industries/technology' },
  { name: 'Retail', image: '/images/industries/retail.webp', href: '/industries/retail' },
  { name: 'Automotive', image: '/images/industries/autorepair.webp', href: '/industries/automotive' },
  { name: 'Home Services', image: '/images/industries/home_services.webp', href: '/industries/HomeServices' },
  { name: 'Construction', image: '/images/industries/construction.webp', href: '/industries/construction' },
  { name: 'Energy', image: '/images/industries/energy.webp', href: '/industries/energy' },
  { name: 'Public Sector', image: '/images/industries/public_sector.webp', href: '/industries/public-sector' },
  { name: 'Real Estate', image: '/images/industries/real_estate.webp', href: '/industries/real-estate' },
  { name: 'Hospitality', image: '/images/industries/hospitality.webp', href: '/industries/hospitality' },
  { name: 'Legal', image: '/images/industries/legal.webp', href: '/industries/legal' },
  { name: 'Professional Services', image: '/images/industries/professional_services.webp', href: '/industries/service-businesses' },
]

const MobileIndustriesCarousel: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  // Default to dark to prevent flash (dark is the default theme)
  const isDark = !mounted || resolvedTheme === 'dark'

  const updateScrollState = () => {
    if (!scrollRef.current) return
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
    setCanScrollLeft(scrollLeft > 10)
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)

    // Calculate active index based on scroll position
    const cardWidth = 260 + 12 // card width + gap
    const newIndex = Math.round(scrollLeft / cardWidth)
    setActiveIndex(Math.min(newIndex, industries.length - 1))
  }

  useEffect(() => {
    const container = scrollRef.current
    if (!container) return
    container.addEventListener('scroll', updateScrollState, { passive: true })
    updateScrollState()
    return () => container.removeEventListener('scroll', updateScrollState)
  }, [])

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return
    const cardWidth = 260 + 12
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -cardWidth : cardWidth,
      behavior: 'smooth'
    })
  }

  return (
    <section className="lg:hidden py-10 overflow-hidden transition-colors duration-300 bg-gray-900 dark:bg-gray-900 light:bg-white" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="container-responsive">
      <div className="mb-6 flex items-end justify-between">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`text-2xl font-serif font-normal ${isDark ? 'text-gray-100' : 'text-slate-900'}`}
        >
          Industries We Serve
        </motion.h2>

        {/* Navigation Buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all active:scale-95 ${
              canScrollLeft
                ? isDark
                  ? 'border-gray-700 text-gray-300 bg-gray-800'
                  : 'border-gray-200 text-slate-600 bg-white'
                : 'opacity-40'
            }`}
          >
            <FaChevronLeft className="w-3 h-3" />
          </button>
          <button
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all active:scale-95 ${
              canScrollRight
                ? isDark
                  ? 'border-gray-700 text-gray-300 bg-gray-800'
                  : 'border-gray-200 text-slate-600 bg-white'
                : 'opacity-40'
            }`}
          >
            <FaChevronRight className="w-3 h-3" />
          </button>
        </div>
      </div>
      </div>

      {/* Carousel - full width for edge-to-edge scrolling */}
      <div
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto scrollbar-hide px-6 sm:px-8 pb-4 snap-x snap-mandatory"
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        {industries.map((industry, index) => (
          <Link
            key={industry.name}
            href={industry.href}
            className="flex-shrink-0 w-[260px] snap-start"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className={`relative aspect-[4/5] rounded-[1.5rem] overflow-hidden border-t border-l ${
                isDark
                  ? 'bg-gray-800/75 backdrop-blur-2xl border-gray-700 shadow-[10px_10px_30px_-10px_rgba(0,0,0,0.3)]'
                  : 'bg-white/75 backdrop-blur-2xl border-white shadow-[10px_10px_30px_-10px_rgba(0,0,0,0.05)]'
              }`}
            >
              <Image
                src={industry.image}
                alt={industry.name}
                fill
                sizes="260px"
                className="object-cover"
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

              <div className="absolute inset-0 p-5 flex flex-col justify-between">
                <span className="text-white text-lg font-semibold font-serif drop-shadow-lg">
                  {industry.name}
                </span>

                {/* Action button - Always visible on mobile */}
                <div className="flex justify-end">
                  <div className={`backdrop-blur-sm rounded-full px-4 py-2.5 flex items-center gap-2 shadow-lg active:scale-95 transition-transform ${
                    isDark
                      ? 'bg-white/90 text-slate-800'
                      : 'bg-white/90 text-slate-800'
                  }`}>
                    <span className="text-sm font-semibold">Explore</span>
                    <FaArrowRight className="w-3 h-3" />
                  </div>
                </div>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>

      {/* Progress Bar instead of dots for many items */}
      <div className="container-responsive">
        <div className="flex justify-center mt-4">
          <div className={`w-2/3 h-1.5 rounded-full overflow-hidden ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}>
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-300"
              style={{ width: `${Math.max(10, ((activeIndex + 1) / industries.length) * 100)}%` }}
            />
          </div>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  )
}

export default MobileIndustriesCarousel
