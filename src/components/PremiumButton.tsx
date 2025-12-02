import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaArrowRight, FaSpinner } from 'react-icons/fa';

interface PremiumButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'cta' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  icon?: React.ReactNode;
  showArrow?: boolean;
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  onClick?: () => void;
  href?: string;
  className?: string;
  urgency?: boolean;
  ariaLabel?: string;
}

const PremiumButton: React.FC<PremiumButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  showArrow = false,
  loading = false,
  disabled = false,
  fullWidth = false,
  onClick,
  href,
  className = '',
  urgency = false,
  ariaLabel,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
    xl: 'px-10 py-5 text-xl',
  };

  const variantClasses = {
    primary: `
      bg-gradient-to-r from-cyan-500 to-blue-600
      text-white
      border-2 border-transparent
      hover:shadow-glow-md
    `,
    secondary: `
      bg-transparent
      text-cyan-400
      border-2 border-cyan-500/50
      hover:border-cyan-400
      hover:bg-cyan-500/10
      hover:text-cyan-300
    `,
    cta: `
      bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-500
      text-white
      border-2 border-transparent
      hover:shadow-glow-lg
      shadow-lg shadow-cyan-500/20
    `,
    ghost: `
      bg-transparent
      text-gray-400
      border-2 border-transparent
      hover:text-cyan-400
      hover:bg-slate-800/50
    `,
  };

  const buttonContent = (
    <motion.div
      className="relative flex items-center justify-center gap-2"
      animate={isHovered ? { x: showArrow ? -4 : 0 } : {}}
      transition={{ duration: 0.2 }}
    >
      {loading ? (
        <FaSpinner className="animate-spin" />
      ) : (
        <>
          {urgency && (
            <span className="absolute -top-2 -right-2 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
          )}
          {icon && <span className="flex-shrink-0">{icon}</span>}
          <span className="font-semibold tracking-wide">
            {children}
          </span>
          {showArrow && (
            <motion.span
              className="ml-1"
              animate={isHovered ? { x: 4, opacity: 1 } : { x: 0, opacity: 0.7 }}
              transition={{ duration: 0.2 }}
            >
              <FaArrowRight />
            </motion.span>
          )}
        </>
      )}
    </motion.div>
  );

  const buttonClasses = `
    relative
    ${sizeClasses[size]}
    ${variantClasses[variant]}
    ${fullWidth ? 'w-full' : ''}
    ${disabled || loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
    rounded-xl
    font-inter
    transition-all
    duration-300
    transform
    hover:scale-105
    active:scale-[0.98]
    overflow-hidden
    ${className}
  `;

  const ButtonElement = href ? 'a' : 'button';

  return (
    <ButtonElement
      href={href}
      onClick={!disabled && !loading ? onClick : undefined}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={buttonClasses}
      disabled={disabled || loading}
      aria-label={ariaLabel || (typeof children === 'string' ? children : undefined)}
      role={href ? 'link' : 'button'}
    >
      {/* Shimmer effect overlay */}
      <motion.div
        className="absolute inset-0 opacity-0"
        animate={isHovered && !disabled ? { opacity: 1 } : {}}
        transition={{ duration: 0.3 }}
        style={{
          background: 'linear-gradient(105deg, transparent 40%, rgba(255, 255, 255, 0.2) 50%, transparent 60%)',
          transform: isHovered ? 'translateX(100%)' : 'translateX(-100%)',
          transition: 'transform 0.6s',
        }}
      />


      {/* Content */}
      <div className="relative z-10">{buttonContent}</div>

      {/* Ripple effect on click */}
      <motion.div
        className="absolute inset-0 rounded-xl"
        initial={false}
        animate={isHovered ? { scale: 1.5, opacity: 0 } : { scale: 0, opacity: 0.3 }}
        transition={{ duration: 0.6 }}
        style={{
          background: 'radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, transparent 70%)',
        }}
      />

      {/* Border glow for primary/CTA */}
      {(variant === 'primary' || variant === 'cta') && (
        <div className="absolute inset-0 rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-300">
          <div
            className="absolute inset-[-2px] bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 rounded-xl blur-sm"
            style={{ zIndex: -1 }}
          />
        </div>
      )}
    </ButtonElement>
  );
};

export default PremiumButton;