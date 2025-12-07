import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPhone, FaCalendarCheck, FaArrowRight } from 'react-icons/fa';
import conversionTracker from '../utils/conversionTracking';
import { useLeadCapture } from '../contexts/LeadCaptureContext';

const rotatingWords = ['deals', 'patients', 'jobs', 'clients', 'customers'];

const MobileHeroRedesigned: React.FC = () => {
  const [wordIndex, setWordIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const { openLeadCapture } = useLeadCapture();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const animationRef = useRef<number | undefined>(undefined);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const bars = 60;

  // Rotate words
  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  // Handle audio click
  const handleClick = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      try {
        if (!audioContextRef.current) {
          const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
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
      } catch (error) {
        console.error('Audio playback failed:', error);
        setIsPlaying(false);
      }
    }
  };

  // Sound visualizer animation
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
  }, [bars, isPlaying]);

  return (
    <div className="lg:hidden">
      {/* Hidden audio element */}
      <audio ref={audioRef} loop crossOrigin="anonymous" preload="auto">
        <source src="https://kd1hbax1fjerwnrt.public.blob.vercel-storage.com/Sequence%2005.mp3" type="audio/mpeg" />
      </audio>

      {/* Mobile Hero */}
      <div className="relative min-h-[100dvh] flex flex-col bg-black overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-950/20 via-black to-black" />

        {/* Content container */}
        <div className="relative z-10 flex-1 flex flex-col justify-center px-6 py-16">
          {/* Main headline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-4"
          >
            <h1 className="text-5xl font-light text-white mb-3 leading-tight">
              Your AI
              <br />
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Receptionist
              </span>
            </h1>
          </motion.div>

          {/* Subheadline with rotating word */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-center text-gray-400 text-lg mb-6"
          >
            Never miss a call. Close more{' '}
            <span className="relative inline-block w-24 h-7 align-bottom overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.span
                  key={wordIndex}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-x-0 text-cyan-400 font-medium"
                >
                  {rotatingWords[wordIndex]}.
                </motion.span>
              </AnimatePresence>
            </span>
          </motion.p>

          {/* Sound Visualizer */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="relative mb-8"
          >
            <div className="relative flex items-center justify-center">
              {/* Background glow */}
              <div
                className="absolute w-64 h-64 rounded-full blur-3xl opacity-40"
                style={{
                  background: 'linear-gradient(135deg, #E879F9 0%, #A78BFA 30%, #60A5FA 60%, #22D3EE 100%)',
                }}
              />

              {/* Canvas for sound visualization - clickable */}
              <div
                onClick={handleClick}
                className="relative z-10 cursor-pointer flex items-center justify-center"
              >
                <canvas
                  ref={canvasRef}
                  width={300}
                  height={100}
                  className="max-w-full"
                  style={{
                    filter: 'drop-shadow(0 0 20px rgba(255, 255, 255, 0.6)) drop-shadow(0 0 40px rgba(255, 255, 255, 0.3))',
                  }}
                />
                {/* Play/Pause indicator */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border-2 border-white/40 flex items-center justify-center hover:bg-white/20 hover:border-white/60 transition-all duration-300 shadow-xl shadow-white/10">
                    {!isPlaying ? (
                      <div className="w-0 h-0 border-l-[18px] border-l-white border-t-[12px] border-t-transparent border-b-[12px] border-b-transparent ml-1" />
                    ) : (
                      <div className="flex gap-1.5">
                        <div className="w-1.5 h-6 bg-white rounded-full"></div>
                        <div className="w-1.5 h-6 bg-white rounded-full"></div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-3"
          >
            {/* Primary CTA - Book a Demo */}
            <button
              onClick={() => openLeadCapture('mobile_hero_primary')}
              className="block w-full"
            >
              <div className="bg-white text-black py-4 rounded-xl flex items-center justify-center gap-2 font-semibold text-lg">
                <FaCalendarCheck />
                <span>Book a Demo</span>
                <FaArrowRight className="text-sm" />
              </div>
            </button>

            {/* Secondary CTA - Talk to AI */}
            <a
              href="tel:+16163263328"
              onClick={() => {
                conversionTracker.trackPhoneCall('+16163263328');
                conversionTracker.trackButtonClick('Talk to AI', 'mobile_hero_secondary');
              }}
              className="block w-full"
            >
              <div className="border border-white/20 text-white py-4 rounded-xl flex items-center justify-center gap-2 font-medium">
                <FaPhone className="text-sm" />
                <span>Talk to AI</span>
                <span className="text-gray-500 text-sm">+1 616-326-3328</span>
              </div>
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="grid grid-cols-3 gap-4 mt-10"
          >
            {[
              { value: '24/7', label: 'Available' },
              { value: '95%', label: 'Satisfaction' },
              { value: '1 Week', label: 'Setup' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-2xl font-bold text-cyan-400">{stat.value}</div>
                <div className="text-xs text-gray-500 uppercase tracking-wide">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="w-6 h-10 border border-white/30 rounded-full flex justify-center pt-2"
          >
            <div className="w-1 h-1 bg-white/50 rounded-full" />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default MobileHeroRedesigned;
