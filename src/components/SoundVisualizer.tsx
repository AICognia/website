'use client'
import React, { useEffect, useRef, useState } from 'react';

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
        if (!audioContextRef.current) {
          const AudioContextClass = window.AudioContext || (window as typeof window & { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
          const audioContext = new AudioContextClass();
          const analyser = audioContext.createAnalyser();
          analyser.fftSize = 512;
          analyser.smoothingTimeConstant = 0.7;

          const source = audioContext.createMediaElementSource(audio);
          source.connect(analyser);
          analyser.connect(audioContext.destination);

          audioContextRef.current = audioContext;
          analyserRef.current = analyser;
        }

        if (audioContextRef.current && audioContextRef.current.state === 'suspended') {
          await audioContextRef.current.resume();
        }

        await audio.play();
        setIsPlaying(true);
      } catch {
        setIsPlaying(false);
      }
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleError = () => {
      setIsPlaying(false);
    };

    const handleLoadedData = () => {
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

      if (analyserRef.current && isPlaying) {
        analyserRef.current.getByteFrequencyData(dataArray);
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const centerY = canvas.height / 2;
      const barWidth = canvas.width / bars;

      for (let i = 0; i < bars; i++) {
        const time = Date.now() / 1000;

        let barHeight;

        if (analyserRef.current && isPlaying) {
          const halfBars = bars / 2;
          const mirrorIndex = i < halfBars ? i : (bars - 1 - i);
          const dataIndex = Math.floor(mirrorIndex * (50 / halfBars));
          const rawFrequency = dataArray[dataIndex];
          const normalizedValue = rawFrequency / 255;
          const scaledValue = Math.pow(normalizedValue, 0.9);
          const frequencyHeight = scaledValue * (canvas.height * 0.45);
          const baseWave = Math.sin(i * 0.05 + time) * 0.05 + 0.05;
          const baseHeight = baseWave * 15;
          barHeight = Math.max(frequencyHeight, baseHeight);
        } else {
          const wave = Math.sin(i * 0.1 + time * 2) * 0.3 + 0.3;
          barHeight = wave * (canvas.height / 4) + 10;
        }

        const x = i * barWidth;

        ctx.fillStyle = 'rgba(55, 50, 47, 0.8)';
        ctx.fillRect(x, centerY - barHeight, barWidth - 1, barHeight);
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
    <div className="relative w-full h-[400px] flex items-center justify-center">
      <audio ref={audioRef} loop crossOrigin="anonymous" preload="auto">
        <source src="https://kd1hbax1fjerwnrt.public.blob.vercel-storage.com/Sequence%2005.mp3" type="audio/mpeg" />
      </audio>

      <div
        onClick={handleClick}
        className="relative z-10 cursor-pointer group flex items-center justify-center w-full"
      >
        <canvas
          ref={canvasRef}
          width={800}
          height={200}
          className="max-w-full"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-20 h-20 rounded-full bg-[rgba(55,50,47,0.08)] backdrop-blur-md border-2 border-[rgba(55,50,47,0.12)] flex items-center justify-center hover:bg-[rgba(55,50,47,0.12)] hover:border-[rgba(55,50,47,0.20)] hover:scale-105 transition-all duration-300">
            {!isPlaying ? (
              <div className="w-0 h-0 border-l-[24px] border-l-[rgba(55,50,47,0.80)] border-t-[16px] border-t-transparent border-b-[16px] border-b-transparent ml-1.5" />
            ) : (
              <div className="flex gap-2">
                <div className="w-2 h-8 bg-[rgba(55,50,47,0.80)] rounded-full"></div>
                <div className="w-2 h-8 bg-[rgba(55,50,47,0.80)] rounded-full"></div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SoundVisualizer;
