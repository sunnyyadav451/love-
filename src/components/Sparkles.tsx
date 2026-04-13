import React from 'react';
import { motion } from 'motion/react';

export const Sparkle: React.FC<{ size?: number; color?: string; delay?: number }> = ({ 
  size = 10, 
  color = "#FF6B6B", 
  delay = 0 
}) => {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0, rotate: 0 }}
      animate={{ 
        scale: [0, 1, 0], 
        opacity: [0, 1, 0],
        rotate: [0, 90, 180]
      }}
      transition={{ 
        duration: 2, 
        repeat: Infinity, 
        delay,
        ease: "easeInOut"
      }}
      className="absolute pointer-events-none"
      style={{ width: size, height: size }}
    >
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" fill={color} />
      </svg>
    </motion.div>
  );
};

export const SparkleGroup: React.FC<{ count?: number; areaWidth?: number; areaHeight?: number }> = ({ 
  count = 5, 
  areaWidth = 100, 
  areaHeight = 100 
}) => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {Array.from({ length: count }).map((_, i) => (
        <div 
          key={i} 
          className="absolute" 
          style={{ 
            left: `${Math.random() * areaWidth}%`, 
            top: `${Math.random() * areaHeight}%` 
          }}
        >
          <Sparkle 
            size={Math.random() * 15 + 5} 
            delay={Math.random() * 5} 
            color={i % 2 === 0 ? "#FF6B6B" : "#FFC0CB"}
          />
        </div>
      ))}
    </div>
  );
};
