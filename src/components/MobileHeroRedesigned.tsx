import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPhone, FaCalendarCheck, FaPlay, FaPause } from 'react-icons/fa';
import conversionTracker from '../utils/conversionTracking';

const rotatingWords = ['deals', 'patients', 'jobs', 'clients', 'customers'];

const MobileHeroRedesigned: React.FC = () => {
  const [wordIndex, setWordIndex] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const animationRef = useRef<number | undefined>(undefined);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  const handleVisualizerClick = async () => {
    const audio = audioRef.current;
    if (!audio || isLoading) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      try {
        setIsLoading(true);

        if (!audioContextRef.current) {
          const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
          const analyser = audioContext.createAnalyser();
          analyser.fftSize = 256;
          analyser.smoothingTimeConstant = 0.75;

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

  // Canvas animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const bars = 60;
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
          const frequencyHeight = scaledValue * (canvas.height * 0.45);
          const baseWave = Math.sin(i * 0.08 + time) * 0.03 + 0.03;
          const baseHeight = baseWave * 8;
          barHeight = Math.max(frequencyHeight, baseHeight);
        } else {
          const wave = Math.sin(i * 0.12 + time * 2) * 0.35 + 0.35;
          barHeight = wave * (canvas.height / 3.5) + 6;
        }

        const x = i * barWidth;

        // Pure white bars like desktop
        ctx.fillStyle = '#FFFFFF';
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
  }, [isPlaying]);

  return (
    <div className="lg:hidden">
      {/* Hidden audio element */}
      <audio ref={audioRef} loop crossOrigin="anonymous" preload="auto">
        <source src="https://kd1hbax1fjerwnrt.public.blob.vercel-storage.com/Sequence%2005.mp3" type="audio/mpeg" />
      </audio>

      {/* Mobile Hero */}
      <div className="relative min-h-[100dvh] flex flex-col justify-center overflow-hidden bg-black">
        {/* Dramatic gradient background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-purple-950/40 via-black to-black" />
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-3xl opacity-50"
            style={{
              background: 'linear-gradient(135deg, #E879F9 0%, #A78BFA 30%, #60A5FA 60%, #22D3EE 100%)',
            }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 px-6 py-12">
          {/* Headline - Large and Elegant */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <h1 className="text-[3.2rem] leading-[1] font-extralight text-white mb-4 tracking-tight">
              Your 24/7 AI
              <br />
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent font-light">
                Receptionist
              </span>
            </h1>
            <p className="text-lg text-gray-400 font-light">
              Never miss a call. Close more{' '}
              <span className="relative inline-block w-[100px] h-[24px] align-bottom overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={wordIndex}
                    initial={{ y: 16, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -16, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute left-0 text-cyan-400 font-medium"
                  >
                    {rotatingWords[wordIndex]}.
                  </motion.span>
                </AnimatePresence>
              </span>
            </p>
          </motion.div>

          {/* Sound Visualizer - The Hero Element */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative mb-10"
          >
            {/* Glow behind visualizer */}
            <div
              className="absolute inset-0 blur-2xl opacity-60"
              style={{
                background: 'linear-gradient(135deg, #E879F9 0%, #A78BFA 30%, #60A5FA 60%, #22D3EE 100%)',
              }}
            />

            {/* Clickable visualizer area */}
            <div
              onClick={handleVisualizerClick}
              className="relative cursor-pointer active:scale-[0.98] transition-transform"
            >
              <canvas
                ref={canvasRef}
                width={400}
                height={140}
                className="w-full"
                style={{
                  filter: isPlaying
                    ? 'drop-shadow(0 0 30px rgba(255, 255, 255, 0.6)) drop-shadow(0 0 60px rgba(255, 255, 255, 0.4))'
                    : 'drop-shadow(0 0 20px rgba(255, 255, 255, 0.4)) drop-shadow(0 0 40px rgba(255, 255, 255, 0.2))',
                }}
              />

              {/* Play/Pause button overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isPlaying
                      ? 'bg-white/10 backdrop-blur-md border border-white/30'
                      : 'bg-white/15 backdrop-blur-md border-2 border-white/50'
                  }`}
                  whileTap={{ scale: 0.95 }}
                  animate={isLoading ? { scale: [1, 1.05, 1] } : {}}
                  transition={isLoading ? { repeat: Infinity, duration: 1 } : {}}
                >
                  {isLoading ? (
                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : isPlaying ? (
                    <FaPause className="text-white text-lg" />
                  ) : (
                    <FaPlay className="text-white text-lg ml-1" />
                  )}
                </motion.div>
              </div>
            </div>

            {/* Status indicator */}
            <div className="flex items-center justify-center gap-2 mt-4">
              <span className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-green-400 animate-pulse' : 'bg-white/50'}`} />
              <span className="text-sm text-gray-400">
                {isPlaying ? 'Listening to AI' : 'Tap to hear our AI'}
              </span>
            </div>
          </motion.div>

          {/* Primary CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-3"
          >
            <a
              href="tel:+16163263328"
              onClick={() => {
                conversionTracker.trackPhoneCall('+16163263328');
                conversionTracker.trackButtonClick('Talk to AI Now', 'mobile_hero_primary');
              }}
              className="block w-full"
            >
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl blur-xl opacity-50" />
                <div className="relative bg-gradient-to-r from-green-500 to-emerald-600 text-white py-5 rounded-2xl flex items-center justify-center gap-3 shadow-2xl">
                  <FaPhone className="text-lg" />
                  <span className="text-xl font-semibold">Talk to AI Now</span>
                </div>
              </div>
            </a>

            <a
              href="https://calendly.com/emrebenian-cogniaai/30min"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                conversionTracker.trackDemoBooking('mobile_hero_secondary');
                conversionTracker.trackButtonClick('Book Demo', 'mobile_hero_secondary');
              }}
              className="block w-full"
            >
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 text-white py-4 rounded-2xl flex items-center justify-center gap-2 font-medium">
                <FaCalendarCheck />
                <span>Schedule Free Demo</span>
              </div>
            </a>
          </motion.div>

          {/* Stats - Minimal and Elegant */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex justify-center gap-8 mt-10"
          >
            {[
              { value: '24/7', label: 'Available' },
              { value: '95%', label: 'Satisfaction' },
              { value: '1 Week', label: 'Setup' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-xl font-semibold text-white">{stat.value}</div>
                <div className="text-xs text-gray-500 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 2, duration: 0.5 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2"
          >
            <div className="w-1.5 h-1.5 bg-white/60 rounded-full" />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default MobileHeroRedesigned;
