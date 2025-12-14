import React, { useEffect, useRef, useState } from 'react';

const DynamicTechBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    // Skip canvas animation on mobile for performance
    if (isMobile) return;

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

    // Data flow particles for professional tech look
    class DataStream {
      x: number = 0;
      y: number = 0;
      speed: number = 0;
      size: number = 0;
      opacity: number = 0;
      color: string = '';

      constructor() {
        this.reset();
        // Start at random position for initial spread
        this.y = Math.random() * window.innerHeight;
      }

      reset() {
        this.x = Math.random() * (canvas?.width || window.innerWidth);
        this.y = -10;
        this.speed = Math.random() * 0.5 + 0.2; // Very slow movement
        this.size = Math.random() * 2 + 0.5;
        this.opacity = Math.random() * 0.3 + 0.1; // Very subtle
        const colors = ['#5EEAD4', '#2DD4BF', '#14B8A6']; // teal palette
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        this.y += this.speed;
        this.opacity = Math.sin((this.y / window.innerHeight) * Math.PI) * 0.3;

        if (this.y > window.innerHeight + 10) {
          this.reset();
        }
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.opacity;
        ctx.fill();

        // Subtle trail effect
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x, this.y - 20);
        ctx.strokeStyle = this.color;
        ctx.globalAlpha = this.opacity * 0.3;
        ctx.lineWidth = 0.5;
        ctx.stroke();

        ctx.globalAlpha = 1;
      }
    }

    // Circuit path system for tech aesthetics
    class CircuitPath {
      points: { x: number; y: number }[] = [];
      progress: number = 0;
      speed: number = 0.001;
      color: string = '#5EEAD4';
      opacity: number = 0.15;

      constructor() {
        this.points = this.generatePath();
      }

      generatePath(): { x: number; y: number }[] {
        const points: { x: number; y: number }[] = [];
        const startX = Math.random() * window.innerWidth;
        const startY = Math.random() * window.innerHeight;

        points.push({ x: startX, y: startY });

        // Create a tech-like path with right angles
        for (let i = 0; i < 3; i++) {
          const lastPoint = points[points.length - 1];
          if (Math.random() > 0.5) {
            // Horizontal line
            points.push({
              x: lastPoint.x + (Math.random() - 0.5) * 200,
              y: lastPoint.y
            });
          } else {
            // Vertical line
            points.push({
              x: lastPoint.x,
              y: lastPoint.y + (Math.random() - 0.5) * 200
            });
          }
        }

        return points;
      }

      update() {
        this.progress += this.speed;
        if (this.progress > 1) {
          this.points = this.generatePath();
          this.progress = 0;
        }
      }

      draw() {
        if (!ctx || this.points.length < 2) return;

        ctx.strokeStyle = this.color;
        ctx.globalAlpha = this.opacity * (1 - this.progress);
        ctx.lineWidth = 1;

        // Draw the path
        ctx.beginPath();
        ctx.moveTo(this.points[0].x, this.points[0].y);
        for (let i = 1; i < this.points.length; i++) {
          ctx.lineTo(this.points[i].x, this.points[i].y);
        }
        ctx.stroke();

        // Draw nodes at connection points
        for (const point of this.points) {
          ctx.beginPath();
          ctx.arc(point.x, point.y, 2, 0, Math.PI * 2);
          ctx.fillStyle = this.color;
          ctx.globalAlpha = this.opacity * (1 - this.progress);
          ctx.fill();
        }

        ctx.globalAlpha = 1;
      }
    }

    // Create particles and paths
    const dataStreams: DataStream[] = [];
    const streamCount = window.innerWidth > 768 ? 30 : 20; // Fewer particles for professional look
    for (let i = 0; i < streamCount; i++) {
      dataStreams.push(new DataStream());
    }

    const circuitPaths: CircuitPath[] = [];
    const pathCount = 3; // Just a few circuit paths
    for (let i = 0; i < pathCount; i++) {
      circuitPaths.push(new CircuitPath());
    }

    // Animation loop
    let animationId: number;
    const animate = () => {
      // Clear with fade effect for smooth trails
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw data streams
      dataStreams.forEach(stream => {
        stream.update();
        stream.draw();
      });

      // Update and draw circuit paths
      circuitPaths.forEach(path => {
        path.update();
        path.draw();
      });

      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, [isMobile]);

  return (
    <>
      {/* Canvas for dynamic elements - Desktop only */}
      {!isMobile && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 z-0"
          style={{ pointerEvents: 'none', opacity: 0.7 }}
        />
      )}

      {/* Static background layers */}
      <div className="absolute inset-0 z-0">
        {/* Deep gradient base */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-slate-950 to-gray-950" />

        {/* Subtle tech grid */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(rgba(94, 234, 212, 0.06) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(94, 234, 212, 0.06) 1px, transparent 1px)`,
            backgroundSize: '100px 100px'
          }}
        />

        {/* Professional gradient overlays - very subtle */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-gradient-to-br from-teal-900/5 to-transparent" />
          <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-tl from-teal-900/5 to-transparent" />
        </div>

        {/* Vignette effect for depth */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/40" />

        {/* Tech corner details - ultra subtle */}
        <svg className="absolute top-0 left-0 w-48 h-48 opacity-10" viewBox="0 0 200 200">
          <defs>
            <linearGradient id="techGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#5EEAD4" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#2DD4BF" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d="M0,0 L0,60 L10,60 L10,10 L60,10 L60,0 Z" fill="url(#techGradient1)" />
          <circle cx="10" cy="10" r="2" fill="#5EEAD4" opacity="0.3" />
        </svg>

        <svg className="absolute bottom-0 right-0 w-48 h-48 opacity-10 rotate-180" viewBox="0 0 200 200">
          <defs>
            <linearGradient id="techGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2DD4BF" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#14B8A6" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d="M0,0 L0,60 L10,60 L10,10 L60,10 L60,0 Z" fill="url(#techGradient2)" />
          <circle cx="10" cy="10" r="2" fill="#2DD4BF" opacity="0.3" />
        </svg>
      </div>
    </>
  );
};

export default DynamicTechBackground;