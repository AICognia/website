import React, { useEffect, useRef, useState } from 'react';

interface ParticleNetworkProps {
  particleCount?: number;
  particleColor?: string;
  lineColor?: string;
  particleSize?: number;
  speed?: number;
  connectionDistance?: number;
  reduced?: boolean;
}

const ParticleNetwork: React.FC<ParticleNetworkProps> = ({
  particleCount = 30,
  particleColor = 'rgba(6, 182, 212, 0.8)',
  lineColor = 'rgba(6, 182, 212, 0.15)',
  particleSize = 2,
  speed = 0.3,
  connectionDistance = 150,
  reduced = false
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);

    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  useEffect(() => {
    // Don't render particles if user prefers reduced motion or on mobile for performance
    if (prefersReducedMotion || reduced) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // Heavily reduce particle count on mobile for better performance
    const actualParticleCount = isMobile ? Math.min(8, particleCount) : Math.min(20, particleCount);
    const actualConnectionDistance = isMobile ? connectionDistance * 0.5 : connectionDistance;

    // Set canvas size with device pixel ratio for crisp rendering
    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();

      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;

      ctx.scale(dpr, dpr);
      canvas.style.width = rect.width + 'px';
      canvas.style.height = rect.height + 'px';
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Optimized Particle class
    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      pulsePhase: number;

      constructor(width: number, height: number) {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * speed;
        this.vy = (Math.random() - 0.5) * speed;
        this.size = particleSize;
        this.pulsePhase = Math.random() * Math.PI * 2;
      }

      update(width: number, height: number, deltaTime: number) {
        const adjustedSpeed = deltaTime * 60 / 1000; // Normalize to 60 FPS
        this.x += this.vx * adjustedSpeed;
        this.y += this.vy * adjustedSpeed;
        this.pulsePhase += 0.02 * adjustedSpeed;

        // Bounce off walls
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;

        // Keep in bounds
        this.x = Math.max(0, Math.min(width, this.x));
        this.y = Math.max(0, Math.min(height, this.y));
      }

      draw(ctx: CanvasRenderingContext2D) {
        const pulseFactor = 1 + Math.sin(this.pulsePhase) * 0.2;
        const currentSize = this.size * pulseFactor;

        // Simplified glow effect for performance
        if (!isMobile) {
          ctx.shadowBlur = 8;
          ctx.shadowColor = particleColor;
        }

        ctx.beginPath();
        ctx.arc(this.x, this.y, currentSize, 0, Math.PI * 2);
        ctx.fillStyle = particleColor;
        ctx.fill();

        if (!isMobile) {
          ctx.shadowBlur = 0;
        }
      }
    }

    // Create particles
    const particles: Particle[] = [];
    const rect = canvas.getBoundingClientRect();
    for (let i = 0; i < actualParticleCount; i++) {
      particles.push(new Particle(rect.width, rect.height));
    }

    // Mouse interaction (desktop only)
    let mouseX = 0;
    let mouseY = 0;
    let isMouseInCanvas = false;

    const handleMouseMove = (e: MouseEvent) => {
      if (isMobile) return;
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
      isMouseInCanvas = true;
    };

    const handleMouseLeave = () => {
      isMouseInCanvas = false;
    };

    if (!isMobile) {
      canvas.addEventListener('mousemove', handleMouseMove);
      canvas.addEventListener('mouseleave', handleMouseLeave);
    }

    let lastTime = performance.now();

    // Optimized animation loop
    const animate = (currentTime: number) => {
      const deltaTime = currentTime - lastTime;
      lastTime = currentTime;

      const rect = canvas.getBoundingClientRect();

      // Clear canvas with fade effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, rect.width, rect.height);

      // Update and draw particles
      particles.forEach(particle => {
        particle.update(rect.width, rect.height, deltaTime);

        // Mouse repulsion (desktop only)
        if (!isMobile && isMouseInCanvas) {
          const dx = mouseX - particle.x;
          const dy = mouseY - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 100) {
            const force = (100 - distance) / 100;
            particle.vx -= (dx / distance) * force * 0.3;
            particle.vy -= (dy / distance) * force * 0.3;
          }
        }
      });

      // Draw connections (optimize by reducing checks)
      ctx.strokeStyle = lineColor;
      ctx.lineWidth = 0.5;

      for (let i = 0; i < particles.length; i++) {
        // Limit connection checks for performance
        const maxConnections = isMobile ? 2 : 3;
        let connections = 0;

        for (let j = i + 1; j < particles.length && connections < maxConnections; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < actualConnectionDistance) {
            const opacity = 1 - distance / actualConnectionDistance;
            ctx.globalAlpha = opacity * 0.3;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
            connections++;
          }
        }
      }

      ctx.globalAlpha = 1;

      // Draw particles on top
      particles.forEach(particle => {
        particle.draw(ctx);
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate(performance.now());

    // Cleanup
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      window.removeEventListener('resize', resizeCanvas);
      if (!isMobile) {
        canvas.removeEventListener('mousemove', handleMouseMove);
        canvas.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [particleCount, particleColor, lineColor, particleSize, speed, connectionDistance, prefersReducedMotion, isMobile, reduced]);

  // Don't render canvas if motion is reduced
  if (prefersReducedMotion || reduced) {
    return null;
  }

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ background: 'transparent' }}
      aria-hidden="true"
    />
  );
};

export default React.memo(ParticleNetwork);