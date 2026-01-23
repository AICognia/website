'use client'
import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from 'next-themes';

const TactileBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>(0);
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Default to dark to prevent flash (dark is the default theme)
  const isDark = !mounted || resolvedTheme === 'dark';

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const COLS = Math.ceil(window.innerWidth / 40);
    const ROWS = Math.ceil(window.innerHeight / 40);
    const SPACING = 40;
    const DOT_RADIUS = 1.5;

    let time = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < COLS; i++) {
        for (let j = 0; j < ROWS; j++) {
          const x = i * SPACING + SPACING / 2;
          const y = j * SPACING + SPACING / 2;

          const wave = Math.sin(time * 0.001 + i * 0.1 + j * 0.1) * 0.3 + 0.7;

          ctx.beginPath();
          ctx.arc(x, y, DOT_RADIUS * wave, 0, Math.PI * 2);
          if (isDark) {
            ctx.fillStyle = `rgba(147, 197, 253, ${0.2 * wave})`;
          } else {
            ctx.fillStyle = `rgba(59, 130, 246, ${0.15 * wave})`;
          }
          ctx.fill();
        }
      }

      time++;
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isDark]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none transition-opacity duration-300"
      style={{ opacity: 1, zIndex: 0 }}
    />
  );
};

export default TactileBackground;
