'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

interface BentoCardProps {
  children: React.ReactNode
  className?: string
  href?: string
  onClick?: () => void
  delay?: number
}

const BentoCard: React.FC<BentoCardProps> = ({
  children,
  className = '',
  href,
  onClick,
  delay = 0
}) => {
  const content = (
    <div
      className={`bento-card 
      ${href || onClick ? 'cursor-pointer group' : ''} 
      ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  )

  const Wrapper = motion.div
  const wrapperProps = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { delay, duration: 0.5 }
  }

  if (href) {
    return (
      <Wrapper {...wrapperProps}>
        <Link href={href} className="block h-full">
          {content}
        </Link>
      </Wrapper>
    )
  }

  return (
    <Wrapper {...wrapperProps}>
      {content}
    </Wrapper>
  )
}

export default BentoCard
