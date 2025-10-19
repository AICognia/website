import React from 'react';
import { motion } from 'framer-motion';
import { FaUserMd, FaTooth, FaSpa, FaHospital, FaShieldAlt, FaCalendarCheck, FaChartLine, FaSync } from 'react-icons/fa';

const HealthcareSection: React.FC = () => {
  const segments = [
    { 
      icon: <FaTooth className="text-3xl" />, 
      title: 'Dental Clinics',
      features: ['Appointment scheduling', 'Recall campaigns', 'Insurance verification'],
      stat: '87% booking rate'
    },
    { 
      icon: <FaUserMd className="text-3xl" />, 
      title: 'Medical Practices',
      features: ['Multi-provider scheduling', 'Prescription refills', 'Lab result inquiries'],
      stat: '24/7 availability'
    },
    { 
      icon: <FaSpa className="text-3xl" />, 
      title: 'MedSpas',
      features: ['Treatment consultations', 'Package bookings', 'Membership management'],
      stat: '$45K+ monthly revenue'
    },
    { 
      icon: <FaHospital className="text-3xl" />, 
      title: 'Hospitals',
      features: ['Department routing', 'Visitor information', 'Emergency triage'],
      stat: '10,000+ calls/month'
    }
  ];

  const keyFeatures = [
    { icon: <FaShieldAlt />, title: 'HIPAA Compliant', description: 'Full compliance with healthcare privacy regulations' },
    { icon: <FaCalendarCheck />, title: 'PMS/EMR Integration', description: 'Seamless integration with practice management systems' },
    { icon: <FaChartLine />, title: 'Insurance Verification', description: 'Automated insurance eligibility checks' },
    { icon: <FaSync />, title: 'Recall Campaigns', description: 'Automated patient follow-ups and reminders' }
  ];

  const painPoints = [
    { stat: '42%', description: "of patients won't call back if first call unanswered" },
    { stat: '$200-5,000', description: 'average cost per missed appointment' },
    { stat: '67%', description: 'of calls come after business hours' },
    { stat: '4 hours', description: 'daily time spent on phone scheduling' }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-cyan-50">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center bg-cyan-100 px-4 py-2 rounded-full mb-4">
            <FaUserMd className="text-cyan-700 mr-2" />
            <span className="text-cyan-700 font-semibold">HEALTHCARE SOLUTIONS</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Built for Healthcare Providers
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From solo practitioners to multi-location health systems, our AI receptionist handles patient communications with care and compliance.
          </p>
        </motion.div>

        {/* Healthcare Segments */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {segments.map((segment, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all border border-gray-100"
            >
              <div className="text-cyan-600 mb-4">{segment.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{segment.title}</h3>
              <ul className="space-y-2 mb-4">
                {segment.features.map((feature, idx) => (
                  <li key={idx} className="text-sm text-gray-600 flex items-start">
                    <span className="text-cyan-500 mr-2">•</span>
                    {feature}
                  </li>
                ))}
              </ul>
              <div className="pt-4 border-t border-gray-100">
                <span className="text-lg font-bold text-cyan-600">{segment.stat}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Pain Points */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl p-8 mb-16 border border-red-100"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            The Cost of Missed Opportunities
          </h3>
          <div className="grid md:grid-cols-4 gap-6">
            {painPoints.map((point, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-red-600 mb-2">{point.stat}</div>
                <p className="text-sm text-gray-700">{point.description}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Key Features */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {keyFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-cyan-600 to-cyan-500 rounded-full text-white text-2xl mb-4 shadow-lg">
                {feature.icon}
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Success Story */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-br from-cyan-700 to-cyan-600 rounded-2xl p-8 text-white shadow-xl"
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-3xl font-bold mb-4">
                Real Results from Healthcare Providers
              </h3>
              <blockquote className="text-lg mb-4 italic">
                "Since implementing Cognia AI, we've reduced our no-show rate by 35% and increased new patient bookings by 40%. The ROI was immediate."
              </blockquote>
              <p className="font-semibold">Dr. Sarah Johnson</p>
              <p className="text-cyan-200">Family Dental Practice</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                <div className="text-3xl font-bold mb-1">40%</div>
                <p className="text-sm text-cyan-200">More Bookings</p>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                <div className="text-3xl font-bold mb-1">35%</div>
                <p className="text-sm text-cyan-200">Less No-Shows</p>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                <div className="text-3xl font-bold mb-1">$50K</div>
                <p className="text-sm text-cyan-200">Monthly Saved</p>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                <div className="text-3xl font-bold mb-1">24/7</div>
                <p className="text-sm text-cyan-200">Availability</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HealthcareSection;
