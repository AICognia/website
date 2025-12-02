import React from 'react';
import { FaCar, FaWrench, FaCalendarCheck, FaCarSide, FaPhone, FaClipboardList, FaTools, FaHandshake, FaMapMarkerAlt, FaCheckCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import SEO from '../../components/SEO';
import DynamicTechBackground from '../../components/DynamicTechBackground';
import TechSection from '../../components/TechSection';
import TechCard from '../../components/TechCard';
import ScrollProgress from '../../components/ScrollProgress';

const Automotive: React.FC = () => {
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
                  Automotive Solutions
                </span>
              </div>

              {/* Headline */}
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-thin text-white mb-6">
                AI-Powered Service
                <br />
                for Automotive Industry
              </h1>

              <p className="text-lg text-gray-400 max-w-3xl mx-auto mb-8">
                Transform customer communication with intelligent AI receptionists designed for dealerships, service centers, auto repair shops, and automotive businesses.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://calendly.com/emrebenian-cogniaai/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white text-lg font-medium rounded-md transition-colors"
                >
                  Schedule Automotive Demo
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

        {/* Key Features for Automotive */}
        <TechSection
          badge="Features"
          title="Built for Automotive Excellence"
          subtitle="AI solutions tailored to dealerships and service centers"
        >
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {[
              {
                icon: FaCalendarCheck,
                title: 'Service Scheduling',
                description: 'Automatically book oil changes, repairs, and maintenance appointments 24/7.'
              },
              {
                icon: FaWrench,
                title: 'Service Reminders',
                description: 'Send automated maintenance reminders based on mileage and time intervals.'
              },
              {
                icon: FaCarSide,
                title: 'Sales Inquiries',
                description: 'Answer questions about inventory, pricing, financing, and test drives instantly.'
              },
              {
                icon: FaPhone,
                title: '24/7 Availability',
                description: 'Never miss a service booking or sales lead with round-the-clock support.'
              },
              {
                icon: FaClipboardList,
                title: 'Customer Check-ins',
                description: 'Streamline drop-off and pickup coordination for service appointments.'
              },
              {
                icon: FaTools,
                title: 'Parts & Warranty',
                description: 'Handle parts inquiries, warranty questions, and recall information.'
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
          title="Automotive Businesses We Serve"
          subtitle="Specialized AI solutions for every automotive segment"
        >
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: FaCar,
                title: 'Car Dealerships',
                features: [
                  'New and used vehicle inquiries',
                  'Test drive scheduling',
                  'Trade-in assessments',
                  'Financing and lease information'
                ]
              },
              {
                icon: FaWrench,
                title: 'Service Centers',
                features: [
                  'Maintenance appointment booking',
                  'Service status updates',
                  'Estimate approvals',
                  'Warranty claim processing'
                ]
              },
              {
                icon: FaTools,
                title: 'Auto Repair Shops',
                features: [
                  'Diagnostic consultations',
                  'Repair scheduling',
                  'Parts availability checks',
                  'Customer vehicle history'
                ]
              },
              {
                icon: FaHandshake,
                title: 'Fleet Services',
                features: [
                  'Fleet maintenance scheduling',
                  'Multi-vehicle coordination',
                  'Service reporting',
                  'Emergency roadside assistance'
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
          title="Why Automotive Leaders Choose Cognia AI"
          subtitle="Proven results for dealerships and service centers"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              { value: '55%', label: 'More Appointments', suffix: '↑' },
              { value: '24/7', label: 'Customer Access', suffix: '' },
              { value: '40%', label: 'Faster Response', suffix: '↑' },
              { value: '75%', label: 'Cost Savings', suffix: '↓' }
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
          title="Seamless DMS Integration"
          subtitle="Connect with your existing automotive systems"
        >
          <div className="max-w-4xl mx-auto">
            <TechCard>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-medium text-white mb-4">Dealership Systems</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2 text-gray-300 text-sm">
                      <FaCheckCircle className="flex-shrink-0 mt-0.5 text-white" />
                      <span>Dealer Management Systems (DMS)</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-300 text-sm">
                      <FaCheckCircle className="flex-shrink-0 mt-0.5 text-white" />
                      <span>CDK Global, Reynolds & Reynolds</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-300 text-sm">
                      <FaCheckCircle className="flex-shrink-0 mt-0.5 text-white" />
                      <span>Inventory management systems</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-300 text-sm">
                      <FaCheckCircle className="flex-shrink-0 mt-0.5 text-white" />
                      <span>Lead management platforms</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-medium text-white mb-4">Service Systems</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2 text-gray-300 text-sm">
                      <FaCheckCircle className="flex-shrink-0 mt-0.5 text-white" />
                      <span>Service scheduling software</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-300 text-sm">
                      <FaCheckCircle className="flex-shrink-0 mt-0.5 text-white" />
                      <span>Parts ordering systems</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-300 text-sm">
                      <FaCheckCircle className="flex-shrink-0 mt-0.5 text-white" />
                      <span>Customer relationship management</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-300 text-sm">
                      <FaCheckCircle className="flex-shrink-0 mt-0.5 text-white" />
                      <span>Warranty management systems</span>
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
          title="Ready to Transform Your Automotive Business?"
          subtitle="Join leading dealerships using Cognia AI"
        >
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <a
                href="https://calendly.com/emrebenian-cogniaai/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white text-lg font-medium rounded-md transition-colors"
              >
                Schedule Automotive Demo
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
                DMS Integration
              </span>
              <span className="flex items-center gap-2">
                <FaCheckCircle />
                24/7 Support
              </span>
              <span className="flex items-center gap-2">
                <FaCheckCircle />
                Easy Setup
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

export default Automotive;
