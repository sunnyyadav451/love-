import React from 'react';
import { motion } from 'motion/react';
import { MessageCircle, Phone, Heart, Bell, Smile, Sparkles, Star, Music, Infinity } from 'lucide-react';
import { SparkleGroup } from './Sparkles';

export const journey = [
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
  {
    day: 'Day 7',
    date: 'April 11',
    title: 'Dreaming of our forever 🌟',
    description: 'I started imagining my life with you by my side. Every dream now includes your beautiful smile.',
    icon: Star,
    color: 'bg-blue-100 text-blue-600',
  },
  {
    day: 'Day 8',
    date: 'April 12',
    title: 'Our hearts beating as one 🎵',
    description: 'The connection we share is so deep, it feels like our souls have known each other forever.',
    icon: Music,
    color: 'bg-indigo-100 text-indigo-600',
  },
  {
    day: 'Day 9',
    date: 'April 13',
    title: 'The bond grows stronger ⚓',
    description: 'Every day we find more reasons to stay connected. Our bond is becoming unbreakable.',
    icon: Infinity,
    color: 'bg-rose-100 text-rose-600',
  },
  {
    day: 'Day 10',
    date: 'April 14',
    title: 'Sharing every little joy ✨',
    description: 'Life feels so much better when I share it with you. Every small achievement feels big because of your support.',
    icon: Sparkles,
    color: 'bg-yellow-100 text-yellow-600',
  },
  {
    day: 'Day 11',
    date: 'April 15',
    title: 'Thinking about you constantly 💭',
    description: 'I catch myself staring at space, just thinking about your laughter and our future memories.',
    icon: MessageCircle,
    color: 'bg-blue-100 text-blue-600',
  },
  {
    day: 'Day 12',
    date: 'April 16',
    title: 'Counting the moments ⏳',
    description: 'Every second away from you feels like an eternity, and every second with you feels like a heartbeat.',
    icon: Star,
    color: 'bg-purple-100 text-purple-600',
  },
  {
    day: 'Day 13',
    date: 'April 17',
    title: 'A beautiful milestone 🌸',
    description: 'Celebrating every small win and every deep conversation that brings us closer.',
    icon: Heart,
    color: 'bg-red-100 text-red-600',
  },
  {
    day: 'Day 14',
    date: 'April 18',
    title: 'Finding peace in you 🌿',
    description: 'The world feels quieter and more beautiful when I am with you.',
    icon: Smile,
    color: 'bg-green-100 text-green-600',
  },
  {
    day: 'Day 15',
    date: 'April 19',
    title: 'Our secret jokes 🙊',
    description: 'Nobody understands us like we do. Those little inside jokes are our treasures.',
    icon: MessageCircle,
    color: 'bg-pink-100 text-pink-600',
  },
  {
    day: 'Day 16',
    date: 'April 20',
    title: 'Dreaming bigger together ☁️',
    description: 'Our individual dreams are merging into one big, beautiful future.',
    icon: Star,
    color: 'bg-yellow-100 text-yellow-600',
  },
  {
    day: 'Day 17',
    date: 'April 21',
    title: 'Your voice is my home 🏠',
    description: 'No matter where I am, the sound of your voice makes me feel safe.',
    icon: Phone,
    color: 'bg-indigo-100 text-indigo-600',
  },
  {
    day: 'Day 18',
    date: 'April 22',
    title: 'Small acts of love 💌',
    description: 'It is the little things you do that make me fall for you over and over.',
    icon: Heart,
    color: 'bg-red-100 text-red-600',
  },
  {
    day: 'Day 19',
    date: 'April 23',
    title: 'Supporting each other 💪',
    description: 'Whatever life throws at us, we face it hand in hand.',
    icon: Sparkles,
    color: 'bg-blue-100 text-blue-600',
  },
  {
    day: 'Day 20',
    date: 'April 24',
    title: 'A midnight confession 🌙',
    description: 'Late night talks where we reveal the deepest parts of our hearts.',
    icon: MessageCircle,
    color: 'bg-purple-100 text-purple-600',
  },
  {
    day: 'Day 21',
    date: 'April 25',
    title: 'Building our world together 🏠',
    description: 'Sharing our visions for the future and finding common ground in our dreams.',
    icon: Star,
    color: 'bg-yellow-100 text-yellow-600',
  },
  {
    day: 'Day 22',
    date: 'April 26',
    title: 'Morning sunshine ☀️',
    description: 'The thought of you is the first ray of light in my day.',
    icon: Smile,
    color: 'bg-orange-100 text-orange-600',
  },
  {
    day: 'Day 23',
    date: 'April 27',
    title: 'Sharing our fears 🤝',
    description: 'In our vulnerability, we find the greatest strength of our connection.',
    icon: Heart,
    color: 'bg-pink-100 text-pink-600',
  },
  {
    day: 'Day 24',
    date: 'April 28',
    title: 'Laughter that heals 😂',
    description: 'Your laugh is the best medicine for any bad day.',
    icon: Music,
    color: 'bg-teal-100 text-teal-600',
  },
  {
    day: 'Day 25',
    date: 'April 29',
    title: 'Every moment feels like magic ✨',
    description: 'Even the simplest moments with you feel extraordinary and filled with love.',
    icon: Sparkles,
    color: 'bg-blue-100 text-blue-600',
  },
  {
    day: 'Day 26',
    date: 'April 30',
    title: 'Planting seeds of hope 🌱',
    description: 'Thinking of all the "firsts" we still have to experience together.',
    icon: Star,
    color: 'bg-green-100 text-green-600',
  },
  {
    day: 'Day 27',
    date: 'May 1',
    title: 'A new month, same love 💖',
    description: 'Time passes, but my feelings for you only grow deeper.',
    icon: Heart,
    color: 'bg-red-100 text-red-600',
  },
  {
    day: 'Day 28',
    date: 'May 2',
    title: 'Anticipating our future 🚀',
    description: 'Excited for everything that is yet to come in our beautiful story.',
    icon: Sparkles,
    color: 'bg-indigo-100 text-indigo-600',
  },
  {
    day: 'Day 29',
    date: 'May 3',
    title: 'Grateful for us 💖',
    description: 'Looking back at how far we have come, I am filled with endless gratitude.',
    icon: Heart,
    color: 'bg-pink-100 text-pink-600',
  },
  {
    day: 'Day 30',
    date: 'May 4',
    title: 'Dreaming of together 💫',
    description: 'Every thought of my future is beautiful now because you are in all of them.',
    icon: Star,
    color: 'bg-yellow-105 text-yellow-600',
  },
  {
    day: 'Day 31',
    date: 'May 5',
    title: 'Another month has passed 📅',
    description: 'Celebrating one full month from our beautiful origin. Every single day with you is a gift.',
    icon: Smile,
    color: 'bg-green-100 text-green-600',
  },
  {
    day: 'Day 32',
    date: 'May 6',
    title: 'Our unspoken understanding 💌',
    description: 'We don’t even need words to understand what the other is feeling. It’s pure telepathy.',
    icon: MessageCircle,
    color: 'bg-indigo-100 text-indigo-600',
  },
  {
    day: 'Day 33',
    date: 'May 7',
    title: 'Birthday Eve excitement 🌟',
    description: 'Counting down the very hours to celebrate the most special person in my life.',
    icon: Bell,
    color: 'bg-purple-100 text-purple-600',
  },
  {
    day: 'Day 34',
    date: 'May 8',
    title: 'Happy Birthday, My Hubby! 🎂💖',
    description: 'Celebrating Avinash’s birthday! The best gift in the world is having you by my side.',
    icon: Heart,
    color: 'bg-red-100 text-red-600',
  },
  {
    day: 'Day 35',
    date: 'May 9',
    title: 'Savoring sweet memories 🍫',
    description: 'Reminiscing about our late-night birthday talks and laughing over sweet stories.',
    icon: Smile,
    color: 'bg-teal-100 text-teal-600',
  },
  {
    day: 'Day 36',
    date: 'May 10',
    title: 'Our voice notes rhythm 🎙️',
    description: 'Your voice is so calming and cute, I could listen to your voice notes on repeat all day.',
    icon: Phone,
    color: 'bg-pink-100 text-pink-600',
  },
  {
    day: 'Day 37',
    date: 'May 11',
    title: 'Your smile is contagious 😊',
    description: 'Whenever I see your picture or think about you, my mood instantly brightens up.',
    icon: Smile,
    color: 'bg-orange-100 text-orange-600',
  },
  {
    day: 'Day 38',
    date: 'May 12',
    title: 'Deep midnight reflections 🌌',
    description: 'Reflecting on our life together and realizing how deeply we care for one another.',
    icon: MessageCircle,
    color: 'bg-blue-100 text-blue-600',
  },
  {
    day: 'Day 39',
    date: 'May 13',
    title: 'Growing closer everyday 📈',
    description: 'Every morning we start with a sweet message, growing our connection even deeper.',
    icon: Sparkles,
    color: 'bg-yellow-101 text-yellow-600',
  },
  {
    day: 'Day 40',
    date: 'May 14',
    title: 'Soft telepathy of hearts 🌸',
    description: 'Feeling your presence with me throughout the day, guiding me and keeping me happy.',
    icon: Heart,
    color: 'bg-rose-100 text-rose-600',
  },
  {
    day: 'Day 41',
    date: 'May 15',
    title: 'My safe guardian angel 👼',
    description: 'You protect my peace, lift me up, and make me feel like the luckiest person.',
    icon: Star,
    color: 'bg-indigo-150 text-indigo-600',
  },
  {
    day: 'Day 42',
    date: 'May 16',
    title: 'The sweetness of your care 🍯',
    description: 'The way you check up on me and ask if I have had food makes me feel so loved.',
    icon: Smile,
    color: 'bg-yellow-100 text-yellow-700',
  },
  {
    day: 'Day 43',
    date: 'May 17',
    title: 'Unwavering companionship ⚓',
    description: 'Knowing you are standing strong beside me makes me feel completely invincible.',
    icon: Infinity,
    color: 'bg-blue-150 text-blue-600',
  },
  {
    day: 'Day 44',
    date: 'May 18',
    title: 'Warm soul connection 🔥',
    description: 'Our conversations are cozy and filled with mutual understanding that feels ancient and true.',
    icon: Heart,
    color: 'bg-red-100 text-red-500',
  },
  {
    day: 'Day 45',
    date: 'May 19',
    title: 'Our hearts synchronized 💓',
    description: 'Every heartbeat seems to sing your name, aligning perfectly with yours.',
    icon: Star,
    color: 'bg-pink-100 text-pink-600',
  },
  {
    day: 'Day 46',
    date: 'May 20',
    title: 'A promise of a lifetime 💍',
    description: 'Every promise we make is a brick in the forever home we are building.',
    icon: Infinity,
    color: 'bg-purple-100 text-purple-600',
  },
  {
    day: 'Day 47',
    date: 'May 21',
    title: 'Your laugh is my favorite tune 🎵',
    description: 'When you laugh freely, it creates the absolute sweet melody in my universe.',
    icon: Music,
    color: 'bg-teal-100 text-teal-600',
  },
  {
    day: 'Day 48',
    date: 'May 22',
    title: 'A beautiful sunny walk 🌤️',
    description: 'I hope every day has the warmth that you bring into my cold world.',
    icon: Smile,
    color: 'bg-orange-100 text-orange-600',
  },
  {
    day: 'Day 49',
    date: 'May 23',
    title: 'In love with your pure soul 🕊️',
    description: 'It is not just your beautiful face, but your pure heart that I am completely in love with.',
    icon: Heart,
    color: 'bg-red-100 text-red-600',
  },
  {
    day: 'Day 50',
    date: 'May 24',
    title: 'Sweet virtual hugs 🤗',
    description: 'Sending you the warmest tightest hugs that close any distance between us.',
    icon: Sparkles,
    color: 'bg-pink-100 text-pink-500',
  },
  {
    day: 'Day 51',
    date: 'May 25',
    title: 'Our beautiful story shines today... Today! ♾️',
    description: 'Today is a wonderful chapter of our everlasting connection. Every moment with you is a lifetime of sweetness.',
    icon: Infinity,
    color: 'bg-rose-100 text-rose-600',
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
      
      <div className="relative ml-4 md:ml-0 md:left-1/2">
        <SparkleGroup count={15} areaWidth={200} areaHeight={100} />
        <motion.div 
          animate={{ opacity: [0.2, 0.5, 0.2] }}
          transition={{ repeat: Infinity, duration: 3 }}
          className="absolute left-0 md:left-0 top-0 bottom-0 w-0.5 bg-pink-300"
        />
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
            <div className={`absolute top-0 w-12 h-12 rounded-full ${item.color} flex items-center justify-center shadow-[0_0_15px_rgba(255,107,107,0.3)] z-10 
              ${index % 2 === 0 ? '-left-6 md:-right-6 md:left-auto' : '-left-6'}`}>
              <item.icon size={24} className="animate-pulse" />
            </div>
            
            <div className="glass p-8 rounded-3xl hover:scale-105 transition-all duration-300 border border-white/40 hover:shadow-[0_0_20px_rgba(255,107,107,0.2)]">
              <span className="text-romantic-red font-script text-3xl block mb-2">{item.day}</span>
              <div className="flex items-center gap-2 mb-3">
                <Sparkles size={14} className="text-romantic-red opacity-50" />
                <span className="text-sm text-gray-500 font-medium tracking-wider uppercase">{item.date}</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3 font-serif">{item.title}</h3>
              <p className="text-gray-600 leading-relaxed text-lg italic">"{item.description}"</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
