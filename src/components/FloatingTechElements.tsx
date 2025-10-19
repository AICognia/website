import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaMicrochip, FaDatabase, 
  FaNetworkWired, FaServer, FaShieldAlt 
} from 'react-icons/fa';

const FloatingTechElements: React.FC = () => {
  const techIcons = [
    { Icon: FaMicrochip, delay: 0, x: '15%', y: '25%', duration: 40 },
    { Icon: FaNetworkWired, delay: 3, x: '80%', y: '70%', duration: 45 },
    { Icon: FaServer, delay: 1.5, x: '45%', y: '15%', duration: 50 },
    { Icon: FaDatabase, delay: 4, x: '70%', y: '40%', duration: 42 },
    { Icon: FaShieldAlt, delay: 2, x: '25%', y: '60%', duration: 48 }
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {techIcons.map((item, index) => (
        <motion.div
          key={index}
          className="absolute opacity-[0.03]" // Much more subtle
          initial={{ 
            x: item.x, 
            y: item.y,
            rotate: 0 
          }}
          animate={{
            y: [item.y, `${parseInt(item.y) - 5}%`, item.y], // Smaller movement
            rotate: [0, 180, 360], // Slower rotation
            scale: [1, 1.05, 1] // Smaller scale change
          }}
          transition={{
            duration: item.duration,
            delay: item.delay,
            repeat: Infinity,
            ease: "easeInOut" // Smoother easing
          }}
          style={{
            left: item.x,
            top: item.y
          }}
        >
          <item.Icon className="text-gray-400 text-3xl md:text-4xl" /> 
        </motion.div>
      ))}

    </div>
  );
};

export default FloatingTechElements;
