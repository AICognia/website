import React from 'react';
import { FaChartLine, FaChartBar, FaChartPie, FaCheckCircle, FaPhone, FaClock, FaTachometerAlt, FaDownload, FaCalendarCheck, FaArrowRight } from 'react-icons/fa';
import Link from 'next/link';
import { motion } from 'framer-motion';
import SEO from '../../components/SEO';
import DynamicTechBackground from '../../components/DynamicTechBackground';
import TechSection from '../../components/TechSection';
import TechCard from '../../components/TechCard';
const AnalyticsDashboard: React.FC = () => {
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
                <span className="text-xs text-[rgba(49,45,43,0.70)] uppercase tracking-widest">Feature</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-thin text-[#37322F] mb-4 sm:mb-6">
                Analytics Dashboard
                <br />
                Real-Time Insights
              </h1>

              <p className="text-base sm:text-lg text-[rgba(49,45,43,0.70)] max-w-3xl mx-auto mb-6 sm:mb-8 px-2 sm:px-0">
                Comprehensive analytics and reporting to understand call patterns, customer behavior, and business performance with actionable insights.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4 sm:px-0">
                <Link
                  href="/demo"
                  className="flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-primary to-blue-600 hover:from-primary-light hover:to-blue-500 text-white text-base sm:text-lg font-semibold rounded-xl transition-all shadow-lg shadow-primary/25 w-full sm:w-auto"
                >
                  <FaCalendarCheck />
                  Schedule Demo
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
          title="Data-Driven Decision Making"
          subtitle="Track every metric that matters"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-7xl mx-auto">
            {[
              {
                icon: FaTachometerAlt,
                title: 'Real-Time Dashboard',
                description: 'Live metrics updating in real-time. Monitor call volume, wait times, and performance instantly.'
              },
              {
                icon: FaChartLine,
                title: 'Trend Analysis',
                description: 'Identify patterns over time. See call volume by hour, day, week, or custom periods.'
              },
              {
                icon: FaChartBar,
                title: 'Performance Metrics',
                description: 'Track resolution rates, customer satisfaction, call duration, and conversion rates.'
              },
              {
                icon: FaChartPie,
                title: 'Call Distribution',
                description: 'Visualize call types, common questions, peak hours, and customer demographics.'
              },
              {
                icon: FaDownload,
                title: 'Custom Reports',
                description: 'Generate detailed reports with custom filters and export to PDF, CSV, or Excel.'
              },
              {
                icon: FaClock,
                title: 'Historical Data',
                description: 'Access unlimited historical data with advanced search and filtering capabilities.'
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
          badge="Metrics"
          title="Key Performance Indicators"
          subtitle="Track the metrics that drive your business"
        >
          <div className="max-w-6xl mx-auto">
            <TechCard>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                <div>
                  <h3 className="text-lg sm:text-xl font-medium text-[#37322F] mb-3 sm:mb-4">Call Metrics</h3>
                  <ul className="space-y-2 sm:space-y-3">
                    <li className="flex items-start gap-2 text-gray-300 text-xs sm:text-sm">
                      <FaCheckCircle className="flex-shrink-0 mt-0.5 text-white" />
                      <span>Total calls, answered, missed, and abandoned</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-300 text-xs sm:text-sm">
                      <FaCheckCircle className="flex-shrink-0 mt-0.5 text-white" />
                      <span>Average call duration and wait time</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-300 text-xs sm:text-sm">
                      <FaCheckCircle className="flex-shrink-0 mt-0.5 text-white" />
                      <span>Peak hours and call volume patterns</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-300 text-xs sm:text-sm">
                      <FaCheckCircle className="flex-shrink-0 mt-0.5 text-white" />
                      <span>Call-to-appointment conversion rates</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-medium text-[#37322F] mb-3 sm:mb-4">Business Intelligence</h3>
                  <ul className="space-y-2 sm:space-y-3">
                    <li className="flex items-start gap-2 text-gray-300 text-xs sm:text-sm">
                      <FaCheckCircle className="flex-shrink-0 mt-0.5 text-white" />
                      <span>Customer satisfaction scores and sentiment</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-300 text-xs sm:text-sm">
                      <FaCheckCircle className="flex-shrink-0 mt-0.5 text-white" />
                      <span>Common questions and topics</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-300 text-xs sm:text-sm">
                      <FaCheckCircle className="flex-shrink-0 mt-0.5 text-white" />
                      <span>Revenue attribution and ROI tracking</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-300 text-xs sm:text-sm">
                      <FaCheckCircle className="flex-shrink-0 mt-0.5 text-white" />
                      <span>Detailed call transcripts and recordings</span>
                    </li>
                  </ul>
                </div>
              </div>
            </TechCard>
          </div>
        </TechSection>

        <TechSection
          badge="Benefits"
          title="Make Better Decisions"
          subtitle="Actionable insights for business growth"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-6xl mx-auto">
            {[
              { value: '100%', label: 'Call Visibility', suffix: '' },
              { value: 'Real-Time', label: 'Updates', suffix: '' },
              { value: '50+', label: 'Metrics Tracked', suffix: '' },
              { value: 'Unlimited', label: 'History', suffix: '' }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl sm:text-4xl lg:text-5xl font-bold text-[#37322F] mb-1 sm:mb-2">
                  {stat.value}
                  {stat.suffix && <span className="text-lg sm:text-2xl ml-1">{stat.suffix}</span>}
                </div>
                <div className="text-xs sm:text-sm text-[rgba(49,45,43,0.70)]">{stat.label}</div>
              </div>
            ))}
          </div>
        </TechSection>

        <TechSection
          badge="Get Started"
          title="Ready for Data-Driven Insights?"
          subtitle="Understand your customers like never before"
        >
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-0">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-6 sm:mb-8">
              <Link
                href="/demo"
                className="flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-primary to-blue-600 hover:from-primary-light hover:to-blue-500 text-white text-base sm:text-lg font-semibold rounded-xl transition-all shadow-lg shadow-primary/25 w-full sm:w-auto"
              >
                <FaCalendarCheck />
                Schedule Demo
              </Link>
              <Link
                href="/what-we-do"
                className="px-6 sm:px-8 py-3 sm:py-4 border border-gray-200 hover:bg-gray-50 text-white text-base sm:text-lg font-medium rounded-md transition-colors w-full sm:w-auto text-center"
              >
                View All Features
              </Link>
            </div>

            <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-6 text-xs text-gray-500">
              <span className="flex items-center gap-2"><FaCheckCircle />Real-Time Data</span>
              <span className="flex items-center gap-2"><FaCheckCircle />Custom Reports</span>
              <span className="flex items-center gap-2"><FaCheckCircle />Easy Export</span>
              <span className="flex items-center gap-2"><FaCheckCircle />Unlimited Access</span>
            </div>
          </div>
        </TechSection>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
