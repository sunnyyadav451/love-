import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calendar as CalendarIcon, 
  Heart, 
  Cake, 
  Stars, 
  Clock, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  Gift, 
  ArrowRight,
  Smile,
  BookOpen
} from 'lucide-react';
import { journey } from './Timeline';

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

// TimerCard confined to prevent parent re-renders every second
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
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="glass p-5 md:p-6 rounded-[2.5rem] relative overflow-hidden flex flex-col h-full border border-white/50 shadow-xl group transition-all"
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-romantic-pink via-romantic-red to-romantic-pink opacity-80" />
      
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2.5 rounded-xl bg-white/40 shadow-sm text-romantic-red group-hover:scale-110 transition-transform">
          <Icon size={20} />
        </div>
        <div className="text-left">
          <h3 className="text-base md:text-lg font-serif text-gray-850 font-bold leading-tight">{title}</h3>
          <p className="text-gray-500 font-serif italic text-[11px]">{subtitle}</p>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-2 mt-3">
        {timerItems.map((item) => (
          <div key={item.label} className="flex flex-col items-center">
            <div className="relative w-full aspect-square flex items-center justify-center rounded-xl bg-white/60 border border-white/70 shadow hover:bg-white/85 transition-colors overflow-hidden">
              <span className="text-sm md:text-base font-bold text-gray-850 tabular-nums z-10">
                {String(item.value).padStart(2, '0')}
              </span>
              <div className="absolute -bottom-1 -right-1 opacity-5 pointer-events-none">
                <Icon size={20} className="text-romantic-red" />
              </div>
            </div>
            <span className="mt-1 text-[8px] font-bold text-gray-400 uppercase tracking-widest">{item.label}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

interface CalendarDayProps {
  day: number;
  idx: number;
  isSelected: boolean;
  onSelect: () => void;
  celInfo: {
    type: string;
    title: string;
    description: string;
    emoji: string;
    colorClass: string;
  };
  isSatSun: boolean;
}

const CalendarDay: React.FC<CalendarDayProps> = ({ day, idx, isSelected, onSelect, celInfo, isSatSun }) => {
  const [isHovered, setIsHovered] = useState(false);
  const isSpecial = celInfo.type !== "generic";

  return (
    <div 
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.button
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.95 }}
        onClick={onSelect}
        style={{ height: '36px' }}
        className={`w-full text-xs font-serif font-bold flex items-center justify-center rounded-xl transition-all cursor-pointer relative ${
          isSelected 
            ? 'bg-gradient-to-r from-romantic-red to-rose-400 text-white shadow-lg ring-2 ring-rose-300 scale-110 z-10' 
            : isSpecial 
              ? celInfo.colorClass 
              : isSatSun 
                ? 'bg-red-50/40 text-rose-500 hover:bg-red-100/60' 
                : 'bg-white/20 text-gray-700 hover:bg-white/50'
        }`}
      >
        {day}
        {isSpecial && !isSelected && (
          <span className="absolute bottom-1 text-[7px]" role="img" aria-label="marker">
            {celInfo.emoji}
          </span>
        )}
      </motion.button>

      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.9 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 w-52 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl border border-pink-100 shadow-[0_10px_25px_-5px_rgba(255,107,107,0.25)] z-40 pointer-events-none text-left"
          >
            {/* Cute mini heart-pulse arrow pointer at the bottom of the popup */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1.5 w-3 h-3 bg-white/95 border-b border-r border-pink-100 rotate-45" />

            <div className="flex items-start gap-2 mb-1.5">
              <span className="text-xl filter drop-shadow-sm leading-none mt-0.5">{celInfo.emoji}</span>
              <div className="flex-1 min-w-0">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#ef4444]/70 block leading-none mb-1">
                  {celInfo.type === 'anniversary' 
                    ? 'Anniversary 🎉' 
                    : celInfo.type === 'hubby_bday' 
                      ? 'Hubby Birthday 🎂' 
                      : celInfo.type === 'wifeyy_bday' 
                        ? 'Wifeyy Birthday 👑' 
                        : celInfo.type === 'monthly_anniversary' || celInfo.type === 'monthly_aniv' 
                          ? 'Monthly 🌹' 
                          : 'Daily Love Note 💞'}
                </span>
                <h5 className="text-xs font-serif font-extrabold text-gray-850 leading-tight">
                  {celInfo.title}
                </h5>
              </div>
            </div>
            
            <p className="text-[11px] text-gray-550 leading-relaxed font-serif italic pl-2 border-l-2 border-rose-300">
              {celInfo.description}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
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

  // Love Calendar Navigation Setup
  const [currentDate, setCurrentDate] = useState(new Date(2026, 4, 25)); // Focus on May 2026 as current
  const [selectedDay, setSelectedDay] = useState<number | null>(25); // Selected day of focus
  
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const handlePrevMonth = () => {
    setCurrentDate(prev => {
      const prevMonth = prev.getMonth() === 0 ? 11 : prev.getMonth() - 1;
      const prevYear = prev.getMonth() === 0 ? prev.getFullYear() - 1 : prev.getFullYear();
      return new Date(prevYear, prevMonth, 1);
    });
    setSelectedDay(null);
  };

  const handleNextMonth = () => {
    setCurrentDate(prev => {
      const nextMonth = prev.getMonth() === 11 ? 0 : prev.getMonth() + 1;
      const nextYear = prev.getMonth() === 11 ? prev.getFullYear() + 1 : prev.getFullYear();
      return new Date(nextYear, nextMonth, 1);
    });
    setSelectedDay(null);
  };

  const selectMonth = (mIdx: number) => {
    setCurrentDate(new Date(2026, mIdx, 1));
    setSelectedDay(null);
  };

  // Calendar logic helpers for single month view
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startDayIndex = new Date(year, month, 1).getDay();

  // Day Headers: Starting from Monday to mimic the provided image
  const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  // Adjusted start index to make Mon = 0, Tue = 1... Sun = 6
  const adjustedStartIdx = (startDayIndex === 0) ? 6 : startDayIndex - 1;

  // Global static sweet notes for non-timeline dates with beautiful emojis
  const sweetUniversalNotes = [
    { title: "Sweet Sunshine ☀️", note: "Just like the morning sun, your presence lights up every corner of my life.", emoji: "☀️" },
    { title: "Whispering Hearts 💖", note: "Every heartbeat whispers your name, reminding me how lucky I am.", emoji: "💖" },
    { title: "Sweet Laughter 🎵", note: "Your soft laugh is my favorite song. I could listen to it for eternity.", emoji: "🎵" },
    { title: "Cozy Warmth ☕", note: "Thinking of your caring embrace warms me up even on the coldest days.", emoji: "☕" },
    { title: "Boundless Love ♾️", note: "My love for you surpasses the highest mountains and deepest oceans.", emoji: "♾️" },
    { title: "Gazing Stars ✨", note: "The stars tell stories of a love as bright and beautiful as ours.", emoji: "✨" },
    { title: "Silent Trust 🤗", note: "With you, I find a peaceful sanctuary where my heart feels completely safe.", emoji: "🤗" },
    { title: "Lovely Future 🏡", note: "Every dream of tomorrow is sweeter because you are standing there beside me.", emoji: "🏡" },
    { title: "Soul Connection 🔥", note: "Our bond feels ancient, pure, and absolutely meant to be.", emoji: "🔥" },
    { title: "Purest Happiness 💫", note: "You make the simplest days extraordinary just by holding my hand.", emoji: "💫" },
    { title: "Angel Presence 🕊️", note: "You protect my peace and cover my world with kindness and care.", emoji: "🕊️" },
    { title: "Contagious Smiles 😊", note: "Just a thought of you bringing a cute wide smile across my face.", emoji: "😊" },
    { title: "Special Bond ⚓", note: "You are my steady anchor and the sweet compass of my beautiful life.", emoji: "⚓" },
    { title: "Beautiful Journey 🌹", note: "Walking these pathways together is the best adventure I could ever hope for.", emoji: "🌹" },
    { title: "Infinite Hugs 🤗", note: "Sending you endless virtual warm hugs to wrap you with my eternal love.", emoji: "🤗" },
    { title: "Magical Touch Magic ✨", note: "Everything we touch of each other's lives blossoms into absolute magic.", emoji: "✨" },
    { title: "Late Night Whispers 🌙", note: "Under the stars, my deepest wishes always revolve around you.", emoji: "🌙" },
    { title: "Precious Gem 💎", note: "Your heart is a sparkling treasure that I will guard and cherish forever.", emoji: "💎" },
    { title: "Warm Guidance 🌸", note: "Your sweet care guides me and makes me a better person every single day.", emoji: "🌸" },
    { title: "Our Forever Love 💍", note: "I promise to walk beside you, holding your hand through all of forever.", emoji: "💍" }
  ];

  // Quick helper to match a calendar cell date to a special timeline day or general key date
  const getDateCelebration = (m: number, d: number) => {
    // 1. Anniversary Event (April 5)
    if (m === 3 && d === 5) {
      return {
        type: "anniversary",
        title: "Our Anniversary! ❤️",
        description: "April 5th is the magical day we started talking. Our custom yearly celebration!",
        emoji: "❤️",
        colorClass: "bg-gradient-to-br from-red-400 to-rose-500 text-white shadow-[0_4px_12px_rgba(239,68,68,0.4)] hover:scale-110"
      };
    }
    // 2. Hubby's Birthday (May 8)
    if (m === 4 && d === 8) {
      return {
        type: "hubby_bday",
        title: "Happy Birthday Hubby! 🎂🎉",
        description: "Avinash was born on May 8, 2003! Happy birthday to the best hubby-to-be!",
        emoji: "🎂",
        colorClass: "bg-gradient-to-br from-purple-400 to-indigo-500 text-white shadow-[0_4px_12px_rgba(139,92,246,0.4)] hover:scale-110"
      };
    }
    // 3. Wifeyy's Birthday (August 18)
    if (m === 7 && d === 18) {
      return {
        type: "wifeyy_bday",
        title: "Happy Birthday Wifeyy! 👑💖",
        description: "Babita's amazing birthday on August 18, 2007. Celebrating my gorgeous queen!",
        emoji: "👑",
        colorClass: "bg-gradient-to-br from-yellow-405 to-amber-500 text-white shadow-[0_4px_12px_rgba(245,158,11,0.4)] hover:scale-110"
      };
    }
    // 4. Monthly Anniversary (5th of any month except April)
    if (d === 5 && m !== 3) {
      return {
        type: "monthly_aniv",
        title: "Monthly Anniversary 🌹",
        description: `Marking another sweetest month of our precious journey together since April 5th!`,
        emoji: "🌹",
        colorClass: "bg-gradient-to-br from-pink-400 to-rose-400 text-white shadow-[0_4px_10px_rgba(244,63,94,0.3)] hover:scale-110"
      };
    }

    // 5. Match from the active timeline journey (April 5 to May 25)
    // Format calendar month to string name
    const monthName = months[m]; // e.g. "April" or "May"
    const journeySearchStr = `${monthName} ${d}`;
    const matchedJourney = journey.find(j => j.date === journeySearchStr);

    if (matchedJourney) {
      const isLastToday = m === 4 && d === 25; // May 25 is Today
      // Extract emoji from title
      const emojiMatch = matchedJourney.title.match(/[\p{Emoji}\u200d]+/gu);
      const dayEmoji = emojiMatch ? emojiMatch[0] : "💞";

      return {
        type: isLastToday ? "today" : "journey",
        title: matchedJourney.title,
        description: matchedJourney.description,
        emoji: dayEmoji,
        colorClass: isLastToday 
          ? "ring-4 ring-romantic-red bg-red-100 text-romantic-red font-extrabold shadow-[0_0_15px_rgba(255,50,50,0.3)] animate-pulse" 
          : "bg-gradient-to-br from-pink-100 to-romantic-pink text-pink-750 font-semibold shadow-sm hover:from-pink-200 hover:to-pink-300 hover:scale-115"
      };
    }

    // 6. Generic/Universal beautiful daily love note
    // Generate deterministic index based on day & month to keep notes stable
    const index = (d + m * 31) % sweetUniversalNotes.length;
    return {
      type: "generic",
      title: sweetUniversalNotes[index].title,
      description: sweetUniversalNotes[index].note,
      emoji: sweetUniversalNotes[index].emoji,
      colorClass: ""
    };
  };

  // Extract selected cell info for display
  const getSelectedInfo = () => {
    if (selectedDay === null) {
      return {
        title: "Select any Date! 💘",
        note: "Every single day has a special sweet note filled with beautiful emojis waiting for you. Click on any date above to read it!",
        emoji: "💌"
      };
    }
    const info = getDateCelebration(month, selectedDay);
    return {
      title: info.title,
      note: info.description,
      emoji: info.emoji
    };
  };

  const selectedInfo = getSelectedInfo();

  // Spiral loops representation (Rings of left calendar card)
  const binderRings = Array.from({ length: 11 });

  // 12 Mini Months builder helper
  const renderMiniMonth = (mIdx: number) => {
    const mDate = new Date(2026, mIdx, 1);
    const mDays = new Date(2026, mIdx + 1, 0).getDate();
    const mStartIdx = (mDate.getDay() === 0) ? 6 : mDate.getDay() - 1;
    
    const cells = [];
    for (let i = 0; i < mStartIdx; i++) cells.push(null);
    for (let d = 1; d <= mDays; d++) cells.push(d);

    const isCurrentActive = month === mIdx;

    return (
      <div 
        key={mIdx} 
        onClick={() => selectMonth(mIdx)}
        className={`p-3 rounded-2xl cursor-pointer border transition-all duration-305 bg-white/40 ${
          isCurrentActive 
            ? 'border-romantic-red shadow-lg ring-1 ring-romantic-pink bg-white/60' 
            : 'border-white/50 hover:border-pink-300 hover:bg-white/50 hover:shadow-md'
        }`}
      >
        <div className="text-center font-serif font-bold text-[11px] text-gray-850 hover:text-romantic-red mb-1.5 uppercase tracking-wider">
          {months[mIdx].substring(0, 3)}
        </div>
        <div className="grid grid-cols-7 gap-0.5 text-center leading-none text-[8px] font-sans">
          {["M", "T", "W", "T", "F", "S", "S"].map((dayLetter, i) => (
            <div key={i} className={`font-semibold text-[7px] ${i >= 5 ? 'text-rose-450' : 'text-gray-400'}`}>
              {dayLetter}
            </div>
          ))}
          {cells.map((d, idx) => {
            if (d === null) return <div key={idx} className="opacity-0"></div>;
            
            // Check highlights
            const celInfo = getDateCelebration(mIdx, d);
            const isSpecial = celInfo.type !== "generic";

            return (
              <div 
                key={idx} 
                className={`aspect-square flex items-center justify-center rounded-full text-[8px] ${
                  isSpecial 
                    ? "bg-rose-400/90 text-white font-bold scale-110" 
                    : "text-gray-650"
                }`}
              >
                {d}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // Build calendar days array for focus month
  const calendarCells = [];
  for (let i = 0; i < adjustedStartIdx; i++) {
    calendarCells.push(null);
  }
  for (let d = 1; d <= daysInMonth; d++) {
    calendarCells.push(d);
  }

  return (
    <section className="py-24 px-4 bg-gradient-to-b from-transparent to-romantic-pink/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <CalendarIcon className="mx-auto mb-4 text-romantic-red opacity-30" size={40} />
          <h2 className="text-4xl md:text-5xl font-serif text-gray-800 tracking-tight">Our Milestones & Love Calendar</h2>
          <p className="text-romantic-red font-script text-2xl mt-2 italic tracking-wide">
            Every second bringing us closer to our next celebration ❤️
          </p>
        </motion.div>

        {/* Primary Spiral-Bound & 12 Month Overlay Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-16">
          
          {/* LEFT PANEL: Spiral Pocket Monthly Calendar (Occupies 5 columns) */}
          <div className="lg:col-span-5 flex flex-col justify-start relative pt-4">
            
            {/* Binder Spiral Loops on Top */}
            <div className="absolute top-1.5 left-0 right-0 flex justify-between pointer-events-none z-30 px-8">
              {binderRings.map((_, i) => (
                <div key={i} className="flex flex-col items-center">
                  {/* Metal wire loop hook styling based on the image */}
                  <div className="w-1.5 h-6 bg-gradient-to-b from-gray-400 via-gray-200 to-gray-500 rounded-full border border-gray-600/30 shadow-[0_2px_4px_rgba(0,0,0,0.35)]" />
                  <div className="w-1.5 h-1.5 rounded-full bg-gray-500 mt-0.5 opacity-60" />
                </div>
              ))}
            </div>

            {/* Notebook style container */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass rounded-[2rem] border border-white/70 shadow-2xl flex flex-col h-full hover:shadow-[0_0_25px_rgba(255,107,107,0.15)] transition-all bg-white/60 overflow-visible relative"
            >
              {/* Decorative scalloped wavy pattern at top header */}
              <div className="w-full h-8 bg-gradient-to-r from-amber-800 to-amber-700/90 relative flex items-end rounded-t-[2rem]">
                <svg viewBox="0 0 100 20" preserveAspectRatio="none" className="w-full h-4 text-white/95 fill-current absolute -bottom-1">
                  <path d="M0,10 Q5,15 10,10 T20,10 T30,10 T40,10 T50,10 T60,10 T70,10 T80,10 T90,10 T100,10 L100,20 L0,20 Z" />
                </svg>
              </div>

              {/* Main Calendar Month Controller */}
              <div className="p-6 pb-2 pt-4 flex flex-col">
                <div className="flex justify-between items-center mb-4">
                  <button 
                    onClick={handlePrevMonth}
                    className="p-1.5 rounded-full bg-white/50 hover:bg-white/80 text-gray-700 transition-colors shadow-sm"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  
                  {/* Styling from the uploaded sheet image: e.g., "2026 | May" layout */}
                  <div className="text-center">
                    <span className="text-xs uppercase tracking-widest text-[#ef4444] font-bold block mb-1">Our Journey</span>
                    <h3 className="text-2xl font-serif font-extrabold text-gray-800 leading-none">
                      2026 | <span className="text-pink-600">{months[month]}</span>
                    </h3>
                  </div>

                  <button 
                    onClick={handleNextMonth}
                    className="p-1.5 rounded-full bg-white/50 hover:bg-white/80 text-gray-700 transition-colors shadow-sm"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>

                {/* Day Names Row (Monday is the start) */}
                <div className="grid grid-cols-7 gap-1 text-center mb-2 border-b border-gray-100 pb-2">
                  {dayNames.map((d_name, i) => (
                    <div 
                      key={d_name} 
                      className={`text-[11px] font-bold uppercase tracking-wider ${
                        i >= 5 ? 'text-rose-500' : 'text-gray-500'
                      }`}
                    >
                      {d_name}
                    </div>
                  ))}
                </div>

                {/* Grid of Days inside page */}
                <div className="grid grid-cols-7 gap-1 text-center">
                  {calendarCells.map((day, idx) => {
                    if (day === null) {
                      return <div key={`empty-${idx}`} className="p-1.5 opacity-0"></div>;
                    }

                    const isSatSun = (idx % 7 === 5) || (idx % 7 === 6);
                    const isSelected = selectedDay === day;
                    const celInfo = getDateCelebration(month, day);

                    return (
                      <CalendarDay
                        key={`day-${day}`}
                        day={day}
                        idx={idx}
                        isSelected={isSelected}
                        onSelect={() => setSelectedDay(day)}
                        celInfo={celInfo}
                        isSatSun={isSatSun}
                      />
                    );
                  })}
                </div>
              </div>

              {/* Decorative scalloped waveform banner on bottom (mimics sheet bottom) */}
              <div className="w-full h-8 bg-gradient-to-r from-teal-900 to-slate-800 relative mt-auto flex items-start rounded-b-[2rem]">
                <svg viewBox="0 0 100 20" preserveAspectRatio="none" className="w-full h-4 text-white/95 fill-current absolute -top-1">
                  <path d="M0,10 Q5,5 10,10 T20,10 T30,10 T40,10 T50,10 T60,10 T70,10 T80,10 T90,10 T100,10 L100,0 L0,0 Z" />
                </svg>
                {/* Stitch dotted detail */}
                <div className="w-full border-t border-dashed border-teal-200/40 mt-1" />
              </div>
            </motion.div>
          </div>

          {/* CENTRE-RIGHT PANEL: Sweet Notes Drawer & Quick Full Month Grid (Occupies 7 columns) */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-6">
            
            {/* 1. Animated Display for the Selected Sweet Note */}
            <motion.div 
              layout="position"
              className="glass p-6 md:p-8 rounded-[2.5rem] border border-white/70 shadow-2xl bg-white/75 flex flex-col relative overflow-hidden flex-grow"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-rose-100 rounded-full blur-2xl opacity-40 -z-10" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-pink-100 rounded-full blur-3xl opacity-40 -z-10" />

              <div className="flex items-center gap-4 mb-4">
                <div className="p-4 rounded-2xl bg-gradient-to-br from-pink-100 to-rose-100 shadow-inner text-romantic-red flex items-center justify-center">
                  <span className="text-3xl filter drop-shadow-sm leading-none">{selectedInfo.emoji}</span>
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-[#ef4444]/60 block mb-1">Love Memo</span>
                  <h4 className="text-xl md:text-2xl font-serif font-extrabold text-gray-800">
                    {selectedInfo.title}
                  </h4>
                </div>
              </div>

              <div className="flex-grow flex items-center">
                <p className="text-gray-650 leading-relaxed font-serif italic text-[15px] md:text-lg border-l-4 border-rose-300 pl-4 py-1">
                  "{selectedInfo.note}"
                </p>
              </div>

              <div className="mt-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
                <Heart size={14} className="text-romantic-red animate-pulse" />
                <span>
                  {selectedDay !== null ? `${months[month]} ${selectedDay}, 2026` : "Love Calendar"}
                </span>
              </div>
            </motion.div>

            {/* 2. Compact 12-Month Grid: Toggle focus instantly (Matches right side of image) */}
            <div className="glass p-5 rounded-[2.5rem] border border-white/60 shadow-xl bg-white/50">
              <div className="flex items-center gap-2 mb-3 px-1">
                <BookOpen size={16} className="text-pink-600" />
                <h4 className="text-sm font-serif font-bold text-gray-800 uppercase tracking-wider">
                  Full 12-Month Love Map (2026)
                </h4>
              </div>
              
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-4 xl:grid-cols-6 gap-3">
                {months.map((_, mIdx) => renderMiniMonth(mIdx))}
              </div>
            </div>

          </div>

        </div>

        {/* Dynamic Countdown Milestone Grid Below Custom Calendar */}
        <div>
          <div className="flex items-center justify-center gap-2 mb-8">
            <Gift className="text-romantic-red" size={24} />
            <h3 className="text-2xl md:text-3xl font-serif text-gray-800 font-bold">Upcoming Milestones Countdowns</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
            {events.map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <TimerCard {...event} />
              </motion.div>
            ))}
          </div>
        </div>

      </div>

      {/* Decorative Floating Hearts in Background */}
      <div className="absolute inset-x-0 bottom-0 pointer-events-none opacity-[0.035] flex justify-around select-none">
        <Heart size={200} className="text-romantic-red fill-current" />
        <Heart size={300} className="text-romantic-red fill-current animate-bounce" style={{ animationDuration: '8s' }} />
        <Heart size={250} className="text-romantic-red fill-current" />
      </div>
    </section>
  );
};
