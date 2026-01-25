'use client'
import React, { useEffect, useRef } from 'react'
import { useThemeWithoutFlash } from '@/src/hooks/useThemeWithoutFlash'

/**
 * Performant mobile version of HeroBackgroundGrid
 * - Matches desktop visual quality with smooth flowing waves
 * - 30fps frame limiting for battery efficiency
 * - Optimized dot count and calculations
 * - Water ripple effect from center like desktop
 */
const MobileHeroBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationFrameRef = useRef<number>(0)
  const { isDark } = useThemeWithoutFlash()

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

    // Mobile-optimized settings
    const BASE_RADIUS = 5.5
    const SPACING = BASE_RADIUS * 2.1
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5)

    let time = 0
    let lastFrameTime = 0
    const TARGET_FPS = 30
    const FRAME_INTERVAL = 1000 / TARGET_FPS

    // State for water sloshing effect (like desktop)
    let waterOffsetX = 0
    let waterOffsetY = 0
    let waterVelX = 0
    let waterVelY = 0
    let hasStarted = false

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

    // Smooth color gradient matching desktop
    function getSmoothColor(intensity: number, x: number, y: number, cols: number, rows: number): ColorObj {
      const biased = Math.pow(intensity, 1.2)

      // Add subtle spatial variation like desktop
      const waveInfluence = Math.sin(x * 0.1 + time * 0.5) * Math.cos(y * 0.1 + time * 0.3)
      const diagonalGradient = (x + y) / (cols + rows)

      const gradient1 = Math.sin(diagonalGradient * Math.PI * 3 + time * 0.7) * 0.5 + 0.5
      const combinedGradient = biased * 0.7 + gradient1 * 0.15 + waveInfluence * 0.05
      const finalIntensity = Math.max(0.1, Math.min(1, combinedGradient))

      if (finalIntensity < 0.25) {
        return blendColor(COLORS.blue600, COLORS.blue500, finalIntensity * 4)
      } else if (finalIntensity < 0.5) {
        return blendColor(COLORS.blue500, COLORS.blue300, (finalIntensity - 0.25) * 4)
      } else if (finalIntensity < 0.75) {
        return blendColor(COLORS.blue300, COLORS.midBlend, (finalIntensity - 0.5) * 4)
      } else {
        return blendColor(COLORS.midBlend, COLORS.background, (finalIntensity - 0.75) * 4)
      }
    }

    function loop(currentTime: number) {
      if (currentTime - lastFrameTime < FRAME_INTERVAL) {
        animationFrameRef.current = requestAnimationFrame(loop)
        return
      }
      lastFrameTime = currentTime

      if (!canvas || !ctx) return

      time += 0.018

      const width = canvas.width / dpr
      const height = canvas.height / dpr
      const cols = Math.ceil(width / SPACING) + 1
      const rows = Math.ceil(height / SPACING) + 1
      const centerX = cols / 2
      const centerY = rows / 2

      ctx.clearRect(0, 0, width, height)

      // Animation ramp up
      const animFactor = Math.min(1, time / 0.8)

      // Trigger water effect after brief delay
      if (time > 0.15 && !hasStarted) {
        hasStarted = true
      }

      // Update water sloshing (simplified from desktop)
      if (hasStarted) {
        const sloshSpeed = 0.025
        const sloshDamping = 0.992

        waterVelX += (Math.sin(time * 0.7) * 0.015 + Math.sin(time * 1.3) * 0.008)
        waterVelY += (Math.cos(time * 0.5) * 0.015 + Math.cos(time * 1.1) * 0.008)

        waterVelX -= waterOffsetX * sloshSpeed
        waterVelY -= waterOffsetY * sloshSpeed

        waterVelX *= sloshDamping
        waterVelY *= sloshDamping
        waterOffsetX += waterVelX
        waterOffsetY += waterVelY

        const maxOffset = 4
        waterOffsetX = Math.max(-maxOffset, Math.min(maxOffset, waterOffsetX))
        waterOffsetY = Math.max(-maxOffset, Math.min(maxOffset, waterOffsetY))
      }

      // Water center moves with sloshing
      const waterCenterX = centerX + waterOffsetX
      const waterCenterY = centerY + waterOffsetY

      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
          const px = i * SPACING
          const py = j * SPACING

          const centerDist = Math.sqrt((i - waterCenterX) ** 2 + (j - waterCenterY) ** 2)

          // Gentle expansion cycles (matching desktop)
          const expansionCycle1 = Math.sin(time * 0.15) * 0.3 + 0.5
          const expansionCycle2 = Math.cos(time * 0.23) * 0.2 + 0.6
          const baseCoverage = 0.6 + expansionCycle1 * 0.2 + expansionCycle2 * 0.1
          const maxWaveRadius = Math.max(cols, rows) * baseCoverage

          let intensity = 0.85

          if (centerDist < maxWaveRadius && hasStarted) {
            // Pool gradient from center
            const poolGradient = Math.sin(centerDist * 0.08 + time * 0.2) * 0.08 + 0.15
            const poolIntensity = Math.min(1, centerDist / 15 + poolGradient)
            intensity = 0.1 + poolIntensity * 0.7

            // Smooth flowing waves - matching desktop feel
            const wave1 = Math.sin(centerDist * 0.25 - time * 0.8 + Math.sin(i * 0.12) * Math.cos(j * 0.15)) * 0.22
            const wave2 = Math.cos(centerDist * 0.35 - time * 1.1 + Math.cos(i * 0.18) * Math.sin(j * 0.12)) * 0.18
            const wave3 = Math.sin(centerDist * 0.2 - time * 0.6 + Math.sin(i * 0.15 - j * 0.1)) * 0.25
            const wave4 = Math.cos(centerDist * 0.3 - time * 0.9 + Math.cos(i * 0.1 + j * 0.15)) * 0.18

            // Directional flow waves
            const flowAngle = Math.atan2(j - waterCenterY, i - waterCenterX)
            const directionalWave1 = Math.sin(centerDist * 0.3 - time * 1.0 + flowAngle * 1.5) * 0.15
            const directionalWave2 = Math.cos(centerDist * 0.35 - time * 1.3 + flowAngle * 2) * 0.12

            // Gentle surge patterns
            const surgePhase = Math.sin(time * 0.12 + i * 0.06) * 0.5 + 0.5
            const smoothSurge = Math.sin(centerDist * 0.15 - time * 0.5) * 0.14 * surgePhase

            // Gentle organic movement
            const gentleMove1 = Math.sin(i * 0.35 + j * 0.15 - time * 0.5) * 0.07
            const gentleMove2 = Math.cos(i * 0.2 - j * 0.25 + time * 0.6) * 0.06

            intensity += (wave1 + wave2 + wave3 + wave4 + directionalWave1 + directionalWave2 + smoothSurge + gentleMove1 + gentleMove2) * animFactor
          }

          intensity = Math.max(0.1, Math.min(1, intensity))

          const color = getSmoothColor(intensity, i, j, cols, rows)

          // Alpha based on distance to background
          const bg = COLORS.background
          const distToBg = Math.sqrt(
            (color.r - bg.r) ** 2 +
            (color.g - bg.g) ** 2 +
            (color.b - bg.b) ** 2
          ) / 441.67

          let alpha = 1
          if (distToBg < 0.1) alpha = 0.15
          else if (distToBg < 0.25) alpha = 0.4
          else if (distToBg < 0.4) alpha = 0.7

          ctx.beginPath()
          ctx.arc(px, py, BASE_RADIUS, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(${color.r},${color.g},${color.b},${alpha})`
          ctx.fill()
        }
      }

      animationFrameRef.current = requestAnimationFrame(loop)
    }

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

      {/* Gradient overlays for depth */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className={`absolute inset-0 bg-gradient-to-b via-transparent ${
            isDark ? 'from-gray-900/10 to-gray-900' : 'from-white/10 to-white'
          }`}
        />
        <div
          className={`absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t to-transparent ${
            isDark ? 'from-gray-900 via-gray-900/40' : 'from-white via-white/40'
          }`}
        />
      </div>
    </div>
  )
}

export default MobileHeroBackground
