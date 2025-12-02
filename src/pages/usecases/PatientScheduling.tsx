import React from 'react';
import { FaUserMd, FaCalendarAlt, FaBell, FaCheckCircle, FaPhone, FaHospital, FaClock, FaNotesMedical } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import SEO from '../../components/SEO';
import DynamicTechBackground from '../../components/DynamicTechBackground';
import TechSection from '../../components/TechSection';
import TechCard from '../../components/TechCard';
import ScrollProgress from '../../components/ScrollProgress';

const PatientScheduling: React.FC = () => {
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
                Patient Scheduling
                <br />
                Medical Appointment Management
              </h1>

              <p className="text-lg text-gray-400 max-w-3xl mx-auto mb-8">
                HIPAA-compliant AI for healthcare practices. Automate patient appointment booking, reminders, and rescheduling while maintaining full compliance.
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
          title="Complete Patient Scheduling Solution"
          subtitle="Everything you need for medical appointment management"
        >
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {[
              {
                icon: FaCalendarAlt,
                title: 'Appointment Booking',
                description: 'Book new patient and follow-up appointments 24/7 with real-time availability checking.'
              },
              {
                icon: FaBell,
                title: 'Automated Reminders',
                description: 'Send SMS and email reminders 24-48 hours before appointments to reduce no-shows by 40%.'
              },
              {
                icon: FaClock,
                title: 'Rescheduling',
                description: 'Handle patient cancellations and reschedules automatically without staff intervention.'
              },
              {
                icon: FaNotesMedical,
                title: 'EMR Integration',
                description: 'Sync appointments directly with Epic, Cerner, Athenahealth, and other EMR systems.'
              },
              {
                icon: FaUserMd,
                title: 'Provider Routing',
                description: 'Route patients to specific doctors based on specialty, availability, and patient history.'
              },
              {
                icon: FaHospital,
                title: 'Insurance Verification',
                description: 'Collect and verify insurance information during the scheduling call.'
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
          badge="Process"
          title="How Patient Scheduling Works"
          subtitle="Streamlined booking from call to confirmation"
        >
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {[
              {
                step: '01',
                title: 'Patient Calls',
                description: 'Patient calls to book an appointment. AI greets them professionally and asks about their needs.'
              },
              {
                step: '02',
                title: 'Availability Check',
                description: 'AI checks EMR/PMS for doctor availability, considering appointment type and duration.'
              },
              {
                step: '03',
                title: 'Information Collection',
                description: 'Collects patient details, insurance info, reason for visit, and any special requirements.'
              },
              {
                step: '04',
                title: 'Confirmation & Reminders',
                description: 'Confirms appointment, syncs to EMR, sends confirmation, and schedules automated reminders.'
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

        <TechSection
          badge="Benefits"
          title="Results for Medical Practices"
          subtitle="Proven improvements in efficiency and patient satisfaction"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              { value: '40%', label: 'Fewer No-Shows', suffix: '↓' },
              { value: '24/7', label: 'Booking Available', suffix: '' },
              { value: '85%', label: 'Staff Time Saved', suffix: '↑' },
              { value: '100%', label: 'HIPAA Compliant', suffix: '✓' }
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
          title="Ready to Automate Patient Scheduling?"
          subtitle="Join hundreds of medical practices using Cognia AI"
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
                to="/industries/healthcare"
                className="px-8 py-4 border border-white/10 hover:bg-white/5 text-white text-lg font-medium rounded-md transition-colors"
              >
                Healthcare Solutions
              </Link>
            </div>

            <div className="flex flex-wrap justify-center items-center gap-6 text-xs text-gray-500">
              <span className="flex items-center gap-2"><FaCheckCircle />HIPAA Compliant</span>
              <span className="flex items-center gap-2"><FaCheckCircle />EMR Integration</span>
              <span className="flex items-center gap-2"><FaCheckCircle />Auto Reminders</span>
              <span className="flex items-center gap-2"><FaCheckCircle />24/7 Booking</span>
            </div>
          </div>
        </TechSection>
      </div>
    </div>
  );
};

export default PatientScheduling;
