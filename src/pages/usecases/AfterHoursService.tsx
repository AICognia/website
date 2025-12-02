import React from 'react';
import { FaClock, FaMoon, FaBell, FaCheckCircle, FaPhone, FaShieldAlt, FaCalendarAlt, FaExclamationTriangle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import SEO from '../../components/SEO';
import DynamicTechBackground from '../../components/DynamicTechBackground';
import TechSection from '../../components/TechSection';
import TechCard from '../../components/TechCard';
import ScrollProgress from '../../components/ScrollProgress';

const AfterHoursService: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <ScrollProgress />

      <div className="fixed inset-0 z-0">
        <DynamicTechBackground />
      </div>

      <div className="relative z-10">
        <SEO page="solutions" />

        <section className="relative py-32">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-block px-3 py-1 bg-white/5 border border-white/10 rounded-full mb-6">
                <span className="text-xs text-gray-400 uppercase tracking-widest">Use Case</span>
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-thin text-white mb-6">
                After-Hours Service
                <br />
                Business Continuity 24/7
              </h1>

              <p className="text-lg text-gray-400 max-w-3xl mx-auto mb-8">
                Never miss an opportunity or urgent call. Provide professional service outside business hours with intelligent AI that knows when to escalate emergencies.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://calendly.com/emrebenian-cogniaai/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white text-lg font-medium rounded-md transition-colors"
                >
                  Schedule Demo
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

        <TechSection
          badge="Features"
          title="Complete After-Hours Coverage"
          subtitle="Professional service when your office is closed"
        >
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {[
              {
                icon: FaMoon,
                title: 'Night & Weekend Coverage',
                description: 'Handle calls during evenings, weekends, and holidays without extra staffing.'
              },
              {
                icon: FaExclamationTriangle,
                title: 'Emergency Detection',
                description: 'Identify urgent situations and immediately alert on-call staff via SMS, call, or email.'
              },
              {
                icon: FaCalendarAlt,
                title: 'Next-Day Scheduling',
                description: 'Book appointments for next business day and send confirmation to customers.'
              },
              {
                icon: FaBell,
                title: 'Custom Escalation Rules',
                description: 'Define what constitutes an emergency and who to contact based on issue type.'
              },
              {
                icon: FaShieldAlt,
                title: 'Message Taking',
                description: 'Collect detailed messages and information for your team to review in the morning.'
              },
              {
                icon: FaClock,
                title: 'Time Zone Awareness',
                description: 'Automatically adjust for different time zones and business hour configurations.'
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

        <TechSection
          badge="Benefits"
          title="Results for Service Businesses"
          subtitle="Capture opportunities and handle emergencies 24/7"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              { value: '100%', label: 'Calls Answered', suffix: '' },
              { value: '24/7', label: 'Availability', suffix: '' },
              { value: '< 2min', label: 'Emergency Response', suffix: '' },
              { value: '$0', label: 'Overtime Costs', suffix: '' }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl sm:text-5xl font-bold text-white mb-2">
                  {stat.value}
                  {stat.suffix && <span className="text-2xl ml-1">{stat.suffix}</span>}
                </div>
                <div className="text-xs sm:text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </TechSection>

        <TechSection
          badge="Get Started"
          title="Ready for 24/7 Coverage?"
          subtitle="Never miss an urgent call or opportunity"
        >
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <a
                href="https://calendly.com/emrebenian-cogniaai/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white text-lg font-medium rounded-md transition-colors"
              >
                Schedule Demo
              </a>
              <Link
                to="/features/call-handling"
                className="px-8 py-4 border border-white/10 hover:bg-white/5 text-white text-lg font-medium rounded-md transition-colors"
              >
                24/7 Call Handling
              </Link>
            </div>

            <div className="flex flex-wrap justify-center items-center gap-6 text-xs text-gray-500">
              <span className="flex items-center gap-2"><FaCheckCircle />24/7 Coverage</span>
              <span className="flex items-center gap-2"><FaCheckCircle />Emergency Routing</span>
              <span className="flex items-center gap-2"><FaCheckCircle />No Overtime</span>
              <span className="flex items-center gap-2"><FaCheckCircle />Professional Service</span>
            </div>
          </div>
        </TechSection>
      </div>
    </div>
  );
};

export default AfterHoursService;
