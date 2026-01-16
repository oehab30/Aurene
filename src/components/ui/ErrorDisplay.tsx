import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Home, RotateCcw, ShieldAlert } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

interface ErrorDisplayProps {
  code?: string;
  title?: string;
  message?: string;
  showHome?: boolean;
  showBack?: boolean;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({
  code = "404",
  title = "Lost in the Archive",
  message = "The masterpiece you are seeking is currently unavailable or has been relocated to our private collection.",
  showHome = true,
  showBack = true
}) => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-white dark:bg-[#0a0a0a] overflow-hidden transition-colors duration-700">
      
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 z-0 opacity-30 dark:opacity-20 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[25vw] font-black text-gray-100 dark:text-white/5 select-none tracking-tighter uppercase leading-none">
          {code}
        </div>
        <div className="absolute top-[20%] right-[10%] w-[500px] h-[500px] bg-orange-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[20%] left-[10%] w-[400px] h-[400px] bg-red-500/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-2xl px-6 text-center space-y-12">
        
        {/* Animated Icon Container */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center justify-center p-6 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-[2.5rem] shadow-2xl shadow-black/5"
        >
          <div className="relative">
            <ShieldAlert className="w-16 h-16 text-orange-500" />
            <motion.div 
               animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.1, 0.3] }}
               transition={{ duration: 3, repeat: Infinity }}
               className="absolute inset-0 bg-orange-500 rounded-full blur-xl"
            />
          </div>
        </motion.div>

        {/* Textual Content */}
        <div className="space-y-4">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-center gap-3"
          >
            <div className="w-8 h-px bg-orange-500" />
            <span className="text-orange-500 font-black uppercase tracking-[0.4em] text-[10px]">Reference Error: {code}</span>
            <div className="w-8 h-px bg-orange-500" />
          </motion.div>

          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-5xl md:text-7xl font-black text-gray-900 dark:text-white uppercase tracking-tighter leading-none"
          >
            {title}
          </motion.h1>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-gray-500 dark:text-gray-400 text-sm md:text-base font-medium max-w-sm mx-auto leading-relaxed"
          >
            {message}
          </motion.p>
        </div>

        {/* Action Buttons */}
        <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          {showBack && (
            <button
               onClick={() => navigate(-1)}
               className="w-full sm:w-auto px-10 py-5 bg-gray-50 dark:bg-white/5 text-gray-900 dark:text-white rounded-full font-black uppercase tracking-widest text-[10px] border border-gray-200 dark:border-white/10 flex items-center justify-center gap-3 transition-all hover:bg-gray-100 dark:hover:bg-white/10 active:scale-95 group"
            >
              <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
              Retrace Steps
            </button>
          )}

          {showHome && (
            <Link
               to="/"
               className="w-full sm:w-auto px-12 py-5 bg-black dark:bg-white text-white dark:text-black rounded-full font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-3 transition-all hover:bg-orange-500 hover:text-white shadow-xl shadow-black/10 active:scale-95 group"
            >
              <Home className="w-3 h-3 group-hover:scale-110 transition-transform" />
              Return to Atrium
            </Link>
          )}
        </motion.div>

        {/* Subtle Branding */}
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="pt-12 text-[8px] font-bold text-gray-300 dark:text-gray-700 uppercase tracking-[0.5em]"
        >
          Auréne Institutional Security — Established 2024
        </motion.div>
      </div>
    </div>
  );
};

export default ErrorDisplay;
