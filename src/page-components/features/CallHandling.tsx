import React from 'react';
import { FaPhone, FaClock, FaBell, FaHeadset, FaCheckCircle, FaChartLine, FaShieldAlt, FaRobot, FaCalendarCheck, FaArrowRight } from 'react-icons/fa';
import Link from 'next/link';
import { motion } from 'framer-motion';
import SEO from '../../components/SEO';
import DynamicTechBackground from '../../components/DynamicTechBackground';
import TechSection from '../../components/TechSection';
import TechCard from '../../components/TechCard';
const CallHandling: React.FC = () => {

  return (
    <div className="min-h-screen bg-transparent text-gray-900 relative overflow-hidden">

      <div className="fixed inset-0 z-0">
        <DynamicTechBackground />
      </div>

      <div className="relative z-10">
        <SEO page="solutions" />

        <section className="relative py-16 sm:py-24 lg:py-32">
          <div className="w-full max-w-none px-4 sm:px-6 md:px-8 lg:px-0 lg:max-w-[1060px] mx-auto pt-24 sm:pt-20 md:pt-16 lg:pt-0">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-block px-3 py-1 bg-gray-50 border border-gray-200 rounded-full mb-4 sm:mb-6">
                <span className="text-xs text-[rgba(49,45,43,0.70)] uppercase tracking-widest">
                  Feature
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-thin text-[#37322F] mb-4 sm:mb-6">
                24/7 Call Handling
                <br />
                Never Miss a Call
              </h1>

              <p className="text-base sm:text-lg text-[rgba(49,45,43,0.70)] max-w-3xl mx-auto mb-6 sm:mb-8 px-2 sm:px-0">
                Intelligent AI receptionists that answer every call, day or night. Ensure your business is always available to customers with round-the-clock call handling.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4 sm:px-0">
                <Link
                  href="/demo"
                  className="flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-primary to-blue-600 hover:from-primary-light hover:to-blue-500 text-white text-base sm:text-lg font-semibold rounded-xl transition-all shadow-lg shadow-primary/25 w-full sm:w-auto"
                >
                  <FaCalendarCheck />
                  Schedule Demo
                </Link>
                <a
                  href="tel:+16163263328"
                  className="flex items-center justify-center gap-3 px-6 sm:px-8 py-3 sm:py-4 border border-gray-200 hover:bg-gray-50 text-white text-base sm:text-lg font-medium rounded-md transition-colors w-full sm:w-auto"
                >
                  <FaPhone className="text-sm" />
                  +1 616-326-3328
                </a>
              </div>
            </div>
          </div>
        </section>

        <TechSection
          badge="Capabilities"
          title="Always-On Call Management"
          subtitle="Professional call handling that never sleeps"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-7xl mx-auto">
            {[
              {
                icon: FaClock,
                title: 'True 24/7 Availability',
                description: 'Handle calls at any hour, including nights, weekends, and holidays without extra staffing costs.'
              },
              {
                icon: FaRobot,
                title: 'Instant Response',
                description: 'Answer calls in under 2 seconds with no hold times or waiting queues.'
              },
              {
                icon: FaBell,
                title: 'Overflow Protection',
                description: 'Handle unlimited simultaneous calls during peak hours and busy periods.'
              },
              {
                icon: FaHeadset,
                title: 'Professional Greeting',
                description: 'Customized greetings and messaging that match your brand voice.'
              },
              {
                icon: FaShieldAlt,
                title: 'Call Screening',
                description: 'Filter spam, qualify leads, and route urgent calls to the right team member.'
              },
              {
                icon: FaChartLine,
                title: 'Call Analytics',
                description: 'Track call volume, peak hours, common questions, and conversation outcomes.'
              }
            ].map((feature, index) => (
              <TechCard key={index}>
                <div className="text-center">
                  <div className="w-10 h-10 sm:w-14 sm:h-14 mx-auto mb-3 sm:mb-4 bg-gray-50 border border-gray-200 rounded-xl flex items-center justify-center">
                    <feature.icon className="text-xl sm:text-2xl text-white" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-medium text-[#37322F] mb-2">{feature.title}</h3>
                  <p className="text-xs sm:text-sm text-[rgba(49,45,43,0.70)]">{feature.description}</p>
                </div>
              </TechCard>
            ))}
          </div>
        </TechSection>

        <TechSection
          badge="Process"
          title="How 24/7 Call Handling Works"
          subtitle="Seamless automation from first ring to resolution"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8 max-w-6xl mx-auto">
            {[
              {
                step: '01',
                title: 'Incoming Call',
                description: 'Customer calls your business number at any time of day or night. AI receptionist answers instantly.'
              },
              {
                step: '02',
                title: 'Intelligent Conversation',
                description: 'Natural language AI engages with the caller, understands their needs, and asks relevant questions.'
              },
              {
                step: '03',
                title: 'Action & Routing',
                description: 'Based on the conversation, AI takes action: books appointments, answers FAQs, or routes to human staff.'
              },
              {
                step: '04',
                title: 'Follow-Up & Analytics',
                description: 'Automated follow-up messages sent, call logged with full transcript, and insights generated.'
              }
            ].map((item, index) => (
              <TechCard key={index}>
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="text-2xl sm:text-4xl font-thin text-white/20">{item.step}</div>
                  <div className="flex-1">
                    <h3 className="text-lg sm:text-xl font-medium text-[#37322F] mb-2 sm:mb-3">{item.title}</h3>
                    <p className="text-xs sm:text-sm text-[rgba(49,45,43,0.70)]">{item.description}</p>
                  </div>
                </div>
              </TechCard>
            ))}
          </div>
        </TechSection>

        <TechSection
          badge="Benefits"
          title="Why Choose 24/7 Call Handling"
          subtitle="Transform your customer experience and business operations"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-6xl mx-auto">
            {[
              { value: '0%', label: 'Missed Calls', suffix: '' },
              { value: '24/7', label: 'Availability', suffix: '' },
              { value: '90%', label: 'Cost Reduction', suffix: '↓' },
              { value: '< 2s', label: 'Response Time', suffix: '' }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl sm:text-4xl lg:text-5xl font-bold text-[#37322F] mb-1 sm:mb-2">
                  {stat.value}
                  {stat.suffix && <span className="text-lg sm:text-2xl ml-1">{stat.suffix}</span>}
                </div>
                <div className="text-xs sm:text-sm text-[rgba(49,45,43,0.70)]">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </TechSection>

        <TechSection
          badge="Applications"
          title="Perfect For"
          subtitle="Industries that benefit from 24/7 call handling"
        >
          <div className="max-w-4xl mx-auto">
            <TechCard>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                <div>
                  <h3 className="text-lg sm:text-xl font-medium text-[#37322F] mb-3 sm:mb-4">Service Businesses</h3>
                  <ul className="space-y-2 sm:space-y-3">
                    <li className="flex items-start gap-2 text-gray-300 text-xs sm:text-sm">
                      <FaCheckCircle className="flex-shrink-0 mt-0.5 text-white" />
                      <span>Emergency services and on-call support</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-300 text-xs sm:text-sm">
                      <FaCheckCircle className="flex-shrink-0 mt-0.5 text-white" />
                      <span>Healthcare and medical practices</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-300 text-xs sm:text-sm">
                      <FaCheckCircle className="flex-shrink-0 mt-0.5 text-white" />
                      <span>Property management and maintenance</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-300 text-xs sm:text-sm">
                      <FaCheckCircle className="flex-shrink-0 mt-0.5 text-white" />
                      <span>Automotive and roadside assistance</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-medium text-[#37322F] mb-3 sm:mb-4">Customer-Facing Businesses</h3>
                  <ul className="space-y-2 sm:space-y-3">
                    <li className="flex items-start gap-2 text-gray-300 text-xs sm:text-sm">
                      <FaCheckCircle className="flex-shrink-0 mt-0.5 text-white" />
                      <span>E-commerce and online retailers</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-300 text-xs sm:text-sm">
                      <FaCheckCircle className="flex-shrink-0 mt-0.5 text-white" />
                      <span>Hospitality and hotels</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-300 text-xs sm:text-sm">
                      <FaCheckCircle className="flex-shrink-0 mt-0.5 text-white" />
                      <span>Financial services and banking</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-300 text-xs sm:text-sm">
                      <FaCheckCircle className="flex-shrink-0 mt-0.5 text-white" />
                      <span>Professional services and consulting</span>
                    </li>
                  </ul>
                </div>
              </div>
            </TechCard>
          </div>
        </TechSection>

        <TechSection
          badge="Get Started"
          title="Ready for 24/7 Availability?"
          subtitle="Never miss another customer call"
        >
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-0">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-6 sm:mb-8">
              <Link
                href="/demo"
                className="flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-primary to-blue-600 hover:from-primary-light hover:to-blue-500 text-white text-base sm:text-lg font-semibold rounded-xl transition-all shadow-lg shadow-primary/25 w-full sm:w-auto"
              >
                <FaCalendarCheck />
                Schedule Demo
              </Link>
              <Link
                href="/solutions"
                className="px-6 sm:px-8 py-3 sm:py-4 border border-gray-200 hover:bg-gray-50 text-white text-base sm:text-lg font-medium rounded-md transition-colors w-full sm:w-auto text-center"
              >
                View All Features
              </Link>
            </div>

            <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-6 text-xs text-gray-500">
              <span className="flex items-center gap-2">
                <FaCheckCircle />
                24/7 Availability
              </span>
              <span className="flex items-center gap-2">
                <FaCheckCircle />
                Unlimited Calls
              </span>
              <span className="flex items-center gap-2">
                <FaCheckCircle />
                Instant Setup
              </span>
              <span className="flex items-center gap-2">
                <FaCheckCircle />
                No Extra Costs
              </span>
            </div>
          </div>
        </TechSection>
      </div>
    </div>
  );
};

export default CallHandling;
