'use client'
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FaArrowRight, FaSpinner } from 'react-icons/fa'

interface PremiumButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'cta' | 'ghost'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  icon?: React.ReactNode
  showArrow?: boolean
  loading?: boolean
  disabled?: boolean
  fullWidth?: boolean
  onClick?: () => void
  href?: string
  className?: string
  urgency?: boolean
  ariaLabel?: string
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
  const [isHovered, setIsHovered] = useState(false)

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
    xl: 'px-10 py-5 text-xl',
  }

  const variantClasses = {
    primary: `
      text-white
      border border-transparent
      hover:opacity-90
    `,
    secondary: `
      bg-transparent
      text-[#1E40AF]
      border border-[#1E40AF]
      hover:bg-[#1E40AF]/10
    `,
    cta: `
      text-white
      border border-transparent
      shadow-md
      hover:shadow-lg
    `,
    ghost: `
      bg-transparent
      text-gray-600
      border border-transparent
      hover:text-[#1E40AF]
      hover:bg-gray-50
    `,
  }

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
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#1E40AF] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#1E40AF]"></span>
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
  )

  const getBackgroundColor = () => {
    if (variant === 'primary' || variant === 'cta') {
      return '#1E40AF'
    }
    return 'transparent'
  }

  const buttonClasses = `
    relative
    ${sizeClasses[size]}
    ${variantClasses[variant]}
    ${fullWidth ? 'w-full' : ''}
    ${disabled || loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
    rounded-lg
    transition-all
    duration-300
    transform
    hover:scale-105
    active:scale-[0.98]
    overflow-hidden
    ${className}
  `

  const ButtonElement = href ? 'a' : 'button'

  return (
    <ButtonElement
      href={href}
      onClick={!disabled && !loading ? onClick : undefined}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={buttonClasses}
      style={{ backgroundColor: getBackgroundColor(), borderWidth: '0.5px' }}
      disabled={disabled || loading}
      aria-label={ariaLabel || (typeof children === 'string' ? children : undefined)}
      role={href ? 'link' : 'button'}
    >
      <div className="relative z-10">{buttonContent}</div>
    </ButtonElement>
  )
}

export default PremiumButton
