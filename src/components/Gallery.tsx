import React from 'react';
import { motion } from 'motion/react';
import { getAssetPath } from '../lib/utils';

const avinashImages = [
  "photo_2026-04-11_08-25-37.jpg",
  "photo_2026-04-11_08-25-39.jpg",
  "photo_2026-04-11_08-25-41.jpg",
  "photo_2026-04-11_08-25-42.jpg",
  "photo_2026-04-11_08-25-43.jpg",
  "photo_2026-04-11_08-25-44.jpg"
];

const babitaImages = [
  "photo_2026-04-11_08-42-34.jpg",
  "photo_2026-04-11_08-42-36.jpg",
  "FB_IMG_1730178591724.jpg",
  "FB_IMG_1733313241462.jpg",
  "IMG-20220127-WA0002.jpg",
  "Remini20220429053933729.jpg"
];

export const Gallery: React.FC = () => {
  return (
    <div className="py-20 bg-white/30 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-4xl font-serif text-center mb-12 text-gray-800"
        >
          Our Beautiful Moments Together
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {avinashImages.map((src, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass p-4 rounded-3xl shadow-xl group cursor-pointer hover:shadow-2xl transition-all duration-500"
            >
              <div className="flex gap-2 aspect-video overflow-hidden rounded-2xl relative">
                <div className="w-1/2 overflow-hidden">
                  <img 
                    src={getAssetPath(src)} 
                    alt={`Avinash ${index + 1}`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="w-1/2 overflow-hidden">
                  <img 
                    src={getAssetPath(babitaImages[index])} 
                    alt={`Babita ${index + 1}`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="bg-white/80 backdrop-blur-md p-2 rounded-full shadow-lg transform group-hover:scale-125 transition-transform duration-500">
                    <span className="text-romantic-red text-2xl">❤️</span>
                  </div>
                </div>
              </div>
              <div className="mt-4 text-center">
                <p className="font-script text-2xl text-romantic-red opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  Together Forever
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
