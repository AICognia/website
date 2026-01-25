'use client'
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const ScrollProgress: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const totalHeight = document.documentElement.scrollHeight - window.innerHeight
          const progress = (window.scrollY / totalHeight) * 100
          setScrollProgress(progress)
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 z-50 origin-left"
      style={{ 
        scaleX: scrollProgress / 100,
        backgroundColor: '#1E40AF'
      }}
      initial={{ scaleX: 0 }}
      transition={{ duration: 0.1 }}
    />
  )
}

export default ScrollProgress
