'use client'

import React, { lazy, Suspense } from 'react'
import dynamic from 'next/dynamic'
import UnifiedHero from '@/src/components/UnifiedHero'
import LogoCloudSection from '@/src/components/LogoCloudSection'
import SEOHead from '@/src/components/SEOHead'

// Lazy load below-the-fold components for faster initial paint
const WhyChooseUs = dynamic(() => import('@/src/components/WhyChooseUs'), {
  ssr: true,
  loading: () => <div className="min-h-[400px]" />
})

const WhatWeDoSection = dynamic(() => import('@/src/components/WhatWeDoSection'), {
  ssr: true,
  loading: () => <div className="min-h-[400px]" />
})

// SocialProofSection removed per client feedback - testimonials were too long

const DemoSection = dynamic(() => import('@/src/components/DemoSection'), {
  ssr: true,
  loading: () => <div className="min-h-[400px]" />
})

const IndustriesCarousel = dynamic(() => import('@/src/components/IndustriesCarousel'), {
  ssr: true,
  loading: () => <div className="min-h-[300px]" />
})

const CTASection = dynamic(() => import('@/src/components/CTASection'), {
  ssr: true,
  loading: () => <div className="min-h-[200px]" />
})

export default function HomeClient() {
  return (
    <>
      <SEOHead pageType="home" />
      <div className="w-full">
        {/* Unified Hero - Single H1 with responsive layouts - Critical, load immediately */}
        <UnifiedHero />

        <LogoCloudSection />

        <section className="w-full">
          <WhyChooseUs />
        </section>

        <section className="w-full">
          <WhatWeDoSection />
        </section>

        {/* SocialProofSection removed per client feedback - testimonials were too long */}

        <section className="w-full">
          <DemoSection />
        </section>

        <IndustriesCarousel />

        <section className="w-full">
          <CTASection />
        </section>
      </div>
    </>
  )
}
