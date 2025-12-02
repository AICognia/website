import React from 'react';
import { FaHeadset, FaQuestionCircle, FaTicketAlt, FaCheckCircle, FaPhone, FaClock, FaUsers, FaSmile } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import SEO from '../../components/SEO';
import DynamicTechBackground from '../../components/DynamicTechBackground';
import TechSection from '../../components/TechSection';
import TechCard from '../../components/TechCard';
import ScrollProgress from '../../components/ScrollProgress';

const CustomerSupport: React.FC = () => {
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
                Customer Support
                <br />
                Round-the-Clock Assistance
              </h1>

              <p className="text-lg text-gray-400 max-w-3xl mx-auto mb-8">
                Provide instant, consistent customer support 24/7. Handle common questions, troubleshoot issues, and escalate complex cases seamlessly.
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
          title="Complete Customer Support Solution"
          subtitle="AI-powered support that delights customers"
        >
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {[
              {
                icon: FaQuestionCircle,
                title: 'FAQ Handling',
                description: 'Answer common questions instantly with accurate, up-to-date information from your knowledge base.'
              },
              {
                icon: FaTicketAlt,
                title: 'Ticket Creation',
                description: 'Automatically create support tickets for complex issues and track through resolution.'
              },
              {
                icon: FaClock,
                title: '24/7 Availability',
                description: 'Provide support round the clock, including nights, weekends, and holidays.'
              },
              {
                icon: FaUsers,
                title: 'Smart Escalation',
                description: 'Route complex or sensitive issues to human agents with full context and conversation history.'
              },
              {
                icon: FaSmile,
                title: 'Sentiment Analysis',
                description: 'Detect customer frustration and automatically escalate to preserve customer satisfaction.'
              },
              {
                icon: FaHeadset,
                title: 'Multi-Channel Support',
                description: 'Handle support via phone, web chat, SMS, and email from a single platform.'
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
          title="Results for Customer-Facing Businesses"
          subtitle="Better support, happier customers"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              { value: '90%', label: 'Issues Resolved', suffix: '' },
              { value: '< 30s', label: 'Response Time', suffix: '' },
              { value: '24/7', label: 'Availability', suffix: '' },
              { value: '4.8/5', label: 'Customer Rating', suffix: '' }
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
          title="Ready for 24/7 Customer Support?"
          subtitle="Delight customers with instant assistance"
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
                to="/industries/retail"
                className="px-8 py-4 border border-white/10 hover:bg-white/5 text-white text-lg font-medium rounded-md transition-colors"
              >
                Retail Solutions
              </Link>
            </div>

            <div className="flex flex-wrap justify-center items-center gap-6 text-xs text-gray-500">
              <span className="flex items-center gap-2"><FaCheckCircle />24/7 Support</span>
              <span className="flex items-center gap-2"><FaCheckCircle />Multi-Channel</span>
              <span className="flex items-center gap-2"><FaCheckCircle />Smart Escalation</span>
              <span className="flex items-center gap-2"><FaCheckCircle />Instant Answers</span>
            </div>
          </div>
        </TechSection>
      </div>
    </div>
  );
};

export default CustomerSupport;
