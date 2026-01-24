'use client'
import React, { useEffect, useRef, useState } from 'react'
import { useTheme } from 'next-themes'

/**
 * Performant mobile version of HeroBackgroundGrid
 * - Continuous smooth animation at lower frame rate
 * - Reduced dot count with larger spacing
 * - Same visual style as desktop (flowing waves from center)
 * - No mouse/touch interactions, no swarm/flow field overhead
 */
const MobileHeroBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationFrameRef = useRef<number>(0)
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  const isDark = !mounted || resolvedTheme === 'dark'

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    const COLORS = isDark ? {
      background: { r: 17, g: 24, b: 39 },
      blue300: { r: 135, g: 200, b: 255 },
      blue500: { r: 99, g: 170, b: 255 },
      blue600: { r: 70, g: 140, b: 255 },
      midBlend: { r: 80, g: 115, b: 190 },
    } : {
      background: { r: 255, g: 255, b: 255 },
      blue300: { r: 147, g: 197, b: 253 },
      blue500: { r: 96, g: 165, b: 250 },
      blue600: { r: 59, g: 130, b: 246 },
      midBlend: { r: 220, g: 240, b: 255 },
    }

    // Mobile-optimized: larger dots, more spacing = fewer calculations
    const BASE_RADIUS = 6
    const SPACING = BASE_RADIUS * 2.2
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5) // Cap DPR for performance

    let time = 0
    let lastFrameTime = 0
    const TARGET_FPS = 30 // 30fps is smooth enough, saves battery
    const FRAME_INTERVAL = 1000 / TARGET_FPS

    const updateCanvasSize = () => {
      const parent = canvas.parentElement
      if (!parent) return

      const width = parent.clientWidth
      const height = parent.clientHeight

      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    updateCanvasSize()
    window.addEventListener('resize', updateCanvasSize)

    type ColorObj = { r: number; g: number; b: number }
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t
    const blendColor = (c1: ColorObj, c2: ColorObj, t: number): ColorObj => ({
      r: Math.round(lerp(c1.r, c2.r, t)),
      g: Math.round(lerp(c1.g, c2.g, t)),
      b: Math.round(lerp(c1.b, c2.b, t))
    })

    // Same color function as desktop for visual consistency
    function getSmoothColor(intensity: number): ColorObj {
      const biased = Math.pow(intensity, 1.2)

      if (biased < 0.25) {
        return blendColor(COLORS.blue600, COLORS.blue500, biased * 4)
      } else if (biased < 0.5) {
        return blendColor(COLORS.blue500, COLORS.blue300, (biased - 0.25) * 4)
      } else if (biased < 0.75) {
        return blendColor(COLORS.blue300, COLORS.midBlend, (biased - 0.5) * 4)
      } else {
        return blendColor(COLORS.midBlend, COLORS.background, (biased - 0.75) * 4)
      }
    }

    function loop(currentTime: number) {
      // Frame rate limiting for performance
      if (currentTime - lastFrameTime < FRAME_INTERVAL) {
        animationFrameRef.current = requestAnimationFrame(loop)
        return
      }
      lastFrameTime = currentTime

      if (!canvas || !ctx) return

      time += 0.015

      const width = canvas.width / dpr
      const height = canvas.height / dpr
      const cols = Math.ceil(width / SPACING) + 1
      const rows = Math.ceil(height / SPACING) + 1
      const centerX = cols / 2
      const centerY = rows / 2

      ctx.clearRect(0, 0, width, height)

      // Animation ramp up (0 to 1 over first second)
      const animFactor = Math.min(1, time / 1)

      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
          const px = i * SPACING
          const py = j * SPACING

          const centerDist = Math.sqrt((i - centerX) ** 2 + (j - centerY) ** 2)
          const maxRadius = Math.max(cols, rows) * 0.8

          // Base pool intensity - matching desktop
          let intensity = 0.85

          if (centerDist < maxRadius) {
            // Pool gradient from center
            const poolGradient = Math.sin(centerDist * 0.08 + time * 0.2) * 0.08 + 0.15
            const poolIntensity = Math.min(1, centerDist / 15 + poolGradient)
            intensity = 0.1 + poolIntensity * 0.7

            // Smooth flowing waves - simplified from desktop but same feel
            const wave1 = Math.sin(centerDist * 0.25 - time * 0.8) * 0.22
            const wave2 = Math.cos(centerDist * 0.35 - time * 1.1) * 0.18
            const wave3 = Math.sin(centerDist * 0.2 - time * 0.6) * 0.25

            // Directional flow
            const flowAngle = Math.atan2(j - centerY, i - centerX)
            const directionalWave = Math.sin(centerDist * 0.3 - time * 1.0 + flowAngle * 1.5) * 0.15

            // Gentle organic movement
            const gentleMove = Math.sin(i * 0.4 + j * 0.2 - time * 0.5) * 0.08

            intensity += (wave1 + wave2 + wave3 + directionalWave + gentleMove) * animFactor
          }

          intensity = Math.max(0.1, Math.min(1, intensity))

          const color = getSmoothColor(intensity)

          // Alpha based on distance to background (fades dots near bg color)
          const bg = COLORS.background
          const distToBg = Math.sqrt(
            (color.r - bg.r) ** 2 +
            (color.g - bg.g) ** 2 +
            (color.b - bg.b) ** 2
          ) / 441.67

          let alpha = 1
          if (distToBg < 0.1) alpha = 0.1
          else if (distToBg < 0.25) alpha = 0.3
          else if (distToBg < 0.4) alpha = 0.6

          ctx.beginPath()
          ctx.arc(px, py, BASE_RADIUS, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(${color.r},${color.g},${color.b},${alpha})`
          ctx.fill()
        }
      }

      animationFrameRef.current = requestAnimationFrame(loop)
    }

    // Start animation
    animationFrameRef.current = requestAnimationFrame(loop)

    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current)
      window.removeEventListener('resize', updateCanvasSize)
    }
  }, [isDark])

  return (
    <div
      className="absolute inset-0 overflow-hidden transition-colors duration-300"
      style={{ backgroundColor: isDark ? '#111827' : '#ffffff' }}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-90"
      />

      {/* Bottom fade for content readability */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className={`absolute inset-0 bg-gradient-to-t to-transparent ${
            isDark ? 'from-gray-900/95 via-gray-900/20' : 'from-white/95 via-white/20'
          }`}
        />
      </div>
    </div>
  )
}

export default MobileHeroBackground
