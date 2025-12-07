import React from 'react';
import { FaStore, FaShoppingCart, FaBoxOpen, FaHeadset, FaPhone, FaCreditCard, FaTruck, FaUndo, FaPercentage, FaCheckCircle, FaCalendarCheck, FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import SEO from '../../components/SEO';
import DynamicTechBackground from '../../components/DynamicTechBackground';
import TechSection from '../../components/TechSection';
import TechCard from '../../components/TechCard';
import ScrollProgress from '../../components/ScrollProgress';

const Retail: React.FC = () => {

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <ScrollProgress />

      {/* Dynamic Background */}
      <div className="fixed inset-0 z-0">
        <DynamicTechBackground />
      </div>

      <div className="relative z-10">
        <SEO page="solutions" />

        {/* Hero Section */}
        <section className="relative py-32">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left - Content */}
              <div>
                {/* Badge */}
                <div className="inline-block px-3 py-1 bg-white/5 border border-white/10 rounded-full mb-6">
                  <span className="text-xs text-gray-400 uppercase tracking-widest">
                    Retail Solutions
                  </span>
                </div>

                {/* Headline */}
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-thin text-white mb-6">
                  AI-Powered Customer
                  <br />
                  Experience for Retail
                </h1>

                <p className="text-lg text-gray-400 max-w-xl mb-8">
                  Transform customer service with intelligent AI receptionists designed for retail stores, e-commerce businesses, and multi-location retailers.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    to="/demo"
                    className="flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-lg font-semibold rounded-xl transition-all shadow-lg shadow-cyan-500/25"
                  >
                    <FaCalendarCheck />
                    Schedule Retail Demo
                    <FaArrowRight className="text-sm" />
                  </Link>
                  <a
                    href="tel:+16163263328"
                    className="flex items-center justify-center gap-3 px-8 py-4 border border-white/20 hover:bg-white/5 text-white text-lg font-medium rounded-md transition-colors"
                  >
                    <FaPhone className="text-sm" />
                    +1 616-326-3328
                  </a>
                </div>
              </div>

              {/* Right - Retail Icons Animation */}
              <div className="relative hidden lg:flex items-center justify-center">
                <div className="relative w-[500px] h-[500px]">
                  {/* Background glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-3xl" />

                  {/* Animated Retail Icons */}
                  <div className="relative w-full h-full flex items-center justify-center">
                    {/* Central Store Icon */}
                    <div className="absolute w-32 h-32 bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl flex items-center justify-center animate-pulse">
                      <FaStore className="text-6xl text-purple-400" />
                    </div>

                    {/* Orbiting Icons */}
                    {[
                      { icon: FaShoppingCart, delay: 0 },
                      { icon: FaBoxOpen, delay: 1 },
                      { icon: FaCreditCard, delay: 2 },
                      { icon: FaTruck, delay: 3 },
                      { icon: FaUndo, delay: 4 },
                      { icon: FaPercentage, delay: 5 }
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="absolute w-16 h-16 bg-white/5 backdrop-blur-sm border border-purple-500/20 rounded-2xl flex items-center justify-center"
                        style={{
                          animation: `orbit 20s linear infinite`,
                          animationDelay: `${item.delay * -3.33}s`,
                          transformOrigin: '250px 250px'
                        }}
                      >
                        <item.icon className="text-2xl text-purple-400" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <style>{`
            @keyframes orbit {
              from {
                transform: rotate(0deg) translateX(200px) rotate(0deg);
              }
              to {
                transform: rotate(360deg) translateX(200px) rotate(-360deg);
              }
            }
          `}</style>
        </section>

        {/* Key Features for Retail */}
        <TechSection
          badge="Features"
          title="Built for Retail Success"
          subtitle="AI solutions tailored to modern retail businesses"
        >
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {[
              {
                icon: FaHeadset,
                title: '24/7 Customer Support',
                description: 'Handle customer inquiries, product questions, and support requests around the clock.'
              },
              {
                icon: FaBoxOpen,
                title: 'Order Management',
                description: 'Track orders, process returns, and provide shipping updates automatically.'
              },
              {
                icon: FaShoppingCart,
                title: 'Product Information',
                description: 'Instantly answer questions about inventory, pricing, sizes, and availability.'
              },
              {
                icon: FaPhone,
                title: 'Multi-Channel Support',
                description: 'Consistent experience across phone, web chat, and SMS channels.'
              },
              {
                icon: FaCreditCard,
                title: 'Payment & Checkout',
                description: 'Assist with payment processing, discount codes, and checkout issues.'
              },
              {
                icon: FaTruck,
                title: 'Delivery Coordination',
                description: 'Schedule deliveries, confirm addresses, and update delivery windows.'
              }
            ].map((feature, index) => (
              <TechCard key={index}>
                <div className="text-center">
                  <div className="w-14 h-14 mx-auto mb-4 bg-white/5 border border-white/20 rounded-xl flex items-center justify-center">
                    <feature.icon className="text-2xl text-white" />
                  </div>
                  <h3 className="text-xl font-medium text-white mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-400">{feature.description}</p>
                </div>
              </TechCard>
            ))}
          </div>
        </TechSection>

        {/* Use Cases */}
        <TechSection
          badge="Use Cases"
          title="Retail Businesses We Serve"
          subtitle="Specialized AI solutions for every type of retail operation"
        >
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: FaStore,
                title: 'Brick & Mortar Stores',
                features: [
                  'Store hours and location information',
                  'Product availability checks',
                  'In-store pickup coordination',
                  'Event and promotion announcements'
                ]
              },
              {
                icon: FaShoppingCart,
                title: 'E-Commerce Businesses',
                features: [
                  'Order status and tracking',
                  'Return and refund processing',
                  'Product recommendations',
                  'Account assistance'
                ]
              },
              {
                icon: FaBoxOpen,
                title: 'Multi-Location Retailers',
                features: [
                  'Store finder and directions',
                  'Inventory check across locations',
                  'Transfer requests',
                  'Regional promotions'
                ]
              },
              {
                icon: FaPercentage,
                title: 'Specialty Retailers',
                features: [
                  'Expert product guidance',
                  'Custom order management',
                  'Loyalty program support',
                  'Personalized shopping assistance'
                ]
              }
            ].map((useCase, index) => (
              <TechCard key={index}>
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/20 flex items-center justify-center shrink-0">
                    <useCase.icon className="text-xl text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-medium text-white mb-4">{useCase.title}</h3>
                  </div>
                </div>
                <ul className="space-y-2">
                  {useCase.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-gray-300 text-sm">
                      <FaCheckCircle className="flex-shrink-0 mt-0.5 text-white" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </TechCard>
            ))}
          </div>
        </TechSection>

        {/* Benefits */}
        <TechSection
          badge="Benefits"
          title="Why Retailers Choose Cognia AI"
          subtitle="Proven results for retail businesses"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              { value: '50%', label: 'Faster Response Time', suffix: '↑' },
              { value: '24/7', label: 'Customer Access', suffix: '' },
              { value: '35%', label: 'Higher Conversion', suffix: '↑' },
              { value: '80%', label: 'Cost Reduction', suffix: '↓' }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl sm:text-5xl font-bold text-white mb-2">
                  {stat.value}
                  {stat.suffix && <span className="text-2xl ml-1">{stat.suffix}</span>}
                </div>
                <div className="text-xs sm:text-sm text-gray-400">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </TechSection>

        {/* Integration Section */}
        <TechSection
          badge="Integrations"
          title="Seamless Platform Integration"
          subtitle="Connect with your existing retail systems"
        >
          <div className="max-w-4xl mx-auto">
            <TechCard>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-medium text-white mb-4">E-Commerce Platforms</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2 text-gray-300 text-sm">
                      <FaCheckCircle className="flex-shrink-0 mt-0.5 text-white" />
                      <span>Shopify, WooCommerce, Magento</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-300 text-sm">
                      <FaCheckCircle className="flex-shrink-0 mt-0.5 text-white" />
                      <span>BigCommerce, Salesforce Commerce</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-300 text-sm">
                      <FaCheckCircle className="flex-shrink-0 mt-0.5 text-white" />
                      <span>Custom e-commerce solutions</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-300 text-sm">
                      <FaCheckCircle className="flex-shrink-0 mt-0.5 text-white" />
                      <span>Marketplace integrations (Amazon, eBay)</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-medium text-white mb-4">Retail Systems</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2 text-gray-300 text-sm">
                      <FaCheckCircle className="flex-shrink-0 mt-0.5 text-white" />
                      <span>Point of Sale (POS) systems</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-300 text-sm">
                      <FaCheckCircle className="flex-shrink-0 mt-0.5 text-white" />
                      <span>Inventory management systems</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-300 text-sm">
                      <FaCheckCircle className="flex-shrink-0 mt-0.5 text-white" />
                      <span>Customer loyalty programs</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-300 text-sm">
                      <FaCheckCircle className="flex-shrink-0 mt-0.5 text-white" />
                      <span>Shipping and logistics platforms</span>
                    </li>
                  </ul>
                </div>
              </div>
            </TechCard>
          </div>
        </TechSection>

        {/* CTA Section */}
        <TechSection
          badge="Get Started"
          title="Ready to Transform Your Retail Business?"
          subtitle="Join hundreds of retailers using Cognia AI"
        >
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <Link
                to="/demo"
                className="flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-lg font-semibold rounded-xl transition-all shadow-lg shadow-cyan-500/25"
              >
                <FaCalendarCheck />
                Schedule Retail Demo
                <FaArrowRight className="text-sm" />
              </Link>
              <Link
                to="/solutions"
                className="px-8 py-4 border border-white/20 hover:bg-white/5 text-white text-lg font-medium rounded-md transition-colors"
              >
                View All Solutions
              </Link>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap justify-center items-center gap-6 text-xs text-gray-500">
              <span className="flex items-center gap-2">
                <FaCheckCircle />
                24/7 Support
              </span>
              <span className="flex items-center gap-2">
                <FaCheckCircle />
                Easy Integration
              </span>
              <span className="flex items-center gap-2">
                <FaCheckCircle />
                Multi-Channel
              </span>
              <span className="flex items-center gap-2">
                <FaCheckCircle />
                Scalable Solution
              </span>
            </div>
          </div>
        </TechSection>
      </div>
    </div>
  );
};

export default Retail;
