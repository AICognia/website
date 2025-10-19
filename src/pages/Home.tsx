import React from 'react';
import { motion } from 'framer-motion';
import { FaArrowRight, FaPhone, FaCheckCircle } from 'react-icons/fa';
import SEO from '../components/SEO';
import ROICalculator from '../components/ROICalculator';
import { structuredDataTemplates } from '../config/seoConfig';
import GradientOrbs from '../components/GradientOrbs';
import GridPattern from '../components/GridPattern';
import GlassCard from '../components/GlassCard';
import ParticleNetwork from '../components/ParticleNetwork';
import NoiseTexture from '../components/NoiseTexture';
import ScrollProgress from '../components/ScrollProgress';

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
      
      {/* Hero Section - Ultra Modern Design */}
      <section className="relative min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-white overflow-hidden flex items-center">
        {/* Particle Network Background */}
        <div className="absolute inset-0 opacity-50">
          <ParticleNetwork />
        </div>
        
        {/* Grid Pattern */}
        <GridPattern className="opacity-10" />
        
        {/* Gradient Orbs */}
        <GradientOrbs />
        
        <div className="relative container mx-auto px-6 py-20">
          {/* Main Content */}
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-center"
            >
              {/* Badge */}
          <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-8"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                </span>
                <span className="text-cyan-300 text-sm font-medium">AI-Powered Reception</span>
              </motion.div>
              
              {/* Main Headline */}
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-8">
                <span className="block bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent">
                  Never Miss
                </span>
                <span className="block bg-gradient-to-r from-cyan-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
                  Another Call
                </span>
              </h1>
              
              {/* Subheadline */}
              <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed">
                AI receptionist that answers instantly and schedules appointments 24/7.
              </p>
              
              {/* Stats Row */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto mb-12"
              >
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-1">0.5s</div>
                  <div className="text-sm text-gray-500">Response Time</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-1">24/7</div>
                  <div className="text-sm text-gray-500">Availability</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-1">87%</div>
                  <div className="text-sm text-gray-500">Booking Rate</div>
            </div>
          </motion.div>
              
              {/* CTAs */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
              <a 
                href="https://calendly.com/emrebenian-cogniaai/30min"
                target="_blank"
                rel="noopener noreferrer"
                  className="group relative inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-teal-500 text-white font-semibold rounded-xl hover:shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300 hover:scale-105"
              >
                  <span>Start Free Trial</span>
                  <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-400 to-teal-400 blur-xl opacity-50 group-hover:opacity-75 transition-opacity -z-10" />
              </a>
                
                <div className="flex flex-col items-center gap-2">
                  <span className="text-sm text-gray-400">Try our AI</span>
                  <a
                    href="tel:+16163263328"
                    className="group inline-flex items-center gap-2 px-8 py-4 bg-white/5 backdrop-blur-xl border border-white/10 text-white font-semibold rounded-xl hover:bg-white/10 transition-all duration-300"
                  >
                    <FaPhone className="text-cyan-400" />
                    <span>+1 616 326-3328</span>
                  </a>
                </div>
              </motion.div>
            </motion.div>
            </div>
        </div>
      </section>


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

      {/* Final CTA Section - Modern */}
      <section className="relative py-32 bg-gradient-to-b from-gray-950 via-gray-900 to-black overflow-hidden">
        <GradientOrbs />
        
        <div className="relative container mx-auto px-6 z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
              <span className="block bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                Ready to
              </span>
              <span className="block bg-gradient-to-r from-cyan-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
                10x Your Business?
              </span>
            </h2>
            <p className="text-xl md:text-2xl mb-12 text-gray-400">
              Join 1,000+ businesses capturing every opportunity
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.a 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="https://calendly.com/emrebenian-cogniaai/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-cyan-500 to-teal-500 text-white font-semibold text-lg rounded-xl hover:shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300"
              >
                <span>Get Started Now</span>
                <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-400 to-teal-400 blur-xl opacity-50 group-hover:opacity-75 transition-opacity -z-10" />
              </motion.a>
              
              <div className="text-gray-500 px-4">or</div>
              
              <a
                href="tel:+16163263328"
                className="inline-flex items-center gap-3 px-8 py-4 text-gray-300 font-medium hover:text-white transition-colors"
              >
                <FaPhone className="text-cyan-400" />
                <span>Call us at +1 616 326-3328</span>
              </a>
            </div>
            
            {/* Trust Badges */}
            <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <FaCheckCircle className="text-green-500" />
                <span>Free Setup</span>
              </div>
              <div className="flex items-center gap-2">
                <FaCheckCircle className="text-green-500" />
                <span>No Credit Card</span>
              </div>
              <div className="flex items-center gap-2">
                <FaCheckCircle className="text-green-500" />
                <span>Cancel Anytime</span>
              </div>
              <div className="flex items-center gap-2">
                <FaCheckCircle className="text-green-500" />
                <span>ROI Guaranteed</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
