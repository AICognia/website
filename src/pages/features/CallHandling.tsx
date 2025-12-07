import React from 'react';
import { FaPhone, FaClock, FaBell, FaHeadset, FaCheckCircle, FaChartLine, FaShieldAlt, FaRobot, FaCalendarCheck, FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLeadCapture } from '../../contexts/LeadCaptureContext';
import SEO from '../../components/SEO';
import DynamicTechBackground from '../../components/DynamicTechBackground';
import TechSection from '../../components/TechSection';
import TechCard from '../../components/TechCard';
import ScrollProgress from '../../components/ScrollProgress';

const CallHandling: React.FC = () => {
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
                  Feature
                </span>
              </div>

              {/* Headline */}
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-thin text-white mb-6">
                24/7 Call Handling
                <br />
                Never Miss a Call
              </h1>

              <p className="text-lg text-gray-400 max-w-3xl mx-auto mb-8">
                Intelligent AI receptionists that answer every call, day or night. Ensure your business is always available to customers with round-the-clock call handling.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  onClick={() => openLeadCapture('call_handling_hero')}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-lg font-semibold rounded-xl transition-all shadow-lg shadow-cyan-500/25"
                >
                  <FaCalendarCheck />
                  Schedule Demo
                </motion.button>
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

        {/* Key Features */}
        <TechSection
          badge="Capabilities"
          title="Always-On Call Management"
          subtitle="Professional call handling that never sleeps"
        >
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
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

        {/* How It Works */}
        <TechSection
          badge="Process"
          title="How 24/7 Call Handling Works"
          subtitle="Seamless automation from first ring to resolution"
        >
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
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
                <div className="flex items-start gap-4">
                  <div className="text-4xl font-thin text-white/20">{item.step}</div>
                  <div className="flex-1">
                    <h3 className="text-xl font-medium text-white mb-3">{item.title}</h3>
                    <p className="text-sm text-gray-400">{item.description}</p>
                  </div>
                </div>
              </TechCard>
            ))}
          </div>
        </TechSection>

        {/* Benefits */}
        <TechSection
          badge="Benefits"
          title="Why Choose 24/7 Call Handling"
          subtitle="Transform your customer experience and business operations"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              { value: '0%', label: 'Missed Calls', suffix: '' },
              { value: '24/7', label: 'Availability', suffix: '' },
              { value: '90%', label: 'Cost Reduction', suffix: '↓' },
              { value: '< 2s', label: 'Response Time', suffix: '' }
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

        {/* Use Cases */}
        <TechSection
          badge="Applications"
          title="Perfect For"
          subtitle="Industries that benefit from 24/7 call handling"
        >
          <div className="max-w-4xl mx-auto">
            <TechCard>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-medium text-white mb-4">Service Businesses</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2 text-gray-300 text-sm">
                      <FaCheckCircle className="flex-shrink-0 mt-0.5 text-white" />
                      <span>Emergency services and on-call support</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-300 text-sm">
                      <FaCheckCircle className="flex-shrink-0 mt-0.5 text-white" />
                      <span>Healthcare and medical practices</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-300 text-sm">
                      <FaCheckCircle className="flex-shrink-0 mt-0.5 text-white" />
                      <span>Property management and maintenance</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-300 text-sm">
                      <FaCheckCircle className="flex-shrink-0 mt-0.5 text-white" />
                      <span>Automotive and roadside assistance</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-medium text-white mb-4">Customer-Facing Businesses</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2 text-gray-300 text-sm">
                      <FaCheckCircle className="flex-shrink-0 mt-0.5 text-white" />
                      <span>E-commerce and online retailers</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-300 text-sm">
                      <FaCheckCircle className="flex-shrink-0 mt-0.5 text-white" />
                      <span>Hospitality and hotels</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-300 text-sm">
                      <FaCheckCircle className="flex-shrink-0 mt-0.5 text-white" />
                      <span>Financial services and banking</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-300 text-sm">
                      <FaCheckCircle className="flex-shrink-0 mt-0.5 text-white" />
                      <span>Professional services and consulting</span>
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
          title="Ready for 24/7 Availability?"
          subtitle="Never miss another customer call"
        >
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <motion.button
                onClick={() => openLeadCapture('call_handling_cta')}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-lg font-semibold rounded-xl transition-all shadow-lg shadow-cyan-500/25"
              >
                <FaCalendarCheck />
                Schedule Demo
              </motion.button>
              <Link
                to="/solutions"
                className="px-8 py-4 border border-white/10 hover:bg-white/5 text-white text-lg font-medium rounded-md transition-colors"
              >
                View All Features
              </Link>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap justify-center items-center gap-6 text-xs text-gray-500">
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
