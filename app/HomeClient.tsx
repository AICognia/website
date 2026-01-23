'use client'

import React from 'react'
import Hero from '@/src/components/Hero'
import MobileHero from '@/src/components/MobileHero'
import IndustriesCarousel from '@/src/components/IndustriesCarousel'
import WhatWeDoSection from '@/src/components/WhatWeDoSection'
import DemoSection from '@/src/components/DemoSection'
import SocialProofSection from '@/src/components/SocialProofSection'
import WhyChooseUs from '@/src/components/WhyChooseUs'
import CTASection from '@/src/components/CTASection'
import LogoCloudSection from '@/src/components/LogoCloudSection'
import SEOHead from '@/src/components/SEOHead'

export default function HomeClient() {
  return (
    <>
      <SEOHead pageType="home" />
      <div className="w-full">
        <section className="w-full">
          <Hero />
          <MobileHero />
        </section>

        <LogoCloudSection />

        <section className="w-full">
          <WhyChooseUs />
        </section>

        <section className="w-full">
          <WhatWeDoSection />
        </section>

        <section className="w-full section-padding bg-white dark:bg-gray-900">
          <div className="container-responsive">
            <SocialProofSection />
          </div>
        </section>

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
