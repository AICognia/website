import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaArrowUp, FaPhone, FaCheckCircle, FaDollarSign, FaClock } from 'react-icons/fa';

interface MetricProps {
  label: string;
  value: number;
  suffix: string;
  change: number;
  icon: React.ReactNode;
  color: string;
}

interface PerformanceMetricsProps {
  industry: 'healthcare' | 'hospitality';
}

const MetricCard: React.FC<MetricProps> = ({ label, value, suffix, change, icon, color }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const duration = 2000; // 2 seconds
    const steps = 60;
    const increment = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setDisplayValue(value);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05 }}
      className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 border border-gray-700 hover:border-cyan-500/50 transition-all"
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg ${color}`}>
          {icon}
        </div>
        <div className="flex items-center gap-1 text-green-400">
          <FaArrowUp className="text-xs" />
          <span className="text-sm font-semibold">+{change}%</span>
        </div>
      </div>
      
      <div className="space-y-2">
        <h3 className="text-4xl font-bold text-white">
          {displayValue.toLocaleString()}{suffix}
        </h3>
        <p className="text-gray-400 text-sm">{label}</p>
      </div>

      {/* Mini Chart */}
      <div className="mt-4 flex items-end gap-1 h-12">
        {[40, 55, 35, 60, 45, 70, 65, 80, 75, 90, 85, 95].map((height, index) => (
          <motion.div
            key={index}
            initial={{ height: 0 }}
            animate={{ height: `${height}%` }}
            transition={{ delay: index * 0.05, duration: 0.5 }}
            className="flex-1 bg-gradient-to-t from-cyan-600 to-cyan-400 rounded-t opacity-60"
          />
        ))}
      </div>
    </motion.div>
  );
};

const PerformanceMetrics: React.FC<PerformanceMetricsProps> = ({ industry }) => {
  const [liveCallCount, setLiveCallCount] = useState(0);

  // Simulate live call counter
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveCallCount(prev => prev + Math.floor(Math.random() * 3) + 1);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const healthcareMetrics = [
    { label: 'Patients Booked Today', value: 47, suffix: '', change: 23, icon: <FaCheckCircle className="text-white text-xl" />, color: 'bg-green-600' },
    { label: 'Revenue Generated', value: 12400, suffix: '', change: 31, icon: <FaDollarSign className="text-white text-xl" />, color: 'bg-cyan-600' },
    { label: 'Avg Response Time', value: 2, suffix: 's', change: 95, icon: <FaClock className="text-white text-xl" />, color: 'bg-purple-600' },
    { label: 'Conversion Rate', value: 87, suffix: '%', change: 15, icon: <FaPhone className="text-white text-xl" />, color: 'bg-orange-600' }
  ];

  const hospitalityMetrics = [
    { label: 'Rooms Booked Today', value: 34, suffix: '', change: 28, icon: <FaCheckCircle className="text-white text-xl" />, color: 'bg-green-600' },
    { label: 'Booking Value', value: 18500, suffix: '', change: 42, icon: <FaDollarSign className="text-white text-xl" />, color: 'bg-cyan-600' },
    { label: 'Avg Response Time', value: 3, suffix: 's', change: 92, icon: <FaClock className="text-white text-xl" />, color: 'bg-purple-600' },
    { label: 'Occupancy Rate', value: 92, suffix: '%', change: 18, icon: <FaPhone className="text-white text-xl" />, color: 'bg-orange-600' }
  ];

  const metrics = industry === 'healthcare' ? healthcareMetrics : hospitalityMetrics;

  return (
    <div className="space-y-6">
      {/* Live Status Bar */}
      <div className="bg-gradient-to-r from-green-600 to-green-500 rounded-xl p-4 shadow-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
              <div className="absolute inset-0 w-3 h-3 bg-white rounded-full animate-ping"></div>
            </div>
            <span className="text-white font-bold text-lg">LIVE PERFORMANCE</span>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-white">
              <span className="text-sm opacity-80">Active Calls:</span>
              <span className="ml-2 text-2xl font-bold">{Math.floor(Math.random() * 5) + 3}</span>
            </div>
            <div className="text-white">
              <span className="text-sm opacity-80">Total Today:</span>
              <motion.span 
                key={liveCallCount}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className="ml-2 text-2xl font-bold"
              >
                {liveCallCount}
              </motion.span>
            </div>
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, index) => (
          <MetricCard key={index} {...metric} />
        ))}
      </div>

      {/* Conversion Funnel */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 border border-gray-700">
        <h3 className="text-white font-bold text-lg mb-4">Conversion Funnel (Last 7 Days)</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-4">
            <span className="text-gray-400 w-32">Calls Received</span>
            <div className="flex-1 bg-gray-700 rounded-full h-8 relative overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 1, delay: 0.2 }}
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-cyan-600 to-cyan-400 rounded-full flex items-center justify-end pr-3"
              >
                <span className="text-white font-semibold text-sm">1,247</span>
              </motion.div>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="text-gray-400 w-32">Qualified Leads</span>
            <div className="flex-1 bg-gray-700 rounded-full h-8 relative overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '78%' }}
                transition={{ duration: 1, delay: 0.4 }}
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full flex items-center justify-end pr-3"
              >
                <span className="text-white font-semibold text-sm">973</span>
              </motion.div>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="text-gray-400 w-32">Appointments Set</span>
            <div className="flex-1 bg-gray-700 rounded-full h-8 relative overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '65%' }}
                transition={{ duration: 1, delay: 0.6 }}
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-purple-600 to-purple-400 rounded-full flex items-center justify-end pr-3"
              >
                <span className="text-white font-semibold text-sm">810</span>
              </motion.div>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="text-gray-400 w-32">Showed Up</span>
            <div className="flex-1 bg-gray-700 rounded-full h-8 relative overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '52%' }}
                transition={{ duration: 1, delay: 0.8 }}
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-green-600 to-green-400 rounded-full flex items-center justify-end pr-3"
              >
                <span className="text-white font-semibold text-sm">648</span>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceMetrics;
