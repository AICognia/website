'use client'

import React from 'react'
import Link from 'next/link'
import { IconType } from 'react-icons'

interface TechCardProps {
  children?: React.ReactNode
  icon?: IconType
  title?: string
  description?: string
  href?: string
  className?: string
  hoverable?: boolean
  onClick?: () => void
}

const TechCard: React.FC<TechCardProps> = ({
  children,
  icon: Icon,
  title,
  description,
  href,
  className = '',
  hoverable = true,
  onClick,
}) => {
  const cardContent = (
    <div
      className={`bg-transparent border border-[rgba(55,50,47,0.12)] rounded-md p-3 sm:p-4 lg:p-5 transition-all duration-200 ${hoverable ? 'hover:border-[rgba(55,50,47,0.20)] hover:bg-[rgba(55,50,47,0.02)]' : ''
        } ${href || onClick ? 'cursor-pointer' : ''} ${className}`}
      onClick={onClick}
    >
      {children ? (
        children
      ) : (
        <>
          {Icon && (
            <div className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 mb-2 sm:mb-3 bg-[rgba(55,50,47,0.04)] border border-[rgba(55,50,47,0.12)] rounded-md flex items-center justify-center">
              <Icon className="text-base sm:text-lg text-[rgba(55,50,47,0.80)]" />
            </div>
          )}
          {title && (
            <h3 className="text-sm sm:text-base font-serif font-normal text-[#37322F] mb-1 sm:mb-1.5 leading-tight">{title}</h3>
          )}
          {description && (
            <p className="text-[10px] sm:text-xs text-[rgba(55,50,47,0.70)] leading-relaxed">{description}</p>
          )}
        </>
      )}
    </div>
  )

  if (href) {
    return <Link href={href}>{cardContent}</Link>
  }

  return cardContent
}

export default TechCard
