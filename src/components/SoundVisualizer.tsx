import React, { useEffect, useRef, useState } from 'react';

const SoundVisualizer: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const animationRef = useRef<number | undefined>(undefined);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const [bars] = useState(120);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleClick = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      // Setup audio context on first play
      if (!audioContextRef.current) {
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        const analyser = audioContext.createAnalyser();
        analyser.fftSize = 256;

        const source = audioContext.createMediaElementSource(audio);
        source.connect(analyser);
        analyser.connect(audioContext.destination);

        audioContextRef.current = audioContext;
        analyserRef.current = analyser;
      }

      audio.play();
      setIsPlaying(true);
    }
  };

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

      const barWidth = canvas.width / bars;
      const centerY = canvas.height / 2;

      for (let i = 0; i < bars; i++) {
        const dataIndex = Math.floor(i * (bufferLength / bars));

        // If no analyser or not playing, create idle animation
        let barHeight;
        if (analyserRef.current && isPlaying) {
          barHeight = (dataArray[dataIndex] / 255) * (canvas.height / 2);
        } else {
          // Idle wave animation
          const time = Date.now() / 1000;
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
      <audio ref={audioRef} loop>
        <source src="https://kd1hbax1fjerwnrt.public.blob.vercel-storage.com/Sequence%2005.mp3" type="audio/mpeg" />
      </audio>

      {/* Background glow */}
      <div className="absolute w-[500px] h-[500px] rounded-full blur-3xl opacity-60 animate-pulse"
        style={{
          background: 'linear-gradient(135deg, #E879F9 0%, #A78BFA 30%, #60A5FA 60%, #22D3EE 100%)',
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
