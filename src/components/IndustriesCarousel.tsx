'use client'

import React, { useState, useRef, useEffect } from 'react'
import { FaArrowRight } from 'react-icons/fa'
import Link from 'next/link'
import Image from 'next/image'

interface Industry {
  name: string
  image: string
  href: string
  textColor: 'white' | 'black'
}

const industries: Industry[] = [
  {
    name: 'Healthcare',
    image: '/images/industries/healthcare.webp',
    href: '/industries/healthcare',
    textColor: 'white'
  },
  {
    name: 'Manufacturing',
    image: '/images/industries/manufacturing.webp',
    href: '/industries/manufacturing',
    textColor: 'white'
  },
  {
    name: 'Financial Services',
    image: '/images/industries/financial_services.webp',
    href: '/industries/financial-services',
    textColor: 'white'
  },
  {
    name: 'Technology',
    image: '/images/industries/technology.webp',
    href: '/industries/technology',
    textColor: 'white'
  },
  {
    name: 'Retail',
    image: '/images/industries/retail.webp',
    href: '/industries/retail',
    textColor: 'white'
  },
  {
    name: 'Automotive',
    image: '/images/industries/autorepair.webp',
    href: '/industries/automotive',
    textColor: 'white'
  },
  {
    name: 'Home Services',
    image: '/images/industries/home_services.webp',
    href: '/industries/HomeServices',
    textColor: 'white'
  },
  {
    name: 'Construction',
    image: '/images/industries/construction.webp',
    href: '/industries/construction',
    textColor: 'white'
  },
  {
    name: 'Energy',
    image: '/images/industries/energy.webp',
    href: '/industries/energy',
    textColor: 'white'
  },
  {
    name: 'Public Sector',
    image: '/images/industries/public_sector.webp',
    href: '/industries/public-sector',
    textColor: 'white'
  },
  {
    name: 'Real Estate',
    image: '/images/industries/real_estate.webp',
    href: '/industries/real-estate',
    textColor: 'white'
  },
  {
    name: 'Hospitality',
    image: '/images/industries/hospitality.webp',
    href: '/industries/hospitality',
    textColor: 'white'
  },
  {
    name: 'Legal',
    image: '/images/industries/legal.webp',
    href: '/industries/legal',
    textColor: 'white'
  },
  {
    name: 'Professional Services',
    image: '/images/industries/professional_services.webp',
    href: '/industries/service-businesses',
    textColor: 'white'
  }
]

