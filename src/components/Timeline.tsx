import React from 'react';
import { motion } from 'motion/react';
import { MessageCircle, Phone, Heart, Bell, Smile, Sparkles } from 'lucide-react';

const journey = [
  {
    day: 'Day 1',
    date: 'April 5',
    title: 'The day we started talking 💬',
    description: 'A simple "Hello" that changed everything. We connected instantly, and the conversation just flowed.',
    icon: MessageCircle,
    color: 'bg-pink-100 text-pink-600',
  },
  {
    day: 'Day 2',
    date: 'April 6',
    title: 'Long conversations that never felt enough ☎️',
    description: 'Hours felt like minutes when I was talking to you. Every word made me want to know you more.',
    icon: Phone,
    color: 'bg-purple-100 text-purple-600',
  },
  {
    day: 'Day 3',
    date: 'April 7',
    title: 'Getting closer and understanding each other ❤️',
    description: 'We started sharing our dreams, our fears, and our little secrets. I felt a connection like never before.',
    icon: Heart,
    color: 'bg-red-100 text-red-600',
  },
  {
    day: 'Day 4',
    date: 'April 8',
    title: 'You became my favorite notification 📱',
    description: 'My heart skips a beat every time my phone lights up with your name. You are always on my mind.',
    icon: Bell,
    color: 'bg-pink-100 text-pink-600',
  },
  {
    day: 'Day 5',
    date: 'April 9',
    title: 'Smiles because of you 😊',
    description: 'I find myself smiling at my phone like an idiot. Your laughter is my favorite melody.',
    icon: Smile,
    color: 'bg-yellow-100 text-yellow-600',
  },
  {
    day: 'Day 6',
    date: 'April 10',
    title: 'I realized... I’m in love with you 💖',
    description: 'It didn\'t take long to realize that you are the one I\'ve been looking for all my life.',
    icon: Sparkles,
    color: 'bg-red-100 text-red-600',
  },
];

export const Timeline: React.FC = () => {
  return (
    <div className="py-20 px-4 max-w-4xl mx-auto">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-4xl md:text-5xl font-serif text-center mb-16 text-gray-800"
      >
        Our Beautiful Journey
      </motion.h2>
      
      <div className="relative border-l-2 border-pink-200 ml-4 md:ml-0 md:left-1/2">
        {journey.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className={`relative mb-12 md:w-1/2 ${
              index % 2 === 0 ? 'md:pr-12 md:text-right md:-left-1/2' : 'md:pl-12 md:left-0'
            }`}
          >
            <div className={`absolute top-0 w-10 h-10 rounded-full ${item.color} flex items-center justify-center shadow-lg z-10 
              ${index % 2 === 0 ? '-left-5 md:-right-5 md:left-auto' : '-left-5'}`}>
              <item.icon size={20} />
            </div>
            
            <div className="glass p-6 rounded-2xl hover:scale-105 transition-transform duration-300">
              <span className="text-romantic-red font-script text-2xl block mb-1">{item.day}</span>
              <span className="text-sm text-gray-500 font-medium mb-2 block">{item.date}</span>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h3>
              <p className="text-gray-600 leading-relaxed">{item.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
