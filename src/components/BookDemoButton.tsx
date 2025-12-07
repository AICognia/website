import React from 'react';
import { motion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import conversionTracker from '../utils/conversionTracking';

interface BookDemoButtonProps {
  source: string;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  showArrow?: boolean;
  text?: string;
  className?: string;
}

const BookDemoButton: React.FC<BookDemoButtonProps> = ({
  source,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  showArrow = true,
  text = 'Book a Demo',
  className = '',
}) => {
  const sizeClasses = {
    sm: 'px-4 py-2 text-xs gap-1.5',
    md: 'px-5 py-2.5 text-sm gap-2',
    lg: 'px-6 py-3 text-sm gap-2',
  };

  const variantClasses = {
    primary: 'bg-white hover:bg-neutral-100 text-black font-medium',
    secondary: 'bg-neutral-900 hover:bg-neutral-800 text-white font-medium border border-neutral-800',
    ghost: 'bg-transparent hover:bg-neutral-900 text-white font-medium border border-neutral-800 hover:border-neutral-700',
  };

  const handleClick = () => {
    conversionTracker.trackButtonClick(text, source);
  };

  return (
    <Link to="/demo" onClick={handleClick} className={fullWidth ? 'block w-full' : 'inline-block'}>
      <motion.div
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        className={`
          inline-flex items-center justify-center rounded-lg transition-colors
          ${sizeClasses[size]}
          ${variantClasses[variant]}
          ${fullWidth ? 'w-full' : ''}
          ${className}
        `}
      >
        <span>{text}</span>
        {showArrow && <FaArrowRight className="text-[10px]" />}
      </motion.div>
    </Link>
  );
};

export default BookDemoButton;