const IndustriesCarousel: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [canScrollLeft, setCanScrollLeft] = useState(false) // Start disabled
  const [canScrollRight, setCanScrollRight] = useState(true)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const targetScrollRef = useRef(0)
  const animationRef = useRef<number | null>(null)

  // Custom smooth scroll using lerp - always chases the target
  const animateScroll = () => {
    if (!scrollContainerRef.current) return

    const container = scrollContainerRef.current
    const lerp = 0.12 // Smoothing factor (higher = faster)
    const threshold = 0.5 // Stop when close enough

    const step = () => {
      const currentPos = container.scrollLeft
      const target = targetScrollRef.current
      const distance = target - currentPos

      if (Math.abs(distance) > threshold) {
        container.scrollLeft = currentPos + distance * lerp
        animationRef.current = requestAnimationFrame(step)
      } else {
        container.scrollLeft = target
        animationRef.current = null
      }
    }

    // Only start new animation if not already running
    if (!animationRef.current) {
      animationRef.current = requestAnimationFrame(step)
    }
  }

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return

    const container = scrollContainerRef.current
    // Dynamically get the width of the first card
    const firstCard = container.querySelector('a')
    const cardWidth = firstCard ? firstCard.clientWidth : 320
    const gap = 16 // gap-4 is 16px
    const itemWidth = cardWidth + gap
    const scrollAmount = direction === 'left' ? -itemWidth : itemWidth
    const maxScroll = container.scrollWidth - container.clientWidth

    // Calculate new target from current target (allows stacking rapid clicks)
    const newTarget = Math.max(0, Math.min(targetScrollRef.current + scrollAmount, maxScroll))
    targetScrollRef.current = newTarget

    // Update button states immediately based on target
    setCanScrollLeft(newTarget > 20)
    setCanScrollRight(newTarget < maxScroll - 20)

    // Use custom animation instead of native smooth scroll
    animateScroll()
  }

  const updateScrollStatus = () => {
    if (!scrollContainerRef.current) return

    const container = scrollContainerRef.current
    const { scrollLeft, scrollWidth, clientWidth } = container
    const maxScroll = scrollWidth - clientWidth

    // Only sync target ref when not animating (user dragged or animation finished)
    if (!animationRef.current) {
      targetScrollRef.current = scrollLeft
    }

    // Enable left chevron only if scrolled more than 20px
    const shouldEnableLeft = scrollLeft > 20
    // Enable right chevron only if more than 20px from end
    const shouldEnableRight = scrollLeft < maxScroll - 20

    setCanScrollLeft(shouldEnableLeft)
    setCanScrollRight(shouldEnableRight)

    // Update progress from actual scroll position
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
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return (
    <section className="overflow-x-clip py-10 sm:py-14 lg:py-18 xl:py-22 transition-colors duration-300 bg-white dark:bg-gray-900">
      {/* Header Area - Constrained */}
      <div className="container-responsive px-4 sm:px-6 lg:px-8 mb-8 sm:mb-10 md:mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 md:gap-8">
          <div className="space-y-2 sm:space-y-4">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl heading-2 dark:text-gray-100">
              Powering progress across industries
            </h2>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              className={`w-9 sm:w-11 h-9 sm:h-11 flex items-center justify-center rounded-full border transition-all duration-300 bg-white dark:bg-gray-800 border-[#e2e8f0] dark:border-gray-700 text-[#37322f] dark:text-gray-300 ${canScrollLeft
                ? 'hover:border-[#0ea5e9]/30 dark:hover:border-blue-500/30 hover:shadow-[inset_0_1px_2px_rgba(14,165,233,0.15),0_2px_8px_rgba(14,165,233,0.1)]'
                : 'opacity-40 cursor-not-allowed'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="14px" height="14px" viewBox="0 0 18 18"><path d="M11.5 16C11.308 16 11.116 15.9271 10.97 15.7801L4.71999 9.53005C4.42699 9.23705 4.42699 8.76202 4.71999 8.46902L10.97 2.21999C11.263 1.92699 11.738 1.92699 12.031 2.21999C12.324 2.51299 12.324 2.98803 12.031 3.28103L6.311 9.001L12.031 14.721C12.324 15.014 12.324 15.489 12.031 15.782C11.885 15.928 11.693 16.002 11.501 16.002L11.5 16Z" fill="currentColor"></path></svg>
            </button>
            <button
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              className={`w-9 sm:w-11 h-9 sm:h-11 flex items-center justify-center rounded-full border transition-all duration-300 bg-white dark:bg-gray-800 border-[#e2e8f0] dark:border-gray-700 text-[#37322f] dark:text-gray-300 ${canScrollRight
                ? 'hover:border-[#0ea5e9]/30 dark:hover:border-blue-500/30 hover:shadow-[inset_0_1px_2px_rgba(14,165,233,0.15),0_2px_8px_rgba(14,165,233,0.1)]'
                : 'opacity-40 cursor-not-allowed'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="14px" height="14px" viewBox="0 0 18 18"><path d="M13.28 8.46999L7.03 2.21999C6.737 1.92699 6.262 1.92699 5.969 2.21999C5.676 2.51299 5.676 2.98803 5.969 3.28103L11.689 9.001L5.969 14.721C5.676 15.014 5.676 15.489 5.969 15.782C6.115 15.928 6.307 16.002 6.499 16.002C6.691 16.002 6.883 15.929 7.029 15.782L13.279 9.53201C13.572 9.23901 13.572 8.76403 13.279 8.47103L13.28 8.46999Z" fill="currentColor"></path></svg>
            </button>
          </div>
        </div>
      </div>

      {/* Carousel Container - with top padding so hover translate doesn't clip */}
      <div className="container-responsive px-4 sm:px-6 lg:px-8">
          <div
            ref={scrollContainerRef}
            className="flex gap-3 sm:gap-4 overflow-x-auto scrollbar-hide pt-2 pb-6 sm:pb-8"
            style={{
              WebkitOverflowScrolling: 'touch',
            }}
          >
            {industries.map((industry) => (
              <Link
                key={industry.name}
                href={industry.href}
                className="flex-shrink-0 w-[200px] sm:w-[240px] md:w-[280px] lg:w-[320px] group"
              >
                <div
                  className="relative aspect-square rounded-[1.25rem] sm:rounded-[1.5rem] md:rounded-[2rem] transition-all duration-500 p-1.5 sm:p-2 border backdrop-blur-xl hover:-translate-y-1 border-[#e2e8f0] dark:border-gray-700 bg-white/50 dark:bg-gray-800/70 hover:bg-white/70 dark:hover:bg-gray-800/90 shadow-[inset_0_1px_2px_rgba(14,165,233,0.15),inset_0_-1px_2px_rgba(14,165,233,0.08),inset_1px_0_2px_rgba(14,165,233,0.12),inset_-1px_0_2px_rgba(14,165,233,0.05),0_2px_4px_rgba(0,0,0,0.04),0_1px_2px_rgba(0,0,0,0.03)] dark:shadow-[0_4px_12px_rgba(0,0,0,0.3)] hover:shadow-[inset_0_1px_2px_rgba(14,165,233,0.2),inset_0_-1px_2px_rgba(14,165,233,0.1),inset_1px_0_2px_rgba(14,165,233,0.15),inset_-1px_0_2px_rgba(14,165,233,0.08),0_2px_4px_rgba(0,0,0,0.04),0_1px_2px_rgba(0,0,0,0.03)] dark:hover:shadow-[0_8px_20px_rgba(0,0,0,0.4)]"
                >
                  <div className="relative w-full h-full rounded-[1rem] sm:rounded-[1.25rem] md:rounded-[1.5rem] overflow-hidden border border-[#e2e8f0] dark:border-gray-600 shadow-[inset_0_1px_2px_rgba(14,165,233,0.1),inset_0_-1px_2px_rgba(14,165,233,0.05),0_4px_12px_rgba(0,0,0,0.04)] dark:shadow-[0_4px_12px_rgba(0,0,0,0.2)]">
                    <Image
                      src={industry.image}
                      alt={industry.name}
                      fill
                      sizes="(max-width: 640px) 200px, (max-width: 768px) 240px, (max-width: 1024px) 280px, 320px"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
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
          <div className="w-3/4 sm:w-2/3 md:w-1/2 h-1.5 sm:h-2 rounded-full overflow-hidden bg-slate-200 dark:bg-gray-700">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-none"
              style={{ width: `${Math.max(10, scrollProgress * 100)}%`, transition: 'none' }}
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
