import React from 'react';
import { motion } from 'framer-motion';
import { FaArrowRight, FaCalendarCheck } from 'react-icons/fa';
import { useLeadCapture } from '../contexts/LeadCaptureContext';

interface BookDemoButtonProps {
  source: string;
  variant?: 'primary' | 'secondary' | 'ghost' | 'gradient' | 'enterprise';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  fullWidth?: boolean;
  showIcon?: boolean;
  showArrow?: boolean;
  text?: string;
  className?: string;
}

const BookDemoButton: React.FC<BookDemoButtonProps> = ({
  source,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  showIcon = true,
  showArrow = true,
  text = 'Book a Demo',
  className = '',
}) => {
  const { openLeadCapture } = useLeadCapture();

  const sizeClasses = {
    sm: 'px-4 py-2 text-xs gap-1.5',
    md: 'px-5 py-2.5 text-sm gap-2',
    lg: 'px-6 py-3 text-base gap-2',
    xl: 'px-8 py-4 text-lg gap-3',
  };

  const variantClasses = {
    primary: 'bg-white hover:bg-gray-100 text-black font-semibold shadow-lg shadow-white/10 hover:shadow-white/20',
    secondary: 'bg-white/10 hover:bg-white/20 text-white font-medium border border-white/20 hover:border-white/40',
    ghost: 'bg-transparent hover:bg-white/5 text-white font-medium border border-white/10 hover:border-white/20',
    gradient: 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40',
    enterprise: 'bg-gradient-to-r from-purple-600 via-cyan-500 to-blue-600 hover:from-purple-500 hover:via-cyan-400 hover:to-blue-500 text-white font-bold shadow-xl shadow-purple-500/20 hover:shadow-purple-500/30',
  };

  return (
    <motion.button
      onClick={() => openLeadCapture(source)}
      whileHover={{ scale: 1.02, y: -1 }}
      whileTap={{ scale: 0.98 }}
      className={`
        inline-flex items-center justify-center rounded-xl transition-all duration-200
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
    >
      {showIcon && <FaCalendarCheck className={size === 'sm' ? 'text-xs' : size === 'xl' ? 'text-lg' : 'text-sm'} />}
      <span>{text}</span>
      {showArrow && <FaArrowRight className={size === 'sm' ? 'text-[10px]' : 'text-xs'} />}
    </motion.button>
  );
};

export default BookDemoButton;
