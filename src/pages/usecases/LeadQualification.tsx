import React from 'react';
import { FaShieldAlt, FaFilter, FaChartLine, FaCheckCircle, FaPhone, FaUserCheck, FaClipboardCheck, FaBullseye } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import SEO from '../../components/SEO';
import DynamicTechBackground from '../../components/DynamicTechBackground';
import TechSection from '../../components/TechSection';
import TechCard from '../../components/TechCard';
import ScrollProgress from '../../components/ScrollProgress';

const LeadQualification: React.FC = () => {
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
                Lead Qualification
                <br />
                Screen and Route Prospects
              </h1>

              <p className="text-lg text-gray-400 max-w-3xl mx-auto mb-8">
                Automatically qualify leads, score prospects, and route qualified opportunities to your sales team. Focus your team's time on ready-to-buy customers.
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
          title="Intelligent Lead Qualification"
          subtitle="Identify and prioritize your best prospects"
        >
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {[
              {
                icon: FaFilter,
                title: 'Automated Screening',
                description: 'Ask qualifying questions to assess budget, timeline, authority, and need (BANT framework).'
              },
              {
                icon: FaChartLine,
                title: 'Lead Scoring',
                description: 'Assign scores based on qualification criteria and route high-value leads to senior sales reps.'
              },
              {
                icon: FaBullseye,
                title: 'Intent Detection',
                description: 'Identify buying signals and urgency level through conversation analysis.'
              },
              {
                icon: FaUserCheck,
                title: 'Decision Maker Routing',
                description: 'Identify decision makers vs. researchers and route accordingly.'
              },
              {
                icon: FaClipboardCheck,
                title: 'Instant CRM Update',
                description: 'Log all qualification data directly to Salesforce, HubSpot, or your CRM.'
              },
              {
                icon: FaShieldAlt,
                title: 'Spam Filtering',
                description: 'Automatically filter out spam, solicitors, and unqualified prospects.'
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
          title="Results for Sales Teams"
          subtitle="More qualified leads, higher conversion rates"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              { value: '3x', label: 'More Qualified Leads', suffix: '' },
              { value: '60%', label: 'Time Saved', suffix: '↑' },
              { value: '45%', label: 'Higher Conversion', suffix: '↑' },
              { value: '100%', label: 'Lead Capture', suffix: '' }
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
          title="Ready to Qualify Leads Automatically?"
          subtitle="Focus your team on ready-to-buy prospects"
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
                to="/features/crm-integration"
                className="px-8 py-4 border border-white/10 hover:bg-white/5 text-white text-lg font-medium rounded-md transition-colors"
              >
                CRM Integration
              </Link>
            </div>

            <div className="flex flex-wrap justify-center items-center gap-6 text-xs text-gray-500">
              <span className="flex items-center gap-2"><FaCheckCircle />Auto Qualification</span>
              <span className="flex items-center gap-2"><FaCheckCircle />Lead Scoring</span>
              <span className="flex items-center gap-2"><FaCheckCircle />Smart Routing</span>
              <span className="flex items-center gap-2"><FaCheckCircle />CRM Sync</span>
            </div>
          </div>
        </TechSection>
      </div>
    </div>
  );
};

export default LeadQualification;
