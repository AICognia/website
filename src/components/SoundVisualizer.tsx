import React, { useEffect, useRef, useState } from 'react';
import { trackAudioDemo } from '../utils/metaPixel';

const SoundVisualizer: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const animationRef = useRef<number | undefined>(undefined);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const [bars] = useState(120);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleClick = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      try {
        // Setup audio context on first play
        if (!audioContextRef.current) {
          const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
          const analyser = audioContext.createAnalyser();
          analyser.fftSize = 512; // Increased for better frequency resolution
          analyser.smoothingTimeConstant = 0.7; // Smooth out the visualization

          const source = audioContext.createMediaElementSource(audio);
          source.connect(analyser);
          analyser.connect(audioContext.destination);

          audioContextRef.current = audioContext;
          analyserRef.current = analyser;
        }

        // Resume AudioContext if suspended (CRITICAL FIX)
        if (audioContextRef.current && audioContextRef.current.state === 'suspended') {
          await audioContextRef.current.resume();
        }

        await audio.play();
        setIsPlaying(true);
        // Track audio demo play
        trackAudioDemo('desktop_hero');
      } catch (error) {
        console.error('Audio playback failed:', error);
        setIsPlaying(false);
      }
    }
  };

  // Handle audio loading and errors
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleError = (e: ErrorEvent | Event) => {
      console.error('Audio error:', e);
      setIsPlaying(false);
    };

    const handleLoadedData = () => {
      console.log('Audio loaded successfully');
    };

    audio.addEventListener('error', handleError);
    audio.addEventListener('loadeddata', handleLoadedData);

    return () => {
      audio.removeEventListener('error', handleError);
      audio.removeEventListener('loadeddata', handleLoadedData);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const bufferLength = analyserRef.current?.frequencyBinCount || 128;
    const dataArray = new Uint8Array(bufferLength);

    const draw = () => {
      animationRef.current = requestAnimationFrame(draw);

      // Get frequency data if analyser is available
      if (analyserRef.current && isPlaying) {
        analyserRef.current.getByteFrequencyData(dataArray);
      }

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const centerY = canvas.height / 2;
      const barWidth = canvas.width / bars;

      for (let i = 0; i < bars; i++) {
        const time = Date.now() / 1000;

        let barHeight;

        if (analyserRef.current && isPlaying) {
          // MIRRORED DISTRIBUTION (Professional approach)
          // Mirror frequency data from center outward
          // Both left and right sides show same energetic frequencies

          const halfBars = bars / 2;
          // Create mirror: 0->59->0, both sides use same data
          const mirrorIndex = i < halfBars ? i : (bars - 1 - i);

          // Map to energetic frequency range (first 50 bins)
          const dataIndex = Math.floor(mirrorIndex * (50 / halfBars));

          // Get frequency data
          const rawFrequency = dataArray[dataIndex];

          // Normalize to 0-1
          const normalizedValue = rawFrequency / 255;

          // Gentle curve for natural dynamics
          const scaledValue = Math.pow(normalizedValue, 0.9);

          // Moderate scaling without over-boosting
          const frequencyHeight = scaledValue * (canvas.height * 0.45);

          // Minimal base for subtle movement
          const baseWave = Math.sin(i * 0.05 + time) * 0.05 + 0.05;
          const baseHeight = baseWave * 15;

          // Combine with minimal base
          barHeight = Math.max(frequencyHeight, baseHeight);
        } else {
          // Idle wave animation
          const wave = Math.sin(i * 0.1 + time * 2) * 0.3 + 0.3;
          barHeight = wave * (canvas.height / 4) + 10;
        }

        const x = i * barWidth;

        // Mirror effect - draw from center
        // Top half
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(x, centerY - barHeight, barWidth - 1, barHeight);

        // Bottom half (mirror)
        ctx.fillRect(x, centerY, barWidth - 1, barHeight);
      }
    };

    draw();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [bars, isPlaying]);

  return (
    <div className="relative w-full h-[600px] flex items-center justify-center">
      {/* Hidden audio element */}
      <audio ref={audioRef} loop crossOrigin="anonymous" preload="auto">
        <source src="https://kd1hbax1fjerwnrt.public.blob.vercel-storage.com/Sequence%2005.mp3" type="audio/mpeg" />
      </audio>

      {/* Background glow - smooth static gradient instead of animate-pulse */}
      <div
        className="absolute w-[500px] h-[500px] rounded-full blur-3xl opacity-40"
        style={{
          background: 'radial-gradient(circle, rgba(96, 165, 250, 0.4) 0%, rgba(167, 139, 250, 0.3) 40%, rgba(34, 211, 238, 0.2) 70%, transparent 100%)',
        }}
      />

      {/* Canvas for sound visualization - clickable */}
      <div
        onClick={handleClick}
        className="relative z-10 cursor-pointer group flex items-center justify-center"
      >
        <canvas
          ref={canvasRef}
          width={800}
          height={200}
          className="max-w-full"
          style={{
            filter: 'drop-shadow(0 0 40px rgba(255, 255, 255, 0.8)) drop-shadow(0 0 80px rgba(255, 255, 255, 0.5))',
          }}
        />
        {/* Play/Pause indicator - Always visible */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-24 h-24 rounded-full bg-white/10 backdrop-blur-md border-2 border-white/40 flex items-center justify-center hover:bg-white/20 hover:border-white/60 hover:scale-105 transition-all duration-300 shadow-2xl shadow-white/20">
            {!isPlaying ? (
              <div className="w-0 h-0 border-l-[28px] border-l-white border-t-[18px] border-t-transparent border-b-[18px] border-b-transparent ml-2" />
            ) : (
              <div className="flex gap-2">
                <div className="w-2 h-10 bg-white rounded-full"></div>
                <div className="w-2 h-10 bg-white rounded-full"></div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SoundVisualizer;
