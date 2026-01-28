'use client'
import React, { useEffect, useRef, useState } from 'react';

interface HeroBackgroundGridProps {
    isPlaying: boolean;
}

/** Read theme directly from <html> class — synchronous, no flash */
function getIsDarkFromDOM(): boolean {
    if (typeof document === 'undefined') return true;
    return !document.documentElement.classList.contains('light');
}

const HeroBackgroundGrid: React.FC<HeroBackgroundGridProps> = ({ isPlaying }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animationFrameRef = useRef<number>(0);
    const [isVisible, setIsVisible] = useState(false);
    const [animationReady, setAnimationReady] = useState(false);
    const isDarkRef = useRef(getIsDarkFromDOM());

    const stateRef = useRef({
        time: 0,
        voiceIntensity: 0,
        mouse: { x: -1000, y: -1000 },
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
        swarmCenters: [] as Array<{ x: number; y: number; vx: number; vy: number; phase: number }>,
        flowField: [] as number[][],
    });

    const getResponsiveParams = () => {
        if (typeof window === 'undefined') {
            return { COLS: 80, ROWS: 40, SPACING: 19, BASE_RADIUS: 9.5, ANIMATION_SPEED: 1.0 };
        }

        const width = window.innerWidth;
        const height = window.innerHeight;
        const aspectRatio = width / height;

        if (width < 768) {
            const BASE_RADIUS = 6.0;
            const SPACING = BASE_RADIUS * 2;
            return {
                COLS: Math.floor(width / SPACING),
                ROWS: Math.floor(height / SPACING),
                SPACING,
                BASE_RADIUS,
                ANIMATION_SPEED: 0.4
            };
        } else if (width < 1024) {
            const BASE_RADIUS = 7.0;
            const SPACING = BASE_RADIUS * 2;
            return {
                COLS: Math.floor(width / SPACING),
                ROWS: Math.floor(height / SPACING),
                SPACING,
                BASE_RADIUS,
                ANIMATION_SPEED: 0.6
            };
        } else if (aspectRatio < 1.5) {
            const BASE_RADIUS = 8.0;
            const SPACING = BASE_RADIUS * 2;
            return {
                COLS: Math.floor(width / SPACING),
                ROWS: Math.floor(height / SPACING),
                SPACING,
                BASE_RADIUS,
                ANIMATION_SPEED: 1.0
            };
        } else if (width > 2000) {
            const BASE_RADIUS = 11.0;
            const SPACING = BASE_RADIUS * 2;
            return {
                COLS: Math.floor(width / SPACING),
                ROWS: Math.floor(height / SPACING),
                SPACING,
                BASE_RADIUS,
                ANIMATION_SPEED: 1.0
            };
        } else {
            const BASE_RADIUS = 9.5;
            const SPACING = BASE_RADIUS * 2;
            return {
                COLS: Math.floor(width / SPACING),
                ROWS: Math.floor(height / SPACING),
                SPACING,
                BASE_RADIUS,
                ANIMATION_SPEED: 1.0
            };
        }
    };

    const { COLS, ROWS, SPACING, BASE_RADIUS, ANIMATION_SPEED } = getResponsiveParams();

    useEffect(() => {
        // Use requestAnimationFrame for smoother startup
        let rafId1: number;
        let rafId2: number;

        rafId1 = requestAnimationFrame(() => {
            setIsVisible(true);
            rafId2 = requestAnimationFrame(() => {
                setAnimationReady(true);
            });
        });

        // Watch for theme class changes on <html> so canvas re-renders
        const observer = new MutationObserver(() => {
            isDarkRef.current = getIsDarkFromDOM();
        });
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

        return () => {
            cancelAnimationFrame(rafId1);
            cancelAnimationFrame(rafId2);
            observer.disconnect();
        };
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d', { alpha: true });
        if (!ctx) return;

        const COLORS_DARK = {
            background: { r: 17, g: 24, b: 39 },
            blue300: { r: 135, g: 200, b: 255 },
            blue500: { r: 99, g: 170, b: 255 },
            blue600: { r: 70, g: 140, b: 255 },
            midBlend: { r: 80, g: 115, b: 190 },
        };
        const COLORS_LIGHT = {
            background: { r: 255, g: 255, b: 255 },
            blue300: { r: 147, g: 197, b: 253 },
            blue500: { r: 96, g: 165, b: 250 },
            blue600: { r: 59, g: 130, b: 246 },
            midBlend: { r: 220, g: 240, b: 255 },
        };
        // Read from ref each frame — no stale closure
        const getColors = () => isDarkRef.current ? COLORS_DARK : COLORS_LIGHT;

        const SPRING = { stiffness: 0.01, damping: 0.95, mass: 1.6 };

        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        let cols = 0;
        let rows = 0;

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

            // Update responsive params on resize
            const params = getResponsiveParams();
            cols = Math.ceil(width / params.SPACING) + 2;
            rows = Math.ceil(height / params.SPACING) + 2;
        };

        updateCanvasSize();
        window.addEventListener('resize', updateCanvasSize);

        // Initialize swarm centers
        const initSwarmCenters = () => {
            stateRef.current.swarmCenters = [];
            for (let i = 0; i < 5; i++) {
                stateRef.current.swarmCenters.push({
                    x: Math.random() * cols,
                    y: Math.random() * rows,
                    vx: (Math.random() - 0.5) * 0.5,
                    vy: (Math.random() - 0.5) * 0.5,
                    phase: Math.random() * Math.PI * 2
                });
            }
        };

        // Initialize flow field
        const initFlowField = () => {
            stateRef.current.flowField = [];
            for (let j = 0; j < rows; j++) {
                stateRef.current.flowField[j] = [];
                for (let i = 0; i < cols; i++) {
                    stateRef.current.flowField[j][i] = Math.random() * Math.PI * 2;
                }
            }
        };

        initSwarmCenters();
        initFlowField();

        type ColorObj = { r: number; g: number; b: number };
        const lerp = (start: number, end: number, t: number) => start + (end - start) * t;
        const blendColorObj = (c1: ColorObj, c2: ColorObj, t: number): ColorObj => ({
            r: Math.round(lerp(c1.r, c2.r, t)),
            g: Math.round(lerp(c1.g, c2.g, t)),
            b: Math.round(lerp(c1.b, c2.b, t))
        });

        function getSmoothColor(intensity: number, x: number, y: number, cols: number, rows: number) {
            const COLORS = getColors();
            const biased = Math.pow(intensity, 1.2);

            const time = stateRef.current.time;
            const waveInfluence = Math.sin(x * 0.1 + time * 0.5) * Math.cos(y * 0.1 + time * 0.3);
            const diagonalGradient = (x + y) / (cols + rows);
            const radialGradient = Math.sqrt(Math.pow(x - cols/2, 2) + Math.pow(y - rows/2, 2)) / Math.max(cols, rows);

            const gradient1 = Math.sin(diagonalGradient * Math.PI * 3 + time * 0.7) * 0.5 + 0.5;
            const gradient2 = Math.cos(radialGradient * Math.PI * 2 - time * 0.4) * 0.5 + 0.5;
            const gradient3 = Math.sin(waveInfluence * Math.PI + time * 0.2) * 0.5 + 0.5;

            const combinedGradient = (biased * 0.6 + gradient1 * 0.2 + gradient2 * 0.1 + gradient3 * 0.1);

            const noise = Math.sin(x * 0.7 + y * 0.3 + time * 0.8) * Math.cos(x * 0.3 - y * 0.7 + time * 0.5) * 0.1;
            const finalIntensity = Math.max(0.1, Math.min(1, combinedGradient + noise));

            let baseColor;
            if (finalIntensity < 0.25) {
                baseColor = blendColorObj(COLORS.blue600, COLORS.blue500, finalIntensity * 4);
            } else if (finalIntensity < 0.5) {
                baseColor = blendColorObj(COLORS.blue500, COLORS.blue300, (finalIntensity - 0.25) * 4);
            } else if (finalIntensity < 0.75) {
                baseColor = blendColorObj(COLORS.blue300, COLORS.midBlend, (finalIntensity - 0.5) * 4);
            } else {
                baseColor = blendColorObj(COLORS.midBlend, COLORS.background, (finalIntensity - 0.75) * 4);
            }

            return baseColor;
        }

        function drawInsetCircle(ctx: CanvasRenderingContext2D, x: number, y: number, radius: number, color: ColorObj, intensity: number) {
            const currentIsDark = isDarkRef.current;
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, Math.PI * 2);

            // Calculate how close this color is to the background color
            const bg = getColors().background;
            const distToBackground = Math.sqrt(
                Math.pow(color.r - bg.r, 2) +
                Math.pow(color.g - bg.g, 2) +
                Math.pow(color.b - bg.b, 2)
            ) / 441.67; // Normalize by max possible distance (sqrt(255^2 * 3))

            // Fade out dots that are close to background color
            let alpha = 1;
            if (distToBackground < 0.1) {
                alpha = 0.1;
            } else if (distToBackground < 0.25) {
                alpha = 0.3;
            } else if (distToBackground < 0.4) {
                alpha = 0.6;
            }

            ctx.fillStyle = `rgba(${color.r},${color.g},${color.b}, ${alpha})`;
            ctx.fill();

            if (alpha > 0.5) {
                const effectStrength = distToBackground;
                const shadowPower = currentIsDark
                    ? (0.2 + (1 - intensity) * 0.2) * effectStrength  // Stronger shadow in dark mode
                    : (0.15 + (1 - intensity) * 0.15) * effectStrength;

                if (shadowPower > 0.01) {
                    const shadowColor = currentIsDark ? '79, 150, 255' : '147, 197, 253';
                    const innerShadow = ctx.createRadialGradient(x, y, radius * 0.7, x, y, radius);
                    innerShadow.addColorStop(0, `rgba(${shadowColor}, 0)`);
                    innerShadow.addColorStop(1, `rgba(${shadowColor}, ${shadowPower * 0.5})`);

                    ctx.fillStyle = innerShadow;
                    ctx.fill();
                }

                const glowPower = currentIsDark ? 0.25 * effectStrength : 0.15 * effectStrength;

                if (glowPower > 0.01) {
                    const glowColor = currentIsDark ? '79, 150, 255' : '147, 197, 253';
                    const centerGlow = ctx.createRadialGradient(x, y, 0, x, y, radius * 0.8);
                    centerGlow.addColorStop(0, `rgba(${glowColor}, ${glowPower})`);
                    centerGlow.addColorStop(1, `rgba(${glowColor}, 0)`);

                    ctx.fillStyle = centerGlow;
                    ctx.fill();
                }
            }
        }

        const addPoint = (x: number, y: number, energy = 0.2) => {
            const rect = canvas.getBoundingClientRect();
            const params = getResponsiveParams();
            const gridX = (x - rect.left - params.SPACING) / params.SPACING;
            const gridY = (y - rect.top - params.SPACING) / params.SPACING;
            if (gridX > -1 && gridX < cols + 1 && gridY > -1 && gridY < rows + 1) {
                stateRef.current.ripples.push({ x: gridX, y: gridY, age: 0, energy: energy });
            }
        };

        const handleMouseDown = (e: MouseEvent) => {
            stateRef.current.isDragging = true;
            addPoint(e.clientX, e.clientY, 0.8);
        };

        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            const params = getResponsiveParams();
            stateRef.current.mouse.x = (e.clientX - rect.left) / params.SPACING;
            stateRef.current.mouse.y = (e.clientY - rect.top) / params.SPACING;
            
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

        canvas.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
        canvas.addEventListener('touchstart', handleTouchStart, { passive: false });
        canvas.addEventListener('touchmove', handleTouchMove, { passive: false });
        canvas.addEventListener('touchend', handleTouchEnd);

        function loop() {
            const state = stateRef.current;
            const params = getResponsiveParams();
            const animSpeed = params.ANIMATION_SPEED;

            if (animationReady) {
                state.time += 0.015 * animSpeed;
            }

            const targetIntensity = isPlaying ? 1 : 0;
            state.voiceIntensity = lerp(state.voiceIntensity, targetIntensity, 0.08);

            state.ripples = state.ripples.filter(r => r.energy > 0.01);
            state.ripples.forEach(r => {
                r.age += 0.25 * animSpeed;
                r.energy *= 0.995;
            });

            if (animationReady) {
                state.swarmCenters.forEach((center) => {
                    center.vx += (Math.random() - 0.5) * 0.1 * animSpeed;
                    center.vy += (Math.random() - 0.5) * 0.1 * animSpeed;

                    const maxSpeed = 0.8 * animSpeed;
                    const speed = Math.sqrt(center.vx * center.vx + center.vy * center.vy);
                    if (speed > maxSpeed) {
                        center.vx = (center.vx / speed) * maxSpeed;
                        center.vy = (center.vy / speed) * maxSpeed;
                    }

                    center.x += center.vx;
                    center.y += center.vy;

                    if (center.x < 0) center.x = cols;
                    if (center.x > cols) center.x = 0;
                    if (center.y < 0) center.y = rows;
                    if (center.y > rows) center.y = 0;

                    center.phase += 0.02 * animSpeed;
                });

                for (let j = 0; j < rows; j++) {
                    if (!state.flowField[j]) continue;
                    for (let i = 0; i < cols; i++) {
                        if (state.flowField[j][i] !== undefined) {
                            state.flowField[j][i] += 0.01 * animSpeed;
                        }
                    }
                }
            }

            const gravity = 0.05 * animSpeed;
            const centerY = rows / 2;
            const centerX = cols / 2;

            if (!state.blobHasLanded && animationReady) {
                state.blobVelY += gravity;
                state.blobVelY = Math.min(state.blobVelY, 1.5 * animSpeed);
                state.blobY += state.blobVelY;

                if (state.blobY >= centerY) {
                    state.blobY = centerY;
                    state.blobHasLanded = true;
                    state.splashTime = state.time;
                    for (let angle = 0; angle < Math.PI * 2; angle += Math.PI / 4) {
                        const splashX = centerX + Math.cos(angle) * 3;
                        const splashY = centerY + Math.sin(angle) * 3;
                        state.ripples.push({ x: splashX, y: splashY, age: 0, energy: 1.5 });
                    }
                    state.ripples.push({ x: centerX, y: centerY, age: 0, energy: 2 });
                }
            } else if (state.blobHasLanded && animationReady) {
                const sloshSpeed = 0.03 * animSpeed;
                const sloshDamping = 0.995;

                state.waterVelX += (Math.sin(state.time * 0.7) * 0.02 + Math.sin(state.time * 1.3) * 0.01) * animSpeed;
                state.waterVelY += (Math.cos(state.time * 0.5) * 0.02 + Math.cos(state.time * 1.1) * 0.01) * animSpeed;

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

            if (ctx && canvas) {
                ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);
                
                const params = getResponsiveParams();

                for (let j = 0; j < rows; j++) {
                    for (let i = 0; i < cols; i++) {
                        const px = i * params.SPACING;
                        const py = j * params.SPACING;

                        // Calculate animation ramp-up factor
                        let animationFactor = 0;
                        if (animationReady) {
                            const timeSinceStart = state.time;
                            animationFactor = Math.min(1, timeSinceStart / 0.8); // Ramp up over 0.8 seconds for faster, punchier start
                        }

                        // Water center moves with sloshing
                        const waterCenterX = centerX + state.waterOffsetX;
                        const waterCenterY = centerY + state.waterOffsetY;
                        
                        // Distance from water center
                        const centerDist = Math.sqrt(Math.pow(i - waterCenterX, 2) + Math.pow(j - waterCenterY, 2));
                        
                        // Start with uniform light color (no waves visible)
                        let intensity = 0.85;
                        
                        if (!state.blobHasLanded && animationReady) {
                            // No droplet - trigger splash immediately for smooth start
                            if (state.time > 0.1) { // Almost instant trigger for smooth visual start
                                state.blobY = centerY;
                                state.blobHasLanded = true;
                                state.splashTime = state.time;
                                // Create splash ripples without droplet
                                for (let angle = 0; angle < Math.PI * 2; angle += Math.PI / 4) {
                                    const splashX = centerX + Math.cos(angle) * 3;
                                    const splashY = centerY + Math.sin(angle) * 3;
                                    state.ripples.push({ x: splashX, y: splashY, age: 0, energy: 1.5 });
                                }
                                state.ripples.push({ x: centerX, y: centerY, age: 0, energy: 2 });
                            }
                        } else if (state.blobHasLanded && animationReady) {
                            // Smooth, organic continuous animations matching big wave quality
                            const timeSinceSplash = state.time - state.splashTime;
                            
                            // Gentle, smooth expansion cycles
                            const expansionCycle1 = Math.sin(state.time * 0.15) * 0.3 + 0.5; // Slower, gentler
                            const expansionCycle2 = Math.cos(state.time * 0.23) * 0.2 + 0.6; // More subtle
                            const expansionCycle3 = Math.sin(state.time * 0.09) * 0.1 + 0.7; // Very slow variation
                            
                            const baseCoverage = 0.6 + expansionCycle1 * 0.2 + expansionCycle2 * 0.1 + expansionCycle3 * 0.05;
                            const maxWaveRadius = Math.max(cols, rows) * baseCoverage;
                            
                            if (centerDist < maxWaveRadius) {
                                // Smooth organic base pool
                                const poolGradient = Math.sin(centerDist * 0.08 + state.time * 0.2) * 0.08 + 0.15;
                                const poolIntensity = Math.min(1, centerDist / 15 + poolGradient);
                                intensity = 0.1 + poolIntensity * 0.7;
                                
                                // Smooth, flowing waves - like the big wave
                                const smoothWave1 = Math.sin(centerDist * 0.25 - state.time * 0.8 + Math.sin(i * 0.15) * Math.cos(j * 0.2)) * 0.25;
                                const smoothWave2 = Math.cos(centerDist * 0.35 - state.time * 1.2 + Math.cos(i * 0.25) * Math.sin(j * 0.15)) * 0.2;
                                const smoothWave3 = Math.sin(centerDist * 0.2 - state.time * 0.6 + Math.sin(i * 0.2 - j * 0.15)) * 0.3;
                                const smoothWave4 = Math.cos(centerDist * 0.3 - state.time * 1.0 + Math.cos(i * 0.15 + j * 0.2)) * 0.22;
                                
                                // Gentle surge patterns - smooth like big wave
                                const surgePhase1 = Math.sin(state.time * 0.12 + i * 0.08) * 0.5 + 0.5;
                                const surgePhase2 = Math.cos(state.time * 0.18 + j * 0.12) * 0.5 + 0.5;
                                const surgePhase3 = Math.sin(state.time * 0.14 + (i - j) * 0.1) * 0.5 + 0.5;
                                
                                const smoothSurge1 = Math.sin(centerDist * 0.15 - state.time * 0.5 + Math.sin(i * 0.2)) * 0.18 * surgePhase1;
                                const smoothSurge2 = Math.cos(centerDist * 0.25 - state.time * 0.8 + Math.cos(j * 0.15)) * 0.15 * surgePhase2;
                                const smoothSurge3 = Math.sin(centerDist * 0.18 - state.time * 0.6 + Math.sin((i + j) * 0.08)) * 0.16 * surgePhase3;
                                
                                // Flowing directional waves - smooth and continuous
                                const flowAngle1 = Math.atan2(j - centerY, i - centerX);
                                const flowAngle2 = Math.atan2(j - centerY + Math.sin(state.time * 0.3), i - centerX + Math.cos(state.time * 0.3));
                                
                                const directionalWave1 = Math.sin(centerDist * 0.3 - state.time * 1.0 + flowAngle1 * 1.5) * 0.18;
                                const directionalWave2 = Math.cos(centerDist * 0.4 - state.time * 1.4 + flowAngle2 * 2) * 0.15;
                                const directionalWave3 = Math.sin(centerDist * 0.25 - state.time * 0.8 + (flowAngle1 + flowAngle2) * 1) * 0.2;
                                
                                // Gentle turbulence - smooth, not chaotic
                                const gentleTurb1 = Math.sin(i * 0.5 + j * 0.2 - state.time * 0.6) * 0.08;
                                const gentleTurb2 = Math.cos(i * 0.3 - j * 0.3 + state.time * 0.8) * 0.1;
                                const gentleTurb3 = Math.sin((i * j) * 0.08 - state.time * 0.4) * 0.06;
                                
                                // Combine all smooth patterns
                                intensity += (smoothWave1 + smoothWave2 + smoothWave3 + smoothWave4 + 
                                            smoothSurge1 + smoothSurge2 + smoothSurge3 + 
                                            directionalWave1 + directionalWave2 + directionalWave3 + 
                                            gentleTurb1 + gentleTurb2 + gentleTurb3) * animationFactor;
                            }
                        }
                        
                        // Stronger effect when playing audio
                        if (isPlaying && state.blobHasLanded && animationReady) {
                            const timeSinceSplash = state.time - state.splashTime;
                            const waveExpansion = Math.min(1, timeSinceSplash * 0.3);
                            const maxWaveRadius = Math.max(cols, rows) * waveExpansion;
                            if (centerDist < maxWaveRadius) {
                                const audioWave = Math.sin(centerDist * 0.6 - state.time * 4) * 0.3;
                                intensity += audioWave * animationFactor;
                            }
                        }

                        // Swarm influence - fish-like schooling behavior (only after waves expand)
                        let swarmInfluence = 0;
                        if (animationReady && state.blobHasLanded) {
                            const timeSinceSplash = state.time - state.splashTime;
                            const swarmDelay = Math.max(0, timeSinceSplash - 1); // Swarms start 1 second after splash
                            const swarmStrength = Math.min(1, swarmDelay * 0.5);
                            
                            state.swarmCenters.forEach((center, index) => {
                                const distToSwarm = Math.sqrt(Math.pow(i - center.x, 2) + Math.pow(j - center.y, 2));
                                if (distToSwarm < 8) {
                                    const swarmEffect = Math.exp(-distToSwarm * 0.3) * 0.4;
                                    const oscillation = Math.sin(center.phase + distToSwarm * 0.5) * 0.2;
                                    swarmInfluence += (swarmEffect + oscillation) * swarmStrength;
                                }
                            });
                        }

                        // Flow field influence - current-like movement (only after waves expand)
                        let flowInfluence = 0;
                        let flow1 = 0;
                        let flow2 = 0;
                        if (animationReady && state.blobHasLanded) {
                            const timeSinceSplash = state.time - state.splashTime;
                            const flowDelay = Math.max(0, timeSinceSplash - 0.5);
                            const flowStrength = Math.min(1, flowDelay * 0.3);
                            
                            const flowAngle = state.flowField[j]?.[i] || 0;
                            flowInfluence = Math.sin(flowAngle + state.time) * 0.15 * flowStrength;

                            const phaseX = i * 0.06;
                            const phaseY = j * 0.06;
                            flow1 = Math.sin(phaseX + state.time) * Math.cos(phaseY + state.time * 0.5) * 0.1 * flowStrength;
                            flow2 = Math.sin(phaseX * 1.2 - state.time * 0.8) * 0.05 * flowStrength;
                        }

                        // Combined movement intensity
                        intensity += (swarmInfluence + flowInfluence + flow1 + flow2) * animationFactor;

                        // Localized Ripple Physics with Strong Light-to-Dark Pulse
                        let scaleMod = 1;
                        state.ripples.forEach(r => {
                            const rDist = Math.sqrt(Math.pow(i - r.x, 2) + Math.pow(j - r.y, 2));
                            const diff = rDist - r.age;
                            if (Math.abs(diff) < 6) { // Larger effect radius
                                const gauss = Math.exp(-(diff * diff) / 12);
                                
                                // Much stronger light-to-dark pulse effect
                                const pulseEffect = gauss * r.energy * 0.4; // Much stronger effect
                                const distanceFromCenter = rDist;
                                const maxDistance = r.age + 6;
                                const darknessFactor = Math.min(1, distanceFromCenter / maxDistance);
                                
                                // Strong inverse effect: very light at center, darker at edges
                                intensity += pulseEffect * (2 - darknessFactor * 2.5) * animationFactor;
                                scaleMod += pulseEffect * 1.2;
                            }
                        });

                        // Mouse interaction
                        const distToMouse = Math.sqrt(Math.pow(i - state.mouse.x, 2) + Math.pow(j - state.mouse.y, 2));
                        const mouseEffect = distToMouse < 8 ? Math.exp(-Math.pow(distToMouse, 2) / 10) : 0;
                        intensity += mouseEffect * 0.3 * animationFactor;

                        intensity = Math.max(0.1, Math.min(1, intensity)); // Keep minimum intensity
                        
                        // Unified color calculation without feathering
                        const color = getSmoothColor(intensity, i, j, cols, rows);
                        const dotRadius = params.BASE_RADIUS * scaleMod;
                        
                        drawInsetCircle(ctx, px, py, dotRadius, color, intensity);
                    }
                }
            }

            animationFrameRef.current = requestAnimationFrame(loop);
        }

        loop();

        return () => {
            if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
            canvas.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
            canvas.removeEventListener('touchstart', handleTouchStart);
            canvas.removeEventListener('touchmove', handleTouchMove);
            canvas.removeEventListener('touchend', handleTouchEnd);
            window.removeEventListener('resize', updateCanvasSize);
        };
    }, [isPlaying, animationReady]);

    return (
        <div
            className="absolute inset-0 overflow-hidden transition-colors duration-300 bg-white dark:bg-gray-900"
            style={{
                willChange: 'transform',
                contain: 'paint layout',
            }}
        >
            <canvas
                ref={canvasRef}
                className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-out ${
                    isVisible && animationReady ? 'opacity-90' : 'opacity-0'
                }`}
                style={{ willChange: 'contents' }} // Hint for canvas content changes
            />

            {/* Bottom radial fade for menu visibility */}
            <div className={`absolute inset-0 pointer-events-none transition-opacity duration-1000 ease-out ${
                isVisible && animationReady ? 'opacity-100' : 'opacity-0'
            }`}>
                <div className="absolute inset-0 bg-gradient-to-t to-transparent from-white/95 via-white/20 dark:from-gray-900/95 dark:via-gray-900/20" />
                <div
                    className="absolute inset-0 opacity-[0.3] hero-grid-radial-fade"
                />
            </div>

            {/* Noise filter overlay */}
            <div
                className={`absolute inset-0 pointer-events-none transition-opacity duration-1000 ease-out ${
                    isVisible && animationReady ? 'opacity-[0.08]' : 'opacity-0'
                }`}
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'repeat',
                    backgroundSize: '256px 256px',
                }}
            />
        </div>
    );
};

export default HeroBackgroundGrid;
