import React from 'react';
import { FaCalendarAlt, FaClock, FaBell, FaSync, FaCheckCircle, FaUserClock, FaPhone, FaRobot, FaCalendarCheck, FaArrowRight } from 'react-icons/fa';
import Link from 'next/link';
import { motion } from 'framer-motion';
import SEO from '../../components/SEO';
import DynamicTechBackground from '../../components/DynamicTechBackground';
import TechSection from '../../components/TechSection';
import TechCard from '../../components/TechCard';
const SmartScheduling: React.FC = () => {

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
                Smart Scheduling
                <br />
                AI-Powered Booking
              </h1>

              <p className="text-base sm:text-lg text-[rgba(49,45,43,0.70)] max-w-3xl mx-auto mb-6 sm:mb-8 px-2 sm:px-0">
                Intelligent appointment booking that understands context, checks availability in real-time, and confirms appointments instantly—all through natural conversation.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4 sm:px-0">
                <Link
                  href="/demo"
                  className="flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-primary to-blue-600 hover:from-primary-light hover:to-blue-500 text-white text-base sm:text-lg font-semibold rounded-xl transition-all shadow-lg shadow-primary/25 w-full sm:w-auto"
                >
                  <FaCalendarCheck />
                  Schedule Demo
                  <FaArrowRight className="text-sm" />
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
          title="Intelligent Appointment Management"
          subtitle="Automated scheduling that works like a human assistant"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-7xl mx-auto">
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
          title="How Smart Scheduling Works"
          subtitle="From booking request to confirmed appointment in seconds"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8 max-w-6xl mx-auto">
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
          title="Why Choose Smart Scheduling"
          subtitle="Measurable improvements for your business"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-6xl mx-auto">
            {[
              { value: '40%', label: 'Fewer No-Shows', suffix: '↓' },
              { value: '85%', label: 'Admin Time Saved', suffix: '↑' },
              { value: '24/7', label: 'Booking Available', suffix: '' },
              { value: '< 30s', label: 'Booking Time', suffix: '' }
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
          badge="Integrations"
          title="Works With Your Calendar"
          subtitle="Seamless integration with popular scheduling platforms"
        >
          <div className="max-w-4xl mx-auto">
            <TechCard>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                <div>
                  <h3 className="text-lg sm:text-xl font-medium text-[#37322F] mb-3 sm:mb-4">Calendar Systems</h3>
                  <ul className="space-y-2 sm:space-y-3">
                    <li className="flex items-start gap-2 text-gray-300 text-xs sm:text-sm">
                      <FaCheckCircle className="flex-shrink-0 mt-0.5 text-white" />
                      <span>Google Calendar & Google Workspace</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-300 text-xs sm:text-sm">
                      <FaCheckCircle className="flex-shrink-0 mt-0.5 text-white" />
                      <span>Microsoft Outlook & Office 365</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-300 text-xs sm:text-sm">
                      <FaCheckCircle className="flex-shrink-0 mt-0.5 text-white" />
                      <span>Apple Calendar & iCloud</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-300 text-xs sm:text-sm">
                      <FaCheckCircle className="flex-shrink-0 mt-0.5 text-white" />
                      <span>Custom calendar APIs</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-medium text-[#37322F] mb-3 sm:mb-4">Booking Platforms</h3>
                  <ul className="space-y-2 sm:space-y-3">
                    <li className="flex items-start gap-2 text-gray-300 text-xs sm:text-sm">
                      <FaCheckCircle className="flex-shrink-0 mt-0.5 text-white" />
                      <span>Calendly, Acuity Scheduling</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-300 text-xs sm:text-sm">
                      <FaCheckCircle className="flex-shrink-0 mt-0.5 text-white" />
                      <span>Square Appointments</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-300 text-xs sm:text-sm">
                      <FaCheckCircle className="flex-shrink-0 mt-0.5 text-white" />
                      <span>Industry-specific EMR/PMS systems</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-300 text-xs sm:text-sm">
                      <FaCheckCircle className="flex-shrink-0 mt-0.5 text-white" />
                      <span>Custom booking systems via API</span>
                    </li>
                  </ul>
                </div>
              </div>
            </TechCard>
          </div>
        </TechSection>

        <TechSection
          badge="Get Started"
          title="Ready to Automate Scheduling?"
          subtitle="Let AI handle your appointments"
        >
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-0">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-6 sm:mb-8">
              <Link
                href="/demo"
                className="flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-primary to-blue-600 hover:from-primary-light hover:to-blue-500 text-white text-base sm:text-lg font-semibold rounded-xl transition-all shadow-lg shadow-primary/25 w-full sm:w-auto"
              >
                <FaCalendarCheck />
                Schedule Demo
                <FaArrowRight className="text-sm" />
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
