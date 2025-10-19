import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaRobot, FaBrain, FaMicrochip, FaCode, FaDatabase, 
  FaNetworkWired, FaServer, FaCogs, FaChartLine, FaShieldAlt 
} from 'react-icons/fa';

const FloatingTechElements: React.FC = () => {
  const techIcons = [
    { Icon: FaRobot, delay: 0, x: '10%', y: '20%', duration: 20 },
    { Icon: FaBrain, delay: 2, x: '85%', y: '15%', duration: 25 },
    { Icon: FaMicrochip, delay: 1, x: '75%', y: '70%', duration: 22 },
    { Icon: FaCode, delay: 3, x: '15%', y: '65%', duration: 18 },
    { Icon: FaDatabase, delay: 1.5, x: '90%', y: '45%', duration: 24 },
    { Icon: FaNetworkWired, delay: 2.5, x: '5%', y: '40%', duration: 21 },
    { Icon: FaServer, delay: 0.5, x: '45%', y: '10%', duration: 23 },
    { Icon: FaCogs, delay: 4, x: '60%', y: '80%', duration: 19 },
    { Icon: FaChartLine, delay: 2, x: '25%', y: '85%', duration: 26 },
    { Icon: FaShieldAlt, delay: 3.5, x: '50%', y: '50%', duration: 20 }
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {techIcons.map((item, index) => (
        <motion.div
          key={index}
          className="absolute opacity-10"
          initial={{ 
            x: item.x, 
            y: item.y,
            rotate: 0 
          }}
          animate={{
            y: [item.y, `${parseInt(item.y) - 10}%`, item.y],
            rotate: [0, 360],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: item.duration,
            delay: item.delay,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            left: item.x,
            top: item.y
          }}
        >
          <item.Icon className="text-cyan-400 text-4xl md:text-5xl" />
        </motion.div>
      ))}

      {/* Animated Circuit Lines */}
      <svg className="absolute inset-0 w-full h-full opacity-5">
        <motion.path
          d="M 0,100 L 200,100 L 200,300 L 400,300"
          stroke="url(#gradient1)"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
        <motion.path
          d="M 100,0 L 100,200 L 300,200 L 300,400"
          stroke="url(#gradient2)"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 4, delay: 1, repeat: Infinity, ease: "linear" }}
        />
        <defs>
          <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0" />
            <stop offset="50%" stopColor="#06b6d4" stopOpacity="1" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#14b8a6" stopOpacity="0" />
            <stop offset="50%" stopColor="#14b8a6" stopOpacity="1" />
            <stop offset="100%" stopColor="#14b8a6" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

export default FloatingTechElements;
