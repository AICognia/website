'use client'
import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useThemeWithoutFlash } from '@/src/hooks/useThemeWithoutFlash';

interface VoiceDemoProps {
  audioSrc?: string;
  title?: string;
  subtitle?: string;
  barCount?: number;
  className?: string;
  variant?: 'default' | 'compact' | 'large';
}

const VoiceDemo: React.FC<VoiceDemoProps> = ({
  audioSrc = "https://kd1hbax1fjerwnrt.public.blob.vercel-storage.com/Sequence%2005.mp3",
  title,
  subtitle,
  barCount = 32,
  className = '',
  variant = 'default',
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const { isDark } = useThemeWithoutFlash();

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleDurationChange = () => setDuration(audio.duration);
    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('durationchange', handleDurationChange);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('durationchange', handleDurationChange);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  const formatTime = (time: number) => {
    if (!isFinite(time)) return '0:00';
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleAudio = async () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
      } catch {
        // Playback blocked by browser
      }
    }
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  const containerClasses = {
    default: 'rounded-xl sm:rounded-2xl border p-3 sm:p-4',
    compact: 'rounded-lg sm:rounded-xl border p-2.5 sm:p-3',
    large: 'rounded-2xl sm:rounded-3xl border p-4 sm:p-6',
  };

  const buttonClasses = {
    default: 'w-9 h-9 sm:w-11 sm:h-11',
    compact: 'w-8 h-8 sm:w-9 sm:h-9',
    large: 'w-11 h-11 sm:w-14 sm:h-14',
  };

  return (
    <motion.div
      className={`${containerClasses[variant]} border-slate-200/80 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 ${className}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <audio ref={audioRef} loop src={audioSrc} />

      {(title || subtitle) && (
        <div className="mb-3 sm:mb-4">
          {title && (
            <h4 className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-gray-200">
              {title}
            </h4>
          )}
          {subtitle && (
            <p className="text-[10px] sm:text-xs mt-0.5 sm:mt-1 text-slate-500 dark:text-gray-400">
              {subtitle}
            </p>
          )}
        </div>
      )}

      <div className="flex items-center gap-2 sm:gap-4">
        {/* Play button */}
        <button
          onClick={toggleAudio}
          className={`btn-primary ${buttonClasses[variant]} flex-shrink-0 rounded-lg sm:rounded-xl flex items-center justify-center p-0`}
        >
          {isPlaying ? (
            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 24 24">
              <rect x="6" y="5" width="4" height="14" rx="1" />
              <rect x="14" y="5" width="4" height="14" rx="1" />
            </svg>
          ) : (
            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5.14v13.72c0 .66.75 1.04 1.28.65l9.57-6.86c.46-.33.46-1 0-1.32L9.28 4.5C8.75 4.1 8 4.48 8 5.14z" />
            </svg>
          )}
        </button>

        {/* Waveform visualization */}
        <div className="flex-1 flex items-center justify-center gap-[2px] sm:gap-[3px] h-8 sm:h-10 px-0.5 sm:px-1">
          {Array.from({ length: barCount }).map((_, i) => {
            const position = i / (barCount - 1);
            const wave1 = Math.sin(position * Math.PI * 3) * 0.4;
            const wave2 = Math.sin(position * Math.PI * 5 + 0.5) * 0.25;
            const wave3 = Math.cos(position * Math.PI * 2) * 0.2;
            const baseHeight = 12 + (wave1 + wave2 + wave3) * 20;
            const minHeight = 6;
            const height = Math.max(minHeight, baseHeight);

            // Calculate if this bar should be "played"
            const barProgress = (i / barCount) * 100;
            const isPlayed = barProgress <= progress;

            return (
              <motion.div
                key={i}
                className="w-[2px] sm:w-[3px] rounded-full"
                style={{ minWidth: '2px' }}
                initial={false}
                animate={{
                  height: isPlaying
                    ? [height * 0.7, height * 1.3, height * 0.85, height * 1.15, height * 0.7]
                    : height * 0.5,
                  backgroundColor: isPlaying
                    ? isDark ? '#60a5fa' : '#3b82f6'
                    : isPlayed
                      ? isDark ? '#60a5fa' : '#3b82f6'
                      : isDark ? '#4b5563' : '#cbd5e1',
                }}
                transition={isPlaying ? {
                  height: {
                    duration: 0.6 + (i % 4) * 0.15,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.03,
                  },
                  backgroundColor: { duration: 0.3, ease: "easeOut" },
                } : {
                  height: { duration: 0.4, ease: "easeOut" },
                  backgroundColor: { duration: 0.3, ease: "easeOut" },
                }}
              />
            );
          })}
        </div>

        <span className="text-[10px] sm:text-xs font-mono tabular-nums flex-shrink-0 min-w-[32px] sm:min-w-[40px] text-right text-slate-400 dark:text-gray-500">
          {formatTime(currentTime)}
        </span>
      </div>
    </motion.div>
  );
};

export default VoiceDemo;
