import React from 'react';
import { FaHospital, FaGavel, FaHome, FaBuilding, FaHotel, FaStore } from 'react-icons/fa';

const solutions = [
  {
    icon: FaHotel,
    industry: 'Hospitality',
    title: 'Hotels & Restaurants',
    examples: 'Hotels, motels, restaurants, resorts',
    features: ['Reservations', 'Special requests', 'Availability checks'],
  },
  {
    icon: FaHospital,
    industry: 'Healthcare',
    title: 'Medical & Dental Practices',
    examples: 'Dentists, chiropractors, medspas, clinics',
    features: ['HIPAA-compliant', 'Patient scheduling', 'Prescription refills'],
  },
  {
    icon: FaHome,
    industry: 'Home Services',
    title: 'HVAC, Plumbing, Electric',
    examples: 'Plumbers, HVAC technicians, electricians',
    features: ['Emergency dispatch', 'Quote requests', 'Service scheduling'],
  },
  {
    icon: FaGavel,
    industry: 'Legal',
    title: 'Law Firms',
    examples: 'Personal injury, family law, corporate',
    features: ['Client intake', 'Case screening', 'Appointment booking'],
  },
  {
    icon: FaBuilding,
    industry: 'Real Estate',
    title: 'Property Management',
    examples: 'Brokers, property managers, agents',
    features: ['Showing scheduling', 'Lead qualification', 'Maintenance requests'],
  },
  {
    icon: FaStore,
    industry: 'Retail',
    title: 'Stores & E-commerce',
    examples: 'Boutiques, auto shops, service centers',
    features: ['Order status', 'Product inquiries', 'Returns processing'],
  },
];

const SolutionsGrid: React.FC = () => {
  return (
    <section className="relative bg-black py-20 lg:py-28">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 mb-6 text-xs font-medium text-gray-400 bg-white/5 border border-white/10 rounded-full">
            Industries
          </span>
          <h2 className="text-3xl lg:text-5xl font-light text-white mb-4">
            Built for Your Industry
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            AI trained on industry-specific workflows and terminology
          </p>
        </div>

        {/* Solutions Grid - Static 3 columns */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {solutions.map((solution, index) => (
            <div
              key={index}
              className="group p-6 bg-white/[0.02] border border-white/5 rounded-2xl hover:border-cyan-500/30 hover:bg-cyan-500/[0.02] transition-all duration-300"
            >
              {/* Icon & Industry */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-cyan-500/10 border border-cyan-500/20 rounded-lg flex items-center justify-center group-hover:bg-cyan-500/20 group-hover:border-cyan-500/40 transition-all duration-300">
                  <solution.icon className="text-lg text-cyan-400" />
                </div>
                <span className="text-xs text-cyan-400 font-medium uppercase tracking-wider">
                  {solution.industry}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-lg font-medium text-white mb-1 group-hover:text-cyan-50 transition-colors">{solution.title}</h3>

              {/* Examples */}
              <p className="text-xs text-gray-500 mb-3">{solution.examples}</p>

              {/* Features */}
              <ul className="space-y-2">
                {solution.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-gray-400">
                    <span className="w-1 h-1 bg-cyan-400 rounded-full" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SolutionsGrid;
