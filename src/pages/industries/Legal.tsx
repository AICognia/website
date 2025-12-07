import React from 'react';
import { FaBalanceScale, FaUserTie, FaFileContract, FaShieldAlt, FaPhone, FaCalendarCheck, FaGavel, FaHandshake, FaClipboardCheck, FaCheckCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import SEO from '../../components/SEO';
import DynamicTechBackground from '../../components/DynamicTechBackground';
import TechSection from '../../components/TechSection';
import TechCard from '../../components/TechCard';
import ScrollProgress from '../../components/ScrollProgress';

const Legal: React.FC = () => {
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
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left - Content */}
              <div>
                {/* Badge */}
                <div className="inline-block px-3 py-1 bg-white/5 border border-white/10 rounded-full mb-6">
                  <span className="text-xs text-gray-400 uppercase tracking-widest">
                    Legal Services Solutions
                  </span>
                </div>

                {/* Headline */}
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-thin text-white mb-6">
                  Confidential AI
                  <br />
                  for Law Firms
                </h1>

                <p className="text-lg text-gray-400 max-w-xl mb-8">
                  Transform client communication with secure, confidential AI receptionists designed specifically for law firms, solo practitioners, and legal service providers.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="https://calendly.com/emrebenian-cogniaai/30min"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white text-lg font-medium rounded-md transition-colors"
                  >
                    Schedule Legal Demo
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

              {/* Right - Legal Icons Animation */}
              <div className="relative hidden lg:flex items-center justify-center">
                <div className="relative w-[500px] h-[500px]">
                  {/* Background glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-yellow-500/20 rounded-full blur-3xl" />

                  {/* Animated Legal Icons */}
                  <div className="relative w-full h-full flex items-center justify-center">
                    {/* Central Balance Scale */}
                    <div className="absolute w-32 h-32 bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl flex items-center justify-center animate-pulse">
                      <FaBalanceScale className="text-6xl text-amber-400" />
                    </div>

                    {/* Orbiting Icons */}
                    {[
                      { icon: FaGavel, delay: 0 },
                      { icon: FaFileContract, delay: 1 },
                      { icon: FaHandshake, delay: 2 },
                      { icon: FaUserTie, delay: 3 },
                      { icon: FaClipboardCheck, delay: 4 },
                      { icon: FaShieldAlt, delay: 5 }
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="absolute w-16 h-16 bg-white/5 backdrop-blur-sm border border-amber-500/20 rounded-2xl flex items-center justify-center"
                        style={{
                          animation: `orbit 20s linear infinite`,
                          animationDelay: `${item.delay * -3.33}s`,
                          transformOrigin: '250px 250px'
                        }}
                      >
                        <item.icon className="text-2xl text-amber-400" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <style>{`
            @keyframes orbit {
              from {
                transform: rotate(0deg) translateX(200px) rotate(0deg);
              }
              to {
                transform: rotate(360deg) translateX(200px) rotate(-360deg);
              }
            }
          `}</style>
        </section>

        {/* Key Features for Legal */}
        <TechSection
          badge="Features"
          title="Built for Legal Professionals"
          subtitle="Secure AI solutions tailored to law firms and legal practices"
        >
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {[
              {
                icon: FaShieldAlt,
                title: 'Attorney-Client Privilege',
                description: 'Fully confidential communications. All client data is encrypted and protected by privilege.'
              },
              {
                icon: FaCalendarCheck,
                title: 'Consultation Scheduling',
                description: 'Automatically book consultations, depositions, and court appearances 24/7.'
              },
              {
                icon: FaUserTie,
                title: 'Client Intake',
                description: 'Collect case details, conflict checks, and client information before consultation.'
              },
              {
                icon: FaPhone,
                title: '24/7 Availability',
                description: 'Never miss an urgent client call. Available around the clock for emergencies.'
              },
              {
                icon: FaFileContract,
                title: 'Case Management Integration',
                description: 'Seamlessly integrate with Clio, MyCase, PracticePanther, and other legal software.'
              },
              {
                icon: FaGavel,
                title: 'Practice Area Routing',
                description: 'Intelligent routing to appropriate attorneys based on case type and expertise.'
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
          title="Legal Practices We Serve"
          subtitle="Specialized AI solutions for every type of legal practice"
        >
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: FaBalanceScale,
                title: 'Law Firms',
                features: [
                  'Initial client consultations',
                  'Conflict of interest checks',
                  'Document collection and intake',
                  'Court date reminders'
                ]
              },
              {
                icon: FaUserTie,
                title: 'Solo Practitioners',
                features: [
                  'After-hours call handling',
                  'Client screening and qualification',
                  'Appointment scheduling',
                  'Case status updates'
                ]
              },
              {
                icon: FaFileContract,
                title: 'Corporate Legal Departments',
                features: [
                  'Internal request management',
                  'Vendor communication',
                  'Compliance inquiries',
                  'Contract review scheduling'
                ]
              },
              {
                icon: FaHandshake,
                title: 'Legal Aid Organizations',
                features: [
                  'Client eligibility screening',
                  'Multi-language support',
                  'Pro bono intake',
                  'Resource referrals'
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
          title="Why Legal Professionals Choose Cognia AI"
          subtitle="Proven results for law firms"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              { value: '60%', label: 'More Leads Captured', suffix: '↑' },
              { value: '24/7', label: 'Client Access', suffix: '' },
              { value: '90%', label: 'Admin Time Saved', suffix: '↑' },
              { value: '100%', label: 'Confidential', suffix: '✓' }
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

        {/* Security & Compliance Section */}
        <TechSection
          badge="Security & Compliance"
          title="Law Firm-Grade Security"
          subtitle="Your clients' confidential information is always protected"
        >
          <div className="max-w-4xl mx-auto">
            <TechCard>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-medium text-white mb-4">Confidentiality</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2 text-gray-300 text-sm">
                      <FaCheckCircle className="flex-shrink-0 mt-0.5 text-white" />
                      <span>End-to-end encryption for all communications</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-300 text-sm">
                      <FaCheckCircle className="flex-shrink-0 mt-0.5 text-white" />
                      <span>Attorney-client privilege protection</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-300 text-sm">
                      <FaCheckCircle className="flex-shrink-0 mt-0.5 text-white" />
                      <span>Automatic conflict checking</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-300 text-sm">
                      <FaCheckCircle className="flex-shrink-0 mt-0.5 text-white" />
                      <span>Secure document handling</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-medium text-white mb-4">Compliance & Certifications</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2 text-gray-300 text-sm">
                      <FaCheckCircle className="flex-shrink-0 mt-0.5 text-white" />
                      <span>ABA Model Rules compliant</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-300 text-sm">
                      <FaCheckCircle className="flex-shrink-0 mt-0.5 text-white" />
                      <span>GDPR compliant</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-300 text-sm">
                      <FaCheckCircle className="flex-shrink-0 mt-0.5 text-white" />
                      <span>Regular security audits</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-300 text-sm">
                      <FaCheckCircle className="flex-shrink-0 mt-0.5 text-white" />
                      <span>End-to-end encryption</span>
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
          title="Ready to Transform Your Practice?"
          subtitle="Join hundreds of law firms using Cognia AI"
        >
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <a
                href="https://calendly.com/emrebenian-cogniaai/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white text-lg font-medium rounded-md transition-colors"
              >
                Schedule Legal Demo
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
                Attorney-Client Privilege
              </span>
              <span className="flex items-center gap-2">
                <FaCheckCircle />
                ABA Compliant
              </span>
              <span className="flex items-center gap-2">
                <FaCheckCircle />
                Secure & Confidential
              </span>
              <span className="flex items-center gap-2">
                <FaCheckCircle />
                24/7 Support
              </span>
            </div>
          </div>
        </TechSection>
      </div>
    </div>
  );
};

export default Legal;
