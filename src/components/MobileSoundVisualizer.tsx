import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { FaPlay, FaPause, FaVolumeUp } from 'react-icons/fa';

const MobileSoundVisualizer: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const animationRef = useRef<number | undefined>(undefined);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const [bars] = useState(40); // Reduced for mobile performance
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    const audio = audioRef.current;
    if (!audio || isLoading) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      try {
        setIsLoading(true);

        // Setup audio context on first play
        if (!audioContextRef.current) {
          const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
          const analyser = audioContext.createAnalyser();
          analyser.fftSize = 256; // Smaller for mobile
          analyser.smoothingTimeConstant = 0.75;

          const source = audioContext.createMediaElementSource(audio);
          source.connect(analyser);
          analyser.connect(audioContext.destination);

          audioContextRef.current = audioContext;
          analyserRef.current = analyser;
        }

        // Resume AudioContext if suspended
        if (audioContextRef.current && audioContextRef.current.state === 'suspended') {
          await audioContextRef.current.resume();
        }

        await audio.play();
        setIsPlaying(true);
      } catch (error) {
        console.error('Audio playback failed:', error);
        setIsPlaying(false);
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleError = () => {
      setIsPlaying(false);
      setIsLoading(false);
    };

    audio.addEventListener('error', handleError);
    return () => audio.removeEventListener('error', handleError);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const bufferLength = analyserRef.current?.frequencyBinCount || 64;
    const dataArray = new Uint8Array(bufferLength);

    const draw = () => {
      animationRef.current = requestAnimationFrame(draw);

      if (analyserRef.current && isPlaying) {
        analyserRef.current.getByteFrequencyData(dataArray);
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const centerY = canvas.height / 2;
      const barWidth = canvas.width / bars;
      const gap = 2;

      for (let i = 0; i < bars; i++) {
        const time = Date.now() / 1000;
        let barHeight;

        if (analyserRef.current && isPlaying) {
          const halfBars = bars / 2;
          const mirrorIndex = i < halfBars ? i : (bars - 1 - i);
          const dataIndex = Math.floor(mirrorIndex * (30 / halfBars));
          const rawFrequency = dataArray[dataIndex];
          const normalizedValue = rawFrequency / 255;
          const scaledValue = Math.pow(normalizedValue, 0.85);
          const frequencyHeight = scaledValue * (canvas.height * 0.42);
          const baseWave = Math.sin(i * 0.08 + time) * 0.03 + 0.03;
          const baseHeight = baseWave * 8;
          barHeight = Math.max(frequencyHeight, baseHeight);
        } else {
          const wave = Math.sin(i * 0.15 + time * 1.5) * 0.25 + 0.25;
          barHeight = wave * (canvas.height / 5) + 4;
        }

        const x = i * barWidth + gap / 2;
        const actualWidth = barWidth - gap;

        // Gradient effect based on position
        const gradient = ctx.createLinearGradient(0, centerY - barHeight, 0, centerY + barHeight);
        gradient.addColorStop(0, '#22d3ee'); // cyan-400
        gradient.addColorStop(0.5, '#ffffff');
        gradient.addColorStop(1, '#22d3ee');

        ctx.fillStyle = gradient;
        ctx.fillRect(x, centerY - barHeight, actualWidth, barHeight);
        ctx.fillRect(x, centerY, actualWidth, barHeight);
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
    <div className="relative w-full">
      {/* Hidden audio element */}
      <audio ref={audioRef} loop crossOrigin="anonymous" preload="auto">
        <source src="https://kd1hbax1fjerwnrt.public.blob.vercel-storage.com/Sequence%2005.mp3" type="audio/mpeg" />
      </audio>

      {/* Visualizer Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="relative"
      >
        {/* Glow background - smooth static radial gradient */}
        <div
          className="absolute inset-0 rounded-2xl blur-2xl opacity-30"
          style={{
            background: 'radial-gradient(circle, rgba(34, 211, 238, 0.4) 0%, rgba(167, 139, 250, 0.2) 60%, transparent 100%)',
          }}
        />

        {/* Main container */}
        <div
          onClick={handleClick}
          className="relative bg-black/60 backdrop-blur-xl border border-white/20 rounded-2xl p-4 cursor-pointer active:scale-[0.98] transition-transform"
        >
          {/* Label */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <FaVolumeUp className="text-cyan-400 text-sm" />
              <span className="text-xs text-gray-400 uppercase tracking-wider font-medium">
                Live AI Voice Demo
              </span>
            </div>
            <div className={`flex items-center gap-1.5 ${isPlaying ? 'text-green-400' : 'text-gray-500'}`}>
              <span className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-green-400 animate-pulse' : 'bg-gray-500'}`} />
              <span className="text-xs font-medium">
                {isPlaying ? 'Playing' : 'Tap to Play'}
              </span>
            </div>
          </div>

          {/* Canvas */}
          <div className="relative flex items-center justify-center">
            <canvas
              ref={canvasRef}
              width={320}
              height={80}
              className="w-full max-w-[320px]"
              style={{
                filter: isPlaying ? 'drop-shadow(0 0 10px rgba(34, 211, 238, 0.5))' : 'none',
              }}
            />

            {/* Play/Pause overlay */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <motion.div
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isPlaying
                    ? 'bg-white/10 border border-white/20'
                    : 'bg-cyan-500/90 border border-cyan-400'
                }`}
                animate={isLoading ? { scale: [1, 1.1, 1] } : {}}
                transition={{ repeat: Infinity, duration: 1 }}
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : isPlaying ? (
                  <FaPause className="text-white text-sm" />
                ) : (
                  <FaPlay className="text-white text-sm ml-0.5" />
                )}
              </motion.div>
            </div>
          </div>

          {/* Hint text */}
          <p className="text-center text-xs text-gray-500 mt-3">
            {isPlaying ? 'Hear our AI in action' : 'Experience real AI conversation'}
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default MobileSoundVisualizer;
