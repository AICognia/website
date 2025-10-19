import React, { useEffect, useRef } from 'react';

interface ParticleNetworkProps {
  particleCount?: number;
  particleColor?: string;
  lineColor?: string;
  particleSize?: number;
  speed?: number;
  connectionDistance?: number;
}

const ParticleNetwork: React.FC<ParticleNetworkProps> = ({
  particleCount = 30,
  particleColor = 'rgba(6, 182, 212, 0.8)',
  lineColor = 'rgba(6, 182, 212, 0.15)',
  particleSize = 2,
  speed = 0.3,
  connectionDistance = 150
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle class
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

      update(width: number, height: number) {
        this.x += this.vx;
        this.y += this.vy;
        this.pulsePhase += 0.02;

        // Bounce off walls
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;

        // Keep in bounds
        this.x = Math.max(0, Math.min(width, this.x));
        this.y = Math.max(0, Math.min(height, this.y));
      }

      draw(ctx: CanvasRenderingContext2D) {
        const pulseFactor = 1 + Math.sin(this.pulsePhase) * 0.3;
        const currentSize = this.size * pulseFactor;
        
        // Glow effect
        ctx.shadowBlur = 10;
        ctx.shadowColor = particleColor;
        
        ctx.beginPath();
        ctx.arc(this.x, this.y, currentSize, 0, Math.PI * 2);
        ctx.fillStyle = particleColor;
        ctx.fill();
        
        ctx.shadowBlur = 0;
      }
    }

    // Create particles
    const particles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle(canvas.width, canvas.height));
    }

    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;
    let isMouseInCanvas = false;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
      isMouseInCanvas = true;
    };

    const handleMouseLeave = () => {
      isMouseInCanvas = false;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    // Animation loop
    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particles.forEach(particle => {
        particle.update(canvas.width, canvas.height);
        
        // Mouse repulsion
        if (isMouseInCanvas) {
          const dx = mouseX - particle.x;
          const dy = mouseY - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 100) {
            const force = (100 - distance) / 100;
            particle.vx -= (dx / distance) * force * 0.5;
            particle.vy -= (dy / distance) * force * 0.5;
          }
        }
      });

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            const opacity = 1 - distance / connectionDistance;
            ctx.strokeStyle = lineColor.replace('0.15', (opacity * 0.15).toString());
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw particles on top
      particles.forEach(particle => {
        particle.draw(ctx);
      });

      requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [particleCount, particleColor, lineColor, particleSize, speed, connectionDistance]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ background: 'transparent' }}
    />
  );
};

export default ParticleNetwork;
