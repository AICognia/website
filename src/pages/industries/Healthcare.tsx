import React from 'react';
import { FaHospital, FaUserMd, FaCalendarCheck, FaShieldAlt, FaPhone, FaClipboardList, FaStethoscope, FaAmbulance, FaNotesMedical, FaCheckCircle, FaPlug, FaSync } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import SEO from '../../components/SEO';
import DynamicTechBackground from '../../components/DynamicTechBackground';
import TechSection from '../../components/TechSection';
import TechCard from '../../components/TechCard';
import ScrollProgress from '../../components/ScrollProgress';

const Healthcare: React.FC = () => {
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
                    Healthcare Solutions
                  </span>
                </div>

                {/* Headline */}
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-thin text-white mb-6">
                  HIPAA-Compliant
                  <br />
                  AI for Healthcare
                </h1>

                <p className="text-lg text-gray-400 max-w-xl mb-8">
                  Transform patient communication with secure, compliant AI receptionists designed specifically for medical practices, dental offices, and healthcare providers.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="https://calendly.com/emrebenian-cogniaai/30min"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white text-lg font-medium rounded-md transition-colors"
                  >
                    Schedule Healthcare Demo
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

              {/* Right - Medical Icons Animation */}
              <div className="relative hidden lg:flex items-center justify-center">
                <div className="relative w-[500px] h-[500px]">
                  {/* Background glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl" />

                  {/* Animated Medical Icons */}
                  <div className="relative w-full h-full flex items-center justify-center">
                    {/* Central Hospital Icon */}
                    <div className="absolute w-32 h-32 bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl flex items-center justify-center animate-pulse">
                      <FaHospital className="text-6xl text-white" />
                    </div>

                    {/* Orbiting Icons */}
                    {[
                      { icon: FaStethoscope, angle: 0, delay: 0 },
                      { icon: FaNotesMedical, angle: 60, delay: 1 },
                      { icon: FaAmbulance, angle: 120, delay: 2 },
                      { icon: FaUserMd, angle: 180, delay: 3 },
                      { icon: FaCalendarCheck, angle: 240, delay: 4 },
                      { icon: FaShieldAlt, angle: 300, delay: 5 }
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="absolute w-16 h-16 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl flex items-center justify-center"
                        style={{
                          animation: `orbit 20s linear infinite`,
                          animationDelay: `${item.delay * -3.33}s`,
                          transformOrigin: '250px 250px'
                        }}
                      >
                        <item.icon className="text-2xl text-white" />
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

        {/* Key Features for Healthcare */}
        <TechSection
          badge="Features"
          title="Built for Healthcare Providers"
          subtitle="HIPAA-compliant AI solutions tailored to medical practices"
        >
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {[
              {
                icon: FaShieldAlt,
                title: 'HIPAA Compliant',
                description: 'Fully compliant with healthcare privacy regulations. All patient data is encrypted and secure.'
              },
              {
                icon: FaCalendarCheck,
                title: 'Smart Scheduling',
                description: 'Automatically book, reschedule, and confirm patient appointments 24/7.'
              },
              {
                icon: FaUserMd,
                title: 'Patient Screening',
                description: 'Pre-screen patients, collect symptoms, and prioritize urgent cases.'
              },
              {
                icon: FaPhone,
                title: '24/7 Availability',
                description: 'Never miss an after-hours call. Patients can reach you anytime.'
              },
              {
                icon: FaNotesMedical,
                title: 'Medical Records Integration',
                description: 'Seamlessly integrate with EMR/EHR systems like Epic, Cerner, and more.'
              },
              {
                icon: FaAmbulance,
                title: 'Emergency Routing',
                description: 'Intelligent routing for urgent cases to on-call physicians.'
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
          title="Healthcare Practices We Serve"
          subtitle="Specialized AI solutions for every type of medical practice"
        >
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: FaStethoscope,
                title: 'Primary Care Practices',
                features: [
                  'Appointment scheduling and reminders',
                  'Prescription refill requests',
                  'Insurance verification',
                  'Patient intake forms'
                ]
              },
              {
                icon: FaHospital,
                title: 'Dental Offices',
                features: [
                  'New patient registration',
                  'Cleaning appointment reminders',
                  'Treatment follow-ups',
                  'Insurance pre-authorization'
                ]
              },
              {
                icon: FaUserMd,
                title: 'Specialty Clinics',
                features: [
                  'Referral management',
                  'Pre-procedure instructions',
                  'Lab result notifications',
                  'Specialist consultations'
                ]
              },
              {
                icon: FaClipboardList,
                title: 'Urgent Care Centers',
                features: [
                  'Wait time notifications',
                  'Symptom assessment',
                  'COVID-19 screening',
                  'Follow-up care coordination'
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
          title="Why Healthcare Providers Choose Cognia AI"
          subtitle="Proven results for medical practices"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              { value: '40%', label: 'Fewer No-Shows', suffix: '↓' },
              { value: '24/7', label: 'Patient Access', suffix: '' },
              { value: '85%', label: 'Staff Time Saved', suffix: '↑' },
              { value: '100%', label: 'HIPAA Compliant', suffix: '✓' }
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
          title="Seamless Healthcare System Integration"
          subtitle="Connect with your existing practice management and EHR systems"
        >
          <div className="max-w-4xl mx-auto">
            <TechCard>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-medium text-white mb-4">Practice Management Systems (PMS)</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2 text-gray-300 text-sm">
                      <FaCheckCircle className="flex-shrink-0 mt-0.5 text-white" />
                      <span>Dentrix, Eaglesoft, Open Dental</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-300 text-sm">
                      <FaCheckCircle className="flex-shrink-0 mt-0.5 text-white" />
                      <span>Kareo, AdvancedMD, DrChrono</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-300 text-sm">
                      <FaCheckCircle className="flex-shrink-0 mt-0.5 text-white" />
                      <span>Practice Fusion, SimplePractice</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-300 text-sm">
                      <FaCheckCircle className="flex-shrink-0 mt-0.5 text-white" />
                      <span>Custom API integration available</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-medium text-white mb-4">Electronic Health Records (EHR)</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2 text-gray-300 text-sm">
                      <FaCheckCircle className="flex-shrink-0 mt-0.5 text-white" />
                      <span>Epic, Cerner, Athenahealth</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-300 text-sm">
                      <FaCheckCircle className="flex-shrink-0 mt-0.5 text-white" />
                      <span>eClinicalWorks, NextGen Healthcare</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-300 text-sm">
                      <FaCheckCircle className="flex-shrink-0 mt-0.5 text-white" />
                      <span>Allscripts, Meditech</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-300 text-sm">
                      <FaCheckCircle className="flex-shrink-0 mt-0.5 text-white" />
                      <span>HL7 FHIR compliant</span>
                    </li>
                  </ul>
                </div>
              </div>
              {/* API Badge */}
              <div className="flex items-center justify-center gap-6 mt-8 pt-6 border-t border-white/10 text-sm text-gray-500">
                <span className="flex items-center gap-2">
                  <FaPlug className="text-cyan-400" />
                  Custom API Available
                </span>
                <span className="flex items-center gap-2">
                  <FaSync className="text-cyan-400" />
                  Real-time Sync
                </span>
                <span className="flex items-center gap-2">
                  <FaShieldAlt className="text-cyan-400" />
                  HIPAA Compliant
                </span>
              </div>
            </TechCard>
          </div>
        </TechSection>

        {/* Compliance Section */}
        <TechSection
          badge="Security & Compliance"
          title="Healthcare-Grade Security"
          subtitle="Your patients' data is always protected"
        >
          <div className="max-w-4xl mx-auto">
            <TechCard>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-medium text-white mb-4">HIPAA Compliance</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2 text-gray-300 text-sm">
                      <FaCheckCircle className="flex-shrink-0 mt-0.5 text-white" />
                      <span>End-to-end encryption for all patient data</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-300 text-sm">
                      <FaCheckCircle className="flex-shrink-0 mt-0.5 text-white" />
                      <span>Business Associate Agreement (BAA) included</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-300 text-sm">
                      <FaCheckCircle className="flex-shrink-0 mt-0.5 text-white" />
                      <span>Regular security audits and updates</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-300 text-sm">
                      <FaCheckCircle className="flex-shrink-0 mt-0.5 text-white" />
                      <span>Audit logs for all patient interactions</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-medium text-white mb-4">Data Security</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2 text-gray-300 text-sm">
                      <FaCheckCircle className="flex-shrink-0 mt-0.5 text-white" />
                      <span>256-bit AES encryption</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-300 text-sm">
                      <FaCheckCircle className="flex-shrink-0 mt-0.5 text-white" />
                      <span>Secure cloud infrastructure</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-300 text-sm">
                      <FaCheckCircle className="flex-shrink-0 mt-0.5 text-white" />
                      <span>Regular penetration testing</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-300 text-sm">
                      <FaCheckCircle className="flex-shrink-0 mt-0.5 text-white" />
                      <span>Role-based access controls</span>
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
          subtitle="Join hundreds of healthcare providers using Cognia AI"
        >
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <a
                href="https://calendly.com/emrebenian-cogniaai/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white text-lg font-medium rounded-md transition-colors"
              >
                Schedule Healthcare Demo
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
                HIPAA Compliant
              </span>
              <span className="flex items-center gap-2">
                <FaCheckCircle />
                24/7 Support
              </span>
              <span className="flex items-center gap-2">
                <FaCheckCircle />
                Encrypted & Secure
              </span>
            </div>
          </div>
        </TechSection>
      </div>
    </div>
  );
};

export default Healthcare;
