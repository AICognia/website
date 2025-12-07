import React from 'react';
import { FaHome, FaWrench, FaCalendarCheck, FaPhone, FaClipboardList, FaTools, FaHandshake, FaCheckCircle, FaPlug, FaSnowflake, FaFaucet, FaLeaf, FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import SEO from '../../components/SEO';
import DynamicTechBackground from '../../components/DynamicTechBackground';
import TechSection from '../../components/TechSection';
import TechCard from '../../components/TechCard';
import ScrollProgress from '../../components/ScrollProgress';
import { useLeadCapture } from '../../contexts/LeadCaptureContext';

const HomeServices: React.FC = () => {
  const { openLeadCapture } = useLeadCapture();

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
                  Home Services Solutions
                </span>
              </div>

              {/* Headline */}
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-thin text-white mb-6">
                AI-Powered Service
                <br />
                for Home Services
              </h1>

              <p className="text-lg text-gray-400 max-w-3xl mx-auto mb-8">
                Transform customer communication with intelligent AI receptionists designed for plumbers, electricians, HVAC technicians, landscapers, and home service professionals.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => openLeadCapture('home_services_hero')}
                  className="flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-lg font-semibold rounded-xl transition-all shadow-lg shadow-cyan-500/25"
                >
                  <FaCalendarCheck />
                  Schedule Home Services Demo
                  <FaArrowRight className="text-sm" />
                </button>
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

        {/* Key Features for Home Services */}
        <TechSection
          badge="Features"
          title="Built for Home Service Excellence"
          subtitle="AI solutions tailored to contractors and service professionals"
        >
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {[
              {
                icon: FaCalendarCheck,
                title: 'Service Scheduling',
                description: 'Automatically book repair calls, installations, and maintenance appointments 24/7.'
              },
              {
                icon: FaClipboardList,
                title: 'Emergency Dispatch',
                description: 'Route urgent calls to on-call technicians for burst pipes, electrical issues, and HVAC emergencies.'
              },
              {
                icon: FaPhone,
                title: '24/7 Availability',
                description: 'Never miss an emergency call or new lead with round-the-clock AI answering.'
              },
              {
                icon: FaWrench,
                title: 'Job Estimates',
                description: 'Provide instant ballpark estimates and schedule in-person assessments.'
              },
              {
                icon: FaTools,
                title: 'Follow-up Reminders',
                description: 'Send automated reminders for maintenance, seasonal check-ups, and service renewals.'
              },
              {
                icon: FaHandshake,
                title: 'Customer Support',
                description: 'Answer common questions about services, pricing, and availability instantly.'
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
          title="Home Service Businesses We Serve"
          subtitle="Specialized AI solutions for every home service segment"
        >
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: FaFaucet,
                title: 'Plumbing Services',
                features: [
                  'Emergency leak and burst pipe calls',
                  'Drain cleaning scheduling',
                  'Water heater installations',
                  'Bathroom and kitchen renovations'
                ]
              },
              {
                icon: FaPlug,
                title: 'Electrical Services',
                features: [
                  'Panel upgrades and installations',
                  'Emergency power outage calls',
                  'Lighting and outlet repairs',
                  'EV charger installations'
                ]
              },
              {
                icon: FaSnowflake,
                title: 'HVAC Services',
                features: [
                  'AC and heating repairs',
                  'Seasonal maintenance scheduling',
                  'New system installations',
                  'Emergency breakdown response'
                ]
              },
              {
                icon: FaLeaf,
                title: 'Landscaping & Lawn Care',
                features: [
                  'Weekly mowing schedules',
                  'Seasonal cleanup bookings',
                  'Irrigation system services',
                  'Hardscaping consultations'
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
          title="Why Home Service Pros Choose Cognia AI"
          subtitle="Proven results for contractors and service businesses"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              { value: '60%', label: 'More Bookings', suffix: '↑' },
              { value: '24/7', label: 'Emergency Coverage', suffix: '' },
              { value: '45%', label: 'Faster Response', suffix: '↑' },
              { value: '70%', label: 'Cost Savings', suffix: '↓' }
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
          title="Seamless Software Integration"
          subtitle="Connect with your existing field service tools"
        >
          <div className="max-w-4xl mx-auto">
            <TechCard>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-medium text-white mb-4">Field Service Software</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2 text-gray-300 text-sm">
                      <FaCheckCircle className="flex-shrink-0 mt-0.5 text-white" />
                      <span>ServiceTitan integration</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-300 text-sm">
                      <FaCheckCircle className="flex-shrink-0 mt-0.5 text-white" />
                      <span>Housecall Pro compatibility</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-300 text-sm">
                      <FaCheckCircle className="flex-shrink-0 mt-0.5 text-white" />
                      <span>Jobber and ServiceM8</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-300 text-sm">
                      <FaCheckCircle className="flex-shrink-0 mt-0.5 text-white" />
                      <span>QuickBooks and invoicing tools</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-medium text-white mb-4">Communication Tools</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2 text-gray-300 text-sm">
                      <FaCheckCircle className="flex-shrink-0 mt-0.5 text-white" />
                      <span>Google Calendar sync</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-300 text-sm">
                      <FaCheckCircle className="flex-shrink-0 mt-0.5 text-white" />
                      <span>SMS and email notifications</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-300 text-sm">
                      <FaCheckCircle className="flex-shrink-0 mt-0.5 text-white" />
                      <span>CRM platforms</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-300 text-sm">
                      <FaCheckCircle className="flex-shrink-0 mt-0.5 text-white" />
                      <span>Dispatch and routing software</span>
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
          title="Ready to Transform Your Home Service Business?"
          subtitle="Join leading contractors using Cognia AI"
        >
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <button
                onClick={() => openLeadCapture('home_services_cta')}
                className="flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-lg font-semibold rounded-xl transition-all shadow-lg shadow-cyan-500/25"
              >
                <FaCalendarCheck />
                Schedule Home Services Demo
                <FaArrowRight className="text-sm" />
              </button>
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
                Emergency Dispatch
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

export default HomeServices;
