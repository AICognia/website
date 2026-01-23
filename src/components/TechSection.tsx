'use client'
import React from 'react';
import { motion } from 'framer-motion';

interface TechSectionProps {
  badge?: string;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}

const TechSection: React.FC<TechSectionProps> = ({
  badge,
  title,
  subtitle,
  children,
  className = ''
}) => {
  return (
    <section className={`section-padding bg-section-primary relative overflow-hidden ${className}`}>
      <div className="max-w-[1920px] w-full mx-auto px-4 sm:px-8 md:px-16 lg:px-24">
        {/* Header - only render if title is provided */}
        {title && (
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 lg:mb-16">
            <h2 className="heading-2 mb-3 sm:mb-4 lg:mb-6 text-2xl sm:text-3xl lg:text-4xl">
              {title}
            </h2>
            {subtitle && (
              <p className="body-large text-sm sm:text-base lg:text-lg">
                {subtitle}
              </p>
            )}
          </div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {children}
        </motion.div>
      </div>
    </section>
  );
};

export default TechSection;
