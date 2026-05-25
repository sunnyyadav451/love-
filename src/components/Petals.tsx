import React from 'react';
import { motion } from 'motion/react';

export const Petals: React.FC = () => {
  // Reduce to 10 petals for better performance while keeping it romantic
  const petals = Array.from({ length: 12 }).map((_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    duration: Math.random() * 10 + 12,
    delay: Math.random() * 8,
    scale: Math.random() * 0.4 + 0.4,
    startRotate: Math.random() * 360,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          style={{
            position: 'absolute',
            left: petal.left,
            top: -30,
            willChange: 'transform, opacity',
          }}
          initial={{ 
            y: -20, 
            rotate: petal.startRotate,
            opacity: 0,
            x: 0
          }}
          animate={{ 
            y: '115vh',
            x: [0, Math.sin(petal.id) * 40, -Math.sin(petal.id) * 20],
            rotate: petal.startRotate + 360 * 2.5,
            opacity: [0, 0.6, 0.6, 0]
          }}
          transition={{ 
            duration: petal.duration, 
            repeat: Infinity,
            delay: petal.delay,
            ease: "linear"
          }}
        >
          <div 
            className="w-4 h-6 bg-romantic-red/40 rounded-full"
            style={{ 
              borderRadius: '50% 0 50% 50%',
              transform: `scale(${petal.scale})`
            }}
          />
        </motion.div>
      ))}
    </div>
  );
};
