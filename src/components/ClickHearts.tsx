import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart } from 'lucide-react';

interface HeartClick {
  id: number;
  x: number;
  y: number;
}

export const ClickHearts: React.FC = () => {
  const [clicks, setClicks] = useState<HeartClick[]>([]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const newClick = {
        id: Date.now(),
        x: e.clientX,
        y: e.clientY,
      };
      setClicks((prev) => [...prev, newClick]);
      // Remove after animation
      setTimeout(() => {
        setClicks((prev) => prev.filter(c => c.id !== newClick.id));
      }, 1000);
    };

    window.addEventListener('mousedown', handleClick);
    return () => window.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]">
      <AnimatePresence>
        {clicks.map((click) => (
          <motion.div
            key={click.id}
            initial={{ opacity: 1, scale: 0, x: click.x - 12, y: click.y - 12 }}
            animate={{ 
              opacity: 0, 
              scale: 2, 
              y: click.y - 100,
              rotate: Math.random() * 40 - 20
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute text-romantic-red pointer-events-none"
          >
            <Heart size={24} className="fill-current" />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
