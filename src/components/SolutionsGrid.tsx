import React from 'react';
import { motion } from 'framer-motion';
import { FaHospital, FaGavel, FaHome, FaBuilding, FaHotel, FaStore } from 'react-icons/fa';

const solutions = [
  {
    icon: FaHospital,
    industry: 'Healthcare',
    title: 'Medical & Dental Practices',
    features: ['HIPAA-compliant', 'Patient scheduling', 'Prescription refills'],
  },
  {
    icon: FaGavel,
    industry: 'Legal',
    title: 'Law Firms',
    features: ['Client intake', 'Case screening', 'Appointment booking'],
  },
  {
    icon: FaHome,
    industry: 'Home Services',
    title: 'HVAC, Plumbing, Electric',
    features: ['Emergency dispatch', 'Quote requests', 'Service scheduling'],
  },
  {
    icon: FaBuilding,
    industry: 'Real Estate',
    title: 'Property Management',
    features: ['Showing scheduling', 'Lead qualification', 'Maintenance requests'],
  },
  {
    icon: FaHotel,
    industry: 'Hospitality',
    title: 'Hotels & Restaurants',
    features: ['Reservations', 'Special requests', 'Availability checks'],
  },
  {
    icon: FaStore,
    industry: 'Retail',
    title: 'Stores & E-commerce',
    features: ['Order status', 'Product inquiries', 'Returns processing'],
  },
];

const SolutionsGrid: React.FC = () => {
  return (
    <section className="relative bg-black py-20 lg:py-28">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 mb-6 text-xs font-medium text-gray-400 bg-white/5 border border-white/10 rounded-full">
            Industries
          </span>
          <h2 className="text-3xl lg:text-5xl font-light text-white mb-4">
            Built for Your Industry
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            AI trained on industry-specific workflows and terminology
          </p>
        </motion.div>

        {/* Solutions Grid - Static 3 columns */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {solutions.map((solution, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group p-6 bg-white/[0.02] border border-white/5 rounded-2xl hover:border-cyan-500/20 transition-colors"
            >
              {/* Icon & Industry */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-cyan-500/10 border border-cyan-500/20 rounded-lg flex items-center justify-center">
                  <solution.icon className="text-lg text-cyan-400" />
                </div>
                <span className="text-xs text-cyan-400 font-medium uppercase tracking-wider">
                  {solution.industry}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-lg font-medium text-white mb-3">{solution.title}</h3>

              {/* Features */}
              <ul className="space-y-2">
                {solution.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-gray-400">
                    <span className="w-1 h-1 bg-cyan-400 rounded-full" />
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SolutionsGrid;
