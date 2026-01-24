'use client'
import React, { useState, useEffect } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import Link from 'next/link';
import { useTheme } from 'next-themes';

// Testimonials data with images
const testimonials = [
  {
    quote: "Working with Cognia has been a game-changer for our office. What I appreciate the most is how they completely transformed our Monday mornings. Before Cognia, I would spend 45 minutes just waiting for the voicemail system to run so I could go through every message. Now, with Cognia, we receive a clear email summary along with call transcripts first thing in the morning. This lets us immediately prioritize call-backs without wasting time. And if a patient requests an appointment over the weekend, Cognia schedules it for us — no backlog, no delays.",
    author: "Jacob Ojalvo",
    role: "Owner",
    company: "My Smile Miami",
    logo: "/logos/mysmilemiami.webp",
    darkModeInvert: false,
    image: "/images/industries/dental.jpg"
  },
  {
    quote: "It took about a week to get everything set up, which honestly wasn't bad considering how busy we were at the time. Before this, we were missing way more calls than we ever thought. After we switched to Cognia AI, the whole situation changed. Calls actually get answered now, even when we're tied up or out on the road, and customers get a response right away instead of voicemail. Over the last few weeks, we've noticed a pretty clear bump in jobs coming in. You stop missing calls, you stop missing work.",
    author: "Elite Auto Repair",
    role: "Auto Repair Shop",
    company: "Automotive",
    logo: "/logos/hallsheatingandair.png",
    darkModeInvert: true,
    image: "/images/industries/autorepair.jpeg"
  }
];

const SocialProofSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isImageAnimating, setIsImageAnimating] = useState(true);
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Default to dark to prevent flash (dark is the default theme)
  const isDark = !mounted || resolvedTheme === 'dark';

  // Run initial animation on mount
  React.useEffect(() => {
    setTimeout(() => {
      setIsImageAnimating(false);
    }, 500);
  }, []);

  const goToSlide = (index: number) => {
    if (index !== activeIndex) {
      setIsTransitioning(true);
      setIsImageAnimating(true);
      setTimeout(() => {
        setActiveIndex(index);
        setTimeout(() => {
          setIsImageAnimating(false);
          // Keep text hidden until expansion is complete
          setTimeout(() => {
            setIsTransitioning(false);
          }, 700);
        }, 100);
      }, 300);
    }
  };

  const goNext = () => {
    const nextIndex = (activeIndex + 1) % testimonials.length;
    goToSlide(nextIndex);
  };

  const goPrev = () => {
    const prevIndex = (activeIndex - 1 + testimonials.length) % testimonials.length;
    goToSlide(prevIndex);
  };

  const canScrollLeft = activeIndex > 0;
  const canScrollRight = activeIndex < testimonials.length - 1;
  const currentTestimonial = testimonials[activeIndex];

  return (
    <section className={`overflow-hidden py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
      <div className="relative z-10">

        {/* SVG Filter for rounded corners */}
        <svg className="absolute" width="0" height="0" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="rounded" colorInterpolationFilters="sRGB">
              <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
              <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="rounded" />
              <feComposite in="SourceGraphic" in2="rounded" operator="atop" />
            </filter>
          </defs>
        </svg>

        {/* Header Area */}
        <div className="mb-8 sm:mb-10 md:mb-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 md:gap-8">
            <div className="space-y-2 sm:space-y-4">
              <h2 className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl heading-2 ${isDark ? 'text-gray-100' : ''}`}>
                Trusted by Growing Businesses
              </h2>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={goPrev}
                disabled={!canScrollLeft}
                className={`w-9 sm:w-11 h-9 sm:h-11 flex items-center justify-center rounded-full border transition-all duration-300 ${canScrollLeft
                  ? isDark
                    ? 'bg-gray-800 border-gray-700 text-gray-300 hover:border-blue-500/30'
                    : 'bg-white border-[#e2e8f0] text-[#37322f] hover:border-[#1E40AF]/30 hover:shadow-[inset_0_1px_2px_rgba(30,64,175,0.15),0_2px_8px_rgba(30,64,175,0.1)]'
                  : 'opacity-40 cursor-not-allowed'
                } ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-[#e2e8f0]'}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14px" height="14px" viewBox="0 0 18 18"><path d="M11.5 16C11.308 16 11.116 15.9271 10.97 15.7801L4.71999 9.53005C4.42699 9.23705 4.42699 8.76202 4.71999 8.46902L10.97 2.21999C11.263 1.92699 11.738 1.92699 12.031 2.21999C12.324 2.51299 12.324 2.98803 12.031 3.28103L6.311 9.001L12.031 14.721C12.324 15.014 12.324 15.489 12.031 15.782C11.885 15.928 11.693 16.002 11.501 16.002L11.5 16Z" fill="currentColor"></path></svg>
              </button>
              <button
                onClick={goNext}
                disabled={!canScrollRight}
                className={`w-9 sm:w-11 h-9 sm:h-11 flex items-center justify-center rounded-full border transition-all duration-300 ${canScrollRight
                  ? isDark
                    ? 'bg-gray-800 border-gray-700 text-gray-300 hover:border-blue-500/30'
                    : 'bg-white border-[#e2e8f0] text-[#37322f] hover:border-[#1E40AF]/30 hover:shadow-[inset_0_1px_2px_rgba(30,64,175,0.15),0_2px_8px_rgba(30,64,175,0.1)]'
                  : 'opacity-40 cursor-not-allowed'
                } ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-[#e2e8f0]'}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14px" height="14px" viewBox="0 0 18 18"><path d="M13.28 8.46999L7.03 2.21999C6.737 1.92699 6.262 1.92699 5.969 2.21999C5.676 2.51299 5.676 2.98803 5.969 3.28103L11.689 9.001L5.969 14.721C5.676 15.014 5.676 15.489 5.969 15.782C6.115 15.928 6.307 16.002 6.499 16.002C6.691 16.002 6.883 15.929 7.029 15.782L13.279 9.53201C13.572 9.23901 13.572 8.76403 13.279 8.47103L13.28 8.46999Z" fill="currentColor"></path></svg>
              </button>
            </div>
          </div>
        </div>

        {/* Main Content - Two Cards Side by Side */}
        <div className="relative hidden h-full w-full lg:flex lg:max-h-[750px] xl:max-h-[540px] aspect-[2274/1120]">
          
          {/* Left Card - Text Content with shadow */}
          <div 
            className={`h-full absolute left-0 top-0 transition-all ease-in-out ${isImageAnimating ? 'w-[64%] duration-300 delay-0' : 'w-[55%] duration-700 delay-200'}`}
            style={{ filter: 'url(#rounded)' }}
          >
            <div
              className={`h-full rounded-xl p-6 w-full transition-all ease-in-out ${isImageAnimating ? 'duration-300 delay-0' : 'duration-700 delay-200'} ${isDark ? 'bg-gray-900' : 'bg-gray-100'}`}
              style={{
                clipPath: isImageAnimating
                  ? 'polygon(100% 0%, 0% 0%, 0% 100%, 100% 100%)'
                  : 'polygon(82% 0%, 0% 0%, 0% 100%, 98% 100%)'
              }}
            />
          </div>

          {/* Left Card - Text Content */}
          <div
            className={`h-full absolute top-[1px] left-[1px] transition-all ease-in-out ${isImageAnimating ? 'w-[64%] duration-300 delay-0' : 'w-[55%] duration-700 delay-200'}`}
            style={{ filter: 'url(#rounded)' }}
          >
            <div
              className={`rounded-xl p-6 overflow-hidden h-[calc(100%-2px)] w-[calc(100%-2px)] border transition-all ease-in-out ${isImageAnimating ? 'duration-300 delay-0' : 'duration-700 delay-200'} ${isDark ? 'bg-gray-800 text-gray-100 border-gray-600' : 'bg-white text-[#37322f] border-[#e2e8f0]'}`}
              style={{
                clipPath: isImageAnimating
                  ? 'polygon(100% 0%, 0% 0%, 0% 100%, 100% 100%)'
                  : 'polygon(82% 0%, 0% 0%, 0% 100%, 98% 100%)',
                boxShadow: isDark
                  ? 'inset 0 1px 2px rgba(59, 130, 246, 0.15), 0 4px 12px rgba(0, 0, 0, 0.4)'
                  : 'inset 0 1px 2px rgba(14, 165, 233, 0.15), inset 0 -1px 2px rgba(14, 165, 233, 0.08), inset 1px 0 2px rgba(14, 165, 233, 0.12), inset -1px 0 2px rgba(14, 165, 233, 0.05), 0 2px 4px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.03)'
              }}
            >
              <div className="w-10/12">
                <div className="flex h-full flex-col">
                  <div className={`mb-6 transition-all duration-300 ease-in-out ${isTransitioning ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'}`}>
                    <img
                      src={currentTestimonial.logo}
                      alt={`${currentTestimonial.company} Logo`}
                      className={`h-12 w-auto sm:h-14 max-w-[180px] object-contain opacity-80 grayscale ${currentTestimonial.darkModeInvert ? 'dark:invert' : ''}`}
                    />
                  </div>
                  
                  <div className={`mb-6 lg:mb-10 transition-all duration-300 ease-in-out ${isTransitioning ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'}`}>
                    <h3 className="text-lg lg:text-xl leading-relaxed">
                      "{currentTestimonial.quote}"
                    </h3>
                  </div>
                  
                  <div className={`transition-all duration-300 ease-in-out ${isTransitioning ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'}`}>
                    <p className={`text-sm lg:text-base ${isDark ? 'text-gray-400' : 'text-[#6b7280]'}`}>
                      — {currentTestimonial.author}, {currentTestimonial.role}
                    </p>
                  </div>

                  <div className={`mt-6 sm:mt-16 lg:absolute lg:bottom-6 transition-all duration-300 ease-in-out ${isTransitioning ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'}`}>
                    <a
                      className="group inline-block max-w-full disabled:cursor-not-allowed focus-visible:outline-1 focus-visible:outline focus-visible:outline-blue-500 rounded-sm"
                      target="_blank"
                      href="/demo"
                    >
                      <span className={`flex items-center ${isDark ? 'text-gray-300' : 'text-[#37322f]'}`}>
                        <span className="text-sm lg:text-base">
                          <span className="text-sm lg:text-base">Read more</span>
                        </span>
                        <span className="ml-1 mr-2 flex items-center duration-400 transition-all ease-in-out group-hover:ml-2 group-hover:mr-1">
                          <svg 
                            className="w-3 h-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" 
                            viewBox="0 0 12 12" 
                            fill="none" 
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M1 11L11 1M11 1H3M11 1V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </span>
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Card - Image */}
          <div 
            className={`absolute h-full rounded-[20px] pointer-events-none transition-all ease-in-out right-0 ${isImageAnimating ? 'w-[35%] duration-300 delay-0' : 'w-[55%] duration-700 delay-200'}`}
            style={{ 
              filter: 'url(#rounded)'
            }}
          >
            <div 
              className={`h-full w-full overflow-hidden rounded-xl bg-gray-100 transition-all ease-in-out ${isImageAnimating ? 'duration-300 delay-0' : 'duration-700 delay-200'}`}
              style={{ 
                clipPath: isImageAnimating 
                  ? 'polygon(100% 0%, 0% 0%, 0% 100%, 100% 100%)' 
                  : 'polygon(100% 0%, 2% 0%, 18% 100%, 100% 100%)'
              }}
            >
              <img
                alt={currentTestimonial.company}
                className="z-2 relative h-full w-full object-cover object-right"
                src={currentTestimonial.image}
              />
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="relative flex flex-col h-full w-full lg:hidden gap-4">

          {/* Mobile Text Card */}
          <div
            className={`w-full rounded-xl sm:rounded-2xl p-4 sm:p-6 border transition-all duration-500 ease-in-out ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-[#e2e8f0]'}`}
            style={{
              boxShadow: isDark
                ? 'inset 0 1px 2px rgba(59, 130, 246, 0.15), 0 4px 12px rgba(0, 0, 0, 0.4)'
                : 'inset 0 1px 2px rgba(14, 165, 233, 0.15), 0 2px 8px rgba(0, 0, 0, 0.04)'
            }}
          >
            <div className="flex flex-col">
              <div className="mb-4 sm:mb-6">
                <img
                  src={currentTestimonial.logo}
                  alt={`${currentTestimonial.company} Logo`}
                  className={`h-8 sm:h-12 w-auto max-w-[140px] sm:max-w-[160px] object-contain opacity-80 grayscale ${currentTestimonial.darkModeInvert ? 'dark:invert' : ''}`}
                />
              </div>

              <div className="mb-4 sm:mb-6">
                <h3 className={`text-sm sm:text-base md:text-lg leading-relaxed ${isDark ? 'text-gray-100' : 'text-[#37322f]'}`}>
                  "{currentTestimonial.quote}"
                </h3>
              </div>

              <div>
                <p className={`text-xs sm:text-sm ${isDark ? 'text-gray-400' : 'text-[#6b7280]'}`}>
                  - {currentTestimonial.author}, {currentTestimonial.role}
                </p>
              </div>

              <div className="mt-4 sm:mt-6">
                <Link
                  href="/demo"
                  className="group inline-block"
                >
                  <span className={`flex items-center ${isDark ? 'text-gray-300' : 'text-[#37322f]'}`}>
                    <span className="text-xs sm:text-sm font-medium">Read more</span>
                    <span className="ml-1 mr-2 flex items-center transition-all duration-300 group-hover:ml-2 group-hover:mr-1">
                      <svg
                        className="w-2.5 sm:w-3 h-2.5 sm:h-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M1 11L11 1M11 1H3M11 1V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                  </span>
                </Link>
              </div>
            </div>
          </div>

          {/* Mobile Image Card */}
          <div
            className="w-full h-32 sm:h-40 rounded-xl sm:rounded-2xl overflow-hidden"
          >
            <img
              alt={currentTestimonial.company}
              className="w-full h-full object-cover object-center"
              src={currentTestimonial.image}
            />
          </div>
        </div>

        {/* Progress Bar */}
        <div className="flex items-center justify-center transition-opacity duration-500 ease-in-out mt-6 sm:mt-8">
          <div className="relative w-[200px] sm:w-[320px] md:w-[450px] lg:max-w-[550px]">
            <div className="relative h-1">
              <button
                onClick={() => goToSlide(0)}
                className="absolute h-1 opacity-20 rounded-full transition-all duration-500 ease-in-out cursor-pointer bg-neutral-15"
                style={{ left: 0, width: activeIndex > 0 ? 'calc(100% / testimonials.length * activeIndex - 10px)' : '0px' }}
              />
              <button
                onClick={() => goToSlide(testimonials.length - 1)}
                className="absolute h-1 opacity-20 rounded-full transition-all duration-500 ease-in-out cursor-pointer bg-neutral-15"
                style={{ left: `calc(100% / testimonials.length * ${activeIndex + 1})`, right: 0 }}
              />
              <div 
                className="absolute h-1 rounded-full transition-transform duration-500 ease-in-out bg-gradient-to-r from-coral-500 via-violet-500 to-blue-500" 
                style={{ 
                  width: 'calc(100% / testimonials.length - 10px)', 
                  transform: `translateX(calc(100% / testimonials.length * ${activeIndex}))` 
                }}
              />
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-10 sm:mt-12 md:mt-16 text-center">
          <p className={`text-xs sm:text-sm font-serif mb-4 sm:mb-6 ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>Join 50+ businesses transforming with AI</p>
          <Link
            href="/demo"
            className="btn-primary h-10 sm:h-12 px-6 sm:px-8 rounded-full text-sm sm:text-base w-full sm:w-auto inline-flex justify-center"
          >
            <span>Schedule a Consultation</span>
            <FaArrowRight className="ml-2 w-3 sm:w-4 h-3 sm:h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

      </div>
    </section>
  );
};

export default SocialProofSection;
