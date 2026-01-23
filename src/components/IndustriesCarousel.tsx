'use client'

import React, { useState, useRef, useEffect } from 'react'
import { FaArrowRight } from 'react-icons/fa'
import Link from 'next/link'
import { useTheme } from 'next-themes'

interface Industry {
  name: string
  image: string
  href: string
  textColor: 'white' | 'black'
}

const industries: Industry[] = [
  {
    name: 'Financial Services',
    image: '/images/industries/financial_services.png',
    href: '/industries/financial-services',
    textColor: 'white'
  },
  {
    name: 'Public Sector',
    image: '/images/industries/public_sector.jpg',
    href: '/industries/public-sector',
    textColor: 'white'
  },
  {
    name: 'Energy',
    image: '/images/industries/energy.png',
    href: '/industries/energy',
    textColor: 'white'
  },
  {
    name: 'Technology',
    image: '/images/industries/technology.jpg',
    href: '/industries/technology',
    textColor: 'white'
  },
  {
    name: 'Healthcare',
    image: '/images/industries/healthcare.jpg',
    href: '/industries/healthcare',
    textColor: 'white'
  }
]

const IndustriesCarousel: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [canScrollLeft, setCanScrollLeft] = useState(false) // Start disabled
  const [canScrollRight, setCanScrollRight] = useState(true)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  // Default to dark to prevent flash (dark is the default theme)
  const isDark = !mounted || resolvedTheme === 'dark'

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return

    const container = scrollContainerRef.current
    // Dynamically get the width of the first card
    const firstCard = container.querySelector('a')
    const cardWidth = firstCard ? firstCard.clientWidth : 320
    const gap = 16 // gap-4 is 16px
    const itemWidth = cardWidth + gap
    const scrollAmount = direction === 'left' ? -itemWidth : itemWidth

    // Calculate target scroll position for immediate progress update
    const currentScroll = container.scrollLeft
    const targetScroll = Math.max(0, Math.min(currentScroll + scrollAmount, container.scrollWidth - container.clientWidth))

    // Update progress immediately to prevent delay
    const maxScroll = container.scrollWidth - container.clientWidth
    if (maxScroll > 0) {
      setScrollProgress(targetScroll / maxScroll)
    }

    container.scrollBy({
      left: scrollAmount,
      behavior: 'smooth'
    })
  }

  const updateScrollStatus = () => {
    if (!scrollContainerRef.current) return

    const container = scrollContainerRef.current
    const { scrollLeft, scrollWidth, clientWidth } = container

    // Enable left chevron only if scrolled more than 20px
    const shouldEnableLeft = scrollLeft > 20
    // Enable right chevron only if more than 20px from end
    const shouldEnableRight = scrollLeft < scrollWidth - clientWidth - 20

    setCanScrollLeft(shouldEnableLeft)
    setCanScrollRight(shouldEnableRight)

    // Update progress
    const maxScroll = scrollWidth - clientWidth
    if (maxScroll > 0) {
      setScrollProgress(scrollLeft / maxScroll)
    } else {
      setScrollProgress(0)
    }
  }

  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    container.addEventListener('scroll', updateScrollStatus, { passive: true })
    updateScrollStatus() // Check initial state
    window.addEventListener('resize', updateScrollStatus)

    return () => {
      container.removeEventListener('scroll', updateScrollStatus)
      window.removeEventListener('resize', updateScrollStatus)
    }
  }, [])

  return (
    <section className="overflow-hidden py-12 sm:py-16 md:py-24 lg:py-32 transition-colors duration-300 bg-gray-900 dark:bg-gray-900 light:bg-white" style={{ backgroundColor: 'var(--bg-primary)' }}>
      {/* Header Area - Constrained */}
      <div className="container-responsive px-4 sm:px-6 lg:px-8 mb-8 sm:mb-10 md:mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 md:gap-8">
          <div className="space-y-2 sm:space-y-4">
            <h2 className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl heading-2 ${isDark ? 'text-gray-100' : ''}`}>
              Powering progress across industries
            </h2>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              className={`w-9 sm:w-11 h-9 sm:h-11 flex items-center justify-center rounded-full border transition-all duration-300 ${canScrollLeft
                ? isDark
                  ? 'bg-gray-800 border-gray-700 text-gray-300 hover:border-blue-500/30'
                  : 'bg-white border-[#e2e8f0] text-[#37322f] hover:border-[#0ea5e9]/30 hover:shadow-[inset_0_1px_2px_rgba(14,165,233,0.15),0_2px_8px_rgba(14,165,233,0.1)]'
                : 'opacity-40 cursor-not-allowed'
              } ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-[#e2e8f0]'}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="14px" height="14px" viewBox="0 0 18 18"><path d="M11.5 16C11.308 16 11.116 15.9271 10.97 15.7801L4.71999 9.53005C4.42699 9.23705 4.42699 8.76202 4.71999 8.46902L10.97 2.21999C11.263 1.92699 11.738 1.92699 12.031 2.21999C12.324 2.51299 12.324 2.98803 12.031 3.28103L6.311 9.001L12.031 14.721C12.324 15.014 12.324 15.489 12.031 15.782C11.885 15.928 11.693 16.002 11.501 16.002L11.5 16Z" fill="currentColor"></path></svg>
            </button>
            <button
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              className={`w-9 sm:w-11 h-9 sm:h-11 flex items-center justify-center rounded-full border transition-all duration-300 ${canScrollRight
                ? isDark
                  ? 'bg-gray-800 border-gray-700 text-gray-300 hover:border-blue-500/30'
                  : 'bg-white border-[#e2e8f0] text-[#37322f] hover:border-[#0ea5e9]/30 hover:shadow-[inset_0_1px_2px_rgba(14,165,233,0.15),0_2px_8px_rgba(14,165,233,0.1)]'
                : 'opacity-40 cursor-not-allowed'
              } ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-[#e2e8f0]'}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="14px" height="14px" viewBox="0 0 18 18"><path d="M13.28 8.46999L7.03 2.21999C6.737 1.92699 6.262 1.92699 5.969 2.21999C5.676 2.51299 5.676 2.98803 5.969 3.28103L11.689 9.001L5.969 14.721C5.676 15.014 5.676 15.489 5.969 15.782C6.115 15.928 6.307 16.002 6.499 16.002C6.691 16.002 6.883 15.929 7.029 15.782L13.279 9.53201C13.572 9.23901 13.572 8.76403 13.279 8.47103L13.28 8.46999Z" fill="currentColor"></path></svg>
            </button>
          </div>
        </div>
      </div>

      {/* Carousel Container - Constrained to match other sections */}
      <div className="container-responsive px-4 sm:px-6 lg:px-8">
          <div
            ref={scrollContainerRef}
            className="flex gap-3 sm:gap-4 overflow-x-auto scrollbar-hide pb-6 sm:pb-8"
            style={{
              WebkitOverflowScrolling: 'touch',
              scrollBehavior: 'smooth',
            }}
          >
            {industries.map((industry) => (
              <Link
                key={industry.name}
                href={industry.href}
                className="flex-shrink-0 w-[200px] sm:w-[240px] md:w-[280px] lg:w-[320px] group"
              >
                <div
                  className={`relative aspect-square rounded-[1.25rem] sm:rounded-[1.5rem] md:rounded-[2rem] transition-all duration-500 p-1.5 sm:p-2 border backdrop-blur-xl hover:-translate-y-px ${
                    isDark
                      ? 'border-gray-700 bg-gray-800/70 hover:bg-gray-800/90 shadow-[0_4px_12px_rgba(0,0,0,0.3)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.4)]'
                      : 'border-[#e2e8f0] bg-white/50 hover:bg-white/70 shadow-[inset_0_1px_2px_rgba(14,165,233,0.15),inset_0_-1px_2px_rgba(14,165,233,0.08),inset_1px_0_2px_rgba(14,165,233,0.12),inset_-1px_0_2px_rgba(14,165,233,0.05),0_2px_4px_rgba(0,0,0,0.04),0_1px_2px_rgba(0,0,0,0.03)] hover:shadow-[inset_0_1px_2px_rgba(14,165,233,0.2),inset_0_-1px_2px_rgba(14,165,233,0.1),inset_1px_0_2px_rgba(14,165,233,0.15),inset_-1px_0_2px_rgba(14,165,233,0.08),0_2px_4px_rgba(0,0,0,0.04),0_1px_2px_rgba(0,0,0,0.03)]'
                  }`}
                >
                  <div className={`relative w-full h-full rounded-[1rem] sm:rounded-[1.25rem] md:rounded-[1.5rem] overflow-hidden border ${
                    isDark
                      ? 'border-gray-600 shadow-[0_4px_12px_rgba(0,0,0,0.2)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.3)]'
                      : 'border-[#e2e8f0] shadow-[inset_0_1px_2px_rgba(14,165,233,0.1),inset_0_-1px_2px_rgba(14,165,233,0.05),0_4px_12px_rgba(0,0,0,0.04)] hover:shadow-[inset_0_1px_2px_rgba(14,165,233,0.2),inset_0_-1px_2px_rgba(14,165,233,0.1),0_8px_24px_rgba(14,165,233,0.08)]'
                  }`}>
                    <img
                      src={industry.image}
                      alt={industry.name}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />

                    {/* Subtle overall overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#37322f]/60 via-transparent to-transparent transition-opacity duration-700" />

                    {/* Top Industry Name - Direct on Image */}
                    <div className="absolute top-3 sm:top-4 left-4 sm:left-6">
                      <span className={`${industry.textColor === 'black' ? 'text-black' : 'text-white'} text-sm sm:text-base md:text-lg font-medium tracking-tight font-serif drop-shadow-lg`}>
                        {industry.name}
                      </span>
                    </div>

                    {/* Bottom Action Pill */}
                    <div className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 delay-75 transform translate-y-1 group-hover:translate-y-0">
                      <div className="bg-white/90 backdrop-blur-sm text-[#37322f] rounded-full px-2 sm:px-3 py-1.5 sm:py-2 flex items-center gap-1.5 sm:gap-2 shadow-md border border-gray-200 hover:bg-white transition-all duration-300">
                        <span className="text-[10px] sm:text-xs font-medium uppercase tracking-wide">Explore</span>
                        <FaArrowRight className="w-2.5 sm:w-3 h-2.5 sm:h-3 transition-transform duration-300 group-hover:translate-x-0.5" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
      </div>

      {/* Progress Bar Area - Constrained */}
      <div className="container-responsive px-4 sm:px-6 lg:px-8 mt-6 sm:mt-8">
        <div className="flex items-center justify-center">
          <div className={`w-3/4 sm:w-2/3 md:w-1/2 h-1.5 sm:h-2 rounded-full overflow-hidden ${isDark ? 'bg-gray-700' : 'bg-slate-200'}`}>
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-300"
              style={{ width: `${Math.max(10, scrollProgress * 100)}%` }}
            />
          </div>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  )
}

export default IndustriesCarousel
