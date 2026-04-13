import React from 'react';
import { motion } from 'motion/react';

export const Petals: React.FC = () => {
  const petals = Array.from({ length: 15 });

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {petals.map((_, i) => (
        <motion.div
          key={i}
          initial={{ 
            top: -20, 
            left: `${Math.random() * 100}%`,
            rotate: Math.random() * 360,
            opacity: 0
          }}
          animate={{ 
            top: '110%',
            left: `${(Math.random() * 20 - 10) + (i * 7)}%`,
            rotate: 360 * 2,
            opacity: [0, 0.6, 0.6, 0]
          }}
          transition={{ 
            duration: Math.random() * 10 + 15, 
            repeat: Infinity,
            delay: Math.random() * 10,
            ease: "linear"
          }}
          className="absolute"
        >
          <div 
            className="w-4 h-6 bg-romantic-red/40 rounded-full"
            style={{ 
              borderRadius: '50% 0 50% 50%',
              transform: `scale(${Math.random() * 0.5 + 0.5})`
            }}
          />
        </motion.div>
      ))}
    </div>
  );
};
