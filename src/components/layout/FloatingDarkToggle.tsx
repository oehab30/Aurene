import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';

function FloatingDarkToggle() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 150);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 50, x: "-50%" }}
          animate={{ opacity: 1, scale: 1, y: 0, x: "-50%" }}
          exit={{ opacity: 0, scale: 0.8, y: 50, x: "-50%" }}
          className="fixed bottom-10 left-1/2 z-200"
        >
          <div className="flex items-center gap-4 px-3 py-3 bg-white/80 dark:bg-black/80 backdrop-blur-2xl border border-gray-200 dark:border-white/10 rounded-full shadow-2xl relative">
            
            {/* Minimalist Switch Design */}
            <button
              onClick={() => setIsDark(!isDark)}
              className="relative w-20 h-10 rounded-full bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 transition-colors duration-500 overflow-hidden cursor-pointer active:scale-95 group"
            >
              <motion.div
                animate={{ x: isDark ? 40 : 0 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="absolute top-1 left-1 w-8 h-8 rounded-full bg-white dark:bg-orange-500 shadow-lg flex items-center justify-center z-10"
              >
                <AnimatePresence mode="wait">
                  {isDark ? (
                    <motion.div
                      key="moon"
                      initial={{ scale: 0.5, opacity: 0, rotate: -90 }}
                      animate={{ scale: 1, opacity: 1, rotate: 0 }}
                      exit={{ scale: 0.5, opacity: 0, rotate: 90 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Moon className="w-4 h-4 text-white fill-current" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="sun"
                      initial={{ scale: 0.5, opacity: 0, rotate: 90 }}
                      animate={{ scale: 1, opacity: 1, rotate: 0 }}
                      exit={{ scale: 0.5, opacity: 0, rotate: -90 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Sun className="w-4 h-4 text-orange-500" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Background Track Icons */}
              <div className="absolute inset-0 flex justify-between items-center px-3 pointer-events-none opacity-20 dark:opacity-40">
                <Sun className="w-4 h-4 text-orange-500" />
                <Moon className="w-4 h-4 text-white" />
              </div>
            </button>

            <div className="flex flex-col items-start leading-none pr-4 min-w-[100px]">
              <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Atmosphere</span>
              <span className="text-[10px] font-black text-gray-900 dark:text-white uppercase tracking-widest">
                {isDark ? 'Obsidian' : 'Radiance'}
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default FloatingDarkToggle;
