import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { Heart, Sparkles, Upload, X, Camera, Plus } from 'lucide-react';
import { SparkleGroup } from './Sparkles';

interface Photo {
  id: string;
  url: string;
  timestamp: number;
}

const loveQuotes = [
  { text: "My heart is and always will be yours.", icon: "💋" },
  { text: "In your smile, I see something more beautiful than the stars.", icon: "❤️" },
  { text: "Every kiss feels like the first time.", icon: "💖" },
  { text: "You are my today and all of my tomorrows.", icon: "✨" },
  { text: "I love you more than words can say.", icon: "🌹" },
  { text: "You're the best thing that ever happened to me.", icon: "💑" },
  { text: "I found my home in your heart.", icon: "🏠❤️" },
  { text: "Together is my favorite place to be.", icon: "📍💞" },
  { text: "You make my soul shine.", icon: "🌟" }
];

export const Gallery: React.FC = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 100]);

  useEffect(() => {
    const savedPhotos = localStorage.getItem('love_gallery_photos');
    if (savedPhotos) {
      try {
        setPhotos(JSON.parse(savedPhotos));
      } catch (e) {
        console.error("Failed to load photos", e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('love_gallery_photos', JSON.stringify(photos));
  }, [photos]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    
    Array.from(files).forEach((file: File) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newPhoto: Photo = {
          id: Math.random().toString(36).substr(2, 9),
          url: reader.result as string,
          timestamp: Date.now()
        };
        setPhotos(prev => [newPhoto, ...prev]);
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    });
  };

  const removePhoto = (id: string) => {
    setPhotos(prev => prev.filter(p => p.id !== id));
  };

  const triggerUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="py-20 bg-white/30 backdrop-blur-sm relative overflow-hidden">
      <motion.div 
        style={{ y: y1 }}
        className="absolute top-20 left-10 opacity-5 pointer-events-none"
      >
        <Heart size={150} className="text-romantic-red fill-romantic-red" />
      </motion.div>
      <motion.div 
        style={{ y: y2 }}
        className="absolute bottom-20 right-10 opacity-5 pointer-events-none"
      >
        <Heart size={200} className="text-romantic-red fill-romantic-red" />
      </motion.div>
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-romantic-pink/20 to-transparent" />
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <motion.h2 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-4xl md:text-5xl font-serif text-center mb-16 text-gray-800"
        >
          Our Love Gallery
        </motion.h2>

        {/* Upload Section */}
        <div className="mb-16 flex flex-col items-center">
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileUpload} 
            accept="image/*" 
            multiple 
            className="hidden" 
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={triggerUpload}
            className="group relative px-8 py-4 bg-white text-romantic-red rounded-full font-bold text-lg shadow-xl overflow-hidden flex items-center gap-3 border border-romantic-pink/30"
          >
            <Camera className="group-hover:rotate-12 transition-transform" />
            <span>Upload Our Memories</span>
            <Plus size={20} />
            <div className="absolute inset-0 bg-romantic-red/5 group-hover:bg-romantic-red/10 transition-colors" />
          </motion.button>
          <p className="mt-4 text-gray-500 font-serif italic text-sm">
            Add photos of us to our special gallery
          </p>
        </div>
        
        {/* Photo Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          <AnimatePresence>
            {photos.map((photo) => (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                layout
                className="relative aspect-square group rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white"
              >
                <img 
                  src={photo.url} 
                  alt="Our Memory" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button 
                    onClick={() => removePhoto(photo.id)}
                    className="p-3 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-romantic-red transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>
                <div className="absolute bottom-4 right-4">
                  <Heart className="text-white fill-white/50 animate-pulse" size={24} />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loveQuotes.map((quote, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass p-8 rounded-[2.5rem] shadow-xl group cursor-pointer hover:shadow-[0_0_30px_rgba(255,107,107,0.3)] transition-all duration-500 text-center relative overflow-hidden border border-white/40"
            >
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity">
                <Sparkles size={48} className="text-romantic-red" />
              </div>
              <SparkleGroup count={4} />
              
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                  filter: ["drop-shadow(0 0 0px rgba(255,107,107,0))", "drop-shadow(0 0 8px rgba(255,107,107,0.4))", "drop-shadow(0 0 0px rgba(255,107,107,0))"]
                }}
                transition={{ repeat: Infinity, duration: 2, delay: index * 0.2 }}
                className="text-5xl mb-6"
              >
                {quote.icon}
              </motion.div>
              
              <p className="font-serif text-xl text-gray-700 italic leading-relaxed group-hover:text-romantic-red transition-colors">
                "{quote.text}"
              </p>
              
              <div className="mt-6 flex justify-center gap-2">
                <Heart size={16} className="text-romantic-red fill-romantic-red animate-pulse" style={{ animationDelay: `${index * 0.1}s` }} />
                <Heart size={16} className="text-romantic-red fill-romantic-red animate-pulse" style={{ animationDelay: `${index * 0.2}s` }} />
                <Heart size={16} className="text-romantic-red fill-romantic-red animate-pulse" style={{ animationDelay: `${index * 0.3}s` }} />
              </div>

              <div className="absolute inset-0 bg-gradient-to-br from-romantic-red/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
