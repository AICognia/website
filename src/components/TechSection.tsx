import React from 'react';
import { motion } from 'framer-motion';

interface TechSectionProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
  badge?: string;
  noPadding?: boolean;
  id?: string;
}

const TechSection: React.FC<TechSectionProps> = ({
  children,
  className = '',
  title,
  subtitle,
  badge,
  noPadding = false,
  id,
}) => {
  return (
    <section
      id={id}
      className={`relative ${noPadding ? '' : 'py-20 sm:py-24 md:py-32'} ${className}`}
    >
      {/* Section background overlay for contrast */}
      <div className="absolute inset-0 bg-black/30" />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-12">
        {(badge || title || subtitle) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            {/* Tech Badge */}
            {badge && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="inline-block mb-6"
              >
                <div className="flex items-center gap-4">
                  <div className="h-[1px] w-12 sm:w-24 bg-gradient-to-r from-transparent to-cyan-500" />
                  <div className="px-4 py-1.5 bg-cyan-500/10 border border-cyan-500/30 rounded-full">
                    <span className="text-xs font-semibold text-cyan-400 uppercase tracking-widest">
                      {badge}
                    </span>
                  </div>
                  <div className="h-[1px] w-12 sm:w-24 bg-gradient-to-l from-transparent to-cyan-500" />
                </div>
              </motion.div>
            )}

            {/* Title */}
            {title && (
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-thin mb-4">
                <span className="font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                  {title}
                </span>
              </h2>
            )}

            {/* Subtitle with lines */}
            {subtitle && (
              <div className="flex items-center justify-center gap-3 mt-4">
                <div className="h-[1px] w-8 bg-gradient-to-r from-transparent to-gray-600" />
                <p className="text-sm sm:text-base md:text-lg text-gray-400 font-light max-w-2xl">
                  {subtitle}
                </p>
                <div className="h-[1px] w-8 bg-gradient-to-l from-transparent to-gray-600" />
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