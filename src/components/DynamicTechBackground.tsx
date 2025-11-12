import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const DynamicTechBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle system
    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;
      opacity: number;

      constructor() {
        this.x = Math.random() * (canvas?.width || window.innerWidth);
        this.y = Math.random() * (canvas?.height || window.innerHeight);
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.radius = Math.random() * 1.5 + 0.5;
        const colors = ['#06B6D4', '#3B82F6', '#A855F7', '#10B981'];
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.opacity = Math.random() * 0.5 + 0.1;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        const width = canvas?.width || window.innerWidth;
        const height = canvas?.height || window.innerHeight;

        if (this.x < 0 || this.x > width) this.vx = -this.vx;
        if (this.y < 0 || this.y > height) this.vy = -this.vy;
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.opacity;
        ctx.fill();
        ctx.globalAlpha = 1;
      }
    }

    // Network connections
    class Connection {
      particles: Particle[];
      maxDistance: number;

      constructor(particles: Particle[]) {
        this.particles = particles;
        this.maxDistance = 150;
      }

      draw() {
        if (!ctx) return;
        for (let i = 0; i < this.particles.length; i++) {
          for (let j = i + 1; j < this.particles.length; j++) {
            const dx = this.particles[i].x - this.particles[j].x;
            const dy = this.particles[i].y - this.particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < this.maxDistance) {
              const opacity = (1 - distance / this.maxDistance) * 0.15;
              ctx.beginPath();
              ctx.strokeStyle = '#06B6D4';
              ctx.globalAlpha = opacity;
              ctx.lineWidth = 0.5;
              ctx.moveTo(this.particles[i].x, this.particles[i].y);
              ctx.lineTo(this.particles[j].x, this.particles[j].y);
              ctx.stroke();
              ctx.globalAlpha = 1;
            }
          }
        }
      }
    }

    // Create particles
    const particleCount = window.innerWidth > 768 ? 50 : 30;
    const particles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
    const connections = new Connection(particles);

    // Animation loop
    let animationId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      // Draw connections
      connections.draw();

      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <>
      {/* Canvas for particles */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0"
        style={{ pointerEvents: 'none' }}
      />

      {/* Static background layers */}
      <div className="absolute inset-0 z-0">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950/10 to-slate-950" />

        {/* Tech grid pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2306B6D4' fill-opacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        {/* Animated gradient orbs */}
        <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-cyan-500 rounded-full mix-blend-screen filter blur-3xl opacity-[0.02] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-[800px] h-[800px] bg-blue-500 rounded-full mix-blend-screen filter blur-3xl opacity-[0.02] animate-pulse animation-delay-2000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500 rounded-full mix-blend-screen filter blur-3xl opacity-[0.02] animate-pulse animation-delay-4000" />

        {/* Scanning line effect */}
        <motion.div
          className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-30"
          initial={{ top: '-2px' }}
          animate={{ top: '100%' }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'linear',
          }}
        />

        {/* Tech corner accents */}
        <div className="absolute top-0 left-0 w-32 h-32">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <path
              d="M0,0 L30,0 L0,30 Z"
              fill="url(#corner-gradient)"
              opacity="0.1"
            />
            <path
              d="M0,5 L25,5 L5,25 L5,0"
              fill="none"
              stroke="#06B6D4"
              strokeWidth="0.5"
              opacity="0.3"
            />
            <defs>
              <linearGradient id="corner-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#06B6D4" />
                <stop offset="100%" stopColor="#3B82F6" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div className="absolute bottom-0 right-0 w-32 h-32 rotate-180">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <path
              d="M0,0 L30,0 L0,30 Z"
              fill="url(#corner-gradient2)"
              opacity="0.1"
            />
            <path
              d="M0,5 L25,5 L5,25 L5,0"
              fill="none"
              stroke="#A855F7"
              strokeWidth="0.5"
              opacity="0.3"
            />
            <defs>
              <linearGradient id="corner-gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#A855F7" />
                <stop offset="100%" stopColor="#10B981" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Depth gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
      </div>
    </>
  );
};

export default DynamicTechBackground;