import React from 'react';
import { motion } from 'framer-motion';
import { FaArrowRight, FaPhone } from 'react-icons/fa';
import SEO from '../components/SEO';
import ROICalculator from '../components/ROICalculator';
import { structuredDataTemplates } from '../config/seoConfig';
import GradientOrbs from '../components/GradientOrbs';
import GridPattern from '../components/GridPattern';
import GlassCard from '../components/GlassCard';
import ParticleNetwork from '../components/ParticleNetwork';
import NoiseTexture from '../components/NoiseTexture';
import ScrollProgress from '../components/ScrollProgress';
import Testimonials from '../components/Testimonials';
import TrustBadges from '../components/TrustBadges';
import conversionTracker from '../utils/conversionTracking';

const Home: React.FC = () => {
  
  // FAQ structured data for the home page
  const faqStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How long does setup take?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We set up your system within 48 hours. After analyzing your needs, we configure and activate your AI assistant.'
        }
      },
      {
        '@type': 'Question',
        name: 'Which languages do you support?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We support over 20 languages. Your AI assistant can communicate naturally in your customers\' preferred language.'
        }
      },
      {
        '@type': 'Question',
        name: 'Does it integrate with existing systems?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, it integrates seamlessly with your CRM, ERP, and other business systems. We provide full API support.'
        }
      }
    ]
  };
  
  return (
    <div className="min-h-screen relative">
      <ScrollProgress />
      <NoiseTexture />
      
      <SEO 
        page="home" 
        structuredData={[
          structuredDataTemplates.organization,
          structuredDataTemplates.webSite,
          structuredDataTemplates.service,
          faqStructuredData
        ]}
      />
      
      {/* Hero Section - Maximum Tech Futuristic Design */}
      <section className="relative min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-white overflow-hidden flex items-center">
        {/* Animated Tech Background Layers */}
        <div className="absolute inset-0 opacity-30">
          <ParticleNetwork />
        </div>

        {/* Animated Grid Pattern */}
        <GridPattern className="opacity-20 animate-pulse-subtle" />

        {/* Dynamic Gradient Orbs */}
        <GradientOrbs />

        {/* Holographic Effect Overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-cyan-900/10 via-transparent to-purple-900/10 animate-gradient-slow" />

        {/* Tech Lines Animation */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-cyan-500/20 to-transparent animate-pulse" />
          <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-purple-500/20 to-transparent animate-pulse animation-delay-200" />
          <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-teal-500/20 to-transparent animate-pulse animation-delay-400" />
        </div>
        
        <div className="relative container mx-auto px-6 py-20">
          {/* Main Content */}
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-center"
            >
              {/* Enhanced Tech Badge with Animation */}
          <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-cyan-900/20 to-purple-900/20 border border-cyan-500/30 backdrop-blur-xl mb-10"
              >
                <div className="relative">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-50 animation-delay-200"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-gradient-to-r from-cyan-400 to-teal-400"></span>
                  </span>
                </div>
                <span className="text-cyan-300 text-sm font-semibold tracking-wider uppercase">Enterprise AI Technology</span>
                <span className="text-cyan-500/50">|</span>
                <span className="text-gray-400 text-xs">v2.0</span>
              </motion.div>

              {/* Futuristic Main Headline with Glitch Effect */}
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-8 relative">
                <motion.span
                  className="block bg-gradient-to-b from-white via-gray-200 to-gray-400 bg-clip-text text-transparent"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  AI That Answers
                </motion.span>
                <motion.span
                  className="block relative"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                    Every Call
                  </span>
                  {/* Animated underline */}
                  <motion.div
                    className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 1, delay: 0.8 }}
                  />
                </motion.span>
              </h1>
              
              {/* Enhanced Subheadline with Tech Details */}
              <motion.p
                className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mb-12 leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                Enterprise-grade conversational AI with{" "}
                <span className="text-cyan-400 font-semibold">natural language processing</span>,{" "}
                <span className="text-blue-400 font-semibold">real-time scheduling</span>, and{" "}
                <span className="text-purple-400 font-semibold">CRM integration</span>.
              </motion.p>
              
              {/* Stats Row - Enhanced Design */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12"
              >
                <div className="bg-gradient-to-br from-cyan-500/10 to-teal-500/10 rounded-xl p-6 border border-cyan-500/20 backdrop-blur-sm">
                  <div className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent mb-2">0.5s</div>
                  <div className="text-sm font-medium text-gray-400 uppercase tracking-wider">Response Time</div>
                </div>
                <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl p-6 border border-purple-500/20 backdrop-blur-sm">
                  <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">24/7</div>
                  <div className="text-sm font-medium text-gray-400 uppercase tracking-wider">Availability</div>
                </div>
                <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-xl p-6 border border-green-500/20 backdrop-blur-sm">
                  <div className="text-4xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-2">87%</div>
                  <div className="text-sm font-medium text-gray-400 uppercase tracking-wider">Booking Rate</div>
            </div>
          </motion.div>
              
              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-6 justify-center items-center"
              >
                <a
                  href="https://calendly.com/emrebenian-cogniaai/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    conversionTracker.trackDemoBooking('hero_cta');
                    conversionTracker.trackButtonClick('Book Free Demo', 'hero_section');
                  }}
                  className="group relative inline-flex items-center justify-center gap-3 px-10 py-5 min-w-[280px] bg-gradient-to-r from-cyan-500 via-cyan-400 to-cyan-500 text-white font-bold text-lg rounded-2xl hover:shadow-2xl hover:shadow-cyan-500/40 transition-all duration-300 hover:scale-105 transform"
                >
                  <span className="flex flex-col items-center">
                    <span className="text-lg">Book Free Demo</span>
                    <span className="text-xs opacity-90 font-medium">1 Week Free Trial</span>
                  </span>
                  <FaArrowRight className="group-hover:translate-x-1 transition-transform text-lg" />
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-400 to-teal-400 blur-xl opacity-50 group-hover:opacity-75 transition-opacity -z-10" />
                </a>

                <a
                  href="tel:+16163263328"
                  onClick={() => {
                    conversionTracker.trackPhoneCall('+16163263328');
                    conversionTracker.trackButtonClick('Call AI Receptionist', 'hero_section');
                  }}
                  className="group inline-flex items-center justify-center gap-4 px-10 py-5 min-w-[280px] bg-gradient-to-r from-slate-800/80 to-slate-700/80 backdrop-blur-xl border-2 border-cyan-500/30 text-white font-bold text-lg rounded-2xl hover:bg-gradient-to-r hover:from-cyan-500/20 hover:to-blue-500/20 hover:border-cyan-400/50 transition-all duration-300 hover:scale-105 transform"
                >
                  <FaPhone className="text-cyan-400 animate-pulse text-lg flex-shrink-0" />
                  <span className="flex flex-col items-start gap-1">
                    <span className="text-lg">Call AI Receptionist</span>
                    <span className="text-xs text-cyan-400 font-medium">Live Demo: +1 616-326-3328</span>
                  </span>
                </a>
              </motion.div>
            </motion.div>
            </div>
        </div>
      </section>

      {/* Trust Badges */}
      <TrustBadges />

      {/* Testimonials Section */}
      <Testimonials />

      {/* ROI Calculator Section - Modern */}
      <section className="relative bg-gray-900 py-32 overflow-hidden">
        <GridPattern className="opacity-10" />
        
        <div className="container mx-auto px-6 relative z-10">
            <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              See Your ROI
              </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Calculate how much revenue you're losing to missed calls and see what Cognia AI can recover
            </p>
            </motion.div>
            
          {/* Calculator in Glass Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-6xl mx-auto"
          >
            <GlassCard className="p-8">
              <ROICalculator />
            </GlassCard>
          </motion.div>
        </div>
      </section>

      {/* Voice Agent Demo - Modern Design */}
      <section className="bg-gray-950 py-32 relative overflow-hidden">
        <GradientOrbs />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                Experience It Live
              </h2>
              <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
                Call our AI receptionist right now. No demos, no sales pitch - just real conversation.
              </p>
              
              {/* Phone Card */}
              <GlassCard className="max-w-2xl mx-auto p-12">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-cyan-500 to-teal-500 mb-6">
                    <FaPhone className="text-3xl text-white animate-pulse" />
                  </div>
                  
                  <h3 className="text-2xl font-semibold text-white mb-2">Call Our AI</h3>
                  
                  <motion.a 
                    href="tel:+16163263328"
                    className="inline-block text-4xl font-bold bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent mb-4 hover:scale-105 transition-transform"
                  >
                    +1 616 326-3328
                  </motion.a>
                  
                  <p className="text-gray-400 text-sm">
                    Available 24/7 • Average wait time: 0.5 seconds
                  </p>
                  
                  {/* Live indicator */}
                  <div className="flex items-center justify-center gap-2 mt-6">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                    </span>
                    <span className="text-green-400 text-sm font-medium">Live Now</span>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          </div>
        </div>
      </section>




      {/* Results Section - Modern */}
      <section className="py-32 bg-gray-900 relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
            <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-green-400 text-sm font-medium">Proven Results</span>
              </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Real Impact, Real Growth
            </h2>
            <p className="text-xl text-gray-400">
              Numbers that speak for themselves
              </p>
            </motion.div>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
              <GlassCard className="h-full p-8 text-center">
                <div className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent mb-3">
                  10-20%
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Revenue Growth</h3>
                <p className="text-gray-400">Capture every opportunity, 24/7</p>
              </GlassCard>
              </motion.div>
            
              <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
            >
              <GlassCard className="h-full p-8 text-center">
                <div className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-3">
                  87%
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Booking Rate</h3>
                <p className="text-gray-400">Turn calls into customers</p>
              </GlassCard>
              </motion.div>
            
              <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
              <GlassCard className="h-full p-8 text-center">
                <div className="text-5xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent mb-3">
                  $45K
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Avg. Annual Return</h3>
                <p className="text-gray-400">Per business, guaranteed</p>
              </GlassCard>
              </motion.div>
          </div>
        </div>
      </section>


      {/* Process Section - Modern Timeline */}
      <section className="py-32 bg-gray-950 relative overflow-hidden">
        <GridPattern className="opacity-10" />
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Go Live in 48 Hours
            </h2>
            <p className="text-xl text-gray-400">
              From consultation to conversing with customers
            </p>
          </motion.div>
          
          <div className="max-w-5xl mx-auto">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-cyan-500/20 via-cyan-500/50 to-cyan-500/20 hidden md:block" />
              
              {/* Step 1 */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-center justify-between mb-16"
              >
                <div className="md:w-5/12 text-right md:pr-8">
                  <GlassCard className="p-6">
                    <h3 className="text-xl font-semibold text-white mb-2">Consultation</h3>
                    <p className="text-gray-400">Understand your needs, map your workflows, design your solution</p>
                  </GlassCard>
                </div>
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-full flex items-center justify-center text-white text-xl font-bold z-10 mx-auto">
                  1
                </div>
                <div className="md:w-5/12 md:pl-8">
                  <p className="text-cyan-400 font-medium">Day 1</p>
                </div>
              </motion.div>
              
              {/* Step 2 */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="flex items-center justify-between mb-16"
              >
                <div className="md:w-5/12 text-right md:pr-8">
                  <p className="text-purple-400 font-medium">Day 1-2</p>
                </div>
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-xl font-bold z-10 mx-auto">
                  2
                </div>
                <div className="md:w-5/12 md:pl-8">
                  <GlassCard className="p-6">
                    <h3 className="text-xl font-semibold text-white mb-2">Integration</h3>
                    <p className="text-gray-400">Connect to your calendar, CRM, and systems seamlessly</p>
                  </GlassCard>
                </div>
              </motion.div>
              
              {/* Step 3 */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex items-center justify-between"
              >
                <div className="md:w-5/12 text-right md:pr-8">
                  <GlassCard className="p-6">
                    <h3 className="text-xl font-semibold text-white mb-2">Launch</h3>
                    <p className="text-gray-400">Your AI is live! Start capturing every opportunity</p>
                  </GlassCard>
                </div>
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white text-xl font-bold z-10 mx-auto">
                  3
                </div>
                <div className="md:w-5/12 md:pl-8">
                  <p className="text-green-400 font-medium">Day 2</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>


      {/* FAQ Section - Modern */}
      <section className="py-32 bg-gray-900 relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Questions? Answered.
            </h2>
            <p className="text-xl text-gray-400">
              Everything you need to know to get started
            </p>
          </motion.div>
          
          <div className="max-w-4xl mx-auto">
            <div className="space-y-4">
              {[
                {
                  q: 'How quickly can I go live?',
                  a: 'Within 48 hours. We analyze, configure, and activate your AI receptionist in just 2 days.'
                },
                {
                  q: 'What languages are supported?',
                  a: 'Over 20 languages with native-level fluency. Your customers can speak their preferred language naturally.'
                },
                {
                  q: 'Will it work with my existing tools?',
                  a: 'Yes. Seamless integration with your CRM, calendar, and business systems via API or direct connection.'
                },
                {
                  q: 'What about data security?',
                  a: 'Enterprise-grade security. SOC 2 compliant, HIPAA ready, end-to-end encryption, and full data ownership.'
                }
              ].map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <GlassCard className="p-8">
                    <h3 className="text-xl font-semibold text-white mb-3 flex items-start">
                      <span className="text-cyan-400 mr-3">{index + 1}.</span>
                    {faq.q}
                  </h3>
                    <p className="text-gray-400 ml-7">
                    {faq.a}
                  </p>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section - Professional Enterprise */}
      <section className="relative py-32 bg-gradient-to-b from-gray-950 via-gray-900 to-black overflow-hidden">
        <GradientOrbs />

        {/* Tech Grid Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20" />
        </div>

        <div className="relative container mx-auto px-6 z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-5xl mx-auto text-center"
          >
            {/* Professional Headline */}
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8">
              <span className="block bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
                Transform Your
              </span>
              <span className="block bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                Customer Experience
              </span>
            </h2>
            <p className="text-xl md:text-2xl mb-16 text-gray-300 max-w-3xl mx-auto">
              Deploy enterprise-grade AI reception technology in 48 hours.
              <span className="block mt-2 text-gray-400">No infrastructure required. Immediate ROI.</span>
            </p>

            {/* Professional CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <motion.a
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                href="https://calendly.com/emrebenian-cogniaai/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold text-lg rounded-xl hover:shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300"
              >
                <span>Schedule Demo</span>
                <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 blur-xl opacity-40 group-hover:opacity-60 transition-opacity -z-10" />
              </motion.a>

              <div className="flex items-center gap-4">
                <span className="text-gray-500">or</span>
                <div className="flex flex-col items-start">
                  <span className="text-xs text-gray-500 uppercase tracking-wider mb-1">Experience Live AI</span>
                  <a
                    href="tel:+16163263328"
                    className="inline-flex items-center gap-2 text-cyan-400 font-semibold hover:text-cyan-300 transition-colors"
                  >
                    <FaPhone className="text-sm" />
                    <span>+1 616 326-3328</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Professional Trust Indicators */}
            <div className="mt-16 pt-8 border-t border-gray-800">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                <div>
                  <div className="text-2xl font-bold text-cyan-400">48h</div>
                  <div className="text-sm text-gray-500">Setup Time</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-400">20+</div>
                  <div className="text-sm text-gray-500">Languages</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-400">SOC2</div>
                  <div className="text-sm text-gray-500">Compliant</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-400">HIPAA</div>
                  <div className="text-sm text-gray-500">Ready</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
