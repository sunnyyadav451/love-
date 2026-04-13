/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { Heart, Music, Volume2, VolumeX, ChevronDown, Upload } from 'lucide-react';
import { FloatingHearts } from './components/FloatingHearts';
import { Petals } from './components/Petals';
import { Timeline } from './components/Timeline';
import { Gallery } from './components/Gallery';
import { Proposal } from './components/Proposal';
import { SparkleGroup } from './components/Sparkles';
import { cn } from './lib/utils';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [musicUrl, setMusicUrl] = useState("https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3");
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const musicInputRef = useRef<HTMLInputElement>(null);
  
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);
  const midgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '-10%']);
  const slowY = useTransform(scrollYProgress, [0, 1], ['0%', '5%']);
  const rotateY = useTransform(scrollYProgress, [0, 1], [0, 45]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2500);
    
    const savedMusic = localStorage.getItem('custom_background_music');
    if (savedMusic) {
      setMusicUrl(savedMusic);
    }
    
    return () => clearTimeout(timer);
  }, []);

  const handleMusicUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const url = reader.result as string;
      setMusicUrl(url);
      localStorage.setItem('custom_background_music', url);
      
      // Auto play the new music if already started
      if (hasStarted && audioRef.current) {
        audioRef.current.load();
        audioRef.current.play().catch(console.error);
        setIsPlaying(true);
      }
    };
    reader.readAsDataURL(file);
  };

  const triggerMusicUpload = () => {
    musicInputRef.current?.click();
  };

  const startJourney = () => {
    setHasStarted(true);
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
          animate={{ 
            scale: [1, 1.2, 1], 
            opacity: [0.5, 1, 0.5],
            filter: ["blur(0px)", "blur(2px)", "blur(0px)"]
          }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="mb-4"
        >
          <Heart size={64} className="text-romantic-red fill-romantic-red drop-shadow-[0_0_15px_rgba(255,107,107,0.5)]" />
        </motion.div>
        <h2 className="text-2xl font-serif text-gray-700 animate-pulse tracking-widest">Loading Our Love...</h2>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen font-sans selection:bg-romantic-red/30 overflow-x-hidden">
      {/* Dreamy Overlay */}
      <motion.div 
        style={{ y: slowY }}
        className="fixed inset-0 pointer-events-none z-[60] bg-[radial-gradient(circle_at_center,transparent_0%,rgba(255,192,203,0.15)_100%)] mix-blend-soft-light" 
      />
      <div className="fixed inset-0 pointer-events-none z-[61] backdrop-blur-[1px] opacity-30" />
      
      <motion.div style={{ y: backgroundY }} className="fixed inset-0 pointer-events-none">
        <FloatingHearts />
      </motion.div>
      <motion.div style={{ y: midgroundY }} className="fixed inset-0 pointer-events-none">
        <Petals />
      </motion.div>
      
      {/* Background Music */}
      <audio 
        ref={audioRef}
        src={musicUrl} 
        loop 
      />
      
      <div className="fixed top-6 right-6 z-50 flex gap-2">
        <input 
          type="file" 
          ref={musicInputRef} 
          onChange={handleMusicUpload} 
          accept="audio/*" 
          className="hidden" 
        />
        <motion.button 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={triggerMusicUpload}
          className="glass p-3 rounded-full hover:shadow-[0_0_15px_rgba(255,107,107,0.3)] transition-all group"
          title="Upload Background Music"
        >
          <Upload size={20} className="text-romantic-red group-hover:rotate-12 transition-transform" />
        </motion.button>
        <motion.button 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleMusic}
          className="glass p-3 rounded-full hover:shadow-[0_0_15px_rgba(255,107,107,0.3)] transition-all"
        >
          {isPlaying ? (
            <Volume2 size={20} className="text-romantic-red" />
          ) : (
            <VolumeX size={20} className="text-romantic-red" />
          )}
        </motion.button>
      </div>

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
              <div className="absolute inset-0 bg-gradient-to-b from-romantic-pink/80 to-romantic-pink" />
              <div className="absolute inset-0 opacity-30">
                {Array.from({ length: 20 }).map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ 
                      opacity: [0, 1, 0], 
                      scale: [0.5, 1.5, 0.5],
                      x: [Math.random() * 100 - 50, Math.random() * 100 - 50],
                      y: [Math.random() * 100 - 50, Math.random() * 100 - 50]
                    }}
                    transition={{ 
                      duration: Math.random() * 3 + 2, 
                      repeat: Infinity,
                      delay: Math.random() * 2
                    }}
                    className="absolute text-romantic-red"
                    style={{ 
                      left: `${Math.random() * 100}%`, 
                      top: `${Math.random() * 100}%` 
                    }}
                  >
                    {i % 2 === 0 ? '💋' : '❤️'}
                  </motion.div>
                ))}
              </div>
            </div>
            
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", damping: 12 }}
              className="mb-8 relative z-10"
            >
              <motion.div
                animate={{ 
                  filter: ["drop-shadow(0 0 0px rgba(255,107,107,0))", "drop-shadow(0 0 20px rgba(255,107,107,0.6))", "drop-shadow(0 0 0px rgba(255,107,107,0))"]
                }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <Heart size={100} className="text-romantic-red fill-romantic-red drop-shadow-2xl" />
              </motion.div>
              <SparkleGroup count={8} />
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
              <motion.div style={{ y: backgroundY }} className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-romantic-pink/20 to-romantic-pink" />
                <motion.div 
                  style={{ rotate: rotateY }}
                  className="absolute inset-0 flex items-center justify-center opacity-5"
                >
                  <Heart size={400} className="text-romantic-red fill-romantic-red animate-pulse" />
                </motion.div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-3xl relative z-10"
              >
                <SparkleGroup count={12} areaWidth={100} areaHeight={100} />
                <h2 className="text-6xl md:text-8xl font-script text-romantic-red mb-6 text-shadow-romantic drop-shadow-[0_0_10px_rgba(255,107,107,0.3)]">
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

            {/* Love Gallery */}
            <Gallery />

            {/* Love Notes Section */}
            <section className="py-20 px-4 bg-white/20 relative overflow-hidden">
              <motion.div 
                style={{ y: midgroundY, rotate: -10 }}
                className="absolute top-0 right-0 opacity-5 pointer-events-none"
              >
                <Heart size={300} className="text-romantic-red fill-romantic-red" />
              </motion.div>
              <div className="max-w-5xl mx-auto relative z-10">
                <motion.h2 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  className="text-4xl font-serif text-center mb-16 text-gray-800"
                >
                  Little Notes of Love
                </motion.h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {[
                    { title: "Your Smile", text: "It's the first thing I think about when I wake up. It lights up my entire world.", icon: "😊" },
                    { title: "Our Talks", text: "I could listen to you talk for hours and never get tired. Your voice is my favorite sound.", icon: "💬" },
                    { title: "Your Kindness", text: "The way you care for others makes me fall for you more every single day.", icon: "✨" },
                    { title: "Our Future", text: "I can't wait to see all the beautiful things we'll build together.", icon: "💍" }
                  ].map((note, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      className="glass p-8 rounded-3xl border-l-4 border-romantic-red hover:translate-x-2 transition-transform"
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <span className="text-3xl">{note.icon}</span>
                        <h4 className="text-2xl font-serif text-romantic-red">{note.title}</h4>
                      </div>
                      <p className="text-gray-700 font-serif italic text-lg leading-relaxed">
                        "{note.text}"
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* Video Section */}
            <section className="py-20 px-4 relative overflow-hidden">
              <motion.div 
                style={{ y: backgroundY, rotate: 15 }}
                className="absolute bottom-0 left-0 opacity-5 pointer-events-none"
              >
                <Heart size={250} className="text-romantic-red fill-romantic-red" />
              </motion.div>
              <div className="max-w-4xl mx-auto text-center relative z-10">
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
                  className="aspect-video glass rounded-3xl overflow-hidden relative group flex items-center justify-center bg-white/20"
                >
                  <motion.div
                    animate={{ 
                      scale: [1, 1.2, 1],
                      rotate: [0, 5, -5, 0]
                    }}
                    transition={{ repeat: Infinity, duration: 3 }}
                    className="relative"
                  >
                    <Heart size={120} className="text-romantic-red fill-romantic-red drop-shadow-2xl" />
                    <motion.span 
                      animate={{ opacity: [0, 1, 0], scale: [0.5, 1.5, 0.5] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                      className="absolute -top-4 -right-4 text-4xl"
                    >
                      💋
                    </motion.span>
                  </motion.div>
                  <div className="absolute inset-0 bg-romantic-red/5 mix-blend-overlay" />
                </motion.div>
              </div>
            </section>

            {/* Love Message */}
            <section className="py-20 px-4 bg-white/40 relative overflow-hidden">
              <motion.div 
                style={{ y: slowY, x: -50 }}
                className="absolute top-1/2 left-0 opacity-5 pointer-events-none"
              >
                <Heart size={200} className="text-romantic-red fill-romantic-red" />
              </motion.div>
              <div className="max-w-3xl mx-auto text-center relative z-10">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  className="glass p-10 md:p-16 rounded-[3rem] relative"
                >
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-romantic-red p-3 rounded-full shadow-lg">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                    >
                      <Heart className="text-white fill-white" size={32} />
                    </motion.div>
                  </div>
                  <SparkleGroup count={10} />
                  
                  <h3 className="text-3xl font-serif mb-8 text-gray-800">My Dearest Babita,</h3>
                  <motion.p 
                    animate={{ opacity: [0.8, 1, 0.8] }}
                    transition={{ repeat: Infinity, duration: 4 }}
                    className="text-xl md:text-2xl font-serif text-gray-700 leading-relaxed italic"
                  >
                    "Babita, these days with you have been the most beautiful part of my life. 
                    From that first message on April 5th to this very moment, every second spent 
                    talking to you has felt like a dream I never want to wake up from. 
                    You've become my favorite notification, my reason to smile, and the person 
                    I want to share all my tomorrows with. I realized that love isn't just a word, 
                    it's the way you make me feel—complete, understood, and truly happy. 
                    I want to be the one who holds your hand through everything, who makes you 
                    laugh when you're down, and who loves you unconditionally. You are my everything."
                  </motion.p>
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
