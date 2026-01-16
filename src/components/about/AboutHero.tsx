import React from 'react';
import { motion } from 'framer-motion';

const AboutHero = () => {
  return (
    <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden bg-black">
      <motion.div 
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-60"
        style={{ backgroundImage: `url('/about/watchabout.jpg')` }}
      />
      <div className="absolute inset-0 z-10 bg-linear-to-t from-black via-black/40 to-transparent" />
      
      <div className="relative z-20 text-center space-y-8 px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="flex items-center justify-center gap-4"
        >
          <div className="w-12 h-px bg-orange-500" />
          <span className="text-orange-500 font-bold uppercase tracking-[0.4em] text-xs md:text-sm">Since 2024</span>
          <div className="w-12 h-px bg-orange-500" />
        </motion.div>
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 1 }}
          className="text-white text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none"
        >
          Defining The <br />
          <span className="text-orange-500 italic">Future</span> of Luxury
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto font-medium"
        >
          Auréne is more than a brand; it is a movement toward timeless elegance, ethical craftsmanship, and archival design.
        </motion.p>
      </div>
    </section>
  );
};

export default AboutHero;
