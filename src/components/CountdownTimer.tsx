import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CountdownTimerProps {
  endTime?: Date;
  onComplete?: () => void;
  label?: string;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({
  endTime,
  onComplete,
  label = "Offer expires in:"
}) => {
  // Default to end of today if no endTime provided
  const getDefaultEndTime = () => {
    const end = new Date();
    end.setHours(23, 59, 59, 999);
    return end;
  };

  const [timeLeft, setTimeLeft] = useState<{
    hours: number;
    minutes: number;
    seconds: number;
  }>({ hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const targetTime = endTime || getDefaultEndTime();

    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = targetTime.getTime() - now;

      if (difference > 0) {
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        setTimeLeft({ hours, minutes, seconds });
      } else {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
        if (onComplete) onComplete();
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [endTime, onComplete]);

  const TimeUnit = ({ value, unit }: { value: number; unit: string }) => (
    <div className="flex flex-col items-center">
      <motion.div
        key={value}
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 10, opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="bg-gradient-to-br from-slate-800 to-slate-900 border border-cyan-500/30 rounded-lg px-3 py-2 min-w-[50px]"
      >
        <span className="text-2xl font-bold text-cyan-400">
          {value.toString().padStart(2, '0')}
        </span>
      </motion.div>
      <span className="text-xs text-gray-400 mt-1 uppercase tracking-wider">{unit}</span>
    </div>
  );

  return (
    <div className="inline-flex items-center gap-4">
      <span className="text-sm font-medium text-gray-300">{label}</span>
      <div className="flex items-center gap-2">
        <AnimatePresence mode="wait">
          <TimeUnit value={timeLeft.hours} unit="hrs" />
        </AnimatePresence>
        <span className="text-cyan-400 text-xl animate-pulse">:</span>
        <AnimatePresence mode="wait">
          <TimeUnit value={timeLeft.minutes} unit="min" />
        </AnimatePresence>
        <span className="text-cyan-400 text-xl animate-pulse">:</span>
        <AnimatePresence mode="wait">
          <TimeUnit value={timeLeft.seconds} unit="sec" />
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CountdownTimer;