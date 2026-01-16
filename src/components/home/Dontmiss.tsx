import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";

function DontMiss() {
  const [timeLeft, setTimeLeft] = useState({ h: 48, m: 0, s: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.s > 0) return { ...prev, s: prev.s - 1 };
        if (prev.m > 0) return { ...prev, m: prev.m - 1, s: 59 };
        if (prev.h > 0) return { h: prev.h - 1, m: 59, s: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="py-24 px-4 bg-white dark:bg-[#0a0a0a] transition-colors duration-500 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative min-h-[600px] rounded-[4rem] overflow-hidden bg-[#111] grid lg:grid-cols-2 shadow-2xl"
        >
          {/* Left Side: Visual Content */}
          <div className="relative h-full min-h-[400px] lg:min-h-0 bg-cover bg-center overflow-hidden group" style={{ backgroundImage: `url('/home-pic/hero2.jpg')` }}>
             <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-700" />
             
             {/* Dynamic Badge */}
             <div className="absolute top-10 left-10 z-10">
                <motion.div 
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="bg-white/10 backdrop-blur-md border border-white/20 px-6 py-3 rounded-full flex items-center gap-3"
                >
                  <Sparkles className="w-4 h-4 text-orange-500" />
                  <span className="text-white text-[10px] font-bold uppercase tracking-[0.3em]">Vault Collection</span>
                </motion.div>
             </div>
          </div>

          {/* Right Side: Information Content */}
          <div className="relative p-10 md:p-20 flex flex-col justify-center items-start text-left space-y-12">
            <div className="space-y-6">
              <h2 className="text-5xl md:text-7xl font-black text-white uppercase leading-[0.8] tracking-tighter">
                Archival <br />
                <span className="text-orange-500">Access</span>
              </h2>
              <p className="text-gray-400 text-lg md:text-xl font-medium max-w-md leading-relaxed">
                A rare opportunity to acquire pieces from our private archive. Hand-selected for the discerning connoisseur.
              </p>
            </div>

            {/* Premium Countdown */}
            <div className="flex items-center gap-8 md:gap-12">
               {Object.entries(timeLeft).map(([label, value], i) => (
                 <div key={label} className="relative flex flex-col items-center">
                   <span className="text-4xl md:text-6xl font-black text-white tracking-widest tabular-nums">
                     {String(value).padStart(2, '0')}
                   </span>
                   <span className="text-[10px] font-bold text-orange-500/60 uppercase tracking-[0.3em] mt-2">
                     {label === 'h' ? 'Hours' : label === 'm' ? 'Minutes' : 'Seconds'}
                   </span>
                   {i < 2 && <span className="absolute -right-4 md:-right-6 top-2 text-white/20 text-4xl font-light">:</span>}
                 </div>
               ))}
            </div>

            <div className="w-full space-y-8">
               <div className="h-px bg-white/10 w-full" />
               
               <div className="flex flex-col sm:flex-row items-center gap-8">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate("/Shop/all")}
                    className="w-full sm:w-auto px-12 py-5 bg-white text-black rounded-full font-bold uppercase tracking-widest text-[10px] flex items-center justify-center gap-3 group transition-all hover:bg-orange-500 hover:text-white"
                  >
                    Enter Private Sale
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                  
                  <div className="flex flex-col items-start gap-1">
                     <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Passcode Required</span>
                     <span className="text-white font-black text-xl tracking-[0.2em]">AURÉNE-20</span>
                  </div>
               </div>
            </div>
          </div>

          {/* Decorative Corner Element */}
          <div className="absolute bottom-10 right-10 opacity-20 hidden lg:block">
            <div className="text-[120px] font-black leading-none text-white/5 select-none tracking-tighter">
              2024
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default DontMiss;
