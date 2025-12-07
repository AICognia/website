import React from 'react';
import { FaCalendarAlt, FaClock, FaBell, FaSync, FaCheckCircle, FaUserClock, FaPhone, FaRobot, FaCalendarCheck, FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEO from '../../components/SEO';
import DynamicTechBackground from '../../components/DynamicTechBackground';
import TechSection from '../../components/TechSection';
import TechCard from '../../components/TechCard';
import ScrollProgress from '../../components/ScrollProgress';

const SmartScheduling: React.FC = () => {

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
                Smart Scheduling
                <br />
                AI-Powered Booking
              </h1>

              <p className="text-lg text-gray-400 max-w-3xl mx-auto mb-8">
                Intelligent appointment booking that understands context, checks availability in real-time, and confirms appointments instantly—all through natural conversation.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/demo"
                  className="flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-lg font-semibold rounded-xl transition-all shadow-lg shadow-cyan-500/25"
                >
                  <FaCalendarCheck />
                  Schedule Demo
                  <FaArrowRight className="text-sm" />
                </Link>
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
          title="Intelligent Appointment Management"
          subtitle="Automated scheduling that works like a human assistant"
        >
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {[
              {
                icon: FaCalendarAlt,
                title: 'Real-Time Availability',
                description: 'Check calendar in real-time and book available slots instantly during the conversation.'
              },
              {
                icon: FaRobot,
                title: 'Natural Language Booking',
                description: 'Customers can say "next Tuesday afternoon" and AI finds the perfect time slot.'
              },
              {
                icon: FaSync,
                title: 'Automatic Rescheduling',
                description: 'Handle cancellations and rescheduling requests without human intervention.'
              },
              {
                icon: FaBell,
                title: 'Smart Reminders',
                description: 'Automated SMS and email reminders sent before appointments to reduce no-shows.'
              },
              {
                icon: FaUserClock,
                title: 'Wait List Management',
                description: 'Automatically offer earlier slots when cancellations open up.'
              },
              {
                icon: FaClock,
                title: 'Buffer Time Control',
                description: 'Intelligent spacing between appointments based on service type and duration.'
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
          title="How Smart Scheduling Works"
          subtitle="From booking request to confirmed appointment in seconds"
        >
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {[
              {
                step: '01',
                title: 'Customer Request',
                description: 'Customer calls or messages requesting an appointment. AI understands the request in natural language.'
              },
              {
                step: '02',
                title: 'Availability Check',
                description: 'AI checks your calendar in real-time, considering service duration, buffer times, and staff availability.'
              },
              {
                step: '03',
                title: 'Slot Confirmation',
                description: 'AI proposes available times, customer selects preferred slot, and appointment is instantly confirmed.'
              },
              {
                step: '04',
                title: 'Automated Follow-Up',
                description: 'Confirmation sent immediately, reminders scheduled, and appointment synced to all calendars.'
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
          title="Why Choose Smart Scheduling"
          subtitle="Measurable improvements for your business"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              { value: '40%', label: 'Fewer No-Shows', suffix: '↓' },
              { value: '85%', label: 'Admin Time Saved', suffix: '↑' },
              { value: '24/7', label: 'Booking Available', suffix: '' },
              { value: '< 30s', label: 'Booking Time', suffix: '' }
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

        {/* Integrations */}
        <TechSection
          badge="Integrations"
          title="Works With Your Calendar"
          subtitle="Seamless integration with popular scheduling platforms"
        >
          <div className="max-w-4xl mx-auto">
            <TechCard>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-medium text-white mb-4">Calendar Systems</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2 text-gray-300 text-sm">
                      <FaCheckCircle className="flex-shrink-0 mt-0.5 text-white" />
                      <span>Google Calendar & Google Workspace</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-300 text-sm">
                      <FaCheckCircle className="flex-shrink-0 mt-0.5 text-white" />
                      <span>Microsoft Outlook & Office 365</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-300 text-sm">
                      <FaCheckCircle className="flex-shrink-0 mt-0.5 text-white" />
                      <span>Apple Calendar & iCloud</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-300 text-sm">
                      <FaCheckCircle className="flex-shrink-0 mt-0.5 text-white" />
                      <span>Custom calendar APIs</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-medium text-white mb-4">Booking Platforms</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2 text-gray-300 text-sm">
                      <FaCheckCircle className="flex-shrink-0 mt-0.5 text-white" />
                      <span>Calendly, Acuity Scheduling</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-300 text-sm">
                      <FaCheckCircle className="flex-shrink-0 mt-0.5 text-white" />
                      <span>Square Appointments</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-300 text-sm">
                      <FaCheckCircle className="flex-shrink-0 mt-0.5 text-white" />
                      <span>Industry-specific EMR/PMS systems</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-300 text-sm">
                      <FaCheckCircle className="flex-shrink-0 mt-0.5 text-white" />
                      <span>Custom booking systems via API</span>
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
          title="Ready to Automate Scheduling?"
          subtitle="Let AI handle your appointments"
        >
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <Link
                to="/demo"
                className="flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-lg font-semibold rounded-xl transition-all shadow-lg shadow-cyan-500/25"
              >
                <FaCalendarCheck />
                Schedule Demo
                <FaArrowRight className="text-sm" />
              </Link>
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
                Real-Time Sync
              </span>
              <span className="flex items-center gap-2">
                <FaCheckCircle />
                Automatic Reminders
              </span>
              <span className="flex items-center gap-2">
                <FaCheckCircle />
                Easy Setup
              </span>
              <span className="flex items-center gap-2">
                <FaCheckCircle />
                No Manual Work
              </span>
            </div>
          </div>
        </TechSection>
      </div>
    </div>
  );
};

export default SmartScheduling;
