import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { Heart } from 'lucide-react';

export const Proposal: React.FC = () => {
  const [isAccepted, setIsAccepted] = useState(false);
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleYes = () => {
    setIsAccepted(true);
    const duration = 15 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);
  };

  const moveNoButton = () => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const maxX = rect.width - 100;
    const maxY = rect.height - 50;
    
    setNoButtonPos({
      x: Math.random() * maxX - maxX / 2,
      y: Math.random() * maxY - maxY / 2,
    });
  };

  return (
    <div ref={containerRef} className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden py-20">
      <AnimatePresence mode="wait">
        {!isAccepted ? (
          <motion.div
            key="proposal"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="text-center z-10"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="inline-block mb-8"
            >
              <Heart size={80} className="text-romantic-red fill-romantic-red" />
            </motion.div>
            
            <h2 className="text-5xl md:text-7xl font-serif mb-12 text-gray-800 leading-tight">
              Babita, will you be mine <br />
              <span className="text-romantic-red font-script">forever? ❤️</span>
            </h2>
            
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 relative">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleYes}
                className="px-12 py-4 bg-romantic-red text-white rounded-full text-2xl font-bold shadow-xl hover:shadow-romantic-red/50 transition-shadow"
              >
                YES 💖
              </motion.button>
              
              <motion.button
                animate={{ x: noButtonPos.x, y: noButtonPos.y }}
                onMouseEnter={moveNoButton}
                onClick={moveNoButton}
                className="px-8 py-3 bg-gray-200 text-gray-600 rounded-full text-xl font-medium"
              >
                THINK AGAIN 😅
              </motion.button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="celebration"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center z-10"
          >
            <motion.div
              initial={{ scale: 0, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", duration: 1 }}
              className="mb-8 glass p-4 rounded-[2rem] inline-block shadow-2xl"
            >
              <img 
                src={`${import.meta.env.BASE_URL}photo_2026-04-11_08-25-42.jpg`} 
                alt="Our Celebration" 
                className="w-64 h-64 object-cover rounded-[1.5rem]"
              />
            </motion.div>
            <h2 className="text-6xl md:text-8xl font-script text-romantic-red mb-8">
              I Love You, Babita! 💖
            </h2>
            <p className="text-2xl md:text-3xl font-serif text-gray-700 max-w-2xl mx-auto leading-relaxed">
              You've made me the happiest person alive. I promise to cherish every moment with you, 
              to support you, and to love you more with each passing day. 
              Our forever starts now! 💍✨
            </p>
            
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: "spring" }}
              className="mt-12 flex justify-center gap-4"
            >
              {Array.from({ length: 5 }).map((_, i) => (
                <Heart key={i} className="text-romantic-red fill-romantic-red animate-bounce" style={{ animationDelay: `${i * 0.1}s` }} />
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
