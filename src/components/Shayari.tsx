import React from 'react';
import { motion } from 'motion/react';
import { Quote, Sparkles, Heart } from 'lucide-react';

const quotes = [
  {
    hindi: "तुमसे शुरू और तुम पर ही खत्म, मेरा हर लम्हा और मेरा हर कदम।",
    english: "Started with you and ending on you, my every moment and my every step.",
    author: "Avinash"
  },
  {
    hindi: "धड़कनें मेरी और दिल तुम्हारा है, मोहब्बत मेरी और एहसास तुम्हारा है।",
    english: "The heartbeat is mine but the heart is yours, the love is mine but the feeling is yours.",
    author: "With Love"
  },
  {
    hindi: "बस एक तुम ही हो मेरी हर खुशी का ज़रिया, तेरे बिना अधूरी है मेरी चाहत का नज़रिया।",
    english: "You are the only source of my happiness, without you my perspective of love is incomplete.",
    author: "Always"
  }
];

export const Shayari: React.FC = () => {
  return (
    <section className="py-24 px-4 relative overflow-hidden bg-gradient-to-b from-transparent to-romantic-pink/10">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <Quote className="mx-auto mb-4 text-romantic-red opacity-30" size={48} />
          <h2 className="text-4xl md:text-5xl font-serif text-gray-800">Soulful Shayaris</h2>
          <div className="flex justify-center mt-4">
            <span className="h-1 w-24 bg-romantic-red rounded-full"></span>
          </div>
        </motion.div>

        <div className="grid gap-12 lg:gap-20">
          {quotes.map((quote, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-10`}
            >
              <div className="flex-1 glass p-10 rounded-[3rem] relative group border border-white/50 hover:bg-white/40 transition-colors">
                <Sparkles className="absolute top-6 right-6 text-romantic-red opacity-0 group-hover:opacity-100 transition-opacity" size={24} />
                
                <p className="text-2xl md:text-3xl font-serif text-gray-800 mb-6 italic leading-relaxed text-center">
                  "{quote.hindi}"
                </p>
                
                <div className="h-px w-full bg-gradient-to-r from-transparent via-romantic-red/20 to-transparent my-6" />
                
                <p className="text-lg md:text-xl font-serif text-gray-600 text-center leading-relaxed">
                  {quote.english}
                </p>
                
                <div className="mt-8 flex justify-center items-center gap-2">
                  <Heart size={16} className="text-romantic-red fill-romantic-red" />
                  <span className="font-script text-2xl text-romantic-red">{quote.author}</span>
                </div>
              </div>
              
              <div className="w-1/3 hidden md:block">
                <motion.div
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ repeat: Infinity, duration: 4, delay: index }}
                  className="flex justify-center"
                >
                  <Heart 
                    size={120} 
                    className={`text-romantic-red/10 fill-romantic-red/5`} 
                  />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
