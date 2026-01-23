'use client'
import React from 'react';
import { FaUserMd, FaCalendarAlt, FaBell, FaCheckCircle, FaPhone, FaHospital, FaClock, FaNotesMedical, FaCalendarCheck, FaArrowRight, FaShieldAlt } from 'react-icons/fa';
import Link from 'next/link';
import { motion } from 'framer-motion';
import SEO from '../../components/SEO';
import DynamicTechBackground from '../../components/DynamicTechBackground';
import TechSection from '../../components/TechSection';
import TechCard from '../../components/TechCard';
import { Sparkles } from '../../components/ui/sparkles';

const PatientScheduling: React.FC = () => {
  return (
    <div className="min-h-screen bg-transparent text-gray-900 relative overflow-hidden">
      <div className="fixed inset-0 z-0">
        <DynamicTechBackground />
      </div>

      <div className="relative z-10">
        <SEO page="solutions" />

        <section className="min-h-screen flex items-center justify-center relative py-10 md:py-20">
          <div className="container-responsive relative z-10 flex-1 flex items-center pt-24 sm:pt-20 md:pt-0">
            <div className="bento-grid items-center w-full max-w-6xl">

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.23, 1, 0.32, 1], delay: 0.3 }}
                className="col-span-12 lg:col-span-8 bento-card flex flex-col justify-between pointer-events-auto p-4 sm:p-6 md:p-8"
              >
                <div className="relative z-10 text-left">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-50/80 backdrop-blur-sm border border-slate-200/50 rounded-full mb-4 md:mb-8">
                    <FaShieldAlt className="w-3 h-3 md:w-4 md:h-4 text-green-600" />
                    <span className="body-small uppercase tracking-widest text-slate-600 text-xs md:text-sm">Enterprise Security</span>
                  </div>

                  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-normal leading-tight mb-4 md:mb-8">
                    Patient Scheduling
                    <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-br from-green-600 to-green-400">Medical Appointment Management</span>
                  </h1>

                  <p className="text-base md:text-lg lg:text-xl text-slate-600 max-w-2xl mb-6 md:mb-12">
                    Secure AI for healthcare practices. Automate patient appointment booking, reminders, and rescheduling
                    while maintaining full security and reducing no-shows by up to 80%.
                  </p>

                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 md:gap-6">
                    <Link
                      href="/demo"
                      className="btn-primary h-12 md:h-14 px-6 md:px-10 rounded-lg text-base md:text-lg w-full sm:w-auto text-center flex items-center justify-center"
                    >
                      <span>Request Demo</span>
                    </Link>
                    <a
                      href="tel:+16163263328"
                      className="group h-12 md:h-14 px-6 md:px-10 rounded-lg bg-slate-50/80 border border-slate-200 text-slate-600 font-semibold transition-all flex items-center justify-center gap-2 md:gap-3 text-base md:text-lg hover:bg-white hover:border-green-200 active:scale-[0.98] w-full sm:w-auto"
                    >
                      <FaPhone className="text-xs md:text-sm group-hover:text-green-600 transition-colors" />
                      <span className="group-hover:text-green-600 transition-colors">Talk to Expert</span>
                    </a>
                  </div>
                </div>

                <div className="relative z-10 mt-6 md:mt-8 grid grid-cols-3 gap-4 md:gap-8">
                  <div className="text-center">
                    <div className="text-xl md:text-2xl lg:text-3xl font-bold text-green-600">80%</div>
                    <div className="text-xs md:text-sm text-slate-500">Fewer No-Shows</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl md:text-2xl lg:text-3xl font-bold text-green-600">24/7</div>
                    <div className="text-xs md:text-sm text-slate-500">Booking Access</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl md:text-2xl lg:text-3xl font-bold text-green-600">100%</div>
                    <div className="text-xs md:text-sm text-slate-500">Secure Platform</div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, ease: [0.23, 1, 0.32, 1], delay: 0.5 }}
                className="col-span-12 lg:col-span-4 bento-card flex flex-col justify-between pointer-events-auto p-4 sm:p-6 md:p-8"
              >
                <div className="space-y-4 md:space-y-6">
                  <div className="flex items-start gap-3 md:gap-4">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-green-100 flex items-center justify-center flex-shrink-0">
                      <FaCalendarAlt className="text-green-600 text-lg md:text-xl" />
                    </div>
                    <div>
                      <h3 className="text-base md:text-lg font-semibold mb-1 md:mb-2">Smart Booking</h3>
                      <p className="text-sm md:text-base text-slate-600">Intelligent appointment scheduling with provider availability and patient preferences.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 md:gap-4">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0">
                      <FaBell className="text-blue-600 text-lg md:text-xl" />
                    </div>
                    <div>
                      <h3 className="text-base md:text-lg font-semibold mb-1 md:mb-2">Auto Reminders</h3>
                      <p className="text-sm md:text-base text-slate-600">Automated reminder calls and texts to reduce missed appointments.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 md:gap-4">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-purple-100 flex items-center justify-center flex-shrink-0">
                      <FaNotesMedical className="text-purple-600 text-lg md:text-xl" />
                    </div>
                    <div>
                      <h3 className="text-base md:text-lg font-semibold mb-1 md:mb-2">EMR Integration</h3>
                      <p className="text-sm md:text-base text-slate-600">Seamless integration with Epic, Cerner, and all major EMR systems.</p>
                    </div>
                  </div>
                </div>
              </motion.div>

            </div>
          </div>
        </section>

        <TechSection
          badge="Features"
          title="Complete Patient Scheduling Solution"
          subtitle="Everything you need for medical appointment management"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-7xl mx-auto px-4 md:px-0">
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
                <div className="text-center p-2 md:p-4">
                  <div className="w-12 h-12 md:w-14 md:h-14 mx-auto mb-3 md:mb-4 bg-gray-50 border border-gray-200 rounded-xl flex items-center justify-center">
                    <feature.icon className="text-xl md:text-2xl text-green-600" />
                  </div>
                  <h3 className="text-lg md:text-xl font-medium text-[#37322F] mb-2">{feature.title}</h3>
                  <p className="text-xs md:text-sm text-[rgba(49,45,43,0.70)]">{feature.description}</p>
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 max-w-6xl mx-auto px-4 md:px-0">
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
                <div className="flex items-start gap-3 md:gap-4 p-2 md:p-4">
                  <div className="text-3xl md:text-4xl font-thin text-white/20">{item.step}</div>
                  <div className="flex-1">
                    <h3 className="text-lg md:text-xl font-medium text-[#37322F] mb-2 md:mb-3">{item.title}</h3>
                    <p className="text-xs md:text-sm text-[rgba(49,45,43,0.70)]">{item.description}</p>
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
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-6xl mx-auto px-4 md:px-0">
            {[
              { value: '40%', label: 'Fewer No-Shows', suffix: '' },
              { value: '24/7', label: 'Booking Available', suffix: '' },
              { value: '85%', label: 'Staff Time Saved', suffix: '' },
              { value: '100%', label: 'Secure Platform', suffix: '' }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#37322F] mb-1 md:mb-2">
                  {stat.value}
                  {stat.suffix && <span className="text-xl md:text-2xl ml-1">{stat.suffix}</span>}
                </div>
                <div className="text-xs sm:text-sm text-[rgba(49,45,43,0.70)]">{stat.label}</div>
              </div>
            ))}
          </div>
        </TechSection>

        <TechSection
          badge="Get Started"
          title="Ready to Automate Patient Scheduling?"
          subtitle="Join hundreds of medical practices using Cognia AI"
        >
          <div className="max-w-4xl mx-auto text-center px-4 md:px-0">
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-stretch sm:items-center mb-6 md:mb-8">
              <Link
                href="/demo"
                className="btn-primary flex items-center justify-center gap-2 px-6 md:px-8 py-3 md:py-4 text-base md:text-lg rounded-xl w-full sm:w-auto"
              >
                <span>Schedule Demo</span>
              </Link>
              <Link
                href="/industries/healthcare"
                className="px-6 md:px-8 py-3 md:py-4 border border-slate-200 hover:bg-slate-50 text-slate-600 text-base md:text-lg font-medium rounded-md transition-colors w-full sm:w-auto text-center"
              >
                Healthcare Solutions
              </Link>
            </div>

            <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6 text-xs text-gray-500">
              <span className="flex items-center gap-2"><FaCheckCircle />Enterprise Security</span>
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
