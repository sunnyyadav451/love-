import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';

interface Heart {
  id: number;
  left: string;
  size: number;
  duration: number;
  delay: number;
}

export const FloatingHearts: React.FC = () => {
  const [hearts, setHearts] = useState<Heart[]>([]);

  useEffect(() => {
    // Keep it light (16 hearts) for absolute 60fps butteriness
    const newHearts = Array.from({ length: 16 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 15 + 12,
      duration: Math.random() * 10 + 12,
      delay: Math.random() * 8,
    }));
    setHearts(newHearts);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          style={{
            position: 'absolute',
            left: heart.left,
            bottom: -30,
            fontSize: `${heart.size}px`,
            willChange: 'transform, opacity',
          }}
          initial={{ y: 20, opacity: 0, x: 0 }}
          animate={{ 
            y: '-115vh', 
            opacity: [0, 0.4, 0.4, 0],
            x: [0, Math.sin(heart.id) * 40, -Math.sin(heart.id) * 20]
          }}
          transition={{ 
            duration: heart.duration, 
            repeat: Infinity, 
            delay: heart.delay,
            ease: "linear"
          }}
          className="absolute text-romantic-red/30 drop-shadow-[0_0_6px_rgba(255,107,107,0.3)]"
        >
          ❤️
        </motion.div>
      ))}
    </div>
  );
};
