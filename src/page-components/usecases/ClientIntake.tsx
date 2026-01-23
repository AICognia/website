'use client'
import React from 'react';
import { FaUserTie, FaClipboardList, FaFileContract, FaCheckCircle, FaPhone, FaBalanceScale, FaShieldAlt, FaClock, FaCalendarCheck, FaArrowRight } from 'react-icons/fa';
import Link from 'next/link';
import { motion } from 'framer-motion';
import SEO from '../../components/SEO';
import DynamicTechBackground from '../../components/DynamicTechBackground';
import TechSection from '../../components/TechSection';
import TechCard from '../../components/TechCard';

const ClientIntake: React.FC = () => {
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
                    <FaUserTie className="w-3 h-3 md:w-4 md:h-4 text-orange-600" />
                    <span className="body-small uppercase tracking-widest text-slate-600 text-xs md:text-sm">Use Case</span>
                  </div>

                  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-normal leading-tight mb-4 md:mb-8">
                    Client Intake
                    <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-br from-orange-600 to-orange-400">Automated Client Onboarding</span>
                  </h1>

                  <p className="text-base md:text-lg lg:text-xl text-slate-600 max-w-2xl mb-6 md:mb-12">
                    Streamline client onboarding for law firms, consulting, and professional services.
                    Collect information, screen prospects, and schedule consultations automatically.
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
                      className="group h-12 md:h-14 px-6 md:px-10 rounded-lg bg-slate-50/80 border border-slate-200 text-slate-600 font-semibold transition-all flex items-center justify-center gap-2 md:gap-3 text-base md:text-lg hover:bg-white hover:border-orange-200 active:scale-[0.98] w-full sm:w-auto"
                    >
                      <FaPhone className="text-xs md:text-sm group-hover:text-orange-600 transition-colors" />
                      <span className="group-hover:text-orange-600 transition-colors">Talk to Sales</span>
                    </a>
                  </div>
                </div>

                <div className="relative z-10 mt-6 md:mt-8 grid grid-cols-3 gap-4 md:gap-8">
                  <div className="text-center">
                    <div className="text-xl md:text-2xl lg:text-3xl font-bold text-orange-600">60%</div>
                    <div className="text-xs md:text-sm text-slate-500">More Leads</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl md:text-2xl lg:text-3xl font-bold text-orange-600">24/7</div>
                    <div className="text-xs md:text-sm text-slate-500">Availability</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl md:text-2xl lg:text-3xl font-bold text-orange-600">90%</div>
                    <div className="text-xs md:text-sm text-slate-500">Time Saved</div>
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
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-orange-100 flex items-center justify-center flex-shrink-0">
                      <FaClipboardList className="text-orange-600 text-lg md:text-xl" />
                    </div>
                    <div>
                      <h3 className="text-base md:text-lg font-semibold mb-1 md:mb-2">Information Collection</h3>
                      <p className="text-sm md:text-base text-slate-600">Gather case details and contact info through natural conversation.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 md:gap-4">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-amber-100 flex items-center justify-center flex-shrink-0">
                      <FaBalanceScale className="text-amber-600 text-lg md:text-xl" />
                    </div>
                    <div>
                      <h3 className="text-base md:text-lg font-semibold mb-1 md:mb-2">Conflict Checking</h3>
                      <p className="text-sm md:text-base text-slate-600">Automatically check for conflicts before scheduling consultations.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 md:gap-4">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-rose-100 flex items-center justify-center flex-shrink-0">
                      <FaCalendarCheck className="text-rose-600 text-lg md:text-xl" />
                    </div>
                    <div>
                      <h3 className="text-base md:text-lg font-semibold mb-1 md:mb-2">Auto Scheduling</h3>
                      <p className="text-sm md:text-base text-slate-600">Book consultations with the right attorney based on practice area.</p>
                    </div>
                  </div>
                </div>
              </motion.div>

            </div>
          </div>
        </section>

        <TechSection
          badge="Features"
          title="Complete Client Intake Solution"
          subtitle="Automate the entire onboarding process"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-7xl mx-auto px-4 md:px-0">
            {[
              {
                icon: FaClipboardList,
                title: 'Information Collection',
                description: 'Gather case details, contact information, and background through natural conversation.'
              },
              {
                icon: FaBalanceScale,
                title: 'Conflict Checking',
                description: 'Automatically check for conflicts of interest before scheduling consultations.'
              },
              {
                icon: FaShieldAlt,
                title: 'Qualification Screening',
                description: 'Pre-screen potential clients based on case type, jurisdiction, and fit criteria.'
              },
              {
                icon: FaFileContract,
                title: 'Document Collection',
                description: 'Request and track required documents and forms before first consultation.'
              },
              {
                icon: FaClock,
                title: 'Consultation Scheduling',
                description: 'Book initial consultations with the right attorney based on practice area and availability.'
              },
              {
                icon: FaUserTie,
                title: 'CRM Integration',
                description: 'Sync all intake data to Clio, MyCase, or your case management system instantly.'
              }
            ].map((feature, index) => (
              <TechCard key={index}>
                <div className="text-center p-2 md:p-4">
                  <div className="w-12 h-12 md:w-14 md:h-14 mx-auto mb-3 md:mb-4 bg-gray-50 border border-gray-200 rounded-xl flex items-center justify-center">
                    <feature.icon className="text-xl md:text-2xl text-orange-600" />
                  </div>
                  <h3 className="text-lg md:text-xl font-medium text-[#37322F] mb-2">{feature.title}</h3>
                  <p className="text-xs md:text-sm text-[rgba(49,45,43,0.70)]">{feature.description}</p>
                </div>
              </TechCard>
            ))}
          </div>
        </TechSection>

        <TechSection
          badge="Benefits"
          title="Results for Professional Services"
          subtitle="Faster intake, more qualified leads"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-6xl mx-auto px-4 md:px-0">
            {[
              { value: '60%', label: 'More Leads Captured', suffix: '' },
              { value: '24/7', label: 'Intake Available', suffix: '' },
              { value: '90%', label: 'Admin Time Saved', suffix: '' },
              { value: '100%', label: 'Confidential', suffix: '' }
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
          title="Ready to Automate Client Intake?"
          subtitle="Capture more leads and save time"
        >
          <div className="max-w-4xl mx-auto text-center px-4 md:px-0">
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-stretch sm:items-center mb-6 md:mb-8">
              <Link
                href="/demo"
                className="btn-primary flex items-center justify-center gap-2 px-6 md:px-8 py-3 md:py-4 text-base md:text-lg rounded-xl w-full sm:w-auto"
              >
                <span>Request Demo</span>
              </Link>
              <Link
                href="/industries/legal"
                className="px-6 md:px-8 py-3 md:py-4 border border-gray-200 hover:bg-gray-50 text-slate-600 text-base md:text-lg font-medium rounded-md transition-colors w-full sm:w-auto text-center"
              >
                Legal Solutions
              </Link>
            </div>

            <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6 text-xs text-gray-500">
              <span className="flex items-center gap-2"><FaCheckCircle />Secure & Confidential</span>
              <span className="flex items-center gap-2"><FaCheckCircle />Conflict Checking</span>
              <span className="flex items-center gap-2"><FaCheckCircle />Auto Qualification</span>
              <span className="flex items-center gap-2"><FaCheckCircle />CRM Sync</span>
            </div>
          </div>
        </TechSection>
      </div>
    </div>
  );
};

export default ClientIntake;
