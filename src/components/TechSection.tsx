import React from 'react';
import { motion } from 'framer-motion';

interface TechSectionProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
  badge?: string;
  badgeColor?: 'cyan' | 'green' | 'purple' | 'blue';
  titleColor?: 'default' | 'green';
  noPadding?: boolean;
  id?: string;
}

const TechSection: React.FC<TechSectionProps> = ({
  children,
  className = '',
  title,
  subtitle,
  badge,
  badgeColor = 'cyan',
  titleColor = 'default',
  noPadding = false,
  id,
}) => {
  return (
    <section
      id={id}
      className={`relative ${noPadding ? '' : 'py-8 sm:py-12 lg:py-16'} ${className}`}
    >
      {/* Section background overlay for contrast */}
      <div className="absolute inset-0 bg-black/30" />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        {(badge || title || subtitle) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-6 sm:mb-8 lg:mb-10"
          >
            {/* Tech Badge */}
            {badge && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="inline-block mb-4"
              >
                <div className="flex items-center gap-3">
                  <div className={`h-[1px] w-8 sm:w-16 bg-gradient-to-r from-transparent ${
                    badgeColor === 'green' ? 'to-green-500' :
                    badgeColor === 'purple' ? 'to-purple-500' :
                    badgeColor === 'blue' ? 'to-blue-500' :
                    'to-cyan-500'
                  }`} />
                  <div className={`px-3 py-1 ${
                    badgeColor === 'green' ? 'bg-green-500/10 border-green-500/30' :
                    badgeColor === 'purple' ? 'bg-purple-500/10 border-purple-500/30' :
                    badgeColor === 'blue' ? 'bg-blue-500/10 border-blue-500/30' :
                    'bg-cyan-500/10 border-cyan-500/30'
                  } border rounded-full`}>
                    <span className={`text-[10px] font-semibold ${
                      badgeColor === 'green' ? 'text-green-400' :
                      badgeColor === 'purple' ? 'text-purple-400' :
                      badgeColor === 'blue' ? 'text-blue-400' :
                      'text-cyan-400'
                    } uppercase tracking-widest`}>
                      {badge}
                    </span>
                  </div>
                  <div className={`h-[1px] w-8 sm:w-16 bg-gradient-to-l from-transparent ${
                    badgeColor === 'green' ? 'to-green-500' :
                    badgeColor === 'purple' ? 'to-purple-500' :
                    badgeColor === 'blue' ? 'to-blue-500' :
                    'to-cyan-500'
                  }`} />
                </div>
              </motion.div>
            )}

            {/* Title */}
            {title && (
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-thin mb-3">
                <span className={`font-bold bg-gradient-to-r ${
                  titleColor === 'green'
                    ? 'from-green-400 via-emerald-400 to-green-400'
                    : 'from-cyan-400 via-blue-400 to-purple-400'
                } bg-clip-text text-transparent`}>
                  {title}
                </span>
              </h2>
            )}

            {/* Subtitle with lines */}
            {subtitle && (
              <div className="flex items-center justify-center gap-2 mt-2">
                <div className="h-[1px] w-6 bg-gradient-to-r from-transparent to-gray-600" />
                <p className="text-xs sm:text-sm md:text-base text-gray-400 font-light max-w-2xl">
                  {subtitle}
                </p>
                <div className="h-[1px] w-6 bg-gradient-to-l from-transparent to-gray-600" />
              </div>
            )}
          </motion.div>
        )}

        {children}
      </div>
    </section>
  );
};

export default TechSection;