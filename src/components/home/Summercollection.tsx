import React from 'react';
import { motion } from "framer-motion";

function Summercollection() {
  return (
    <section className="relative w-full py-24 px-4 overflow-hidden bg-white dark:bg-[#0a0a0a] transition-colors duration-500">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative h-[500px] md:h-[600px] rounded-[3rem] overflow-hidden group shadow-2xl"
        >
          {/* Background Image with Parallax Effect */}
          <motion.div 
            initial={{ scale: 1.2 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
            style={{ backgroundImage: `url('/home-pic/summer-collection.jpg')` }}
          />

          {/* Luxury Gradient Overlay */}
          <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/40 to-transparent"></div>

          {/* Content */}
          <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-20 text-left">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="max-w-xl space-y-6"
            >
              <div className="flex items-center gap-4">
                <span className="w-12 h-px bg-orange-500" />
                <span className="text-orange-500 font-bold uppercase tracking-[0.3em] text-xs">Summer Essentials</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-black text-white leading-none uppercase tracking-tighter">
                Ethereal <br /> 
                <span className="text-gray-400">Summer</span>
              </h1>
              
              <p className="text-white/80 text-lg md:text-xl font-medium tracking-wide max-w-md">
                Experience the warmth in absolute luxury. Our seasonal collection features handcrafted pieces designed for the sun.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-6 pt-4">
                <button className="w-full sm:w-auto px-10 py-5 bg-white text-black rounded-full font-bold uppercase tracking-widest text-xs hover:bg-orange-500 hover:text-white transition-all duration-300 shadow-xl">
                  Shop the Line
                </button>
                <div className="flex flex-col">
                  <span className="text-white/40 text-[10px] font-bold uppercase tracking-widest">Limited Offer</span>
                  <span className="text-white font-black text-2xl">20% REDUCTION</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Decorative Corner Element */}
          <div className="absolute top-10 right-10 hidden md:block">
            <div className="w-32 h-32 border-r-2 border-t-2 border-white/20 rounded-tr-4xl" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Summercollection;
