import React from 'react';
import { motion } from 'framer-motion';
import { FaHotel, FaBed, FaConciergeBell, FaGlobeAmericas, FaClock, FaLanguage, FaStar, FaWifi } from 'react-icons/fa';

const HospitalitySection: React.FC = () => {
  const segments = [
    { 
      icon: <FaHotel className="text-3xl" />, 
      title: 'Hotels',
      features: ['Room reservations', 'Upselling suites', 'Loyalty programs'],
      stat: '30% more bookings'
    },
    { 
      icon: <FaBed className="text-3xl" />, 
      title: 'Boutique Hotels',
      features: ['Personalized service', 'Special requests', 'Local recommendations'],
      stat: '4.8★ guest rating'
    },
    { 
      icon: <FaConciergeBell className="text-3xl" />, 
      title: 'Resorts',
      features: ['Activity bookings', 'Spa reservations', 'Dining reservations'],
      stat: '$35K+ monthly revenue'
    },
    { 
      icon: <FaGlobeAmericas className="text-3xl" />, 
      title: 'Hotel Chains',
      features: ['Multi-property routing', 'Central reservations', 'Group bookings'],
      stat: '500+ locations'
    }
  ];

  const keyFeatures = [
    { icon: <FaLanguage />, title: '20+ Languages', description: 'Serve international guests in their language' },
    { icon: <FaWifi />, title: 'PMS Integration', description: 'Opera, Cloudbeds, and major systems' },
    { icon: <FaConciergeBell />, title: 'Concierge Services', description: 'Restaurant bookings, local attractions' },
    { icon: <FaClock />, title: '24/7 Booking', description: 'Never miss international travelers' }
  ];

  const painPoints = [
    { stat: '67%', description: "of travelers book outside business hours" },
    { stat: '$150-600', description: 'average lost per missed booking' },
    { stat: '73%', description: 'of guests prefer instant response' },
    { stat: '45%', description: 'of calls are for basic information' }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center bg-blue-100 px-4 py-2 rounded-full mb-4">
            <FaHotel className="text-blue-700 mr-2" />
            <span className="text-blue-700 font-semibold">HOSPITALITY SOLUTIONS</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Designed for Hotels & Resorts
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From boutique hotels to global chains, our AI receptionist delivers 5-star service in every language, at any hour.
          </p>
        </motion.div>

        {/* Hospitality Segments */}
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
              <div className="text-blue-600 mb-4">{segment.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{segment.title}</h3>
              <ul className="space-y-2 mb-4">
                {segment.features.map((feature, idx) => (
                  <li key={idx} className="text-sm text-gray-600 flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    {feature}
                  </li>
                ))}
              </ul>
              <div className="pt-4 border-t border-gray-100">
                <span className="text-lg font-bold text-blue-600">{segment.stat}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Pain Points */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8 mb-16 border border-purple-100"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            The Hidden Cost of Missed Reservations
          </h3>
          <div className="grid md:grid-cols-4 gap-6">
            {painPoints.map((point, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">{point.stat}</div>
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
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-500 rounded-full text-white text-2xl mb-4 shadow-lg">
                {feature.icon}
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* International Guest Support */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-r from-indigo-100 to-purple-100 rounded-2xl p-8 mb-16 border border-indigo-200"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Serve International Guests in Their Language
            </h3>
            <p className="text-gray-600">Our AI speaks fluently in over 20 languages</p>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4 text-center">
            {['🇺🇸 English', '🇪🇸 Spanish', '🇫🇷 French', '🇩🇪 German', '🇨🇳 Chinese', '🇯🇵 Japanese'].map((lang, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.1 }}
                className="bg-white rounded-lg p-3 shadow-md"
              >
                <span className="text-lg">{lang}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Success Story */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-br from-blue-700 to-indigo-600 rounded-2xl p-8 text-white shadow-xl"
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-400 text-xl" />
                ))}
              </div>
              <h3 className="text-3xl font-bold mb-4">
                Transforming Guest Experience
              </h3>
              <blockquote className="text-lg mb-4 italic">
                "Cognia AI handles 80% of our calls automatically. International bookings increased by 45% since we can now serve guests 24/7 in their language."
              </blockquote>
              <p className="font-semibold">Michael Chen</p>
              <p className="text-blue-200">Grand Plaza Hotel, General Manager</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                <div className="text-3xl font-bold mb-1">45%</div>
                <p className="text-sm text-blue-200">More Int'l Bookings</p>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                <div className="text-3xl font-bold mb-1">80%</div>
                <p className="text-sm text-blue-200">Call Automation</p>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                <div className="text-3xl font-bold mb-1">4.8★</div>
                <p className="text-sm text-blue-200">Guest Rating</p>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                <div className="text-3xl font-bold mb-1">$35K</div>
                <p className="text-sm text-blue-200">Monthly Revenue</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HospitalitySection;
