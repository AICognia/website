import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPhone, FaArrowRight, FaCheckCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import conversionTracker from '../utils/conversionTracking';
import { trackTalkToAI, trackAudioDemo } from '../utils/metaPixel';

const rotatingWords = ['deals', 'patients', 'jobs', 'clients', 'customers'];

const MobileHeroRedesigned: React.FC = () => {
  const [wordIndex, setWordIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const animationRef = useRef<number | undefined>(undefined);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const audioPlayTrackedRef = useRef(false);
  const bars = 60;

  // Track audio demo play (only once per session)
  const handleAudioDemoPlay = () => {
    if (!audioPlayTrackedRef.current) {
      trackAudioDemo('mobile_hero');
      audioPlayTrackedRef.current = true;
    }
  };

  // Track "Talk to AI" click
  const handleTalkToAIClick = () => {
    trackTalkToAI('mobile_hero');
    conversionTracker.trackPhoneCall('+16163263328');
    conversionTracker.trackButtonClick('Talk to AI', 'mobile_hero_secondary');
  };

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
        // Track audio demo started
        handleAudioDemoPlay();
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
          <div className="text-center mb-4">
            <h1 className="text-5xl font-light text-white mb-3 leading-tight">
              Your AI
              <br />
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Receptionist
              </span>
            </h1>
          </div>

          {/* Subheadline with rotating word */}
          <p className="text-center text-gray-400 text-lg mb-6">
            Never miss a call. Close more{' '}
            <span className="relative inline-block h-7 align-bottom overflow-hidden" style={{ minWidth: '5.5rem' }}>
              <AnimatePresence mode="wait">
                <motion.span
                  key={wordIndex}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute left-0 text-cyan-400 font-medium whitespace-nowrap"
                >
                  {rotatingWords[wordIndex]}.
                </motion.span>
              </AnimatePresence>
            </span>
          </p>

          {/* CTA Buttons */}
          <div className="space-y-3 mb-8">
            {/* Primary CTA */}
            <Link
              to="/demo"
              className="block w-full"
            >
              <div className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white py-4 rounded-xl flex items-center justify-center gap-2 font-semibold text-lg shadow-lg shadow-cyan-500/25">
                <span>Get Your AI Receptionist</span>
                <FaArrowRight className="text-sm" />
              </div>
            </Link>

            {/* Secondary CTA - Talk to AI */}
            <a
              href="tel:+16163263328"
              onClick={handleTalkToAIClick}
              className="block w-full"
            >
              <div className="border border-white/20 text-white py-4 rounded-xl flex items-center justify-center gap-2 font-medium text-lg">
                <FaPhone className="text-sm" />
                <span>Talk to AI Now</span>
              </div>
            </a>

            {/* Trust badges */}
            <div className="flex items-center justify-center gap-3 pt-1 text-[11px] text-gray-500">
              <span className="flex items-center gap-1">
                <FaCheckCircle className="text-green-400 text-[10px]" />
                1 Week Free
              </span>
              <span className="flex items-center gap-1">
                <FaCheckCircle className="text-green-400 text-[10px]" />
                No Card Required
              </span>
            </div>
          </div>

          {/* Sound Visualizer - Below CTAs */}
          <div className="relative mb-6">
            <p className="text-center text-xs text-gray-500 mb-3">Hear our AI in action</p>
            <div className="relative flex items-center justify-center">
              {/* Background glow */}
              <div
                className="absolute w-48 h-48 rounded-full blur-3xl opacity-20"
                style={{
                  background: 'radial-gradient(circle, rgba(96, 165, 250, 0.5) 0%, transparent 70%)',
                }}
              />

              {/* Canvas for sound visualization - clickable */}
              <div
                onClick={handleClick}
                className="relative z-10 cursor-pointer flex items-center justify-center"
              >
                <canvas
                  ref={canvasRef}
                  width={280}
                  height={80}
                  className="max-w-full"
                  style={{
                    filter: 'drop-shadow(0 0 15px rgba(255, 255, 255, 0.4))',
                  }}
                />
                {/* Play/Pause indicator */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border-2 border-white/40 flex items-center justify-center hover:bg-white/20 transition-all duration-300">
                    {!isPlaying ? (
                      <div className="w-0 h-0 border-l-[14px] border-l-white border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent ml-1" />
                    ) : (
                      <div className="flex gap-1">
                        <div className="w-1.5 h-5 bg-white rounded-full"></div>
                        <div className="w-1.5 h-5 bg-white rounded-full"></div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { value: '24/7', label: 'Available' },
              { value: '95%', label: 'Satisfaction' },
              { value: '1 Week', label: 'Setup' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-xl font-bold text-cyan-400">{stat.value}</div>
                <div className="text-[10px] text-gray-500 uppercase tracking-wide">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-50">
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="w-6 h-10 border border-white/30 rounded-full flex justify-center pt-2"
          >
            <div className="w-1 h-1 bg-white/50 rounded-full" />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default MobileHeroRedesigned;
