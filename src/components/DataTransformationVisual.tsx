'use client'
import React, { useEffect, useRef, useState } from 'react';

const DataTransformationVisual: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>(0);
  const [isVisible, setIsVisible] = useState(false);

  const stateRef = useRef({
    time: 0,
    flowProgress: 0,
  });

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const COLORS = {
      bg: '#ffffff',
      inputNode: '#94a3b8',
      hiddenNode: '#60a5fa',
      outputNode: '#3b82f6',
      connectionIdle: '#e2e8f0',
      connectionActive: '#93c5fd',
      flowPulse: '#3b82f6',
      iconColor: '#ffffff',
    };

    const updateCanvasSize = () => {
      if (!canvas || !ctx) return;
      const parent = canvas.parentElement;
      if (!parent) return;

      const width = parent.clientWidth;
      const height = parent.clientHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    const layerSizes = [6, 5, 4, 3, 2, 1];
    const layerXRatios = [0.10, 0.28, 0.46, 0.64, 0.82, 0.94];

    const drawIcons = {
      database: (ctx: CanvasRenderingContext2D, x: number, y: number, r: number) => {
        const s = r * 0.5;
        ctx.beginPath();
        ctx.ellipse(x, y - s * 0.4, s * 0.7, s * 0.25, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(x - s * 0.7, y - s * 0.4);
        ctx.lineTo(x - s * 0.7, y + s * 0.4);
        ctx.arc(x, y + s * 0.4, s * 0.7, Math.PI, 0, true);
        ctx.lineTo(x + s * 0.7, y - s * 0.4);
        ctx.stroke();
      },
      cloud: (ctx: CanvasRenderingContext2D, x: number, y: number, r: number) => {
        const s = r * 0.45;
        ctx.beginPath();
        ctx.arc(x - s * 0.4, y + s * 0.1, s * 0.35, 0, Math.PI * 2);
        ctx.arc(x, y - s * 0.15, s * 0.45, 0, Math.PI * 2);
        ctx.arc(x + s * 0.45, y + s * 0.1, s * 0.35, 0, Math.PI * 2);
        ctx.fill();
      },
      chart: (ctx: CanvasRenderingContext2D, x: number, y: number, r: number) => {
        const s = r * 0.4;
        ctx.fillRect(x - s * 0.9, y + s * 0.1, s * 0.5, s * 0.6);
        ctx.fillRect(x - s * 0.25, y - s * 0.3, s * 0.5, s * 1);
        ctx.fillRect(x + s * 0.4, y - s * 0.6, s * 0.5, s * 1.3);
      },
      code: (ctx: CanvasRenderingContext2D, x: number, y: number, r: number) => {
        const s = r * 0.4;
        ctx.beginPath();
        ctx.moveTo(x - s * 0.3, y - s * 0.6);
        ctx.lineTo(x - s * 0.8, y);
        ctx.lineTo(x - s * 0.3, y + s * 0.6);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x + s * 0.3, y - s * 0.6);
        ctx.lineTo(x + s * 0.8, y);
        ctx.lineTo(x + s * 0.3, y + s * 0.6);
        ctx.stroke();
      },
      grid: (ctx: CanvasRenderingContext2D, x: number, y: number, r: number) => {
        const s = r * 0.25;
        for (let i = -1; i <= 1; i++) {
          for (let j = -1; j <= 1; j++) {
            ctx.beginPath();
            ctx.arc(x + i * s, y + j * s, s * 0.35, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      },
      doc: (ctx: CanvasRenderingContext2D, x: number, y: number, r: number) => {
        const s = r * 0.4;
        ctx.fillRect(x - s * 0.55, y - s * 0.7, s * 1.1, s * 1.4);
        ctx.fillStyle = COLORS.inputNode;
        ctx.fillRect(x - s * 0.35, y - s * 0.4, s * 0.7, s * 0.12);
        ctx.fillRect(x - s * 0.35, y - s * 0.1, s * 0.5, s * 0.12);
        ctx.fillRect(x - s * 0.35, y + s * 0.2, s * 0.6, s * 0.12);
        ctx.fillStyle = COLORS.iconColor;
      },
    };

    const drawOutputIcon = (ctx: CanvasRenderingContext2D, x: number, y: number, r: number) => {
      const s = r * 0.45;
      ctx.beginPath();
      ctx.moveTo(x, y - s);
      ctx.lineTo(x + s * 0.25, y - s * 0.25);
      ctx.lineTo(x + s, y);
      ctx.lineTo(x + s * 0.25, y + s * 0.25);
      ctx.lineTo(x, y + s);
      ctx.lineTo(x - s * 0.25, y + s * 0.25);
      ctx.lineTo(x - s, y);
      ctx.lineTo(x - s * 0.25, y - s * 0.25);
      ctx.closePath();
      ctx.fill();
    };

    const inputIconFns = [
      drawIcons.database,
      drawIcons.cloud,
      drawIcons.chart,
      drawIcons.code,
      drawIcons.grid,
      drawIcons.doc,
    ];

    const drawNode = (
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      radius: number,
      color: string,
      iconFn?: (ctx: CanvasRenderingContext2D, x: number, y: number, r: number) => void
    ) => {
      ctx.shadowColor = 'rgba(0, 0, 0, 0.12)';
      ctx.shadowBlur = radius * 0.5;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = radius * 0.15;

      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();

      ctx.shadowColor = 'transparent';
      ctx.shadowBlur = 0;
      ctx.shadowOffsetY = 0;

      const highlightGrad = ctx.createLinearGradient(x, y - radius, x, y + radius * 0.5);
      highlightGrad.addColorStop(0, 'rgba(255, 255, 255, 0.35)');
      highlightGrad.addColorStop(0.6, 'rgba(255, 255, 255, 0)');
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fillStyle = highlightGrad;
      ctx.fill();

      if (iconFn) {
        ctx.fillStyle = COLORS.iconColor;
        ctx.strokeStyle = COLORS.iconColor;
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        iconFn(ctx, x, y, radius);
      }
    };

    const getNodePositions = (width: number, height: number) => {
      const padding = { x: width * 0.04, y: height * 0.1 };
      const usableWidth = width - padding.x * 2;
      const usableHeight = height - padding.y * 2;

      const positions: Array<Array<{ x: number; y: number }>> = [];

      layerSizes.forEach((nodeCount, layerIdx) => {
        const xPos = padding.x + layerXRatios[layerIdx] * usableWidth;
        const layerPositions: Array<{ x: number; y: number }> = [];

        for (let i = 0; i < nodeCount; i++) {
          const spacing = usableHeight / (nodeCount + 1);
          const yPos = padding.y + spacing * (i + 1);
          layerPositions.push({ x: xPos, y: yPos });
        }
        positions.push(layerPositions);
      });

      return positions;
    };

    function loop() {
      const state = stateRef.current;
      state.time += 0.016;
      state.flowProgress = (state.flowProgress + 0.002) % 1;

      if (ctx && canvas) {
        const width = canvas.width / dpr;
        const height = canvas.height / dpr;

        ctx.fillStyle = COLORS.bg;
        ctx.fillRect(0, 0, width, height);

        const positions = getNodePositions(width, height);

        const flowLayerPair = Math.floor(state.flowProgress * 5);
        const flowWithinPair = (state.flowProgress * 5) % 1;

        ctx.lineCap = 'round';

        for (let layerIdx = 0; layerIdx < positions.length - 1; layerIdx++) {
          const fromLayer = positions[layerIdx];
          const toLayer = positions[layerIdx + 1];

          fromLayer.forEach((from) => {
            toLayer.forEach((to) => {
              const isFlowing = layerIdx === flowLayerPair;

              ctx.beginPath();
              ctx.moveTo(from.x, from.y);
              ctx.lineTo(to.x, to.y);
              ctx.strokeStyle = isFlowing ? COLORS.connectionActive : COLORS.connectionIdle;
              ctx.lineWidth = isFlowing ? 1.5 : 1;
              ctx.stroke();

              if (isFlowing) {
                const pulseX = from.x + (to.x - from.x) * flowWithinPair;
                const pulseY = from.y + (to.y - from.y) * flowWithinPair;

                ctx.beginPath();
                ctx.arc(pulseX, pulseY, 3, 0, Math.PI * 2);
                ctx.fillStyle = COLORS.flowPulse;
                ctx.fill();
              }
            });
          });
        }

        positions.forEach((layerPositions, layerIdx) => {
          let radius;
          if (layerIdx === 0) radius = Math.min(width, height) * 0.045;
          else if (layerIdx === 5) radius = Math.min(width, height) * 0.07;
          else radius = Math.min(width, height) * (0.035 + layerIdx * 0.005);

          let color;
          if (layerIdx === 0) {
            color = COLORS.inputNode;
          } else if (layerIdx === 5) {
            color = COLORS.outputNode;
          } else {
            const t = layerIdx / 5;
            const r = Math.round(148 + (96 - 148) * t);
            const g = Math.round(163 + (165 - 163) * t);
            const b = Math.round(184 + (250 - 184) * t);
            color = `rgb(${r}, ${g}, ${b})`;
          }

          layerPositions.forEach((pos, nodeIdx) => {
            let iconFn: ((ctx: CanvasRenderingContext2D, x: number, y: number, r: number) => void) | undefined;

            if (layerIdx === 0 && inputIconFns[nodeIdx]) {
              iconFn = inputIconFns[nodeIdx];
            } else if (layerIdx === 5) {
              iconFn = drawOutputIcon;
            }

            drawNode(ctx, pos.x, pos.y, radius, color, iconFn);
          });
        });
      }

      animationFrameRef.current = requestAnimationFrame(loop);
    }

    loop();

    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      window.removeEventListener('resize', updateCanvasSize);
    };
  }, []);

  return (
    <div className="relative w-full h-full min-h-[520px] overflow-hidden bg-white">
      <canvas
        ref={canvasRef}
        className={`absolute inset-0 w-full h-full transition-opacity duration-700 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  );
};

export default DataTransformationVisual;