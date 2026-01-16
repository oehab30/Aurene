import React from 'react';
import { motion } from "framer-motion";
import { ArrowRight, MoveDown } from "lucide-react";
import { Link } from "react-router-dom";

function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.5,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0
    }
  };

  return (
    <section className="relative w-full h-screen min-h-[700px] flex items-center justify-center overflow-hidden bg-black">
      {/* Cinematic Background with breathing animation */}
      <motion.div 
        initial={{ scale: 1.15, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ 
          scale: { duration: 20, repeat: Infinity, repeatType: "reverse", ease: "linear" },
          opacity: { duration: 1.5 }
        }}
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('/home-pic/hero3.jpg')` }}
      />

      {/* Luxury Gradient Overlays */}
      <div className="absolute inset-0 z-10 bg-linear-to-t from-black via-black/20 to-transparent opacity-80" />
      <div className="absolute inset-0 z-10 bg-linear-to-b from-black/40 via-transparent to-transparent" />

      {/* Main Content */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-20 container mx-auto px-6 text-center lg:text-left lg:px-24"
      >
        <div className="max-w-4xl mx-auto lg:mx-0 space-y-8">
          <motion.div variants={itemVariants} className="flex items-center justify-center lg:justify-start gap-4">
            <div className="w-12 h-px bg-orange-500" />
            <span className="text-orange-500 font-bold uppercase tracking-[0.4em] text-[10px] md:text-xs">
              Handcrafted Archival series
            </span>
          </motion.div>

          <motion.h1 
            variants={itemVariants}
            className="text-white text-5xl md:text-8xl lg:text-9xl font-black leading-[0.9] tracking-tighter uppercase font-[Playfair Display]"
          >
            Timed <br />
            <span className="text-transparent font-outline-2 dark:font-outline-white">Elegance</span>
          </motion.h1>

          <motion.p 
            variants={itemVariants}
            className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto lg:mx-0 font-medium leading-relaxed"
          >
            Discover the pinnacle of luxury craftsmanship. Our archival collection defines a new standard in accessory design, curated for the modern individual.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center gap-6 pt-6">
            <Link 
              to="/Shop/all" 
              className="w-full sm:w-auto px-12 py-5 bg-white text-black rounded-full font-bold uppercase tracking-widest text-[10px] transition-all hover:bg-orange-500 hover:text-white shadow-2xl flex items-center justify-center gap-3 group"
            >
              Explore Collection
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              to="/About" 
              className="text-white font-bold uppercase tracking-[0.3em] text-[10px] hover:text-orange-500 transition-colors"
            >
              The Story of Auréne
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Secondary Elements: Floating Social or Scroll */}
      <motion.button 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-4 cursor-pointer group"
      >
        <span className="text-white/40 group-hover:text-orange-500 transition-colors font-bold uppercase tracking-[0.5em] text-[8px]">Scroll to Discover</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <MoveDown className="text-orange-500 w-5 h-5 shadow-2xl" />
        </motion.div>
      </motion.button>
    </section>
  );
}

export default Hero;
