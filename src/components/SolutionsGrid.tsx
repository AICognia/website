import React from 'react';
import { FaHospital, FaGavel, FaStore, FaBuilding, FaPhone, FaCalendar } from 'react-icons/fa';

const SolutionsGrid: React.FC = () => {
  const solutions = [
    {
      badge: 'Healthcare',
      icon: FaHospital,
      title: 'Secure Patient Scheduling',
      description: 'Secure AI receptionists for medical practices',
      link: '/solutions#healthcare'
    },
    {
      badge: 'Legal',
      icon: FaGavel,
      title: 'Client Intake & Case Management',
      description: 'Professional call handling for law firms',
      link: '/solutions#legal'
    },
    {
      badge: 'Retail',
      icon: FaStore,
      title: 'Customer Service Excellence',
      description: 'Multi-location support and order management',
      link: '/solutions#retail'
    },
    {
      badge: 'Enterprise',
      icon: FaBuilding,
      title: 'Enterprise Call Distribution',
      description: 'Scalable solutions for large organizations',
      link: '/solutions#enterprise'
    },
    {
      badge: 'Appointment',
      icon: FaCalendar,
      title: 'Smart Booking Systems',
      description: 'AI-powered scheduling and reminders',
      link: '/solutions#booking'
    },
    {
      badge: 'Support',
      icon: FaPhone,
      title: '24/7 Customer Support',
      description: 'Round-the-clock availability for your customers',
      link: '/solutions#support'
    }
  ];

  return (
    <section className="relative bg-black text-white py-32 overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Centered Header */}
        <div className="text-center max-w-4xl mx-auto mb-20">
          <div className="inline-block px-3 py-1 bg-white/5 border border-white/10 rounded-full mb-6">
            <span className="text-xs text-gray-400 uppercase tracking-widest">
              Trusted by Industry Leaders
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-thin text-white mb-6">
            AI Solutions for Every Industry
          </h2>
          <p className="text-lg sm:text-xl text-gray-400">
            Our AI-powered call center solutions adapt to your specific business needs,
            providing intelligent automation and exceptional customer experiences across all sectors.
          </p>
        </div>

        {/* Sliding Cards Container */}
        <div className="relative max-w-7xl mx-auto">
          <div className="flex gap-6 animate-slideInfinite">
            {/* First set of cards */}
            {solutions.map((solution, index) => (
              <a
                key={`first-${index}`}
                href={solution.link}
                className="group relative bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-2xl p-8 hover:border-white/20 transition-all duration-300 flex-shrink-0 w-[350px]"
              >
                <div className="mb-6">
                  <span className="text-xs text-gray-400 uppercase tracking-wider">
                    {solution.badge}
                  </span>
                </div>

                {/* Icon */}
                <div className="mb-6">
                  <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center">
                    <solution.icon className="text-2xl text-white" />
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-medium text-white mb-3 leading-tight">
                  {solution.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-400 mb-6">
                  {solution.description}
                </p>

                {/* Arrow Button */}
                <div className="absolute bottom-8 right-8">
                  <div className="w-8 h-8 bg-white/5 border border-white/10 rounded-full flex items-center justify-center group-hover:bg-transparent/10 transition-colors">
                    <span className="text-white text-sm">→</span>
                  </div>
                </div>
              </a>
            ))}

            {/* Duplicate set for infinite scroll */}
            {solutions.map((solution, index) => (
              <a
                key={`second-${index}`}
                href={solution.link}
                className="group relative bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-2xl p-8 hover:border-white/20 transition-all duration-300 flex-shrink-0 w-[350px]"
              >
                <div className="mb-6">
                  <span className="text-xs text-gray-400 uppercase tracking-wider">
                    {solution.badge}
                  </span>
                </div>

                {/* Icon */}
                <div className="mb-6">
                  <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center">
                    <solution.icon className="text-2xl text-white" />
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-medium text-white mb-3 leading-tight">
                  {solution.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-400 mb-6">
                  {solution.description}
                </p>

                {/* Arrow Button */}
                <div className="absolute bottom-8 right-8">
                  <div className="w-8 h-8 bg-white/5 border border-white/10 rounded-full flex items-center justify-center group-hover:bg-transparent/10 transition-colors">
                    <span className="text-white text-sm">→</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideInfinite {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-350px * 6 - 1.5rem * 6));
          }
        }

        .animate-slideInfinite {
          animation: slideInfinite 30s linear infinite;
        }

        .animate-slideInfinite:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default SolutionsGrid;
