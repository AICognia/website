import React from 'react';
import { motion } from 'framer-motion';

interface LoadingSkeletonProps {
  variant?: 'text' | 'card' | 'metric' | 'button' | 'image' | 'hero';
  lines?: number;
  className?: string;
}

export const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({
  variant = 'text',
  lines = 1,
  className = ''
}) => {
  const baseClass = 'skeleton';

  if (variant === 'hero') {
    return (
      <div className="relative min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-blue-500/5 to-purple-500/5 animate-gradient" />

        <div className="relative z-10 container mx-auto px-6 py-32">
          {/* Title skeleton */}
          <div className={`${baseClass} h-16 md:h-20 w-3/4 mx-auto mb-6`} />
          <div className={`${baseClass} h-12 md:h-16 w-2/3 mx-auto mb-8`} />

          {/* Description skeleton */}
          <div className={`${baseClass} h-6 w-1/2 mx-auto mb-4`} />
          <div className={`${baseClass} h-6 w-2/3 mx-auto mb-12`} />

          {/* CTA buttons skeleton */}
          <div className="flex justify-center gap-4">
            <div className={`${baseClass} h-14 w-40 rounded-xl`} />
            <div className={`${baseClass} h-14 w-40 rounded-xl`} />
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'card') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`glass-effect rounded-2xl p-6 ${className}`}
      >
        <div className={`${baseClass} h-12 w-12 rounded-lg mb-4`} />
        <div className={`${baseClass} h-6 w-3/4 mb-3`} />
        <div className={`${baseClass} h-4 w-full mb-2`} />
        <div className={`${baseClass} h-4 w-5/6`} />
      </motion.div>
    );
  }

  if (variant === 'metric') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`glass-effect rounded-xl p-6 ${className}`}
      >
        <div className="flex items-center justify-between mb-4">
          <div className={`${baseClass} h-10 w-10 rounded-lg`} />
          <div className={`${baseClass} h-6 w-6 rounded-full animate-pulse-subtle`} />
        </div>
        <div className={`${baseClass} h-8 w-2/3 mb-2`} />
        <div className={`${baseClass} h-4 w-1/2`} />
      </motion.div>
    );
  }

  if (variant === 'button') {
    return <div className={`${baseClass} h-12 w-32 rounded-xl ${className}`} />;
  }

  if (variant === 'image') {
    return (
      <div className={`${baseClass} aspect-video rounded-2xl ${className}`}>
        <svg
          className="w-full h-full text-slate-700 opacity-20"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      </div>
    );
  }

  // Default text variant
  return (
    <div className={className}>
      {Array.from({ length: lines }).map((_, index) => (
        <div
          key={index}
          className={`${baseClass} h-4 mb-2 ${
            index === lines - 1 ? 'w-4/5' : 'w-full'
          }`}
          style={{ animationDelay: `${index * 100}ms` }}
        />
      ))}
    </div>
  );
};

// Grid skeleton for multiple items
export const LoadingGrid: React.FC<{
  items?: number;
  variant?: LoadingSkeletonProps['variant'];
  columns?: string;
}> = ({ items = 6, variant = 'card', columns = 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' }) => {
  return (
    <div className={`grid ${columns} gap-6`}>
      {Array.from({ length: items }).map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <LoadingSkeleton variant={variant} />
        </motion.div>
      ))}
    </div>
  );
};

// Page loading component
export const PageLoader: React.FC = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/95 backdrop-blur-xl">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center"
      >
        {/* Animated logo */}
        <div className="relative w-24 h-24 mx-auto mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl animate-spin-slow" />
          <div className="absolute inset-2 bg-slate-900 rounded-xl flex items-center justify-center">
            <span className="text-2xl font-bold gradient-text-shimmer">C</span>
          </div>
        </div>

        {/* Loading text */}
        <motion.p
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-gray-400 text-sm font-medium tracking-wide"
        >
          Loading amazing experience...
        </motion.p>

        {/* Progress bar */}
        <div className="mt-4 w-48 h-1 bg-slate-800 rounded-full overflow-hidden mx-auto">
          <motion.div
            className="h-full bg-gradient-to-r from-cyan-500 to-blue-600"
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
          />
        </div>
      </motion.div>
    </div>
  );
};

export default LoadingSkeleton;