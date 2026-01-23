'use client'
import React, { useEffect, useRef, useState } from 'react';

const DynamicTechBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;

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

    class DataStream {
      x: number = 0;
      y: number = 0;
      speed: number = 0;
      size: number = 0;
      opacity: number = 0;
      color: string = '';

      constructor() {
        this.reset();
        this.y = Math.random() * window.innerHeight;
      }

      reset() {
        this.x = Math.random() * (canvas?.width || window.innerWidth);
        this.y = -10;
        this.speed = Math.random() * 0.5 + 0.2;
        this.size = Math.random() * 2 + 0.5;
        this.opacity = Math.random() * 0.3 + 0.1;
        const colors = ['#1E40AF', '#3B82F6', '#6366F1', '#4F46E5'];
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

    class CircuitPath {
      points: { x: number; y: number }[] = [];
      progress: number = 0;
      speed: number = 0.001;
      color: string = '#1E40AF';
      opacity: number = 0.15;

      constructor() {
        this.points = this.generatePath();
      }

      generatePath(): { x: number; y: number }[] {
        const points: { x: number; y: number }[] = [];
        const startX = Math.random() * window.innerWidth;
        const startY = Math.random() * window.innerHeight;

        points.push({ x: startX, y: startY });

        for (let i = 0; i < 3; i++) {
          const lastPoint = points[points.length - 1];
          if (Math.random() > 0.5) {
            points.push({
              x: lastPoint.x + (Math.random() - 0.5) * 200,
              y: lastPoint.y
            });
          } else {
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

        ctx.beginPath();
        ctx.moveTo(this.points[0].x, this.points[0].y);
        for (let i = 1; i < this.points.length; i++) {
          ctx.lineTo(this.points[i].x, this.points[i].y);
        }
        ctx.stroke();

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

    const dataStreams: DataStream[] = [];
    const streamCount = window.innerWidth > 768 ? 30 : 20;
    for (let i = 0; i < streamCount; i++) {
      dataStreams.push(new DataStream());
    }

    const circuitPaths: CircuitPath[] = [];
    const pathCount = 3;
    for (let i = 0; i < pathCount; i++) {
      circuitPaths.push(new CircuitPath());
    }

    let animationId: number;
    const animate = () => {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      dataStreams.forEach(stream => {
        stream.update();
        stream.draw();
      });

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
      {!isMobile && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 z-0"
          style={{ pointerEvents: 'none', opacity: 0.7 }}
        />
      )}

      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-transparent" />
      </div>
    </>
  );
};

export default DynamicTechBackground;