import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Calendar, Heart } from 'lucide-react';

export const Countdown: React.FC = () => {
  // Setting anniversary date to April 5th of next year
  const calculateTimeLeft = () => {
    const nextAnniversary = new Date(new Date().getFullYear() + (new Date() > new Date(`${new Date().getFullYear()}-04-05`) ? 1 : 0), 3, 5);
    const difference = +nextAnniversary - +new Date();
    
    let timeLeft = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0
    };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const timerItems = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds },
  ];

  return (
    <section className="py-20 px-4 bg-white/10 relative">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="glass p-10 md:p-16 rounded-[3rem] relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-romantic-pink via-romantic-red to-romantic-pink" />
          
          <Calendar className="mx-auto mb-6 text-romantic-red opacity-50" size={40} />
          
          <h2 className="text-3xl md:text-5xl font-serif mb-4 text-gray-800">Countdown to Next Anniversary</h2>
          <p className="text-romantic-red font-script text-2xl mb-12 italic">Counting every second until we celebrate another year of "Us" ❤️</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {timerItems.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col items-center"
              >
                <div className="text-4xl md:text-6xl font-bold text-romantic-red mb-2 bg-white/40 w-full py-6 rounded-2xl border border-white/50 shadow-inner">
                  {String(item.value).padStart(2, '0')}
                </div>
                <span className="text-sm md:text-base font-serif text-gray-500 uppercase tracking-widest">{item.label}</span>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 flex justify-center items-center gap-3">
            <Heart className="text-romantic-red/20 fill-romantic-red/20" size={24} />
            <span className="text-gray-400 font-serif italic text-lg">April 5th, Our Special Day</span>
            <Heart className="text-romantic-red/20 fill-romantic-red/20" size={24} />
          </div>
        </motion.div>
      </div>
    </section>
  );
};
