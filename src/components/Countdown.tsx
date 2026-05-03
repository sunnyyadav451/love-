import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Heart, Cake, Stars, Clock } from 'lucide-react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface EventCountdownProps {
  title: string;
  subtitle: string;
  date: Date;
  icon: React.ElementType;
}

const TimerCard: React.FC<EventCountdownProps> = ({ title, subtitle, date, icon: Icon }) => {
  const calculateTimeLeft = () => {
    const difference = +date - +new Date();
    let timeLeft: TimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

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
  }, [date]);

  const timerItems = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hrs', value: timeLeft.hours },
    { label: 'Min', value: timeLeft.minutes },
    { label: 'Sec', value: timeLeft.seconds },
  ];

  return (
    <motion.div
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="glass p-6 md:p-8 rounded-[3rem] relative overflow-hidden flex flex-col h-full border border-white/50 shadow-2xl group transition-all"
    >
      <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-romantic-pink via-romantic-red to-romantic-pink opacity-80" />
      
      <div className="flex items-center gap-4 mb-3">
        <div className="p-3 rounded-2xl bg-white/40 shadow-sm text-romantic-red group-hover:scale-110 transition-transform">
          <Icon size={24} />
        </div>
        <div className="text-left">
          <h3 className="text-lg md:text-xl font-serif text-gray-800 font-bold leading-tight">{title}</h3>
          <p className="text-gray-500 font-serif italic text-xs">{subtitle}</p>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 mt-auto">
        {timerItems.map((item) => (
          <div key={item.label} className="flex flex-col items-center">
            <div className="relative w-full aspect-square flex items-center justify-center rounded-2xl bg-white/50 border border-white/60 shadow-lg group-hover:bg-white/70 transition-colors overflow-hidden">
              <span className="text-xl md:text-2xl font-bold text-gray-800 tabular-nums z-10">
                {String(item.value).padStart(2, '0')}
              </span>
              <motion.div 
                animate={{ opacity: [0.05, 0.15, 0.05] }}
                transition={{ repeat: Infinity, duration: 3 }}
                className="absolute -bottom-1 -right-1 opacity-10 pointer-events-none"
              >
                <Icon size={32} className="text-romantic-red" />
              </motion.div>
            </div>
            <span className="mt-2 text-[10px] font-bold text-gray-400 uppercase tracking-[0.15em]">{item.label}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export const Countdown: React.FC = () => {
  const getNextDate = (month: number, day: number) => {
    const now = new Date();
    let target = new Date(now.getFullYear(), month - 1, day);
    if (now > target) {
      target = new Date(now.getFullYear() + 1, month - 1, day);
    }
    return target;
  };

  const getNextMonthlyAnniversary = (day: number) => {
    const now = new Date();
    let target = new Date(now.getFullYear(), now.getMonth(), day);
    if (now > target) {
      target = new Date(now.getFullYear(), now.getMonth() + 1, day);
    }
    return target;
  };

  const events = [
    {
      title: "Yearly Anniversary",
      subtitle: "Celebrating our forever since April 5th",
      date: getNextDate(4, 5),
      icon: Heart
    },
    {
      title: "Hubby's Birthday",
      subtitle: "Avinash's Special Day (May 8th)",
      date: getNextDate(5, 8),
      icon: Cake
    },
    {
      title: "Wifeyy's Birthday",
      subtitle: "Babita's Special Day (August 18th)",
      date: getNextDate(8, 18),
      icon: Stars
    },
    {
      title: "Monthly Anniversary",
      subtitle: "Celebrating another month of Us (5th)",
      date: getNextMonthlyAnniversary(5),
      icon: Clock
    }
  ];

  return (
    <section className="py-24 px-4 bg-gradient-to-b from-transparent to-romantic-pink/5 relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <Calendar className="mx-auto mb-4 text-romantic-red opacity-30" size={40} />
          <h2 className="text-4xl md:text-5xl font-serif text-gray-800">Our Special Milestones</h2>
          <p className="text-romantic-red font-script text-2xl mt-2 italic tracking-wide">
            Every second bringing us closer to our next celebration ❤️
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
          {events.map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <TimerCard {...event} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Background Hearts */}
      <div className="absolute inset-x-0 bottom-0 pointer-events-none opacity-[0.03] flex justify-around">
        <Heart size={200} className="text-romantic-red fill-current" />
        <Heart size={300} className="text-romantic-red fill-current" />
        <Heart size={250} className="text-romantic-red fill-current" />
      </div>
    </section>
  );
};
