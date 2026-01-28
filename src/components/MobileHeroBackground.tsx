'use client'
import React, { useEffect, useRef, useState } from 'react'

/** Read theme directly from <html> class — synchronous, no flash */
function getIsDarkFromDOM(): boolean {
  if (typeof document === 'undefined') return true
  return !document.documentElement.classList.contains('light')
}

/**
 * Mobile hero background matching desktop HeroBackgroundGrid
 * Performance-optimized animated version using ImageData for batch pixel operations
 * Packed dots with no gaps, matching desktop appearance
 */
const MobileHeroBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationFrameRef = useRef<number>(0)
  const lastFrameTimeRef = useRef<number>(0)
  const stateRef = useRef({
    time: 0,
    waterOffsetX: 0,
    waterOffsetY: 0,
    waterVelX: 0,
    waterVelY: 0,
  })
  const isDarkRef = useRef(getIsDarkFromDOM())
  const [isVisible, setIsVisible] = useState(false)
  const [animationReady, setAnimationReady] = useState(false)

  useEffect(() => {
    let rafId1: number
    let rafId2: number

    rafId1 = requestAnimationFrame(() => {
      setIsVisible(true)
      rafId2 = requestAnimationFrame(() => {
        setAnimationReady(true)
      })
    })

    // Watch for theme class changes on <html>
    const observer = new MutationObserver(() => {
      isDarkRef.current = getIsDarkFromDOM()
    })
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })

    return () => {
      cancelAnimationFrame(rafId1)
      cancelAnimationFrame(rafId2)
      observer.disconnect()
    }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d', { alpha: false })
    if (!ctx) return

    const COLORS_DARK = {
      background: { r: 17, g: 24, b: 39 },
      blue300: { r: 135, g: 200, b: 255 },
      blue500: { r: 99, g: 170, b: 255 },
      blue600: { r: 70, g: 140, b: 255 },
      midBlend: { r: 80, g: 115, b: 190 },
    }
    const COLORS_LIGHT = {
      background: { r: 255, g: 255, b: 255 },
      blue300: { r: 147, g: 197, b: 253 },
      blue500: { r: 96, g: 165, b: 250 },
      blue600: { r: 59, g: 130, b: 246 },
      midBlend: { r: 220, g: 240, b: 255 },
    }
    const getColors = () => isDarkRef.current ? COLORS_DARK : COLORS_LIGHT
    const getBgColor = () => isDarkRef.current ? { r: 17, g: 24, b: 39 } : { r: 255, g: 255, b: 255 }

    // Mobile-optimized settings
    const BASE_RADIUS = 6
    const SPACING = BASE_RADIUS * 2
    const TARGET_FPS = 30 // Cap at 30fps for mobile
    const FRAME_INTERVAL = 1000 / TARGET_FPS

    // Use lower DPR for performance (1.5 max instead of 2)
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
    let cols = 0
    let rows = 0
    let width = 0
    let height = 0
    let imageData: ImageData | null = null

    type ColorObj = { r: number; g: number; b: number }
    const lerp = (start: number, end: number, t: number) => start + (end - start) * t

    // Pre-calculate dot mask for faster rendering
    const dotSize = Math.ceil(BASE_RADIUS * 2 * dpr)
    const dotMask: number[] = []
    const dotCenter = dotSize / 2
    for (let y = 0; y < dotSize; y++) {
      for (let x = 0; x < dotSize; x++) {
        const dist = Math.sqrt((x - dotCenter) ** 2 + (y - dotCenter) ** 2)
        const radius = BASE_RADIUS * 0.95 * dpr
        // Smooth edge with anti-aliasing
        if (dist <= radius - 1) {
          dotMask.push(1)
        } else if (dist <= radius) {
          dotMask.push(radius - dist)
        } else {
          dotMask.push(0)
        }
      }
    }

    function getColor(intensity: number, x: number, y: number): ColorObj {
      const COLORS = getColors()
      const state = stateRef.current
      const biased = Math.pow(intensity, 1.1)

      const waveInfluence = Math.sin(x * 0.12 + state.time * 0.8) * Math.cos(y * 0.1 + state.time * 0.5)
      const diagonalGradient = (x + y) / (cols + rows)
      const radialGradient = Math.sqrt((x - cols/2) ** 2 + (y - rows/2) ** 2) / Math.max(cols, rows)

      const gradient1 = Math.sin(diagonalGradient * Math.PI * 3 + state.time * 1.0) * 0.5 + 0.5
      const gradient2 = Math.cos(radialGradient * Math.PI * 2 - state.time * 0.6) * 0.5 + 0.5
      const gradient3 = Math.sin(waveInfluence * Math.PI + state.time * 0.4) * 0.5 + 0.5

      const combinedGradient = biased * 0.45 + gradient1 * 0.25 + gradient2 * 0.15 + gradient3 * 0.15
      const noise = Math.sin(x * 0.7 + y * 0.3 + state.time * 1.2) * Math.cos(x * 0.3 - y * 0.7 + state.time * 0.8) * 0.12
      const finalIntensity = Math.max(0.1, Math.min(1, combinedGradient + noise))

      // Blend colors based on intensity
      if (finalIntensity < 0.25) {
        const t = finalIntensity * 4
        return {
          r: lerp(COLORS.blue600.r, COLORS.blue500.r, t),
          g: lerp(COLORS.blue600.g, COLORS.blue500.g, t),
          b: lerp(COLORS.blue600.b, COLORS.blue500.b, t),
        }
      } else if (finalIntensity < 0.5) {
        const t = (finalIntensity - 0.25) * 4
        return {
          r: lerp(COLORS.blue500.r, COLORS.blue300.r, t),
          g: lerp(COLORS.blue500.g, COLORS.blue300.g, t),
          b: lerp(COLORS.blue500.b, COLORS.blue300.b, t),
        }
      } else if (finalIntensity < 0.75) {
        const t = (finalIntensity - 0.5) * 4
        return {
          r: lerp(COLORS.blue300.r, COLORS.midBlend.r, t),
          g: lerp(COLORS.blue300.g, COLORS.midBlend.g, t),
          b: lerp(COLORS.blue300.b, COLORS.midBlend.b, t),
        }
      } else {
        const t = (finalIntensity - 0.75) * 4
        return {
          r: lerp(COLORS.midBlend.r, COLORS.background.r, t),
          g: lerp(COLORS.midBlend.g, COLORS.background.g, t),
          b: lerp(COLORS.midBlend.b, COLORS.background.b, t),
        }
      }
    }

    function drawDotToImageData(data: Uint8ClampedArray, canvasWidth: number, canvasHeight: number, px: number, py: number, color: ColorObj) {
      const bgColor = getBgColor()
      // Calculate alpha based on distance to background
      const bg = getColors().background
      const distToBackground = Math.sqrt(
        (color.r - bg.r) ** 2 + (color.g - bg.g) ** 2 + (color.b - bg.b) ** 2
      ) / 441.67

      let baseAlpha = 1
      if (distToBackground < 0.1) baseAlpha = 0.1
      else if (distToBackground < 0.25) baseAlpha = 0.3
      else if (distToBackground < 0.4) baseAlpha = 0.6

      const startX = Math.floor(px * dpr - dotSize / 2)
      const startY = Math.floor(py * dpr - dotSize / 2)

      for (let dy = 0; dy < dotSize; dy++) {
        const y = startY + dy
        if (y < 0 || y >= canvasHeight) continue

        for (let dx = 0; dx < dotSize; dx++) {
          const x = startX + dx
          if (x < 0 || x >= canvasWidth) continue

          const maskValue = dotMask[dy * dotSize + dx]
          if (maskValue === 0) continue

          const alpha = maskValue * baseAlpha
          const idx = (y * canvasWidth + x) * 4

          // Alpha blend with background
          data[idx] = Math.round(color.r * alpha + bgColor.r * (1 - alpha))
          data[idx + 1] = Math.round(color.g * alpha + bgColor.g * (1 - alpha))
          data[idx + 2] = Math.round(color.b * alpha + bgColor.b * (1 - alpha))
          data[idx + 3] = 255
        }
      }
    }

    const updateCanvasSize = () => {
      if (!canvas || !ctx) return
      const parent = canvas.parentElement
      if (!parent) return

      width = parent.clientWidth
      height = parent.clientHeight

      // Ensure we have valid dimensions before creating ImageData
      if (width <= 0 || height <= 0) return

      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`

      cols = Math.ceil(width / SPACING) + 2
      rows = Math.ceil(height / SPACING) + 2

      // Pre-allocate ImageData only with valid dimensions
      if (canvas.width > 0 && canvas.height > 0) {
        imageData = ctx.createImageData(canvas.width, canvas.height)
      }
    }

    updateCanvasSize()

    const handleResize = () => {
      updateCanvasSize()
    }

    window.addEventListener('resize', handleResize, { passive: true })

    function loop(currentTime: number) {
      // Frame rate limiting
      const elapsed = currentTime - lastFrameTimeRef.current
      if (elapsed < FRAME_INTERVAL) {
        animationFrameRef.current = requestAnimationFrame(loop)
        return
      }
      lastFrameTimeRef.current = currentTime - (elapsed % FRAME_INTERVAL)

      const state = stateRef.current

      if (animationReady) {
        state.time += 0.012 // Moderate animation speed for dynamic feel
      }

      if (!imageData || !canvas || !ctx) {
        animationFrameRef.current = requestAnimationFrame(loop)
        return
      }

      const data = imageData.data
      const canvasWidth = canvas.width
      const canvasHeight = canvas.height

      // Fill with background color (read current theme each frame)
      const bgColor = getBgColor()
      for (let i = 0; i < data.length; i += 4) {
        data[i] = bgColor.r
        data[i + 1] = bgColor.g
        data[i + 2] = bgColor.b
        data[i + 3] = 255
      }

      const centerY = rows / 2
      const centerX = cols / 2

      // Dynamic sloshing motion with more range
      if (animationReady) {
        const sloshSpeed = 0.015
        const sloshDamping = 0.992

        state.waterVelX += (Math.sin(state.time * 0.7) * 0.015 + Math.sin(state.time * 1.3) * 0.008 + Math.cos(state.time * 2.1) * 0.005)
        state.waterVelY += (Math.cos(state.time * 0.5) * 0.015 + Math.cos(state.time * 1.1) * 0.008 + Math.sin(state.time * 1.7) * 0.005)

        state.waterVelX -= state.waterOffsetX * sloshSpeed
        state.waterVelY -= state.waterOffsetY * sloshSpeed

        state.waterVelX *= sloshDamping
        state.waterVelY *= sloshDamping
        state.waterOffsetX += state.waterVelX
        state.waterOffsetY += state.waterVelY

        state.waterOffsetX = Math.max(-8, Math.min(8, state.waterOffsetX))
        state.waterOffsetY = Math.max(-8, Math.min(8, state.waterOffsetY))
      }

      const animationFactor = animationReady ? Math.min(1, state.time / 0.8) : 0
      const waterCenterX = centerX + state.waterOffsetX
      const waterCenterY = centerY + state.waterOffsetY
      const maxWaveRadius = Math.max(cols, rows) * 0.8

      for (let j = 0; j < rows; j++) {
        const py = j * SPACING
        for (let i = 0; i < cols; i++) {
          const px = i * SPACING
          const centerDist = Math.sqrt((i - waterCenterX) ** 2 + (j - waterCenterY) ** 2)

          let intensity = 0.85

          if (centerDist < maxWaveRadius && animationReady) {
            const poolGradient = Math.sin(centerDist * 0.08 + state.time * 0.2) * 0.08 + 0.15
            const poolIntensity = Math.min(1, centerDist / 15 + poolGradient)
            intensity = 0.1 + poolIntensity * 0.7

            // More dynamic waves with varied frequencies
            const smoothWave1 = Math.sin(centerDist * 0.2 - state.time * 1.2) * 0.25
            const smoothWave2 = Math.cos(centerDist * 0.35 - state.time * 0.8) * 0.2
            const flowAngle = Math.atan2(j - centerY, i - centerX)
            const directionalWave = Math.sin(centerDist * 0.25 - state.time * 1.5 + flowAngle * 2.0) * 0.2
            const ripple = Math.sin(centerDist * 0.5 - state.time * 2.0) * Math.exp(-centerDist * 0.03) * 0.15

            intensity += (smoothWave1 + smoothWave2 + directionalWave + ripple) * animationFactor
          }

          intensity = Math.max(0.1, Math.min(1, intensity))
          const color = getColor(intensity, i, j)
          drawDotToImageData(data, canvasWidth, canvasHeight, px, py, color)
        }
      }

      ctx.putImageData(imageData, 0, 0)
      animationFrameRef.current = requestAnimationFrame(loop)
    }

    animationFrameRef.current = requestAnimationFrame(loop)

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      window.removeEventListener('resize', handleResize)
    }
  }, [animationReady])

  return (
    <div
      className="absolute inset-0 overflow-hidden bg-white dark:bg-gray-900"
      style={{
        contain: 'layout paint',
      }}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{
          opacity: isVisible && animationReady ? 0.9 : 0,
          transition: 'opacity 0.5s ease-out',
          imageRendering: 'pixelated',
        }}
      />

      {/* Bottom fade */}
      <div
        className={`absolute inset-x-0 bottom-0 h-48 pointer-events-none transition-opacity duration-500 mobile-hero-bottom-fade ${
          isVisible && animationReady ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  )
}

export default MobileHeroBackground
