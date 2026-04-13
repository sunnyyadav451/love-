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
    const newHearts = Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 20 + 15,
      duration: Math.random() * 15 + 15,
      delay: Math.random() * 10,
    }));
    setHearts(newHearts);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          initial={{ bottom: '-50px', opacity: 0, x: 0 }}
          animate={{ 
            bottom: '110%', 
            opacity: [0, 0.4, 0.4, 0],
            x: [0, Math.sin(heart.id) * 50, 0]
          }}
          transition={{ 
            duration: heart.duration, 
            repeat: Infinity, 
            delay: heart.delay,
            ease: "linear"
          }}
          className="absolute text-romantic-red/30 drop-shadow-[0_0_8px_rgba(255,107,107,0.3)]"
          style={{
            left: heart.left,
            fontSize: `${heart.size}px`,
          }}
        >
          ❤️
        </motion.div>
      ))}
    </div>
  );
};
