'use client'
import React, { useEffect, useRef } from 'react';

interface TactileGridProps {
  isPlaying: boolean;
}

const TactileGrid: React.FC<TactileGridProps> = ({ isPlaying }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const bgCanvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>(0);
  const [hasInteracted, setHasInteracted] = React.useState(false);
  const [isHovering, setIsHovering] = React.useState(false);
  const stateRef = useRef({
    time: 0,
    ripples: [] as Array<{ x: number; y: number; age: number; energy: number }>,
    isDragging: false,
    blobY: -10,
    blobVelY: 0,
    blobHasLanded: false,
    splashTime: 0,
    waterOffsetX: 0,
    waterOffsetY: 0,
    waterVelX: 0,
    waterVelY: 0,
    targetGravityY: 0,
    gravityY: 0,
    gravityVel: 0,
  });

  const COLS = 25;
  const ROWS = 25;
  const SPACING = 20;
  const BASE_RADIUS = 10.0;

  useEffect(() => {
    const canvas = canvasRef.current;
    const bgCanvas = bgCanvasRef.current;
    if (!canvas || !bgCanvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    const bgCtx = bgCanvas.getContext('2d');
    if (!ctx || !bgCtx) return;

    const COLORS = {
      white: { r: 255, g: 255, b: 255 },
      blue300: { r: 59, g: 130, b: 246 },
      blue500: { r: 37, g: 99, b: 235 },
      blue600: { r: 29, g: 78, b: 216 },
    };

    const SPRING = { stiffness: 0.01, damping: 0.95, mass: 1.6 };

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const updateCanvasSize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.scale(dpr, dpr);
    };

    updateCanvasSize();

    const handleResize = () => {
      updateCanvasSize();
    };
    window.addEventListener('resize', handleResize);

    bgCanvas.width = COLS;
    bgCanvas.height = ROWS;

    type ColorObj = { r: number; g: number; b: number };
    const lerp = (start: number, end: number, t: number) => start + (end - start) * t;
    const blendColorObj = (c1: ColorObj, c2: ColorObj, t: number): ColorObj => ({
      r: Math.round(lerp(c1.r, c2.r, t)),
      g: Math.round(lerp(c1.g, c2.g, t)),
      b: Math.round(lerp(c1.b, c2.b, t))
    });

    function getSmoothColor(intensity: number, x: number, y: number, cols: number, rows: number) {
      const biased = Math.pow(intensity, 1.35);
      const steps = 8;
      const stepped = Math.floor(biased * steps) / steps;
      const layerVal = lerp(stepped, biased, 0.75);

      const centerX = cols / 2 - 0.5;
      const centerY = rows / 2 - 0.5;
      const maxRadius = Math.min(centerX, centerY);
      const currentRadius = Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2));
      const edgeDistance = maxRadius - currentRadius;
      const edgeFade = Math.max(0, Math.min(1, edgeDistance / 8));
      const strongFade = Math.pow(edgeFade, 3);
      
      let baseColor;
      if (layerVal < 0.33) baseColor = blendColorObj(COLORS.blue600, COLORS.blue500, layerVal * 3);
      else if (layerVal < 0.66) baseColor = blendColorObj(COLORS.blue500, COLORS.blue300, (layerVal - 0.33) * 3);
      else baseColor = blendColorObj(COLORS.blue300, COLORS.white, (layerVal - 0.66) * 3);

      return blendColorObj(baseColor, COLORS.white, 1 - strongFade);
    }

    function drawInsetCircle(ctx: CanvasRenderingContext2D, x: number, y: number, radius: number, color: { r: number; g: number; b: number }, intensity: number, gridX: number, gridY: number, cols: number, rows: number) {
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);

      const whiteness = (color.r + color.g + color.b) / (255 * 3);
      if (whiteness > 0.9) {
        ctx.fillStyle = `rgba(${color.r},${color.g},${color.b}, ${0.1})`;
      } else if (whiteness > 0.7) {
        ctx.fillStyle = `rgba(${color.r},${color.g},${color.b}, ${0.3})`;
      } else {
        ctx.fillStyle = `rgb(${color.r},${color.g},${color.b})`;
      }
      ctx.fill();

      const centerX = cols / 2 - 0.5;
      const centerY = rows / 2 - 0.5;
      const maxRadius = Math.min(centerX, centerY);
      const currentRadius = Math.sqrt(Math.pow(gridX - centerX, 2) + Math.pow(gridY - centerY, 2));
      const edgeDistance = maxRadius - currentRadius;

      if (edgeDistance < 2) {
        return;
      }

      const colorWhiteness = (color.r + color.g + color.b) / (255 * 3);
      const shadowPower = (0.15 + (1 - intensity) * 0.15) * (1 - colorWhiteness * 0.9);

      if (shadowPower > 0.01) {
        const innerShadow = ctx.createRadialGradient(x, y, radius * 0.7, x, y, radius);
        innerShadow.addColorStop(0, `rgba(29, 78, 216, 0)`);
        innerShadow.addColorStop(1, `rgba(29, 78, 216, ${shadowPower})`);

        ctx.fillStyle = innerShadow;
        ctx.fill();
      }

      const glowPower = 0.25 * (1 - colorWhiteness * 0.9);

      if (glowPower > 0.01) {
        const centerGlow = ctx.createRadialGradient(x, y, 0, x, y, radius * 0.8);
        centerGlow.addColorStop(0, `rgba(59, 130, 246, ${glowPower})`);
        centerGlow.addColorStop(1, `rgba(59, 130, 246, 0)`);

        ctx.fillStyle = centerGlow;
        ctx.fill();
      }
    }

    function drawResponsiveGrid(ctx: CanvasRenderingContext2D, gridData: { x: number; y: number; color: { r: number; g: number; b: number }; scale: number; intensity: number }[], canvasWidth: number, canvasHeight: number) {
      const gridWidth = (COLS - 1) * SPACING;
      const gridHeight = (ROWS - 1) * SPACING;
      const offsetX = (canvasWidth - gridWidth) / 2;
      const offsetY = (canvasHeight - gridHeight) / 2;
      
      for (const item of gridData) {
        const px = offsetX + item.x * SPACING;
        const py = offsetY + item.y * SPACING;
        const radius = BASE_RADIUS * item.scale;
        drawInsetCircle(ctx, px, py, radius, item.color, item.intensity, item.x, item.y, COLS, ROWS);
      }
    }

    const addPoint = (x: number, y: number, energy = 0.2) => {
      const rect = canvas.getBoundingClientRect();
      const gridX = (x - rect.left - SPACING) / SPACING;
      const gridY = (y - rect.top - SPACING) / SPACING;
      if (gridX > -1 && gridX < COLS + 1 && gridY > -1 && gridY < ROWS + 1) {
        stateRef.current.ripples.push({ x: gridX, y: gridY, age: 0, energy: energy });
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      stateRef.current.isDragging = true;
      addPoint(e.clientX, e.clientY, 0.8);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (stateRef.current.isDragging) addPoint(e.clientX, e.clientY, 0.15);
    };

    const handleMouseUp = () => {
      stateRef.current.isDragging = false;
    };

    const handleTouchStart = (e: TouchEvent) => {
      e.preventDefault();
      stateRef.current.isDragging = true;
      addPoint(e.touches[0].clientX, e.touches[0].clientY, 0.8);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (stateRef.current.isDragging) addPoint(e.touches[0].clientX, e.touches[0].clientY, 0.15);
    };

    const handleTouchEnd = () => {
      stateRef.current.isDragging = false;
    };

    const handleInteraction = () => {
      setHasInteracted(true);
    };

    canvas.addEventListener('mousedown', (e) => { handleMouseDown(e); handleInteraction(); });
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('touchstart', (e) => { handleTouchStart(e); handleInteraction(); }, { passive: false });
    canvas.addEventListener('touchmove', handleTouchMove, { passive: false });
    canvas.addEventListener('touchend', handleTouchEnd);

    function loop() {
      const state = stateRef.current;
      state.time += 0.015;

      const force = (state.targetGravityY - state.gravityY) * SPRING.stiffness;
      const acceleration = force / SPRING.mass;
      state.gravityVel = (state.gravityVel + acceleration) * SPRING.damping;
      state.gravityY += state.gravityVel;

      state.ripples = state.ripples.filter(r => r.energy > 0.01);
      state.ripples.forEach(r => {
        r.age += 0.25;
        r.energy *= 0.995;
      });

      const gravity = 0.15;
      const centerY = ROWS / 2;

      if (!state.blobHasLanded) {
        state.blobVelY += gravity;
        state.blobY += state.blobVelY;

        if (state.blobY >= centerY) {
          state.blobY = centerY;
          state.blobHasLanded = true;
          state.splashTime = state.time;
          for (let angle = 0; angle < Math.PI * 2; angle += Math.PI / 4) {
            const splashX = COLS / 2 + Math.cos(angle) * 3;
            const splashY = ROWS / 2 + Math.sin(angle) * 3;
            state.ripples.push({ x: splashX, y: splashY, age: 0, energy: 1.5 });
          }
          state.ripples.push({ x: COLS / 2, y: ROWS / 2, age: 0, energy: 2 });
        }
      } else {
        const sloshSpeed = 0.03;
        const sloshDamping = 0.995;

        state.waterVelX += (Math.sin(state.time * 0.7) * 0.02 + Math.sin(state.time * 1.3) * 0.01);
        state.waterVelY += (Math.cos(state.time * 0.5) * 0.02 + Math.cos(state.time * 1.1) * 0.01);

        state.waterVelX -= state.waterOffsetX * sloshSpeed;
        state.waterVelY -= state.waterOffsetY * sloshSpeed;

        state.waterVelX *= sloshDamping;
        state.waterVelY *= sloshDamping;
        state.waterOffsetX += state.waterVelX;
        state.waterOffsetY += state.waterVelY;

        const maxOffset = 5;
        state.waterOffsetX = Math.max(-maxOffset, Math.min(maxOffset, state.waterOffsetX));
        state.waterOffsetY = Math.max(-maxOffset, Math.min(maxOffset, state.waterOffsetY));
      }

      const gridData: { x: number; y: number; color: { r: number; g: number; b: number }; scale: number; intensity: number }[] = [];
      for (let j = 0; j < ROWS; j++) {
        for (let i = 0; i < COLS; i++) {
          const waterCenterX = COLS / 2 + state.waterOffsetX;
          const waterCenterY = ROWS / 2 + state.waterOffsetY;

          const centerDist = Math.sqrt(Math.pow(i - waterCenterX, 2) + Math.pow(j - waterCenterY, 2));
          const maxDist = Math.sqrt(Math.pow(COLS/2, 2) + Math.pow(ROWS/2, 2));

          let intensity = 0.9;

          if (!state.blobHasLanded) {
            const blobDist = Math.sqrt(Math.pow(i - COLS/2, 2) + Math.pow(j - state.blobY, 2));
            const blobRadius = 6;
            if (blobDist < blobRadius) {
              const blobIntensity = 1 - (blobDist / blobRadius);
              intensity = 0.1 + blobIntensity * 0.3;
            }
          } else {
            const timeSinceSplash = state.time - state.splashTime;

            const poolIntensity = Math.min(1, centerDist / (maxDist * 0.7));
            intensity = 0.15 + poolIntensity * 0.7;

            const splashFade = Math.max(0, 1 - timeSinceSplash * 0.15);
            const splashWave = Math.sin(centerDist * 0.8 - timeSinceSplash * 4) * 0.3 * splashFade;

            const wave1 = Math.sin(centerDist * 0.5 - state.time * 2) * 0.25;
            const wave2 = Math.sin(centerDist * 0.7 - state.time * 2.5 + 1) * 0.2;
            const wave3 = Math.sin(centerDist * 0.3 - state.time * 1.5 + 2) * 0.15;

            const sloshWave = Math.sin(i * 0.3 + state.waterOffsetX * 0.5 - state.time) * 0.15 +
                             Math.sin(j * 0.3 + state.waterOffsetY * 0.5 - state.time * 0.8) * 0.15;

            intensity += splashWave + wave1 + wave2 + wave3 + sloshWave;
          }

          if (isPlaying && state.blobHasLanded) {
            const audioWave = Math.sin(centerDist * 0.6 - state.time * 4) * 0.3;
            intensity += audioWave;
          }

          let scaleMod = 1;
          state.ripples.forEach(r => {
            const rDist = Math.sqrt(Math.pow(i - r.x, 2) + Math.pow(j - r.y, 2));
            const diff = rDist - r.age;
            if (Math.abs(diff) < 6) {
              const gauss = Math.exp(-(diff * diff) / 12);

              const pulseEffect = gauss * r.energy * 0.4;
              const distanceFromCenter = rDist;
              const maxDistance = r.age + 6;
              const darknessFactor = Math.min(1, distanceFromCenter / maxDistance);

              intensity += pulseEffect * (2 - darknessFactor * 2.5);
              scaleMod += pulseEffect * 1.2;
            }
          });

          intensity = Math.max(0, Math.min(1, intensity));

          const color = getSmoothColor(intensity, i, j, COLS, ROWS);
          
          gridData.push({ x: i, y: j, color, scale: scaleMod, intensity });

          if (bgCtx) {
            bgCtx.fillStyle = `rgb(${color.r},${color.g},${color.b})`;
            bgCtx.fillRect(i, j, 1, 1);
          }
        }
      }

      if (ctx && canvas) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawResponsiveGrid(ctx, gridData, canvas.width / dpr, canvas.height / dpr);
      }

      animationFrameRef.current = requestAnimationFrame(loop);
    }

    loop();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      canvas.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      canvas.removeEventListener('touchstart', handleTouchStart);
      canvas.removeEventListener('touchmove', handleTouchMove);
      canvas.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (isPlaying) {
      stateRef.current.targetGravityY = ROWS + 10;
    } else {
      stateRef.current.targetGravityY = ROWS / 2 - 0.5;
    }
  }, [isPlaying]);

  return (
    <div 
      className="relative w-full group" 
      style={{ height: `${ROWS * SPACING + SPACING * 2}px` }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <canvas
        ref={bgCanvasRef}
        className="hidden"
      />
      <canvas
        ref={canvasRef}
        className={`w-full h-full cursor-pointer transition-all duration-300 ${
          isHovering ? 'opacity-100 scale-[1.02]' : 'opacity-90'
        }`}
      />

      <div
        className={`absolute inset-0 pointer-events-none flex items-center justify-center transition-all duration-500 ${
          hasInteracted ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <div className={`flex flex-col items-center gap-3 transition-all duration-300 ${
          isHovering ? 'scale-110' : 'scale-100'
        }`}>
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 rounded-full border-2 border-white/60 animate-ping" style={{ animationDuration: '2s' }} />
            <div className="absolute inset-2 rounded-full border-2 border-white/50 animate-ping" style={{ animationDuration: '2s', animationDelay: '0.5s' }} />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                </svg>
              </div>
            </div>
          </div>
          <span className="text-sm font-semibold text-white tracking-wide uppercase">Click to interact</span>
        </div>
      </div>

      <div className={`absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-300 ${
        isHovering && !hasInteracted ? 'opacity-100' : 'opacity-0'
      }`}>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/5 via-transparent to-blue-400/5 rounded-2xl" />
      </div>
    </div>
  );
};

export default TactileGrid;
