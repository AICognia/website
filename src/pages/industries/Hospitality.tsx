import React from 'react';
import { FaHotel, FaConciergeBell, FaUtensils, FaCalendarCheck, FaPhone, FaComments, FaStar, FaGlobe, FaClipboardList, FaCheckCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import SEO from '../../components/SEO';
import DynamicTechBackground from '../../components/DynamicTechBackground';
import TechSection from '../../components/TechSection';
import TechCard from '../../components/TechCard';
import ScrollProgress from '../../components/ScrollProgress';

const Hospitality: React.FC = () => {
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
            <div className="max-w-4xl mx-auto text-center">
              {/* Badge */}
              <div className="inline-block px-3 py-1 bg-white/5 border border-white/10 rounded-full mb-6">
                <span className="text-xs text-gray-400 uppercase tracking-widest">
                  Hospitality Solutions
                </span>
              </div>

              {/* Headline */}
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-thin text-white mb-6">
                AI-Powered Guest
                <br />
                Experience Excellence
              </h1>

              <p className="text-lg text-gray-400 max-w-3xl mx-auto mb-8">
                Transform guest communication with intelligent AI receptionists designed for hotels, resorts, restaurants, and hospitality businesses.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://calendly.com/emrebenian-cogniaai/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white text-lg font-medium rounded-md transition-colors"
                >
                  Schedule Hospitality Demo
                </a>
                <a
                  href="tel:+16163263328"
                  className="flex items-center justify-center gap-3 px-8 py-4 border border-white/10 hover:bg-white/5 text-white text-lg font-medium rounded-md transition-colors"
                >
                  <FaPhone className="text-sm" />
                  +1 616-326-3328
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Key Features for Hospitality */}
        <TechSection
          badge="Features"
          title="Built for Hospitality Excellence"
          subtitle="AI solutions tailored to deliver exceptional guest experiences"
        >
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {[
              {
                icon: FaCalendarCheck,
                title: 'Reservation Management',
                description: 'Handle bookings, modifications, and cancellations automatically 24/7.'
              },
              {
                icon: FaConciergeBell,
                title: 'Concierge Services',
                description: 'Provide recommendations, arrange services, and answer guest inquiries instantly.'
              },
              {
                icon: FaGlobe,
                title: 'Multilingual Support',
                description: 'Communicate with international guests in over 30 languages automatically.'
              },
              {
                icon: FaPhone,
                title: '24/7 Guest Support',
                description: 'Never miss a booking or guest request with round-the-clock availability.'
              },
              {
                icon: FaComments,
                title: 'Guest Communications',
                description: 'Send confirmations, pre-arrival messages, and post-stay follow-ups.'
              },
              {
                icon: FaStar,
                title: 'Special Requests',
                description: 'Capture and route special occasions, dietary needs, and preferences.'
              }
            ].map((feature, index) => (
              <TechCard key={index}>
                <div className="text-center">
                  <div className="w-14 h-14 mx-auto mb-4 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center">
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
          title="Hospitality Businesses We Serve"
          subtitle="Specialized AI solutions for every hospitality segment"
        >
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: FaHotel,
                title: 'Hotels & Resorts',
                features: [
                  'Room reservations and upgrades',
                  'Check-in/check-out assistance',
                  'Amenity information and booking',
                  'Guest service requests'
                ]
              },
              {
                icon: FaUtensils,
                title: 'Restaurants & Dining',
                features: [
                  'Table reservations',
                  'Menu inquiries and dietary accommodations',
                  'Event and party bookings',
                  'Takeout and delivery coordination'
                ]
              },
              {
                icon: FaConciergeBell,
                title: 'Boutique Hotels',
                features: [
                  'Personalized guest experiences',
                  'Local recommendations',
                  'Special occasion arrangements',
                  'VIP guest services'
                ]
              },
              {
                icon: FaClipboardList,
                title: 'Event Venues',
                features: [
                  'Venue availability checks',
                  'Event planning consultations',
                  'Capacity and pricing inquiries',
                  'Vendor coordination'
                ]
              }
            ].map((useCase, index) => (
              <TechCard key={index}>
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
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
          title="Why Hospitality Leaders Choose Cognia AI"
          subtitle="Proven results for hotels and restaurants"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              { value: '45%', label: 'More Bookings', suffix: '↑' },
              { value: '24/7', label: 'Guest Access', suffix: '' },
              { value: '4.8', label: 'Average Rating', suffix: '★' },
              { value: '65%', label: 'Cost Savings', suffix: '↓' }
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
          title="Seamless System Integration"
          subtitle="Connect with your existing hospitality management systems"
        >
          <div className="max-w-4xl mx-auto">
            <TechCard>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-medium text-white mb-4">Hotel Systems</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2 text-gray-300 text-sm">
                      <FaCheckCircle className="flex-shrink-0 mt-0.5 text-white" />
                      <span>Property Management Systems (Opera, Cloudbeds)</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-300 text-sm">
                      <FaCheckCircle className="flex-shrink-0 mt-0.5 text-white" />
                      <span>Channel managers and OTAs</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-300 text-sm">
                      <FaCheckCircle className="flex-shrink-0 mt-0.5 text-white" />
                      <span>Point of Sale systems</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-300 text-sm">
                      <FaCheckCircle className="flex-shrink-0 mt-0.5 text-white" />
                      <span>Guest messaging platforms</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-medium text-white mb-4">Restaurant Systems</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2 text-gray-300 text-sm">
                      <FaCheckCircle className="flex-shrink-0 mt-0.5 text-white" />
                      <span>Reservation platforms (OpenTable, Resy)</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-300 text-sm">
                      <FaCheckCircle className="flex-shrink-0 mt-0.5 text-white" />
                      <span>POS systems (Toast, Square)</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-300 text-sm">
                      <FaCheckCircle className="flex-shrink-0 mt-0.5 text-white" />
                      <span>Delivery platforms</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-300 text-sm">
                      <FaCheckCircle className="flex-shrink-0 mt-0.5 text-white" />
                      <span>Loyalty and rewards programs</span>
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
          title="Ready to Elevate Guest Experience?"
          subtitle="Join leading hospitality brands using Cognia AI"
        >
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <a
                href="https://calendly.com/emrebenian-cogniaai/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white text-lg font-medium rounded-md transition-colors"
              >
                Schedule Hospitality Demo
              </a>
              <Link
                to="/solutions"
                className="px-8 py-4 border border-white/10 hover:bg-white/5 text-white text-lg font-medium rounded-md transition-colors"
              >
                View All Solutions
              </Link>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap justify-center items-center gap-6 text-xs text-gray-500">
              <span className="flex items-center gap-2">
                <FaCheckCircle />
                30+ Languages
              </span>
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
                Secure & Reliable
              </span>
            </div>
          </div>
        </TechSection>
      </div>
    </div>
  );
};

export default Hospitality;
