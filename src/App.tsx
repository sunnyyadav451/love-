/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { Heart, Music, Volume2, VolumeX, ChevronDown, PlayCircle } from 'lucide-react';
import { FloatingHearts } from './components/FloatingHearts';
import { Timeline } from './components/Timeline';
import { Gallery } from './components/Gallery';
import { Proposal } from './components/Proposal';
import { cn } from './lib/utils';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  const startJourney = () => {
    setHasStarted(true);
    // In a real app, we'd play music here. Since we can't autoplay easily:
    if (audioRef.current) {
      audioRef.current.play().catch(() => {
        console.log("Autoplay blocked, user needs to toggle manually");
      });
      setIsPlaying(true);
    }
  };

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-romantic-pink flex flex-col items-center justify-center z-50">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="mb-4"
        >
          <Heart size={64} className="text-romantic-red fill-romantic-red" />
        </motion.div>
        <h2 className="text-2xl font-serif text-gray-700 animate-pulse">Loading Love...</h2>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen font-sans selection:bg-romantic-red/30">
      <FloatingHearts />
      
      {/* Background Music */}
      <audio 
        ref={audioRef}
        src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" 
        loop 
      />
      
      <button 
        onClick={toggleMusic}
        className="fixed top-6 right-6 z-50 glass p-3 rounded-full hover:scale-110 transition-transform"
      >
        {isPlaying ? <Volume2 size={24} className="text-romantic-red" /> : <VolumeX size={24} className="text-gray-400" />}
      </button>

      <AnimatePresence>
        {!hasStarted ? (
          <motion.section 
            key="landing"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -100 }}
            transition={{ duration: 0.8 }}
            className="h-screen flex flex-col items-center justify-center text-center px-4 relative z-10 overflow-hidden"
          >
            <div className="absolute inset-0 z-0">
              <img 
                src="/photo_2026-04-11_08-25-37.jpg" 
                alt="Background" 
                className="w-full h-full object-cover opacity-20 scale-110 blur-sm"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-romantic-pink/80 to-romantic-pink" />
            </div>
            
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", damping: 12 }}
              className="mb-8 relative z-10"
            >
              <Heart size={100} className="text-romantic-red fill-romantic-red drop-shadow-2xl" />
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl md:text-7xl font-serif mb-6 text-gray-800 relative z-10"
            >
              Babita, I have something <br />
              <span className="text-romantic-red font-script">special for you ❤️</span>
            </motion.h1>
            
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={startJourney}
              className="group relative px-10 py-4 bg-white text-romantic-red rounded-full font-bold text-xl shadow-xl overflow-hidden z-10"
            >
              <span className="relative z-10">Click to begin our story</span>
              <div className="absolute inset-0 bg-romantic-red/10 group-hover:bg-romantic-red/20 transition-colors" />
            </motion.button>
          </motion.section>
        ) : (
          <motion.main
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative z-10"
          >
            {/* Hero Section */}
            <section className="h-screen flex flex-col items-center justify-center text-center px-4 relative overflow-hidden">
              <div className="absolute inset-0 z-0">
                <img 
                  src="/photo_2026-04-11_08-25-39.jpg" 
                  alt="Hero Background" 
                  className="w-full h-full object-cover opacity-10 scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-romantic-pink/20 to-romantic-pink" />
              </div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-3xl relative z-10"
              >
                <h2 className="text-6xl md:text-8xl font-script text-romantic-red mb-6 text-shadow-romantic">
                  Avinash ❤️ Babita
                </h2>
                <p className="text-xl md:text-2xl font-serif text-gray-600 italic">
                  "Every love story is beautiful, but ours is my favorite."
                </p>
              </motion.div>
              
              <motion.div 
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute bottom-10 z-10"
              >
                <ChevronDown size={32} className="text-romantic-red" />
              </motion.div>
            </section>

            {/* Journey Timeline */}
            <Timeline />

            {/* Photo Gallery */}
            <Gallery />

            {/* Video Section */}
            <section className="py-20 px-4">
              <div className="max-w-4xl mx-auto text-center">
                <motion.h2 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  className="text-4xl font-serif mb-12 text-gray-800"
                >
                  A Glimpse of Us
                </motion.h2>
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  className="aspect-video glass rounded-3xl overflow-hidden relative group cursor-pointer"
                >
                  <img 
                    src="/photo_2026-04-11_08-25-41.jpg" 
                    alt="Our Moment" 
                    className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <PlayCircle size={80} className="text-white opacity-80 group-hover:scale-110 transition-transform" />
                  </div>
                  <div className="absolute inset-0 bg-romantic-red/10 mix-blend-overlay" />
                </motion.div>
              </div>
            </section>

            {/* Love Message */}
            <section className="py-20 px-4 bg-white/40">
              <div className="max-w-3xl mx-auto text-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  className="glass p-10 md:p-16 rounded-[3rem] relative"
                >
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-romantic-red p-3 rounded-full shadow-lg">
                    <Heart className="text-white fill-white" size={32} />
                  </div>
                  
                  <h3 className="text-3xl font-serif mb-8 text-gray-800">My Dearest Babita,</h3>
                  <p className="text-xl md:text-2xl font-serif text-gray-700 leading-relaxed italic">
                    "Babita, these days with you have been the most beautiful part of my life. 
                    From that first message on April 5th to this very moment, every second spent 
                    talking to you has felt like a dream I never want to wake up from. 
                    You've become my favorite notification, my reason to smile, and the person 
                    I want to share all my tomorrows with. I realized that love isn't just a word, 
                    it's the way you make me feel—complete, understood, and truly happy. 
                    I want to be the one who holds your hand through everything, who makes you 
                    laugh when you're down, and who loves you unconditionally. You are my everything."
                  </p>
                  <div className="mt-8 text-right">
                    <span className="font-script text-3xl text-romantic-red">— Always yours, Avinash</span>
                  </div>
                </motion.div>
              </div>
            </section>

            {/* Final Proposal */}
            <Proposal />

            {/* Footer */}
            <footer className="py-10 text-center text-gray-500 font-serif italic">
              <p>Made with ❤️ by Avinash for Babita</p>
              <p className="text-sm mt-2">April 11, 2026</p>
            </footer>
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  );
}
